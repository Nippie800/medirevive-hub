"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CatalogCategory = "All" | "Beds" | "Chairs" | "Mobility" | "Tables" | "Custom";

type CatalogItem = {
  title: string;
  description: string;
  category: CatalogCategory;
  image: string;
};

const categories: CatalogCategory[] = [
  "All",
  "Beds",
  "Chairs",
  "Mobility",
  "Tables",
  "Custom",
];

const catalogItems: CatalogItem[] = [
  {
    title: "Hospital Beds",
    description:
      "Reupholstery and restoration for worn medical bedding and hospital bed sections.",
    category: "Beds",
    image: "/catalog/hospital-bed.png",
  },
  {
    title: "Treatment Chairs",
    description:
      "Refurbishment for treatment and examination chairs used in healthcare environments.",
    category: "Chairs",
    image: "/catalog/treatment-chair.png",
  },
  {
    title: "Wheelchairs",
    description:
      "Seat, cushion, and support restoration for patient mobility equipment.",
    category: "Mobility",
    image: "/catalog/wheelchair.png",
  },
  {
    title: "Medical Stools",
    description:
      "Repair and upholstery refreshes for stools used in consulting and treatment rooms.",
    category: "Chairs",
    image: "/catalog/medical-stool.png",
  },
  {
    title: "Examination Tables",
    description:
      "Professional re-covering and restoration for examination and therapy tables.",
    category: "Tables",
    image: "/catalog/exam-table.png",
  },
  {
    title: "Custom Medical Equipment",
    description:
      "Tailored upholstery and refurbishment solutions for specialized medical equipment.",
    category: "Custom",
    image: "/catalog/custom-equipment.png",
  },
];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return catalogItems;
    return catalogItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight text-sky-800">
            MediRevive
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/quote"
              className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Catalog
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Services and equipment categories
          </h1>
          <p className="mt-4 text-slate-600">
            Browse the equipment types MediRevive can restore, repair, or reupholster.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-sky-700 text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
            >
             <div className="h-64 w-full bg-white p-4">
  <div className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-200 bg-white">
    <img
      src={item.image}
      alt={item.title}
      className="h-full w-full object-contain p-3"
    />
  </div>
</div>

              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {item.category}
                </p>
                <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-sky-700 p-8 text-white">
          <h2 className="text-2xl font-bold">Need pricing for a specific item?</h2>
          <p className="mt-3 max-w-2xl text-sky-100">
            Send MediRevive your item details, photos, and a description of the work needed.
          </p>
          <Link
            href="/quote"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-sky-800 transition hover:bg-slate-100"
          >
            Go to Quote Request
          </Link>
        </div>
      </section>
    </main>
  );
}