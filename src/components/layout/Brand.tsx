"use client";

import Link from "next/link";

type LogoProps = {
  size?: "small" | "medium" | "large";
  showTagline?: boolean;
  onClick?: () => void;
};

export default function Logo({
  size = "medium",
  showTagline = true,
  onClick,
}: LogoProps) {
  const logoSize =
    size === "small"
      ? "h-12"
      : size === "large"
      ? "h-24 md:h-28"
      : "h-16 md:h-20";

  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex flex-col items-start"
    >
      <img
        src="/medirevive-logo.jpg"
        alt="MediRevive"
        className={`${logoSize} w-auto transition duration-300`}
      />

      {showTagline && (
        <span
          className="
            mt-1
            text-[9px]
            md:text-[10px]
            uppercase
            tracking-[0.25em]
            text-[var(--text-muted)]
            whitespace-nowrap
          "
        >
          Healthcare • Wellness • Commercial Furniture Restoration
        </span>
      )}
    </Link>
  );
}