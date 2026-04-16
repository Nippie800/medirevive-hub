"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QuoteSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  return (
    <main className="brand-shell">
      <section className="brand-container flex min-h-screen items-center py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <span className="brand-kicker">Consultation received</span>
            <h1 className="brand-title-lg mt-5">
              Your restoration enquiry is now in the system.
            </h1>
            <p className="brand-body mt-6">
              Thank you for contacting MediRevive. Your consultation has been
              logged and will now move into the assessment stage.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="brand-stat">
                <div className="brand-stat-number">
                  01
                </div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Consultation logged
                </p>
              </div>

              <div className="brand-stat">
                <div className="brand-stat-number">
                  02
                </div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Specialist review
                </p>
              </div>

              <div className="brand-stat">
                <div className="brand-stat-number">
                  03
                </div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Quote response
                </p>
              </div>
            </div>
          </div>

          <div className="brand-panel p-8 md:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#11c5a147] bg-[#11c5a112] text-3xl text-[var(--teal)]">
              ✓
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">
                Submission successful
              </p>

              <h2 className="mt-3 text-4xl">
                Consultation request received
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-8 text-[var(--text-soft)]">
                We’ve received your details and our team will review the equipment
                condition, service requirements, and any uploaded reference image.
              </p>
            </div>

            <div className="brand-panel-soft mt-8 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Reference number
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-[0.08em] text-[var(--linen)]">
                {reference ?? "Reference pending"}
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="brand-panel-soft p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  What happens next
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                  A MediRevive specialist will assess your enquiry and prepare the
                  next step in the restoration process.
                </p>
              </div>

              <div className="brand-panel-soft p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Keep this reference
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
                  Use your reference number for any follow-up communication about
                  this consultation.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
              <p className="text-sm leading-7 text-[var(--text-soft)]">
                MediRevive may contact you for additional photos, location details,
                or a clearer breakdown of the repair and upholstery requirements.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/catalog" className="brand-button-secondary">
                Back to Equipment
              </Link>
              <Link href="/" className="brand-button-primary">
                Return Home →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}