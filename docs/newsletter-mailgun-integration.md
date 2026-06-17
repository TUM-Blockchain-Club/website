# Mailgun Newsletter Integration

The footer newsletter form posts to `POST /api/newsletter`. The route validates the email address, ignores honeypot submissions, and sends a confirmation email. The subscriber is only added to the configured Mailgun mailing list after they click the encrypted confirmation token link.

## Environment

Set these variables in local and production environments:

- `MAILGUN_API_KEY`: Mailgun private API key.
- `MAILGUN_LIST_ADDRESS`: Mailing list address, for example `info@tum-blockchain.com`.
- `MAILGUN_API_BASE`: Optional API base. The EU Mailgun account should use `https://api.eu.mailgun.net`.
- `MAILGUN_DOMAIN`: Mailgun sending domain used to send confirmation emails.
- `NEWSLETTER_CONFIRMATION_SECRET`: Long random secret used to encrypt confirmation tokens.
- `NEWSLETTER_FROM`: Sender shown on confirmation emails.

## Opt-In Behavior

This integration uses double opt-in without a database:

1. `POST /api/newsletter` sends a confirmation email.
2. `/api/newsletter/confirm?token=...` decrypts and validates the expiring token.
3. The confirmation route adds the member to the Mailgun mailing list with `doubleOptIn`, `requestedAt`, `confirmedAt`, `subscribedAt`, `source`, and `consentTextVersion` vars.

Tokens expire after 48 hours. Because there is no database, pending signups are not persisted and confirmation links cannot be revoked individually before expiry.

## User-Facing Copy

Successful form submissions show a green checkmark with the confirmation-email sent state. The confirmation email uses compact table-based HTML for Gmail compatibility and asks the user to confirm TUM Blockchain Club updates.
