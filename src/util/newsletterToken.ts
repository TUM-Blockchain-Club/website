import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

const TOKEN_VERSION = "v1";
const IV_BYTE_LENGTH = 12;

export interface NewsletterTokenPayload {
  consentTextVersion: string;
  email: string;
  expiresAt: string;
  requestedAt: string;
  source: string;
}

function getTokenKey(secret: string): Buffer {
  return createHash("sha256").update(secret).digest();
}

function encodeBase64Url(value: Buffer): string {
  return value.toString("base64url");
}

function decodeBase64Url(value: string): Buffer {
  return Buffer.from(value, "base64url");
}

export function createNewsletterToken(
  payload: NewsletterTokenPayload,
  secret: string,
): string {
  const iv = randomBytes(IV_BYTE_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", getTokenKey(secret), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    TOKEN_VERSION,
    encodeBase64Url(iv),
    encodeBase64Url(authTag),
    encodeBase64Url(encrypted),
  ].join(".");
}

export function parseNewsletterToken(
  token: string,
  secret: string,
): NewsletterTokenPayload {
  const [version, encodedIv, encodedAuthTag, encodedEncrypted, extra] =
    token.split(".");

  if (
    version !== TOKEN_VERSION ||
    !encodedIv ||
    !encodedAuthTag ||
    !encodedEncrypted ||
    extra
  ) {
    throw new Error("Invalid token format");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    getTokenKey(secret),
    decodeBase64Url(encodedIv),
  );
  decipher.setAuthTag(decodeBase64Url(encodedAuthTag));

  const decrypted = Buffer.concat([
    decipher.update(decodeBase64Url(encodedEncrypted)),
    decipher.final(),
  ]);
  const payload = JSON.parse(decrypted.toString("utf8")) as unknown;

  if (!isNewsletterTokenPayload(payload)) {
    throw new Error("Invalid token payload");
  }

  if (Date.parse(payload.expiresAt) < Date.now()) {
    throw new Error("Expired token");
  }

  return payload;
}

function isNewsletterTokenPayload(
  payload: unknown,
): payload is NewsletterTokenPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const value = payload as Record<string, unknown>;

  return (
    typeof value.consentTextVersion === "string" &&
    typeof value.email === "string" &&
    typeof value.expiresAt === "string" &&
    typeof value.requestedAt === "string" &&
    typeof value.source === "string"
  );
}
