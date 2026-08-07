import React from 'react';
import { ShieldAlert, RefreshCw, ShoppingBag } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const PaymentVerificationFailed = () => {

    const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-luxury flex items-center justify-center px-5 py-10">
      <div className="card-luxury w-full max-w-xl p-10 md:p-14 text-center animate-fade-in-up">

        {/* Icon */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-amber-100 border border-amber-200 shadow-card">
          <ShieldAlert
            size={60}
            className="text-amber-600"
            strokeWidth={2.2}
          />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-4xl font-bold text-foreground">
          Unable to Verify Payment
        </h1>

        {/* Description */}
        <p className="mt-5 text-muted-foreground leading-7">
          Your payment could not be verified at this moment.
          <br />
          <span className="font-semibold text-foreground">
            If your bank account has been charged, please don't make another payment.
          </span>
        </p>

        {/* Information Card */}
        <div className="mt-8 rounded-2xl border border-border bg-primary/5 p-5 text-left">
          <h3 className="font-semibold text-foreground">
            What should you do?
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Wait a few minutes and check your order status.</li>
            <li>If the payment was successful, we'll update it automatically.</li>
            <li>If the payment wasn't completed, you can try again later.</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4">

          <button
            onClick={() => navigate("/orders")}
            className="w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-luxury hover:shadow-hover hover:-translate-y-1"
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingBag size={20} />
              Check My Orders
            </span>
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full rounded-2xl border border-border bg-card py-4 font-semibold text-foreground transition-luxury hover:bg-primary/5 hover:border-primary"
          >
            <span className="flex items-center justify-center gap-2">
              <RefreshCw size={18} />
              Try Verification Again
            </span>
          </button>

        </div>
      </div>
    </section>
  )
}

export default PaymentVerificationFailed
