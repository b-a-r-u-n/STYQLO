import React from 'react'
import { Link } from "react-router-dom";

const sections = [
    {
        id: "website-disclaimer",
        number: "01",
        title: "Website Disclaimer",
        content: (
            <>
                <p>
                    The information provided by <strong>STYQLO</strong>, operated by{" "}
                    <strong>Mahananda Kart</strong> ("Company", "we", "our", or "us") on{" "}
                    <strong>styqlo.com</strong> (the "Site") is provided for general
                    informational purposes only.
                </p>

                <p>
                    We make reasonable efforts to ensure that the information available
                    on the Site is accurate and up to date. However, we make no
                    representation or warranty, express or implied, regarding the
                    accuracy, adequacy, validity, reliability, availability, or
                    completeness of any information provided on the Site.
                </p>

                <p>
                    Product descriptions, photographs, specifications, availability,
                    pricing, promotions, and other information may change without prior
                    notice.
                </p>

                <p>
                    To the maximum extent permitted by applicable law, your use of the
                    Site and your reliance on any information provided through the Site
                    is at your own risk.
                </p>
            </>
        ),
    },

    {
        id: "external-links",
        number: "02",
        title: "External Links Disclaimer",
        content: (
            <>
                <p>
                    The Site may contain links to websites, services, applications, or
                    other content operated or provided by third parties.
                </p>

                <p>
                    These external links are provided for convenience and informational
                    purposes. STYQLO does not control these third-party websites or
                    services and does not necessarily investigate, monitor, or verify
                    their accuracy, adequacy, validity, reliability, availability, or
                    completeness.
                </p>

                <p>
                    The inclusion of any external link does not necessarily imply that
                    STYQLO or Mahananda Kart endorses, sponsors, or recommends the linked
                    website, service, product, or content.
                </p>

                <p>
                    You access and use third-party websites and services at your own
                    discretion and risk. We recommend reviewing the terms and privacy
                    policies applicable to any third-party service you use.
                </p>
            </>
        ),
    },

    {
        id: "third-party-services",
        number: "03",
        title: "Third-Party Services & Transactions",
        content: (
            <>
                <p>
                    STYQLO may rely on third-party providers for certain services,
                    including payment processing, shipping and delivery, website
                    hosting, analytics, communication, and other operational functions.
                </p>

                <p>
                    While we work with service providers that we believe to be
                    appropriate for our business operations, STYQLO does not guarantee
                    the uninterrupted availability, accuracy, or performance of
                    third-party services.
                </p>

                <p>
                    Any transaction or interaction between you and a third-party
                    provider is subject to the terms and policies of that provider.
                </p>

                <p>
                    To the extent permitted by applicable law, STYQLO and Mahananda Kart
                    are not responsible for losses or damages arising directly from the
                    acts, omissions, services, or failures of independent third-party
                    providers.
                </p>
            </>
        ),
    },

    {
        id: "errors-omissions",
        number: "04",
        title: "Errors & Omissions Disclaimer",
        content: (
            <>
                <p>
                    While we make reasonable efforts to maintain accurate information on
                    the Site, errors or omissions may occasionally occur.
                </p>

                <p>
                    STYQLO does not guarantee that all information available on the Site
                    will always be complete, accurate, current, or free from errors.
                </p>

                <p>
                    This may include, without limitation, information relating to
                    product descriptions, images, sizes, colors, prices, discounts,
                    availability, shipping information, or other website content.
                </p>

                <p>
                    If we discover an error in product information or pricing, we
                    reserve the right to correct the information and, where appropriate,
                    cancel or modify an affected order in accordance with applicable law
                    and our policies.
                </p>

                <p>
                    To the maximum extent permitted by applicable law, STYQLO and
                    Mahananda Kart shall not be responsible for decisions or actions
                    taken solely in reliance on information that may contain errors or
                    omissions.
                </p>
            </>
        ),
    },

    {
        id: "product-information",
        number: "05",
        title: "Product Information Disclaimer",
        content: (
            <>
                <p>
                    We make reasonable efforts to display our products as accurately as
                    possible.
                </p>

                <p>
                    However, the appearance of colors, patterns, textures, and other
                    visual characteristics may vary depending on your device, monitor,
                    screen settings, lighting conditions, and other factors.
                </p>

                <p>
                    Measurements and product specifications provided on the Site are
                    intended as a general guide. Please review the applicable size guide
                    and product information before placing an order.
                </p>

                <p>
                    Product availability may change at any time, and we do not guarantee
                    that a particular product or size will remain available.
                </p>
            </>
        ),
    },

    {
        id: "availability",
        number: "06",
        title: "Website Availability Disclaimer",
        content: (
            <>
                <p>
                    We aim to keep STYQLO available and functioning reliably. However,
                    we do not guarantee that the Site will always be available,
                    uninterrupted, secure, or free from errors.
                </p>

                <p>
                    The Site may occasionally become unavailable due to maintenance,
                    updates, technical problems, network failures, hosting issues,
                    security incidents, or circumstances beyond our reasonable control.
                </p>

                <p>
                    We reserve the right to modify, suspend, restrict, or discontinue any
                    part of the Site or its features without prior notice where
                    reasonably necessary.
                </p>
            </>
        ),
    },

    {
        id: "logos-trademarks",
        number: "07",
        title: "Logos & Trademarks Disclaimer",
        content: (
            <>
                <p>
                    STYQLO, its name, logo, designs, graphics, and other brand elements
                    are owned by or used by <strong>Mahananda Kart</strong> and may be
                    protected by applicable intellectual property laws.
                </p>

                <p>
                    All third-party names, logos, trademarks, product names, and brand
                    names referenced on <strong>styqlo.com</strong> belong to their
                    respective owners.
                </p>

                <p>
                    The inclusion of any third-party trademark, logo, or brand name on
                    the Site does not imply approval, endorsement, sponsorship, or
                    affiliation with STYQLO unless expressly stated.
                </p>
            </>
        ),
    },

    {
        id: "professional-advice",
        number: "08",
        title: "No Professional Advice",
        content: (
            <>
                <p>
                    The information provided through STYQLO is intended for general
                    informational and shopping purposes.
                </p>

                <p>
                    Nothing on the Site should be interpreted as professional, legal,
                    financial, medical, or other specialized advice.
                </p>

                <p>
                    You should obtain appropriate professional advice where necessary
                    before making decisions that require specialized expertise.
                </p>
            </>
        ),
    },

    {
        id: "limitation-liability",
        number: "09",
        title: "Limitation of Liability",
        content: (
            <>
                <p>
                    To the maximum extent permitted by applicable law, STYQLO and
                    Mahananda Kart shall not be liable for any indirect, incidental,
                    special, consequential, or punitive loss or damage arising from or
                    related to your use of the Site or reliance on information provided
                    through the Site.
                </p>

                <p>
                    This includes, where permitted by law, losses arising from website
                    interruptions, technical errors, inaccurate information, third-party
                    services, or inability to access the Site.
                </p>

                <p>
                    Nothing in this Disclaimer is intended to exclude or limit any
                    liability that cannot legally be excluded or limited under
                    applicable law.
                </p>
            </>
        ),
    },

    {
        id: "changes",
        number: "10",
        title: "Changes to This Disclaimer",
        content: (
            <>
                <p>
                    We may update or modify this Disclaimer from time to time to reflect
                    changes in our services, website, business practices, or applicable
                    legal requirements.
                </p>

                <p>
                    Any updated version will be posted on this page with a revised "Last
                    updated" date.
                </p>

                <p>
                    We encourage you to review this page periodically to remain informed
                    about any changes.
                </p>
            </>
        ),
    },

    {
        id: "contact",
        number: "11",
        title: "Contact Us",
        content: (
            <>
                <p>
                    If you have any feedback, comments, technical support requests, or
                    other questions regarding this Disclaimer or STYQLO, please contact
                    us.
                </p>

                <div className="mt-6 rounded-2xl border border-border bg-primary-lighter p-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-rose-dark">
                        Contact Information
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

const DisclaimerPage = () => {
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
                            STYQLO · Legal
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                            Disclaimer
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                            Important information about the use of the STYQLO website,
                            product information, third-party services, and external links.
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

                    {/* Disclaimer Content */}
                    <article className="min-w-0">
                        <div className="card-luxury overflow-hidden">
                            <div className="p-6 sm:p-10 lg:p-12">

                                {/* Notice */}
                                <div className="mb-10 rounded-2xl border border-border bg-primary-lighter/60 p-6">
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        The information provided on STYQLO is intended for general
                                        informational and shopping purposes. Please review this
                                        Disclaimer together with our{" "}
                                        <Link
                                            to="/privacy-policy"
                                            className="font-semibold text-rose-dark underline underline-offset-4 hover:text-primary"
                                        >
                                            Privacy Policy
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            to="/terms"
                                            className="font-semibold text-rose-dark underline underline-offset-4 hover:text-primary"
                                        >
                                            Terms & Conditions
                                        </Link>
                                        .
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

                                {/* Final Note */}
                                <div className="mt-12 rounded-2xl border border-border bg-luxury p-6 sm:p-8">
                                    <p className="text-sm leading-7 text-muted-foreground">
                                        By accessing or using STYQLO, you acknowledge that you have
                                        read and understood this Disclaimer.
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

export default DisclaimerPage
