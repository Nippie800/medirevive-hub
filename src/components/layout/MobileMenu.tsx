"use client";

import Link from "next/link";

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  closeMenu: () => void;
};

export default function MobileMenu({
  mobileMenuOpen,
  closeMenu,
}: MobileMenuProps) {
  if (!mobileMenuOpen) return null;

  return (
    <div className="border-t border-[var(--border)] bg-white shadow-xl md:hidden">
      <div className="site-container py-6">

        {/* Main Navigation */}

        <nav className="space-y-2">

          <Link
            href="/"
            onClick={closeMenu}
            className="mobile-link"
          >
            Home
          </Link>

          <Link
            href="/catalog"
            onClick={closeMenu}
            className="mobile-link"
          >
            Equipment We Restore
          </Link>

          <Link
            href="/gallery"
            onClick={closeMenu}
            className="mobile-link"
          >
            Gallery
          </Link>

          <Link
            href="/quote"
            onClick={closeMenu}
            className="mobile-link"
          >
            Request Quote
          </Link>

          <Link
            href="/contact"
            onClick={closeMenu}
            className="mobile-link"
          >
            Contact
          </Link>

        </nav>

        {/* Divider */}

        <div className="my-6 h-px bg-[var(--border)]" />

        {/* Equipment Categories */}

        <div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Explore Our Services
          </p>

          <div className="grid gap-2">

            <Link
              href="/catalog"
              onClick={closeMenu}
              className="mobile-sub-link"
            >
              Examination Beds & Plinths
            </Link>

            <Link
              href="/catalog"
              onClick={closeMenu}
              className="mobile-sub-link"
            >
              Medical Seating
            </Link>

            <Link
              href="/catalog"
              onClick={closeMenu}
              className="mobile-sub-link"
            >
              Office & Reception Furniture
            </Link>

            <Link
              href="/catalog"
              onClick={closeMenu}
              className="mobile-sub-link"
            >
              Privacy Curtains & Screens
            </Link>

            <Link
              href="/catalog"
              onClick={closeMenu}
              className="mobile-sub-link"
            >
              Custom Projects
            </Link>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-8">

          <Link
            href="/quote"
            onClick={closeMenu}
            className="site-button-primary w-full justify-center"
          >
            Request a Quote
          </Link>

        </div>

      </div>
    </div>
  );
}