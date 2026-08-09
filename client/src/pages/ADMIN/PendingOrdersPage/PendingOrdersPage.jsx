import {
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";

const pendingOrders = [
  {
    id: "STYQLO-1001",
    date: "09 Aug 2026, 03:20 PM",
    customer: {
      name: "Rahul Kumar",
      phone: "+91 98765 43210",
    },
    shippingAddress: {
      address: "Main Road, Civil Township",
      city: "Rourkela",
      state: "Odisha",
      pinCode: "769004",
    },
    totalAmount: 2499,
    paymentStatus: "Paid",
    paymentMethod: "Razorpay",

    products: [
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
    date: "09 Aug 2026, 02:45 PM",
    customer: {
      name: "Priya Sharma",
      phone: "+91 87654 32109",
    },
    shippingAddress: {
      address: "Sector 5",
      city: "Bhubaneswar",
      state: "Odisha",
      pinCode: "751001",
    },
    totalAmount: 1799,
    paymentStatus: "Paid",
    paymentMethod: "Razorpay",

    products: [
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
];

const PendingOrdersPage = () => {
  const [orders, setOrders] = useState(pendingOrders);

  const handleAccept = (orderId) => {
    console.log("Accept order:", orderId);

    setOrders((prev) =>
      prev.filter((order) => order.id !== orderId)
    );
  };

  const handleReject = (orderId) => {
    console.log("Reject order:", orderId);

    setOrders((prev) =>
      prev.filter((order) => order.id !== orderId)
    );
  };

  return (
    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ============================================ */}
        {/* HEADER */}
        {/* ============================================ */}

        <div className="mb-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>

              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Pending Orders
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Review and manage new customer orders.
              </p>

            </div>

            {/* COUNT */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                <Clock3
                  size={20}
                  className="text-primary"
                />

              </div>

              <div>

                <p className="text-xs text-muted-foreground">
                  Pending
                </p>

                <p className="text-xl font-bold text-foreground">
                  {orders.length}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ============================================ */}
        {/* ORDERS */}
        {/* ============================================ */}

        {orders.length > 0 ? (

          <div className="space-y-6">

            {orders.map((order) => (

              <article
                key={order.id}
                className="card-luxury overflow-hidden"
              >

                {/* ================================== */}
                {/* ORDER HEADER */}
                {/* ================================== */}

                <div className="flex flex-col gap-4 border-b border-border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h2 className="text-lg font-bold text-foreground">
                        #{order.id}
                      </h2>

                      <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">

                        <Clock3 size={13} />

                        Pending

                      </span>

                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Placed on {order.date}
                    </p>

                  </div>


                  <div className="text-left sm:text-right">

                    <p className="text-xs text-muted-foreground">
                      Order Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-foreground">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>


                {/* ================================== */}
                {/* ORDER CONTENT */}
                {/* ================================== */}

                <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">

                  {/* ================================= */}
                  {/* LEFT - PRODUCTS */}
                  {/* ================================= */}

                  <div className="p-5 sm:p-6">

                    <div className="mb-5 flex items-center gap-2">

                      <ShoppingBag
                        size={18}
                        className="text-primary"
                      />

                      <h3 className="font-bold text-foreground">
                        Ordered Items
                      </h3>

                    </div>


                    <div className="space-y-4">

                      {order.products.map((product) => (

                        <div
                          key={product.id}
                          className="flex gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4"
                        >

                          {/* IMAGE */}

                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">

                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />

                          </div>


                          {/* INFO */}

                          <div className="min-w-0 flex-1">

                            <h4 className="truncate font-semibold text-foreground">
                              {product.name}
                            </h4>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">

                              <span>
                                Size: {product.size}
                              </span>

                              <span>
                                Qty: {product.quantity}
                              </span>

                            </div>

                            <p className="mt-2 font-semibold text-foreground">
                              ₹{product.price.toLocaleString("en-IN")}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>


                    {/* PAYMENT */}

                    <div className="mt-5 flex flex-wrap gap-3">

                      <div className="rounded-xl bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">

                        Payment: {order.paymentStatus}

                      </div>

                      <div className="rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">

                        {order.paymentMethod}

                      </div>

                    </div>

                  </div>


                  {/* ================================= */}
                  {/* RIGHT - CUSTOMER */}
                  {/* ================================= */}

                  <div className="border-t border-border bg-primary/5 p-5 sm:p-6 lg:border-l lg:border-t-0">

                    {/* CUSTOMER */}

                    <div>

                      <h3 className="font-bold text-foreground">
                        Customer
                      </h3>

                      <div className="mt-4">

                        <p className="font-semibold text-foreground">
                          {order.customer.name}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">

                          <Phone size={15} />

                          {order.customer.phone}

                        </div>

                      </div>

                    </div>


                    {/* ADDRESS */}

                    <div className="mt-6 border-t border-border pt-5">

                      <div className="flex items-center gap-2">

                        <MapPin
                          size={17}
                          className="text-primary"
                        />

                        <h3 className="font-bold text-foreground">
                          Delivery Address
                        </h3>

                      </div>

                      <p className="mt-3 text-sm leading-6 text-muted-foreground">

                        {order.shippingAddress.address}
                        <br />

                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                        <br />

                        PIN: {order.shippingAddress.pinCode}

                      </p>

                    </div>


                    {/* ACTIONS */}

                    <div className="mt-6 border-t border-border pt-5">

                      <p className="mb-3 text-xs text-muted-foreground">
                        Order Action
                      </p>

                      <div className="flex flex-col gap-3">

                        {/* ACCEPT */}

                        <button
                          onClick={() =>
                            handleAccept(order.id)
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                        >

                          <Check size={18} />

                          Accept Order

                        </button>


                        {/* REJECT */}

                        <button
                          onClick={() =>
                            handleReject(order.id)
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3.5 font-semibold text-red-600 transition-luxury hover:bg-red-100"
                        >

                          <X size={18} />

                          Reject Order

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* ============================================ */
          /* EMPTY STATE */
          /* ============================================ */

          <div className="card-luxury flex flex-col items-center justify-center px-6 py-24 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">

              <Package
                size={40}
                className="text-primary"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-foreground">
              No Pending Orders
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              You're all caught up. New customer orders will appear here
              when they are placed.
            </p>

          </div>

        )}

      </div>

    </main>
  );
};

export default PendingOrdersPage;