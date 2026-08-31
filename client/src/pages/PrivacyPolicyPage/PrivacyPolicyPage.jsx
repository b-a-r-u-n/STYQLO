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
          This Privacy Policy explains how we collect, use, store, protect,
          and disclose information when you visit or use our website,
          <strong> styqlo.com</strong>, place an order, create an account,
          contact us, or otherwise interact with our services.
        </p>

        <p>
          By using STYQLO, you acknowledge that you have read and understood
          this Privacy Policy. If you do not agree with this policy, please
          discontinue use of our website.
        </p>
      </>
    ),
  },

  {
    id: "information-we-collect",
    number: "02",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect information that is necessary to provide our services,
          process orders, communicate with customers, and improve your
          shopping experience.
        </p>

        <h3>Personal Information</h3>

        <p>Depending on how you use our website, we may collect:</p>

        <ul>
          <li>First name and last name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing and shipping address</li>
          <li>City, state, country, and postal/PIN code</li>
          <li>Account login information</li>
          <li>Order and purchase information</li>
          <li>Information you provide when contacting customer support</li>
        </ul>

        <h3>Order Information</h3>

        <p>
          When you place an order, we may collect information such as the
          products purchased, selected sizes, quantities, order amount,
          shipping details, order status, and payment-related references
          necessary to process and fulfill your order.
        </p>

        <h3>Technical and Usage Information</h3>

        <p>
          We may automatically receive certain technical information when you
          use our website, including IP address, browser type, device
          information, pages visited, approximate usage information, and
          diagnostic information.
        </p>
      </>
    ),
  },

  {
    id: "how-we-use-information",
    number: "03",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We may use collected information to:</p>

        <ul>
          <li>Create and manage your customer account</li>
          <li>Process and fulfill your orders</li>
          <li>Process payments and payment confirmations</li>
          <li>Arrange shipping and delivery</li>
          <li>Process returns, refunds, and exchanges</li>
          <li>Provide customer support</li>
          <li>Send order and account-related communications</li>
          <li>Improve our website, products, and services</li>
          <li>Detect and prevent fraud, abuse, and security issues</li>
          <li>Maintain the security and functionality of our services</li>
          <li>Comply with applicable legal and regulatory requirements</li>
          <li>Send promotional communications where permitted and appropriate</li>
        </ul>

        <p>
          You may opt out of promotional communications by using the
          unsubscribe option provided in those communications or by contacting
          us.
        </p>
      </>
    ),
  },

  {
    id: "payments",
    number: "04",
    title: "Payments",
    content: (
      <>
        <p>
          Payments made through STYQLO may be processed by third-party payment
          service providers.
        </p>

        <p>
          STYQLO does not intend to store your complete debit card, credit
          card, or other sensitive payment credentials on its own systems.
          Payment information may be collected and processed directly by the
          relevant payment provider according to its own privacy and security
          practices.
        </p>

        <p>
          We may retain payment-related references, transaction identifiers,
          payment status, and other information necessary for order
          reconciliation, customer support, refunds, fraud prevention, and
          legal or accounting purposes.
        </p>
      </>
    ),
  },

  {
    id: "shipping-and-service-providers",
    number: "05",
    title: "Shipping & Service Providers",
    content: (
      <>
        <p>
          To provide our services, we may share necessary information with
          trusted third-party service providers that perform services on our
          behalf.
        </p>

        <p>These may include providers involved in:</p>

        <ul>
          <li>Payment processing</li>
          <li>Shipping and delivery</li>
          <li>Website hosting and infrastructure</li>
          <li>Cloud storage and media services</li>
          <li>Email and communication services</li>
          <li>Analytics and website performance</li>
          <li>Security and fraud prevention</li>
        </ul>

        <p>
          Such providers should receive only the information reasonably
          necessary to perform the services for which they are engaged.
        </p>
      </>
    ),
  },

  {
    id: "cookies",
    number: "06",
    title: "Cookies & Similar Technologies",
    content: (
      <>
        <p>
          STYQLO may use cookies and similar technologies to operate the
          website, remember preferences, maintain sessions, improve
          functionality, and understand how visitors use our services.
        </p>

        <h3>Types of Cookies</h3>

        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for core website
            functionality.
          </li>

          <li>
            <strong>Preference Cookies:</strong> Used to remember preferences
            and settings.
          </li>

          <li>
            <strong>Security Cookies:</strong> Used to help protect accounts
            and transactions.
          </li>

          <li>
            <strong>Analytics Cookies:</strong> May be used to understand
            website usage and improve our services.
          </li>
        </ul>

        <p>
          You can manage or disable cookies through your browser settings.
          Disabling certain cookies may affect some functionality of the
          website.
        </p>
      </>
    ),
  },

  {
    id: "data-sharing",
    number: "07",
    title: "When We Share Information",
    content: (
      <>
        <p>
          We do not sell your personal information as a standalone commercial
          product.
        </p>

        <p>
          We may share information when reasonably necessary to operate STYQLO,
          including with service providers, payment processors, shipping
          partners, professional advisers, or authorities where required by
          applicable law.
        </p>

        <p>
          We may also disclose information when necessary to protect the
          rights, property, security, or safety of STYQLO, Mahananda Kart, our
          customers, or others.
        </p>
      </>
    ),
  },

  {
    id: "data-security",
    number: "08",
    title: "Data Security",
    content: (
      <>
        <p>
          We take reasonable measures to protect your personal information
          against unauthorized access, alteration, disclosure, misuse, or
          destruction.
        </p>

        <p>
          However, no method of transmission over the Internet or method of
          electronic storage can be guaranteed to be completely secure.
          Therefore, while we work to protect your information, we cannot
          guarantee absolute security.
        </p>
      </>
    ),
  },

  {
    id: "data-retention",
    number: "09",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as reasonably
          necessary for the purposes described in this Privacy Policy.
        </p>

        <p>
          We may retain certain information for longer periods where required
          or permitted by applicable law, for accounting and tax requirements,
          dispute resolution, fraud prevention, security, or enforcement of
          our agreements.
        </p>
      </>
    ),
  },

  {
    id: "your-rights",
    number: "10",
    title: "Your Privacy Rights",
    content: (
      <>
        <p>
          Depending on applicable law, you may have rights regarding your
          personal information, including the ability to:
        </p>

        <ul>
          <li>Request access to personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of certain personal information</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Object to or request restriction of certain processing</li>
          <li>Opt out of promotional communications</li>
        </ul>

        <p>
          Some information may need to be retained where we are legally
          required or permitted to do so.
        </p>

        <p>
          To make a privacy-related request, contact us using the details
          provided in the <strong>Contact Us</strong> section below.
        </p>
      </>
    ),
  },

  {
    id: "third-party-links",
    number: "11",
    title: "Third-Party Links",
    content: (
      <>
        <p>
          Our website may contain links to third-party websites, services, or
          platforms.
        </p>

        <p>
          These third parties operate independently and may have their own
          privacy policies and terms. STYQLO is not responsible for the privacy
          practices, security, or content of third-party websites.
        </p>

        <p>
          We recommend reviewing the privacy policy of any third-party service
          before providing personal information to it.
        </p>
      </>
    ),
  },

  {
    id: "children",
    number: "12",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          STYQLO is an online retail service and is not intended to knowingly
          collect personal information from children where such collection is
          prohibited by applicable law.
        </p>

        <p>
          If you believe that a child has provided personal information to us
          without appropriate authorization, please contact us so that we can
          review and take appropriate action.
        </p>
      </>
    ),
  },

  {
    id: "changes",
    number: "13",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect
          changes to our services, business practices, technology, or
          applicable legal requirements.
        </p>

        <p>
          When we make changes, we will update the effective date displayed at
          the top of this page. We encourage you to review this page
          periodically.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    number: "14",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or the way we handle your personal information, please
          contact us.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-primary-lighter p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-rose-dark">
            Privacy Contact
          </p>

          <p className="text-lg font-semibold text-foreground">
            Mahananda Kart
          </p>

          <button
          onClick={handleMail}
            className="mt-2 inline-block text-muted-foreground transition-colors hover:text-primary cursor-pointer"
          >
            {import.meta.env.VITE_EMAIL}
          </button>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-luxury relative overflow-hidden border-b border-border">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-rose-dark">
              STYQLO · Legal
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Your privacy matters to us. Learn how STYQLO collects, uses,
              protects, and handles your information when you shop with us.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur">
                Effective: August 27, 2026
              </span>

              <span className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
                Operated by Mahananda Kart
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

          {/* Policy */}
          <article className="min-w-0">
            <div className="card-luxury overflow-hidden">
              <div className="p-6 sm:p-10 lg:p-12">
                <div className="mb-10 rounded-2xl border border-border bg-primary-lighter/60 p-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    This Privacy Policy applies to your use of the STYQLO
                    website and related shopping services. Please read it
                    carefully before using our services.
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

                {/* Final note */}
                <div className="mt-12 rounded-2xl border border-border bg-luxury p-6 sm:p-8">
                  <p className="text-sm leading-7 text-muted-foreground">
                    By continuing to use STYQLO, you acknowledge this Privacy
                    Policy and understand how your information may be handled
                    as described above.
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

            {/* Back */}
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