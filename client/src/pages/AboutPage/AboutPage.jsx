import React from 'react'
import { Link } from "react-router-dom";

const values = [
  {
    number: "01",
    title: "Quality",
    description:
      "We believe affordable clothing should still provide a good level of quality. We focus on products that offer a comfortable and reliable everyday experience.",
  },
  {
    number: "02",
    title: "Affordability",
    description:
      "Fashion should be accessible to everyone. Our goal is to offer stylish clothing at budget-friendly prices.",
  },
  {
    number: "03",
    title: "Style",
    description:
      "We focus on modern and versatile designs that can fit different personalities, occasions, and everyday lifestyles.",
  },
];

const products = [
  "T-Shirts",
  "Polo T-Shirts",
  "Shirts",
  "Hoodies",
  "Jeans",
  "Other Class 25 fashion products",
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-border bg-luxury">
        {/* Decorative Elements */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="absolute right-[15%] top-[30%] h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-rose-dark">
              About STYQLO
            </p>

            <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Style That Fits
              <span className="block text-gradient">Your Budget.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A modern clothing brand bringing together good quality,
              affordability, and style — created to make fashion more
              accessible.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-border bg-white/70 px-5 py-2.5 text-sm font-medium backdrop-blur">
                Founded August 2026
              </span>

              <span className="rounded-full border border-border bg-white/70 px-5 py-2.5 text-sm font-medium backdrop-blur">
                Rourkela, Odisha
              </span>

              <span className="rounded-full border border-border bg-white/70 px-5 py-2.5 text-sm font-medium backdrop-blur">
                Class 25
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRODUCTION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          {/* Text */}
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
              Our Story
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Fashion made for everyday life.
            </h2>

            <div className="mt-7 space-y-5 text-[15px] leading-8 text-muted-foreground">
              <p>
                <strong className="text-foreground">STYQLO</strong> is a
                modern clothing brand focused on bringing together{" "}
                <strong className="text-foreground">
                  good quality, affordability, and style.
                </strong>
              </p>

              <p>
                Founded in <strong className="text-foreground">August 2026</strong>{" "}
                and based in{" "}
                <strong className="text-foreground">
                  Rourkela, Odisha
                </strong>
                , STYQLO was created with a simple goal — to build a clothing
                brand that makes stylish and quality fashion accessible at
                budget-friendly prices.
              </p>

              <p>
                STYQLO is operated by{" "}
                <strong className="text-foreground">Mahananda Kart</strong>{" "}
                and serves customers through both{" "}
                <strong className="text-foreground">
                  online and offline
                </strong>{" "}
                channels.
              </p>
            </div>
          </div>

          {/* Brand Statement Card */}
          <div className="relative">
            <div className="card-luxury relative overflow-hidden p-8 sm:p-10">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary-lighter blur-2xl" />

              <div className="relative">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-lighter">
                  <span className="text-xl font-bold text-rose-dark">
                    S
                  </span>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
                  The STYQLO Idea
                </p>

                <p className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground">
                  Good Quality.
                  <br />
                  Less Price.
                  <br />
                  More Style.
                </p>

                <div className="mt-8 h-px bg-border" />

                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                  Looking good shouldn't always come with a high price tag.
                  That's why we're building STYQLO around quality, style, and
                  affordability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR BRAND
      ========================================================= */}
      <section className="bg-luxury border-y border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
              Our Brand
            </p>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Modern fashion, without the unnecessary price tag.
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-muted-foreground">
              STYQLO is a trademark registered under{" "}
              <strong className="text-foreground">Class 25</strong>, covering
              clothing, footwear, headwear, and related fashion products.
            </p>
          </div>

          {/* Product Grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <div
                key={product}
                className="group rounded-2xl border border-border bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-hover"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-lighter text-xs font-bold text-rose-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-lg text-primary transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {product}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE STAND FOR
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
            What We Stand For
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Three things at the heart of STYQLO.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.number}
              className="card-luxury group p-7 sm:p-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-lighter text-xs font-bold text-rose-dark transition-transform duration-300 group-hover:scale-105">
                {value.number}
              </span>

              <h3 className="mt-7 text-2xl font-semibold">
                {value.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          WHY STYQLO
      ========================================================= */}
      <section className="bg-luxury-hero">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-primary-light">
                Why STYQLO?
              </p>

              <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
                More value.
                <br />
                More style.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-white/70">
                Whether you're looking for an everyday T-shirt, a smart Polo,
                a comfortable hoodie, or other fashion essentials, we're
                building STYQLO to give you more value for your money.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80">
                  Good Quality
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80">
                  Budget Friendly
                </span>

                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80">
                  Modern Style
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAM
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
            Our Team
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            The people behind STYQLO.
          </h2>

          <p className="mt-5 text-[15px] leading-8 text-muted-foreground">
            STYQLO is built through a combination of entrepreneurial vision,
            guidance, and technical development.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Founder */}
          <div className="card-luxury group p-7 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-lighter text-2xl font-bold text-rose-dark">
                A
              </div>

              <span className="rounded-full bg-primary-lighter px-3 py-1.5 text-xs font-semibold text-rose-dark">
                Founder
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-semibold">
              Ashish Kumar Mahananda
            </h3>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Ashish Kumar Mahananda is the founder of STYQLO, responsible for
              building the brand and shaping its direction.
            </p>
          </div>

          {/* Consultant */}
          <div className="card-luxury group p-7 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-lighter text-2xl font-bold text-rose-dark">
                M
              </div>

              <span className="rounded-full bg-primary-lighter px-3 py-1.5 text-xs font-semibold text-rose-dark">
                Consultant
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-semibold">
              M R Mahanta
            </h3>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              M R Mahanta supports STYQLO as a consultant, contributing
              guidance and expertise to the brand.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          WEBSITE DEVELOPMENT
      ========================================================= */}
      <section className="border-y border-border bg-luxury">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
                Website Development
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for a modern shopping experience.
              </h2>

              <p className="mt-5 max-w-3xl text-[15px] leading-8 text-muted-foreground">
                The STYQLO online shopping experience and website have been
                developed by{" "}
                <strong className="text-foreground">
                  Barun Kumar Mahakud
                </strong>
                , who works on the website's development, functionality, and
                technical implementation.
              </p>
            </div>

            <div className="card-luxury min-w-[220px] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Developer
              </p>

              <p className="mt-3 text-lg font-semibold text-foreground">
                Barun Kumar Mahakud
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BRAND CTA
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-luxury-warm p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-dark">
              STYQLO
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Good Quality.
              <br />
              Less Price.
              <br />
              More Style.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/70">
              A modern clothing brand from{" "}
              <strong>Rourkela, Odisha</strong>, bringing affordable and
              stylish fashion to customers through online and offline
              shopping.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-luxury"
              >
                Shop Now
              </Link>

              <Link
                to="/contact"
                className="rounded-full border border-foreground/20 bg-white/40 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-white/70"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BUSINESS DETAILS
      ========================================================= */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Brand
              </p>

              <p className="mt-2 font-semibold text-foreground">
                STYQLO
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Operated By
              </p>

              <p className="mt-2 font-semibold text-foreground">
                Mahananda Kart
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Trademark
              </p>

              <p className="mt-2 font-semibold text-foreground">
                STYQLO — Class 25
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Location
              </p>

              <p className="mt-2 font-semibold text-foreground">
                Rourkela, Odisha
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT
      ========================================================= */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
                Connect With Us
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Have a question? We'd love to hear from you.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+918047895089"
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-primary hover:bg-primary-lighter hover:text-foreground"
              >
                +91 8047895089
              </a>

              <a
                href="mailto:mahanandakart@gmail.com"
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-primary hover:bg-primary-lighter hover:text-foreground"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="border-t border-border py-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to STYQLO
        </Link>
      </div>
    </main>
  );
}

export default AboutPage
