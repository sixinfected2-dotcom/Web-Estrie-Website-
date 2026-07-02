import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/lib/data";

const contactSchema = z.object({
  nom: z.string().trim().min(2, "Votre nom est requis.").max(100),
  courriel: z.email("Courriel invalide.").max(200),
  typeProjet: z.enum([
    "Site vitrine",
    "Boutique en ligne",
    "Refonte & audit",
    "Autre",
  ]),
  budget: z.string().max(60).optional().default(""),
  message: z
    .string()
    .trim()
    .min(10, "Dites-nous en un peu plus sur votre projet.")
    .max(5000),
  // Honeypot — un humain ne remplit jamais ce champ caché.
  entreprise: z.string().max(0).optional().default(""),
});

// Rate-limit basique par IP (en mémoire, par instance).
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "inconnu";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de tentatives. Réessayez dans une heure." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Formulaire invalide." },
      { status: 400 },
    );
  }

  const { nom, courriel, typeProjet, budget, message, entreprise } =
    parsed.data;

  // Honeypot rempli → bot. On répond « succès » sans rien envoyer.
  if (entreprise) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] RESEND_API_KEY absent — soumission simulée :", {
        nom,
        courriel,
        typeProjet,
        budget,
      });
      return NextResponse.json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY manquant en production.");
    return NextResponse.json(
      { ok: false, error: "Le service est temporairement indisponible." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_EMAIL ?? site.email;
    const { error } = await resend.emails.send({
      // Passe à contact@webestrie.ca une fois le domaine vérifié chez Resend.
      from: process.env.CONTACT_FROM ?? "Web Estrie <onboarding@resend.dev>",
      to,
      replyTo: courriel,
      subject: `Nouveau projet — ${typeProjet} — ${nom}`,
      text: [
        `Nom : ${nom}`,
        `Courriel : ${courriel}`,
        `Type de projet : ${typeProjet}`,
        budget ? `Budget approximatif : ${budget}` : null,
        "",
        message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] Erreur Resend :", error);
      return NextResponse.json(
        { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-nous directement." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Erreur inattendue :", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez ou écrivez-nous directement." },
      { status: 500 },
    );
  }
}
