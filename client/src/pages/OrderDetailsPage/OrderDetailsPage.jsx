import { ArrowLeft, CheckCircle2, Clock3, CreditCard, MapPin, Package, RotateCcw, Truck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../../features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReturnModal } from "../../components";

// --------------------------------------------------
// RETURN ELIGIBILITY
// --------------------------------------------------

const isReturnEligible = (orderData) => {
  if (orderData?.orderStatus !== "Delivered" || !orderData?.deliveredAt) {
    return false;
  }

  // const deliveredDate = new Date(order.deliveredAt);
  const deliveredDate = new Date(Date.now().toLocaleDateString);
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

  const { loading, orderData } = useSelector(state => state.order);

  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOrderById(orderId)).unwrap();
      } catch (error) {
        toast.error("Failed to fetch orders");
      }
    }

    if (orderId)
      fetchData();
  }, [orderId])

  // console.log(orderData);

  const [returnModalOpen, setReturnModalOpen] = useState(false);



  const returnEligible = isReturnEligible(orderData);

  if (loading || !orderData) {
    return (
      <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-luxury mx-auto mb-4" />
          <p className="text-sm text-[#9B7B75] font-medium">Loading order...</p>
        </div>
      </div>
    );
  }

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
              Order #{orderData._id}
            </p>

          </div>


          {/* STATUS */}

          <div className="flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">

            <StatusIcon status={orderData.orderStatus} />

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
                    {
                      new Date(orderData.updatedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    }
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

                      {new Date(Date.now()).toLocaleDateString("en-IN", {
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
                  {orderData.products.length} item
                  {orderData.products.length > 1 ? "s" : ""}
                </p>

              </div>


              <div className="divide-y divide-border">

                {orderData.products.map((product) => (

                  <div
                    key={product._id}
                    className="flex gap-4 p-5 sm:p-6"
                  >

                    {/* IMAGE */}

                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28">

                      <img
                        src={product.product.images[0].url}
                        alt={product.product.name}
                        className="h-full w-full object-cover"
                      />

                    </div>


                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <h3 className="font-semibold text-foreground">
                        {product.product.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">

                        {
                          product?.size && (
                            <span>
                              Size: {product?.size}
                            </span>
                          )
                        }

                        <span>
                          Qty: {product?.quantity}
                        </span>

                      </div>

                      <p className="mt-3 font-bold text-foreground">
                        ₹{product.price.toLocaleString("en-IN")}
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
                  {orderData.shippingAddress.fullName}
                </p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">

                  {orderData.shippingAddress.streetAddress}
                  <br />

                  {orderData.shippingAddress.city},{" "}
                  {orderData.shippingAddress.state}
                  <br />

                  PIN: {orderData.shippingAddress.pinCode}

                </p>

                <p className="mt-3 text-sm font-medium text-foreground">
                  {orderData.shippingAddress.phoneNumber}
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
                    {orderData?.payment?.paymentMethod?.toUpperCase()}
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
                    ₹{orderData?.subTotal?.toLocaleString("en-IN")}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    Shipping
                  </span>

                  <span className="font-medium text-foreground">
                    ₹{orderData?.shippingCharges?.toLocaleString("en-IN")}
                  </span>

                </div>


                <div className="flex justify-between">

                  <span className="text-muted-foreground">
                    TAX
                  </span>

                  <span className="font-medium text-foreground">
                    ₹{orderData?.tax?.toLocaleString("en-IN")}
                  </span>

                </div>


                <div className="border-t border-border pt-4">

                  <div className="flex justify-between">

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


            {/* -------------------------------------- */}
            {/* RETURN */}
            {/* -------------------------------------- */}

            {true && (

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
                  onClick={() => {
                    setReturnModalOpen(true)
                  }}
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

      <ReturnModal
        opened={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        order={orderData}
      />

    </main>
  );
};

export default OrderDetailsPage;