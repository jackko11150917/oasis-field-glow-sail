const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateFriendCode(): string {
  let body = "";
  for (let i = 0; i < 6; i++) {
    body += ALPHABET[Math.floor(Math.random() * ALPHABET.length)] ?? "X";
  }
  return `IR-${body}`;
}

export function normalizeFriendCode(raw: string): string | null {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const body = cleaned.startsWith("IR") ? cleaned.slice(2) : cleaned;
  if (body.length !== 6) return null;
  return `IR-${body}`;
}
