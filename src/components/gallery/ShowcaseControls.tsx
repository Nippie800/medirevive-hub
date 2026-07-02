"use client";

type ShowcaseControlsProps = {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

export default function ShowcaseControls({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onSelect,
}: ShowcaseControlsProps) {
  return (
    <div className="border-t border-[var(--border)] bg-[var(--background-soft)] px-8 py-6">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Previous */}

        <button
          type="button"
          onClick={onPrevious}
          className="site-button-secondary"
        >
          ← Previous
        </button>

        {/* Dots */}

        <div className="flex flex-wrap items-center justify-center gap-3">

          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => onSelect(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "scale-125 bg-[var(--primary)]"
                  : "bg-[var(--border)] hover:bg-[var(--primary)]"
              }`}
            />
          ))}

        </div>

        {/* Next */}

        <button
          type="button"
          onClick={onNext}
          className="site-button-primary"
        >
          Next →
        </button>

      </div>

      {/* Progress */}

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-soft)]">

          <span>
            {currentIndex + 1} of {total}
          </span>

          <span>
            {Math.round(((currentIndex + 1) / total) * 100)}%
          </span>

        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">

          <div
            className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / total) * 100}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}