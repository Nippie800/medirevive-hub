"use client";

import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="site-section pt-0">
      <div className="site-container">

        <div className="site-card overflow-hidden">

          <div className="site-card-body">

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}

              <div className="max-w-2xl">

                <span className="site-kicker">
                  Ready to Get Started?
                </span>

                <h2 className="mt-6 text-4xl font-bold text-[var(--text)]">
                  Let's restore your equipment.
                </h2>

                <p className="mt-6 leading-8 text-[var(--text-soft)]">
                  Whether you require a single examination bed or a complete
                  clinic refurbishment, our team is ready to help. Send us your
                  equipment details and receive a professional quotation.
                </p>

              </div>

              {/* RIGHT */}

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">

                <Link
                  href="/quote"
                  className="site-button-primary justify-center"
                >
                  Request a Quote
                </Link>

                <a
                  href="https://wa.me/27662728667?text=Hi%20MediRevive,%20I%20would%20like%20to%20request%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-button-secondary justify-center"
                >
                  WhatsApp Us
                </a>

              </div>

            </div>

            {/* Divider */}

            <div className="site-divider my-10" />

            {/* Contact Cards */}

            <div className="grid gap-6 md:grid-cols-3">

              <div className="site-card-soft p-5">

                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Phone
                </p>

                <p className="mt-3 text-lg font-semibold">
                  +27 66 272 8667
                </p>

              </div>

              <div className="site-card-soft p-5">

                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Email
                </p>

                <p className="mt-3 text-lg font-semibold break-words">
                  info@medi-revive.co.za
                </p>

              </div>

              <div className="site-card-soft p-5">

                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Service Area
                </p>

                <p className="mt-3 text-lg font-semibold">
                  Johannesburg & Surrounds
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}