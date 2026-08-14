import { AlertCircle, ArrowLeft, Check, CheckCircle2, Clock3, CreditCard, MapPin, Package, RefreshCcw, RotateCcw, Truck, XCircle } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOrderById } from "../../features/orderSlice";
import { ReturnModal } from "../../components";


// --------------------------------------------------
// RETURN ELIGIBILITY
// --------------------------------------------------

const isReturnEligible = (orderData) => {
  if (
    orderData?.orderStatus !== "Delivered" ||
    !orderData?.deliveredAt
  ) {
    return false;
  }

  const deliveredDate = new Date(orderData.deliveredAt);
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
// RETURN STATUS CONFIG
// --------------------------------------------------

const getReturnStatusConfig = (status) => {
  switch (status) {

    case "Pending":
      return {
        icon: Clock3,
        className:
          "border-amber-200 bg-amber-50 text-amber-700"
      };

    case "Approved":
      return {
        icon: CheckCircle2,
        className:
          "border-blue-200 bg-blue-50 text-blue-700"
      };

    case "Rejected":
      return {
        icon: XCircle,
        className:
          "border-rose-200 bg-rose-50 text-rose-700"
      };

    case "Received":
      return {
        icon: Package,
        className:
          "border-blue-200 bg-blue-50 text-blue-700"
      };

    case "Refunded":
      return {
        icon: RefreshCcw,
        className:
          "border-purple-200 bg-purple-50 text-purple-700"
      };

    case "Completed":
      return {
        icon: CheckCircle2,
        className:
          "border-green-200 bg-green-50 text-green-700"
      };

    default:
      return {
        icon: Clock3,
        className:
          "border-gray-200 bg-gray-50 text-gray-700"
      };
  }
}


// --------------------------------------------------
// DATE FORMAT
// --------------------------------------------------

const formatDateTime = (date) => {
  if (!date) {
    return "Not available";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};


// --------------------------------------------------
// GET RETURNABLE QUANTITY
// --------------------------------------------------

const getReturnableQuantity = (
  orderData,
  orderProduct
) => {
  const alreadyReturnedQuantity =
    (orderData?.returns || [])
      .filter(
        (returnItem) =>
          returnItem.returnStatus !== "Rejected"
      )
      .reduce((total, returnItem) => {

        /*
         * Your API currently returns:
         *
         * products: {
         *     product: {...},
         *     quantity: 3,
         *     returnedQuantity: 3
         * }
         *
         * But this also supports an array.
         */

        const returnedProducts = Array.isArray(
          returnItem.products
        )
          ? returnItem.products
          : returnItem.products
            ? [returnItem.products]
            : [];

        const returnedProduct =
          returnedProducts.find((item) => {

            const returnedProductId =
              item?.product?._id ||
              item?.product;

            const orderProductId =
              orderProduct?.product?._id ||
              orderProduct?.product;

            return (
              String(returnedProductId) ===
              String(orderProductId)
            );
          });

        return (
          total +
          Number(
            returnedProduct?.quantity || 0
          )
        );
      }, 0);

  return Math.max(
    0,
    Number(orderProduct?.quantity || 0) -
    alreadyReturnedQuantity
  );
};


// --------------------------------------------------
// ORDER DETAILS PAGE
// --------------------------------------------------

const OrderDetailsPage = () => {

  const { loading, orderData } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const [returnModalOpen, setReturnModalOpen] = useState(false);


  // --------------------------------------------------
  // FETCH ORDER
  // --------------------------------------------------

  const fetchData = async () => {
    try {
      await dispatch(getOrderById(orderId)).unwrap();

    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchData();
    }

  }, [orderId, dispatch]);


  // --------------------------------------------------
  // RETURN ELIGIBILITY
  // --------------------------------------------------

  const returnEligible =
    isReturnEligible(orderData);


  // --------------------------------------------------
  // CHECK IF ANY PRODUCT CAN BE RETURNED
  // --------------------------------------------------

  const hasReturnableItems = useMemo(() => {

    if (
      orderData?.orderStatus !==
      "Delivered"
    ) {
      return false;
    }

    if (!isReturnEligible(orderData)) {
      return false;
    }

    return (
      orderData?.products || []
    ).some(
      (orderProduct) =>
        getReturnableQuantity(
          orderData,
          orderProduct
        ) > 0
    );

  }, [orderData]);


  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading || !orderData) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">

        <div className="text-center">

          <div className="spinner-luxury mx-auto mb-4" />

          <p className="text-sm text-[#9B7B75] font-medium">
            Loading order...
          </p>

        </div>

      </div>
    );
  }


  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-luxury px-4 py-8 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-6xl">


        {/* -------------------------------------------- */}
        {/* BACK */}
        {/* -------------------------------------------- */}

        <button
          onClick={() =>
            navigate("/orders")
          }
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
              Order #{orderData._id}
            </p>

          </div>


          {/* STATUS */}

          {/* <div className="flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700"> */}

          <div className={`flex w-fit items-center gap-2 rounded-full border  px-4 py-2 text-sm font-semibold orderData?.orderStatus === "Pending" && "border-amber-200 bg-amber-50 text-amber-700"} ${orderData.orderStatus === "Pending" && "border-amber-200 bg-amber-50 text-amber-700"} ${orderData.orderStatus === "Approved" && "border-blue-200 bg-blue-50 text-blue-700"} ${orderData.orderStatus === "Packed" && "border-purple-200 bg-purple-50 text-purple-700"} ${orderData.orderStatus === "Shipped" && "border-indigo-200 bg-indigo-50 text-indigo-700"} ${orderData.orderStatus === "Delivered" && "border-green-200 bg-green-50 text-green-700"} ${orderData.orderStatus === "Rejected" && "border-rose-200 bg-rose-50 text-rose-700"} ${orderData.orderStatus === "Cancelled" && "border-red-200 bg-red-50 text-red-700"} `}>

            <StatusIcon
              status={
                orderData.orderStatus
              }
            />

            {orderData.orderStatus}

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

                    {new Date(
                      orderData.createdAt ||
                      orderData.updatedAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      }
                    )}

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

                  {orderData.deliveredAt && (

                    <p className="mt-1 text-sm text-muted-foreground">

                      Delivered on{" "}

                      {new Date(
                        orderData.deliveredAt
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        }
                      )}

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

                  {orderData.products.length} item
                  {orderData.products.length > 1
                    ? "s"
                    : ""}

                </p>

              </div>


              <div className="divide-y divide-border">

                {orderData.products.map(
                  (product) => {

                    const returnableQuantity =
                      getReturnableQuantity(
                        orderData,
                        product
                      );

                    const returnedQuantity =
                      Math.max(
                        0,
                        Number(
                          product?.quantity ||
                          0
                        ) -
                        returnableQuantity
                      );


                    return (
                      <div
                        key={
                          product._id
                        }
                        className="flex gap-4 p-5 sm:p-6"
                      >


                        {/* IMAGE */}

                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">

                          {product?.product?.images?.[0]?.url ? (

                            <img
                              src={
                                product.product.images[0].url
                              }
                              alt={
                                product.product.name
                              }
                              className="h-full w-full object-cover"
                            />

                          ) : (

                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">

                              <Package
                                size={24}
                              />

                            </div>

                          )}

                        </div>


                        {/* INFO */}

                        <div className="min-w-0 flex-1">

                          <h3 className="font-semibold text-foreground">

                            {product?.product?.name}

                          </h3>


                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">

                            {product?.size && (

                              <span>
                                Size:{" "}
                                {product.size}
                              </span>

                            )}

                            <span>
                              Qty:{" "}
                              {product?.quantity}
                            </span>


                            {/* {returnedQuantity >
                              0 && (

                                <span>
                                  Returned:{" "}
                                  {
                                    returnedQuantity
                                  }
                                </span>

                              )} */}

                          </div>


                          <p className="mt-3 font-bold text-foreground">

                            ₹
                            {Number(
                              product?.price ||
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

              </div>

            </section>


            {/* ============================================ */}
            {/* RETURN DETAILS */}
            {/* ============================================ */}

            {orderData?.returns?.length > 0 && (

              <section className="card-luxury overflow-hidden">


                {/* HEADER */}

                <div className="border-b border-border p-5 sm:p-6">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">

                          <RotateCcw
                            size={20}
                            className="text-primary"
                          />

                        </div>

                        <div>

                          <h2 className="text-lg font-bold text-foreground">
                            Return Details
                          </h2>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Return requests for this order
                          </p>

                        </div>

                      </div>

                    </div>


                    <div className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary">

                      <RotateCcw size={15} />

                      {orderData.returns.length} Return
                      {orderData.returns.length > 1
                        ? "s"
                        : ""}

                    </div>

                  </div>

                </div>


                {/* RETURNS */}

                <div className="divide-y divide-border">

                  {orderData.returns.map(
                    (
                      returnItem,
                      returnIndex
                    ) => {

                      const statusConfig =
                        getReturnStatusConfig(
                          returnItem.returnStatus
                        );

                      const ReturnStatusIcon =
                        statusConfig.icon;


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


                      return (

                        <div
                          key={
                            returnItem._id
                          }
                          className="p-5 sm:p-6"
                        >


                          {/* RETURN HEADER */}

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                            <div>

                              <div className="flex flex-wrap items-center gap-3">

                                <h3 className="font-bold text-foreground">
                                  Return #
                                  {returnIndex +
                                    1}
                                </h3>


                                <span
                                  className={`
                                                                        flex
                                                                        items-center
                                                                        gap-1.5
                                                                        rounded-full
                                                                        border
                                                                        px-3
                                                                        py-1
                                                                        text-sm
                                                                        font-semibold
                                                                        ${statusConfig.className}
                                                                    `}
                                >

                                  <ReturnStatusIcon
                                    size={
                                      13
                                    }
                                  />

                                  {
                                    returnItem.returnStatus
                                  }

                                </span>

                              </div>


                              <p className="mt-1 text-xs text-muted-foreground">
                                Return ID:{" "}
                                {
                                  returnItem._id
                                }
                              </p>

                            </div>


                            {/* REFUND */}

                            <div className="sm:text-right">

                              <p className="text-xs text-muted-foreground">
                                Refund Amount
                              </p>

                              <p className="mt-1 text-xl font-bold text-foreground">

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


                          {/* RETURN INFO */}

                          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">


                            {/* REQUESTED */}

                            <div className="rounded-xl border border-border bg-background p-4">

                              <p className="text-xs text-muted-foreground">
                                Requested
                              </p>

                              <p className="mt-1 text-sm font-semibold text-foreground">

                                {formatDateTime(
                                  returnItem.requestedAt
                                )}

                              </p>

                            </div>


                            {/* REASON */}

                            <div className="rounded-xl border border-border bg-background p-4">

                              <p className="text-xs text-muted-foreground">
                                Reason
                              </p>

                              <p className="mt-1 text-sm font-semibold text-foreground">

                                {returnItem.reason ||
                                  "Not provided"}

                              </p>

                            </div>


                            {/* REFUND STATUS */}

                            <div className="rounded-xl border border-border bg-background p-4">

                              <p className="text-xs text-muted-foreground">
                                Refund Status
                              </p>

                              <p
                                className={`mt-1 text-sm font-semibold ${returnItem.refundStatus === "Completed"
                                  ? "text-green-600"
                                  : returnItem.refundStatus ===
                                    "Failed"
                                    ? "text-red-600"
                                    : "text-amber-600"
                                  }
                                                                `}
                              >
                                {
                                  returnItem.refundStatus
                                }
                              </p>

                            </div>


                            {/* APPROVED */}

                            {returnItem.approvedAt !== null ? (

                              <div className="rounded-xl border border-border bg-background p-4">

                                <p className="text-xs text-muted-foreground">
                                  Approved
                                </p>

                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {formatDateTime(returnItem.approvedAt)}
                                </p>

                              </div>

                            ) : returnItem.rejectedAt !== null ? (

                              <div className="rounded-xl border border-border bg-background p-4">

                                <p className="text-xs text-muted-foreground">
                                  Rejected
                                </p>

                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {formatDateTime(returnItem.rejectedAt)}
                                </p>

                              </div>

                            ) : returnItem.receivedAt !== null ? (

                              <div className="rounded-xl border border-border bg-background p-4">

                                <p className="text-xs text-muted-foreground">
                                  Received
                                </p>

                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {formatDateTime(returnItem.receivedAt)}
                                </p>

                              </div>

                            ) : returnItem.refundedAt !== null ? (

                              <div className="rounded-xl border border-border bg-background p-4">

                                <p className="text-xs text-muted-foreground">
                                  Refunded
                                </p>

                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {formatDateTime(returnItem.refundedAt)}
                                </p>

                              </div>

                            ) : (

                              <div className="rounded-xl border border-border bg-background p-4">

                                <p className="text-xs text-muted-foreground">
                                  Pending
                                </p>

                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {formatDateTime(returnItem.requestedAt)}
                                </p>

                              </div>

                            )}

                          </div>


                          {/* RETURNED PRODUCTS */}

                          <div className="mt-5">

                            <div className="mb-3 flex items-center justify-between">

                              <h4 className="text-sm font-bold text-foreground">
                                Returned Items
                              </h4>

                              <span className="text-xs text-muted-foreground">

                                {
                                  returnedProducts.length
                                }{" "}
                                product
                                {returnedProducts.length >
                                  1
                                  ? "s"
                                  : ""}

                              </span>

                            </div>


                            <div className="space-y-3">

                              {returnedProducts.map(
                                (
                                  returnProduct
                                ) => {

                                  const product =
                                    returnProduct.product;

                                  // console.log("returnProduct", returnProduct);


                                  return (

                                    <div
                                      key={returnProduct?.product._id}
                                      className="flex gap-4 rounded-2xl border border-border bg-background p-4"
                                    >


                                      {/* IMAGE */}

                                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">

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

                                          <div className="flex h-full w-full items-center justify-center text-muted-foreground">

                                            <Package
                                              size={
                                                24
                                              }
                                            />

                                          </div>

                                        )}

                                      </div>


                                      {/* INFO */}

                                      <div className="min-w-0 flex-1">

                                        <h5 className="line-clamp-2 font-semibold text-foreground">

                                          {
                                            product?.name ||
                                            "Product"
                                          }

                                        </h5>


                                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">

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


                                        <p className="mt-2 text-sm font-semibold text-foreground">

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

                            </div>

                          </div>


                          {/* DESCRIPTION */}

                          {returnItem.description && (

                            <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/5 p-4">

                              <div className="flex items-center gap-2">

                                <AlertCircle
                                  size={
                                    16
                                  }
                                  className="text-primary"
                                />

                                <p className="text-xs font-semibold text-foreground">
                                  Return Description
                                </p>

                              </div>

                              <p className="mt-2 text-sm leading-6 text-muted-foreground">

                                {
                                  returnItem.description
                                }

                              </p>

                            </div>

                          )}


                          {/* RETURN TIMELINE */}

                          <div className="mt-5 rounded-2xl border border-border bg-background p-4">

                            <p className="mb-4 text-sm font-bold text-foreground">
                              Return Timeline
                            </p>


                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">


                              {/* REQUESTED */}

                              <div>

                                <div className="flex items-center gap-2">

                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">

                                    <RotateCcw
                                      size={
                                        14
                                      }
                                      className="text-primary"
                                    />

                                  </div>

                                  <p className="text-xs font-semibold text-foreground">
                                    Requested
                                  </p>

                                </div>

                                <p className="mt-2 text-xs text-muted-foreground">

                                  {formatDateTime(
                                    returnItem.requestedAt
                                  )}

                                </p>

                              </div>


                              {/* APPROVED */}

                              <div>

                                <div className="flex items-center gap-2">

                                  <div
                                    className={`flex h-7 w-7 items-center justify-center rounded-full ${returnItem.returnStatus === "Rejected"
                                        ? "bg-red-50"
                                        : "bg-green-50"
                                      }`}
                                  >

                                    {returnItem.returnStatus === "Rejected" ? (
                                      <XCircle
                                        size={14}
                                        className="text-red-600"
                                      />
                                    ) : (
                                      <CheckCircle2
                                        size={14}
                                        className="text-green-600"
                                      />
                                    )}

                                  </div>


                                  <p className="text-xs font-semibold text-foreground">

                                    {returnItem.returnStatus === "Rejected"
                                      ? "Rejected"
                                      : "Approved"}

                                  </p>

                                </div>


                                <p className="mt-2 text-xs text-muted-foreground">

                                  {returnItem.returnStatus === "Rejected"
                                    ? returnItem.rejectedAt
                                      ? formatDateTime(returnItem.rejectedAt)
                                      : "Pending"
                                    : returnItem.approvedAt
                                      ? formatDateTime(returnItem.approvedAt)
                                      : "Pending"}

                                </p>

                              </div>


                              {/* RECEIVED */}

                              <div>

                                <div className="flex items-center gap-2">

                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50">

                                    <Package
                                      size={
                                        14
                                      }
                                      className="text-blue-600"
                                    />

                                  </div>

                                  <p className="text-xs font-semibold text-foreground">
                                    Received
                                  </p>

                                </div>

                                <p className="mt-2 text-xs text-muted-foreground">

                                  {returnItem.receivedAt
                                    ? formatDateTime(
                                      returnItem.receivedAt
                                    )
                                    : "Pending"}

                                </p>

                              </div>


                              {/* REFUNDED */}

                              <div>

                                <div className="flex items-center gap-2">

                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-50">

                                    <CreditCard
                                      size={
                                        14
                                      }
                                      className="text-purple-600"
                                    />

                                  </div>

                                  <p className="text-xs font-semibold text-foreground">
                                    Refunded
                                  </p>

                                </div>

                                <p className="mt-2 text-xs text-muted-foreground">

                                  {returnItem.refundedAt
                                    ? formatDateTime(
                                      returnItem.refundedAt
                                    )
                                    : "Pending"}

                                </p>

                              </div>

                            </div>

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

              </section>

            )}


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

                  {orderData?.shippingAddress?.fullName ||
                    "N/A"}

                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  {orderData?.shippingAddress?.streetAddress ||
                    "N/A"}

                  <br />

                  {orderData?.shippingAddress?.city ||
                    "N/A"}
                  ,{" "}
                  {orderData?.shippingAddress?.state ||
                    "N/A"}

                  <br />

                  PIN:{" "}
                  {orderData?.shippingAddress?.pinCode ||
                    "N/A"}

                </p>

                <p className="mt-3 text-sm font-medium text-foreground">

                  {orderData?.shippingAddress?.phoneNumber ||
                    "N/A"}

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

                    {orderData?.payment?.paymentMethod?.toUpperCase() ||
                      "N/A"}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Status
                  </span>

                  <span className="font-semibold text-green-600">
                    {orderData.paymentStatus}
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

                    ₹
                    {Number(
                      orderData?.subTotal || 0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Shipping
                  </span>

                  <span className="font-medium text-foreground">

                    ₹
                    {Number(
                      orderData?.shippingCharges ||
                      0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    TAX
                  </span>

                  <span className="font-medium text-foreground">

                    ₹
                    {Number(
                      orderData?.tax || 0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </span>

                </div>


                <div className="border-t border-border pt-4">

                  <div className="flex justify-between">

                    <span className="font-bold text-foreground">
                      Total
                    </span>

                    <span className="text-xl font-bold text-primary">

                      ₹
                      {Number(
                        orderData?.totalAmount ||
                        0
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* -------------------------------------- */}
            {/* RETURN */}
            {/* -------------------------------------- */}

            {hasReturnableItems && (

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
                    setReturnModalOpen(true)
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


      {/* RETURN MODAL */}

      <ReturnModal
        opened={returnModalOpen}
        onClose={() =>
          setReturnModalOpen(false)
        }
        order={orderData}
        fetchData={fetchData}
      />

    </main>
  );
};

export default OrderDetailsPage;