"use client";

import Link from "next/link";
import { useState } from "react";

const quickServices = [
  {
    title: "Reupholstery",
    description:
      "Treatment, clinical, wellness, and professional-use furniture restored with a clean, durable finish.",
  },
  {
    title: "Repairs",
    description:
      "Internal structural fixes, foam replacement, reshaping, and reinforcement where needed.",
  },
  {
    title: "Custom Accessories",
    description:
      "Plinth covers, pillowcases, stool covers, PVC bed covers, and bespoke add-ons.",
  },
];

const steps = [
  {
    title: "Send your details",
    description:
      "Tell us what equipment you have, where you are based, and what needs to be done.",
  },
  {
    title: "We assess & quote",
    description:
      "We review the item, scope, and logistics before providing a quote.",
  },
  {
    title: "We restore & return",
    description:
      "Once approved, the item moves into restoration and return scheduling.",
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img
              src="/medirevive-logo.png"
              alt="MediRevive"
              className="h-50 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary)]">
              Home
            </Link>
            <Link href="/catalog" className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary)]">
              Equipment
            </Link>
            <Link href="/quote" className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary)]">
              Get a Quote
            </Link>
            <Link href="/contact" className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary)]">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/quote" className="site-button-primary">
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--primary)] md:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-all duration-200 ${
                  mobileMenuOpen ? "top-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-0.5 w-5 bg-current transition-all duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition-all duration-200 ${
                  mobileMenuOpen ? "top-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="site-container pb-4 md:hidden">
            <nav className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <Link href="/" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background-soft)]">
                Home
              </Link>
              <Link href="/catalog" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background-soft)]">
                Equipment
              </Link>
              <Link href="/quote" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background-soft)]">
                Get a Quote
              </Link>
              <Link href="/contact" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background-soft)]">
                Contact
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <section className="site-section">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <span className="site-kicker">Treatment & professional furniture restoration</span>
              <h1 className="site-title-xl mt-5">
                Restore. Repair. Reupholster.
              </h1>
              <p className="site-body mt-6">
                MediRevive specialises in treatment, clinical, wellness, and
                professional-use furniture restoration — helping extend the life of
                equipment while maintaining a clean, durable, professional finish.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/quote" className="site-button-primary">
                  Get a Quote
                </Link>
                <Link href="/catalog" className="site-button-secondary">
                  View Services
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="site-stat">
                <div className="site-stat-number">01</div>
                <p className="mt-3 text-sm text-[var(--text-soft)]">Quote-based process</p>
              </div>
              <div className="site-stat">
                <div className="site-stat-number">02</div>
                <p className="mt-3 text-sm text-[var(--text-soft)]">Collection and return where needed</p>
              </div>
              <div className="site-stat">
                <div className="site-stat-number">03</div>
                <p className="mt-3 text-sm text-[var(--text-soft)]">Johannesburg, Gauteng, and beyond</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="site-container">
          <span className="site-kicker">What we do</span>
          <h2 className="site-title-lg mt-5">Professional restoration services made simple.</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {quickServices.map((service) => (
              <div key={service.title} className="site-card">
                <div className="site-card-body">
                  <span className="site-badge">Service</span>
                  <h3 className="mt-4 text-2xl">{service.title}</h3>
                  <p className="mt-4 leading-8 text-[var(--text-soft)]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/catalog" className="site-button-secondary">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="site-container">
          <span className="site-kicker">How it works</span>
          <h2 className="site-title-lg mt-5">A clear and easy process.</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="site-card-soft p-6">
                <div className="site-stat-number">{index + 1}</div>
                <h3 className="mt-4 text-2xl">{step.title}</h3>
                <p className="mt-4 leading-8 text-[var(--text-soft)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section pt-0">
        <div className="site-container">
          <div className="site-card">
            <div className="site-card-body">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <span className="site-kicker">Contact</span>
                  <h2 className="mt-5 text-4xl">Need a quote or want to discuss an item?</h2>
                  <p className="mt-4 leading-8 text-[var(--text-soft)]">
                    MediRevive works on a quote-only basis. Send through your
                    equipment details, location, and photos for assessment.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/270000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-button-primary"
                  >
                    WhatsApp Us
                  </a>
                  <Link href="/contact" className="site-button-secondary">
                    Contact Details
                  </Link>
                </div>
              </div>

              <div className="site-divider my-8" />

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Phone
                  </p>
                  <p className="mt-2 text-[var(--text)]">Replace with phone number</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Email
                  </p>
                  <p className="mt-2 text-[var(--text)]">Replace with email address</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Location
                  </p>
                  <p className="mt-2 text-[var(--text)]">Johannesburg North</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}