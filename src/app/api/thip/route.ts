import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

type ThipBody = {
  formType?: string;
  name?: string;
  email?: string;
  description?: string;
  curiosity?: string;
  explore?: string;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: NextRequest) {
  let body: ThipBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const description = asString(body.description);
  const curiosity = asString(body.curiosity);
  const explore = asString(body.explore);

  if (!name || !email || !description || !curiosity) {
    return NextResponse.json(
      { message: "Name, email, how you describe yourself, and what made you curious are required." },
      { status: 400 },
    );
  }

  const emailLower = email.toLowerCase();

  try {
    const existing = await adminDb()
      .collection("thipWaitlist")
      .where("emailLower", "==", emailLower)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { message: "This email is already on the list." },
        { status: 409 },
      );
    }

    await adminDb()
      .collection("thipWaitlist")
      .add({
        sessionType: "think-lab",
        formType: "think-lab",
        name,
        otherNames: name,
        surname: "",
        email,
        emailLower,
        description,
        curiosity,
        interest: curiosity,
        explore: explore || null,
        createdAt: new Date().toISOString(),
      });

    return NextResponse.json(
      { message: "Thank you for your interest! We will be in touch soon." },
      { status: 200 },
    );
  } catch (error) {
    console.error("THIP form error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
