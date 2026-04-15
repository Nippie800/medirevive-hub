import Link from "next/link";

const catalogItems = [
  {
    title: "Hospital Beds",
    description:
      "Reupholstery and surface restoration for medical bedding and bed sections.",
  },
  {
    title: "Treatment Chairs",
    description:
      "Refurbishment for worn chair surfaces used in clinics and treatment rooms.",
  },
  {
    title: "Wheelchairs",
    description:
      "Seat and cushion material replacement or restoration for patient mobility equipment.",
  },
  {
    title: "Medical Stools",
    description:
      "Repairs and upholstery refreshes for stools used in healthcare spaces.",
  },
  {
    title: "Examination Tables",
    description:
      "Professional re-covering and restoration for examination and therapy tables.",
  },
  {
    title: "Custom Medical Equipment",
    description:
      "Specialized work on medical equipment requiring tailored upholstery solutions.",
  },
];

export default function CatalogPage() {
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
            Browse the types of medical bedding and equipment MediRevive can work on.
            This catalog is designed to guide clients before they request a quote.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {catalogItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="mb-4 h-40 rounded-xl bg-slate-100" />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-sky-700 p-8 text-white">
          <h2 className="text-2xl font-bold">Need pricing for a specific item?</h2>
          <p className="mt-3 max-w-2xl text-sky-100">
            Send MediRevive your item details and a short description of the work needed.
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