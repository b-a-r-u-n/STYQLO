import React from 'react'
import { Link } from "react-router-dom";

const sections = [
  {
    id: "return-window",
    number: "01",
    title: "Return & Exchange Window",
    content: (
      <>
        <p>
          You may request a return or exchange within{" "}
          <strong>7 days from the date of delivery</strong>.
        </p>

        <p>To be eligible, the product must be:</p>

        <ul>
          <li>Unworn and unused.</li>
          <li>
            Unwashed and free from any stains, odors, or signs of use.
          </li>
          <li>Returned with all original tags and labels attached.</li>
          <li>Returned in its original packaging, wherever applicable.</li>
          <li>In the same condition in which you received it.</li>
        </ul>

        <p>
          STYQLO reserves the right to reject a return if the product does not
          meet these conditions.
        </p>
      </>
    ),
  },

  {
    id: "change-of-mind",
    number: "02",
    title: "Change of Mind & Size Issues",
    content: (
      <>
        <p>We accept returns if you:</p>

        <ul>
          <li>Change your mind about the purchase.</li>
          <li>Ordered the wrong size.</li>
          <li>Find that the size or fit is not suitable.</li>
        </ul>

        <p>
          You may also request an exchange for a different{" "}
          <strong>size or color/product</strong>, subject to availability.
        </p>

        <p>
          Exchange requests must be made within{" "}
          <strong>7 days of delivery</strong>.
        </p>

        <p>
          If the requested replacement is unavailable, you may choose to
          receive an eligible refund instead.
        </p>
      </>
    ),
  },

  {
    id: "wrong-damaged-defective",
    number: "03",
    title: "Wrong, Damaged or Defective Products",
    content: (
      <>
        <p>If you receive:</p>

        <ul>
          <li>A wrong product.</li>
          <li>A different size or color than what you ordered.</li>
          <li>A damaged product.</li>
          <li>A defective product.</li>
          <li>A product with a significant manufacturing defect.</li>
        </ul>

        <p>
          Please contact STYQLO within{" "}
          <strong>2 days of delivery</strong>.
        </p>

        <p>
          For wrong, damaged, or defective products, you must provide clear
          photographs and/or an <strong>unboxing video</strong> showing the
          issue and the product/package received.
        </p>

        <div className="my-6 rounded-2xl border border-border bg-primary-lighter/60 p-5">
          <p className="text-sm leading-7 text-foreground">
            <strong>Important:</strong> An unboxing video is particularly
            helpful for verifying damage, missing items, or incorrect products.
          </p>
        </div>

        <p>
          If the issue is verified, STYQLO will arrange an appropriate
          resolution, which may include a replacement or refund.
        </p>

        <p>
          For eligible wrong, damaged, or defective products,{" "}
          <strong>STYQLO will bear the applicable return shipping cost.</strong>
        </p>
      </>
    ),
  },

  {
    id: "return-shipping",
    number: "04",
    title: "Return Shipping Charges",
    content: (
      <>
        <p>
          Return shipping responsibility depends on the reason for the return.
        </p>

        <h3 className="mt-7 text-lg font-semibold text-foreground">
          If the return is due to STYQLO
        </h3>

        <p>For example:</p>

        <ul>
          <li>Wrong product received.</li>
          <li>Damaged product received.</li>
          <li>Defective product received.</li>
          <li>Incorrect size/color sent by STYQLO.</li>
        </ul>

        <div className="my-6 rounded-2xl border border-primary/30 bg-primary-lighter p-5">
          <p className="text-sm font-semibold leading-7 text-foreground">
            STYQLO will bear the applicable return shipping cost.
          </p>
        </div>

        <h3 className="mt-7 text-lg font-semibold text-foreground">
          If the return is due to the customer
        </h3>

        <p>For example:</p>

        <ul>
          <li>Change of mind.</li>
          <li>Ordered the wrong size.</li>
          <li>Size/fit is not suitable.</li>
          <li>Customer no longer wants the product.</li>
        </ul>

        <p>
          The customer may be responsible for the applicable return shipping
          cost.
        </p>

        <p>
          The applicable return shipping arrangement will be communicated when
          the return request is approved.
        </p>
      </>
    ),
  },

  {
    id: "request-return",
    number: "05",
    title: "How to Request a Return",
    content: (
      <>
        <p>To request a return or exchange:</p>

        <ol>
          <li>Contact STYQLO within the applicable return period.</li>
          <li>
            Provide your <strong>order number</strong> and the reason for the
            return/exchange.
          </li>
          <li>Provide photographs or other evidence when requested.</li>
          <li>Our team will review your request.</li>
          <li>
            If approved, we will provide instructions for returning the
            product.
          </li>
          <li>
            Pack the product securely with its original tags and packaging.
          </li>
          <li>
            Ship/hand over the package according to the return instructions
            provided by STYQLO.
          </li>
          <li>
            Once the returned product is received and inspected, we will
            process the applicable refund or exchange.
          </li>
        </ol>

        <div className="mt-6 rounded-2xl border border-border bg-primary-lighter/60 p-5">
          <p className="text-sm font-semibold leading-7 text-foreground">
            Do not send a product back to us without first contacting STYQLO
            and receiving return instructions.
          </p>
        </div>
      </>
    ),
  },

  {
    id: "inspection",
    number: "06",
    title: "Return Inspection",
    content: (
      <>
        <p>All returned products are subject to inspection.</p>

        <p>The inspection may verify:</p>

        <ul>
          <li>Product condition.</li>
          <li>Original tags and labels.</li>
          <li>Signs of wearing or washing.</li>
          <li>Damage caused after delivery.</li>
          <li>Original packaging.</li>
          <li>Whether the returned product matches the original order.</li>
        </ul>

        <p>
          If the returned product does not meet the return requirements, STYQLO
          may reject the return.
        </p>
      </>
    ),
  },

  {
    id: "refunds",
    number: "07",
    title: "Refunds",
    content: (
      <>
        <p>
          Once your returned product has been received and approved after
          inspection, the eligible refund will be processed.
        </p>

        <p>
          Refunds will generally be processed within{" "}
          <strong>2–6 business days</strong> after the return is approved.
        </p>

        <p>
          The refund will normally be issued to the{" "}
          <strong>original payment method</strong> used for the order.
        </p>

        <div className="my-6 overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="bg-luxury p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Online Payment
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Refund to the original payment method.
              </p>
            </div>

            <div className="bg-luxury p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                Eligible COD Refund
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Refund through bank transfer or UPI.
              </p>
            </div>
          </div>
        </div>

        <p>
          The time taken for the refunded amount to actually appear in your
          account may depend on your bank, payment provider, or financial
          institution.
        </p>
      </>
    ),
  },

  {
    id: "cod-refunds",
    number: "08",
    title: "Cash on Delivery (COD) Refunds",
    content: (
      <>
        <p>For eligible COD orders, refunds will be provided through:</p>

        <ul>
          <li>Bank transfer.</li>
          <li>UPI.</li>
        </ul>

        <p>
          Customers may be required to provide accurate bank account or UPI
          details for processing the refund.
        </p>

        <p>
          STYQLO is not responsible for delays or failures caused by incorrect
          bank or UPI information provided by the customer.
        </p>
      </>
    ),
  },

  {
    id: "shipping-charges",
    number: "09",
    title: "Shipping Charges",
    content: (
      <>
        <p>
          Original shipping charges paid for an order are{" "}
          <strong>generally non-refundable</strong>.
        </p>

        <p>
          However, where applicable under our return policy, such as in cases
          involving a wrong, damaged, or defective product received, STYQLO may
          provide an appropriate resolution.
        </p>
      </>
    ),
  },

  {
    id: "discounts-coupons",
    number: "10",
    title: "Discounts & Coupons",
    content: (
      <>
        <p>
          If no coupon or promotional discount was applied to the order, the
          eligible refund will be based on the amount actually paid for the
          returned product, subject to this policy.
        </p>

        <p>
          If a coupon, promotional offer, or discount was used, the refund may
          be adjusted according to the applicable terms of that promotion.
        </p>
      </>
    ),
  },

  {
    id: "non-returnable",
    number: "11",
    title: "Non-Returnable Situations",
    content: (
      <>
        <p>A return or exchange may be rejected where the product:</p>

        <ul>
          <li>Has been worn or used.</li>
          <li>Has been washed.</li>
          <li>Has stains, odors, or other signs of use.</li>
          <li>Has missing, removed, or damaged original tags.</li>
          <li>Has been intentionally damaged.</li>
          <li>Has been altered or modified by the customer.</li>
          <li>
            Is returned without the required accessories or packaging, where
            applicable.
          </li>
          <li>Is returned after the applicable return period.</li>
          <li>Does not match the product originally purchased.</li>
        </ul>
      </>
    ),
  },

  {
    id: "unsuccessful-delivery",
    number: "12",
    title: "Unsuccessful Delivery & Returned Parcels",
    content: (
      <>
        <p>
          If an order cannot be delivered and the courier returns the parcel to
          STYQLO, the parcel may be treated as a{" "}
          <strong>returned shipment</strong>.
        </p>

        <p>This may occur, for example, when:</p>

        <ul>
          <li>The customer refuses delivery.</li>
          <li>
            The customer provides an incorrect or incomplete address.
          </li>
          <li>
            The customer is repeatedly unavailable to receive the shipment.
          </li>
          <li>Delivery attempts are unsuccessful.</li>
        </ul>

        <p>
          Once the parcel is returned to STYQLO, we will review the order and
          contact the customer where appropriate.
        </p>

        <p>
          Any refund, re-shipment, or other resolution will be handled
          according to the circumstances of the order and this policy.
        </p>
      </>
    ),
  },

  {
    id: "exchanges",
    number: "13",
    title: "Exchanges",
    content: (
      <>
        <p>
          STYQLO offers exchanges within{" "}
          <strong>7 days of delivery</strong>, subject to product availability.
        </p>

        <p>Customers may request:</p>

        <ul>
          <li>A different size.</li>
          <li>A different color.</li>
          <li>Another eligible product, where applicable.</li>
        </ul>

        <p>
          If the requested replacement is unavailable, an eligible refund may
          be offered instead.
        </p>

        <p>
          The returned product must satisfy the same condition requirements
          described in this policy.
        </p>
      </>
    ),
  },

  {
    id: "multiple-products",
    number: "14",
    title: "Multiple Products in One Order",
    content: (
      <>
        <p>
          If your order contains multiple products, you may request a return
          or exchange for eligible individual products rather than necessarily
          returning the entire order.
        </p>

        <p>
          Each returned product must independently satisfy the return and
          inspection requirements.
        </p>
      </>
    ),
  },

  {
    id: "return-approval",
    number: "15",
    title: "Return Approval",
    content: (
      <>
        <p>
          Submitting a return request does not automatically mean that the
          return has been approved.
        </p>

        <p>
          STYQLO will review the request and may request additional
          information, photographs, videos, or other details before approving
          it.
        </p>

        <p>
          For damaged, defective, or wrong-product claims, STYQLO may verify
          the issue before arranging a return, replacement, or refund.
        </p>
      </>
    ),
  },

  {
    id: "fraudulent-returns",
    number: "16",
    title: "Fraudulent or Abusive Returns",
    content: (
      <>
        <p>
          STYQLO reserves the right to restrict, reject, or investigate return
          requests where we reasonably believe there is:
        </p>

        <ul>
          <li>Repeated abuse of the return policy.</li>
          <li>Intentional product damage.</li>
          <li>False or misleading claims.</li>
          <li>Product swapping.</li>
          <li>Fraudulent return activity.</li>
        </ul>

        <p>
          This does not affect your statutory rights under applicable law.
        </p>
      </>
    ),
  },

  {
    id: "consumer-rights",
    number: "17",
    title: "Your Consumer Rights",
    content: (
      <>
        <p>
          Nothing in this Return & Refund Policy is intended to exclude or
          limit any rights or remedies that you may have under applicable
          Indian consumer protection laws.
        </p>

        <p>
          Where applicable, statutory rights will continue to apply.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    number: "18",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have any questions about returns, exchanges, or refunds,
          please contact STYQLO.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-primary-lighter p-6">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-rose-dark">
            Return & Refund Support
          </p>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Brand</p>
              <p className="font-semibold text-foreground">STYQLO</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Business / GST Firm Name
              </p>
              <p className="font-semibold text-foreground">
                Mahananda Kart
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Email</p>

              <a
                href="mailto:mahanandakart@gmail.com"
                className="font-medium text-rose-dark transition-colors hover:text-primary"
              >
                mahanandakart@gmail.com
              </a>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Phone / WhatsApp
              </p>

              <a
                href="tel:+918047895089"
                className="font-medium text-rose-dark transition-colors hover:text-primary"
              >
                +91 8047895089
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-sm leading-7 text-muted-foreground">
              Please include your{" "}
              <strong className="text-foreground">order number</strong> when
              contacting us about a return, exchange, or refund so that we can
              assist you more quickly.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

const ReturnPolicyPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-luxury">
        {/* Decorative Background */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-rose-dark">
              STYQLO · Customer Care
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Return & Refund Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Our return, exchange, and refund guidelines to help make your
              STYQLO shopping experience simple and transparent.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur">
                Last updated: August 27, 2026
              </span>

              <span className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
                7-Day Returns
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
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

          {/* Policy Content */}
          <article className="min-w-0">
            <div className="card-luxury overflow-hidden">
              <div className="p-6 sm:p-10 lg:p-12">

                {/* Quick Return Summary */}
                <div className="mb-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-luxury p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                      Return Window
                    </p>

                    <p className="mt-2 text-2xl font-bold text-foreground">
                      7 Days
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      From delivery
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-luxury p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                      Damaged / Wrong
                    </p>

                    <p className="mt-2 text-2xl font-bold text-foreground">
                      2 Days
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      To report the issue
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-luxury p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-dark">
                      Refund Processing
                    </p>

                    <p className="mt-2 text-2xl font-bold text-foreground">
                      2–6 Days
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      After approval
                    </p>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="mb-10 rounded-2xl border border-border bg-primary-lighter/60 p-6">
                  <p className="text-sm leading-7 text-muted-foreground">
                    At <strong className="text-foreground">STYQLO</strong>,
                    operated by{" "}
                    <strong className="text-foreground">
                      Mahananda Kart
                    </strong>
                    , we want you to be happy with your purchase. If you
                    receive a product that isn't right for you, we offer
                    returns and exchanges in accordance with the terms below.
                  </p>
                </div>

                {/* Sections */}
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

                {/* Policy Update Notice */}
                <div className="mt-12 rounded-2xl border border-border bg-luxury p-6 sm:p-8">
                  <p className="text-sm leading-7 text-muted-foreground">
                    STYQLO reserves the right to update or modify this Return &
                    Refund Policy from time to time. Any changes will be posted
                    on this page with the updated date.
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-semibold text-foreground">
                      STYQLO
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Operated by Mahananda Kart
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Policies */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/terms"
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-primary hover:bg-primary-lighter hover:text-foreground"
              >
                Terms & Conditions
              </Link>

              <Link
                to="/privacy-policy"
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-primary hover:bg-primary-lighter hover:text-foreground"
              >
                Privacy Policy
              </Link>

              <Link
                to="/shipping-policy"
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-primary hover:bg-primary-lighter hover:text-foreground"
              >
                Shipping Policy
              </Link>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
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

export default ReturnPolicyPage
