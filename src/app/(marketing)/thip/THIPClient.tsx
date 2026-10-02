"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Rule } from "@/components/ui/Rule";
import { Shell } from "@/components/ui/Shell";

type SessionType = "private" | "open";

export default function THIPClient() {
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>("private");

  useEffect(() => {
    document.body.classList.toggle("thip-modal-open", modalOpen);
    return () => document.body.classList.remove("thip-modal-open");
  }, [modalOpen]);

  function openModal(type: SessionType) {
    setSessionType(type);
    setSubmitted(false);
    setStatus(null);
    setModalOpen(true);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setStatus(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/thip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionType,
          surname: data.get("surname"),
          otherNames: data.get("otherNames"),
          email: data.get("email"),
          phone: data.get("phone"),
          ageRange: data.get("ageRange"),
          country: data.get("country"),
          stateRegion: data.get("stateRegion"),
          cityTown: data.get("cityTown"),
          description: data.get("description"),
          category: data.get("category"),
          industry: data.get("industry"),
          education: data.get("education"),
          fieldOfStudy: data.get("fieldOfStudy"),
          currentWork: data.get("currentWork"),
          understanding: data.get("understanding"),
          interest: data.get("interest"),
          hearAbout: data.get("hearAbout"),
          inPersonWilling: data.get("inPersonWilling"),
        }),
      });
      const json = (await res.json()) as { message: string };
      if (res.ok) {
        form.reset();
        setSubmitted(true);
      } else {
        setStatus(json.message);
      }
    } catch {
      setStatus("Something went wrong. Please email us directly.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Shell className="flex flex-col pt-10 pb-12 max-md:pt-8 max-md:pb-10">
        <Stagger immediate>
          <StaggerItem>
            <Eyebrow>The Human Intelligence Project</Eyebrow>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-[35px] font-display text-[clamp(40px,6vw,80px)] font-normal leading-[0.8] tracking-[-0.055em]">
              What happens when intelligence stops being something you know and
              becomes something you can use?
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-9 max-w-[720px] text-[19px] leading-[1.55]">
              Welcome to The Human Intelligence Project. For the next couple of
              months, we are going to explore one simple idea: How much of what we
              know actually survives real life?
            </p>
          </StaggerItem>
        </Stagger>
      </Shell>

      <Rule />

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <Stagger>
            <StaggerItem>
              <h2 className="font-display text-[clamp(52px,7vw,100px)] font-normal leading-[0.9] tracking-[-0.055em]">
                Open Call
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-[720px] text-[19px] leading-[1.55]">
                We are bringing together people at different stages of their lives
                and careers to take part in the first phase of The Human
                Intelligence Project.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-[720px] text-[19px] leading-[1.55]">
                There are things you can learn from books. Things you can learn
                from experience. And then there are things you only understand
                when you are placed in the room. We are interested in the third.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-[720px] text-[19px] leading-[1.55]">
                We&apos;ll test ideas. Interrogate assumptions. Study decisions. And
                put theory in situations where something actually has to happen.
              </p>
            </StaggerItem>
          </Stagger>
        </Shell>
      </Reveal>

      <Reveal as="section" className="bg-black py-16 text-cream max-md:py-12">
        <Shell>
          <h2 className="font-display text-[clamp(52px,7vw,100px)] font-normal leading-[0.9] tracking-[-0.055em]">
            Two Groups, Different Days
          </h2>
          <Stagger className="mt-[70px] grid grid-cols-2 gap-[60px] border-t border-white/20 max-md:grid-cols-1">
            <StaggerItem className="min-h-[240px] border-white/20 py-[30px] pr-[30px] max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:py-7 max-md:pr-0">
              <h3 className="font-display text-[28px] font-normal leading-tight">
                Private Sessions
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                For public figures, CEOs and business owners. Closed-room sessions.
                Case studies. Conversations. Real situations. Participants will not
                be recorded.
              </p>
              <button
                onClick={() => openModal("private")}
                className="mt-4 inline-block border border-cream px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-cream hover:text-black"
              >
                Join the waitlist
              </button>
              <p className="mt-4 text-xs text-cream/60">
                Open call closes 10th October 2026
              </p>
            </StaggerItem>
            <StaggerItem className="min-h-[240px] border-white/20 py-[30px] pr-[30px] max-md:min-h-0 max-md:border-r-0 max-md:border-b max-md:py-7 max-md:pr-0">
              <h3 className="font-display text-[28px] font-normal leading-tight">
                Open Session
              </h3>
              <p className="mt-4 text-sm leading-relaxed">
                For emerging talents and creators. A more participatory experience
                involving simulations, real-life scenarios and exercises. These
                sessions will be documented.
              </p>
              <button
                onClick={() => openModal("open")}
                className="mt-4 inline-block border border-cream px-4 py-2 text-xs uppercase tracking-wider transition-colors duration-200 hover:bg-cream hover:text-black"
              >
                Join the waitlist
              </button>
              <p className="mt-4 text-xs text-cream/60">
                Open call closes 10th October 2026
              </p>
            </StaggerItem>
          </Stagger>
        </Shell>
      </Reveal>

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell>
          <Stagger>
            <StaggerItem>
              <h2 className="font-display text-[clamp(52px,7vw,100px)] font-normal leading-[0.9] tracking-[-0.055em]">
                I&apos;m curious
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-[720px] text-[19px] leading-[1.55]">
                If this has made you curious, that&apos;s enough for now. Leave us a
                few details about yourself and we will be in touch.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-4 max-w-[720px] text-[14px] leading-[1.6] text-muted">
                Registration of interest closes 10th October 2026. The Human
                Intelligence Project is a paid experience. Joining the waitlist
                requires no payment or commitment. Full participation details,
                including dates, fees and what comes next, will be shared with
                waitlist members after registration closes.
              </p>
            </StaggerItem>
          </Stagger>
        </Shell>
      </Reveal>

      {/* Modal */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper">
            <div className="flex items-center justify-between border-b border-line px-4 py-4 max-md:px-4">
              <h2 className="font-display text-[32px] font-normal leading-tight">
                Join the Waitlist
                <small className="mt-1 block text-xs font-normal uppercase tracking-wider text-muted">
                  {sessionType === "private" ? "Private Sessions" : "Open Session"}
                </small>
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-sm uppercase tracking-wider hover:opacity-70"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {submitted ? (
                <Shell className="flex max-w-2xl flex-col items-start py-16 max-md:py-12">
                  <Eyebrow>You&apos;re on the list</Eyebrow>
                  <h3 className="mt-6 font-display text-[clamp(36px,5vw,56px)] font-normal leading-[0.95] tracking-[-0.055em]">
                    You are now on the waitlist!
                  </h3>
                  <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6]">
                    Thanks for your time. We&apos;ll reach out to you via your
                    provided contact.
                  </p>
                  <Link href="/" className="mt-10 inline-block">
                    <Button className="w-max bg-transparent">Back to Home</Button>
                  </Link>
                </Shell>
              ) : (
              <Shell className="max-w-3xl py-16 max-md:py-12">
                <form
                  className="grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2"
                  onSubmit={onSubmit}
                >
                  <div className="md:col-span-2">
                    <p className="mb-6 text-[19px] leading-[1.55]">
                      If this has made you curious, that&apos;s enough for now. Leave us
                      a few details about yourself and we will be in touch.
                    </p>
                    <p className="mb-8 text-[14px] leading-[1.6] text-muted">
                      Registration of interest closes 10th October 2026. The Human
                      Intelligence Project is a paid experience. Joining the waitlist
                      requires no payment or commitment. Full participation details,
                      including dates, fees and what comes next, will be shared with
                      waitlist members after registration closes.
                    </p>
                  </div>

                  <Field label="Surname">
                    <input
                      name="surname"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="Other Names">
                    <input
                      name="otherNames"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="Phone Number / WhatsApp">
                    <input
                      name="phone"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="Age Range">
                    <select
                      name="ageRange"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="18-24">18–24</option>
                      <option value="25-34">25–34</option>
                      <option value="35-44">35–44</option>
                      <option value="45-54">45–54</option>
                      <option value="55+">55+</option>
                    </select>
                  </Field>
                  <Field label="Country">
                    <input
                      name="country"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="State / Region">
                    <input
                      name="stateRegion"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="City / Town">
                    <input
                      name="cityTown"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="What best describes you?">
                    <select
                      name="description"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="Public figure">Public figure</option>
                      <option value="CEO or Founder">CEO or Founder</option>
                      <option value="Business Owner">Business Owner</option>
                      <option value="Emerging Talent">Emerging Talent</option>
                      <option value="Creator">Creator</option>
                      <option value="Other">Other</option>
                    </select>
                  </Field>
                  <Field label="Industry / Area of specialisation">
                    <input
                      name="industry"
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="Highest level of education">
                    <input
                      name="education"
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="What did you study? (optional)">
                    <input
                      name="fieldOfStudy"
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field
                    full
                    label="How would you describe what you are currently building, doing or becoming? (Max 100 words)"
                  >
                    <textarea
                      name="currentWork"
                      maxLength={100}
                      className="min-h-[80px] w-full resize-y border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field
                    full
                    label="What is one thing about people, influence, success or visibility that you wish you understood better?"
                  >
                    <textarea
                      name="understanding"
                      required
                      className="min-h-[80px] w-full resize-y border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field
                    full
                    label="Why does The Human Intelligence Project interest you? (Max 100 words)"
                  >
                    <textarea
                      name="interest"
                      maxLength={100}
                      required
                      className="min-h-[80px] w-full resize-y border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="How did you hear about this project?">
                    <input
                      name="hearAbout"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    />
                  </Field>
                  <Field label="Are you willing to participate in an in-person pilot session?">
                    <select
                      name="inPersonWilling"
                      required
                      className="w-full border-0 border-b border-ink bg-transparent py-3 outline-none"
                    >
                      <option value="">Select...</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </Field>
                  <Button
                    type="submit"
                    disabled={pending}
                    className="w-max bg-transparent disabled:opacity-50 md:col-span-2"
                  >
                    {pending ? "Submitting…" : "Submit →︎"}
                  </Button>
                  <div
                    className="min-h-5 text-xs leading-relaxed md:col-span-2"
                    role="status"
                  >
                    {status}
                  </div>
                </form>
              </Shell>
              )}
            </div>
          </div>
        </>
      )}

      <Rule />

      <Reveal as="section" className="py-16 max-md:py-12">
        <Shell className="text-center">
          <Eyebrow>Powered by</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(40px,5vw,80px)] font-normal leading-tight tracking-[-0.055em]">
            BrownSquare Insight
          </h2>
        </Shell>
      </Reveal>
    </>
  );
}

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`w-full ${full ? "md:col-span-2" : ""}`}>
      <label className="block text-xs uppercase tracking-wider text-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
