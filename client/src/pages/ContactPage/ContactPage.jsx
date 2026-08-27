import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, ArrowRight, Clock3, HelpCircle } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-luxury py-24 lg:py-32">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              GET IN TOUCH
            </span>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              We're here to
              <br />
              <span className="text-gradient">help.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Have a question about your order, our products, shipping, or
              anything else? Reach out to the STYQLO team.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT OPTIONS ================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* EMAIL */}
            <a
              href="mailto:support@styqlo.com"
              className="card-luxury p-8 lg:p-10 group transition-luxury"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-lighter flex items-center justify-center group-hover:bg-primary transition-luxury">
                <Mail
                  size={24}
                  className="text-primary group-hover:text-foreground transition-luxury"
                />
              </div>

              <p className="mt-7 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                Email Us
              </p>

              <h2 className="mt-2 text-2xl lg:text-3xl font-semibold">
                support@styqlo.com
              </h2>

              <p className="mt-4 text-muted-foreground leading-7">
                For orders, products, returns, payments, and general support.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 font-semibold">
                Send an email
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </a>

            {/* PHONE */}
            <a
              href="tel:+919999999999"
              className="card-luxury p-8 lg:p-10 group transition-luxury"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-lighter flex items-center justify-center group-hover:bg-primary transition-luxury">
                <Phone
                  size={24}
                  className="text-primary group-hover:text-foreground transition-luxury"
                />
              </div>

              <p className="mt-7 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
                Call Us
              </p>

              <h2 className="mt-2 text-2xl lg:text-3xl font-semibold">
                +91 99999 99999
              </h2>

              <p className="mt-4 text-muted-foreground leading-7">
                Speak directly with our customer support team for assistance.
              </p>

              <div className="mt-7 inline-flex items-center gap-2 font-semibold">
                Call STYQLO
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT ================= */}
      <section className="bg-[#F5EAE7] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* SUPPORT INFO */}
            <div>
              <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                CUSTOMER SUPPORT
              </span>

              <h2 className="mt-5 text-4xl lg:text-5xl font-bold">
                Need help with
                <br />
                your order?
              </h2>

              <p className="mt-6 text-lg text-muted-foreground leading-8 max-w-xl">
                Our support team is here to make your STYQLO experience as
                smooth as possible—from placing your order to receiving it at
                your doorstep.
              </p>

              <div className="mt-10">
                <Link
                  to="/orders"
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
                >
                  Track Your Order
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* HOURS */}
            <div className="card-luxury bg-white p-8 lg:p-10">
              <div className="w-14 h-14 rounded-2xl bg-primary-lighter flex items-center justify-center">
                <Clock3 size={24} className="text-primary" />
              </div>

              <h3 className="mt-7 text-2xl font-semibold">
                Support Hours
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-5 pb-4 border-b border-border">
                  <span className="text-muted-foreground">
                    Monday – Friday
                  </span>

                  <span className="font-semibold">
                    10:00 AM – 6:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 pb-4 border-b border-border">
                  <span className="text-muted-foreground">
                    Saturday
                  </span>

                  <span className="font-semibold">
                    10:00 AM – 4:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5">
                  <span className="text-muted-foreground">
                    Sunday
                  </span>

                  <span className="font-semibold">
                    Closed
                  </span>
                </div>
              </div>

              <p className="mt-7 text-sm text-muted-foreground">
                Response times may vary during weekends, holidays, and
                high-volume periods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOCIAL ================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary-lighter flex items-center justify-center">
            <MessageCircle size={23} className="text-primary" />
          </div>

          <h2 className="mt-7 text-4xl lg:text-5xl font-bold">
            Follow the STYQLO journey.
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Discover new drops, styling inspiration, and everything happening
            at STYQLO.
          </p>

          <div className="mt-9 flex justify-center gap-4">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="STYQLO Instagram"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-luxury hover:bg-primary hover:border-primary"
            >
              {/* <Instagram size={20} /> */}
              Instagram
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="STYQLO Facebook"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-luxury hover:bg-primary hover:border-primary"
            >
              {/* <Facebook size={20} /> */}
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* ================= FAQ CTA ================= */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
          <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center">
              <HelpCircle size={24} />
            </div>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold">
              Looking for a quick answer?
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              Find answers to common questions about orders, shipping,
              payments, returns, and more.
            </p>

            <Link
              to="/faq"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
            >
              Visit FAQs
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;