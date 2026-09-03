import { Link } from "react-router-dom";

const helpTopics = [
  "Orders and order status",
  "Product information",
  "Size and fit questions",
  "Payments",
  "Shipping and delivery",
  "Returns",
  "Refunds",
  "Exchanges",
  "Damaged or incorrect products",
  "Complaints",
  "General enquiries",
];


const ContactPage = () => {

  const handleCall = () => {
    const phoneNumber = import.meta.env.VITE_NUMBER;

    window.location.href = `tel:${phoneNumber}`;
  };

  const handleMap = () => {
    const url = import.meta.env.VITE_MAP
    window.open(url, "_blank");
  }

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
              Contact STYQLO
            </p>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              We're Here
              <span className="block text-gradient">to Help.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Have a question about your order, a product, shipping, returns,
              or anything else? Get in touch with STYQLO.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT INFORMATION
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Phone */}
          <button
            onClick={handleNumber}
            className="card-luxury group p-7 sm:p-8 flex flex-col items-start"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-xl text-rose-dark transition-transform duration-300 group-hover:scale-105">
              ☎
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
              Customer Support
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Phone / WhatsApp
            </h2>

            <p className="mt-3 text-base text-muted-foreground">
              +91{import.meta.env.VITE_NUMBER}
            </p>
          </button>

          {/* Email */}
          <button
            onClick={handleMail}
            className="card-luxury group p-7 sm:p-8 flex flex-col items-start"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-xl text-rose-dark transition-transform duration-300 group-hover:scale-105">
              @
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
              Email
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Email Us
            </h2>

            <p className="mt-3 break-all text-base text-muted-foreground">
              {import.meta.env.VITE_EMAIL}
            </p>
          </button>

          {/* Support Hours */}
          <div className="card-luxury p-7 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-xl text-rose-dark">
              ◷
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
              Support Hours
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Monday – Sunday
            </h2>

            <p className="mt-3 text-base text-muted-foreground">
              10:00 AM – 10:00 PM
            </p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Sunday & Public Holidays — Limited support may be available.
            </p>
          </div>
        </div>

        {/* Response time */}
        <div className="mt-8 rounded-2xl border border-border bg-primary-lighter/50 p-5 text-center">
          <p className="text-sm text-muted-foreground">
            We aim to respond to customer enquiries within{" "}
            <strong className="text-foreground">
              1–2 business days.
            </strong>
          </p>
        </div>
      </section>

      {/* =========================================================
          WHATSAPP
      ========================================================= */}
      <section className="border-y border-border bg-luxury">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-white/70 p-7 shadow-card backdrop-blur sm:p-10 lg:flex-row lg:items-center lg:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
                Quick Support
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Chat With Us on WhatsApp
              </h2>

              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                Need a quick answer? Connect with our team directly on
                WhatsApp for customer support and order-related assistance.
              </p>

              <p className="mt-4 text-sm font-semibold text-foreground">
                WhatsApp: +91{import.meta.env.VITE_NUMBER}
              </p>
            </div>

            <button
              onClick={handleNumber}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury"
            >
              Chat with STYQLO →
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT CAN WE HELP WITH?
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
            Customer Support
          </p>

          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What Can We Help You With?
          </h2>

          <p className="mt-5 text-[15px] leading-8 text-muted-foreground">
            You can contact us regarding any of the following:
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic, index) => (
            <div
              key={topic}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-lighter text-xs font-bold text-rose-dark">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-sm font-medium text-foreground">
                {topic}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-luxury p-6">
          <p className="text-sm leading-7 text-muted-foreground">
            For questions regarding an existing order, please keep your{" "}
            <strong className="text-foreground">order number</strong> ready
            so we can assist you more quickly.
          </p>
        </div>
      </section>

      {/* =========================================================
          SEND US A MESSAGE
      ========================================================= */}
      <section className="bg-luxury-hero">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
            <div>
              <p className="mb-5 text-sm text-white font-bold uppercase tracking-[0.2em] text-primary-light">
                Get In Touch
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Send Us
                <span className="block text-primary-light">
                  a Message.
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-white/65">
                For general enquiries, you can reach us directly through
                email or WhatsApp.
              </p>

              <div className="mt-8 space-y-4 text-sm text-white/70">
                <div>
                  <span className="font-semibold text-white">
                    Email
                  </span>
                  <p className="mt-1">{import.meta.env.VITE_EMAIL}</p>
                </div>

                <div>
                  <span className="font-semibold text-white">
                    Phone / WhatsApp
                  </span>
                  <p className="mt-1">+91{import.meta.env.VITE_NUMBER}</p>
                </div>
              </div>
            </div>

            {/* Message Instructions */}
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur sm:p-9">
              <h3 className="text-2xl font-semibold text-white">
                When contacting us about an order
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/60">
                Please include the following information to help us
                understand and resolve your request faster.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-xs font-bold text-primary-light">
                    01
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      Order Number
                    </p>

                    <p className="mt-1 text-sm text-white/55">
                      Your STYQLO order number.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-xs font-bold text-primary-light">
                    02
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      Issue
                    </p>

                    <p className="mt-1 text-sm text-white/55">
                      A brief description of your concern.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-xs font-bold text-primary-light">
                    03
                  </span>

                  <div>
                    <p className="font-semibold text-white">
                      Details
                    </p>

                    <p className="mt-1 text-sm text-white/55">
                      Any relevant information, photographs, or other
                      supporting details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  onClick={handleMail}
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5"
                >
                  Email Us
                </button>

                <button
                  onClick={handleNumber}
                  className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISIT US
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch">
          {/* Address */}
          <div className="card-luxury p-8 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-xl text-rose-dark">
              ⌖
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
              Visit Us
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              STYQLO / Mahananda Kart
            </h2>

            <div className="mt-6 space-y-1 text-sm leading-7 text-muted-foreground">
              <p>{import.meta.env.VITE_ADDRESS_CITY}, {import.meta.env.VITE_ADDRESS_MARKET}</p>
              <p>PIN: {import.meta.env.VITE_ADDRESS_PIN}</p>
              <p>Odisha, India</p>
            </div>

            {/* <button
              onClick={handleMap}
              className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-luxury"
            >
              Google Maps →
            </button> */}
          </div>

          {/* Map Placeholder */}
          <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-border bg-luxury">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-lighter text-2xl text-rose-dark shadow-card">
                  ⌖
                </div>

                <p className="mt-5 text-lg font-semibold">
                  {import.meta.env.VITE_ADDRESS_CITY}, Odisha
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {import.meta.env.VITE_ADDRESS_MARKET}
                </p>

                {/* <button
                  onClick={handleMap}
                  className="mt-5 inline-block text-sm font-semibold text-rose-dark hover:underline"
                >
                  Open in Google Maps →
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="border-t border-border bg-luxury">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 lg:px-10 lg:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-dark">
            STYQLO
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            We're Always Happy to Hear From You.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            Whether you have a question before placing an order or need help
            after your purchase, STYQLO is here for you.
          </p>

          <p className="mt-7 text-lg font-semibold text-foreground">
            Good Quality. Less Price. More Style.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleCall}
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-all hover:border-primary hover:bg-primary-lighter"
            >
              Call Us
            </button>

            <button
              onClick={handleMail}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-luxury"
            >
              Email Us
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT INFORMATION FOOTER
      ========================================================= */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Brand
              </p>

              <p className="mt-2 font-semibold">
                STYQLO
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Operated By
              </p>

              <p className="mt-2 font-semibold">
                Mahananda Kart
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Phone / WhatsApp
              </p>

              <button
                onClick={handleCall}
                className="mt-2 block font-semibold hover:text-primary"
              >
                +91{import.meta.env.VITE_NUMBER}
              </button>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Email
              </p>

              <button
                onClick={handleMail}
                className="mt-2 block break-all font-semibold hover:text-primary"
              >
                {import.meta.env.VITE_EMAIL}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Back */}
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

export default ContactPage;