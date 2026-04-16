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

const statusLabels: Record<QuoteRequest["status"], string> = {
  NEW: "New Intake",
  IN_REVIEW: "Assessment",
  QUOTED: "Awaiting Approval",
  COMPLETED: "Restored",
};

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
        setErrorMessage("Failed to load consultations.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, selectedRequest]);

  const filteredRequests = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus =
        activeFilter === "ALL" ? true : request.status === activeFilter;

      const matchesSearch =
        normalized.length === 0
          ? true
          : request.reference.toLowerCase().includes(normalized) ||
            request.fullName.toLowerCase().includes(normalized) ||
            request.email.toLowerCase().includes(normalized) ||
            request.itemType.toLowerCase().includes(normalized);

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
      setErrorMessage("Failed to update restoration stage.");
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
      <main className="brand-shell">
        <section className="brand-container py-16">
          <div className="brand-panel p-6">
            <p className="text-[var(--text-soft)]">Checking access...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="brand-shell">
      <section className="brand-container pt-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#11c5a147] bg-[#11c5a112] text-[#11c5a1]">
              +
            </div>
            <span className="text-lg text-[var(--text)]">
              <span className="font-medium">Medi</span>
              <span className="text-[#11c5a1]">Revive</span>
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-[var(--text-soft)]">{user?.email}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="brand-button-secondary"
            >
              Log out
            </button>
          </div>
        </header>
      </section>

      <section className="brand-section">
        <div className="brand-container">
          <div className="mb-10">
            <span className="brand-kicker">Internal dashboard</span>
            <h1 className="brand-title-lg mt-5">Lead tracker & restoration pipeline.</h1>
            <p className="brand-body mt-6">
              View consultations, inspect uploaded equipment images, and move each
              client through assessment, quoting, and restoration.
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="brand-stat">
              <p className="text-sm text-[var(--text-soft)]">All consultations</p>
              <p className="brand-stat-number mt-3">{counts.ALL}</p>
            </div>
            <div className="brand-stat">
              <p className="text-sm text-[var(--text-soft)]">New intake</p>
              <p className="brand-stat-number mt-3">{counts.NEW}</p>
            </div>
            <div className="brand-stat">
              <p className="text-sm text-[var(--text-soft)]">Assessment</p>
              <p className="brand-stat-number mt-3">{counts.IN_REVIEW}</p>
            </div>
            <div className="brand-stat">
              <p className="text-sm text-[var(--text-soft)]">Awaiting approval</p>
              <p className="brand-stat-number mt-3">{counts.QUOTED}</p>
            </div>
            <div className="brand-stat">
              <p className="text-sm text-[var(--text-soft)]">Restored</p>
              <p className="brand-stat-number mt-3">{counts.COMPLETED}</p>
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
                        ? "brand-button-primary min-h-0 px-4 py-2 text-sm"
                        : "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-soft)] transition hover:bg-white/10 hover:text-white"
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
                placeholder="Search by reference, name, email, or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="brand-input"
              />
            </div>
          </div>

          {errorMessage ? (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <div className="brand-panel overflow-hidden p-0">
              <div className="border-b border-white/10 px-5 py-4">
                <h2 className="text-2xl">Consultation queue</h2>
              </div>

              <div className="max-h-[72vh] overflow-y-auto">
                {loading ? (
                  <div className="p-5 text-sm text-[var(--text-soft)]">
                    Loading consultations...
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="p-5 text-sm text-[var(--text-soft)]">
                    No matching consultations found.
                  </div>
                ) : (
                  filteredRequests.map((request) => {
                    const isSelected = selectedRequest?.id === request.id;

                    return (
                      <button
                        key={request.id}
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className={`w-full border-b border-white/10 px-5 py-4 text-left transition ${
                          isSelected ? "bg-white/10" : "bg-transparent hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[var(--text)]">
                              {request.reference}
                            </p>
                            <p className="mt-1 truncate text-sm text-[var(--text-soft)]">
                              {request.fullName}
                            </p>
                            <p className="mt-1 truncate text-xs text-[var(--text-muted)]">
                              {request.itemType}
                            </p>
                          </div>

                          <span className="brand-badge whitespace-nowrap">
                            {statusLabels[request.status]}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            <div className="brand-panel p-6">
              {!selectedRequest ? (
                <div className="text-sm text-[var(--text-soft)]">
                  Select a consultation to view details.
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
                        {selectedRequest.reference}
                      </p>
                      <h2 className="mt-3 text-4xl">{selectedRequest.fullName}</h2>
                      <p className="mt-3 text-sm text-[var(--text-soft)]">
                        Submitted {formatDate(selectedRequest.createdAt?.seconds)}
                      </p>
                    </div>

                    <div className="w-full max-w-xs">
                      <label
                        htmlFor="status"
                        className="mb-2 block text-sm font-medium text-[var(--text-soft)]"
                      >
                        Restoration stage
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
                        className="brand-select"
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
                    <div className="brand-panel-soft p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Email
                      </p>
                      <p className="mt-2 text-sm text-[var(--text)]">
                        {selectedRequest.email}
                      </p>
                    </div>

                    <div className="brand-panel-soft p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Phone
                      </p>
                      <p className="mt-2 text-sm text-[var(--text)]">
                        {selectedRequest.phone}
                      </p>
                    </div>

                    <div className="brand-panel-soft p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Service needed
                      </p>
                      <p className="mt-2 text-sm text-[var(--text)]">
                        {selectedRequest.serviceType}
                      </p>
                    </div>

                    <div className="brand-panel-soft p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Equipment type
                      </p>
                      <p className="mt-2 text-sm text-[var(--text)]">
                        {selectedRequest.itemType}
                      </p>
                    </div>
                  </div>

                  <div className="brand-panel-soft p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Consultation notes
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--text)]">
                      {selectedRequest.description}
                    </p>
                  </div>

                  <div className="brand-panel-soft p-4">
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
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-4">
                        <img
                          src={selectedRequest.imageUrl}
                          alt={`${selectedRequest.itemType} upload`}
                          className="max-h-[460px] w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="brand-panel-soft p-4 text-sm text-[var(--text-soft)]">
                        No image uploaded.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}