import Link from "next/link";

export default function GalleryHero() {
  return (
    <section className="site-section pb-10">
      <div className="site-container">

        <div className="mx-auto max-w-4xl text-center">

          <span className="site-kicker">
            RESTORATION GALLERY
          </span>

          <h1 className="site-title-xl mt-8 mx-auto max-w-4xl">
            Restored with care.
            <br />
            Built to last.
          </h1>

          <p className="site-body mx-auto mt-8 max-w-3xl">
            Explore our growing collection of professionally restored
            medical, physiotherapy, wellness and commercial furniture.
            Every project is completed using durable, hygienic,
            medical-grade materials designed to extend the life of your
            equipment.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

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
              Equipment We Restore
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}