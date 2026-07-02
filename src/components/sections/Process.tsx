"use client";

const steps = [
  {
    number: "01",
    title: "Request a Quote",
    description:
      "Tell us about your equipment, upload photos if available, and submit your enquiry for assessment.",
  },
  {
    number: "02",
    title: "Assessment & Quotation",
    description:
      "Our team evaluates the condition of the equipment and prepares a detailed quotation based on the required restoration work.",
  },
  {
    number: "03",
    title: "Collection & Restoration",
    description:
      "Once approved, we arrange collection where required and begin the restoration using premium medical-grade materials.",
  },
  {
    number: "04",
    title: "Quality Inspection",
    description:
      "Every project is carefully inspected to ensure it meets our quality, hygiene and durability standards before delivery.",
  },
  {
    number: "05",
    title: "Delivery",
    description:
      "Your restored equipment is returned looking professional, extending its lifespan while helping avoid unnecessary replacement costs.",
  },
];

export default function Process() {
  return (
    <section className="site-section bg-[var(--background-soft)]">
      <div className="site-container">

        <div className="max-w-3xl">

          <span className="site-kicker">
            Our Process
          </span>

          <h2 className="site-title-lg mt-6">
            A simple and transparent restoration process.
          </h2>

          <p className="site-body mt-6">
            Every project follows the same proven workflow to ensure
            professional communication, quality workmanship and complete
            customer confidence from start to finish.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          {steps.map((step) => (
            <div
              key={step.number}
              className="
                site-card
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <div className="site-card-body">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-[var(--text-soft)]">
                  {step.description}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}