import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight text-sky-800">
            MediRevive
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Catalog
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
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Medical Upholstery & Refurbishment
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Restore medical bedding and equipment professionally
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              MediRevive helps clinics, hospitals, care facilities, and practices
              renew worn medical bedding and equipment with reliable upholstery,
              repairs, and refurbishment services.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
              >
                Request a Quote
              </Link>
              <Link
                href="/catalog"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                View Catalog
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-sky-700">Hospital Beds</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Reupholstery and restoration for worn or damaged medical bedding.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-sky-700">Treatment Chairs</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Clean, durable refurbishment for professional care environments.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-sky-700">Wheelchairs</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Seat and support restoration to improve comfort and presentation.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-sky-700">Custom Work</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tailored upholstery and equipment refresh services based on need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold">Step 1</h2>
            <p className="mt-2 text-slate-600">
              Browse the catalog to see the types of items and services available.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold">Step 2</h2>
            <p className="mt-2 text-slate-600">
              Submit a quote request with your item details and contact information.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold">Step 3</h2>
            <p className="mt-2 text-slate-600">
              Receive confirmation and wait for MediRevive to contact you with the next steps.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}