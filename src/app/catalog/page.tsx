"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EquipmentCategory =
  | "All"
  | "Plinths & Beds"
  | "Chairs & Seating"
  | "Professional Furniture"
  | "Accessories"
  | "Custom";

type EquipmentItem = {
  title: string;
  description: string;
  category: EquipmentCategory;
  image: string;
  tag: string;
};

const categories: EquipmentCategory[] = [
  "All",
  "Plinths & Beds",
  "Chairs & Seating",
  "Professional Furniture",
  "Accessories",
  "Custom",
];

const equipmentItems: EquipmentItem[] = [
  {
    title: "Treatment Beds & Plinths",
    description:
      "Electrical plinths, standard plinths, bobath plinths, portable plinths, chiropractic beds, and traction beds.",
    category: "Plinths & Beds",
    image: "/catalog/hospital-bed.png",
    tag: "Core category",
  },
  {
    title: "Treatment Chairs",
    description:
      "Professional reupholstery and restoration for treatment chairs, therapy chairs, and specialist seating.",
    category: "Chairs & Seating",
    image: "/catalog/treatment-chair.png",
    tag: "Professional use",
  },
  {
    title: "Wheelchairs & Mobility Seating",
    description:
      "Seat, cushion, and support restoration where required for comfort, hygiene, and a cleaner finish.",
    category: "Chairs & Seating",
    image: "/catalog/wheelchair.png",
    tag: "Assessment needed",
  },
  {
    title: "Round & Saddle Stools",
    description:
      "Round stools, saddle chairs, and other support seating reupholstered for durability and professional presentation.",
    category: "Chairs & Seating",
    image: "/catalog/medical-stool.png",
    tag: "Workshop repair",
  },
  {
    title: "Examination & Consultation Furniture",
    description:
      "Examination tables, consultation furniture, office chairs, reception seating, and related professional-use furniture.",
    category: "Professional Furniture",
    image: "/catalog/exam-table.png",
    tag: "Professional spaces",
  },
  {
    title: "Custom Accessories & Bespoke Items",
    description:
      "Plinth covers, pillowcases, PVC bed covers, stool covers, chair covers, custom scrubs, Mulligan NAGS & SNAGS belts, and tailored accessory solutions.",
    category: "Accessories",
    image: "/catalog/custom-equipment.png",
    tag: "Custom made",
  },
];

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState<EquipmentCategory>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return equipmentItems;
    return equipmentItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="brand-shell">
      <section className="brand-container pt-6">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#11c5a147] bg-[#11c5a112] text-[#11c5a1]">
              +
            </div>
            <span className="text-lg text-[var(--text)]">
              <span className="font-medium">Medi</span>
              <span className="text-[#11c5a1]">Revive</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-3 md:flex">
            <Link href="/" className="text-sm text-[var(--text-soft)] transition hover:text-white">
              Home
            </Link>
            <Link href="/quote" className="text-sm text-[var(--text-soft)] transition hover:text-white">
              Consultation
            </Link>
            <Link href="/contact" className="text-sm text-[var(--text-soft)] transition hover:text-white">
              Contact
            </Link>
            <Link href="/admin" className="brand-button-primary">
              Dashboard
            </Link>
          </nav>

          <div className="md:hidden">
            <Link href="/quote" className="brand-button-primary text-sm">
              Quote
            </Link>
          </div>
        </header>
      </section>

      <section className="brand-section">
        <div className="brand-container">
          <div className="max-w-3xl">
            <span className="brand-kicker">Equipment we work with</span>
            <h1 className="brand-title-lg mt-5">
              Quote-only restoration for treatment, clinical, and professional furniture.
            </h1>
            <p className="brand-body mt-6">
              This page shows the types of equipment and professional-use items
              MediRevive typically restores, reupholsters, repairs, or manufactures
              accessories for. Custom items are also accepted for assessment.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={
                    isActive
                      ? "brand-button-primary min-h-0 px-4 py-2 text-sm"
                      : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-soft)] transition hover:bg-white/10 hover:text-white"
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <div key={item.title} className="brand-card">
                <div className="h-72 w-full p-4">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-4"
                    />
                  </div>
                </div>

                <div className="brand-card-body">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
                      {item.category}
                    </p>
                    <span className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {item.tag}
                    </span>
                  </div>

                  <h2 className="mt-3 text-2xl text-[var(--text)]">{item.title}</h2>
                  <p className="mt-3 leading-8 text-[var(--text-soft)]">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="brand-badge">Quote only</span>
                    <Link href="/quote" className="text-sm font-medium text-[var(--teal)]">
                      Request quote →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="brand-panel mt-12 p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="brand-kicker">Custom items accepted</span>
                <h2 className="mt-5 text-4xl">Not listed above?</h2>
                <p className="mt-4 leading-8 text-[var(--text-soft)]">
                  MediRevive also handles bespoke solutions. If your treatment,
                  clinical, wellness, salon, or professional-use item is not shown
                  here, you can still send photos and details for assessment.
                </p>
              </div>

              <Link href="/quote" className="brand-button-primary">
                Start consultation →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}