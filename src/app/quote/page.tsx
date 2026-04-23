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
    const ext = file.name.split(".").pop() || "jpg";

    const storageRef = ref(
      storage,
      `quote-uploads/${referenceCode}-${Date.now()}.${ext}`
    );

    await uploadBytes(storageRef, file);
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
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        location: form.location,
        serviceType: form.serviceType,
        itemType: form.itemType,
        notes: form.description,
        imageUrl,
        status: "NEW",
        source: "WEB",
        createdAt: serverTimestamp(),
      });

      setForm(initialForm);
      setSelectedImage(null);

      router.push(`/quote/success?ref=${reference}`);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site-shell">
      <section className="site-section">
        <div className="site-container max-w-2xl">
          <h1 className="site-title-lg">Request a Quote</h1>

         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
  
  <div>
    <label htmlFor="fullName" className="block text-sm mb-2">Full Name</label>
    <input
      id="fullName"
      value={form.fullName}
      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      className="site-input"
    />
  </div>

  <div>
    <label htmlFor="email" className="block text-sm mb-2">Email</label>
    <input
      id="email"
      type="email"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      className="site-input"
    />
  </div>

  <div>
    <label htmlFor="phone" className="block text-sm mb-2">Phone</label>
    <input
      id="phone"
      value={form.phone}
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
      className="site-input"
    />
  </div>

  <div>
    <label htmlFor="location" className="block text-sm mb-2">Location</label>
    <input
      id="location"
      value={form.location}
      onChange={(e) => setForm({ ...form, location: e.target.value })}
      className="site-input"
    />
  </div>

  <div>
    <label htmlFor="serviceType" className="block text-sm mb-2">Service Type</label>
    <input
      id="serviceType"
      value={form.serviceType}
      onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
      className="site-input"
    />
  </div>

  <div>
    <label htmlFor="itemType" className="block text-sm mb-2">Item Type</label>
    <input
      id="itemType"
      value={form.itemType}
      onChange={(e) => setForm({ ...form, itemType: e.target.value })}
      className="site-input"
    />
  </div>

  <div>
    <label htmlFor="description" className="block text-sm mb-2">Description</label>
    <textarea
      id="description"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
      className="site-textarea"
    />
  </div>

  <div>
    <label htmlFor="image" className="block text-sm mb-2">Upload Image</label>
    <input
      id="image"
      type="file"
      onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
    />
  </div>

  <button className="site-button-primary w-full">
    {loading ? "Submitting..." : "Submit"}
  </button>

</form>
        </div>
      </section>
    </main>
  );
}