import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory sliding window — 3 submissions per IP per 10 min
const store = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW = 10 * 60 * 1000;

function checkRateLimit(ip: string): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW });
    return { ok: true };
  }
  if (entry.count >= LIMIT) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { ok: true };
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { ok, retryAfter } = checkRateLimit(ip);
  if (!ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const body = await req.json();
  const nom: string = String(body.nom ?? "").slice(0, 200);
  const email: string = String(body.email ?? "").slice(0, 200);
  const besoin: string = String(body.besoin ?? "").slice(0, 200);
  const brief: string = String(body.brief ?? "").slice(0, 5000);

  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !brief.trim()) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <contact@yohanguyot.com>",
    to: "yohanguyot.contact@gmail.com",
    replyTo: email,
    subject: `[Portfolio]${besoin ? ` ${besoin}` : ""}${nom ? ` · ${nom}` : ""}`,
    html: `
      <div style="background-color:#09090B;padding:32px;border-radius:8px;font-family:sans-serif;">
        <p style="margin:0;color:#71717a;font-size:14px;">
          De : <strong style="color:#e4e4e7;">${esc(nom || email)}</strong>
          ${nom ? `(${esc(email)})` : ""}
          ${besoin ? `· ${esc(besoin)}` : ""}
        </p>
        <hr style="border:none;border-top:1px solid #27272a;margin:16px 0;">
        <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6;color:#e4e4e7;">${esc(brief || "—")}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
