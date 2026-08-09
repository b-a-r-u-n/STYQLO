import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  Truck,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const AdminReturnDetailsPage = () => {
  const navigate = useNavigate();
  const { returnId } = useParams();

  // Replace this with API data
  const [returnStatus, setReturnStatus] =
    useState("Pending");

  const [refundStatus, setRefundStatus] =
    useState("NotStarted");

  const returnRequest = {
    id: returnId || "RET-1001",

    orderId: "STYQLO-1001",

    requestedAt: "09 Aug 2026, 03:20 PM",

    reason: "Size doesn't fit",

    description:
      "The product is good but the size is slightly larger than expected.",

    customer: {
      name: "Rahul Kumar",
      email: "rahul@example.com",
      phone: "+91 98765 43210",
    },

    shippingAddress: {
      address: "Main Road, Civil Township",
      city: "Rourkela",
      state: "Odisha",
      pinCode: "769004",
    },

    product: {
      name: "Premium Oversized T-Shirt",
      size: "L",
      quantity: 1,
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    },

    payment: {
      method: "Razorpay",
      status: "Paid",
      razorpayOrderId: "order_RZP123456",
      razorpayPaymentId: "pay_RZP123456",
    },

    refundAmount: 1499,
  };


  // =================================================
  // STATUS STEPS
  // =================================================

  const statusSteps = [
    {
      name: "Pending",
      icon: Clock3,
    },
    {
      name: "Approved",
      icon: CheckCircle2,
    },
    {
      name: "Received",
      icon: Package,
    },
    {
      name: "Refunded",
      icon: CreditCard,
    },
    {
      name: "Completed",
      icon: Check,
    },
  ];


  const currentIndex = statusSteps.findIndex(
    (step) => step.name === returnStatus
  );


  // =================================================
  // APPROVE
  // =================================================

  const handleApprove = async () => {
    try {
      // await approveReturn(returnRequest.id);

      setReturnStatus("Approved");

      toast.success("Return request approved");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to approve return request"
      );
    }
  };


  // =================================================
  // REJECT
  // =================================================

  const handleReject = async () => {
    try {
      // await rejectReturn(returnRequest.id);

      setReturnStatus("Rejected");

      toast.success("Return request rejected");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to reject return request"
      );
    }
  };


  // =================================================
  // MARK RECEIVED
  // =================================================

  const handleReceived = async () => {
    try {
      // await markReturnReceived(returnRequest.id);

      setReturnStatus("Received");

      toast.success("Return marked as received");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update return"
      );
    }
  };


  // =================================================
  // REFUND
  // =================================================

  const handleRefund = async () => {
    try {
      // await createRefund(returnRequest.id);

      setRefundStatus("Processing");

      toast.success(
        "Refund processing started"
      );

      // In production, update this based on
      // your Razorpay refund API response.

    } catch (error) {
      console.error(error);

      setRefundStatus("Failed");

      toast.error(
        "Failed to process refund"
      );
    }
  };


  // =================================================
  // COMPLETE
  // =================================================

  const handleComplete = async () => {
    try {
      // await completeReturn(returnRequest.id);

      setReturnStatus("Completed");

      setRefundStatus("Completed");

      toast.success(
        "Return completed successfully"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to complete return"
      );
    }
  };


  return (
    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-7">

          <button
            onClick={() =>
              navigate("/admin/returns")
            }
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={18} />

            Back to Returns
          </button>


          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>

              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Return Details
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">

                #{returnRequest.id}

                {" · "}

                Order #{returnRequest.orderId}

              </p>

            </div>


            {/* STATUS */}

            <div
              className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                returnStatus === "Pending"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : returnStatus === "Rejected"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : returnStatus === "Completed"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-primary/20 bg-primary/10 text-primary"
              }`}
            >

              <Clock3 size={16} />

              {returnStatus}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* RETURN PROGRESS */}
        {/* ================================================= */}

        {returnStatus !== "Rejected" && (

          <section className="card-luxury mb-6 p-5 sm:p-7">

            <div>

              <h2 className="text-lg font-bold text-foreground">
                Return Progress
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Track the return and refund process.
              </p>

            </div>


            {/* DESKTOP */}

            <div className="mt-8 hidden md:block">

              <div className="relative flex items-start justify-between">

                {/* BASE LINE */}

                <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" />


                {/* PROGRESS LINE */}

                <div
                  className="absolute left-0 top-4 h-0.5 bg-primary transition-all duration-500"
                  style={{
                    width:
                      currentIndex >= 0
                        ? `${(currentIndex /
                            (statusSteps.length - 1)) *
                          100}%`
                        : "0%",
                  }}
                />


                {statusSteps.map(
                  (step, index) => {

                    const Icon =
                      step.icon;

                    const completed =
                      index <= currentIndex;

                    return (

                      <div
                        key={step.name}
                        className="relative z-10 flex flex-col items-center"
                      >

                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                            completed
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card text-muted-foreground"
                          }`}
                        >

                          <Icon size={17} />

                        </div>


                        <p
                          className={`mt-3 text-xs font-semibold ${
                            completed
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {step.name}
                        </p>

                      </div>

                    );
                  }
                )}

              </div>

            </div>


            {/* MOBILE */}

            <div className="mt-6 space-y-3 md:hidden">

              {statusSteps.map(
                (step, index) => {

                  const Icon =
                    step.icon;

                  const completed =
                    index <= currentIndex;

                  return (

                    <div
                      key={step.name}
                      className={`flex items-center gap-3 rounded-xl border p-3 ${
                        completed
                          ? "border-primary/20 bg-primary/5"
                          : "border-border"
                      }`}
                    >

                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          completed
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >

                        <Icon size={17} />

                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          completed
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.name}
                      </span>

                    </div>

                  );
                }
              )}

            </div>


            {/* ACTIONS */}

            <div className="mt-8 border-t border-border pt-6">

              {returnStatus === "Pending" && (

                <div className="flex flex-col gap-3 sm:flex-row">

                  <button
                    onClick={handleApprove}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                  >

                    <Check size={18} />

                    Approve Return

                  </button>


                  <button
                    onClick={handleReject}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 font-semibold text-red-600 transition-luxury hover:bg-red-100"
                  >

                    <X size={18} />

                    Reject Return

                  </button>

                </div>

              )}


              {returnStatus === "Approved" && (

                <button
                  onClick={handleReceived}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >

                  <Package size={18} />

                  Mark Product as Received

                </button>

              )}


              {returnStatus === "Received" && (

                <button
                  onClick={handleRefund}
                  disabled={
                    refundStatus ===
                    "Processing"
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <CreditCard size={18} />

                  {refundStatus ===
                  "Processing"
                    ? "Refund Processing..."
                    : "Process Refund"}

                </button>

              )}


              {returnStatus === "Refunded" && (

                <button
                  onClick={handleComplete}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >

                  <CheckCircle2 size={18} />

                  Complete Return

                </button>

              )}


              {returnStatus === "Completed" && (

                <div className="flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3.5 font-semibold text-green-700">

                  <CheckCircle2 size={18} />

                  Return Completed

                </div>

              )}


              {returnStatus === "Rejected" && (

                <div className="flex items-center justify-center gap-2 rounded-xl bg-red-50 py-3.5 font-semibold text-red-700">

                  <XCircle size={18} />

                  Return Request Rejected

                </div>

              )}

            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">


          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <div className="space-y-6">


            {/* PRODUCT */}

            <section className="card-luxury overflow-hidden">

              <div className="border-b border-border p-5 sm:p-6">

                <h2 className="text-lg font-bold text-foreground">
                  Returned Product
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Product requested for return
                </p>

              </div>


              <div className="flex gap-4 p-5 sm:p-6">

                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-32">

                  <img
                    src={returnRequest.product.image}
                    alt={returnRequest.product.name}
                    className="h-full w-full object-cover"
                  />

                </div>


                <div className="min-w-0">

                  <h3 className="text-lg font-semibold text-foreground">
                    {returnRequest.product.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">

                    <span>
                      Size:{" "}
                      {returnRequest.product.size}
                    </span>

                    <span>
                      Quantity:{" "}
                      {returnRequest.product.quantity}
                    </span>

                  </div>

                  <p className="mt-4 text-xl font-bold text-foreground">

                    ₹
                    {returnRequest.product.price.toLocaleString(
                      "en-IN"
                    )}

                  </p>

                </div>

              </div>

            </section>


            {/* RETURN REASON */}

            <section className="card-luxury p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                  <RotateCcw
                    size={20}
                    className="text-primary"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-foreground">
                    Return Reason
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Customer's return request
                  </p>

                </div>

              </div>


              <div className="mt-5 rounded-2xl border border-border bg-primary/5 p-5">

                <p className="font-semibold text-foreground">
                  {returnRequest.reason}
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {returnRequest.description}
                </p>

              </div>

            </section>


            {/* CUSTOMER */}

            <section className="card-luxury p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                  <User
                    size={20}
                    className="text-primary"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-foreground">
                    Customer Information
                  </h2>

                </div>

              </div>


              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>

                  <p className="text-xs text-muted-foreground">
                    Name
                  </p>

                  <p className="mt-1 font-semibold text-foreground">
                    {returnRequest.customer.name}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <p className="mt-1 flex items-center gap-2 font-semibold text-foreground">

                    <Phone size={15} />

                    {returnRequest.customer.phone}

                  </p>

                </div>


                <div className="sm:col-span-2">

                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 break-all font-semibold text-foreground">
                    {returnRequest.customer.email}
                  </p>

                </div>

              </div>

            </section>


            {/* ADDRESS */}

            <section className="card-luxury p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                  <MapPin
                    size={20}
                    className="text-primary"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-foreground">
                    Customer Address
                  </h2>

                </div>

              </div>


              <div className="mt-5 rounded-2xl border border-border bg-primary/5 p-5">

                <p className="text-sm leading-6 text-muted-foreground">

                  {returnRequest.shippingAddress.address}
                  <br />

                  {returnRequest.shippingAddress.city},{" "}
                  {returnRequest.shippingAddress.state}
                  <br />

                  PIN:{" "}
                  {returnRequest.shippingAddress.pinCode}

                </p>

              </div>

            </section>

          </div>


          {/* ================================================= */}
          {/* RIGHT */}
          {/* ================================================= */}

          <div className="space-y-6">


            {/* REFUND */}

            <section className="card-luxury p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                  <CreditCard
                    size={20}
                    className="text-primary"
                  />

                </div>

                <div>

                  <h2 className="font-bold text-foreground">
                    Refund
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Refund information
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between gap-4">

                  <span className="text-muted-foreground">
                    Refund Amount
                  </span>

                  <span className="font-bold text-foreground">

                    ₹
                    {returnRequest.refundAmount.toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="flex justify-between gap-4">

                  <span className="text-muted-foreground">
                    Refund Status
                  </span>

                  <span
                    className={`font-semibold ${
                      refundStatus ===
                      "Completed"
                        ? "text-green-600"
                        : refundStatus ===
                          "Failed"
                          ? "text-red-600"
                          : "text-primary"
                    }`}
                  >
                    {refundStatus}
                  </span>

                </div>


                <div className="border-t border-border pt-4">

                  <p className="text-xs leading-5 text-muted-foreground">

                    Refund should only be processed
                    after the returned product has
                    been received and verified.

                  </p>

                </div>

              </div>

            </section>


            {/* PAYMENT */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Original Payment
              </h2>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between gap-4">

                  <span className="text-muted-foreground">
                    Method
                  </span>

                  <span className="font-semibold text-foreground">
                    {returnRequest.payment.method}
                  </span>

                </div>


                <div className="flex justify-between gap-4">

                  <span className="text-muted-foreground">
                    Status
                  </span>

                  <span className="font-semibold text-green-600">
                    {returnRequest.payment.status}
                  </span>

                </div>

              </div>

            </section>


            {/* TRANSACTION */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Transaction Details
              </h2>


              <div className="mt-5 space-y-5">

                <div>

                  <p className="text-xs text-muted-foreground">
                    Razorpay Order ID
                  </p>

                  <p className="mt-1 break-all text-xs font-medium text-foreground">
                    {returnRequest.payment.razorpayOrderId}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-muted-foreground">
                    Razorpay Payment ID
                  </p>

                  <p className="mt-1 break-all text-xs font-medium text-foreground">
                    {returnRequest.payment.razorpayPaymentId}
                  </p>

                </div>

              </div>

            </section>


            {/* RETURN DATE */}

            <section className="card-luxury p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <Clock3
                  size={19}
                  className="text-primary"
                />

                <div>

                  <p className="text-xs text-muted-foreground">
                    Return Requested
                  </p>

                  <p className="mt-1 font-semibold text-foreground">
                    {returnRequest.requestedAt}
                  </p>

                </div>

              </div>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
};

export default AdminReturnDetailsPage;