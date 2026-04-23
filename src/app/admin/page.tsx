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
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";

type QuoteRequest = {
  id: string;
  reference?: string;
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  serviceType?: string;
  itemType?: string;
  description?: string;
  notes?: string;
  consentToContact?: boolean;
  imageUrl?: string;
  source?: "WEB" | "WHATSAPP" | "CALL";
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

const statusLabels: Record<QuoteRequest["status"], string> = {
  NEW: "New",
  IN_REVIEW: "In Review",
  QUOTED: "Quoted",
  COMPLETED: "Completed",
};

const sourceLabels = {
  WEB: "Website",
  WHATSAPP: "WhatsApp",
  CALL: "Phone Call",
} as const;

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const [activeFilter, setActiveFilter] = useState<"ALL" | QuoteRequest["status"]>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/admin/login");
        setUser(null);
        setAuthLoading(false);
        return;
      }

      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

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
            name: docData.name ?? "",
            email: docData.email ?? "",
            phone: docData.phone ?? "",
            location: docData.location ?? "",
            serviceType: docData.serviceType ?? "",
            itemType: docData.itemType ?? "",
            description: docData.description ?? "",
            notes: docData.notes ?? "",
            consentToContact: docData.consentToContact ?? false,
            imageUrl: docData.imageUrl ?? "",
            source: docData.source ?? "WEB",
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
        setErrorMessage("Failed to load requests.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, selectedRequest]);

  const filteredRequests = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const displayName = request.fullName || request.name || "";
      const displayEmail = request.email || "";
      const displayItemType = request.itemType || "";
      const displayReference = request.reference || "";

      const matchesStatus =
        activeFilter === "ALL" ? true : request.status === activeFilter;

      const matchesSearch =
        normalized.length === 0
          ? true
          : displayReference.toLowerCase().includes(normalized) ||
            displayName.toLowerCase().includes(normalized) ||
            displayEmail.toLowerCase().includes(normalized) ||
            displayItemType.toLowerCase().includes(normalized);

      return matchesStatus && matchesSearch;
    });
  }, [requests, activeFilter, searchTerm]);

  const counts = useMemo(() => {
    return {
      ALL: requests.length,
      NEW: requests.filter((r) => r.status === "NEW").length,
      IN_REVIEW: requests.filter((r) => r.status === "IN_REVIEW").length,
      QUOTED: requests.filter((r) => r.status === "QUOTED").length,
      COMPLETED: requests.filter((r) => r.status === "COMPLETED").length,
    };
  }, [requests]);

  function formatDate(seconds?: number) {
    if (!seconds) return "No date";
    return new Date(seconds * 1000).toLocaleString();
  }

  function getDisplayName(request: QuoteRequest) {
    return request.fullName || request.name || "Unnamed enquiry";
  }

  function getDisplayNotes(request: QuoteRequest) {
    return request.description || request.notes || "No notes provided.";
  }

  function getStatusClasses(status: QuoteRequest["status"]) {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "IN_REVIEW":
        return "bg-amber-100 text-amber-800";
      case "QUOTED":
        return "bg-purple-100 text-purple-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  function getSourceClasses(source: QuoteRequest["source"] | undefined) {
    switch (source) {
      case "WHATSAPP":
        return "bg-emerald-100 text-emerald-800";
      case "CALL":
        return "bg-orange-100 text-orange-800";
      case "WEB":
      default:
        return "bg-sky-100 text-sky-800";
    }
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

  async function handleLogout() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  if (authLoading) {
    return (
      <main className="site-shell">
        <section className="site-section">
          <div className="site-container">
            <div className="site-card">
              <div className="site-card-body">
                <p className="text-[var(--text-soft)]">Checking access...</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <div className="site-container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/medirevive-logo.png"
              alt="MediRevive"
              className="h-10 w-auto"
            />
            <div>
              <p className="text-sm font-semibold text-[var(--primary)]">Admin Dashboard</p>
              <p className="text-sm text-[var(--text-soft)]">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="site-button-secondary">
              View Site
            </Link>
            <Link href="/admin/add" className="site-button-primary">
              + Add Enquiry
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="site-button-primary"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <section className="site-section">
        <div className="site-container">
          <div className="mb-8">
            <span className="site-kicker">CRM Dashboard</span>
            <h1 className="site-title-lg mt-5">Lead tracking made simple.</h1>
            <p className="site-body mt-6">
              View enquiries from the website, WhatsApp, and calls in one place.
              Search, filter, and update progress as each request moves forward.
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="site-stat">
              <p className="text-sm text-[var(--text-soft)]">All</p>
              <p className="site-stat-number mt-3">{counts.ALL}</p>
            </div>
            <div className="site-stat">
              <p className="text-sm text-[var(--text-soft)]">New</p>
              <p className="site-stat-number mt-3">{counts.NEW}</p>
            </div>
            <div className="site-stat">
              <p className="text-sm text-[var(--text-soft)]">In Review</p>
              <p className="site-stat-number mt-3">{counts.IN_REVIEW}</p>
            </div>
            <div className="site-stat">
              <p className="text-sm text-[var(--text-soft)]">Quoted</p>
              <p className="site-stat-number mt-3">{counts.QUOTED}</p>
            </div>
            <div className="site-stat">
              <p className="text-sm text-[var(--text-soft)]">Completed</p>
              <p className="site-stat-number mt-3">{counts.COMPLETED}</p>
            </div>
          </div>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {(["ALL", ...statusOptions] as const).map((status) => {
                const isActive = activeFilter === status;
                const countValue = counts[status];

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setActiveFilter(status)}
                    className={
                      isActive
                        ? "site-button-primary min-h-0 px-4 py-2 text-sm"
                        : "rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-soft)] hover:bg-[var(--background-soft)]"
                    }
                  >
                    {status === "ALL" ? "All" : statusLabels[status]} ({countValue})
                  </button>
                );
              })}
            </div>

            <div className="w-full lg:max-w-sm">
              <input
                type="text"
                placeholder="Search by name, email, reference or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="site-input"
              />
            </div>
          </div>

          {errorMessage ? (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[var(--danger)]">
              {errorMessage}
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
            <div className="site-card overflow-hidden">
              <div className="site-card-body border-b border-[var(--border)]">
                <h2 className="text-2xl">Enquiry list</h2>
              </div>

              <div className="max-h-[72vh] overflow-y-auto">
                {loading ? (
                  <div className="p-5 text-sm text-[var(--text-soft)]">
                    Loading requests...
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="p-5 text-sm text-[var(--text-soft)]">
                    No matching requests found.
                  </div>
                ) : (
                  filteredRequests.map((request) => {
                    const isSelected = selectedRequest?.id === request.id;
                    const displayName = getDisplayName(request);
                    const source = request.source ?? "WEB";

                    return (
                      <button
                        key={request.id}
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className={`w-full border-b border-[var(--border)] px-5 py-4 text-left transition ${
                          isSelected
                            ? "bg-[var(--background-soft)]"
                            : "bg-white hover:bg-[var(--background-soft)]"
                        }`}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[var(--text)]">
                                {request.reference || "Manual enquiry"}
                              </p>
                              <p className="mt-1 truncate text-sm text-[var(--text-soft)]">
                                {displayName}
                              </p>
                              <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                                {request.itemType || "No item type"}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${getStatusClasses(
                                request.status
                              )}`}
                            >
                              {statusLabels[request.status]}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getSourceClasses(
                                source
                              )}`}
                            >
                              {sourceLabels[source]}
                            </span>
                            {request.location ? (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                {request.location}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body">
                {!selectedRequest ? (
                  <div className="text-sm text-[var(--text-soft)]">
                    Select a request to view details.
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                          {selectedRequest.reference || "Manual enquiry"}
                        </p>
                        <h2 className="mt-3 text-4xl">{getDisplayName(selectedRequest)}</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                              selectedRequest.status
                            )}`}
                          >
                            {statusLabels[selectedRequest.status]}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getSourceClasses(
                              selectedRequest.source ?? "WEB"
                            )}`}
                          >
                            {sourceLabels[selectedRequest.source ?? "WEB"]}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-[var(--text-soft)]">
                          Submitted {formatDate(selectedRequest.createdAt?.seconds)}
                        </p>
                      </div>

                      <div className="w-full max-w-xs">
                        <label
                          htmlFor="status"
                          className="mb-2 block text-sm font-medium text-[var(--text-soft)]"
                        >
                          Status
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
                          className="site-select"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {statusLabels[status]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="site-card-soft p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Email
                        </p>
                        <p className="mt-2 text-sm text-[var(--text)]">
                          {selectedRequest.email || "Not provided"}
                        </p>
                      </div>

                      <div className="site-card-soft p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Phone
                        </p>
                        <p className="mt-2 text-sm text-[var(--text)]">
                          {selectedRequest.phone || "Not provided"}
                        </p>
                      </div>

                      <div className="site-card-soft p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Location
                        </p>
                        <p className="mt-2 text-sm text-[var(--text)]">
                          {selectedRequest.location || "Not provided"}
                        </p>
                      </div>

                      <div className="site-card-soft p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Service
                        </p>
                        <p className="mt-2 text-sm text-[var(--text)]">
                          {selectedRequest.serviceType || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="site-card-soft p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Equipment type
                      </p>
                      <p className="mt-2 text-sm text-[var(--text)]">
                        {selectedRequest.itemType || "Not provided"}
                      </p>
                    </div>

                    <div className="site-card-soft p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Notes
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text)]">
                        {getDisplayNotes(selectedRequest)}
                      </p>
                    </div>

                    <div className="site-card-soft p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Consent to contact
                      </p>
                      <p className="mt-2 text-sm text-[var(--text)]">
                        {selectedRequest.consentToContact ? "Yes" : "No"}
                      </p>
                    </div>

                    <div>
                      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Uploaded image
                      </p>

                      {selectedRequest.imageUrl ? (
                        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-4">
                          <img
                            src={selectedRequest.imageUrl}
                            alt={`${selectedRequest.itemType || "Enquiry"} upload`}
                            className="max-h-[460px] w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="site-card-soft p-4 text-sm text-[var(--text-soft)]">
                          No image uploaded.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}