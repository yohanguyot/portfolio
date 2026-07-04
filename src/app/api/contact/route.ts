import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { nom, email, besoin, brief } = await req.json();

  const { error } = await resend.emails.send({
    from: "Portfolio <contact@yohanguyot.com>",
    to: "yohanguyot.contact@gmail.com",
    replyTo: email,
    subject: `[Portfolio]${besoin ? ` ${besoin}` : ""}${nom ? ` · ${nom}` : ""}`,
    html: `
      <p style="margin:0;color:#71717a;font-size:14px;">
        De : <strong style="color:#e4e4e7;">${nom || email}</strong>
        ${nom ? `(${email})` : ""}
        ${besoin ? `· ${besoin}` : ""}
      </p>
      <hr style="border:none;border-top:1px solid #27272a;margin:16px 0;">
      <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.6;color:#e4e4e7;">${(brief || "—").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
