"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem } from "../../data/galleryItems";

type ShowcaseContentProps = {
  item: GalleryItem;
};

export default function ShowcaseContent({
  item,
}: ShowcaseContentProps) {
  return (
    <div className="flex flex-col justify-center">

      <AnimatePresence mode="wait">

        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -30,
          }}
          transition={{
            duration: 0.4,
          }}
        >

          <span className="site-badge">
            {item.category}
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[var(--text)]">
            {item.title}
          </h2>

          <p className="mt-6 leading-8 text-[var(--text-soft)]">
            {item.description}
          </p>

          <div className="mt-8 space-y-4">

            {item.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3"
              >
                <div
                  className="
                    mt-1
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary-soft)]
                    text-sm
                    font-bold
                    text-[var(--primary)]
                  "
                >
                  ✓
                </div>

                <p className="text-[var(--text-soft)]">
                  {feature}
                </p>

              </div>
            ))}

          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/quote"
              className="site-button-primary"
            >
              {item.cta}
            </Link>

            <Link
              href="/contact"
              className="site-button-secondary"
            >
              Contact Us
            </Link>

          </div>

        </motion.div>

      </AnimatePresence>

    </div>
  );
}