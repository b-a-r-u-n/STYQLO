import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const faqCategories = [
  "All",
  "Orders",
  "Payments",
  "Shipping",
  "Returns & Refunds",
  "Exchanges",
  "Products & Sizes",
  "Account",
  "Cash on Delivery",
  "Customer Support",
];

const faqs = [
  // Orders
  {
    category: "Orders",
    question: "Can I cancel my order after placing it?",
    answer: (
      <p>
        No. Once an order has been placed, it{" "}
        <strong>cannot be cancelled</strong>.
        <br />
        <br />
        Please carefully review your products, sizes, shipping address, and
        order details before completing your purchase.
      </p>
    ),
  },
  {
    category: "Orders",
    question: "Can I modify my order after placing it?",
    answer: (
      <p>
        No. Once an order has been placed, changes to products, sizes,
        quantities, or other order details are not available.
        <br />
        <br />
        Please review your order carefully before placing it.
      </p>
    ),
  },
  {
    category: "Orders",
    question: "Can I place an order without creating an account?",
    answer: (
      <p>
        No. A <strong>STYQLO account is required</strong> to place an order.
        Creating an account also allows you to conveniently access your order
        information and track your purchases.
      </p>
    ),
  },
  {
    category: "Orders",
    question: "How can I check my order status?",
    answer: (
      <p>
        You can log in to your STYQLO account and view your order information
        and status.
        <br />
        <br />
        Once your order has been dispatched, tracking information will also be
        provided so you can track your shipment.
      </p>
    ),
  },

  // Payments
  {
    category: "Payments",
    question: "What payment methods does STYQLO accept?",
    answer: (
      <>
        <p>We currently accept:</p>
        <ul>
          <li>UPI</li>
          <li>Credit Cards</li>
          <li>Debit Cards</li>
          <li>Net Banking</li>
          <li>Cash on Delivery (COD)</li>
        </ul>
      </>
    ),
  },
  {
    category: "Payments",
    question: "Is Cash on Delivery (COD) available?",
    answer: (
      <p>
        Yes. <strong>Cash on Delivery is available</strong> for eligible
        orders and delivery locations.
        <br />
        <br />
        COD availability may depend on courier service availability and the
        delivery address.
      </p>
    ),
  },
  {
    category: "Payments",
    question: "Is there an additional COD fee?",
    answer: (
      <p>
        No. STYQLO currently <strong>does not charge an additional COD fee</strong>.
      </p>
    ),
  },
  {
    category: "Payments",
    question:
      "What should I do if money is deducted but my order shows failed or pending?",
    answer: (
      <p>
        If money has been deducted from your account but your STYQLO order
        shows <strong>Failed</strong> or <strong>Pending</strong>, please
        contact us.
        <br />
        <br />
        Provide your order details and payment information so our team can
        check the payment status and assist you.
      </p>
    ),
  },

  // Shipping
  {
    category: "Shipping",
    question: "Does STYQLO offer free shipping?",
    answer: (
      <p>
        Yes! <strong>Free shipping is available on all orders.</strong>
      </p>
    ),
  },
  {
    category: "Shipping",
    question: "Where does STYQLO deliver?",
    answer: (
      <p>
        STYQLO delivers <strong>across India</strong>, subject to courier
        service availability at the delivery location.
      </p>
    ),
  },
  {
    category: "Shipping",
    question: "How long does delivery take?",
    answer: (
      <p>
        Orders generally take approximately{" "}
        <strong>3–7 business days</strong> to be delivered after dispatch.
        <br />
        <br />
        Delivery times may vary depending on your location, courier
        operations, weather, holidays, or other circumstances beyond our
        control.
      </p>
    ),
  },
  {
    category: "Shipping",
    question: "How can I track my order?",
    answer: (
      <p>
        Yes. You can track your order through your STYQLO account.
        <br />
        <br />
        Once your order has been <strong>dispatched</strong>, tracking
        information will become available.
      </p>
    ),
  },
  {
    category: "Shipping",
    question: "Which courier service does STYQLO use?",
    answer: (
      <p>
        STYQLO uses <strong>Shiprocket</strong> to manage shipping and courier
        services.
        <br />
        <br />
        Your shipment may be assigned to an appropriate courier partner based
        on factors such as delivery location and availability.
      </p>
    ),
  },

  // Returns
  {
    category: "Returns & Refunds",
    question: "Can I return a product?",
    answer: (
      <>
        <p>
          Yes. STYQLO accepts eligible returns within{" "}
          <strong>7 days of delivery</strong>.
        </p>

        <ul>
          <li>Unworn and unused.</li>
          <li>Unwashed.</li>
          <li>In its original condition.</li>
          <li>With original tags attached.</li>
          <li>With original packaging where applicable.</li>
        </ul>

        <p className="mt-4">
          Please review our{" "}
          <Link
            to="/return-policy"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Return & Refund Policy
          </Link>{" "}
          for complete details.
        </p>
      </>
    ),
  },
  {
    category: "Returns & Refunds",
    question: "How do I return a product?",
    answer: (
      <p>
        You can initiate an eligible return{" "}
        <strong>directly through your STYQLO account/order page</strong>.
        <br />
        <br />
        Select the relevant order and follow the available return
        instructions. Our team may request additional information depending
        on the reason for the return.
      </p>
    ),
  },
  {
    category: "Returns & Refunds",
    question: "Can I return a product if I change my mind?",
    answer: (
      <p>
        Yes. STYQLO accepts eligible returns if you{" "}
        <strong>change your mind</strong>, provided the product meets the
        return conditions and the request is made within 7 days of delivery.
      </p>
    ),
  },
  {
    category: "Returns & Refunds",
    question: "What if I receive the wrong or damaged product?",
    answer: (
      <p>
        If you receive a wrong, damaged, or defective product, please contact
        STYQLO <strong>within 2 days of delivery</strong>.
        <br />
        <br />
        You may be asked to provide clear photographs and/or an{" "}
        <strong>unboxing video</strong> to help us verify the issue.
        <br />
        <br />
        For eligible cases, STYQLO will handle the applicable return
        shipping.
      </p>
    ),
  },
  {
    category: "Returns & Refunds",
    question: "Do I need an unboxing video?",
    answer: (
      <p>
        For wrong, damaged, or defective product claims, an{" "}
        <strong>unboxing video is required</strong>.
        <br />
        <br />
        We strongly recommend recording the package opening from the
        beginning so that the product and packaging can be clearly seen.
      </p>
    ),
  },
  {
    category: "Returns & Refunds",
    question: "When will I receive my refund?",
    answer: (
      <p>
        Once the returned product has been received and approved after
        inspection, the refund will generally be processed within{" "}
        <strong>2–6 business days</strong>.
        <br />
        <br />
        The actual time for the amount to appear in your account may depend
        on your bank or payment provider.
      </p>
    ),
  },
  {
    category: "Returns & Refunds",
    question: "Where will my refund be credited?",
    answer: (
      <p>
        Refunds for prepaid orders are generally issued to the{" "}
        <strong>original payment method</strong>.
        <br />
        <br />
        Eligible COD refunds are processed through <strong>bank transfer</strong>{" "}
        or <strong>UPI</strong>.
      </p>
    ),
  },
  {
    category: "Returns & Refunds",
    question: "Are shipping charges refundable?",
    answer: (
      <p>
        No. Original shipping charges are{" "}
        <strong>generally non-refundable</strong>.
        <br />
        <br />
        Exceptions may apply in eligible cases involving wrong, damaged, or
        defective products.
      </p>
    ),
  },

  // Exchanges
  {
    category: "Exchanges",
    question: "Can I exchange a product?",
    answer: (
      <>
        <p>
          Yes. STYQLO offers eligible exchanges within{" "}
          <strong>7 days of delivery</strong>.
        </p>

        <p className="mt-4">You may request an exchange for:</p>

        <ul>
          <li>A different size.</li>
          <li>A different color.</li>
          <li>Another eligible product, subject to availability.</li>
        </ul>
      </>
    ),
  },
  {
    category: "Exchanges",
    question: "What if my preferred replacement is unavailable?",
    answer: (
      <p>
        If the requested replacement is unavailable, an eligible{" "}
        <strong>refund</strong> may be offered instead.
      </p>
    ),
  },
  {
    category: "Exchanges",
    question: "Can I exchange a product because the size doesn't fit?",
    answer: (
      <p>
        Yes. Eligible <strong>size exchanges</strong> are available within 7
        days of delivery, subject to the product meeting our
        return/exchange conditions.
      </p>
    ),
  },

  // Products & Sizes
  {
    category: "Products & Sizes",
    question: "What sizes does STYQLO offer?",
    answer: (
      <p>
        Our current standard sizes are:
        <br />
        <br />
        <strong>S, M, L, XL, and XXL.</strong>
      </p>
    ),
  },
  {
    category: "Products & Sizes",
    question: "How do I choose the right size?",
    answer: (
      <p>
        We recommend checking the{" "}
        <Link
          to="/size-guide"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          STYQLO Size Guide
        </Link>{" "}
        before placing your order.
        <br />
        <br />
        Compare your measurements with the measurements provided in the size
        guide to select the most suitable size.
      </p>
    ),
  },
  {
    category: "Products & Sizes",
    question: "What if I am between two sizes?",
    answer: (
      <>
        <p>If you are between two sizes:</p>

        <ul>
          <li>
            Choose the <strong>smaller size</strong> for a closer fit.
          </li>
          <li>
            Choose the <strong>larger size</strong> for a more relaxed fit.
          </li>
        </ul>

        <p className="mt-4">
          If you prefer a looser fit, choosing one size larger may be more
          suitable.
        </p>
      </>
    ),
  },
  {
    category: "Products & Sizes",
    question: "What fit do STYQLO products have?",
    answer: (
      <p>
        Our standard sizing is based on a <strong>regular fit</strong>.
        <br />
        <br />
        However, always check the individual product information and size
        guide before ordering.
      </p>
    ),
  },

  // Account
  {
    category: "Account",
    question: "Do I need an account to shop on STYQLO?",
    answer: (
      <p>
        Yes. You need a <strong>STYQLO account</strong> to place an order.
      </p>
    ),
  },
  {
    category: "Account",
    question: "Can I track my orders from my account?",
    answer: (
      <p>
        Yes. Your STYQLO account allows you to access your order information
        and track your purchases.
      </p>
    ),
  },
  {
    category: "Account",
    question: "I forgot my password. What should I do?",
    answer: (
      <p>
        If you are unable to access your account or have forgotten your
        password, please contact STYQLO customer support for assistance.
      </p>
    ),
  },

  // COD
  {
    category: "Cash on Delivery",
    question: "Does STYQLO offer COD?",
    answer: (
      <p>
        Yes. Cash on Delivery is available for{" "}
        <strong>eligible orders and delivery locations</strong>.
      </p>
    ),
  },
  {
    category: "Cash on Delivery",
    question: "Why isn't COD available for my order?",
    answer: (
      <>
        <p>COD availability may depend on factors such as:</p>

        <ul>
          <li>Delivery location.</li>
          <li>Courier availability.</li>
          <li>Order eligibility.</li>
          <li>Other operational conditions.</li>
        </ul>

        <p className="mt-4">
          If COD is unavailable at checkout, you can use one of our available
          online payment methods.
        </p>
      </>
    ),
  },
  {
    category: "Cash on Delivery",
    question: "Is there a COD charge?",
    answer: (
      <p>
        No. STYQLO currently <strong>does not charge an additional COD fee</strong>.
      </p>
    ),
  },

  // Customer Support
  {
    category: "Customer Support",
    question: "How can I contact STYQLO?",
    answer: (
      <>
        <p>You can contact us through:</p>

        <div className="mt-4 space-y-2">
          <p>
            <strong>Phone / WhatsApp:</strong>{" "}
            <a
              href="tel:+918047895089"
              className="text-primary hover:underline"
            >
              +91 8047895089
            </a>
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:mahanandakart@gmail.com"
              className="text-primary hover:underline"
            >
              mahanandakart@gmail.com
            </a>
          </p>
        </div>

        <p className="mt-5">Our support team can help with:</p>

        <ul>
          <li>Orders</li>
          <li>Payments</li>
          <li>Shipping</li>
          <li>Returns</li>
          <li>Refunds</li>
          <li>Exchanges</li>
          <li>Product questions</li>
          <li>Size assistance</li>
          <li>General enquiries</li>
        </ul>
      </>
    ),
  },
  {
    category: "Customer Support",
    question: "What are STYQLO's support hours?",
    answer: (
      <div className="space-y-2">
        <p>
          <strong>Monday – Saturday:</strong>
          <br />
          10:00 AM – 10:00 PM
        </p>

        <p>
          <strong>Sunday & Public Holidays:</strong>
          <br />
          Limited support may be available.
        </p>
      </div>
    ),
  },
  {
    category: "Customer Support",
    question: "How quickly will STYQLO respond?",
    answer: (
      <p>
        We aim to respond to customer enquiries within{" "}
        <strong>1–2 business days</strong>.
      </p>
    ),
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
        isOpen
          ? "border-primary/40 shadow-soft"
          : "border-border shadow-card hover:border-primary/30"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7 sm:py-6"
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-semibold leading-6 sm:text-base">
          {faq.question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-lighter text-lg text-rose-dark transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border px-5 pb-6 pt-5 text-sm leading-7 text-muted-foreground sm:px-7">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryIcon({ category }) {
  const icons = {
    Orders: "⌁",
    Payments: "₹",
    Shipping: "↗",
    "Returns & Refunds": "↩",
    Exchanges: "⇄",
    "Products & Sizes": "◇",
    Account: "♙",
    "Cash on Delivery": "▣",
    "Customer Support": "?",
  };

  return (
    <span className="text-base font-bold">
      {icons[category] || "•"}
    </span>
  );
}

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const groupedFaqs = useMemo(() => {
    if (activeCategory !== "All" || searchQuery.trim()) {
      return [
        {
          category: activeCategory === "All" ? "Search Results" : activeCategory,
          items: filteredFaqs,
        },
      ];
    }

    return faqCategories
      .filter((category) => category !== "All")
      .map((category) => ({
        category,
        items: faqs.filter((faq) => faq.category === category),
      }));
  }, [activeCategory, searchQuery, filteredFaqs]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenIndex(null);
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-rose-dark">
              STYQLO Support
            </p>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              Everything You
              <span className="block text-gradient">
                Need to Know.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Find answers to common questions about orders, payments,
              shipping, returns, exchanges, products, sizes, and more.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-10 max-w-2xl">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-muted-foreground">
                ⌕
              </span>

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenIndex(null);
                }}
                placeholder="Search your question..."
                className="h-14 w-full rounded-full border border-border bg-white/80 pl-12 pr-12 text-sm outline-none backdrop-blur transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-lg text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORY NAVIGATION
      ========================================================= */}
      <section className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {faqCategories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-foreground text-white shadow-card"
                      : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {category !== "All" && (
                    <CategoryIcon category={category} />
                  )}

                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ CONTENT
      ========================================================= */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        {groupedFaqs.map((group) => (
          <div key={group.category} className="mb-16 last:mb-0">
            <div className="mb-7">
              {group.category !== "Search Results" && (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
                  {group.category}
                </p>
              )}

              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                {group.category}
              </h2>
            </div>

            {group.items.length > 0 ? (
              <div className="space-y-3">
                {group.items.map((faq, index) => {
                  const uniqueIndex = `${group.category}-${index}`;

                  return (
                    <FAQItem
                      key={uniqueIndex}
                      faq={faq}
                      isOpen={openIndex === uniqueIndex}
                      onToggle={() =>
                        setOpenIndex(
                          openIndex === uniqueIndex ? null : uniqueIndex
                        )
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-lighter text-xl text-rose-dark">
                  ?
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  No questions found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                  We couldn't find a question matching your search. Try
                  different keywords or contact our support team.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-luxury"
                >
                  View All FAQs
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* =========================================================
          QUICK LINKS
      ========================================================= */}
      <section className="border-y border-border bg-luxury">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-rose-dark">
              Helpful Resources
            </p>

            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Looking for More Information?
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <Link
              to="/size-guide"
              className="group rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-lg text-rose-dark">
                  ◇
                </span>

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Size Guide
              </h3>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Find the right size and compare your measurements before
                placing your order.
              </p>
            </Link>

            <Link
              to="/return-policy"
              className="group rounded-3xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-lighter text-lg text-rose-dark">
                  ↩
                </span>

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Return & Refund Policy
              </h3>

              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Learn about eligible returns, exchanges, refunds, and
                applicable conditions.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT CTA
      ========================================================= */}
      <section className="bg-luxury-hero">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-light">
              Still Have Questions?
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              We're Happy to Help.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-white/65">
              Couldn't find the answer you're looking for? Get in touch
              with the STYQLO support team and we'll be happy to assist you.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/918047895089"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-1 hover:shadow-luxury"
              >
                Chat on WhatsApp
              </a>

              <a
                href="mailto:mahanandakart@gmail.com"
                className="rounded-full border border-white/15 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15"
              >
                Email Us
              </a>
            </div>

            <div className="mt-8 space-y-1 text-sm text-white/60">
              <p>+91 8047895089</p>
              <p>mahanandakart@gmail.com</p>
              <p>Monday – Saturday · 10:00 AM – 10:00 PM</p>
            </div>
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
            Your questions answered. Your shopping experience made simpler.
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
}

export default FAQPage;