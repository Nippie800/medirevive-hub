"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem } from "../../data/galleryItems";

type ShowcaseImageProps = {
  item: GalleryItem;
};

export default function ShowcaseImage({
  item,
}: ShowcaseImageProps) {
  return (
    <div className="flex items-center justify-center">

      <AnimatePresence mode="wait">

        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            x: 40,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -40,
            scale: 0.96,
          }}
          transition={{
            duration: 0.45,
            ease: "easeInOut",
          }}
          className="w-full"
        >
          <div
            className="
              overflow-hidden
              rounded-3xl
              border
              border-[var(--border)]
              bg-white
              p-8
              shadow-sm
            "
          >
            <img
              src={item.image}
              alt={item.alt}
              className="
                mx-auto
                max-h-[520px]
                w-full
                object-contain
                transition-transform
                duration-500
                hover:scale-[1.03]
              "
            />
          </div>

          <div className="mt-6 text-center">

            <span className="site-badge">
              {item.category}
            </span>

            <h3 className="mt-4 text-3xl font-bold text-[var(--text)]">
              {item.title}
            </h3>

            <p className="mt-3 text-[var(--text-soft)]">
              {item.shortDescription}
            </p>

          </div>

        </motion.div>

      </AnimatePresence>

    </div>
  );
}