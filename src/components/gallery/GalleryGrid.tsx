"use client";

import GalleryCard from "./GalleryCard";
import { galleryItems } from "../../data/galleryItems";

export default function GalleryGrid() {
  return (
    <section className="site-section pt-10">
      <div className="site-container">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="site-kicker">
            OUR RESTORATIONS
          </span>

          <h2 className="site-title-lg mt-6">
            Explore Our Recent Work
          </h2>

          <p className="site-body mx-auto mt-6">
            Every restoration is completed using durable,
            medical-grade materials and tailored to the
            specific needs of healthcare, wellness and
            commercial environments.
          </p>

        </div>

        {/* Gallery Grid */}

        <div
          className="
            grid
            grid-cols-1
            gap-8

            sm:grid-cols-2

            xl:grid-cols-3
          "
        >
          {galleryItems.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}