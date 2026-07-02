"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Brand";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-container flex items-center justify-between py-6">
        <Logo onClick={closeMenu} />

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--text-soft)] transition-colors hover:text-[var(--primary)]"
          >
            Home
          </Link>

          <MegaMenu />

          <Link
            href="/gallery"
            className="text-sm font-medium text-[var(--text-soft)] transition-colors hover:text-[var(--primary)]"
          >
            Gallery
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-[var(--text-soft)] transition-colors hover:text-[var(--primary)]"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link href="/quote" className="site-button-primary">
            Request Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--primary)] md:hidden"
        >
          <span className="relative block h-5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-200 ${
                mobileMenuOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />

            <span
              className={`absolute left-0 top-2 block h-0.5 w-5 bg-current transition-all duration-200 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-200 ${
                mobileMenuOpen ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </span>
        </button>
      </div>

      <MobileMenu mobileMenuOpen={mobileMenuOpen} closeMenu={closeMenu} />
    </header>
  );
}