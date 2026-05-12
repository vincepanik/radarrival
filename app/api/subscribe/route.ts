import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { Resend } from "resend";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  return new Resend(apiKey);
}

function getResendFromEmail() {
  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured");
  }

  return from;
}

const WELCOME_EMAIL = {
  subject: "Vous êtes bien sur la liste RadarRival 🎯",
  text: `✉️ Ceci est un email de RadarRival — radarrival.com
---

Bonjour,

Merci de votre intérêt pour RadarRival !

Nous aidons les PME et indépendants à suivre leurs concurrents sans effort. Chaque lundi matin, vous recevez un rapport clair et actionnable : changements de prix, nouvelles offres, activité réseaux sociaux, mentions presse.

Vous avez bien été ajouté à la liste RadarRival. Nos abonnements payants démarrent à 19€/mois pour Starter et 29€/mois pour Pro.

Pour choisir votre formule quand vous êtes prêt :
👉 https://radarrival.com

Si vous préférez être accompagné pour le démarrage, répondez simplement à cet email.

À bientôt,
L'équipe RadarRival
contact@radarrival.com | linkedin.com/company/radarrival`,
  html: `<div style="background:#1e3a5f;color:#ffffff;padding:10px 16px;border-radius:6px;margin-bottom:16px;font-size:13px;">
  ✉️ Email envoyé par <strong>RadarRival</strong> — <a href="https://radarrival.com" style="color:#93c5fd;">radarrival.com</a>
</div>
<p>Bonjour,</p>
<p>Merci de votre intérêt pour RadarRival !</p>
<p>Nous aidons les PME et indépendants à suivre leurs concurrents sans effort. Chaque lundi matin, vous recevez un rapport clair et actionnable : changements de prix, nouvelles offres, activité réseaux sociaux, mentions presse.</p>
<p>Vous avez bien été ajouté à la liste RadarRival. Nos abonnements payants démarrent à 19€/mois pour Starter et 29€/mois pour Pro.</p>
<p>Pour choisir votre formule quand vous êtes prêt :<br>👉 <a href="https://radarrival.com">https://radarrival.com</a></p>
<p>Si vous préférez être accompagné pour le démarrage, répondez simplement à cet email.</p>
<p>À bientôt,<br>L'équipe RadarRival<br>contact@radarrival.com | linkedin.com/company/radarrival</p>`,
} as const;

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const insertResult = await pool.query(
      "INSERT INTO leads (email, source) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
      [trimmed, source || "landing_page"]
    );

    if (insertResult.rowCount && insertResult.rowCount > 0) {
      try {
        await getResend().emails.send({
          from: getResendFromEmail(),
          to: trimmed,
          subject: WELCOME_EMAIL.subject,
          html: WELCOME_EMAIL.html,
          text: WELCOME_EMAIL.text,
        });
      } catch (error) {
        console.error("Failed to send welcome email after lead signup", {
          email: trimmed,
          error,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
