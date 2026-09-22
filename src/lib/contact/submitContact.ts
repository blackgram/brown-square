export async function submitContact(payload: {
  name: string;
  email: string;
  organisation?: string;
  message: string;
}) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return (await res.json()) as { message: string };
}
