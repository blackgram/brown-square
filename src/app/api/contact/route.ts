import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  organisation?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return NextResponse.json(
      { message: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // Stub: wire to email provider / CRM using CONTACT_WEBHOOK_URL when ready.
  void body.organisation;
  return NextResponse.json({
    message:
      "Thanks — we received your message. (Delivery is stubbed until email is connected.)",
  });
}
