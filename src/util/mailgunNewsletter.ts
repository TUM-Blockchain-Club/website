const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_LIST_ADDRESS = process.env.MAILGUN_LIST_ADDRESS;
const MAILGUN_API_BASE =
  process.env.MAILGUN_API_BASE || "https://api.eu.mailgun.net";
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const NEWSLETTER_FROM =
  process.env.NEWSLETTER_FROM ||
  "TUM Blockchain Club <info@tum-blockchain.com>";

export function assertMailgunListConfig(): void {
  if (!MAILGUN_API_KEY || !MAILGUN_LIST_ADDRESS) {
    throw new Error("Mailgun newsletter list integration is not configured");
  }
}

export function assertMailgunConfirmationConfig(): void {
  assertMailgunListConfig();

  if (!MAILGUN_DOMAIN) {
    throw new Error("Mailgun newsletter confirmation email is not configured");
  }
}

export async function addMailgunListMember(
  email: string,
  vars: Record<string, unknown>,
): Promise<void> {
  assertMailgunListConfig();

  const formData = new FormData();
  formData.set("address", email);
  formData.set("subscribed", "true");
  formData.set("upsert", "yes");
  formData.set("vars", JSON.stringify(vars));

  const response = await fetch(
    `${MAILGUN_API_BASE}/v3/lists/${encodeURIComponent(
      MAILGUN_LIST_ADDRESS as string,
    )}/members`,
    {
      method: "POST",
      headers: getMailgunAuthHeader(),
      body: formData,
    },
  );

  if (response.ok) {
    return;
  }

  const responseText = await response.text();

  if (
    response.status === 400 &&
    responseText.toLowerCase().includes("already")
  ) {
    return;
  }

  throw new Error(
    `Mailgun list member request failed with ${response.status}: ${responseText}`,
  );
}

export async function sendNewsletterConfirmationEmail({
  confirmationUrl,
  email,
}: {
  confirmationUrl: string;
  email: string;
}): Promise<void> {
  assertMailgunConfirmationConfig();

  const formData = new FormData();
  formData.set("from", NEWSLETTER_FROM);
  formData.set("to", email);
  formData.set("subject", "Confirm your TUM Blockchain Club updates");
  formData.set(
    "text",
    [
      "Please confirm that you want to receive updates from TUM Blockchain Club. We will send you news about events, programs, and community opportunities.",
      "",
      "Welcome to the TUM Blockchain Club family.",
      "",
      "Confirm subscription:",
      confirmationUrl,
      "",
      "If you did not request this, you can ignore this email.",
    ].join("\n"),
  );
  formData.set(
    "html",
    [
      '<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;color:#202124;font-family:Arial,sans-serif;font-size:18px;line-height:1.5;max-width:640px;width:100%;">',
      "<tr><td>",
      '<p style="margin:0 0 24px;">Please confirm that you want to receive updates from TUM Blockchain Club. We will send you news about events, programs, and community opportunities.</p>',
      '<p style="margin:0 0 32px;">Welcome to the TUM Blockchain Club family.</p>',
      '<p style="margin:0 0 32px;">',
      `<a href="${escapeHtml(confirmationUrl)}" style="color:#1155cc;text-decoration:underline;">Confirm subscription</a>`,
      "</p>",
      '<p style="margin:0;color:#202124;">If you did not request this, you can ignore this email.</p>',
      "</td></tr>",
      "</table>",
    ].join(""),
  );

  const response = await fetch(
    `${MAILGUN_API_BASE}/v3/${encodeURIComponent(
      MAILGUN_DOMAIN as string,
    )}/messages`,
    {
      method: "POST",
      headers: getMailgunAuthHeader(),
      body: formData,
    },
  );

  if (response.ok) {
    return;
  }

  const responseText = await response.text();
  throw new Error(
    `Mailgun confirmation email request failed with ${response.status}: ${responseText}`,
  );
}

function getMailgunAuthHeader(): { Authorization: string } {
  return {
    Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString(
      "base64",
    )}`,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
