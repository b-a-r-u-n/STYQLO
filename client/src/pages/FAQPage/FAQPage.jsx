import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  Ruler,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const categories = [
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
  },
  {
    id: "shipping",
    label: "Shipping",
    icon: Truck,
  },
  {
    id: "returns",
    label: "Returns",
    icon: RotateCcw,
  },
  {
    id: "size",
    label: "Size",
    icon: Ruler,
  },
];

const faqData = {
  orders: [
    {
      question: "How can I place an order?",
      answer:
        "Browse the STYQLO collection, select the product and size you want, add it to your cart, and proceed to checkout. Enter your delivery details and complete the payment to place your order.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You may be able to cancel your order before it has been shipped. Once an order has been shipped, cancellation may no longer be available. Please contact our support team as soon as possible if you need to cancel an order.",
    },
    {
      question: "How can I check my order status?",
      answer:
        "You can view your order status from your STYQLO account under your orders section. Once your order is shipped, tracking information will also be available when provided by the courier.",
    },
    {
      question: "I received the wrong product. What should I do?",
      answer:
        "Please contact STYQLO support as soon as possible with your order details and photos of the product you received. Our team will review the issue and help you with the next steps.",
    },
  ],

  payment: [
    {
      question: "What payment methods do you accept?",
      answer:
        "STYQLO supports online payments through the payment methods available at checkout. Available options may include UPI, credit cards, debit cards, net banking, and other supported payment methods.",
    },
    {
      question: "Is my payment secure?",
      answer:
        "Yes. Payments are processed through our secure payment gateway. STYQLO does not directly store your complete card details.",
    },
    {
      question: "My payment was successful but my order is not confirmed. What should I do?",
      answer:
        "Sometimes payment confirmation can take a short time to reach our system. Please check your order status first. If the payment was deducted but your order remains pending, contact our support team with your payment and order details.",
    },
    {
      question: "What happens if my payment fails?",
      answer:
        "If your payment fails, your order will not be confirmed. You can try the payment again using another available payment method.",
    },
  ],

  shipping: [
    {
      question: "Where does STYQLO deliver?",
      answer:
        "STYQLO currently delivers to serviceable locations within India. Delivery availability is confirmed based on the address and PIN code entered during checkout.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery time depends on your location, courier availability, and other factors. The estimated delivery time will be shown during the order process whenever available.",
    },
    {
      question: "How can I track my shipment?",
      answer:
        "Once your order has been shipped, tracking information will be provided through your order details. You can use the tracking information to follow your shipment with the courier.",
    },
    {
      question: "Why is my shipment delayed?",
      answer:
        "Delivery can occasionally be delayed because of weather, courier operational issues, holidays, high order volumes, or other unforeseen circumstances. Please check your latest tracking status for updates.",
    },
  ],

  returns: [
    {
      question: "Can I return a product?",
      answer:
        "Eligible products can be returned according to the STYQLO return policy. Products must meet the applicable return conditions, including being unused and in acceptable original condition.",
    },
    {
      question: "How do I request a return?",
      answer:
        "Log in to your STYQLO account, open your order, select the eligible product you want to return, and submit a return request with the required information.",
    },
    {
      question: "Can I return only one item from a multiple-item order?",
      answer:
        "Yes, when the product is eligible for return, you can request a return for the specific item rather than returning the entire order.",
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Refund timing depends on the return approval, product collection or verification process, and your payment method or bank. Once the refund is initiated, the applicable processing time will depend on the payment provider.",
    },
  ],

  size: [
    {
      question: "How do I choose the right size?",
      answer:
        "Use the STYQLO Size Guide to compare your measurements with our size chart. We recommend checking the measurements for the specific product before placing your order.",
    },
    {
      question: "What sizes are available?",
      answer:
        "STYQLO currently offers sizes S, M, L, XL, and XXL for products where those sizes are available. Size availability can vary by product.",
    },
    {
      question: "What if I am between two sizes?",
      answer:
        "If your measurements fall between two sizes, consider your preferred fit. You can also contact our support team if you need help choosing between sizes.",
    },
    {
      question: "Where can I find the measurements?",
      answer:
        "You can find the measurements for available products on the individual product page. You can also visit our Size Guide for general sizing information.",
    },
  ],
};

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [openIndex, setOpenIndex] = useState(null);

  const activeQuestions = faqData[activeCategory];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenIndex(null);
  };

  const handleQuestionClick = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-luxury py-24 lg:py-32">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
              HELP CENTER
            </span>

            <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Frequently
              <br />
              <span className="text-gradient">asked questions.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Find quick answers to common questions about your STYQLO orders,
              payments, shipping, returns, and sizing.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border font-semibold transition-luxury ${
                    isActive
                      ? "bg-primary border-primary text-foreground shadow-soft"
                      : "bg-card border-border hover:bg-primary-lighter"
                  }`}
                >
                  <Icon size={18} />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Questions */}
          <div className="max-w-4xl mx-auto mt-14">
            <div className="flex items-center gap-3 mb-7">
              {(() => {
                const active = categories.find(
                  (category) => category.id === activeCategory
                );

                const Icon = active.icon;

                return (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-primary-lighter flex items-center justify-center">
                      <Icon size={19} className="text-primary" />
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-semibold">
                      {active.label} Questions
                    </h2>
                  </>
                );
              })()}
            </div>

            <div className="space-y-3">
              {activeQuestions.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.question}
                    className={`border border-border rounded-2xl bg-card overflow-hidden transition-luxury ${
                      isOpen ? "shadow-soft" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleQuestionClick(index)}
                      className="w-full flex items-center justify-between gap-6 text-left px-6 py-6"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base lg:text-lg font-semibold">
                        {item.question}
                      </span>

                      <span
                        className={`shrink-0 w-9 h-9 rounded-full bg-primary-lighter flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className="text-primary"
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6 pr-16 text-muted-foreground leading-7">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SIZE GUIDE CTA ================= */}
      <section className="bg-[#F5EAE7] py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="card-luxury bg-white p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-lighter flex items-center justify-center">
                <Ruler size={24} className="text-primary" />
              </div>

              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold">
                  Need help choosing your size?
                </h2>

                <p className="mt-2 text-muted-foreground leading-6">
                  Check our detailed size chart and measurement guide.
                </p>
              </div>
            </div>

            <Link
              to="/size-guide"
              className="shrink-0 inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
            >
              Size Guide
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto rounded-[2rem] bg-luxury-warm overflow-hidden">
          <div className="px-8 py-16 lg:px-20 lg:py-20 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center">
              <HelpCircle size={24} />
            </div>

            <h2 className="mt-6 text-4xl lg:text-5xl font-bold">
              Still have questions?
            </h2>

            <p className="mt-5 max-w-xl mx-auto text-foreground/70">
              Our support team is happy to help with anything you need.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-foreground text-white font-semibold transition-luxury hover:-translate-y-0.5 hover:shadow-luxury"
            >
              Contact STYQLO
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage;