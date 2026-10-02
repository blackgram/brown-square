import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";

type ThipBody = {
  sessionType?: "private" | "open";
  surname?: string;
  otherNames?: string;
  email?: string;
  phone?: string;
  ageRange?: string;
  country?: string;
  stateRegion?: string;
  cityTown?: string;
  description?: string;
  industry?: string;
  education?: string;
  fieldOfStudy?: string;
  currentWork?: string;
  understanding?: string;
  interest?: string;
  hearAbout?: string;
  inPersonWilling?: string;
};

export async function POST(req: NextRequest) {
  let body: ThipBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (body.sessionType !== "private" && body.sessionType !== "open") {
    return NextResponse.json(
      { message: "sessionType must be 'private' or 'open'." },
      { status: 400 }
    );
  }

  if (
    !body.surname?.trim() ||
    !body.otherNames?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim()
  ) {
    return NextResponse.json(
      { message: "Surname, other names, email, and phone are required." },
      { status: 400 }
    );
  }

  const emailLower = body.email.trim().toLowerCase();

  try {
    const existing = await adminDb()
      .collection("thipWaitlist")
      .where("emailLower", "==", emailLower)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { message: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    await adminDb()
      .collection("thipWaitlist")
      .add({
        sessionType: body.sessionType,
        surname: body.surname.trim(),
        otherNames: body.otherNames.trim(),
        email: body.email.trim(),
        emailLower,
        phone: body.phone.trim(),
        ageRange: body.ageRange ?? null,
        country: body.country ?? null,
        stateRegion: body.stateRegion ?? null,
        cityTown: body.cityTown ?? null,
        description: body.description ?? null,
        industry: body.industry ?? null,
        education: body.education ?? null,
        fieldOfStudy: body.fieldOfStudy ?? null,
        currentWork: body.currentWork ?? null,
        understanding: body.understanding ?? null,
        interest: body.interest ?? null,
        hearAbout: body.hearAbout ?? null,
        inPersonWilling: body.inPersonWilling ?? null,
        createdAt: new Date().toISOString(),
      });

    return NextResponse.json(
      { message: "Thank you for your interest! We will be in touch soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("THIP form error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

