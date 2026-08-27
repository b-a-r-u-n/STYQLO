import React from "react";
import { Link } from "react-router-dom";
import { FileText, UserRound, ShoppingBag, CreditCard, Truck, RotateCcw, ShieldCheck, Copyright, AlertCircle, Scale, Mail, ArrowRight } from "lucide-react";

const TermsPage = () => {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-luxury py-24 lg:py-32">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              STYQLO LEGAL
            </span>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Terms &
              <br />
              <span className="text-gradient">Conditions.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              These terms explain the rules and conditions that apply when you
              access or use STYQLO and purchase our products.
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
                <FileText size={23} className="text-primary" />
              </div>

              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold">
                  Please read these terms carefully.
                </h2>

                <p className="mt-4 text-muted-foreground leading-7">
                  These Terms & Conditions govern your access to and use of the
                  STYQLO website, services, and products.
                </p>

                <p className="mt-4 text-muted-foreground leading-7">
                  By accessing STYQLO, creating an account, or placing an
                  order, you agree to be bound by these Terms & Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TERMS ================= */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-5">
          {/* 01 */}
          <TermsSection
            number="01"
            title="About STYQLO"
            icon={ShoppingBag}
          >
            <p>
              STYQLO is an online fashion and clothing platform through which
              customers can browse products, create accounts, place orders,
              make payments, and receive products at eligible delivery
              locations.
            </p>

            <p>
              References to "STYQLO", "we", "us", or "our" in these terms refer
              to the STYQLO business and its applicable services.
            </p>
          </TermsSection>

          {/* 02 */}
          <TermsSection
            number="02"
            title="Eligibility"
            icon={UserRound}
          >
            <p>
              You must provide accurate information when using STYQLO and
              placing an order.
            </p>

            <p>
              If you create an account, you are responsible for maintaining
              the confidentiality of your account credentials and for activity
              performed through your account.
            </p>

            <p>
              You must not use STYQLO for unlawful, fraudulent, abusive, or
              unauthorized purposes.
            </p>
          </TermsSection>

          {/* 03 */}
          <TermsSection
            number="03"
            title="Account Information"
            icon={UserRound}
          >
            <p>
              Certain features may require you to create a STYQLO account.
            </p>

            <p>
              You agree to provide accurate and current information and to
              update it when necessary.
            </p>

            <p>
              STYQLO may suspend or restrict an account where there is
              reasonable evidence of fraudulent, abusive, unauthorized, or
              unlawful activity.
            </p>
          </TermsSection>

          {/* 04 */}
          <TermsSection
            number="04"
            title="Products & Product Information"
            icon={ShoppingBag}
          >
            <p>
              We make reasonable efforts to display accurate product
              descriptions, images, sizes, colors, prices, and availability.
            </p>

            <p>
              However, differences may occur between displayed images and the
              actual product due to lighting, photography, display settings, or
              manufacturing characteristics.
            </p>

            <p>
              Product availability may change without prior notice.
            </p>
          </TermsSection>

          {/* 05 */}
          <TermsSection
            number="05"
            title="Pricing"
            icon={CreditCard}
          >
            <p>
              Product prices displayed on STYQLO are subject to change without
              prior notice.
            </p>

            <p>
              The applicable price for an order is the price displayed during
              checkout when the order is placed, subject to any applicable
              discounts, taxes, shipping charges, or other clearly stated
              charges.
            </p>

            <p>
              If an obvious pricing or technical error occurs, STYQLO reserves
              the right to correct the error and, where appropriate, cancel the
              affected order.
            </p>
          </TermsSection>

          {/* 06 */}
          <TermsSection
            number="06"
            title="Placing an Order"
            icon={ShoppingBag}
          >
            <p>
              Adding a product to your cart does not guarantee that the product
              will remain available until checkout.
            </p>

            <p>
              An order is considered successfully placed only after the
              applicable checkout process has been completed and the order has
              been accepted by STYQLO.
            </p>

            <p>
              We reserve the right to refuse, limit, or cancel an order in
              situations including suspected fraud, product unavailability,
              pricing errors, or other legitimate operational reasons.
            </p>
          </TermsSection>

          {/* 07 */}
          <TermsSection
            number="07"
            title="Payment"
            icon={CreditCard}
          >
            <p>
              STYQLO may offer different payment methods, including online
              payment and Cash on Delivery (COD), depending on availability.
            </p>

            <p>
              Online payments may be processed through third-party payment
              service providers.
            </p>

            <p>
              Payment must be successfully authorized or collected according
              to the selected payment method before an order can be fulfilled,
              where applicable.
            </p>

            <p>
              If a payment fails or remains incomplete, STYQLO may not process
              or fulfil the order until the payment issue is resolved.
            </p>
          </TermsSection>

          {/* 08 */}
          <TermsSection
            number="08"
            title="Shipping & Delivery"
            icon={Truck}
          >
            <p>
              Orders are delivered to serviceable locations through available
              courier and logistics partners.
            </p>

            <p>
              Delivery estimates provided during checkout or after placing an
              order are estimates and may be affected by circumstances outside
              our control.
            </p>

            <p>
              Customers are responsible for providing a complete and accurate
              delivery address and contact information.
            </p>

            <Link
              to="/shipping-policy"
              className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
            >
              Read Shipping Policy
              <ArrowRight size={17} />
            </Link>
          </TermsSection>

          {/* 09 */}
          <TermsSection
            number="09"
            title="Returns & Refunds"
            icon={RotateCcw}
          >
            <p>
              Returns and refunds are subject to STYQLO's applicable Return &
              Refund Policy.
            </p>

            <p>
              Products must satisfy the applicable return conditions and
              return window before a return or refund can be approved.
            </p>

            <p>
              Where an order contains multiple products, eligible individual
              items may be returned according to the applicable return
              conditions.
            </p>

            <Link
              to="/return-policy"
              className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
            >
              Read Return & Refund Policy
              <ArrowRight size={17} />
            </Link>
          </TermsSection>

          {/* 10 */}
          <TermsSection
            number="10"
            title="Cancellation"
            icon={AlertCircle}
          >
            <p>
              You may request cancellation of an order before it reaches a
              stage where cancellation is no longer possible.
            </p>

            <p>
              Once an order has been shipped or otherwise processed beyond the
              cancellation stage, the applicable return process may apply
              instead.
            </p>
          </TermsSection>

          {/* 11 */}
          <TermsSection
            number="11"
            title="Promotions & Discounts"
            icon={ShoppingBag}
          >
            <p>
              STYQLO may offer promotional codes, discounts, sales, or other
              promotional campaigns.
            </p>

            <p>
              Promotions may have additional terms, eligibility requirements,
              usage limits, expiry dates, or product restrictions.
            </p>

            <p>
              Unless explicitly stated otherwise, promotions cannot be
              exchanged for cash and may not be combined with other offers.
            </p>
          </TermsSection>

          {/* 12 */}
          <TermsSection
            number="12"
            title="Prohibited Activities"
            icon={ShieldCheck}
          >
            <p>You must not use STYQLO to:</p>

            <ul className="list-disc pl-5 space-y-2">
              <li>Commit or facilitate unlawful activity</li>
              <li>Attempt to access another user's account</li>
              <li>Provide false or misleading information</li>
              <li>Commit payment or refund fraud</li>
              <li>Interfere with website functionality or security</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems to abuse or overload the website</li>
              <li>Copy or misuse STYQLO content without permission</li>
            </ul>
          </TermsSection>

          {/* 13 */}
          <TermsSection
            number="13"
            title="Intellectual Property"
            icon={Copyright}
          >
            <p>
              STYQLO and its website content, including logos, branding,
              product photography, graphics, text, designs, layouts, and other
              materials, may be protected by applicable intellectual property
              laws.
            </p>

            <p>
              You may not reproduce, distribute, modify, sell, publish, or
              commercially exploit STYQLO content without appropriate
              authorization.
            </p>
          </TermsSection>

          {/* 14 */}
          <TermsSection
            number="14"
            title="Third-Party Services"
            icon={ShieldCheck}
          >
            <p>
              STYQLO may use third-party services for payment processing,
              shipping, hosting, analytics, authentication, storage, and other
              operational functions.
            </p>

            <p>
              Your use of certain third-party services may also be subject to
              the terms and policies of those providers.
            </p>
          </TermsSection>

          {/* 15 */}
          <TermsSection
            number="15"
            title="Website Availability"
            icon={AlertCircle}
          >
            <p>
              We aim to keep STYQLO available and functioning reliably, but we
              do not guarantee that the website will always be uninterrupted,
              error-free, or available at all times.
            </p>

            <p>
              Temporary interruptions may occur due to maintenance, technical
              problems, infrastructure failures, security incidents, or other
              circumstances.
            </p>
          </TermsSection>

          {/* 16 */}
          <TermsSection
            number="16"
            title="Limitation of Liability"
            icon={Scale}
          >
            <p>
              To the extent permitted by applicable law, STYQLO will not be
              responsible for losses resulting from circumstances beyond our
              reasonable control.
            </p>

            <p>
              This may include third-party service interruptions, courier
              delays, network failures, unauthorized access caused by factors
              outside our reasonable control, or other events that could not
              reasonably have been prevented.
            </p>

            <p>
              Nothing in these terms is intended to exclude or limit liability
              where such exclusion or limitation is prohibited by applicable
              law.
            </p>
          </TermsSection>

          {/* 17 */}
          <TermsSection
            number="17"
            title="Privacy"
            icon={ShieldCheck}
          >
            <p>
              Your use of STYQLO is also subject to our Privacy Policy, which
              explains how we collect, use, store, and protect personal
              information.
            </p>

            <Link
              to="/privacy-policy"
              className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
            >
              Read Privacy Policy
              <ArrowRight size={17} />
            </Link>
          </TermsSection>

          {/* 18 */}
          <TermsSection
            number="18"
            title="Changes to These Terms"
            icon={FileText}
          >
            <p>
              STYQLO may update these Terms & Conditions from time to time to
              reflect changes to our services, business practices, technology,
              or legal requirements.
            </p>

            <p>
              Updated terms will be published on this page with a revised
              "Last updated" date.
            </p>

            <p>
              Your continued use of STYQLO after an update may constitute
              acceptance of the revised terms to the extent permitted by
              applicable law.
            </p>
          </TermsSection>

          {/* 19 */}
          <TermsSection
            number="19"
            title="Governing Law"
            icon={Scale}
          >
            <p>
              These Terms & Conditions shall be governed by and interpreted in
              accordance with the laws applicable to the STYQLO business,
              subject to applicable consumer protection and other mandatory
              legal requirements.
            </p>

            <p>
              Any dispute will be handled in accordance with applicable law
              and the jurisdictional requirements applicable to the business.
            </p>
          </TermsSection>

          {/* 20 */}
          <TermsSection
            number="20"
            title="Contact Us"
            icon={Mail}
          >
            <p>
              If you have questions about these Terms & Conditions, please
              contact the STYQLO support team.
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
          </TermsSection>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
          <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center">
              <FileText size={24} />
            </div>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold">
              Have a question?
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              If anything about our terms is unclear, our support team is
              happy to help.
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

/* ================= TERMS SECTION ================= */

const TermsSection = ({
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

export default TermsPage;