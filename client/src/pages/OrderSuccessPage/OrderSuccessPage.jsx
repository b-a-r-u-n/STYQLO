import React from 'react';
import { CircleCheckBig, ShoppingBag } from "lucide-react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../features/orderSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const OrderSuccessPage = () => {

  const { loading, orderDatas } = useSelector(state => state.order)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  if (location.state?.from !== "checkout" && location.state?.from !== "pending") {
    return <Navigate to="/" replace />;
  }

  const handleClick = async () => {
    navigate("/orders");
  }

  if (loading && !orderDatas.length) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-luxury mx-auto mb-4" />
          <p className="text-sm text-[#9B7B75] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-luxury flex items-center justify-center px-5 py-10">
      <div className="card-luxury w-full max-w-xl p-10 md:p-14 text-center animate-fade-in-up">

        {/* Success Icon */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-card">
          <CircleCheckBig
            size={64}
            className="text-primary"
            strokeWidth={2.2}
          />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-gradient text-4xl font-bold">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="mt-5 text-muted-foreground leading-7 text-base">
          Thank you for shopping with <span className="font-semibold text-foreground">STYQLO</span>.
          <br />
          Your payment has been verified and your order has been placed successfully.
        </p>

        {/* Divider */}
        <div className="my-8 h-px bg-border"></div>

        {/* Status Card */}
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5">
          <p className="font-semibold text-foreground">
            What's next?
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            You'll receive an order confirmation shortly.
            You can track your shipment anytime from your Orders page.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4">

          <button
            onClick={handleClick}
            className="w-full rounded-2xl bg-primary py-4 font-semibold text-primary-foreground transition-luxury hover:shadow-hover hover:-translate-y-1"
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingBag size={20} />
              View My Orders
            </span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full rounded-2xl border border-border bg-card py-4 font-semibold text-foreground transition-luxury hover:bg-primary/5 hover:border-primary"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </section>
  )
}

export default OrderSuccessPage
