import { ArrowLeft, Check, CheckCircle2, Clock3, CreditCard, MapPin, Package, Phone, RotateCcw, Truck, User, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById, updateOrder } from "../../../features/orderSlice";

const AdminOrderDetailsPage = () => {

  const { loading, orderData } = useSelector(state => state.order);

  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const [orderStatus, setOrderStatus] = useState("Pending");

  const fetchData = async () => {
    try {
      const res = await dispatch(getOrderById(orderId)).unwrap();
      // console.log(res);

    } catch (error) {
      toast.error(error?.message || error?.data?.message || "Failed to fetch order");
    }
  }

  // console.log(orderData);


  useEffect(() => {
    fetchData();
  }, [])

  const handleAcceptAndReject = async (string) => {
      let url = "";
      if (string === "accepted")
        url = "?orderStatus=Confirmed";
      else if (string === "rejected")
        url = "?orderStatus=Rejected";
  
      try {
        const res = await dispatch(updateOrder({orderId, url})).unwrap();
        fetchData();
        // console.log(res);
        
        toast.success(`Order ${string} successfully`);
      } catch (error) {
        // console.error(error);
        toast.error(error?.message || error?.data?.message || "Failed to fetch orders");
      }
    }

  
  
  const handleStatusChange = async (status) => {
    try {
      // await updateOrderStatus(order.id, status);
      
      setOrderStatus(status);
      
      toast.success(`Order marked as ${status}`);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };
  
  const statusSteps = [
    {
      name: "Pending",
      icon: Clock3,
    },
    {
      name: "Confirmed",
      icon: CheckCircle2,
    },
    {
      name: "Packed",
      icon: Package,
    },
    {
      name: "Shipped",
      icon: Truck,
    },
    {
      name: "Delivered",
      icon: Check,
    },
  ];
  
  const currentIndex = statusSteps.findIndex(
    (step) => step.name === orderData?.orderStatus
  );

  if (loading) {
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
    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mb-7">

          <button
            // onClick={() => navigate("/admin/orders")}
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>

              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Order Details
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                #{orderData?.orderId} · {new Date(orderData?.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                })}
              </p>

            </div>

            {/* CURRENT STATUS */}

            <div className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">

              <Clock3 size={16} />

              {orderData?.orderStatus}

            </div>

          </div>

        </div>


        {/* ========================================= */}
        {/* ORDER STATUS */}
        {/* ========================================= */}

        <section className="card-luxury mb-6 p-5 sm:p-7">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-bold text-foreground">
                Order Progress
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Manage the current order status.
              </p>

            </div>

          </div>


          {/* DESKTOP TIMELINE */}

          <div className="mt-8 hidden md:block">

            <div className="relative flex items-start justify-between">

              {/* LINE */}

              <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" />

              <div
                className="absolute left-0 top-4 h-0.5 bg-primary transition-all duration-500"
                style={{
                  width:
                    currentIndex >= 0
                      ? `${(currentIndex / (statusSteps.length - 1)) * 100}%`
                      : "0%",
                }}
              />

              {statusSteps.map((step, index) => {

                const Icon = step.icon;

                const completed =
                  index <= currentIndex;

                return (
                  <div
                    key={step.name}
                    className="relative z-10 flex flex-col items-center"
                  >

                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground"
                        }`}
                    >
                      <Icon size={17} />
                    </div>

                    <p
                      className={`mt-3 text-xs font-semibold ${completed
                        ? "text-primary"
                        : "text-muted-foreground"
                        }`}
                    >
                      {step.name}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>


          {/* MOBILE STATUS */}

          <div className="mt-6 space-y-3 md:hidden">

            {statusSteps.map((step, index) => {

              const Icon = step.icon;

              const completed =
                index <= currentIndex;

              return (
                <div
                  key={step.name}
                  className={`flex items-center gap-3 rounded-xl border p-3 ${completed
                    ? "border-primary/20 bg-primary/5"
                    : "border-border"
                    }`}
                >

                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${completed
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <Icon size={17} />
                  </div>

                  <span
                    className={`text-sm font-semibold ${completed
                      ? "text-primary"
                      : "text-muted-foreground"
                      }`}
                  >
                    {step.name}
                  </span>

                </div>
              );
            })}

          </div>


          {/* ACTIONS */}

          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">

            {orderData?.orderStatus === "Pending" && (
              <>
                <button
                  onClick={() => {
                    handleAcceptAndReject("accepted")
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >
                  <Check size={18} />
                  Accept Order
                </button>

                <button
                  onClick={() => {
                    handleAcceptAndReject("rejected")
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 font-semibold text-red-600 transition-luxury hover:bg-red-100"
                >
                  <X size={18} />
                  Reject Order
                </button>
              </>
            )}

            {orderData?.orderStatus === "Confirmed" && (
              <button
                onClick={() => handleStatusChange("Packed")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
              >
                <Package size={18} />
                Mark as Packed
              </button>
            )}

            {orderData?.orderStatus === "Packed" && (
              <button
                onClick={() => handleStatusChange("Shipped")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
              >
                <Truck size={18} />
                Mark as Shipped
              </button>
            )}

            {orderData?.orderStatus === "Shipped" && (
              <button
                onClick={() => handleStatusChange("Delivered")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
              >
                <CheckCircle2 size={18} />
                Mark as Delivered
              </button>
            )}

            {orderData?.orderStatus === "Delivered" && (
              <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 py-3.5 font-semibold text-green-700">
                <CheckCircle2 size={18} />
                Order Delivered
              </div>
            )}

          </div>

        </section>


        {/* ========================================= */}
        {/* MAIN CONTENT */}
        {/* ========================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* ======================================= */}
          {/* LEFT */}
          {/* ======================================= */}

          <div className="space-y-6">

            {/* PRODUCTS */}

            <section className="card-luxury overflow-hidden">

              <div className="border-b border-border p-5 sm:p-6">

                <h2 className="text-lg font-bold text-foreground">
                  Ordered Products
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {orderData?.products?.length} product
                  {orderData?.products?.length > 1 ? "s" : ""}
                </p>

              </div>

              <div className="divide-y divide-border">

                {orderData?.products?.map((product) => (

                  <div
                    key={product?._id}
                    className="flex gap-4 p-5 sm:p-6"
                  >

                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">

                      <img
                        src={product?.product?.images[0]?.url}
                        alt={product?.product?.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-foreground">
                        {product?.product?.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">

                        {
                          product?.size && (
                            <span>
                              Size: {product?.size}
                            </span>
                          )
                        }

                        <span>
                          Quantity: {product?.quantity}
                        </span>

                      </div>

                      <p className="mt-3 font-bold text-foreground">
                        ₹{product?.price?.toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                ))}

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

                  <p className="text-xs text-muted-foreground">
                    Customer details
                  </p>

                </div>

              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div>

                  <p className="text-xs text-muted-foreground">
                    Name
                  </p>

                  <p className="mt-1 font-semibold text-foreground">
                    {orderData?.shippingAddress?.fullName}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <div className="mt-1 flex items-center gap-2 font-semibold text-foreground">

                    <Phone size={15} />

                    {orderData?.shippingAddress?.phoneNumber}

                  </div>

                </div>

                <div className="sm:col-span-2">

                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 break-all font-semibold text-foreground">
                    {orderData?.user?.email}
                  </p>

                </div>

              </div>

            </section>


            {/* SHIPPING ADDRESS */}

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
                    Delivery Address
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Shipping information
                  </p>

                </div>

              </div>

              <div className="mt-5 rounded-2xl border border-border bg-primary/5 p-5">

                <p className="font-semibold text-foreground">
                  {orderData?.shippingAddress?.fullName}
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  {orderData?.shippingAddress?.streetAddress}
                  <br />

                  {orderData?.shippingAddress?.city},{" "}
                  {orderData?.shippingAddress?.state}
                  <br />

                  PIN: {orderData?.shippingAddress?.pinCode}

                </p>

                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">

                  <Phone size={15} />

                  {orderData?.shippingAddress?.phoneNumber}

                </p>

              </div>

            </section>

          </div>


          {/* ======================================= */}
          {/* RIGHT */}
          {/* ======================================= */}

          <div className="space-y-6">

            {/* PAYMENT */}

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
                    Payment
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Payment information
                  </p>

                </div>

              </div>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex items-center justify-between gap-4">

                  <span className="text-muted-foreground">
                    Method
                  </span>

                  <span className="font-semibold text-foreground">
                    {orderData?.payment?.paymentMethod}
                  </span>

                </div>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-muted-foreground">
                    Status
                  </span>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {orderData?.paymentStatus}
                  </span>

                </div>

                <div className="flex items-center justify-between gap-4">

                  <span className="text-muted-foreground">
                    Amount
                  </span>

                  <span className="font-bold text-foreground">
                    ₹{orderData?.totalAmount?.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </section>


            {/* PRICE */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Price Details
              </h2>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹{orderData?.subTotal?.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Shipping
                  </span>

                  <span className="font-medium">
                    ₹{orderData?.shippingCharges?.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    GST
                  </span>

                  <span className="font-medium">
                    ₹{orderData?.tax?.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="border-t border-border pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-foreground">
                      Total
                    </span>

                    <span className="text-xl font-bold text-primary">
                      ₹{orderData?.totalAmount?.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* PAYMENT IDs */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Transaction Details
              </h2>

              <div className="mt-5 space-y-4">

                <div>

                  <p className="text-xs text-muted-foreground">
                    Razorpay Order ID
                  </p>

                  <p className="mt-1 break-all text-xs font-medium text-foreground">
                    {orderData?.payment?.razorpayOrderId}
                  </p>

                </div>

                <div>

                  <p className="text-xs text-muted-foreground">
                    Razorpay Payment ID
                  </p>

                  <p className="mt-1 break-all text-xs font-medium text-foreground">
                    {orderData?.payment?.razorpayPaymentId}
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

export default AdminOrderDetailsPage;