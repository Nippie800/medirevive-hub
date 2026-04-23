"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/admin");
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="site-shell">
      <section className="site-section">
        <div className="site-container">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-center">
              <span className="site-kicker">Admin access</span>
              <h1 className="site-title-lg mt-5">Sign in to the MediRevive dashboard.</h1>
              <p className="site-body mt-6">
                Access quote requests, review uploaded images, and manage progress
                through the restoration workflow.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="site-stat">
                  <div className="site-stat-number">01</div>
                  <p className="mt-3 text-sm text-[var(--text-soft)]">Secure sign-in</p>
                </div>
                <div className="site-stat">
                  <div className="site-stat-number">02</div>
                  <p className="mt-3 text-sm text-[var(--text-soft)]">Track requests</p>
                </div>
                <div className="site-stat">
                  <div className="site-stat-number">03</div>
                  <p className="mt-3 text-sm text-[var(--text-soft)]">Update statuses</p>
                </div>
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body md:p-10">
                <div className="mb-8">
                  <img
                    src="/medirevive-logo.png"
                    alt="MediRevive"
                    className="h-27 w-auto"
                  />
                  <h2 className="mt-6 text-3xl">Admin login</h2>
                  <p className="mt-3 leading-8 text-[var(--text-soft)]">
                    Sign in with your admin credentials.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[var(--text-soft)]"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="site-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-[var(--text-soft)]"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="site-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="site-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Signing in..." : "Access Dashboard"}
                  </button>

                  {errorMessage ? (
                    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-[var(--danger)]">
                      {errorMessage}
                    </p>
                  ) : null}
                </form>

                <div className="mt-6">
                  <Link
                    href="/"
                    className="text-sm font-medium text-[var(--primary)] hover:underline"
                  >
                    Return to website
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}