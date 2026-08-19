import { Package, ChevronRight, Truck, CheckCircle2, Clock3, XCircle, RotateCcw, ShoppingBag, CreditCard, CircleX, Ban } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../../features/orderSlice";
import toast from "react-hot-toast";


// --------------------------------------------------
// STATUS CONFIG
// --------------------------------------------------

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

  const { orderDatas, loading } = useSelector(state => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await dispatch(getUserOrders()).unwrap();
        setDisplayDatas(response);
      } catch (error) {
        toast.error(error?.message || error?.data?.message || "Failed to fetch orders");
      }
    }
    fetchOrder();
  }, [])

  const [displayDatas, setDisplayDatas] = useState(orderDatas);
  const [activeFilter, setActiveFilter] = useState("All Orders");
  // console.log(displayDatas);
  

  // let displayDatas = orderDatas;
  // console.log(displayDatas.length);

  const handleViewDetails = () => { }

  const handleBuyAgain = () => { }

  const handleReturnItem = () => { }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    if (filter === "All Orders") {
      setDisplayDatas(orderDatas)
      return;
    }
    const filteredData = orderDatas.filter(
      (data) => data.orderStatus === filter
    );

    setDisplayDatas(filteredData);
  };

  if (loading && !displayDatas?.length) {
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
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled",
            "Rejected"
          ].map((filter) => 

            {            
            return <button
              onClick={() => handleFilterChange(filter)}
              key={filter}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-luxury ${activeFilter === filter
                ? "bg-primary text-primary-foreground shadow-soft"
                : "border border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
            >
              {filter}
            </button>}

          )}

        </div>


        {/* -------------------------------------------- */}
        {/* ORDERS */}
        {/* -------------------------------------------- */}

        {displayDatas?.length > 0 ? (

          <div className="space-y-5">

            {displayDatas.map((displayData) => {

              const status = statusConfig[displayData?.orderStatus];

              // console.log(status);
              

              const StatusIcon = status?.icon || Package;

              const statusClassName = status?.className;

              const returnEligible =
                isReturnEligible(displayData);

              return (

                <article
                  key={displayData?._id}
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
                          #{displayData?.orderId || displayData?._id}
                        </p>

                      </div>


                      {/* ORDER DATE */}

                      <div>

                        <p className="text-xs text-muted-foreground">
                          Ordered on
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {
                            new Date(displayData?.updatedAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          }
                        </p>

                      </div>

                    </div>


                    {/* STATUS */}
                          
                    <div
                      className={`flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${statusClassName}`}
                    >

                      <StatusIcon size={15} />

                      {displayData?.orderStatus}

                    </div>

                  </div>


                  {/* -------------------------------- */}
                  {/* PRODUCTS */}
                  {/* -------------------------------- */}

                  <div className="p-5 sm:p-6">

                    <div className="space-y-5">

                      {displayData?.products?.map((data) => (

                        <div
                          key={data?.product?._id + Math.random()}
                          className="flex gap-4"
                        >

                          {/* PRODUCT IMAGE */}

                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">

                            <img
                              src={data?.product?.images[0]?.url}
                              alt={data?.product?.name}
                              className="h-full w-full object-cover"
                            />

                          </div>


                          {/* PRODUCT INFO */}

                          <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
                              {data?.product?.name}
                            </h3>

                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground sm:text-sm">

                              <span>
                                Size: {data?.size}
                              </span>

                              <span>
                                Qty: {data?.quantity}
                              </span>

                            </div>

                            <p className="mt-2 font-semibold text-foreground">
                              ₹{data?.price?.toLocaleString("en-IN")}
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
                              {displayData?.paymentStatus}
                            </span>

                          </div>


                          {/* DELIVERY */}

                          {/* {displayData.orderStatus === "Delivered" &&
                            order.deliveredAt && ( */}
                          {displayData?.orderStatus === "Confirmed" && (

                            <div className="text-sm text-muted-foreground">

                              Delivered on{" "}

                              <span className="font-semibold text-foreground">
                                {/* {new Date(
                                  order.deliveredAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )} */}
                                {new Date(Date.now()).toLocaleDateString(
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
                              ₹{displayData?.totalAmount?.toLocaleString("en-IN")}
                            </p>

                          </div>


                          {/* ACTIONS */}

                          <div className="flex flex-col gap-2 sm:flex-row">

                            {/* VIEW DETAILS */}

                            <button
                              onClick={() =>
                                navigate(
                                  `/orders/${displayData._id}`
                                )
                              }
                              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                            >

                              View Details

                              <ChevronRight size={17} />

                            </button>


                            {/* BUY AGAIN */}

                            {displayData?.orderStatus === "Delivered" && (

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
                                    `/orders/${order?.id}/return`
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