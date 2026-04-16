import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="brand-shell">
      <section className="brand-container pt-6">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#11c5a147] bg-[#11c5a112] text-[#11c5a1]">
              +
            </div>
            <span className="text-lg text-[var(--text)]">
              <span className="font-medium">Medi</span>
              <span className="text-[#11c5a1]">Revive</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              className="text-sm text-[var(--text-soft)] transition hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className="text-sm text-[var(--text-soft)] transition hover:text-white"
            >
              Equipment
            </Link>
            <Link
              href="/quote"
              className="text-sm text-[var(--text-soft)] transition hover:text-white"
            >
              Consultation
            </Link>
            <Link href="/admin" className="brand-button-primary">
              Dashboard
            </Link>
          </nav>

          <div className="md:hidden">
            <Link href="/quote" className="brand-button-primary text-sm">
              Quote
            </Link>
          </div>
        </header>
      </section>

      <section className="brand-section">
        <div className="brand-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="brand-kicker">Contact MediRevive</span>
            <h1 className="brand-title-lg mt-5">Discuss your equipment with us.</h1>
            <p className="brand-body mt-6">
              MediRevive works on a quote-based service model. Get in touch to discuss
              treatment, clinical, wellness, salon, office, or other professional-use
              furniture that needs restoration, reupholstery, repair, or custom accessories.
            </p>

            <div className="brand-panel mt-10 p-6">
              <h2 className="text-2xl">Important note</h2>
              <p className="mt-4 leading-8 text-[var(--text-soft)]">
                Pricing is not listed on the website. Each request is assessed individually
                based on equipment condition, repair scope, materials, and service location.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="brand-panel p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Phone
              </p>
              <p className="mt-3 text-2xl text-[var(--text)]">
                Replace with phone number
              </p>
            </div>

            <div className="brand-panel p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Email
              </p>
              <p className="mt-3 text-2xl text-[var(--text)]">
                Replace with email address
              </p>
            </div>

            <div className="brand-panel p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Location
              </p>
              <p className="mt-3 text-2xl text-[var(--text)]">
                Johannesburg North
              </p>
            </div>

            <div className="brand-panel p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                WhatsApp
              </p>
              <p className="mt-3 leading-8 text-[var(--text-soft)]">
                Fastest for sending photos, equipment details, and discussing whether
                collection, return, or on-site service is suitable.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://wa.me/270000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-button-primary"
                >
                  Open WhatsApp →
                </a>
                <Link href="/quote" className="brand-button-secondary">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}