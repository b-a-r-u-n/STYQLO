import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const order = {
  id: "STYQLO-1001",
  createdAt: "08 Aug 2026",
  deliveredAt: "08 Aug 2026T10:30:00",

  status: "Delivered",
  paymentStatus: "Paid",
  paymentMethod: "Razorpay",

  subtotal: 2299,
  shipping: 100,
  gst: 100,
  total: 2499,

  shippingAddress: {
    name: "Barun Kumar",
    phone: "+91 98765 43210",
    address: "Main Road, Civil Township",
    city: "Rourkela",
    state: "Odisha",
    pinCode: "769004",
  },

  items: [
    {
      id: 1,
      name: "Premium Oversized T-Shirt",
      size: "L",
      quantity: 1,
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    },
    {
      id: 2,
      name: "Classic Denim Jeans",
      size: "32",
      quantity: 1,
      price: 800,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    },
  ],
};


// --------------------------------------------------
// RETURN ELIGIBILITY
// --------------------------------------------------

const isReturnEligible = (order) => {
  if (order.status !== "Delivered" || !order.deliveredAt) {
    return false;
  }

  const deliveredDate = new Date(order.deliveredAt);
  const today = new Date();

  const difference =
    today.getTime() - deliveredDate.getTime();

  const daysPassed =
    difference / (1000 * 60 * 60 * 24);

  return daysPassed >= 0 && daysPassed <= 7;
};


// --------------------------------------------------
// STATUS ICON
// --------------------------------------------------

const StatusIcon = ({ status }) => {
  if (status === "Delivered") {
    return (
      <CheckCircle2
        size={18}
        className="text-green-600"
      />
    );
  }

  if (status === "Shipped") {
    return (
      <Truck
        size={18}
        className="text-blue-600"
      />
    );
  }

  if (status === "Cancelled") {
    return (
      <XCircle
        size={18}
        className="text-red-600"
      />
    );
  }

  return (
    <Clock3
      size={18}
      className="text-primary"
    />
  );
};


