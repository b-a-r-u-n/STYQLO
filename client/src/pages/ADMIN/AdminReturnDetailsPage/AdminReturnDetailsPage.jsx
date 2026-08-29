import { ArrowLeft, Check, CheckCircle2, Clock3, CreditCard, MapPin, Package, Phone, RefreshCcw, RotateCcw, User, X, XCircle, } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  getReturnById,
  updateReturn,
} from "../../../features/returnSlice";


const AdminReturnDetailsPage = () => {

  const {
    loading,
    returnData
  } = useSelector(
    (state) => state.return
  );

  const navigate = useNavigate();

  const { returnId } = useParams();

  const dispatch = useDispatch();


  // ==================================================
  // FETCH RETURN
  // ==================================================

  const fetchData = async () => {

    try {

      await dispatch(
        getReturnById(returnId)
      ).unwrap();

    } catch (error) {

      toast.error(
        error?.message ||
        error?.data?.message ||
        "Failed to fetch return"
      );

    }

  };


  useEffect(() => {
    fetchData();
  }, []);


  // ==================================================
  // UPDATE RETURN STATUS
  // ==================================================

  const handleStatusChange = async (status) => {

    let url = "";


    if (status === "Approved") {

      url = "?returnStatus=Approved";

    } else if (status === "Rejected") {

      url = "?returnStatus=Rejected";

    } else if (status === "Received") {

      url = "?returnStatus=Received";

    } else if (status === "Refunded") {

      url = "?returnStatus=Refunded";

    } else if (status === "Completed") {

      url = "?returnStatus=Completed";

    }


    try {

      await dispatch(
        updateReturn({
          returnId,
          url
        })
      ).unwrap();


      await fetchData();


      toast.success(
        `Return marked as ${status}`
      );

    } catch (error) {

      toast.error(
        error?.message ||
        error?.data?.message ||
        "Failed to update return"
      );

    }

  };


  // ==================================================
  // RETURN STATUS STEPS
  // ==================================================

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
      icon: RefreshCcw,
    },
    {
      name: "Completed",
      icon: Check,
    },
  ];


  const currentIndex =
    statusSteps.findIndex(
      (step) =>
        step.name ===
        returnData?.returnStatus
    );


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
  // RETURN NOT FOUND
  // ==================================================

  if (!returnData) {

    return (

      <div className="min-h-screen bg-luxury flex items-center justify-center px-4">

        <div className="text-center">

          <Package
            size={48}
            className="mx-auto text-muted-foreground"
          />

          <h2 className="mt-4 text-xl font-bold text-foreground">
            Return not found
          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            Go Back
          </button>

        </div>

      </div>

    );

  }


  // ==================================================
  // PRODUCT
  // ==================================================

  const returnProduct =
    returnData?.products;


  const product =
    returnProduct?.product;


  // ==================================================
  // PAGE
  // ==================================================

  return (

    <main className="min-h-screen bg-luxury px-4 py-6 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">


        {/* =========================================
            HEADER
        ========================================= */}

        <div className="mb-7">


          <button
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >

            <ArrowLeft size={18} />

            Back to Returns

          </button>


          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">


            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>


              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Return Details
              </h1>


              <p className="mt-2 text-sm text-muted-foreground">

                #{returnData?._id} ·{" "}

                {returnData?.createdAt &&
                  new Date(
                    returnData.createdAt
                  ).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  )}

              </p>

            </div>


            {/* CURRENT STATUS */}

            <div
              className={`
                flex w-fit items-center gap-2 rounded-full
                border px-4 py-2 text-sm font-semibold

                ${returnData?.returnStatus ===
                  "Pending"
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : ""
                }

                ${returnData?.returnStatus ===
                  "Approved"
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : ""
                }

                ${returnData?.returnStatus ===
                  "Rejected"
                  ? "border-rose-200 bg-rose-50 text-rose-700"
                  : ""
                }

                ${returnData?.returnStatus ===
                  "Received"
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                  : ""
                }

                ${returnData?.returnStatus ===
                  "Refunded"
                  ? "border-purple-200 bg-purple-50 text-purple-700"
                  : ""
                }

                ${returnData?.returnStatus ===
                  "Completed"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : ""
                }
              `}
            >

              {returnData?.returnStatus ===
                "Rejected" ? (

                <XCircle size={16} />

              ) : returnData?.returnStatus ===
                "Refunded" ? (

                <RefreshCcw size={16} />

              ) : returnData?.returnStatus ===
                "Received" ? (

                <Package size={16} />

              ) : returnData?.returnStatus ===
                "Completed" ? (

                <CheckCircle2 size={16} />

              ) : returnData?.returnStatus ===
                "Approved" ? (

                <CheckCircle2 size={16} />

              ) : (

                <Clock3 size={16} />

              )}


              {returnData?.returnStatus}

            </div>

          </div>

        </div>


        {/* =========================================
            RETURN PROGRESS
        ========================================= */}

        <section className="card-luxury mb-6 p-5 sm:p-7">


          <div>

            <h2 className="text-lg font-bold text-foreground">
              Return Progress
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage the current return status.
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
                      100
                      }%`
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
                        className={`
                          flex h-9 w-9
                          items-center justify-center
                          rounded-full border-2
                          transition-all

                          ${completed
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-muted-foreground"
                          }
                        `}
                      >

                        <Icon size={17} />

                      </div>


                      <p
                        className={`
                          mt-3 text-xs font-semibold

                          ${completed
                            ? "text-primary"
                            : "text-muted-foreground"
                          }
                        `}
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
                    className={`
                      flex items-center gap-3
                      rounded-xl border p-3

                      ${completed
                        ? "border-primary/20 bg-primary/5"
                        : "border-border"
                      }
                    `}
                  >

                    <div
                      className={`
                        flex h-9 w-9
                        items-center justify-center
                        rounded-full

                        ${completed
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                        }
                      `}
                    >

                      <Icon size={17} />

                    </div>


                    <span
                      className={`
                        text-sm font-semibold

                        ${completed
                          ? "text-primary"
                          : "text-muted-foreground"
                        }
                      `}
                    >

                      {step.name}

                    </span>

                  </div>

                );

              }
            )}

          </div>


          {/* ======================================
              ACTIONS
          ====================================== */}

          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">


            {/* PENDING */}

            {returnData?.returnStatus ===
              "Pending" && (

                <>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        "Approved"
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                  >

                    <Check size={18} />

                    Accept Return

                  </button>


                  <button
                    onClick={() =>
                      handleStatusChange(
                        "Rejected"
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 font-semibold text-red-600 transition-luxury hover:bg-red-100"
                  >

                    <X size={18} />

                    Reject Return

                  </button>

                </>

              )}


            {/* APPROVED */}

            {returnData?.returnStatus ===
              "Approved" && (

                <button
                  onClick={() =>
                    handleStatusChange(
                      "Received"
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >

                  <Package size={18} />

                  Mark as Received

                </button>

              )}


            {/* RECEIVED */}

            {returnData?.returnStatus ===
              "Received" && (

                <button
                  onClick={() =>
                    handleStatusChange(
                      "Refunded"
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >

                  <RefreshCcw size={18} />

                  Mark as Refunded

                </button>

              )}


            {/* REFUNDED */}

            {returnData?.returnStatus ===
              "Refunded" && (

                <button
                  onClick={() =>
                    handleStatusChange(
                      "Completed"
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                >

                  <CheckCircle2 size={18} />

                  Mark as Completed

                </button>

              )}


            {/* COMPLETED */}

            {returnData?.returnStatus ===
              "Completed" && (

                <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-50 py-3.5 font-semibold text-green-700">

                  <CheckCircle2 size={18} />

                  Return Completed

                </div>

              )}


            {/* REJECTED */}

            {returnData?.returnStatus ===
              "Rejected" && (

                <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3.5 font-semibold text-red-700">

                  <XCircle size={18} />

                  Return Rejected

                </div>

              )}

          </div>

        </section>


        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">


          {/* ======================================
              LEFT
          ====================================== */}

          <div className="space-y-6">


            {/* ==================================
                RETURNED PRODUCT
            ================================== */}

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


                {/* IMAGE */}

                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">

                  <img
                    src={
                      product?.images?.[0]?.url
                    }
                    alt={
                      product?.name
                    }
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* PRODUCT INFO */}

                <div className="min-w-0 flex-1">

                  <h3 className="font-semibold text-foreground">

                    {
                      product?.name
                    }

                  </h3>


                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">


                    {returnProduct?.size && (

                      <span>
                        Size:{" "}
                        {
                          returnProduct.size
                        }
                      </span>

                    )}


                    <span>
                      Quantity:{" "}
                      {
                        returnProduct?.quantity
                      }
                    </span>


                    {/* <span>
                      Returned:{" "}
                      {
                        returnProduct?.returnedQuantity
                      }
                    </span> */}

                  </div>


                  <p className="mt-3 font-bold text-foreground">

                    ₹
                    {Number(
                      returnProduct?.price ||
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </p>

                </div>

              </div>

            </section>


            {/* ==================================
                RETURN INFORMATION
            ================================== */}

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
                    Return Information
                  </h2>

                  <p className="text-xs text-muted-foreground">
                    Return request details
                  </p>

                </div>

              </div>


              <div className="mt-5 grid gap-4 sm:grid-cols-2">


                {/* REASON */}

                <div>

                  <p className="text-xs text-muted-foreground">
                    Reason
                  </p>

                  <p className="mt-1 font-semibold text-foreground">

                    {
                      returnData?.reason ||
                      "N/A"
                    }

                  </p>

                </div>


                {/* QUANTITY */}

                <div>

                  <p className="text-xs text-muted-foreground">
                    Return Quantity
                  </p>

                  <p className="mt-1 font-semibold text-foreground">

                    {
                      returnProduct?.quantity ||
                      0
                    }

                  </p>

                </div>


                {/* DESCRIPTION */}

                <div className="sm:col-span-2">

                  <p className="text-xs text-muted-foreground">
                    Description
                  </p>

                  <p className="mt-1 font-semibold text-foreground">

                    {
                      returnData?.description ||
                      "No description provided"
                    }

                  </p>

                </div>

              </div>

            </section>


            {/* ==================================
                CUSTOMER
            ================================== */}

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

                    {
                      returnData?.user?.fullName ||
                      returnData?.order?.shippingAddress?.fullName
                    }

                  </p>

                </div>


                <div>

                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <div className="mt-1 flex items-center gap-2 font-semibold text-foreground">

                    <Phone size={15} />

                    {
                      returnData?.user?.phoneNumber ||
                      returnData?.order?.shippingAddress?.phoneNumber
                    }

                  </div>

                </div>


                <div className="sm:col-span-2">

                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="mt-1 break-all font-semibold text-foreground">

                    {
                      returnData?.user?.email
                    }

                  </p>

                </div>

              </div>

            </section>


            {/* ==================================
                SHIPPING ADDRESS
            ================================== */}

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
                    Original order shipping information
                  </p>

                </div>

              </div>


              <div className="mt-5 rounded-2xl border border-border bg-primary/5 p-5">


                <p className="font-semibold text-foreground">

                  {
                    returnData?.order
                      ?.shippingAddress
                      ?.fullName
                  }

                </p>


                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  {
                    returnData?.order
                      ?.shippingAddress
                      ?.streetAddress
                  }

                  <br />

                  {
                    returnData?.order
                      ?.shippingAddress
                      ?.city
                  }
                  ,{" "}

                  {
                    returnData?.order
                      ?.shippingAddress
                      ?.state
                  }

                  <br />

                  PIN:{" "}

                  {
                    returnData?.order
                      ?.shippingAddress
                      ?.pinCode
                  }

                </p>


                <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">

                  <Phone size={15} />

                  {
                    returnData?.order
                      ?.shippingAddress
                      ?.phoneNumber
                  }

                </p>

              </div>

            </section>

          </div>


          {/* ======================================
              RIGHT
          ====================================== */}

          <div className="space-y-6">


            {/* ==================================
                REFUND
            ================================== */}

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


                <div className="flex items-center justify-between gap-4">

                  <span className="text-muted-foreground">
                    Refund Status
                  </span>

                  <span
                    className={`
                      rounded-full px-3 py-1
                      text-xs font-semibold

                      ${returnData?.refundStatus ===
                        "Completed"
                        ? "bg-green-50 text-green-700"
                        : returnData?.refundStatus ===
                          "Failed"
                          ? "bg-red-50 text-red-700"
                          : "bg-amber-50 text-amber-700"
                      }
                    `}
                  >

                    {
                      returnData?.refundStatus ||
                      "NotStarted"
                    }

                  </span>

                </div>


                <div className="flex items-center justify-between gap-4">

                  <span className="text-muted-foreground">
                    Refund Amount
                  </span>

                  <span className="text-lg font-bold text-foreground">

                    ₹
                    {Number(
                      returnData?.refundAmount ||
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="flex items-center justify-between gap-4">

                  <span className="text-muted-foreground">
                    Payment
                  </span>

                  <span className="font-semibold text-foreground">

                    {
                      returnData?.refundPayment
                        ? "Processed"
                        : "Not Started"
                    }

                  </span>

                </div>

              </div>

            </section>


            {/* ==================================
                RETURN TIMESTAMPS
            ================================== */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Return Timeline
              </h2>


              <div className="mt-5 space-y-4">


                {/* REQUESTED */}

                <div className="rounded-xl border border-border bg-background p-4">

                  <p className="text-xs text-muted-foreground">
                    Requested
                  </p>

                  <p className="mt-1 text-sm font-semibold text-foreground">

                    {
                      returnData?.requestedAt
                        ? new Date(
                          returnData.requestedAt
                        ).toLocaleString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                        : "N/A"
                    }

                  </p>

                </div>


                {/* APPROVED / REJECTED */}

                {returnData?.returnStatus ===
                  "Approved" && (

                    <div className="rounded-xl border border-border bg-background p-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50">

                          <CheckCircle2
                            size={14}
                            className="text-green-600"
                          />

                        </div>

                        <p className="text-xs font-semibold text-foreground">
                          Approved
                        </p>

                      </div>


                      <p className="mt-2 text-xs text-muted-foreground">

                        {
                          returnData?.approvedAt
                            ? new Date(
                              returnData.approvedAt
                            ).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                            : "Not yet"
                        }

                      </p>

                    </div>

                  )}


                {returnData?.returnStatus ===
                  "Rejected" && (

                    <div className="rounded-xl border border-border bg-background p-4">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50">

                          <XCircle
                            size={14}
                            className="text-red-600"
                          />

                        </div>

                        <p className="text-xs font-semibold text-foreground">
                          Rejected
                        </p>

                      </div>


                      <p className="mt-2 text-xs text-muted-foreground">

                        {
                          returnData?.rejectedAt
                            ? new Date(
                              returnData.rejectedAt
                            ).toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                            : "Not yet"
                        }

                      </p>

                    </div>

                  )}


                {/* RECEIVED */}

                {returnData?.receivedAt && (

                  <div className="rounded-xl border border-border bg-background p-4">

                    <p className="text-xs text-muted-foreground">
                      Received
                    </p>

                    <p className="mt-1 text-sm font-semibold text-foreground">

                      {
                        new Date(
                          returnData.receivedAt
                        ).toLocaleString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      }

                    </p>

                  </div>

                )}


                {/* REFUNDED */}

                {returnData?.refundedAt && (

                  <div className="rounded-xl border border-border bg-background p-4">

                    <p className="text-xs text-muted-foreground">
                      Refunded
                    </p>

                    <p className="mt-1 text-sm font-semibold text-foreground">

                      {
                        new Date(
                          returnData.refundedAt
                        ).toLocaleString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )
                      }

                    </p>

                  </div>

                )}

              </div>

            </section>


            {/* ==================================
                ORDER PRICE DETAILS
            ================================== */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Original Order Price
              </h2>


              <div className="mt-5 space-y-4 text-sm">


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span className="font-medium">

                    ₹
                    {Number(
                      returnData?.order?.subTotal ||
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Shipping
                  </span>

                  <span className="font-medium">

                    ₹
                    {Number(
                      returnData?.order?.shippingCharges ||
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    tax
                  </span>

                  <span className="font-medium">

                    ₹
                    {Number(
                      returnData?.order?.tax ||
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="border-t border-border pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-foreground">
                      Order Total
                    </span>

                    <span className="text-xl font-bold text-primary">

                      ₹
                      {Number(
                        returnData?.order?.totalAmount ||
                        0
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>

                </div>


                {/* REFUND */}

                <div className="border-t border-border pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-foreground">
                      Refund Amount
                    </span>

                    <span className="text-xl font-bold text-green-600">

                      ₹
                      {Number(
                        returnData?.refundAmount ||
                        0
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* ==================================
                PAYMENT DETAILS
            ================================== */}

            <section className="card-luxury p-5 sm:p-6">

              <h2 className="font-bold text-foreground">
                Payment Details
              </h2>


              <div className="mt-5 space-y-4">


                <div>

                  <p className="text-xs text-muted-foreground">
                    Payment Status
                  </p>

                  <p className={`mt-1 text-sm font-semibold text-foreground ${returnData?.order?.paymentStatus === "Paid" ? "text-green-500" : "text-rose-400"}`}>

                    {
                      returnData?.order
                        ?.paymentStatus
                    }

                  </p>

                </div>


                <div>

                  <p className="text-xs text-muted-foreground">
                    {
                      returnData?.order
                        ?.razorpayOrderId ? "Razorpay Order ID" : "Payment Method"
                    }
                  </p>

                  <p className="mt-1 break-all text-xs font-medium text-foreground">

                    {
                      returnData?.order
                        ?.razorpayOrderId ? returnData?.order
                        ?.razorpayOrderId : "COD"
                    }

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