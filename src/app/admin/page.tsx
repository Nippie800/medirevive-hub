"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

type QuoteRequest = {
  id: string;
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  itemType: string;
  description: string;
  consentToContact?: boolean;
  imageUrl?: string;
  status: "NEW" | "IN_REVIEW" | "QUOTED" | "COMPLETED";
  createdAt?: {
    seconds?: number;
    nanoseconds?: number;
  };
};

const statusOptions: QuoteRequest["status"][] = [
  "NEW",
  "IN_REVIEW",
  "QUOTED",
  "COMPLETED",
];

export default function AdminPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | QuoteRequest["status"]>("ALL");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const requestsQuery = query(
      collection(db, "quoteRequests"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      requestsQuery,
      (snapshot) => {
        const data: QuoteRequest[] = snapshot.docs.map((docSnap) => {
          const docData = docSnap.data();

          return {
            id: docSnap.id,
            reference: docData.reference ?? "",
            fullName: docData.fullName ?? "",
            email: docData.email ?? "",
            phone: docData.phone ?? "",
            serviceType: docData.serviceType ?? "",
            itemType: docData.itemType ?? "",
            description: docData.description ?? "",
            consentToContact: docData.consentToContact ?? false,
            imageUrl: docData.imageUrl ?? "",
            status: docData.status ?? "NEW",
            createdAt: docData.createdAt,
          };
        });

        setRequests(data);
        setLoading(false);

        if (data.length > 0 && !selectedRequest) {
          setSelectedRequest(data[0]);
        } else if (selectedRequest) {
          const refreshedSelected = data.find((item) => item.id === selectedRequest.id);
          if (refreshedSelected) {
            setSelectedRequest(refreshedSelected);
          }
        }
      },
      (error) => {
        console.error(error);
        setErrorMessage("Failed to load quote requests.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [selectedRequest]);

  const filteredRequests = useMemo(() => {
    if (activeFilter === "ALL") return requests;
    return requests.filter((request) => request.status === activeFilter);
  }, [requests, activeFilter]);

  function formatDate(seconds?: number) {
    if (!seconds) return "No date";
    return new Date(seconds * 1000).toLocaleString();
  }

  async function handleStatusChange(
    requestId: string,
    newStatus: QuoteRequest["status"]
  ) {
    setUpdatingId(requestId);
    setErrorMessage("");

    try {
      const requestRef = doc(db, "quoteRequests", requestId);
      await updateDoc(requestRef, {
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
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
            <Link
              href="/quote"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Quote
            </Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            Admin Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Quote requests
          </h1>
          <p className="mt-2 text-slate-600">
            View incoming requests, inspect images, and update progress statuses.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {["ALL", ...statusOptions].map((status) => {
            const isActive = activeFilter === status;

            return (
              <button
                key={status}
                type="button"
                onClick={() =>
                  setActiveFilter(status as "ALL" | QuoteRequest["status"])
                }
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-sky-700 text-white"
                    : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>

        {errorMessage ? (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-semibold">Request list</h2>
            </div>

            <div className="max-h-[70vh] overflow-y-auto">
              {loading ? (
                <div className="p-5 text-sm text-slate-500">Loading requests...</div>
              ) : filteredRequests.length === 0 ? (
                <div className="p-5 text-sm text-slate-500">No requests found.</div>
              ) : (
                filteredRequests.map((request) => {
                  const isSelected = selectedRequest?.id === request.id;

                  return (
                    <button
                      key={request.id}
                      type="button"
                      onClick={() => setSelectedRequest(request)}
                      className={`w-full border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 ${
                        isSelected ? "bg-sky-50" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {request.reference}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {request.fullName}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {request.itemType}
                          </p>
                        </div>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {request.status}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            {!selectedRequest ? (
              <div className="text-sm text-slate-500">
                Select a request to view details.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                      {selectedRequest.reference}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">
                      {selectedRequest.fullName}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Submitted {formatDate(selectedRequest.createdAt?.seconds)}
                    </p>
                  </div>

                  <div className="min-w-[220px]">
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Update Status
                    </label>
                    <select
                      id="status"
                      value={selectedRequest.status}
                      disabled={updatingId === selectedRequest.id}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedRequest.id,
                          e.target.value as QuoteRequest["status"]
                        )
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Email
                    </p>
                    <p className="mt-2 text-sm text-slate-800">
                      {selectedRequest.email}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Phone
                    </p>
                    <p className="mt-2 text-sm text-slate-800">
                      {selectedRequest.phone}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Service Type
                    </p>
                    <p className="mt-2 text-sm text-slate-800">
                      {selectedRequest.serviceType}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Item Type
                    </p>
                    <p className="mt-2 text-sm text-slate-800">
                      {selectedRequest.itemType}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Description
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {selectedRequest.description}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Consent to Contact
                  </p>
                  <p className="mt-2 text-sm text-slate-800">
                    {selectedRequest.consentToContact ? "Yes" : "No"}
                  </p>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Uploaded Image
                  </p>

                  {selectedRequest.imageUrl ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <img
                        src={selectedRequest.imageUrl}
                        alt={`${selectedRequest.itemType} upload`}
                        className="max-h-[420px] w-full object-contain bg-white"
                      />
                    </div>
                  ) : (
                    <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                      No image uploaded.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}