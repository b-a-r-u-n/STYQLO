import React from "react";
import { Link } from "react-router-dom";
import { RotateCcw, PackageCheck, Clock3, WalletCards, CheckCircle2, XCircle, AlertCircle, ArrowRight, HelpCircle, Truck} from "lucide-react";

const ReturnPolicyPage = () => {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-luxury py-24 lg:py-32">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              STYQLO POLICY
            </span>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Return &
              <br />
              <span className="text-gradient">Refund Policy.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              We want you to feel confident shopping with STYQLO. Here's
              everything you need to know about returns, replacements, and
              refunds.
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= QUICK OVERVIEW ================= */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <RotateCcw size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Easy Returns
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Eligible products can be returned within the applicable return
                period.
              </p>
            </div>

            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <PackageCheck size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Item Condition
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Items should be unused and returned in their original
                condition.
              </p>
            </div>

            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <Clock3 size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Quick Processing
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Return requests are reviewed after submission and verification.
              </p>
            </div>

            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <WalletCards size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Refunds
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Approved refunds are processed according to the applicable
                payment method.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POLICY CONTENT ================= */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-5">
          {/* 01 */}
          <PolicySection
            number="01"
            title="Return Eligibility"
            icon={CheckCircle2}
          >
            <p>
              Products purchased from STYQLO may be eligible for return if
              they meet the conditions specified in this policy and the
              applicable product listing.
            </p>

            <p>
              To be eligible for a return, the product should generally be
              unused, unworn, unwashed, and in its original condition with
              applicable tags, packaging, and accessories intact.
            </p>

            <div className="mt-5 rounded-2xl bg-primary-lighter/50 border border-border p-5">
              <div className="flex gap-3">
                <AlertCircle
                  size={19}
                  className="text-primary shrink-0 mt-0.5"
                />

                <p className="text-sm text-muted-foreground leading-6">
                  Return eligibility may vary by product. Always check the
                  return information displayed on the individual product page
                  before placing your order.
                </p>
              </div>
            </div>
          </PolicySection>

          {/* 02 */}
          <PolicySection
            number="02"
            title="Return Window"
            icon={Clock3}
          >
            <p>
              Eligible products must be requested for return within the return
              period specified by STYQLO for that product or order.
            </p>

            <p>
              The applicable return window may be displayed on the product
              page, order details, or return request interface.
            </p>

            <p>
              Requests submitted after the applicable return period may not be
              accepted.
            </p>
          </PolicySection>

          {/* 03 */}
          <PolicySection
            number="03"
            title="How to Request a Return"
            icon={RotateCcw}
          >
            <p>
              You can submit a return request from your STYQLO account.
            </p>

            <div className="mt-5 space-y-3">
              <Step number="01">
                Open your <strong>Orders</strong> section.
              </Step>

              <Step number="02">
                Select the order containing the item you want to return.
              </Step>

              <Step number="03">
                Select the eligible product you want to return.
              </Step>

              <Step number="04">
                Choose the appropriate return reason and provide the required
                information.
              </Step>

              <Step number="05">
                Submit your return request and wait for the request to be
                reviewed.
              </Step>
            </div>
          </PolicySection>

          {/* 04 */}
          <PolicySection
            number="04"
            title="Partial Returns"
            icon={PackageCheck}
          >
            <p>
              If an order contains multiple products, you may be able to
              request a return for only the eligible item or items you want to
              return.
            </p>

            <p>
              You do not necessarily need to return the entire order when only
              a specific product is eligible for return.
            </p>

            <p>
              Return eligibility is evaluated at the individual product level
              where applicable.
            </p>
          </PolicySection>

          {/* 05 */}
          <PolicySection
            number="05"
            title="Items That May Not Be Accepted"
            icon={XCircle}
          >
            <p>
              A return may be rejected if the product does not meet the
              applicable return conditions.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Products that have been worn or used</li>
              <li>Products that have been washed or altered</li>
              <li>Products with missing tags or original packaging</li>
              <li>Products damaged after delivery due to customer handling</li>
              <li>Products returned after the applicable return window</li>
              <li>Products specifically marked as non-returnable</li>
            </ul>
          </PolicySection>

          {/* 06 */}
          <PolicySection
            number="06"
            title="Damaged, Defective, or Incorrect Items"
            icon={AlertCircle}
          >
            <p>
              If you receive a damaged, defective, incorrect, or incomplete
              product, contact STYQLO support as soon as possible.
            </p>

            <p>
              We may request photographs, videos, packaging details, order
              information, or other evidence to investigate the issue.
            </p>

            <p>
              After verification, STYQLO may provide an appropriate resolution
              such as a replacement, return, refund, or another suitable
              solution.
            </p>
          </PolicySection>

          {/* 07 */}
          <PolicySection
            number="07"
            title="Return Pickup"
            icon={PackageCheck}
          >
            <p>
              Where return pickup is available, the return shipment may be
              arranged through our courier partners.
            </p>

            <p>
              Pickup availability depends on the delivery location, courier
              serviceability, product, and other logistical conditions.
            </p>

            <p>
              Customers are responsible for securely packaging the product
              according to the return instructions provided by STYQLO.
            </p>
          </PolicySection>

          {/* 08 */}
          <PolicySection
            number="08"
            title="Return Verification"
            icon={CheckCircle2}
          >
            <p>
              Returned products may be inspected after they reach the
              designated return facility.
            </p>

            <p>
              The return will be approved only if the product satisfies the
              applicable return conditions.
            </p>

            <p>
              If the returned product does not meet the required conditions,
              STYQLO may reject the return and the refund may not be issued.
            </p>
          </PolicySection>

          {/* 09 */}
          <PolicySection
            number="09"
            title="Refunds"
            icon={WalletCards}
          >
            <p>
              Once an eligible return has been approved, the applicable refund
              will be initiated according to the order and payment details.
            </p>

            <p>
              The amount refunded may depend on the returned item, applicable
              shipping charges, discounts, offers, and other conditions
              associated with the order.
            </p>

            <p>
              The time taken for the refund to appear in your account depends
              on the payment method, bank, or payment service provider.
            </p>
          </PolicySection>

          {/* 10 */}
          <PolicySection
            number="10"
            title="Refund for Cash on Delivery Orders"
            icon={WalletCards}
          >
            <p>
              For eligible COD orders, refunds will be processed using the
              refund method supported by STYQLO.
            </p>

            <p>
              Additional information may be requested from the customer to
              process the refund securely.
            </p>
          </PolicySection>

          {/* 11 */}
          <PolicySection
            number="11"
            title="Non-Returnable Products"
            icon={XCircle}
          >
            <p>
              Certain products may be marked as non-returnable due to their
              nature, hygiene considerations, promotional conditions, or other
              applicable reasons.
            </p>

            <p>
              The non-returnable status, where applicable, will be communicated
              on the relevant product page or during the order process.
            </p>
          </PolicySection>

          {/* 12 */}
          <PolicySection
            number="12"
            title="Return Shipping Charges"
            icon={TruckIcon}
          >
            <p>
              Return shipping charges, if any, depend on the reason for the
              return and the applicable STYQLO return policy.
            </p>

            <p>
              For products that are damaged, defective, incorrect, or otherwise
              affected by an issue attributable to STYQLO, applicable return
              shipping costs may be handled differently.
            </p>
          </PolicySection>

          {/* 13 */}
          <PolicySection
            number="13"
            title="Order Cancellation"
            icon={RotateCcw}
          >
            <p>
              Order cancellation is different from a product return. You may
              request cancellation before your order reaches a stage where
              cancellation is no longer possible.
            </p>

            <p>
              Once an order has been shipped, you may need to follow the
              applicable return process instead.
            </p>
          </PolicySection>

          {/* 14 */}
          <PolicySection
            number="14"
            title="Contact Us"
            icon={HelpCircle}
          >
            <p>
              If you have questions about a return, refund, replacement, or
              damaged product, our support team can help.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
            >
              Contact STYQLO Support
              <ArrowRight size={17} />
            </Link>
          </PolicySection>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
          <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center">
              <RotateCcw size={24} />
            </div>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold">
              Need help with a return?
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              Our support team is here to help you through the return and
              refund process.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link
                to="/orders"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
              >
                View My Orders
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/60 font-semibold border border-white/50 transition-luxury hover:bg-white"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ================= POLICY SECTION ================= */

const PolicySection = ({
  number,
  title,
  icon: Icon,
  children,
}) => {
  return (
    <article className="card-luxury p-7 lg:p-9">
      <div className="flex gap-5">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-primary-lighter flex items-center justify-center">
          <Icon size={20} className="text-primary" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-wider text-primary">
              {number}
            </span>

            <h2 className="text-xl lg:text-2xl font-semibold">
              {title}
            </h2>
          </div>

          <div className="mt-5 space-y-4 text-muted-foreground leading-7">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
};

/* ================= STEP ================= */

const Step = ({ number, children }) => {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-primary-lighter/40 p-4">
      <span className="w-8 h-8 shrink-0 rounded-full bg-primary text-foreground flex items-center justify-center text-sm font-bold">
        {number}
      </span>

      <p className="text-sm leading-6 text-muted-foreground pt-1">
        {children}
      </p>
    </div>
  );
};

/* ================= TRUCK ICON ================= */

const TruckIcon = (props) => {
  return <Truck {...props} />;
};

export default ReturnPolicyPage;