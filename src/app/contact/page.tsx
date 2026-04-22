"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
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
              className="h-10 w-auto"
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
            <Link href="/contact" className="text-sm font-medium text-[var(--primary)]">
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
              <Link href="/contact" onClick={closeMenu} className="rounded-xl bg-[var(--background-soft)] px-4 py-3 text-sm font-medium text-[var(--primary)]">
                Contact
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <section className="site-section">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="site-kicker">Contact</span>
            <h1 className="site-title-lg mt-5">Simple contact details. Quote-based service.</h1>
            <p className="site-body mt-6">
              MediRevive works on a quote-only basis. Get in touch to discuss
              treatment, clinical, wellness, salon, office, or other professional-use
              furniture that needs restoration, reupholstery, repair, or accessories.
            </p>

            <div className="site-card mt-8">
              <div className="site-card-body">
                <h2 className="text-2xl">Important note</h2>
                <p className="mt-4 leading-8 text-[var(--text-soft)]">
                  Pricing is not listed on the website. Each request is assessed
                  individually based on equipment condition, repair scope, materials,
                  and service location.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Phone
                </p>
                <p className="mt-3 text-2xl text-[var(--text)]">
                  Replace with phone number
                </p>
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Email
                </p>
                <p className="mt-3 text-2xl text-[var(--text)]">
                  Replace with email address
                </p>
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Location
                </p>
                <p className="mt-3 text-2xl text-[var(--text)]">
                  Johannesburg North
                </p>
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  WhatsApp
                </p>
                <p className="mt-3 leading-8 text-[var(--text-soft)]">
                  The easiest way to send photos, explain the issue, and discuss next steps.
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/270000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-button-primary"
                  >
                    Open WhatsApp
                  </a>
                  <Link href="/quote" className="site-button-secondary">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}