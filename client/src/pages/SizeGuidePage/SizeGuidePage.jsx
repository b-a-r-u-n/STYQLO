import React from "react";
import { Link } from "react-router-dom";
import {
  Ruler,
  Shirt,
  Info,
  ArrowRight,
} from "lucide-react";

const sizes = [
  {
    size: "S",
    chest: "38",
    length: "27",
  },
  {
    size: "M",
    chest: "40",
    length: "28",
  },
  {
    size: "L",
    chest: "42",
    length: "29",
  },
  {
    size: "XL",
    chest: "44",
    length: "30",
  },
  {
    size: "XXL",
    chest: "46",
    length: "31",
  },
];

const measurements = [
  {
    number: "01",
    title: "Chest",
    description:
      "Measure around the fullest part of your chest, keeping the measuring tape horizontal and comfortably snug.",
  },
  {
    number: "02",
    title: "Length",
    description:
      "Measure from the highest point of the shoulder down to the bottom hem of the garment.",
  },
];

const SizeGuidePage = () => {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-luxury py-24 lg:py-32">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              STYQLO FIT GUIDE
            </span>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Find your
              <br />
              <span className="text-gradient">perfect fit.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Use our size guide to find the right STYQLO fit. Compare your
              measurements with the chart below before placing your order.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SIZE CHART ================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              SIZE CHART
            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold">
              Find your STYQLO size
            </h2>

            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
              Measurements are provided in inches. For the best fit, compare
              these measurements with a garment that fits you well.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block mt-14 overflow-hidden rounded-[1.5rem] border border-border shadow-card bg-card">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F5EAE7]">
                  <th className="px-6 py-5 text-left text-sm font-semibold">
                    Size
                  </th>

                  <th className="px-6 py-5 text-center text-sm font-semibold">
                    Chest
                  </th>

                  <th className="px-6 py-5 text-center text-sm font-semibold">
                    Length
                  </th>
                </tr>
              </thead>

              <tbody>
                {sizes.map((item, index) => (
                  <tr
                    key={item.size}
                    className={`transition-luxury hover:bg-primary-lighter/40 ${
                      index !== sizes.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary-lighter font-bold">
                        {item.size}
                      </span>
                    </td>

                    <td className="px-6 py-6 text-center font-medium">
                      {item.chest}"
                    </td>

                    <td className="px-6 py-6 text-center font-medium">
                      {item.length}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden mt-10 space-y-3">
            {sizes.map((item) => (
              <div
                key={item.size}
                className="card-luxury p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-primary-lighter flex items-center justify-center font-bold">
                    {item.size}
                  </span>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Size
                    </p>

                    <p className="font-semibold">
                      {item.size}
                    </p>
                  </div>
                </div>

                <div className="flex gap-7">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Chest
                    </p>

                    <p className="font-semibold">
                      {item.chest}"
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Length
                    </p>

                    <p className="font-semibold">
                      {item.length}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Measurement note */}
          <div className="mt-7 flex gap-3 p-5 rounded-2xl bg-primary-lighter/50 border border-border">
            <Info
              size={20}
              className="text-primary shrink-0 mt-0.5"
            />

            <p className="text-sm text-muted-foreground leading-6">
              <span className="font-semibold text-foreground">
                Please note:
              </span>{" "}
              Measurements can vary slightly depending on the product's
              fabric, cut, and construction. Always check the size chart
              available on the individual product page when provided.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW TO MEASURE ================= */}
      <section className="bg-[#F5EAE7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-primary-lighter flex items-center justify-center">
                <Ruler size={25} className="text-primary" />
              </div>

              <span className="block mt-7 text-sm font-bold tracking-[0.2em] text-primary uppercase">
                HOW TO MEASURE
              </span>

              <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">
                Get the right fit
                <br />
                every time.
              </h2>

              <p className="mt-6 text-lg text-muted-foreground leading-8">
                All you need is a flexible measuring tape and a few minutes.
                Keep the tape comfortable against your body without pulling
                it too tightly.
              </p>
            </div>

            <div className="space-y-5">
              {measurements.map((item) => (
                <div
                  key={item.number}
                  className="bg-white rounded-[1.5rem] border border-border p-7 lg:p-9 shadow-card"
                >
                  <div className="flex gap-6">
                    <span className="text-sm font-bold text-primary pt-1">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="text-2xl font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-muted-foreground leading-7">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-[1.5rem] border border-border p-7 lg:p-9 shadow-card">
                <div className="flex gap-6">
                  <span className="text-sm font-bold text-primary pt-1">
                    03
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold">
                      Compare
                    </h3>

                    <p className="mt-3 text-muted-foreground leading-7">
                      Compare your measurements with the STYQLO size chart.
                      If you're between two sizes, consider your preferred
                      fit before choosing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK TIP ================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="card-luxury p-8 lg:p-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary-lighter flex items-center justify-center">
              <Shirt size={23} className="text-primary" />
            </div>

            <h2 className="mt-7 text-3xl lg:text-4xl font-bold">
              Still unsure about your size?
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-muted-foreground leading-7">
              If you're between sizes or need help choosing a fit, our
              customer support team is happy to help.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-7 px-7 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SizeGuidePage;