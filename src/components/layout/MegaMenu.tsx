"use client";

import Link from "next/link";

export default function MegaMenu() {
  return (
    <div className="relative group">

      {/* Trigger */}

      <button
        type="button"
        className="
          flex
          items-center
          gap-2
          text-sm
          font-medium
          text-[var(--text-soft)]
          transition-colors
          hover:text-[var(--primary)]
        "
      >
        Explore Our Services

        <span className="transition duration-300 group-hover:rotate-180">
          ▼
        </span>
      </button>

      {/* Mega Menu */}

      <div
        className="
          invisible
          absolute
          left-1/2
          top-full
          z-50
          mt-5
          w-[1050px]
          -translate-x-1/2
          rounded-3xl
          border
          border-[var(--border)]
          bg-white
          p-10
          shadow-2xl
          opacity-0
          transition-all
          duration-300
          group-hover:visible
          group-hover:opacity-100
        "
      >

        <div className="grid grid-cols-[1.35fr_0.95fr] gap-10">

          {/* LEFT */}

          <div className="grid grid-cols-3 gap-8">

            {/* Beds */}

            <div>

              <h4 className="text-sm font-bold text-[var(--text)]">
                Examination Beds & Plinths
              </h4>

              <div className="mt-4 grid gap-3">

                <Link href="/catalog" className="mega-link">
                  Electrical Plinths
                </Link>

                <Link href="/catalog" className="mega-link">
                  Standard Plinths
                </Link>

                <Link href="/catalog" className="mega-link">
                  Bobath Plinths
                </Link>

                <Link href="/catalog" className="mega-link">
                  Portable Plinths
                </Link>

                <Link href="/catalog" className="mega-link">
                  Chiropractic Beds
                </Link>

                <Link href="/catalog" className="mega-link">
                  Traction Beds
                </Link>

              </div>

            </div>

            {/* Seating */}

            <div>

              <h4 className="text-sm font-bold text-[var(--text)]">
                Medical Seating
              </h4>

              <div className="mt-4 grid gap-3">

                <Link href="/catalog" className="mega-link">
                  Round Stools
                </Link>

                <Link href="/catalog" className="mega-link">
                  Saddle Chairs
                </Link>

                <Link href="/catalog" className="mega-link">
                  Office Chairs
                </Link>

              </div>

              <h4 className="mt-10 text-sm font-bold text-[var(--text)]">
                Privacy Curtains
              </h4>

              <div className="mt-4 grid gap-3">

                <Link href="/catalog" className="mega-link">
                  Privacy Curtains
                </Link>

                <Link href="/catalog" className="mega-link">
                  Medical Screens
                </Link>

              </div>

            </div>

            {/* Commercial */}

            <div>

              <h4 className="text-sm font-bold text-[var(--text)]">
                Office & Reception
              </h4>

              <div className="mt-4 grid gap-3">

                <Link href="/catalog" className="mega-link">
                  Reception Seating
                </Link>

                <Link href="/catalog" className="mega-link">
                  Office Chairs
                </Link>

                <Link href="/catalog" className="mega-link">
                  Consultation Furniture
                </Link>

              </div>

              <h4 className="mt-10 text-sm font-bold text-[var(--text)]">
                Custom Projects
              </h4>

              <div className="mt-4 grid gap-3">

                <Link href="/catalog" className="mega-link">
                  PVC Bed Covers
                </Link>

                <Link href="/catalog" className="mega-link">
                  Saddle Chair Covers
                </Link>

                <Link href="/catalog" className="mega-link">
                  Pillowcases
                </Link>

                <Link href="/catalog" className="mega-link">
                  Scrubs
                </Link>

                <Link href="/catalog" className="mega-link">
                  Mulligan Belts
                </Link>

                <Link href="/catalog" className="mega-link">
                  Custom Upholstery
                </Link>

              </div>

            </div>

          </div>

          {/* FEATURED */}

          <Link
            href="/catalog"
            className="group block"
          >

            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-[var(--border)]
                bg-white
                p-6
              "
            >

              <img
                src="/catalog/featured-bed.jpg"
                alt="Treatment Bed"
                className="
                  h-80
                  w-full
                  object-contain
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

            </div>

            <p
              className="
                mt-5
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-[var(--text-muted)]
              "
            >
              Featured Restoration
            </p>

            <h3 className="mt-2 text-xl font-bold text-[var(--text)]">
              Treatment & Examination Beds
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
              Discover our complete range of restored medical,
              physiotherapy and wellness equipment.
            </p>

            <span className="mt-5 inline-flex font-semibold text-[var(--primary)]">
              Explore Equipment →
            </span>

          </Link>

        </div>

      </div>

    </div>
  );
}