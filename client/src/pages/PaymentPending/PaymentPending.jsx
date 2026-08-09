import { LoaderCircle, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getOrderById } from "../../features/orderSlice";
import { clearBuy } from "../../features/cartSlice";
// import { getPaymentStatus } from "../api/payment"; // Your API

const PaymentPending = () => {

  const {currentOrderId} = useSelector(state => state.order);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  

  if (location.state?.from !== "checkout") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (!currentOrderId) return;

    const checkStatus = async () => {
      try {
        const res = await dispatch(getOrderById(currentOrderId)).unwrap();

        if (res.paymentStatus === "Paid") {
          navigate("/payment/success", {
            state: {
              from: "pending"
            }
          });

          await dispatch(clearBuy());
          await dispatch(clearCart())
        }

        if (res.paymentStatus === "Failed") {
          navigate("/payment/verification-failed", {
            state: {
              from: "pending"
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Check immediately
    // checkStatus();

    // Check every 5 seconds
    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, [currentOrderId, navigate]);

  return (
    <section className="min-h-screen bg-luxury flex items-center justify-center px-5">
      <div className="card-luxury max-w-xl w-full p-10 text-center animate-fade-in-up">

        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
          <LoaderCircle
            className="text-primary animate-spin"
            size={60}
            strokeWidth={2}
          />
        </div>

        <h1 className="mt-8 text-4xl font-bold text-gradient">
          Verifying Payment
        </h1>

        <p className="mt-5 text-muted-foreground leading-7">
          We're securely verifying your payment with Razorpay.
          <br />
          This usually takes only a few seconds.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-primary/5 p-5">

          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="text-primary" size={22} />

            <span className="font-semibold text-foreground">
              Please don't close this page.
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            If your bank account has already been charged,
            your order will automatically be updated after verification.
          </p>

        </div>

        <div className="mt-10">

          <div className="spinner-luxury mx-auto"></div>

          <p className="mt-4 text-sm text-muted-foreground">
            Auto checking every 5 seconds...
          </p>

        </div>

      </div>
    </section>
  );
};

export default PaymentPending;