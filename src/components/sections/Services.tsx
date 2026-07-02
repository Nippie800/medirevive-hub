"use client";

import Link from "next/link";

const services = [
  {
    title: "Reupholstery",
    description:
      "Medical, physiotherapy, wellness and professional-use furniture restored with durable, hygienic upholstery designed for long-term performance.",
  },
  {
    title: "Repairs & Restoration",
    description:
      "Foam replacement, structural repairs, stitching, reinforcement and complete restoration to extend equipment life.",
  },
  {
    title: "Custom Accessories",
    description:
      "PVC bed covers, saddle chair covers, pillowcases, privacy curtains, custom upholstery and bespoke healthcare accessories.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="site-section pt-0"
    >
      <div className="site-container">

        <div className="max-w-3xl">

          <span className="site-kicker">
            Explore Our Services
          </span>

          <h2 className="site-title-lg mt-6">
            Professional healthcare furniture restoration.
          </h2>

          <p className="site-body mt-6">
            From examination beds and treatment plinths to office seating
            and privacy curtains, we restore healthcare and commercial
            furniture using premium medical-grade materials.
          </p>

        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          {services.map((service) => (
            <div
              key={service.title}
              className="
                group
                site-card
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <div className="site-card-body">

                <span className="site-badge">
                  Service
                </span>

                <h3 className="mt-5 text-2xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-5 leading-8 text-[var(--text-soft)]">
                  {service.description}
                </p>

                <Link
                  href="/catalog"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-[var(--primary)]
                    transition
                    group-hover:gap-3
                  "
                >
                  Learn More →

                </Link>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}