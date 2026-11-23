export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = configured || "http://localhost:3000";
  return url.replace(/\/$/, "");
}
