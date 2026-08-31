import React from "react";
import { Truck, MapPin, Clock, Package, ShieldCheck, AlertCircle, CreditCard, Phone, Mail } from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Shipping Availability",
    icon: MapPin,
    content: (
      <>
        <p>
          STYQLO currently provides delivery <strong>across India</strong>,
          subject to courier service availability and PIN-code serviceability.
        </p>

        <p>
          We ship to locations that are serviceable by our courier partners.
        </p>

        <p>
          Delivery availability may vary for certain remote or
          difficult-to-reach locations. If a PIN code is not serviceable, we
          may not be able to process delivery to that location.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Shipping Charges",
    icon: CreditCard,
    content: (
      <>
        <div className="rounded-2xl bg-primary-lighter p-5">
          <p className="font-semibold text-foreground">
            Free shipping is available on all STYQLO orders.
          </p>
        </div>

        <p className="mt-5">
          Any applicable charges, including any charges related to specific
          payment or delivery options, will be displayed to you before you
          complete your order.
        </p>

        <p>
          There are currently no additional shipping charges based solely on
          the customer's delivery location.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Order Processing",
    icon: Clock,
    content: (
      <>
        <p>
          Orders are generally processed and prepared for dispatch within{" "}
          <strong>1–2 business days</strong> after the order is successfully
          placed and payment is confirmed, where applicable.
        </p>

        <p>
          Orders are processed <strong>Monday through Saturday</strong>.
        </p>

        <p>
          Orders placed on Sundays or public holidays may be processed on the
          next available business day.
        </p>

        <p>Processing times may occasionally be longer during:</p>

        <ul>
          <li>Sales and promotional periods.</li>
          <li>High-demand periods.</li>
          <li>Festivals and holidays.</li>
          <li>Unexpected operational circumstances.</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "Delivery Time",
    icon: Truck,
    content: (
      <>
        <p>
          Once your order has been dispatched, the estimated delivery time is
          generally:
        </p>

        <div className="my-5 rounded-2xl bg-luxury-warm p-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-foreground/70">
            Estimated Delivery
          </p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            3–7 business days
          </p>
          <p className="mt-1 text-sm text-foreground/70">after dispatch</p>
        </div>

        <p>Delivery time may vary depending on:</p>

        <ul>
          <li>Delivery location.</li>
          <li>PIN-code serviceability.</li>
          <li>Courier operations.</li>
          <li>Weather conditions.</li>
          <li>Festivals and public holidays.</li>
          <li>Natural disasters.</li>
          <li>Transportation disruptions.</li>
          <li>Remote or difficult-to-reach locations.</li>
          <li>Other circumstances beyond STYQLO's reasonable control.</li>
        </ul>

        <p>
          The delivery timeline is an estimate and is not a guaranteed
          delivery date.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Shipping Partners",
    icon: Package,
    content: (
      <>
        <p>
          STYQLO uses <strong>Shiprocket</strong> to manage shipping and
          courier services.
        </p>

        <p>
          Your order may be assigned to an appropriate courier partner based
          on factors such as:
        </p>

        <ul>
          <li>Delivery location.</li>
          <li>Courier availability.</li>
          <li>Serviceability.</li>
          <li>Estimated delivery time.</li>
          <li>Operational conditions.</li>
        </ul>

        <p>
          The courier partner handling your shipment may therefore vary from
          one order to another.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Order Tracking",
    icon: Package,
    content: (
      <>
        <p>
          Once your order has been dispatched, tracking information will be
          made available.
        </p>

        <p>Tracking details may be sent through:</p>

        <ul>
          <li>Email</li>
          <li>SMS</li>
          <li>WhatsApp</li>
        </ul>

        <p>
          You may use the tracking information provided to check the progress
          of your shipment.
        </p>

        <p>
          If the tracking information does not update for an unusually long
          period, please contact STYQLO customer support.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Delivery Attempts",
    icon: Truck,
    content: (
      <>
        <p>
          Delivery attempts are handled by the courier partner assigned to
          your shipment.
        </p>

        <p>
          The number of delivery attempts may vary depending on the courier
          partner and delivery location.
        </p>

        <p>
          If delivery cannot be completed after the courier partner's
          attempts, the parcel may eventually be <strong>returned to STYQLO</strong>.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Incorrect or Incomplete Address",
    icon: MapPin,
    content: (
      <>
        <p>
          Please carefully check your delivery address, PIN code, phone
          number, and other details before placing your order.
        </p>

        <p>
          Once an order has been dispatched, we may not be able to modify the
          delivery address.
        </p>

        <p>
          If a parcel is returned to STYQLO because of:
        </p>

        <ul>
          <li>Incorrect address.</li>
          <li>Incomplete address.</li>
          <li>Incorrect PIN code.</li>
          <li>Incorrect contact details.</li>
          <li>Customer unavailability.</li>
          <li>Repeated unsuccessful delivery attempts.</li>
        </ul>

        <p>
          STYQLO will contact the customer where appropriate and determine the
          available resolution on a <strong>case-by-case basis</strong>.
        </p>

        <p>
          Additional shipping charges may apply if a new shipment needs to be
          arranged.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Failed Delivery & Returned Parcels",
    icon: Package,
    content: (
      <>
        <p>
          If a courier partner is unable to deliver your order and the parcel
          is returned to STYQLO, we will review the situation and contact you
          where appropriate.
        </p>

        <p>Depending on the circumstances, STYQLO may offer:</p>

        <ul>
          <li>Re-shipment.</li>
          <li>Refund.</li>
          <li>Another appropriate resolution.</li>
        </ul>

        <p>
          Any re-shipping charges, where applicable, will be communicated to
          the customer before the new shipment is arranged.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Damaged or Tampered Packages",
    icon: ShieldCheck,
    content: (
      <>
        <p>
          If your package appears to be <strong>damaged, opened, or
            tampered with</strong> at the time of delivery:
        </p>

        <ul>
          <li>
            Where possible, refuse the delivery and contact STYQLO.
          </li>
          <li>
            If you accept the package, take clear photographs/videos of the
            package and its contents.
          </li>
          <li>
            Contact STYQLO as soon as possible and preferably within{" "}
            <strong>2 days of delivery</strong>.
          </li>
        </ul>

        <p>
          For damaged or incorrect products, additional photographs or an
          unboxing video may be required to help us verify the issue.
        </p>

        <p>
          Please do not discard the packaging until the issue has been
          resolved.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "Missing Products",
    icon: AlertCircle,
    content: (
      <>
        <p>
          If your order contains multiple products and one or more products
          are missing from the delivered package, please contact STYQLO{" "}
          <strong>within 2 days of delivery</strong>.
        </p>

        <p>Please provide:</p>

        <ul>
          <li>Your order number.</li>
          <li>Details of the missing product.</li>
          <li>Photographs of the received package and products.</li>
          <li>Unboxing video, where available/required.</li>
        </ul>

        <p>
          We will review the issue and provide an appropriate resolution.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "Delayed Deliveries",
    icon: Clock,
    content: (
      <>
        <p>
          Although we aim to deliver orders within the estimated timeframe,
          occasional delays can occur due to circumstances outside our
          control.
        </p>

        <p>These may include:</p>

        <ul>
          <li>Severe weather.</li>
          <li>Natural disasters.</li>
          <li>Public holidays.</li>
          <li>Festivals.</li>
          <li>Transportation disruptions.</li>
          <li>Courier operational issues.</li>
          <li>High shipment volumes.</li>
          <li>Remote-area delivery challenges.</li>
        </ul>

        <p>
          If your shipment appears to be significantly delayed, please
          contact us so that we can check the shipment status with the courier
          partner.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Delivery to Remote Locations",
    icon: MapPin,
    content: (
      <>
        <p>
          Some remote, rural, or difficult-to-reach locations may have longer
          delivery times or limited courier serviceability.
        </p>

        <p>
          If your PIN code is not serviceable through our available courier
          partners, we may contact you regarding the available options.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "Cash on Delivery",
    icon: CreditCard,
    content: (
      <>
        <p>
          Cash on Delivery (COD) is available for eligible orders and
          serviceable delivery locations.
        </p>

        <p>COD availability may depend on:</p>

        <ul>
          <li>Delivery PIN code.</li>
          <li>Courier serviceability.</li>
          <li>Order eligibility.</li>
          <li>Operational conditions.</li>
        </ul>

        <div className="mt-5 rounded-2xl bg-primary-lighter p-5">
          <p className="font-semibold">
            STYQLO does not charge any additional fee for Cash on Delivery.
          </p>
        </div>

        <p className="mt-5">
          If COD is unavailable for your delivery location, you can choose
          one of the available online payment methods at checkout.
        </p>
      </>
    ),
  },
];

const ShippingPolicyPage = () => {

  const handleCall = () => {
    const phoneNumber = import.meta.env.VITE_NUMBER;

    window.location.href = `tel:${phoneNumber}`;
  };

  const handleMail = () => {
    const subject = encodeURIComponent("Hello STYQLO Team");
    const body = encodeURIComponent(
      "Hello STYQLO Team! 👋\n\nI’d like to get in touch regarding your products/services. Could you please assist me?\n\nThank you!"
    );

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL}&su=${subject}&body=${body}`;

    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-luxury px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card">
            <Truck className="text-primary" size={28} />
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            STYQLO Shipping
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            Shipping Policy
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Simple, transparent shipping information for your STYQLO orders
            across India.
          </p>

          <p className="mt-6 text-sm text-muted-foreground">
            Last Updated: August 28, 2026
          </p>
        </div>
      </section>

      {/* Quick information */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          <div className="card-luxury p-6 text-center">
            <Truck className="mx-auto mb-3 text-primary" size={25} />
            <p className="text-sm text-muted-foreground">Delivery</p>
            <p className="mt-1 font-semibold">Across India</p>
          </div>

          <div className="card-luxury p-6 text-center">
            <Clock className="mx-auto mb-3 text-primary" size={25} />
            <p className="text-sm text-muted-foreground">After Dispatch</p>
            <p className="mt-1 font-semibold">3–7 Business Days</p>
          </div>

          <div className="card-luxury p-6 text-center">
            <Package className="mx-auto mb-3 text-primary" size={25} />
            <p className="text-sm text-muted-foreground">Shipping Charge</p>
            <p className="mt-1 font-semibold">Free</p>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.number}
                  className="card-luxury overflow-hidden"
                >
                  <div className="flex items-center gap-4 border-b border-border bg-primary-lighter px-5 py-5 sm:px-7">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-card">
                      <Icon size={20} className="text-primary" />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-widest text-primary">
                        {section.number}
                      </span>

                      <h2 className="text-xl font-semibold sm:text-2xl">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="px-5 py-6 text-sm leading-7 text-muted-foreground sm:px-7 sm:py-8">
                    {section.content}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-4xl rounded-[24px] bg-luxury-hero px-6 py-12 text-center shadow-luxury sm:px-10">
          <h2 className="text-3xl font-semibold text-white">
            Questions About Your Shipment?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/70">
            We're happy to help with your order, delivery, tracking, or
            shipping-related questions.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={handleCall}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-luxury hover:shadow-hover"
            >
              <Phone size={18} />
              Call us
            </button>

            <button
              onClick={handleMail}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition-luxury hover:bg-white/10"
            >
              <Mail size={18} />
              Email Us
            </button>
          </div>

          <div className="mt-8 space-y-1 text-sm text-white/60">
            <p>Monday – Sunday: 10:00 AM – 10:00 PM</p>
            <p>Sunday & Public Holidays: Limited support may be available.</p>
            <p>Response time: 1–2 business days</p>
          </div>
        </div>
      </section>

      {/* Footer identity */}
      <section className="border-t border-border px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="font-semibold text-foreground">STYQLO</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Good Quality. Less Price. More Style.
        </p>

        <p className="mt-4 text-xs text-muted-foreground">
          Operated by Mahananda Kart · Rourkela, Odisha, India
        </p>
      </section>
    </main>
  );
}

export default ShippingPolicyPage;