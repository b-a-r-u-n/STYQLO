import { Link } from "react-router-dom";

const tshirtSizes = ["S", "M", "L", "XL", "XXL"];

const tshirtMeasurements = {
  S: {
    chest: 38,
    length: 26,
    shoulder: 17,
    sleeve: 8,
  },
  M: {
    chest: 40,
    length: 27,
    shoulder: 18,
    sleeve: 8.5,
  },
  L: {
    chest: 42,
    length: 28,
    shoulder: 19,
    sleeve: 9,
  },
  XL: {
    chest: 44,
    length: 29,
    shoulder: 20,
    sleeve: 9.5,
  },
  XXL: {
    chest: 46,
    length: 30,
    shoulder: 21,
    sleeve: 10,
  },
};

const trackPantSizes = ["S", "M", "L", "XL", "XXL"];

const trackPantMeasurements = {
  S: {
    waist: 28,
    hip: 38,
    length: 39,
    inseam: 28,
  },
  M: {
    waist: 30,
    hip: 40,
    length: 40,
    inseam: 29,
  },
  L: {
    waist: 32,
    hip: 42,
    length: 41,
    inseam: 30,
  },
  XL: {
    waist: 34,
    hip: 44,
    length: 42,
    inseam: 31,
  },
  XXL: {
    waist: 36,
    hip: 46,
    length: 43,
    inseam: 32,
  },
};

const tshirtMeasurementInfo = [
  {
    label: "Chest",
    description: "Measure across the chest from armpit to armpit and multiply by 2.",
  },
  {
    label: "Length",
    description:
      "Measure from the highest point of the shoulder down to the bottom hem.",
  },
  {
    label: "Shoulder",
    description:
      "Measure from one shoulder seam to the other shoulder seam.",
  },
  {
    label: "Sleeve",
    description:
      "Measure from the shoulder seam to the end of the sleeve.",
  },
];

const trackPantMeasurementInfo = [
  {
    label: "Waist",
    description:
      "Measure around your natural waist without pulling the measuring tape too tightly.",
  },
  {
    label: "Hip",
    description: "Measure around the fullest part of your hips.",
  },
  {
    label: "Length",
    description:
      "Measure from the top of the waistband to the bottom of the leg.",
  },
  {
    label: "Inseam",
    description:
      "Measure from the crotch to the bottom of the leg.",
  },
];

