import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  UserRound,
  ShoppingBag,
  CreditCard,
  MapPin,
  Cookie,
  LockKeyhole,
  Share2,
  Clock3,
  Mail,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-luxury py-24 lg:py-32">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              STYQLO PRIVACY
            </span>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Privacy
              <br />
              <span className="text-gradient">Policy.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Your privacy matters to us. This policy explains what information
              STYQLO collects, how we use it, and how we protect it.
            </p>

            <p className="mt-5 text-sm text-muted-foreground">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="card-luxury p-7 lg:p-10">
            <div className="flex gap-5">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-lighter flex items-center justify-center">
                <ShieldCheck size={23} className="text-primary" />
              </div>

              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold">
                  Your privacy is important to us.
                </h2>

                <p className="mt-4 text-muted-foreground leading-7">
                  This Privacy Policy explains how STYQLO collects, uses,
                  stores, and protects information when you visit our website,
                  create an account, place an order, contact us, or otherwise
                  use our services.
                </p>

                <p className="mt-4 text-muted-foreground leading-7">
                  By using STYQLO, you acknowledge the practices described in
                  this Privacy Policy.
                </p>
              </div>
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
            title="Information We Collect"
            icon={UserRound}
          >
            <p>
              We may collect information that you provide directly when using
              STYQLO, as well as certain information generated automatically
              when you use our website.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-foreground">
              Account information
            </h3>

            <ul className="list-disc pl-5 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Account credentials and authentication information</li>
            </ul>

            <h3 className="pt-2 text-lg font-semibold text-foreground">
              Order information
            </h3>

            <ul className="list-disc pl-5 space-y-2">
              <li>Products purchased</li>
              <li>Order number</li>
              <li>Quantity, size, and product information</li>
              <li>Order status</li>
              <li>Payment status</li>
              <li>Return and refund information</li>
            </ul>
          </PolicySection>

          {/* 02 */}
          <PolicySection
            number="02"
            title="Shipping & Delivery Information"
            icon={MapPin}
          >
            <p>
              When you place an order, we may collect information necessary to
              deliver your products.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Recipient name</li>
              <li>Phone number</li>
              <li>House or street address</li>
              <li>City and state</li>
              <li>PIN code</li>
              <li>Delivery instructions, where provided</li>
            </ul>

            <p>
              This information may be shared with relevant delivery and
              logistics providers when necessary to fulfil your order.
            </p>
          </PolicySection>

          {/* 03 */}
          <PolicySection
            number="03"
            title="Payment Information"
            icon={CreditCard}
          >
            <p>
              Payments may be processed through third-party payment providers.
              Depending on the payment method used, the payment provider may
              process payment-related information according to its own privacy
              policy.
            </p>

            <p>
              STYQLO may receive information such as payment status,
              transaction reference, payment method, and other information
              necessary to confirm and manage your order.
            </p>

            <div className="mt-5 rounded-2xl bg-primary-lighter/50 border border-border p-5">
              <div className="flex gap-3">
                <AlertCircle
                  size={19}
                  className="text-primary shrink-0 mt-0.5"
                />

                <p className="text-sm text-muted-foreground leading-6">
                  STYQLO does not need to store your complete card number or
                  card security code to process an order. Payment credentials
                  are handled by the applicable payment provider.
                </p>
              </div>
            </div>
          </PolicySection>

          {/* 04 */}
          <PolicySection
            number="04"
            title="How We Use Your Information"
            icon={ShoppingBag}
          >
            <p>
              We use collected information only for legitimate business and
              service purposes, including:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Creating and managing your account</li>
              <li>Processing and fulfilling orders</li>
              <li>Processing payments</li>
              <li>Shipping and delivering products</li>
              <li>Providing order tracking information</li>
              <li>Processing returns, refunds, and replacements</li>
              <li>Responding to customer support requests</li>
              <li>Improving our website and services</li>
              <li>Preventing fraud and unauthorized activity</li>
              <li>Maintaining website security</li>
              <li>Complying with applicable legal obligations</li>
            </ul>
          </PolicySection>

          {/* 05 */}
          <PolicySection
            number="05"
            title="Cookies & Similar Technologies"
            icon={Cookie}
          >
            <p>
              STYQLO may use cookies, local storage, and similar technologies
              to provide essential website functionality and improve your
              experience.
            </p>

            <p>These technologies may be used to:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Keep you signed in</li>
              <li>Maintain shopping cart functionality</li>
              <li>Remember preferences</li>
              <li>Maintain session information</li>
              <li>Understand website usage and performance</li>
            </ul>

            <p>
              Some website functionality may not work correctly if essential
              cookies or storage technologies are disabled.
            </p>
          </PolicySection>

          {/* 06 */}
          <PolicySection
            number="06"
            title="Sharing Information With Service Providers"
            icon={Share2}
          >
            <p>
              We may share necessary information with trusted third-party
              service providers that help us operate STYQLO.
            </p>

            <p>These providers may include:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Payment processing providers</li>
              <li>Courier and logistics providers</li>
              <li>Cloud hosting providers</li>
              <li>Cloud storage and image hosting providers</li>
              <li>Website security and infrastructure providers</li>
              <li>Customer support service providers</li>
            </ul>

            <p>
              We aim to share only the information reasonably necessary for
              the relevant service to be performed.
            </p>
          </PolicySection>

          {/* 07 */}
          <PolicySection
            number="07"
            title="Data Security"
            icon={LockKeyhole}
          >
            <p>
              We take reasonable technical and organizational measures to
              protect your information against unauthorized access, misuse,
              alteration, disclosure, or destruction.
            </p>

            <p>
              However, no method of transmission or electronic storage can be
              guaranteed to be completely secure. Therefore, we cannot
              guarantee absolute security of information transmitted to or
              stored by our services.
            </p>
          </PolicySection>

          {/* 08 */}
          <PolicySection
            number="08"
            title="Account Security"
            icon={ShieldCheck}
          >
            <p>
              If you create a STYQLO account, you are responsible for keeping
              your login credentials confidential and for activities performed
              through your account.
            </p>

            <p>
              If you believe that your account has been accessed without
              authorization, contact us immediately.
            </p>
          </PolicySection>

          {/* 09 */}
          <PolicySection
            number="09"
            title="Data Retention"
            icon={Clock3}
          >
            <p>
              We retain personal information for as long as reasonably
              necessary to provide our services, maintain business records,
              process transactions, resolve disputes, prevent fraud, and
              comply with applicable legal obligations.
            </p>

            <p>
              When information is no longer required for these purposes, it
              may be deleted or anonymized where reasonably practicable.
            </p>
          </PolicySection>

          {/* 10 */}
          <PolicySection
            number="10"
            title="Your Information & Choices"
            icon={UserRound}
          >
            <p>
              Depending on applicable law and the circumstances, you may have
              rights or choices relating to your personal information.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Request access to certain personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion where legally applicable</li>
              <li>Update certain account information</li>
              <li>Contact us regarding privacy concerns</li>
            </ul>

            <p>
              Requests may be subject to verification and applicable legal
              requirements.
            </p>
          </PolicySection>

          {/* 11 */}
          <PolicySection
            number="11"
            title="Children's Privacy"
            icon={ShieldCheck}
          >
            <p>
              STYQLO is intended for general consumers and is not knowingly
              designed to collect personal information from children in
              violation of applicable law.
            </p>

            <p>
              If you believe that a child has provided personal information to
              us improperly, please contact us so that we can review and take
              appropriate action.
            </p>
          </PolicySection>

          {/* 12 */}
          <PolicySection
            number="12"
            title="Third-Party Websites & Services"
            icon={Share2}
          >
            <p>
              STYQLO may contain links or integrations to third-party websites
              and services, such as payment, delivery, or social media
              platforms.
            </p>

            <p>
              These third parties may have their own privacy policies and terms.
              STYQLO is not responsible for the privacy practices of external
              websites or services that we do not control.
            </p>
          </PolicySection>

          {/* 13 */}
          <PolicySection
            number="13"
            title="Changes to This Privacy Policy"
            icon={Clock3}
          >
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to our services, technology, legal requirements, or
              business practices.
            </p>

            <p>
              When changes are made, the updated policy will be published on
              this page with a revised "Last updated" date.
            </p>
          </PolicySection>

          {/* 14 */}
          <PolicySection
            number="14"
            title="Contact Us"
            icon={Mail}
          >
            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy or the way STYQLO handles your information, please
              contact us.
            </p>

            <a
              href="mailto:support@styqlo.com"
              className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
            >
              support@styqlo.com
              <ArrowRight size={17} />
            </a>

            <div className="mt-5">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                Contact STYQLO
                <ArrowRight size={17} />
              </Link>
            </div>
          </PolicySection>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
          <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold">
              Your trust matters.
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              We are committed to handling your information responsibly while
              providing a secure shopping experience.
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

export default PrivacyPolicyPage;