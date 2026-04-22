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

export default function QuotePage() {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function closeMenu() {
    setMobileMenuOpen(false);
  }

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

    await uploadBytes(storageRef, file, {
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
    <main className="site-shell">
      <header className="site-header">
        <div className="site-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img
              src="/medirevive-logo.png"
              alt="MediRevive"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary)]">
              Home
            </Link>
            <Link href="/catalog" className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary)]">
              Equipment
            </Link>
            <Link href="/quote" className="text-sm font-medium text-[var(--primary)]">
              Get a Quote
            </Link>
            <Link href="/contact" className="text-sm font-medium text-[var(--text-soft)] hover:text-[var(--primary)]">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/quote" className="site-button-primary">
              Get a Quote
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--primary)] md:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-all duration-200 ${
                  mobileMenuOpen ? "top-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-0.5 w-5 bg-current transition-all duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 block h-0.5 w-5 bg-current transition-all duration-200 ${
                  mobileMenuOpen ? "top-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="site-container pb-4 md:hidden">
            <nav className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
              <Link href="/" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background-soft)]">
                Home
              </Link>
              <Link href="/catalog" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background-soft)]">
                Equipment
              </Link>
              <Link href="/quote" onClick={closeMenu} className="rounded-xl bg-[var(--background-soft)] px-4 py-3 text-sm font-medium text-[var(--primary)]">
                Get a Quote
              </Link>
              <Link href="/contact" onClick={closeMenu} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--text)] hover:bg-[var(--background-soft)]">
                Contact
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <section className="site-section">
        <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="site-kicker">Get a Quote</span>
            <h1 className="site-title-lg mt-5">Send us your item details.</h1>
            <p className="site-body mt-6">
              Every quote is based on equipment condition, service scope, materials,
              and location. Uploading a photo helps us assess more accurately.
            </p>
          </div>

          <div className="site-card">
            <div className="site-card-body">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="site-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="site-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="site-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                      Location / area
                    </label>
                    <input
                      id="location"
                      type="text"
                      required
                      placeholder="e.g. Johannesburg North"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="site-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceType" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Service needed
                  </label>
                  <select
                    id="serviceType"
                    required
                    value={form.serviceType}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    className="site-select"
                  >
                    <option value="">Select a service</option>
                    <option value="Reupholstery">Reupholstery</option>
                    <option value="Structural Repairs & Refurbishment">
                      Structural Repairs & Refurbishment
                    </option>
                    <option value="Custom Accessories">Custom Accessories</option>
                    <option value="Bespoke Solution">Bespoke Solution</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="itemType" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Equipment type
                  </label>
                  <input
                    id="itemType"
                    type="text"
                    required
                    placeholder="e.g. Treatment bed, plinth, chair"
                    value={form.itemType}
                    onChange={(e) => setForm({ ...form, itemType: e.target.value })}
                    className="site-input"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    required
                    placeholder="Describe the condition and what work is needed..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="site-textarea"
                  />
                </div>

                <div className="site-card-soft p-5">
                  <label htmlFor="quoteImage" className="mb-2 block text-sm font-medium text-[var(--text-soft)]">
                    Upload image
                  </label>

                  <label
                    htmlFor="quoteImage"
                    className="block cursor-pointer rounded-2xl border border-dashed border-[var(--border)] bg-white px-5 py-5 hover:bg-[var(--background-soft)]"
                  >
                    <p className="font-medium text-[var(--text)]">Add equipment photo</p>
                    <p className="mt-2 text-sm text-[var(--text-soft)]">
                      Helps us assess the item more accurately.
                    </p>
                    <p className="mt-3 text-sm font-medium text-[var(--primary)]">
                      {selectedImageName}
                    </p>
                  </label>

                  <input
                    id="quoteImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setSelectedImage(file);
                    }}
                    className="hidden"
                  />
                </div>

                <div className="site-card-soft p-4">
                  <div className="flex items-start gap-3">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 accent-[var(--primary)]"
                    />
                    <label htmlFor="consent" className="text-sm leading-7 text-[var(--text-soft)]">
                      I agree to be contacted by MediRevive regarding this quote request.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="site-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Submit Quote Request"}
                </button>

                {errorMessage ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[var(--danger)]">
                    {errorMessage}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}