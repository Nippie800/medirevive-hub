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
    <main className="brand-shell">
      <section className="brand-container flex min-h-screen items-center py-16">
        <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <span className="brand-kicker">Internal access</span>
            <h1 className="brand-title-lg mt-5">Enter the restoration desk.</h1>
            <p className="brand-body mt-6">
              Sign in to manage consultations, review uploaded equipment images,
              and move each lead through the restoration pipeline.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="brand-stat">
                <div className="brand-stat-number">
                  01
                </div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">Secure access</p>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-number">
                  02
                </div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">Lead tracking</p>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-number">
                  03
                </div>
                <p className="mt-2 text-sm text-[var(--text-soft)]">Status control</p>
              </div>
            </div>
          </div>

          <div className="brand-panel p-8 md:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--teal)]">
                MediRevive
              </p>
              <h2 className="mt-3 text-4xl">Admin login</h2>
              <p className="mt-3 leading-8 text-[var(--text-soft)]">
                Sign in with your MediRevive admin credentials.
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
                  className="brand-input"
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
                  className="brand-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="brand-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Access dashboard →"}
              </button>

              {errorMessage ? (
                <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </p>
              ) : null}
            </form>

            <div className="mt-6">
              <Link
                href="/"
                className="text-sm font-medium text-[var(--teal)] transition hover:opacity-80"
              >
                Return to home →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}