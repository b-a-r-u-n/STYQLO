import { Ban, CheckCircle2, ChevronRight, CircleX, Clock3, CreditCard, Package, RefreshCcw, Search, ShoppingBag, User, XCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { getAllReturns, updateReturn } from "../../../features/returnSlice";

const ManageReturnsPage = () => {

  const { loading, returnDatas } = useSelector((state) => state.return);

  // console.log(returnDatas);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();


  // ==================================================
  // FETCH RETURNS
  // ==================================================

  const fetchData = async () => {
    try {

      const url = "";

      await dispatch(
        getAllReturns(url)
      ).unwrap();

    } catch (error) {

      toast.error(
        error?.message ||
        error?.data?.message ||
        "Failed to fetch returns"
      );

    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  // ==================================================
  // SEARCH
  // ==================================================

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");


  // ==================================================
  // HANDLE FILTER
  // ==================================================

  const handleFilter = async (filter) => {

    setActiveFilter(filter);

    try {
      let url;
      if (filter === "All") {
        url = "";
      } else {
        url = "?returnStatus=" + filter;
      }

      await dispatch(getAllReturns(url)).unwrap();

    } catch (error) {

      toast.error(
        error?.message ||
        error?.data?.message ||
        "Failed to fetch returns"
      );

    }
  };


  // ==================================================
  // HANDLE APPROVE / REJECT
  // ==================================================

  // const handleApproveReject = async (returnId, action) => {

  //   let url = "";

  //   if (action === "approved") {
  //     url = "?returnStatus=Approved&approvedAt";

  //   } else if (action === "rejected") {
  //     url = "?returnStatus=Rejected&rejectedAt=Date.now()";
  //   }

  //   try {
  //     await dispatch(updateReturn({ returnId, url })).unwrap();

  //     await fetchData();

  //     toast.success(`Return ${action} successfully`);

  //   } catch (error) {

  //     toast.error(error?.message || error?.data?.message || "Failed to update return");

  //   }
  // };


  // ==================================================
  // HANDLE SEARCH
  // ==================================================

  const handleSearch = async () => {

    if (!search) {
      return toast.error("Please enter a search term");
    }

    try {
      const res = await dispatch(getAllReturns(`?_id=${search}`)).unwrap();

      // console.log("res", res);  

    } catch (error) {

      toast.error(error?.message || error?.data?.message || "Failed to search returns"
      );

    }

    setSearch("");
  };


  // ==================================================
  // STATUS CONFIG
  // ==================================================

  const statusConfig = {

    Pending: {
      icon: Clock3,
      className:
        "border-amber-200 bg-amber-50 text-amber-700"
    },

    Approved: {
      icon: CheckCircle2,
      className:
        "border-blue-200 bg-blue-50 text-blue-700"
    },

    Rejected: {
      icon: CircleX,
      className:
        "border-rose-200 bg-rose-50 text-rose-700"
    },

    Received: {
      icon: Package,
      className:
        "border-blue-200 bg-blue-50 text-blue-700"
    },

    Refunded: {
      icon: RefreshCcw,
      className:
        "border-purple-200 bg-purple-50 text-purple-700"
    },

    Completed: {
      icon: CheckCircle2,
      className:
        "border-green-200 bg-green-50 text-green-700"
    }

  };


  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {

    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">

        <div className="text-center">

          <div className="spinner-luxury mx-auto mb-4" />

          <p className="text-sm text-[#9B7B75] font-medium">
            Loading...
          </p>

        </div>

      </div>
    );
  }


  // ==================================================
  // PAGE
  // ==================================================

  return (

    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6 lg:px-8">

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
                Manage Returns
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Manage and review all customer return requests.
              </p>

            </div>


            {/* RETURN COUNT */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                <RefreshCcw
                  size={20}
                  className="text-primary"
                />

              </div>

              <div>

                <p className="text-xs text-muted-foreground">
                  Total Returns
                </p>

                <p className="text-xl font-bold text-foreground">
                  {returnDatas?.length || 0}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
                    SEARCH
                ================================================== */}

        <div className="mb-5 flex gap-4 items-center">

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
              placeholder="Search return..."
              className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />

          </div>


          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
          >

            <Search size={18} />

            <span className="hidden md:block">
              Search
            </span>

          </button>

        </div>


        {/* ==================================================
                    FILTERS
                ================================================== */}

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">

          {[
            "All",
            "Pending",
            "Approved",
            "Rejected",
            "Received",
            "Refunded",
            "Completed"
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
                    RETURNS
                ================================================== */}

        {returnDatas?.length > 0 ? (

          <div className="space-y-6">

            {returnDatas.map(
              (returnItem) => {

                const config =
                  statusConfig[
                  returnItem.returnStatus
                  ] || statusConfig.Pending;


                const StatusIcon =
                  config.icon;


                const returnedProducts =
                  Array.isArray(
                    returnItem.products
                  )
                    ? returnItem.products
                    : returnItem.products
                      ? [
                        returnItem.products
                      ]
                      : [];


                const totalItems =
                  returnedProducts.reduce(
                    (
                      total,
                      product
                    ) =>
                      total +
                      Number(
                        product?.quantity ||
                        0
                      ),
                    0
                  );
                return (

                  <article
                    
                    key={
                      returnItem._id
                    }
                    className="card-luxury overflow-hidden"
                  >


                    {/* ======================================
                                            RETURN HEADER
                                        ====================================== */}

                    <div className="border-b border-border px-5 py-5 sm:px-6 lg:px-7">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-lg font-bold text-foreground">

                              Return #
                              {
                                returnItem?.returnId || returnItem?._id
                              }

                            </h2>


                            <span
                              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.className}`}
                            >

                              <StatusIcon
                                size={13}
                              />

                              {
                                returnItem.returnStatus
                              }

                            </span>

                          </div>


                          <p className="mt-1.5 text-xs text-muted-foreground">

                            Requested on{" "}

                            {new Date(
                              returnItem.requestedAt ||
                              returnItem.createdAt
                            ).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                              }
                            )}

                          </p>

                        </div>


                        {/* REFUND */}

                        <div className="sm:text-right">

                          <p className="text-xs text-muted-foreground">
                            Refund Amount
                          </p>

                          <p className="mt-1 text-2xl font-bold text-foreground">

                            ₹
                            {Number(
                              returnItem.refundAmount ||
                              0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </p>

                        </div>

                      </div>

                    </div>


                    {/* ======================================
                                            RETURN CONTENT
                                        ====================================== */}

                    <div className="p-5 sm:p-6 lg:p-7">

                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-4">


                        {/* ==================================
                                                    PRODUCTS
                                                ================================== */}

                        <div className="rounded-2xl border border-border p-5">

                          <div className="mb-4 flex items-center justify-between">

                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Returned Products
                            </p>

                            <span className="text-xs font-medium text-muted-foreground">

                              {totalItems}{" "}

                              {totalItems ===
                                1
                                ? "item"
                                : "items"}

                            </span>

                          </div>


                          <div className="space-y-3">

                            {returnedProducts
                              .slice(0, 2)
                              .map(
                                (
                                  returnProduct
                                ) => {

                                  const product = returnProduct?.product;
                                  // console.log(returnProduct?.product?._id);
                                  
                                  return (

                                    <div
                                      key={ returnProduct?.product?._id }
                                      className="flex gap-3 rounded-xl bg-primary/5 p-3"
                                    >


                                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">

                                        {product?.images?.[0]?.url ? (

                                          <img
                                            src={
                                              product.images[0].url
                                            }
                                            alt={
                                              product.name
                                            }
                                            className="h-full w-full object-cover"
                                          />

                                        ) : (

                                          <div className="flex h-full w-full items-center justify-center">

                                            <Package
                                              size={
                                                24
                                              }
                                              className="text-muted-foreground"
                                            />

                                          </div>

                                        )}

                                      </div>


                                      <div className="min-w-0 flex-1">

                                        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">

                                          {
                                            product?.name ||
                                            "Product"
                                          }

                                        </h3>


                                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">

                                          <span>
                                            Qty:{" "}
                                            {
                                              returnProduct.quantity
                                            }
                                          </span>


                                          {returnProduct.size && (

                                            <span>
                                              Size:{" "}
                                              {
                                                returnProduct.size
                                              }
                                            </span>

                                          )}

                                        </div>


                                        <p className="mt-1.5 text-sm font-semibold text-foreground">

                                          ₹
                                          {Number(
                                            returnProduct.price ||
                                            0
                                          ).toLocaleString(
                                            "en-IN"
                                          )}

                                        </p>

                                      </div>

                                    </div>

                                  );

                                }
                              )}


                            {returnedProducts.length >
                              2 && (

                                <div className="rounded-xl border border-dashed border-border px-3 py-2.5 text-center text-xs font-medium text-muted-foreground">

                                  +
                                  {returnedProducts.length -
                                    2}{" "}
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

                                {
                                  returnItem
                                    ?.order
                                    ?.shippingAddress
                                    ?.fullName ||
                                  "Customer"
                                }

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

                                {
                                  returnItem
                                    ?.user
                                    ?.email ||
                                  "N/A"
                                }

                              </p>

                            </div>


                            <div>

                              <p className="text-xs text-muted-foreground">
                                Reason
                              </p>

                              <p className="mt-1 text-sm font-medium text-foreground">

                                {
                                  returnItem.reason ||
                                  "N/A"
                                }

                              </p>

                            </div>

                          </div>

                        </div>


                        {/* ==================================
                                                    REFUND
                                                ================================== */}

                        <div className="rounded-2xl border border-border p-5">

                          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Refund
                          </p>


                          <div className="flex items-center gap-2">

                            <CreditCard
                              size={18}
                              className="text-primary"
                            />

                            <span className="font-semibold text-foreground">

                              ₹
                              {Number(
                                returnItem.refundAmount ||
                                0
                              ).toLocaleString(
                                "en-IN"
                              )}

                            </span>

                          </div>


                          <div className="mt-5">

                            <p className="text-xs text-muted-foreground">
                              Refund Status
                            </p>

                            <p
                              className={`mt-2 font-semibold ${returnItem.refundStatus ===
                                "Completed"
                                ? "text-green-600"
                                : returnItem.refundStatus ===
                                  "Failed"
                                  ? "text-red-600"
                                  : "text-amber-600"
                                }`}
                            >

                              {
                                returnItem.refundStatus ||
                                "NotStarted"
                              }

                            </p>

                          </div>


                          <div className="mt-5 border-t border-border pt-4">

                            <p className="text-xs text-muted-foreground">
                              Return Quantity
                            </p>

                            <p className="mt-1 text-lg font-bold text-foreground">

                              {totalItems}

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


                            {/* APPROVE / REJECT */}

                            {/* {returnItem.returnStatus ===
                              "Pending" && (

                                <>

                                  <button
                                    onClick={() =>
                                      handleApproveReject(
                                        returnItem._id,
                                        "approved"
                                      )
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                                  >

                                    <CheckCircle2
                                      size={
                                        17
                                      }
                                    />

                                    Approve Return

                                  </button>


                                  <button
                                    onClick={() =>
                                      handleApproveReject(
                                        returnItem._id,
                                        "rejected"
                                      )
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-luxury hover:bg-red-100"
                                  >

                                    <XCircle
                                      size={
                                        17
                                      }
                                    />

                                    Reject Return

                                  </button>

                                </>

                              )} */}


                            {/* VIEW DETAILS */}

                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/returns/${returnItem._id}`
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

              }
            )}

          </div>

        ) : (

          /* ==========================================
             EMPTY
          ========================================== */

          <div className="card-luxury flex min-h-[450px] flex-col items-center justify-center px-6 py-20 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">

              <RefreshCcw
                size={38}
                className="text-primary"
              />

            </div>


            <h2 className="mt-6 text-2xl font-bold text-foreground">
              No Returns Found
            </h2>


            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">

              {search
                ? "No returns match your search."
                : `There are no ${activeFilter.toLowerCase()} returns.`}

            </p>


            {(search ||
              activeFilter !== "All") && (

                <button
                  onClick={() => {

                    setSearch("");

                    setActiveFilter(
                      "All"
                    );

                    handleFilter(
                      "All"
                    );

                  }}
                  className="mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >

                  View All Returns

                </button>

              )}

          </div>

        )}

      </div>

    </main>
  );
};


export default ManageReturnsPage;