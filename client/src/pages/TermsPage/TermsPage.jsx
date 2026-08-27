// import React from "react";
// import { Link } from "react-router-dom";
// import { FileText, UserRound, ShoppingBag, CreditCard, Truck, RotateCcw, ShieldCheck, Copyright, AlertCircle, Scale, Mail, ArrowRight } from "lucide-react";

// const TermsPage = () => {
//   return (
//     <main className="bg-background text-foreground overflow-hidden">
//       {/* ================= HERO ================= */}
//       <section className="relative bg-luxury py-24 lg:py-32">
//         <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

//         <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

//         <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="max-w-3xl">
//             <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
//               STYQLO LEGAL
//             </span>

//             <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
//               Terms &
//               <br />
//               <span className="text-gradient">Conditions.</span>
//             </h1>

//             <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
//               These terms explain the rules and conditions that apply when you
//               access or use STYQLO and purchase our products.
//             </p>

//             <p className="mt-5 text-sm text-muted-foreground">
//               Last updated: August 2026
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ================= INTRO ================= */}
//       <section className="py-16 lg:py-20">
//         <div className="max-w-4xl mx-auto px-6 lg:px-8">
//           <div className="card-luxury p-7 lg:p-10">
//             <div className="flex gap-5">
//               <div className="w-12 h-12 shrink-0 rounded-xl bg-primary-lighter flex items-center justify-center">
//                 <FileText size={23} className="text-primary" />
//               </div>

//               <div>
//                 <h2 className="text-2xl lg:text-3xl font-semibold">
//                   Please read these terms carefully.
//                 </h2>

//                 <p className="mt-4 text-muted-foreground leading-7">
//                   These Terms & Conditions govern your access to and use of the
//                   STYQLO website, services, and products.
//                 </p>

//                 <p className="mt-4 text-muted-foreground leading-7">
//                   By accessing STYQLO, creating an account, or placing an
//                   order, you agree to be bound by these Terms & Conditions.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= TERMS ================= */}
//       <section className="pb-24 lg:pb-32">
//         <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-5">
//           {/* 01 */}
//           <TermsSection
//             number="01"
//             title="About STYQLO"
//             icon={ShoppingBag}
//           >
//             <p>
//               STYQLO is an online fashion and clothing platform through which
//               customers can browse products, create accounts, place orders,
//               make payments, and receive products at eligible delivery
//               locations.
//             </p>

//             <p>
//               References to "STYQLO", "we", "us", or "our" in these terms refer
//               to the STYQLO business and its applicable services.
//             </p>
//           </TermsSection>

//           {/* 02 */}
//           <TermsSection
//             number="02"
//             title="Eligibility"
//             icon={UserRound}
//           >
//             <p>
//               You must provide accurate information when using STYQLO and
//               placing an order.
//             </p>

//             <p>
//               If you create an account, you are responsible for maintaining
//               the confidentiality of your account credentials and for activity
//               performed through your account.
//             </p>

//             <p>
//               You must not use STYQLO for unlawful, fraudulent, abusive, or
//               unauthorized purposes.
//             </p>
//           </TermsSection>

//           {/* 03 */}
//           <TermsSection
//             number="03"
//             title="Account Information"
//             icon={UserRound}
//           >
//             <p>
//               Certain features may require you to create a STYQLO account.
//             </p>

//             <p>
//               You agree to provide accurate and current information and to
//               update it when necessary.
//             </p>

//             <p>
//               STYQLO may suspend or restrict an account where there is
//               reasonable evidence of fraudulent, abusive, unauthorized, or
//               unlawful activity.
//             </p>
//           </TermsSection>

//           {/* 04 */}
//           <TermsSection
//             number="04"
//             title="Products & Product Information"
//             icon={ShoppingBag}
//           >
//             <p>
//               We make reasonable efforts to display accurate product
//               descriptions, images, sizes, colors, prices, and availability.
//             </p>

//             <p>
//               However, differences may occur between displayed images and the
//               actual product due to lighting, photography, display settings, or
//               manufacturing characteristics.
//             </p>

//             <p>
//               Product availability may change without prior notice.
//             </p>
//           </TermsSection>

//           {/* 05 */}
//           <TermsSection
//             number="05"
//             title="Pricing"
//             icon={CreditCard}
//           >
//             <p>
//               Product prices displayed on STYQLO are subject to change without
//               prior notice.
//             </p>

//             <p>
//               The applicable price for an order is the price displayed during
//               checkout when the order is placed, subject to any applicable
//               discounts, taxes, shipping charges, or other clearly stated
//               charges.
//             </p>

//             <p>
//               If an obvious pricing or technical error occurs, STYQLO reserves
//               the right to correct the error and, where appropriate, cancel the
//               affected order.
//             </p>
//           </TermsSection>

//           {/* 06 */}
//           <TermsSection
//             number="06"
//             title="Placing an Order"
//             icon={ShoppingBag}
//           >
//             <p>
//               Adding a product to your cart does not guarantee that the product
//               will remain available until checkout.
//             </p>

