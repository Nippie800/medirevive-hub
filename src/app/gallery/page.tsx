import Link from "next/link";

import PublicLayout from "../../components/layout/PublicLayout";

import GalleryHero from "../../components/gallery/GalleryHero";
import GalleryShowcase from "../../components/gallery/GalleryShowcase";
import GalleryGrid from "../../components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <PublicLayout>

      {/* HERO */}

      <GalleryHero />

      {/* FEATURED SHOWCASE */}

      <GalleryShowcase />

      {/* RESTORATION GALLERY */}

      <GalleryGrid />

      {/* CTA */}

      <section className="site-section pt-0">
        <div className="site-container">

          <div className="site-card">

            <div className="site-card-body text-center">

              <span className="site-kicker">
                START YOUR PROJECT
              </span>

              <h2 className="site-title-lg mx-auto mt-6 max-w-3xl">
                Have equipment that needs restoring?
              </h2>

              <p className="site-body mx-auto mt-6 max-w-2xl">
                Whether it's a treatment bed, examination couch,
                office seating, privacy curtains or a completely custom
                project, MediRevive provides professional restoration
                using durable medical-grade materials.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

                <Link
                  href="/quote"
                  className="site-button-primary"
                >
                  Request a Quote
                </Link>

                <Link
                  href="/catalog"
                  className="site-button-secondary"
                >
                  Explore Equipment
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </PublicLayout>
  );
}