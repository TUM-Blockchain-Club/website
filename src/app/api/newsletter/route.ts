export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

import { NextResponse } from "next/server";
import { sendNewsletterConfirmationEmail } from "@/util/mailgunNewsletter";
import { createNewsletterToken } from "@/util/newsletterToken";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONFIRMATION_TOKEN_TTL_HOURS = 48;
const CONSENT_TEXT_VERSION = "newsletter-consent-2026-06-17";

interface NewsletterRequest {
  email?: unknown;
  source?: unknown;
  website?: unknown;
}

export const POST = async (request: Request): Promise<NextResponse> => {
  let body: NewsletterRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (typeof body.email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const source =
    typeof body.source === "string" && body.source.length <= 80
      ? body.source
      : "website-footer";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Enter a valid email address" },
      { status: 400 },
    );
  }

  if (!process.env.NEWSLETTER_CONFIRMATION_SECRET) {
    console.error("Newsletter confirmation token secret is not configured");
    return NextResponse.json(
      { error: "Newsletter signup is not configured" },
      { status: 500 },
    );
  }

  const requestedAt = new Date();
  const expiresAt = new Date(
    requestedAt.getTime() + CONFIRMATION_TOKEN_TTL_HOURS * 60 * 60 * 1000,
  );
  const token = createNewsletterToken(
    {
      consentTextVersion: CONSENT_TEXT_VERSION,
      email,
      expiresAt: expiresAt.toISOString(),
      requestedAt: requestedAt.toISOString(),
      source,
    },
    process.env.NEWSLETTER_CONFIRMATION_SECRET,
  );
  const confirmationUrl = new URL("/api/newsletter/confirm", request.url);
  confirmationUrl.searchParams.set("token", token);

  try {
    await sendNewsletterConfirmationEmail({
      confirmationUrl: confirmationUrl.toString(),
      email,
    });
  } catch (error) {
    console.error("Mailgun newsletter confirmation failed", error);
    return NextResponse.json(
      { error: "Could not send confirmation email right now" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 202 });
};
