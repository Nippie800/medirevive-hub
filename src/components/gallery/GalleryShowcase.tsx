"use client";

import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import { galleryItems } from "../../data/galleryItems";

import ShowcaseImage from "./ShowcaseImage";
import ShowcaseContent from "./ShowcaseContent";
import ShowcaseControls from "./ShowcaseControls";

export default function GalleryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeItem = galleryItems[currentIndex];

  function goNext() {
    setCurrentIndex((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  }

  function goPrevious() {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  }

  function goTo(index: number) {
    setCurrentIndex(index);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrevious,
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  return (
    <section className="site-section">
      <div className="site-container">

        <div className="max-w-3xl">
          <span className="site-kicker">
            Featured Equipment
          </span>

          <h2 className="site-title-lg mt-6">
            Explore our restoration work.
          </h2>

          <p className="site-body mt-6">
            Browse a selection of healthcare and commercial equipment
            restored using durable medical-grade materials.
          </p>
        </div>

        <div
          {...handlers}
          className="mt-16 overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-xl"
        >

          <div className="grid gap-12 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">

            <ShowcaseImage
              item={activeItem}
            />

            <ShowcaseContent
              item={activeItem}
            />

                    </div>

          <ShowcaseControls
            currentIndex={currentIndex}
            total={galleryItems.length}
            onPrevious={goPrevious}
            onNext={goNext}
            onSelect={goTo}
          />

        </div>

      </div>
    </section>
  );
}
          