"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GalleryItem } from "../../data/galleryItems";

type GalleryCardProps = {
  item: GalleryItem;
};

export default function GalleryCard({
  item,
}: GalleryCardProps) {
  return (
    <Link
      href={`/gallery?item=${item.slug}`}
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-[var(--border)]
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* IMAGE */}

      <div className="overflow-hidden bg-white">
        <img
          src={item.image}
          alt={item.title}
          className="
            h-72
            w-full
            object-contain
            p-6
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}

      <div className="border-t border-[var(--border)] p-6">

        <div className="flex items-center justify-between">

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.18em]
                text-[var(--text-muted)]
              "
            >
              {item.category}
            </p>

            <h3
              className="
                mt-2
                text-xl
                font-semibold
                text-[var(--text)]
              "
            >
              {item.title}
            </h3>

          </div>

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-[var(--primary-soft)]
              text-[var(--primary)]
              transition
              duration-300
              group-hover:bg-[var(--primary)]
              group-hover:text-white
            "
          >
            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </div>

        </div>

      </div>
    </Link>
  );
}