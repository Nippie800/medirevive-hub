"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  itemType: string;
  description: string;
  consent: boolean;
};

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  serviceType: "",
  itemType: "",
  description: "",
  consent: false,
};

export default function QuotePage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function generateReference() {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `MR-${new Date().getFullYear()}-${random}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const reference = generateReference();

      await addDoc(collection(db, "quoteRequests"), {
        reference,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        serviceType: form.serviceType,
        itemType: form.itemType,
        description: form.description,
        consentToContact: form.consent,
        status: "NEW",
        createdAt: serverTimestamp(),
      });

      setSuccessMessage(
        `Quote request sent successfully. Your reference number is ${reference}.`
      );
      setForm(initialForm);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setErrorMessage("Something went wrong while sending your request.");
    } finally {
      setLoading(false);
    }
  }

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
              href="/catalog"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Catalog
            </Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Quote Request
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Tell us what you need
          </h1>
          <p className="mt-3 text-slate-600">
            Complete the form below and MediRevive will contact you regarding your
            medical equipment or bedding quotation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="serviceType"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Service Type
              </label>
              <select
                id="serviceType"
                name="serviceType"
                required
                value={form.serviceType}
                onChange={(e) =>
                  setForm({ ...form, serviceType: e.target.value })
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              >
                <option value="">Select a service</option>
                <option value="Reupholstery">Reupholstery</option>
                <option value="Repairs">Repairs</option>
                <option value="Custom Refurbishment">Custom Refurbishment</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="itemType"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Item Type
            </label>
            <input
              id="itemType"
              name="itemType"
              type="text"
              required
              placeholder="e.g. Hospital bed, treatment chair, wheelchair"
              value={form.itemType}
              onChange={(e) => setForm({ ...form, itemType: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              placeholder="Describe the work needed..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-4">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) =>
                setForm({ ...form, consent: e.target.checked })
              }
              className="mt-1 h-4 w-4"
            />
            <label htmlFor="consent" className="text-sm leading-6 text-slate-600">
              I agree to be contacted by MediRevive regarding my request and future
              service-related communication.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit Quote Request"}
          </button>

          {successMessage && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}