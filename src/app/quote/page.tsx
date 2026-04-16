"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../lib/firebase";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  serviceType: string;
  itemType: string;
  description: string;
  consent: boolean;
};

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  serviceType: "",
  itemType: "",
  description: "",
  consent: false,
};

const consultationNotes = [
  "Every quote is based on the real condition of the equipment.",
  "Photos help us assess the restoration scope more accurately.",
  "Location helps with logistics, travel, and collection planning.",
];

export default function QuotePage() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>(initialForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedImageName = useMemo(
    () => selectedImage?.name ?? "No file selected",
    [selectedImage]
  );

  function generateReference() {
    const random = Math.floor(1000 + Math.random() * 9000);
    return `MR-${new Date().getFullYear()}-${random}`;
  }

  async function uploadImage(file: File, referenceCode: string) {
    const fileExtension = file.name.split(".").pop() || "jpg";
    const storageRef = ref(
      storage,
      `quote-uploads/${referenceCode}-${Date.now()}.${fileExtension}`
    );

    await uploadBytes(storageRef, {
      ...file,
    } as Blob, {
      contentType: file.type,
    });

    return getDownloadURL(storageRef);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const reference = generateReference();
      let imageUrl = "";

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage, reference);
      }

      await addDoc(collection(db, "quoteRequests"), {
        reference,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        serviceType: form.serviceType,
        itemType: form.itemType,
        description: form.description,
        consentToContact: form.consent,
        imageUrl,
        status: "NEW",
        createdAt: serverTimestamp(),
      });

      setForm(initialForm);
      setSelectedImage(null);

      router.push(`/quote/success?ref=${encodeURIComponent(reference)}`);
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setErrorMessage("Something went wrong while sending your request.");
    } finally {
      setLoading(false);
    }
  }

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
            <Link href="/catalog" className="text-sm text-[var(--text-soft)] transition hover:text-white">
              Equipment
            </Link>
            <Link href="/contact" className="text-sm text-[var(--text-soft)] transition hover:text-white">
              Contact
            </Link>
            <Link href="/admin" className="brand-button-primary">
              Dashboard
            </Link>
          </nav>

          <div className="md:hidden">
            <Link href="/catalog" className="brand-button-secondary text-sm">
              Equipment
            </Link>
          </div>
        </header>
      </section>

      <section className="brand-section">
        <div className="brand-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-10">
            <span className="brand-kicker">Consultation request</span>
            <h1 className="brand-title-lg mt-5">Tell us what needs restoring.</h1>
            <p className="brand-body mt-6">
              Submit your equipment details for a specialist assessment. Pricing is
              provided by quote only after we review the condition, scope, and logistics.
            </p>

            <div className="brand-panel mt-10 p-6">
              <h2 className="text-2xl">What to expect</h2>
              <div className="mt-5 space-y-4">
                {consultationNotes.map((note) => (
                  <div key={note} className="flex items-start gap-3 text-[var(--text-soft)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--teal)]" />
                    <p className="leading-8">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="brand-panel p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="brand-input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="brand-input"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="brand-input"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Location / area
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. Johannesburg North, Pretoria, Rustenburg"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="brand-input"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Service needed
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    className="brand-select"
                  >
                    <option value="">Select a service</option>
                    <option value="Treatment & Professional Furniture Reupholstery">
                      Treatment & Professional Furniture Reupholstery
                    </option>
                    <option value="Structural Repairs & Refurbishment">
                      Structural Repairs & Refurbishment
                    </option>
                    <option value="Custom Accessories">
                      Custom Accessories
                    </option>
                    <option value="Bespoke Solution">
                      Bespoke Solution
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="itemType" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                  Equipment type
                </label>
                <input
                  id="itemType"
                  name="itemType"
                  type="text"
                  required
                  placeholder="e.g. Treatment bed, plinth, office chair, stool"
                  value={form.itemType}
                  onChange={(e) => setForm({ ...form, itemType: e.target.value })}
                  className="brand-input"
                />
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                  Equipment condition & required work
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  placeholder="Describe the equipment condition, issue, and service needed..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="brand-textarea"
                />
              </div>

              <div className="brand-panel-soft p-5">
                <label htmlFor="quoteImage" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                  Upload supporting image
                </label>

                <label
                  htmlFor="quoteImage"
                  className="flex cursor-pointer flex-col items-start justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <span className="text-base font-medium text-[var(--text)]">
                    Add equipment photo
                  </span>
                  <span className="mt-2 text-sm text-[var(--text-soft)]">
                    This helps us assess wear, damage, upholstery condition, and repair scope.
                  </span>
                  <span className="mt-4 text-sm font-medium text-[var(--teal)]">
                    {selectedImageName}
                  </span>
                </label>

                <input
                  id="quoteImage"
                  name="quoteImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setSelectedImage(file);
                  }}
                  className="hidden"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-[var(--teal)]"
                  />
                  <label htmlFor="consent" className="text-sm leading-7 text-[var(--text-soft)]">
                    I agree to be contacted by MediRevive regarding this consultation
                    and related service communication.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="brand-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending consultation..." : "Submit consultation →"}
              </button>

              {errorMessage ? (
                <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}