"use client";

import Link from "next/link";
import { useState } from "react";

const aboutPoints = [
  "Treatment and professional furniture reupholstery",
  "Structural repairs and refurbishment",
  "Custom accessories and bespoke solutions",
];

const serviceCards = [
  {
    title: "Treatment & Professional Furniture Reupholstery",
    description:
      "We restore and reupholster treatment beds, plinths, salon furniture, stools, office chairs, and other professional-use furniture with a focus on durability, hygiene, and presentation.",
  },
  {
    title: "Structural Repairs & Refurbishment",
    description:
      "Beyond upholstery, we also restore internal structure where needed, including broken boards, foam replacement, reshaping, and plinth frame repairs.",
  },
  {
    title: "Custom Accessories",
    description:
      "We design and supply plinth covers, pillowcases, stool covers, chair covers, PVC bed covers, and other custom-made accessories for professional environments.",
  },
  {
    title: "Bespoke Solutions",
    description:
      "If your item is not listed, MediRevive can assess it and create a tailored restoration or manufacturing solution to suit your environment.",
  },
];

const equipmentPreview = [
  "Electrical plinths",
  "Standard plinths",
  "Bobath plinths",
  "Portable plinths",
  "Chiropractic beds",
  "Traction beds",
  "Salon beds and chairs",
  "Round stools",
  "Saddle chairs",
  "Office chairs",
  "Pilates reformers",
  "Reception seating",
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <main className="brand-shell">
      <section className="brand-container pt-6">
        <header className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#11c5a147] bg-[#11c5a112] text-[#11c5a1]">
                +
              </div>
              <span className="text-lg text-[var(--text)]">
                <span className="font-medium">Medi</span>
                <span className="text-[#11c5a1]">Revive</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-5 md:flex">
              <Link
                href="/catalog"
                className="text-sm text-[var(--text-soft)] transition hover:text-white"
              >
                Equipment
              </Link>
              <Link
                href="/quote"
                className="text-sm text-[var(--text-soft)] transition hover:text-white"
              >
                Consultation
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[var(--text-soft)] transition hover:text-white"
              >
                Contact
              </Link>
              <Link href="/admin" className="brand-button-primary">
                Dashboard
              </Link>
            </nav>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--text)] transition hover:bg-white/10 md:hidden"
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
            <div className="mt-4 border-t border-white/10 pt-4 md:hidden">
              <nav className="flex flex-col gap-3">
                <Link
                  href="/catalog"
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[var(--text-soft)] transition hover:bg-white/10 hover:text-white"
                >
                  Equipment
                </Link>
                <Link
                  href="/quote"
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[var(--text-soft)] transition hover:bg-white/10 hover:text-white"
                >
                  Consultation
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-[var(--text-soft)] transition hover:bg-white/10 hover:text-white"
                >
                  Contact
                </Link>
                <Link
                  href="/admin"
                  onClick={closeMobileMenu}
                  className="brand-button-primary w-full"
                >
                  Dashboard
                </Link>
              </nav>
            </div>
          ) : null}
        </header>
      </section>

      <section className="brand-section">
        <div className="brand-container grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="lg:pr-10">
            <span className="brand-kicker">Restoration specialists</span>

            <h1 className="brand-title-xl mt-6">
              Reviving the tools and spaces that{" "}
              <span className="text-[var(--linen)] italic">support</span> care.
            </h1>

            <p className="brand-body mt-8">
              MediRevive specialises in the restoration, reupholstery, and repair
              of treatment, clinical, wellness, and professional-use furniture —
              helping clients extend equipment life while maintaining a clean,
              durable, and professional finish.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/quote" className="brand-button-primary">
                Get a Quote →
              </Link>
              <Link href="/catalog" className="brand-button-secondary">
                See Our Work
              </Link>
            </div>

            <div className="brand-divider my-12" />

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-sm text-[var(--text-soft)]">
                <span className="mr-2 text-[var(--teal)]">•</span>
                Based in Johannesburg North
              </div>
              <div className="text-sm text-[var(--text-soft)]">
                <span className="mr-2 text-[var(--teal)]">•</span>
                Quote-based service only
              </div>
              <div className="text-sm text-[var(--text-soft)]">
                <span className="mr-2 text-[var(--teal)]">•</span>
                Gauteng and neighbouring provinces
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="brand-card">
              <div className="brand-card-visual min-h-[230px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#11c5a147] bg-[#11c5a112] text-[#11c5a1]">
                  ☐
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Treatment & professional furniture
                  </p>
                  <h3 className="mt-2 text-2xl">Clinical restoration</h3>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">
                    Reupholstery, repair, accessories, and refurbishment
                  </p>
                </div>
                <span className="brand-badge">Quote only</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="brand-stat">
                <div className="brand-stat-number">01</div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Consultation first
                </p>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-number">02</div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Assessed properly
                </p>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-number">03</div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">
                  Restored professionally
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-section pt-0">
        <div className="brand-container">
          <span className="brand-kicker">About MediRevive</span>
          <h2 className="brand-title-lg mt-5">
            Restoration and reupholstery for treatment and professional-use furniture.
          </h2>
          <p className="brand-body mt-6">
            We work with chiropractors, hospitals, biokineticists, physiotherapists,
            clinics, wellness centres, salons, and other professional environments to
            extend the life of equipment while maintaining hygiene, durability, and a
            professional finish.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {aboutPoints.map((point) => (
              <div key={point} className="brand-panel-soft p-5">
                <p className="text-base leading-8 text-[var(--text)]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section pt-0">
        <div className="brand-container">
          <span className="brand-kicker">Services preview</span>
          <h2 className="brand-title-lg mt-5">
            Specialist services, not one-size-fits-all repairs.
          </h2>
          <p className="brand-body mt-6">
            MediRevive treats each restoration as a professional service job —
            assessed properly, quoted properly, and completed to a high standard.
          </p>

          <div className="brand-panel mt-12 grid overflow-hidden md:grid-cols-2">
            {serviceCards.map((service, index) => (
              <div
                key={service.title}
                className={`p-7 md:p-8 ${index < 2 ? "border-b border-white/10" : ""} ${
                  index % 2 === 0 ? "md:border-r md:border-white/10" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#11c5a147] bg-[#11c5a112] text-[#11c5a1]">
                  ✦
                </div>
                <h3 className="mt-6 text-3xl">{service.title}</h3>
                <p className="mt-4 leading-8 text-[var(--text-soft)]">
                  {service.description}
                </p>
                <Link
                  href="/quote"
                  className="mt-6 inline-block text-sm font-medium text-[var(--teal)]"
                >
                  Request a consultation →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section pt-0">
        <div className="brand-container">
          <span className="brand-kicker">Equipment preview</span>
          <h2 className="brand-title-lg mt-5">Equipment we work with.</h2>
          <p className="brand-body mt-6">
            From plinths and treatment beds to stools, office seating, and custom items,
            MediRevive handles a broad range of professional-use furniture.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentPreview.map((item) => (
              <div key={item} className="brand-panel-soft p-5">
                <p className="text-base text-[var(--text)]">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/catalog" className="brand-button-secondary">
              View equipment categories
            </Link>
          </div>
        </div>
      </section>

      <section className="brand-section pt-0">
        <div className="brand-container">
          <div className="brand-panel p-8 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="brand-kicker">Contact & WhatsApp</span>
                <h2 className="mt-5 text-4xl">Need to discuss an item first?</h2>
                <p className="mt-4 leading-8 text-[var(--text-soft)]">
                  MediRevive works on a quote-only basis. Send through your equipment
                  details, area, and photos for assessment before pricing is provided.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://wa.me/270000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-primary"
                >
                  WhatsApp Us →
                </a>
                <Link href="/contact" className="brand-button-secondary">
                  Contact Details
                </Link>
              </div>
            </div>

            <div className="brand-divider my-8" />

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
      </section>
    </main>
  );
}