//             <p>
//               An order is considered successfully placed only after the
//               applicable checkout process has been completed and the order has
//               been accepted by STYQLO.
//             </p>

//             <p>
//               We reserve the right to refuse, limit, or cancel an order in
//               situations including suspected fraud, product unavailability,
//               pricing errors, or other legitimate operational reasons.
//             </p>
//           </TermsSection>

//           {/* 07 */}
//           <TermsSection
//             number="07"
//             title="Payment"
//             icon={CreditCard}
//           >
//             <p>
//               STYQLO may offer different payment methods, including online
//               payment and Cash on Delivery (COD), depending on availability.
//             </p>

//             <p>
//               Online payments may be processed through third-party payment
//               service providers.
//             </p>

//             <p>
//               Payment must be successfully authorized or collected according
//               to the selected payment method before an order can be fulfilled,
//               where applicable.
//             </p>

//             <p>
//               If a payment fails or remains incomplete, STYQLO may not process
//               or fulfil the order until the payment issue is resolved.
//             </p>
//           </TermsSection>

//           {/* 08 */}
//           <TermsSection
//             number="08"
//             title="Shipping & Delivery"
//             icon={Truck}
//           >
//             <p>
//               Orders are delivered to serviceable locations through available
//               courier and logistics partners.
//             </p>

//             <p>
//               Delivery estimates provided during checkout or after placing an
//               order are estimates and may be affected by circumstances outside
//               our control.
//             </p>

//             <p>
//               Customers are responsible for providing a complete and accurate
//               delivery address and contact information.
//             </p>

//             <Link
//               to="/shipping-policy"
//               className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
//             >
//               Read Shipping Policy
//               <ArrowRight size={17} />
//             </Link>
//           </TermsSection>

//           {/* 09 */}
//           <TermsSection
//             number="09"
//             title="Returns & Refunds"
//             icon={RotateCcw}
//           >
//             <p>
//               Returns and refunds are subject to STYQLO's applicable Return &
//               Refund Policy.
//             </p>

//             <p>
//               Products must satisfy the applicable return conditions and
//               return window before a return or refund can be approved.
//             </p>

//             <p>
//               Where an order contains multiple products, eligible individual
//               items may be returned according to the applicable return
//               conditions.
//             </p>

//             <Link
//               to="/return-policy"
//               className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
//             >
//               Read Return & Refund Policy
//               <ArrowRight size={17} />
//             </Link>
//           </TermsSection>

//           {/* 10 */}
//           <TermsSection
//             number="10"
//             title="Cancellation"
//             icon={AlertCircle}
//           >
//             <p>
//               You may request cancellation of an order before it reaches a
//               stage where cancellation is no longer possible.
//             </p>

//             <p>
//               Once an order has been shipped or otherwise processed beyond the
//               cancellation stage, the applicable return process may apply
//               instead.
//             </p>
//           </TermsSection>

//           {/* 11 */}
//           <TermsSection
//             number="11"
//             title="Promotions & Discounts"
//             icon={ShoppingBag}
//           >
//             <p>
//               STYQLO may offer promotional codes, discounts, sales, or other
//               promotional campaigns.
//             </p>

//             <p>
//               Promotions may have additional terms, eligibility requirements,
//               usage limits, expiry dates, or product restrictions.
//             </p>

//             <p>
//               Unless explicitly stated otherwise, promotions cannot be
//               exchanged for cash and may not be combined with other offers.
//             </p>
//           </TermsSection>

//           {/* 12 */}
//           <TermsSection
//             number="12"
//             title="Prohibited Activities"
//             icon={ShieldCheck}
//           >
//             <p>You must not use STYQLO to:</p>

//             <ul className="list-disc pl-5 space-y-2">
//               <li>Commit or facilitate unlawful activity</li>
//               <li>Attempt to access another user's account</li>
//               <li>Provide false or misleading information</li>
//               <li>Commit payment or refund fraud</li>
//               <li>Interfere with website functionality or security</li>
//               <li>Attempt to gain unauthorized access to our systems</li>
//               <li>Use automated systems to abuse or overload the website</li>
//               <li>Copy or misuse STYQLO content without permission</li>
//             </ul>
//           </TermsSection>

//           {/* 13 */}
//           <TermsSection
//             number="13"
//             title="Intellectual Property"
//             icon={Copyright}
//           >
//             <p>
//               STYQLO and its website content, including logos, branding,
//               product photography, graphics, text, designs, layouts, and other
//               materials, may be protected by applicable intellectual property
//               laws.
//             </p>

//             <p>
//               You may not reproduce, distribute, modify, sell, publish, or
//               commercially exploit STYQLO content without appropriate
//               authorization.
//             </p>
//           </TermsSection>

//           {/* 14 */}
//           <TermsSection
//             number="14"
//             title="Third-Party Services"
//             icon={ShieldCheck}
//           >
//             <p>
//               STYQLO may use third-party services for payment processing,
//               shipping, hosting, analytics, authentication, storage, and other
//               operational functions.
//             </p>

//             <p>
//               Your use of certain third-party services may also be subject to
//               the terms and policies of those providers.
//             </p>
//           </TermsSection>

