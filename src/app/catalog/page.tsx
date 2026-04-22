"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type EquipmentCategory =
  | "All"
  | "Beds & Plinths"
  | "Chairs & Stools"
  | "Professional Furniture"
  | "Accessories"
  | "Custom";

type EquipmentItem = {
  title: string;
  description: string;
  category: EquipmentCategory;
  image: string;
};

const categories: EquipmentCategory[] = [
  "All",
  "Beds & Plinths",
  "Chairs & Stools",
  "Professional Furniture",
  "Accessories",
  "Custom",
];

const equipmentItems: EquipmentItem[] = [
  {
    title: "Treatment Beds & Plinths",
    description:
      "Electrical plinths, standard plinths, bobath plinths, portable plinths, chiropractic beds, and traction beds.",
    category: "Beds & Plinths",
    image: "/catalog/hospital-bed.png",
  },
  {
    title: "Treatment Chairs",
    description:
      "Reupholstery and restoration for treatment chairs, therapy chairs, and specialist seating.",
    category: "Chairs & Stools",
    image: "/catalog/treatment-chair.png",
  },
  {
    title: "Mobility Seating",
    description:
      "Assessment-based restoration for selected mobility and support seating items.",
    category: "Chairs & Stools",
    image: "/catalog/wheelchair.png",
  },
  {
    title: "Round & Saddle Stools",
    description:
      "Support seating restored for durability, hygiene, and a cleaner finish.",
    category: "Chairs & Stools",
    image: "/catalog/medical-stool.png",
  },
  {
    title: "Consultation & Examination Furniture",
    description:
      "Examination tables, office chairs, reception seating, and professional-use furniture.",
    category: "Professional Furniture",
    image: "/catalog/exam-table.png",
  },
  {
    title: "Custom Accessories",
    description:
      "Plinth covers, pillowcases, PVC bed covers, stool covers, and bespoke add-ons.",
    category: "Accessories",
    image: "/catalog/custom-equipment.png",
  },
];

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState<EquipmentCategory>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return equipmentItems;
    return equipmentItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="site-shell">
      <section className="site-section">
        <div className="site-container">
          <div className="max-w-3xl">
            <span className="site-kicker">Equipment we work with</span>
            <h1 className="site-title-lg mt-5">
              Clear categories. Quote-only service.
            </h1>
            <p className="site-body mt-6">
              MediRevive does not sell standard products through the site. This page
              shows the types of equipment and professional-use items we typically
              restore, repair, or reupholster.
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
                      ? "site-button-primary min-h-0 px-4 py-2 text-sm"
                      : "rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-soft)] hover:bg-[var(--background-soft)]"
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <div key={item.title} className="site-card overflow-hidden">
                <div className="h-72 w-full bg-[var(--background-soft)] p-4">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-[var(--border)] bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-4"
                    />
                  </div>
                </div>

                <div className="site-card-body">
                  <span className="site-badge">{item.category}</span>
                  <h2 className="mt-4 text-2xl">{item.title}</h2>
                  <p className="mt-4 leading-8 text-[var(--text-soft)]">
                    {item.description}
                  </p>
                  <div className="mt-6">
                    <Link href="/quote" className="site-button-secondary">
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="site-card mt-12">
            <div className="site-card-body">
              <span className="site-kicker">Custom items accepted</span>
              <h2 className="mt-5 text-4xl">Not listed here?</h2>
              <p className="mt-4 max-w-2xl leading-8 text-[var(--text-soft)]">
                If your item is not shown above, you can still send details and photos
                for assessment. MediRevive also handles bespoke and custom solutions.
              </p>

              <div className="mt-6">
                <Link href="/quote" className="site-button-primary">
                  Start a Quote Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}