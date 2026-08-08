import {
  Package,
  ChevronRight,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    id: "STYQLO-1001",
    date: "08 Aug 2026",
    deliveredAt: "2026-08-08T10:30:00",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 2499,
    items: [
      {
        id: 1,
        name: "Premium Oversized T-Shirt",
        size: "L",
        quantity: 1,
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
      },
      {
        id: 2,
        name: "Classic Denim Jeans",
        size: "32",
        quantity: 1,
        price: 1000,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
      },
    ],
  },

  {
    id: "STYQLO-1002",
    date: "06 Aug 2026",
    deliveredAt: null,
    status: "Shipped",
    paymentStatus: "Paid",
    total: 1799,
    items: [
      {
        id: 3,
        name: "Relaxed Fit Hoodie",
        size: "M",
        quantity: 1,
        price: 1799,
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300",
      },
    ],
  },

  {
    id: "STYQLO-1003",
    date: "03 Aug 2026",
    deliveredAt: null,
    status: "Processing",
    paymentStatus: "Paid",
    total: 1299,
    items: [
      {
        id: 4,
        name: "Minimal Cotton Shirt",
        size: "M",
        quantity: 1,
        price: 1299,
        image:
          "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=300",
      },
    ],
  },
];


// --------------------------------------------------
// STATUS CONFIG
// --------------------------------------------------

const statusConfig = {
  Delivered: {
    icon: CheckCircle2,
    className: "bg-green-50 text-green-700 border-green-100",
  },

  Shipped: {
    icon: Truck,
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },

  Processing: {
    icon: Clock3,
    className: "bg-primary/10 text-primary border-primary/20",
  },

  Cancelled: {
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-100",
  },

  Returned: {
    icon: RotateCcw,
    className: "bg-orange-50 text-orange-700 border-orange-100",
  },
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
// ORDERS PAGE
// --------------------------------------------------

const OrdersPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-luxury px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-6xl">

        {/* -------------------------------------------- */}
        {/* HEADER */}
        {/* -------------------------------------------- */}

        <div className="mb-8">

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            STYQLO
          </p>

          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Track and manage all your STYQLO orders.
          </p>

        </div>


        {/* -------------------------------------------- */}
        {/* FILTERS */}
        {/* -------------------------------------------- */}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">

          {[
            "All Orders",
            "Processing",
            "Shipped",
            "Delivered",
          ].map((filter, index) => (

            <button
              key={filter}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-luxury ${
                index === 0
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {filter}
            </button>

          ))}

        </div>


        {/* -------------------------------------------- */}
        {/* ORDERS */}
        {/* -------------------------------------------- */}

        {orders.length > 0 ? (

          <div className="space-y-5">

            {orders.map((order) => {

              const status = statusConfig[order.status];

              const StatusIcon = status?.icon || Package;

              const returnEligible =
                isReturnEligible(order);

              return (

                <article
                  key={order.id}
                  className="card-luxury overflow-hidden"
                >

                  {/* -------------------------------- */}
                  {/* ORDER HEADER */}
                  {/* -------------------------------- */}

                  <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">

                      {/* ORDER ID */}

                      <div>

                        <p className="text-xs text-muted-foreground">
                          Order ID
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          #{order.id}
                        </p>

                      </div>


                      {/* ORDER DATE */}

                      <div>

                        <p className="text-xs text-muted-foreground">
                          Ordered on
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {order.date}
                        </p>

                      </div>

                    </div>


                    {/* STATUS */}

                    <div
                      className={`flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${status.className}`}
                    >

                      <StatusIcon size={15} />

                      {order.status}

                    </div>

                  </div>


                  {/* -------------------------------- */}
                  {/* PRODUCTS */}
                  {/* -------------------------------- */}

                  <div className="p-5 sm:p-6">

                    <div className="space-y-5">

                      {order.items.map((item) => (

                        <div
                          key={item.id}
                          className="flex gap-4"
                        >

                          {/* PRODUCT IMAGE */}

                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">

                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />

                          </div>


                          {/* PRODUCT INFO */}

                          <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
                              {item.name}
                            </h3>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">

                              <span>
                                Size: {item.size}
                              </span>

                              <span>
                                Qty: {item.quantity}
                              </span>

                            </div>

                            <p className="mt-2 font-semibold text-foreground">
                              ₹{item.price.toLocaleString("en-IN")}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>


                    {/* -------------------------------- */}
                    {/* ORDER SUMMARY */}
                    {/* -------------------------------- */}

                    <div className="mt-6 border-t border-border pt-5">

                      <div className="flex flex-col gap-5">

                        {/* PAYMENT */}

                        <div className="flex flex-wrap items-center gap-4">

                          <div className="flex items-center gap-2 text-sm">

                            <CreditCard
                              size={17}
                              className="text-primary"
                            />

                            <span className="text-muted-foreground">
                              Payment:
                            </span>

                            <span className="font-semibold text-foreground">
                              {order.paymentStatus}
                            </span>

                          </div>


                          {/* DELIVERY */}

                          {order.status === "Delivered" &&
                            order.deliveredAt && (

                              <div className="text-sm text-muted-foreground">

                                Delivered on{" "}

                                <span className="font-semibold text-foreground">
                                  {new Date(
                                    order.deliveredAt
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </span>

                              </div>

                            )}

                        </div>


                        {/* TOTAL + ACTIONS */}

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                          {/* TOTAL */}

                          <div>

                            <p className="text-xs text-muted-foreground">
                              Total amount
                            </p>

                            <p className="mt-1 text-xl font-bold text-foreground">
                              ₹{order.total.toLocaleString("en-IN")}
                            </p>

                          </div>


                          {/* ACTIONS */}

                          <div className="flex flex-col gap-2 sm:flex-row">

                            {/* VIEW DETAILS */}

                            <button
                              onClick={() =>
                                navigate(
                                  `/orders/${order.id}`
                                )
                              }
                              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                            >

                              View Details

                              <ChevronRight size={17} />

                            </button>


                            {/* BUY AGAIN */}

                            {order.status === "Delivered" && (

                              <button
                                className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-luxury hover:border-primary hover:text-primary"
                              >
                                Buy Again
                              </button>

                            )}


                            {/* RETURN */}

                            {returnEligible && (

                              <button
                                onClick={() =>
                                  navigate(
                                    `/orders/${order.id}/return`
                                  )
                                }
                                className="flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary transition-luxury hover:bg-primary/10"
                              >

                                <RotateCcw size={17} />

                                Return Item

                              </button>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </article>

              );

            })}

          </div>

        ) : (

          /* -------------------------------------------- */
          /* EMPTY STATE */
          /* -------------------------------------------- */

          <div className="card-luxury flex flex-col items-center justify-center px-6 py-20 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">

              <ShoppingBag
                size={38}
                className="text-primary"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-foreground">
              No orders yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Looks like you haven't placed an order yet.
              Start shopping and your orders will appear here.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
            >
              Start Shopping
            </button>

          </div>

        )}

      </div>

    </main>
  );
};

export default OrdersPage;