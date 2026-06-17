export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 10;

import { NextResponse } from "next/server";
import { addMailgunListMember } from "@/util/mailgunNewsletter";
import { parseNewsletterToken } from "@/util/newsletterToken";

export const GET = async (request: Request): Promise<NextResponse> => {
  const token = new URL(request.url).searchParams.get("token");
  const secret = process.env.NEWSLETTER_CONFIRMATION_SECRET;

  if (!token || !secret) {
    return renderConfirmationPage({
      heading: "Confirmation link is invalid",
      message: "Please request a new newsletter confirmation email.",
      status: 400,
    });
  }

  try {
    const payload = parseNewsletterToken(token, secret);
    const confirmedAt = new Date().toISOString();

    await addMailgunListMember(payload.email, {
      consentTextVersion: payload.consentTextVersion,
      confirmedAt,
      doubleOptIn: true,
      requestedAt: payload.requestedAt,
      source: payload.source,
      subscribedAt: confirmedAt,
    });

    return renderConfirmationPage({
      heading: "Subscription confirmed",
      message: "You are now on the TUM Blockchain Club update list.",
      status: 200,
    });
  } catch (error) {
    console.error("Newsletter confirmation failed", error);
    return renderConfirmationPage({
      heading: "Confirmation link expired",
      message: "Please submit your email again to receive a fresh link.",
      status: 400,
    });
  }
};

function renderConfirmationPage({
  heading,
  message,
  status,
}: {
  heading: string;
  message: string;
  status: number;
}): NextResponse {
  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
    <style>
      :root { color-scheme: dark; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #03000b;
        color: #fff;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        width: min(560px, calc(100vw - 32px));
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 12px;
        padding: 32px;
        background: rgba(255, 255, 255, 0.04);
      }
      h1 { margin: 0 0 12px; font-size: 28px; }
      p { margin: 0 0 24px; color: rgba(255, 255, 255, 0.72); line-height: 1.5; }
      a {
        color: #c29fff;
        font-weight: 700;
        text-decoration: none;
      }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <main>
      <h1>${escapeHtml(heading)}</h1>
      <p>${escapeHtml(message)}</p>
      <a href="/">Back to TUM Blockchain Club</a>
    </main>
  </body>
</html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
