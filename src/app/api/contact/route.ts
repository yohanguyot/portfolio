import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { nom, email, besoin, brief } = await req.json();

  const { error } = await resend.emails.send({
    from: "Portfolio <contact@yohanguyot.com>",
    to: "yohanguyot.contact@gmail.com",
    replyTo: email,
    subject: besoin ? `Nouveau message · ${besoin}` : "Nouveau message",
    html: `
      <p><strong>Nom</strong><br>${nom || "—"}</p>
      <p><strong>Email</strong><br><a href="mailto:${email}">${email}</a></p>
      <p><strong>Besoin</strong><br>${besoin || "—"}</p>
      <hr>
      <p><strong>Brief</strong><br>${(brief || "—").replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
