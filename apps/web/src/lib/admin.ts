export const ADMIN_EMAILS = ["tu@email.com"];

export function isAdmin(email: string) {
  return ADMIN_EMAILS.includes(email);
}