function TShirtTable() {

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-primary-lighter">
              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Size
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Chest
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Length
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Shoulder
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Sleeve
              </th>
            </tr>
          </thead>

          <tbody>
            {tshirtSizes.map((size, index) => {
              const item = tshirtMeasurements[size];

              return (
                <tr
                  key={size}
                  className={`transition-colors hover:bg-primary-lighter/40 ${index !== tshirtSizes.length - 1
                    ? "border-b border-border"
                    : ""
                    }`}
                >
                  <td className="px-6 py-5 font-semibold">
                    {size}
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.chest}"
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.length}"
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.shoulder}"
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.sleeve}"
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrackPantTable() {
  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-primary-lighter">
              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Size
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Waist
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Hip
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Length
              </th>

              <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Inseam
              </th>
            </tr>
          </thead>

          <tbody>
            {trackPantSizes.map((size, index) => {
              const item = trackPantMeasurements[size];

              return (
                <tr
                  key={size}
                  className={`transition-colors hover:bg-primary-lighter/40 ${index !== trackPantSizes.length - 1
                    ? "border-b border-border"
                    : ""
                    }`}
                >
                  <td className="px-6 py-5 font-semibold">
                    {size}
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.waist}"
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.hip}"
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.length}"
                  </td>

                  <td className="px-6 py-5 text-sm text-muted-foreground">
                    {item.inseam}"
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MeasurementCards({ items }) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-lighter text-xs font-bold text-rose-dark">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-lg font-semibold">
                {item.label}
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const SizeGuidePage = () => {

  const handleNumber = () => {
    const message = encodeURIComponent(
      "Hello STYQLO Team! 👋\n\nI’d like to get in touch regarding your products/services. Could you please assist me?\n\nThank you!"
    );

    const url = `https://api.whatsapp.com/send?phone=${import.meta.env.VITE_NUMBER}&text=${message}`;
    window.open(url, "_blank");
  }

  const handleMail = () => {
    const subject = encodeURIComponent("Hello STYQLO Team");
    const body = encodeURIComponent(
      "Hello STYQLO Team! 👋\n\nI’d like to get in touch regarding your products/services. Could you please assist me?\n\nThank you!"
    );

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL}&su=${subject}&body=${body}`;

    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden border-b border-border bg-luxury">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-rose-dark">
              STYQLO Size Guide
            </p>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Find Your
              <span className="block text-gradient">
                Perfect Fit.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Choosing the right size should be simple. Use the STYQLO
              size guide to find the size that best matches your preferred
              fit.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-white/70 px-5 py-3 text-sm font-medium shadow-card backdrop-blur">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold">
                ✓
              </span>

              Regular Fit · S to XXL
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FIT TIP
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="rounded-3xl border border-primary/30 bg-primary-lighter/60 p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg">
              ✦
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                Fit Tip
              </h2>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                If you are between two sizes, we recommend choosing the{" "}
                <strong className="text-foreground">
                  larger size
                </strong>{" "}
                for a more relaxed and comfortable fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          T-SHIRT
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
            Tops
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            T-Shirt Size Guide
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
            Our T-shirts are designed around a regular fit. Compare your
            measurements with the chart below before placing your order.
          </p>
        </div>

        <TShirtTable />

        <div className="mt-4">
          <p className="text-xs text-muted-foreground">
            Measurements: Inches (in)
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            1 inch = 2.54 cm
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold">
            How to Measure a T-Shirt
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            For the most accurate result, take a T-shirt that already
            fits you well and measure it flat on a table.
          </p>

          <MeasurementCards items={tshirtMeasurementInfo} />
        </div>
      </section>

      {/* =========================================================
          TRACK PANTS
      ========================================================= */}
      <section className="border-y border-border bg-luxury">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
              Bottoms
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Track Pant Size Guide
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
              Use the following measurements to find the most suitable
              STYQLO track pant size.
            </p>
          </div>

          <TrackPantTable />

          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              Measurements: Inches (in)
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              1 inch = 2.54 cm
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-semibold">
              How to Measure Track Pants
            </h3>

            <MeasurementCards items={trackPantMeasurementInfo} />
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK SIZE GUIDE
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
              Quick Reference
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Know Your Size?
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-muted-foreground">
              If you already know your usual STYQLO size, use this quick
              reference. For the best fit, always compare your measurements
              with the applicable product size chart.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              ["S", "Small"],
              ["M", "Medium"],
              ["L", "Large"],
              ["XL", "Extra Large"],
              ["XXL", "Double Extra Large"],
            ].map(([size, name]) => (
              <div
                key={size}
                className="rounded-2xl border border-border bg-card p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="text-2xl font-bold text-gradient">
                  {size}
                </span>

                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BETWEEN TWO SIZES
      ========================================================= */}
      <section className="border-y border-border bg-primary-lighter/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
              Need Help Deciding?
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Between Two Sizes?
            </h2>

            <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
              Not sure whether to choose one size or the next?
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-lg">
                ↓
              </span>

              <h3 className="mt-6 text-xl font-semibold">
                Choose the Smaller Size
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Choose the smaller size if you prefer a closer and more
                fitted appearance.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-lg">
                ↑
              </span>

              <h3 className="mt-6 text-xl font-semibold">
                Choose the Larger Size
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Choose the larger size for a more relaxed and comfortable
                fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          IMPORTANT INFORMATION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
            Before You Order
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Important Measurement Information
          </h2>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            "Measurements may have a small tolerance due to the manufacturing process.",
            "Measure your clothing or body on a flat surface where applicable.",
            "Do not stretch the fabric while measuring.",
            "Compare the measurements with a garment that fits you comfortably.",
            "Different clothing styles may feel slightly different even when they have the same labeled size.",
            "Our products follow the STYQLO standard size measurements, but always check the applicable product information before ordering.",
          ].map((item, index) => (
            <div
              key={item}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-lighter text-xs font-bold text-rose-dark">
                ✓
              </span>

              <p className="text-sm leading-7 text-muted-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          NEED HELP
      ========================================================= */}
      <section className="bg-luxury-hero">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-light">
                Need Assistance?
              </p>

              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Need Help Choosing a Size?
              </h2>

              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/65">
                If you're still unsure about which size to choose, we're
                happy to help. Contact STYQLO before placing your order and
                provide your measurements.
              </p>

              <p className="mt-4 text-sm text-white/70">
                Phone / WhatsApp: +{import.meta.env.VITE_NUMBER}
              </p>

              <p className="mt-1 text-sm text-white/70">
                Email: {import.meta.env.VITE_EMAIL}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleNumber}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-1 hover:shadow-luxury"
              >
                WhatsApp
              </button>

              <button
                onClick={handleMail}
                className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15"
              >
                Email Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RETURNS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="rounded-[2rem] border border-border bg-luxury p-7 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
                Size & Returns
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Check Your Size Before Ordering
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                Please check the size guide carefully before placing your
                order. If the size or fit isn't right for you, STYQLO accepts
                eligible{" "}
                <strong className="text-foreground">
                  returns and exchanges within 7 days of delivery
                </strong>
                , subject to our Return & Refund Policy.
              </p>
            </div>

            <Link
              to="/return-policy"
              className="inline-flex w-fit rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-luxury"
            >
              Return & Refund Policy →
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-rose-dark">
            STYQLO
          </p>

          <p className="mt-4 text-xl font-semibold">
            Good Quality. Less Price. More Style.
          </p>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            Find your perfect fit and shop with confidence.
          </p>
        </div>
      </section>

      <div className="border-t border-border py-8 text-center">
        <Link
          to="/"
          className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to STYQLO
        </Link>
      </div>
    </main>
  );
};

export default SizeGuidePage;