"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  location?: string;
  serviceType?: string;
  itemType?: string;
  notes?: string;
  status: string;
  source: string;
  createdAt?: any;
};

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  QUOTED: "bg-purple-100 text-purple-700",
  DONE: "bg-green-100 text-green-700",
};

const SOURCE_COLORS: Record<string, string> = {
  WHATSAPP: "bg-green-100 text-green-700",
  CALL: "bg-orange-100 text-orange-700",
  WEB: "bg-slate-100 text-slate-700",
};

export default function AdminPage() {
  const [data, setData] = useState<Enquiry[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const q = query(collection(db, "quoteRequests"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      setData(results);
    });

    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.phone?.includes(search);

      const matchesFilter =
        filter === "ALL" ? true : item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [data, search, filter]);

  return (
    <main className="site-shell">
      <section className="site-section">
        <div className="site-container">

          {/* HEADER */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="site-title-lg">Dashboard</h1>

            <Link href="/admin/add" className="site-button-primary">
              + Add Enquiry
            </Link>
          </div>

          {/* SEARCH */}
          <div className="mt-6">
            <input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="site-input"
            />
          </div>

          {/* FILTERS */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {["ALL", "NEW", "IN_PROGRESS", "QUOTED", "DONE"].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full text-sm border ${
                  filter === s
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* CARDS */}
          <div className="grid gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3">

            {filtered.map((item) => (
              <div key={item.id} className="site-card p-5">

                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.phone}</p>
                  </div>

                  <span className={`px-3 py-1 text-xs rounded-full ${STATUS_COLORS[item.status]}`}>
                    {item.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-4 space-y-1 text-sm text-gray-600">
                  <p><strong>Item:</strong> {item.itemType || "-"}</p>
                  <p><strong>Service:</strong> {item.serviceType || "-"}</p>
                  <p><strong>Location:</strong> {item.location || "-"}</p>
                </div>

                {/* NOTES */}
                {item.notes && (
                  <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                    {item.notes}
                  </p>
                )}

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-center mt-4">

                  <span className={`px-3 py-1 text-xs rounded-full ${SOURCE_COLORS[item.source]}`}>
                    {item.source}
                  </span>

                  <span className="text-xs text-gray-400">
                    {item.createdAt?.seconds
                      ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
                      : ""}
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>
    </main>
  );
}