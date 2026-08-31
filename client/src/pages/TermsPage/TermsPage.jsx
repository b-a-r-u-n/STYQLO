import { Link } from "react-router-dom";

  const handleMail = () => {
    const subject = encodeURIComponent("Hello STYQLO Team");
    const body = encodeURIComponent(
      "Hello STYQLO Team! 👋\n\nI’d like to get in touch regarding your products/services. Could you please assist me?\n\nThank you!"
    );

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL}&su=${subject}&body=${body}`;

    window.open(url, "_blank");
  };

const sections = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    content: (
      <>
        <p>
          Welcome to <strong>STYQLO</strong>, an online fashion and clothing
          store operated by <strong>Mahananda Kart</strong>.
        </p>

        <p>
          These Terms & Conditions ("Terms") govern your access to and use of
          the STYQLO website, available at <strong>styqlo.com</strong>, and
          any products or services made available through the website.
        </p>

        <p>
          By accessing or using STYQLO, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and our{" "}
          <Link to="/privacy-policy">Privacy Policy</Link>.
        </p>

        <p>
          If you do not agree with these Terms, please do not use our website
          or place an order with us.
        </p>
      </>
    ),
  },

  {
    id: "eligibility",
    number: "02",
    title: "Eligibility",
    content: (
      <>
        <p>
          STYQLO is intended for individuals who are at least 18 years old or
          otherwise legally permitted to enter into binding agreements under
          applicable law.
        </p>

        <p>
          By using our website or placing an order, you represent that the
          information you provide is accurate and that you have the legal
          capacity to enter into these Terms.
        </p>
      </>
    ),
  },

  {
    id: "accounts",
    number: "03",
    title: "Customer Accounts",
    content: (
      <>
        <p>
          Certain features of STYQLO may require you to create a customer
          account.
        </p>

        <p>
          You are responsible for providing accurate, complete, and current
          information when creating and maintaining your account.
        </p>

        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for activities carried out through your
          account.
        </p>

        <p>
          If you believe that your account has been accessed without
          authorization, you should contact us promptly.
        </p>

        <p>
          We reserve the right to suspend or terminate accounts where we
          reasonably believe that the account is being misused, fraudulent
          activity is involved, or these Terms have been violated.
        </p>
      </>
    ),
  },

  {
    id: "products",
    number: "04",
    title: "Products & Product Information",
    content: (
      <>
        <p>
          We make reasonable efforts to display product descriptions,
          photographs, colors, sizes, prices, and other product information as
          accurately as possible.
        </p>

        <p>
          However, colors and appearance may vary depending on your device
          display and other factors.
        </p>

        <p>
          Product availability may change without prior notice. We reserve the
          right to limit quantities or discontinue products at our discretion.
        </p>

        <p>
          If an item becomes unavailable after an order has been placed, we may
          cancel the affected item or order and provide an appropriate refund
          where applicable.
        </p>
      </>
    ),
  },

  {
    id: "orders",
    number: "05",
    title: "Orders & Acceptance",
    content: (
      <>
        <p>
          When you place an order through STYQLO, you are submitting a request
          to purchase the selected products.
        </p>

        <p>
          An order confirmation does not necessarily mean that the order has
          been finally accepted. We reserve the right to accept, reject, or
          cancel an order for legitimate reasons.
        </p>

        <p>Reasons for cancellation may include:</p>

        <ul>
          <li>Product being unavailable</li>
          <li>Incorrect product or pricing information</li>
          <li>Incorrect or incomplete customer information</li>
          <li>Payment-related issues</li>
          <li>Suspected fraudulent or unauthorized transactions</li>
          <li>Shipping or delivery limitations</li>
          <li>Violation of these Terms</li>
        </ul>

        <p>
          If we cancel an order for which payment has already been received,
          the applicable amount will be refunded according to the applicable
          refund process.
        </p>
      </>
    ),
  },

  {
    id: "pricing",
    number: "06",
    title: "Pricing & Taxes",
    content: (
      <>
        <p>
          Product prices displayed on STYQLO are subject to change without
          prior notice.
        </p>

        <p>
          We make reasonable efforts to ensure that pricing information is
          accurate. However, if a pricing or calculation error occurs, we
          reserve the right to correct the error and, where appropriate,
          cancel an affected order.
        </p>

        <p>
          Applicable taxes and charges may be included in or added to the
          displayed price depending on the product, applicable law, and
          checkout configuration.
        </p>
      </>
    ),
  },

  {
    id: "payments",
    number: "07",
    title: "Payments",
    content: (
      <>
        <p>
          STYQLO may offer different payment methods depending on availability
          and eligibility.
        </p>

        <p>
          Payments may be processed through third-party payment service
          providers. By choosing a payment method, you agree to comply with
          the applicable terms of that payment provider.
        </p>

        <p>
          You confirm that you are authorized to use the payment method
          selected for your purchase and that the information provided during
          payment is accurate.
        </p>

        <p>
          We may cancel or hold an order where a payment is unsuccessful,
          reversed, disputed, or reasonably suspected to be unauthorized or
          fraudulent.
        </p>
      </>
    ),
  },

  {
    id: "shipping",
    number: "08",
    title: "Shipping & Delivery",
    content: (
      <>
        <p>
          Orders are shipped to the address provided by you during checkout.
          You are responsible for ensuring that your shipping information is
          accurate and complete.
        </p>

        <p>
          Delivery timelines shown on STYQLO are estimates and may vary due to
          courier operations, weather, public holidays, remote locations,
          address-related issues, or circumstances outside our reasonable
          control.
        </p>

        <p>
          Once an order has been handed over to the shipping provider, tracking
          information may be provided where available.
        </p>

        <p>
          For detailed information about delivery charges and timelines, please
          refer to our{" "}
          <Link to="/shipping-policy">Shipping Policy</Link>.
        </p>
      </>
    ),
  },

  {
    id: "returns-refunds",
    number: "09",
    title: "Returns, Exchanges & Refunds",
    content: (
      <>
        <p>
          Returns, exchanges, and refunds are subject to our applicable Return
          & Refund Policy.
        </p>

        <p>
          Eligibility may depend on the product, condition of the item, return
          request period, and other conditions specified in our policy.
        </p>

        <p>
          Products may be required to be returned in their original condition,
          with applicable tags, packaging, and accessories intact.
        </p>

        <p>
          Please review our{" "}
          <Link to="/return-policy">Return & Refund Policy</Link> before
          submitting a return request.
        </p>
      </>
    ),
  },

  {
    id: "promotions",
    number: "10",
    title: "Promotions & Offers",
    content: (
      <>
        <p>
          STYQLO may occasionally provide discounts, promotional offers,
          coupon codes, campaigns, or other promotional programs.
        </p>

        <p>
          Individual promotions may have additional terms, eligibility
          requirements, validity periods, usage limits, or exclusions.
        </p>

        <p>
          We reserve the right to modify, suspend, or withdraw a promotional
          offer where reasonably necessary, subject to applicable law.
        </p>
      </>
    ),
  },

  {
    id: "intellectual-property",
    number: "11",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          The STYQLO website and its original content, including brand
          elements, logos, graphics, photographs, product imagery, designs,
          text, layout, features, and functionality, are owned by or licensed
          to <strong>Mahananda Kart</strong> and are protected by applicable
          intellectual property laws.
        </p>

        <p>
          You may access and use the website for personal and lawful shopping
          purposes only.
        </p>

        <p>
          You may not reproduce, copy, modify, distribute, sell, republish,
          transmit, or commercially exploit STYQLO content without prior
          written permission.
        </p>
      </>
    ),
  },

  {
    id: "prohibited-use",
    number: "12",
    title: "Prohibited Uses",
    content: (
      <>
        <p>
          You agree to use STYQLO only for lawful purposes and in accordance
          with these Terms.
        </p>

        <p>You must not:</p>

        <ul>
          <li>Use the website for unlawful or fraudulent purposes</li>
          <li>Impersonate STYQLO, Mahananda Kart, or another person</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the operation or security of the website</li>
          <li>Introduce viruses, malware, or other harmful code</li>
          <li>Use automated tools to scrape or copy website content</li>
          <li>Manipulate orders, prices, reviews, or promotions</li>
          <li>Use another person's account without authorization</li>
        </ul>
      </>
    ),
  },

  {
    id: "third-party-services",
    number: "13",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          STYQLO may use third-party services for payment processing, shipping,
          hosting, analytics, communication, security, and other operational
          purposes.
        </p>

        <p>
          Third-party services operate under their own terms and policies.
          STYQLO does not control and is not responsible for the independent
          policies, availability, security, or practices of third-party
          services.
        </p>
      </>
    ),
  },

  {
    id: "availability",
    number: "14",
    title: "Website Availability",
    content: (
      <>
        <p>
          We aim to keep STYQLO available and functioning reliably, but we do
          not guarantee that the website will always be available,
          uninterrupted, error-free, or completely secure.
        </p>

        <p>
          We may temporarily suspend, modify, restrict, or discontinue parts of
          the website for maintenance, updates, security, technical issues, or
          other operational reasons.
        </p>
      </>
    ),
  },

  {
    id: "disclaimer",
    number: "15",
    title: "Disclaimer",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, STYQLO and
          Mahananda Kart provide the website and its services on an
          "as available" and "as is" basis.
        </p>

        <p>
          We do not guarantee that all information, content, features, or
          services will always be complete, accurate, uninterrupted, or
          error-free.
        </p>
      </>
    ),
  },

  {
    id: "liability",
    number: "16",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, STYQLO and
          Mahananda Kart will not be liable for indirect, incidental, special,
          consequential, or punitive losses arising from your use of the
          website or services.
        </p>

        <p>
          Nothing in these Terms is intended to exclude or limit liability that
          cannot lawfully be excluded or limited under applicable law.
        </p>
      </>
    ),
  },

  {
    id: "termination",
    number: "17",
    title: "Suspension & Termination",
    content: (
      <>
        <p>
          We may suspend or terminate access to your account or parts of our
          services where reasonably necessary, including in cases involving
          fraud, abuse, unlawful activity, security concerns, or violation of
          these Terms.
        </p>

        <p>
          You may stop using STYQLO at any time. Provisions that by their nature
          should survive termination will continue to apply.
        </p>
      </>
    ),
  },

  {
    id: "governing-law",
    number: "18",
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms shall be governed by and interpreted in accordance with
          the laws of <strong>India</strong>, subject to applicable mandatory
          consumer protection and other laws.
        </p>

        <p>
          Any dispute arising in connection with these Terms or your use of
          STYQLO shall be subject to the jurisdiction of the competent courts
          as applicable under Indian law.
        </p>
      </>
    ),
  },

  {
    id: "changes",
    number: "19",
    title: "Changes to These Terms",
    content: (
      <>
        <p>
          We may update these Terms from time to time to reflect changes to
          our services, business practices, or applicable legal requirements.
        </p>

        <p>
          Updated Terms will be posted on this page with a revised "Last
          updated" date.
        </p>

        <p>
          Your continued use of STYQLO after updated Terms become effective
          constitutes acceptance of the revised Terms, to the extent permitted
          by applicable law.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    number: "20",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have any questions, concerns, complaints, or requests
          regarding these Terms, please contact us.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-primary-lighter p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-rose-dark">
            Legal & Support Contact
          </p>

          <p className="text-lg font-semibold text-foreground">
            Mahananda Kart
          </p>

          <button
            onClick={handleMail}
            className="mt-2 inline-block text-muted-foreground transition-colors hover:text-primary"
          >
            {import.meta.env.VITE_EMAIL}
          </button>
        </div>
      </>
    ),
  },
];

const TermsPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-luxury">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-rose-dark">
              STYQLO · Legal
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Terms & Conditions
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Please read these terms carefully before using STYQLO or placing
              an order with us.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur">
                Last updated: August 27, 2026
              </span>

              <span className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
                Mahananda Kart
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">

          {/* Table of Contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-luxury p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
                Contents
              </p>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="group flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-primary-lighter hover:text-foreground"
                  >
                    <span className="pt-0.5 text-[10px] font-bold text-primary">
                      {section.number}
                    </span>

                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Terms Content */}
          <article className="min-w-0">
            <div className="card-luxury overflow-hidden">
              <div className="p-6 sm:p-10 lg:p-12">

                {/* Notice */}
                <div className="mb-10 rounded-2xl border border-border bg-primary-lighter/60 p-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    These Terms & Conditions govern your use of STYQLO and
                    purchases made through our website. By using our website,
                    you agree to comply with these Terms.
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24 py-10 first:pt-0 last:pb-0"
                    >
                      <div className="mb-5 flex items-center gap-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-lighter text-xs font-bold text-rose-dark">
                          {section.number}
                        </span>

                        <h2 className="text-2xl font-semibold sm:text-3xl">
                          {section.title}
                        </h2>
                      </div>

                      <div className="policy-content pl-0 text-[15px] leading-8 text-muted-foreground sm:pl-[52px]">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Acknowledgement */}
                <div className="mt-12 rounded-2xl border border-border bg-luxury p-6 sm:p-8">
                  <p className="text-sm leading-7 text-muted-foreground">
                    By accessing or using STYQLO, you acknowledge that you have
                    read these Terms & Conditions and agree to be bound by
                    them.
                  </p>

                  <p className="mt-4 text-sm font-semibold text-foreground">
                    STYQLO
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Operated by Mahananda Kart
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                ← Back to STYQLO
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default TermsPage;