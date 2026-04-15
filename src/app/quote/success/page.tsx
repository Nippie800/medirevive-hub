"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function QuoteSuccessPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Request Submitted
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Your quote request has been received
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Thank you for contacting MediRevive. Your request has been logged and our
            team will review it shortly.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 px-6 py-5">
            <p className="text-sm text-slate-500">Reference Number</p>
            <p className="mt-2 text-2xl font-bold tracking-wide text-sky-800">
              {reference ?? "Reference pending"}
            </p>
          </div>

          <div className="mt-8 space-y-3 text-sm text-slate-600">
            <p>Keep this reference for any follow-up communication.</p>
            <p>MediRevive may contact you for more details or photos if needed.</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/catalog"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Back to Catalog
            </Link>
            <Link
              href="/"
              className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800"
            >
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}