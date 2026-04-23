"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AddEnquiryModal({ onClose }: { onClose: () => void }) {
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

      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving enquiry");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold">Add Enquiry</h2>

       <form onSubmit={handleSubmit} className="space-y-4 mt-4">

  <div>
    <label htmlFor="name">Customer Name</label>
    <input id="name" name="name" onChange={handleChange} className="site-input" />
  </div>

  <div>
    <label htmlFor="phone">Phone</label>
    <input id="phone" name="phone" onChange={handleChange} className="site-input" />
  </div>

  <div>
    <label htmlFor="location">Location</label>
    <input id="location" name="location" onChange={handleChange} className="site-input" />
  </div>

  <div>
    <label htmlFor="serviceType">Service Type</label>
    <input id="serviceType" name="serviceType" onChange={handleChange} className="site-input" />
  </div>

  <div>
    <label htmlFor="itemType">Item Type</label>
    <input id="itemType" name="itemType" onChange={handleChange} className="site-input" />
  </div>

  <div>
    <label htmlFor="notes">Notes</label>
    <textarea id="notes" name="notes" onChange={handleChange} className="site-textarea" />
  </div>

  <div>
    <label htmlFor="source">Source</label>
    <select id="source" name="source" onChange={handleChange} className="site-select">
      <option value="WHATSAPP">WhatsApp</option>
      <option value="CALL">Call</option>
      <option value="WEB">Website</option>
    </select>
  </div>

  <div className="flex gap-2">
    <button type="button" onClick={onClose} className="site-button-secondary w-full">
      Cancel
    </button>
    <button className="site-button-primary w-full">
      {loading ? "Saving..." : "Save"}
    </button>
  </div>

</form>
      </div>
    </div>
  );
}