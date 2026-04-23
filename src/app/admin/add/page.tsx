"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function AddEnquiryPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    serviceType: "",
    itemType: "",
    notes: "",
    source: "WHATSAPP",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "quoteRequests"), {
        ...form,
        status: "NEW",
        createdAt: serverTimestamp(),
      });

      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Error saving enquiry");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site-shell">
      <section className="site-section">
        <div className="site-container max-w-2xl">
          <h1 className="site-title-lg">Add Enquiry</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            <div>
              <label htmlFor="name" className="block mb-2 text-sm">Customer Name</label>
              <input id="name" name="name" onChange={handleChange} className="site-input" required />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm">Phone</label>
              <input id="phone" name="phone" onChange={handleChange} className="site-input" required />
            </div>

            <div>
              <label htmlFor="location" className="block mb-2 text-sm">Location</label>
              <input id="location" name="location" onChange={handleChange} className="site-input" />
            </div>

            <div>
              <label htmlFor="serviceType" className="block mb-2 text-sm">Service Type</label>
              <input id="serviceType" name="serviceType" onChange={handleChange} className="site-input" />
            </div>

            <div>
              <label htmlFor="itemType" className="block mb-2 text-sm">Item Type</label>
              <input id="itemType" name="itemType" onChange={handleChange} className="site-input" />
            </div>

            <div>
              <label htmlFor="notes" className="block mb-2 text-sm">Notes</label>
              <textarea id="notes" name="notes" onChange={handleChange} className="site-textarea" />
            </div>

            <div>
              <label htmlFor="source" className="block mb-2 text-sm">Source</label>
              <select id="source" name="source" onChange={handleChange} className="site-select">
                <option value="WHATSAPP">WhatsApp</option>
                <option value="CALL">Phone Call</option>
                <option value="WEB">Website</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="site-button-secondary w-full"
              >
                Cancel
              </button>

              <button className="site-button-primary w-full">
                {loading ? "Saving..." : "Save Enquiry"}
              </button>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}