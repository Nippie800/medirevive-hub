"use client";

import Link from "next/link";
import Logo from "./Brand";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-white">

      <div className="site-container py-16">

        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">

          {/* LEFT */}

          <div>

            <Logo
              size="small"
              showTagline={false}
            />

            <p className="mt-6 max-w-md leading-8 text-[var(--text-soft)]">
              We specialise in the restoration, repair and
              reupholstery of medical, physiotherapy,
              wellness and commercial furniture using
              durable, hygienic, medical-grade materials.
            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-lg font-semibold text-[var(--text)]">
              Quick Links
            </h3>

            <div className="mt-6 grid gap-4">

              <Link
                href="/"
                className="footer-link"
              >
                Home
              </Link>

              <Link
                href="/catalog"
                className="footer-link"
              >
                Equipment We Restore
              </Link>

              <Link
                href="/gallery"
                className="footer-link"
              >
                Gallery
              </Link>

              <Link
                href="/quote"
                className="footer-link"
              >
                Request Quote
              </Link>

              <Link
                href="/contact"
                className="footer-link"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* CONTACT + QR */}

          <div>

            <h3 className="text-lg font-semibold text-[var(--text)]">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <div>

                <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Phone
                </p>

                <p className="mt-1 text-[var(--text)]">
                  +27 66 272 8667
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Email
                </p>

                <p className="mt-1 text-[var(--text)]">
                  info@medi-revive.co.za
                </p>

              </div>

              <div>

                <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Location
                </p>

                <p className="mt-1 text-[var(--text)]">
                  Johannesburg, South Africa
                </p>

              </div>

            </div>

            {/* QR */}

            <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--background-soft)] p-6">

              <h4 className="font-semibold text-[var(--text)]">
                Visit us online
              </h4>

              <img
                src="/qr-code.png"
                alt="MediRevive QR Code"
                className="mx-auto mt-5 h-36 w-36 object-contain"
              />

              <p className="mt-5 text-center text-sm leading-7 text-[var(--text-soft)]">
                Scan to explore our services and
                request a quote instantly.
              </p>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-16 rounded-3xl bg-[var(--primary)] px-8 py-10 text-white">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.18em] opacity-80">
                Ready to Restore?
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Let's bring your equipment back to life.
              </h2>

            </div>

            <Link
              href="/quote"
              className="
                rounded-xl
                bg-white
                px-8
                py-4
                font-semibold
                text-[var(--primary)]
                transition
                hover:scale-105
              "
            >
              Request a Quote
            </Link>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} MediRevive.
            All Rights Reserved.
          </p>

          <p>
            Healthcare • Wellness • Commercial Furniture Restoration
          </p>

        </div>

      </div>

    </footer>
  );
}