// --------------------------------------------------
// ORDER DETAILS
// --------------------------------------------------

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const returnEligible = isReturnEligible(order);

  return (
    <main className="min-h-screen bg-luxury px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* -------------------------------------------- */}
        {/* BACK */}
        {/* -------------------------------------------- */}

        <button
          onClick={() => navigate("/orders")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>


        {/* -------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------- */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              STYQLO
            </p>

            <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
              Order Details
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Order #{order.id}
            </p>

          </div>


          {/* STATUS */}

          <div className="flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">

            <StatusIcon status={order.status} />

            {order.status}

          </div>

        </div>


        {/* -------------------------------------------- */}
        {/* ORDER TIMELINE */}
        {/* -------------------------------------------- */}

        <section className="card-luxury mb-6 p-6 sm:p-8">

          <h2 className="text-lg font-bold text-foreground">
            Order Status
          </h2>

          <div className="mt-8">

            <div className="relative">

              {/* LINE */}

              <div className="absolute left-[15px] top-3 h-[calc(100%-24px)] w-px bg-primary/20" />


              {/* CREATED */}

              <div className="relative flex gap-5 pb-8">

                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">

                  <CheckCircle2 size={17} />

                </div>

                <div>

                  <p className="font-semibold text-foreground">
                    Order Placed
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.createdAt}
                  </p>

                </div>

              </div>


              {/* PROCESSING */}

              <div className="relative flex gap-5 pb-8">

                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">

                  <Package size={17} />

                </div>

                <div>

                  <p className="font-semibold text-foreground">
                    Processing
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your order has been processed.
                  </p>

                </div>

              </div>


              {/* SHIPPED */}

              <div className="relative flex gap-5 pb-8">

                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">

                  <Truck size={17} />

                </div>

                <div>

                  <p className="font-semibold text-foreground">
                    Shipped
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your package is on its way.
                  </p>

                </div>

              </div>


              {/* DELIVERED */}

              <div className="relative flex gap-5">

                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">

                  <CheckCircle2 size={17} />

                </div>

                <div>

                  <p className="font-semibold text-foreground">
                    Delivered
                  </p>

                  {order.deliveredAt && (

                    <p className="mt-1 text-sm text-muted-foreground">

                      Delivered on{" "}

                      {new Date(
                        order.deliveredAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}

                    </p>

                  )}

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* -------------------------------------------- */}
        {/* MAIN GRID */}
        {/* -------------------------------------------- */}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">


          {/* ========================================== */}
          {/* LEFT */}
          {/* ========================================== */}

          <div className="space-y-6">


            {/* -------------------------------------- */}
            {/* PRODUCTS */}
            {/* -------------------------------------- */}

            <section className="card-luxury overflow-hidden">

              <div className="border-b border-border p-5 sm:p-6">

                <h2 className="text-lg font-bold text-foreground">
                  Ordered Items
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {order.items.length} item
                  {order.items.length > 1 ? "s" : ""}
                </p>

              </div>


              <div className="divide-y divide-border">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex gap-4 p-5 sm:p-6"
                  >

                    {/* IMAGE */}

                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                    </div>


                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">

                        <span>
                          Size: {item.size}
                        </span>

                        <span>
                          Qty: {item.quantity}
                        </span>

                      </div>

                      <p className="mt-3 font-bold text-foreground">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* -------------------------------------- */}
            {/* SHIPPING ADDRESS */}
            {/* -------------------------------------- */}

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
                  {order.shippingAddress.name}
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  {order.shippingAddress.address}
                  <br />

                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                  <br />

                  PIN: {order.shippingAddress.pinCode}

                </p>

                <p className="mt-3 text-sm font-medium text-foreground">
                  {order.shippingAddress.phone}
                </p>

              </div>

            </section>

          </div>


          {/* ========================================== */}
          {/* RIGHT */}
          {/* ========================================== */}

          <div className="space-y-6">


            {/* -------------------------------------- */}
            {/* PAYMENT */}
            {/* -------------------------------------- */}

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
                    Transaction information
                  </p>

                </div>

              </div>


              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Method
                  </span>

                  <span className="font-semibold text-foreground">
                    {order.paymentMethod}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Status
                  </span>

                  <span className="font-semibold text-green-600">
                    {order.paymentStatus}
                  </span>

                </div>

              </div>

            </section>


            {/* -------------------------------------- */}
            {/* PRICE SUMMARY */}
            {/* -------------------------------------- */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Price Details
              </h2>

              <div className="mt-5 space-y-4 text-sm">

                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span className="font-medium text-foreground">
                    ₹{order.subtotal.toLocaleString("en-IN")}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Shipping
                  </span>

                  <span className="font-medium text-foreground">
                    ₹{order.shipping.toLocaleString("en-IN")}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    GST
                  </span>

                  <span className="font-medium text-foreground">
                    ₹{order.gst.toLocaleString("en-IN")}
                  </span>

                </div>


                <div className="border-t border-border pt-4">

                  <div className="flex justify-between">

                    <span className="font-bold text-foreground">
                      Total
                    </span>

                    <span className="text-xl font-bold text-primary">
                      ₹{order.total.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* -------------------------------------- */}
            {/* RETURN */}
            {/* -------------------------------------- */}

            {returnEligible && (

              <section className="card-luxury border-primary/20 bg-primary/5 p-5 sm:p-6">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">

                    <RotateCcw
                      size={19}
                      className="text-primary"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-foreground">
                      Eligible for Return
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      This order is within the 7-day return period.
                    </p>

                  </div>

                </div>


                <button
                  onClick={() =>
                    navigate(
                      `/orders/${order.id}/return`
                    )
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >

                  <RotateCcw size={17} />

                  Return Item

                </button>

              </section>

            )}

          </div>

        </div>

      </div>

    </main>
  );
};

export default OrderDetailsPage;