import { Ban, CheckCircle2, ChevronRight, CircleX, Clock3, CreditCard, Package, Search, ShoppingBag, User, XCircle, } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../../../features/orderSlice";

const ManageOrdersPage = () => {

  const { loading, allOrdersData } = useSelector(state => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
      try {
        const url = "";
        const res = await dispatch(getAllOrders(url)).unwrap();
        // console.log(res);

      } catch (error) {
        toast.error(error?.message || error?.data?.message || "Failed to fetch orders");
      }
    }

  useEffect(() => {
    fetchData();
  }, [])

  const [orders, setOrders] = useState([
    {
      id: "STYQLO-1001",
      date: "09 Aug 2026, 02:30 PM",

      status: "Pending",

      paymentStatus: "Paid",
      paymentMethod: "Razorpay",

      totalAmount: 3499,

      customer: {
        name: "Rahul Kumar",
        email: "rahul@example.com",
        phone: "+91 9876543210",
      },

      products: [
        {
          id: "P001",
          name: "Premium Oversized T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
          quantity: 2,
          size: "L",
          price: 1499,
        },
        {
          id: "P002",
          name: "Classic Cotton Shirt",
          image:
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
          quantity: 1,
          size: "M",
          price: 999,
        },
      ],
    },

    {
      id: "STYQLO-1002",
      date: "08 Aug 2026, 11:45 AM",

      status: "Confirmed",

      paymentStatus: "Paid",
      paymentMethod: "Razorpay",

      totalAmount: 2899,

      customer: {
        name: "Ananya Singh",
        email: "ananya@example.com",
        phone: "+91 9123456789",
      },

      products: [
        {
          id: "P003",
          name: "Minimal Summer Dress",
          image:
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
          quantity: 1,
          size: "M",
          price: 2899,
        },
      ],
    },

    {
      id: "STYQLO-1003",
      date: "07 Aug 2026, 04:20 PM",

      status: "Shipped",

      paymentStatus: "Paid",
      paymentMethod: "Razorpay",

      totalAmount: 4599,

      customer: {
        name: "Amit Kumar",
        email: "amit@example.com",
        phone: "+91 9988776655",
      },

      products: [
        {
          id: "P004",
          name: "Classic Denim Jeans",
          image:
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
          quantity: 1,
          size: "32",
          price: 1999,
        },
        {
          id: "P005",
          name: "Oversized Hoodie",
          image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
          quantity: 1,
          size: "XL",
          price: 2600,
        },
      ],
    },

    {
      id: "STYQLO-1004",
      date: "06 Aug 2026, 09:10 AM",

      status: "Delivered",

      paymentStatus: "Paid",
      paymentMethod: "Razorpay",

      totalAmount: 2199,

      customer: {
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "+91 9871234567",
      },

      products: [
        {
          id: "P006",
          name: "Women's Casual Top",
          image:
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500",
          quantity: 1,
          size: "S",
          price: 2199,
        },
      ],
    },

    {
      id: "STYQLO-1005",
      date: "05 Aug 2026, 01:15 PM",

      status: "Cancelled",

      paymentStatus: "Refunded",
      paymentMethod: "Razorpay",

      totalAmount: 1799,

      customer: {
        name: "Vikash Das",
        email: "vikash@example.com",
        phone: "+91 9090909090",
      },

      products: [
        {
          id: "P007",
          name: "Regular Fit Jeans",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
          quantity: 1,
          size: "34",
          price: 1799,
        },
      ],
    },
  ]);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // ==================================================
  // HANDLE FILTER
  // ==================================================

  const handleFilter = async (filter) => {
    setActiveFilter(filter);

    try {
      let url;
      if (filter === "All")
        url = ""
      else
        url = "?orderStatus=" + filter;

      await dispatch(getAllOrders(url)).unwrap();
    } catch (error) {
      toast.error(error?.message || error?.data?.message || "Failed to fetch orders");
    }
  }

  // ==================================================
  // HANDLE ACCEPT AND REJECT BUTTON
  // ==================================================

  const handleAcceptAndReject = async (orderId, string) => {
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

  // ==================================================
  // STATUS CONFIG
  // ==================================================

  const statusConfig = {
    Pending: {
      icon: Clock3,
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
    },

    Confirmed: {
      icon: CheckCircle2,
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
    },

    Packed: {
      icon: Package,
      className:
        "border-purple-200 bg-purple-50 text-purple-700",
    },

    Shipped: {
      icon: Package,
      className:
        "border-indigo-200 bg-indigo-50 text-indigo-700",
    },

    Delivered: {
      icon: CheckCircle2,
      className:
        "border-green-200 bg-green-50 text-green-700",
    },

    Rejected: {
      icon: CircleX,
      className: "border-rose-200 bg-rose-50 text-rose-700",
    },

    Cancelled: {
      icon: Ban,
      className: "border-red-200 bg-red-50 text-red-700",
    },
  };

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
    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6  lg:px-8">

      <div className="mx-auto w-full max-w-[1600px]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>

              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Manage Orders
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Manage and review all customer orders.
              </p>

            </div>

            {/* ORDER COUNT */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                <ShoppingBag
                  size={20}
                  className="text-primary"
                />

              </div>

              <div>

                <p className="text-xs text-muted-foreground">
                  Total Orders
                </p>

                <p className="text-xl font-bold text-foreground">
                  {allOrdersData.length}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            SEARCH
        ================================================== */}

        <div className="mb-5">

          <div className="relative w-full max-w-xl">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search order, customer or product..."
              className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

          </div>

        </div>


        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">

          {[
            "All",
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled",
            "Rejected"
          ].map((filter) => (

            <button
              key={filter}
              onClick={() =>
                handleFilter(filter)
              }
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-luxury ${activeFilter === filter
                ? "bg-primary text-primary-foreground shadow-soft"
                : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
            >
              {filter}
            </button>

          ))}

        </div>


        {/* ==================================================
            ORDERS
        ================================================== */}

        {allOrdersData?.length > 0 ? (

          <div className="space-y-6">

            {allOrdersData?.map((order) => {

              const config =
                statusConfig[order.orderStatus];

              const StatusIcon =
                config.icon;

              const totalItems =
                order.products.reduce(
                  (total, product) =>
                    total + product.quantity,
                  0
                );

              return (

                <article
                  key={order._id}
                  className="card-luxury overflow-hidden"
                >

                  {/* ======================================
                      ORDER HEADER
                  ====================================== */}

                  <div className="border-b border-border px-5 py-5 sm:px-6 lg:px-7">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-lg font-bold text-foreground">
                            #{order._id}
                          </h2>

                          <span
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
                          >

                            <StatusIcon size={13} />

                            {order.orderStatus}

                          </span>

                        </div>

                        <p className="mt-1.5 text-xs text-muted-foreground">
                          Placed on {new Date(order.createdAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                          })}
                        </p>

                      </div>


                      <div className="sm:text-right">

                        <p className="text-xs text-muted-foreground">
                          Order Total
                        </p>

                        <p className="mt-1 text-2xl font-bold text-foreground">
                          ₹
                          {order.totalAmount.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* ======================================
                      ORDER CONTENT
                  ====================================== */}

                  <div className="p-5 sm:p-6 lg:p-7">

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-4">


                      {/* ==================================
                          PRODUCTS
                      ================================== */}

                      <div className="rounded-2xl border border-border p-5">

                        <div className="mb-4 flex items-center justify-between">

                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Products
                          </p>

                          <span className="text-xs font-medium text-muted-foreground">
                            {totalItems}{" "}
                            {totalItems === 1
                              ? "item"
                              : "items"}
                          </span>

                        </div>


                        <div className="space-y-3">

                          {order?.products
                            .slice(0, 2)
                            .map((product) => (

                              <div
                                key={product._id}
                                className="flex gap-3 rounded-xl bg-primary/5 p-3"
                              >

                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                                  <img
                                    src={product?.product?.images[0].url}
                                    alt={product?.product?.name}
                                    className="h-full w-full object-cover"
                                  />

                                </div>


                                <div className="min-w-0 flex-1">

                                  <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                                    {product?.product?.name}
                                  </h3>

                                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">

                                    <span>
                                      Qty:{" "}
                                      {product.quantity}
                                    </span>

                                    {
                                      product.size && (
                                        <span>
                                          Size:{" "}
                                          {product.size}
                                        </span>)
                                    }

                                  </div>

                                  <p className="mt-1.5 text-sm font-semibold text-foreground">
                                    ₹
                                    {product.price.toLocaleString(
                                      "en-IN"
                                    )}
                                  </p>

                                </div>

                              </div>

                            ))}


                          {order.products.length > 2 && (

                            <div className="rounded-xl border border-dashed border-border px-3 py-2.5 text-center text-xs font-medium text-muted-foreground">

                              +
                              {order.products.length - 2}{" "}
                              more products

                            </div>

                          )}

                        </div>

                      </div>


                      {/* ==================================
                          CUSTOMER
                      ================================== */}

                      <div className="rounded-2xl border border-border p-5">

                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Customer
                        </p>

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">

                            <User
                              size={19}
                              className="text-primary"
                            />

                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-semibold text-foreground">
                              {order.shippingAddress.fullName}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                              Customer
                            </p>

                          </div>

                        </div>

                        <div className="mt-5 space-y-4">

                          <div>

                            <p className="text-xs text-muted-foreground">
                              Email
                            </p>

                            <p className="mt-1 truncate text-sm font-medium text-foreground">
                              {order.user.email}
                            </p>

                          </div>

                          <div>

                            <p className="text-xs text-muted-foreground">
                              Phone
                            </p>

                            <p className="mt-1 text-sm font-medium text-foreground">
                              {order.shippingAddress.phoneNumber}
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* ==================================
                          PAYMENT
                      ================================== */}

                      <div className="rounded-2xl border border-border p-5">

                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Payment
                        </p>

                        <div className="flex items-center gap-2">

                          <CreditCard
                            size={18}
                            className="text-primary"
                          />

                          <span className="font-semibold text-foreground">
                            {order?.payment?.paymentMethod}
                          </span>

                        </div>

                        <div className="mt-5">

                          <p className="text-xs text-muted-foreground">
                            Payment Status
                          </p>

                          <p
                            className={`mt-2 font-semibold ${order.paymentStatus ===
                              "Paid"
                              ? "text-green-600"
                              : order.paymentStatus ===
                                "Refunded"
                                ? "text-blue-600"
                                : "text-amber-600"
                              }`}
                          >
                            {order.paymentStatus}
                          </p>

                        </div>

                        <div className="mt-5 border-t border-border pt-4">

                          <p className="text-xs text-muted-foreground">
                            Total
                          </p>

                          <p className="mt-1 text-lg font-bold text-foreground">
                            ₹
                            {order?.totalAmount.toLocaleString(
                              "en-IN"
                            )}
                          </p>

                        </div>

                      </div>


                      {/* ==================================
                          ACTIONS
                      ================================== */}

                      <div className="rounded-2xl border border-border p-5">

                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Actions
                        </p>

                        <div className="flex flex-col gap-2">

                          {order.orderStatus ===
                            "Pending" && (

                              <>
                                <button
                                  // disabled={}
                                  onClick={() => { handleAcceptAndReject(order._id, "accepted") }}
                                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                  <CheckCircle2
                                    size={17}
                                  />
                                  Accept Order
                                </button>


                                <button
                                  // disabled={}
                                  onClick={() => { handleAcceptAndReject(order._id, "rejected") }}
                                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-luxury hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                  <XCircle
                                    size={17}
                                  />

                                  Reject Order

                                </button>
                              </>

                            )}


                          <button
                            onClick={() =>
                              navigate(
                                `/admin/orders/${order._id}`
                              )
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-luxury hover:border-primary hover:text-primary"
                          >

                            View Details

                            <ChevronRight
                              size={16}
                            />

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </article>

              );

            })}

          </div>

        ) : (

          /* ==========================================
             EMPTY
          ========================================== */

          <div className="card-luxury flex min-h-[450px] flex-col items-center justify-center px-6 py-20 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">

              <ShoppingBag
                size={38}
                className="text-primary"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-foreground">
              No Orders Found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">

              {search
                ? "No orders match your search."
                : `There are no ${activeFilter.toLowerCase()} orders.`}

            </p>

            {(search ||
              activeFilter !== "All") && (

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All");
                  }}
                  className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >
                  View All Orders
                </button>

              )}

          </div>

        )}

      </div>

    </main>
  );
};

export default ManageOrdersPage;