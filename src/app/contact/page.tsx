import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="site-shell">
      <section className="site-section">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="site-kicker">Contact</span>
            <h1 className="site-title-lg mt-5">Simple contact details. Quote-based service.</h1>
            <p className="site-body mt-6">
              MediRevive works on a quote-only basis. Get in touch to discuss
              treatment, clinical, wellness, salon, office, or other professional-use
              furniture that needs restoration, reupholstery, repair, or accessories.
            </p>

            <div className="site-card mt-8">
              <div className="site-card-body">
                <h2 className="text-2xl">Important note</h2>
                <p className="mt-4 leading-8 text-[var(--text-soft)]">
                  Pricing is not listed on the website. Each request is assessed
                  individually based on equipment condition, repair scope, materials,
                  and service location.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Phone
                </p>
                <p className="mt-3 text-2xl text-[var(--text)]">
                  Replace with phone number
                </p>
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Email
                </p>
                <p className="mt-3 text-2xl text-[var(--text)]">
                  Replace with email address
                </p>
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Location
                </p>
                <p className="mt-3 text-2xl text-[var(--text)]">
                  Johannesburg North
                </p>
              </div>
            </div>

            <div className="site-card">
              <div className="site-card-body">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  WhatsApp
                </p>
                <p className="mt-3 leading-8 text-[var(--text-soft)]">
                  The easiest way to send photos, explain the issue, and discuss next steps.
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/270000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-button-primary"
                  >
                    Open WhatsApp
                  </a>
                  <Link href="/quote" className="site-button-secondary">
                    Request a Quote
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