"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="site-section">
      <div className="site-container">

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

          {/* LEFT */}

          <div>

            <span className="site-kicker">
              HEALTHCARE • WELLNESS • COMMERCIAL FURNITURE RESTORATION
            </span>

            <h1 className="site-title-lg mt-6 max-w-[11ch]">
              Restore.
              <br />
              Renew.
              <br />
              Extend Equipment Life.
            </h1>

            <p className="site-body mt-8">
              We specialise in the reupholstery and restoration of medical,
              physiotherapy, wellness and professional-use furniture.
            </p>

            <p className="site-body mt-5">
              From treatment plinths and examination beds to waiting room
              seating and privacy curtains, using durable, hygienic
              medical-grade materials and a wide range of custom colour
              options, we help facilities avoid costly replacements.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                href="/quote"
                className="site-button-primary"
              >
                Request a Quote
              </Link>

              <a
                href="#services"
                className="site-button-secondary"
              >
                Explore Our Services
              </a>

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">

            <div className="site-stat">
              <div className="site-stat-number">01</div>

              <h3 className="mt-3 text-lg font-semibold">
                Quote-Based Service
              </h3>

              <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                Every restoration begins with a tailored assessment and
                quotation.
              </p>
            </div>

            <div className="site-stat">
              <div className="site-stat-number">02</div>

              <h3 className="mt-3 text-lg font-semibold">
                Collection & Return
              </h3>

              <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                Collection and delivery options available depending on your
                location and project requirements.
              </p>
            </div>

            <div className="site-stat">
              <div className="site-stat-number">03</div>

              <h3 className="mt-3 text-lg font-semibold">
                Trusted Materials
              </h3>

              <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                Durable, hygienic upholstery materials designed for healthcare,
                wellness and commercial environments.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}