//           {/* 15 */}
//           <TermsSection
//             number="15"
//             title="Website Availability"
//             icon={AlertCircle}
//           >
//             <p>
//               We aim to keep STYQLO available and functioning reliably, but we
//               do not guarantee that the website will always be uninterrupted,
//               error-free, or available at all times.
//             </p>

//             <p>
//               Temporary interruptions may occur due to maintenance, technical
//               problems, infrastructure failures, security incidents, or other
//               circumstances.
//             </p>
//           </TermsSection>

//           {/* 16 */}
//           <TermsSection
//             number="16"
//             title="Limitation of Liability"
//             icon={Scale}
//           >
//             <p>
//               To the extent permitted by applicable law, STYQLO will not be
//               responsible for losses resulting from circumstances beyond our
//               reasonable control.
//             </p>

//             <p>
//               This may include third-party service interruptions, courier
//               delays, network failures, unauthorized access caused by factors
//               outside our reasonable control, or other events that could not
//               reasonably have been prevented.
//             </p>

//             <p>
//               Nothing in these terms is intended to exclude or limit liability
//               where such exclusion or limitation is prohibited by applicable
//               law.
//             </p>
//           </TermsSection>

//           {/* 17 */}
//           <TermsSection
//             number="17"
//             title="Privacy"
//             icon={ShieldCheck}
//           >
//             <p>
//               Your use of STYQLO is also subject to our Privacy Policy, which
//               explains how we collect, use, store, and protect personal
//               information.
//             </p>

//             <Link
//               to="/privacy-policy"
//               className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
//             >
//               Read Privacy Policy
//               <ArrowRight size={17} />
//             </Link>
//           </TermsSection>

//           {/* 18 */}
//           <TermsSection
//             number="18"
//             title="Changes to These Terms"
//             icon={FileText}
//           >
//             <p>
//               STYQLO may update these Terms & Conditions from time to time to
//               reflect changes to our services, business practices, technology,
//               or legal requirements.
//             </p>

//             <p>
//               Updated terms will be published on this page with a revised
//               "Last updated" date.
//             </p>

//             <p>
//               Your continued use of STYQLO after an update may constitute
//               acceptance of the revised terms to the extent permitted by
//               applicable law.
//             </p>
//           </TermsSection>

//           {/* 19 */}
//           <TermsSection
//             number="19"
//             title="Governing Law"
//             icon={Scale}
//           >
//             <p>
//               These Terms & Conditions shall be governed by and interpreted in
//               accordance with the laws applicable to the STYQLO business,
//               subject to applicable consumer protection and other mandatory
//               legal requirements.
//             </p>

//             <p>
//               Any dispute will be handled in accordance with applicable law
//               and the jurisdictional requirements applicable to the business.
//             </p>
//           </TermsSection>

//           {/* 20 */}
//           <TermsSection
//             number="20"
//             title="Contact Us"
//             icon={Mail}
//           >
//             <p>
//               If you have questions about these Terms & Conditions, please
//               contact the STYQLO support team.
//             </p>

//             <a
//               href="mailto:support@styqlo.com"
//               className="inline-flex items-center gap-2 mt-2 font-semibold text-primary hover:underline"
//             >
//               support@styqlo.com
//               <ArrowRight size={17} />
//             </a>

//             <div className="mt-5">
//               <Link
//                 to="/contact"
//                 className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
//               >
//                 Contact STYQLO
//                 <ArrowRight size={17} />
//               </Link>
//             </div>
//           </TermsSection>
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="px-6 lg:px-8 pb-20">
//         <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
//           <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
//             <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center">
//               <FileText size={24} />
//             </div>

//             <h2 className="mt-6 text-4xl lg:text-5xl font-bold">
//               Have a question?
//             </h2>

//             <p className="mt-5 max-w-xl mx-auto text-foreground/70">
//               If anything about our terms is unclear, our support team is
//               happy to help.
//             </p>

//             <Link
//               to="/contact"
//               className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
//             >
//               Contact Us
//               <ArrowRight size={18} />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// /* ================= TERMS SECTION ================= */

// const TermsSection = ({
//   number,
//   title,
//   icon: Icon,
//   children,
// }) => {
//   return (
//     <article className="card-luxury p-7 lg:p-9">
//       <div className="flex gap-5">
//         <div className="w-11 h-11 shrink-0 rounded-xl bg-primary-lighter flex items-center justify-center">
//           <Icon size={20} className="text-primary" />
//         </div>

//         <div className="flex-1">
//           <div className="flex items-center gap-3">
//             <span className="text-xs font-bold tracking-wider text-primary">
//               {number}
//             </span>

//             <h2 className="text-xl lg:text-2xl font-semibold">
//               {title}
//             </h2>
//           </div>

//           <div className="mt-5 space-y-4 text-muted-foreground leading-7">
//             {children}
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default TermsPage;

import { Link } from "react-router-dom";

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

          <a
            href="mailto:mahanandakart@gmail.com"
            className="mt-2 inline-block text-muted-foreground transition-colors hover:text-primary"
          >
            mahanandakart@gmail.com
          </a>
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