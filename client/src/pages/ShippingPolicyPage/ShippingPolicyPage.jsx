import React from "react";
import { Link } from "react-router-dom";
import { Truck,MapPin,Clock3,PackageCheck,Search,AlertCircle,ArrowRight } from "lucide-react";

const ShippingPolicyPage = () => {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-luxury py-24 lg:py-32">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              STYQLO DELIVERY
            </span>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Shipping
              <br />
              <span className="text-gradient">Policy.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Everything you need to know about how we process, ship, and
              deliver your STYQLO orders.
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= QUICK INFO ================= */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <MapPin size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Delivery Area
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Delivery across serviceable locations in India.
              </p>
            </div>

            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <Clock3 size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Processing
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Orders are processed after successful confirmation.
              </p>
            </div>

            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <Truck size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Shipping
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Orders are shipped through our available courier partners.
              </p>
            </div>

            <div className="card-luxury p-6">
              <div className="w-11 h-11 rounded-xl bg-primary-lighter flex items-center justify-center">
                <PackageCheck size={20} className="text-primary" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Tracking
              </h3>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Track your shipment once tracking information is available.
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
            title="Where We Deliver"
            icon={MapPin}
          >
            <p>
              STYQLO currently delivers to serviceable locations within India.
              Delivery availability depends on the PIN code entered during
              checkout and courier serviceability.
            </p>

            <p>
              Some remote or restricted locations may have limited delivery
              availability.
            </p>
          </PolicySection>

          {/* 02 */}
          <PolicySection
            number="02"
            title="Order Processing"
            icon={Clock3}
          >
            <p>
              Orders are processed after successful order confirmation and
              payment verification, where applicable.
            </p>

            <p>
              Processing time may vary depending on product availability,
              order volume, verification requirements, or other operational
              factors.
            </p>

            <p>
              Orders placed on weekends or public holidays may be processed on
              the next working day.
            </p>
          </PolicySection>

          {/* 03 */}
          <PolicySection
            number="03"
            title="Estimated Delivery Time"
            icon={Truck}
          >
            <p>
              Delivery time depends on your delivery location, courier
              availability, and other logistical factors.
            </p>

            <div className="mt-5 rounded-2xl bg-primary-lighter/50 border border-border p-5">
              <div className="flex gap-3">
                <AlertCircle
                  size={19}
                  className="text-primary shrink-0 mt-0.5"
                />

                <p className="text-sm text-muted-foreground leading-6">
                  The delivery estimate shown during checkout or provided with
                  your order is an estimate and not a guaranteed delivery
                  date.
                </p>
              </div>
            </div>
          </PolicySection>

          {/* 04 */}
          <PolicySection
            number="04"
            title="Shipping Charges"
            icon={PackageCheck}
          >
            <p>
              Shipping charges, if applicable, will be displayed during the
              checkout process before you complete your order.
            </p>

            <p>
              Shipping charges may vary depending on factors such as delivery
              location, order value, package weight, and available shipping
              service.
            </p>
          </PolicySection>

          {/* 05 */}
          <PolicySection
            number="05"
            title="Shipment Tracking"
            icon={Search}
          >
            <p>
              Once your order has been shipped, tracking information will be
              made available when provided by the courier partner.
            </p>

            <p>
              You can use the tracking information provided in your order
              details to follow the shipment status.
            </p>

            <Link
              to="/orders"
              className="inline-flex items-center gap-2 mt-5 font-semibold text-primary hover:underline"
            >
              Track Your Order
              <ArrowRight size={17} />
            </Link>
          </PolicySection>

          {/* 06 */}
          <PolicySection
            number="06"
            title="Delivery Delays"
            icon={AlertCircle}
          >
            <p>
              While we work with our courier partners to deliver orders on
              time, delays can sometimes occur due to circumstances outside
              our control.
            </p>

            <p>Possible reasons include:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Severe weather conditions</li>
              <li>Courier operational issues</li>
              <li>Public holidays</li>
              <li>High order volumes</li>
              <li>Incorrect or incomplete address information</li>
              <li>Remote or difficult-to-service locations</li>
              <li>Unexpected logistical circumstances</li>
            </ul>
          </PolicySection>

          {/* 07 */}
          <PolicySection
            number="07"
            title="Incorrect Delivery Information"
            icon={MapPin}
          >
            <p>
              Please carefully check your shipping address, PIN code, phone
              number, and other delivery information before placing your order.
            </p>

            <p>
              STYQLO may not be responsible for delivery issues caused by
              incorrect or incomplete information provided by the customer.
            </p>
          </PolicySection>

          {/* 08 */}
          <PolicySection
            number="08"
            title="Cash on Delivery"
            icon={PackageCheck}
          >
            <p>
              Cash on Delivery (COD) may be available for eligible locations
              and orders.
            </p>

            <p>
              COD availability is determined during checkout based on the
              delivery PIN code, order value, courier serviceability, and other
              applicable conditions.
            </p>

            <p>
              If COD is available, the applicable amount will be payable to the
              delivery partner at the time of delivery.
            </p>
          </PolicySection>

          {/* 09 */}
          <PolicySection
            number="09"
            title="Damaged Package"
            icon={AlertCircle}
          >
            <p>
              If your package appears seriously damaged, tampered with, or
              opened when delivered, please contact STYQLO support as soon as
              possible.
            </p>

            <p>
              We may request photographs, videos, order details, or other
              information to investigate the issue.
            </p>
          </PolicySection>

          {/* 10 */}
          <PolicySection
            number="10"
            title="Undelivered or Returned Shipments"
            icon={Truck}
          >
            <p>
              If a shipment cannot be delivered because of an incorrect
              address, repeated failed delivery attempts, refusal to accept
              the package, or other reasons attributable to the customer, the
              shipment may be returned to STYQLO.
            </p>

            <p>
              Any further action, including re-shipping or refund eligibility,
              will be handled according to the applicable order and return
              policies.
            </p>
          </PolicySection>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
          <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center">
              <Truck size={24} />
            </div>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold">
              Need help with your delivery?
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              Our support team is here to help you with shipping and delivery
              questions.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
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

export default ShippingPolicyPage;