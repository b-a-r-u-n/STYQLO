import { Check, ChevronRight, Clock3, MapPin, Package, Phone, ShoppingBag, X, } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders, updateOrder } from "../../../features/orderSlice";
import { createManifest, createShiprocketOrder, generateAWB, generateLabelAndInvoice, getCourierDetails, requestPickup } from "../../../services/courier";
import { CourierModal, ShipmentModal } from "../../../components";

const PendingOrdersPage = () => {

  const { loading, allOrdersData } = useSelector(state => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const url = "?orderStatus=Pending";
      const res = await dispatch(getAllOrders(url)).unwrap();
      // console.log(res[0]);

    } catch (error) {
      toast.error(error?.message || error?.data?.message || "Failed to fetch orders");
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const [currentPageLoading, setCurrentPageLoading] = useState(false);
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [couriers, setCouriers] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showShipmentModal, setShowShipmentModal] = useState(false);
  const [shipmentStep, setShipmentStep] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [awbData, setAwbData] = useState(null);
  const [labelData, setLabelData] = useState(null);
  const [pickupData, setPickupData] = useState(null);
  const [manifestData, setManifestData] = useState(null);
  const [packedData, setPackedData] = useState(null);
  const [urlContent, setUrlContent] = useState(null);

  const handleAcceptAndReject = async (orderId, string, order) => {
    let url = "";
    if (string === "accepted")
      url = "?orderStatus=Confirmed";
    else if (string === "rejected")
      url = "?orderStatus=Rejected";

    setCurrentPageLoading(true);

    try {
      setUrlContent(url);
      // console.log(order);

      if (string === "accepted") {        
        if(!order?.shiprocket?.shipmentId || order?.shiprocket?.shipmentId === "undefined"){
          console.log("Creating Shiprocket order for orderId:", orderId);
          await createShiprocketOrder(orderId);
        }

        const response = await getCourierDetails(orderId);

        console.log(response.data);
        setCouriers(response?.data || response || []);
        setSelectedOrderId(orderId);
        setShowCourierModal(true);

      } else if (string === "rejected") {
        toast.success(`Order ${string} successfully`);
        fetchData();
      }

    } catch (error) {
      // console.error(error);
      toast.error(error.response?.data?.message || error?.message || "Failed to fetch orders");
      setCurrentPageLoading(false);
    } finally {
      setCurrentPageLoading(false);
    }
  }

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
                  {allOrdersData.length}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ============================================ */}
        {/* ORDERS */}
        {/* ============================================ */}

        {
          currentPageLoading ?
            (
              <div className="min-h-screen bg-[#FBF8F5] flex items-center justify-center">
                <div className="text-center">
                  <div className="spinner-luxury mx-auto mb-4" />
                  <p className="text-sm text-[#9B7B75] font-medium">Loading...</p>
                </div>
              </div>
            )

            :

            (

              allOrdersData?.length > 0 ? (

                <div className="space-y-6">

                  {allOrdersData.map((order) => (

                    <article
                      key={order._id}
                      className="card-luxury overflow-hidden"
                    >

                      {/* ================================== */}
                      {/* ORDER HEADER */}
                      {/* ================================== */}

                      <div className="flex flex-col gap-4 border-b border-border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-lg font-bold text-foreground">
                              #{order._id}
                            </h2>

                            <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">

                              <Clock3 size={13} />

                              Pending

                            </span>

                          </div>

                          <p className="mt-1 text-xs text-muted-foreground">
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


                        <div className="text-left sm:text-right">

                          <p className="text-xs text-muted-foreground">
                            Order Total
                          </p>

                          <p className="mt-1 text-xl font-bold text-foreground">
                            ₹{order.totalAmount?.toLocaleString("en-IN")}
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

                            {order.products?.map((product) => (

                              <div
                                key={product._id}
                                className="flex gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4"
                              >

                                {/* IMAGE */}

                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">

                                  <img
                                    src={product?.product?.images[0].url}
                                    alt={product?.product?.name}
                                    className="h-full w-full object-cover"
                                  />

                                </div>


                                {/* INFO */}

                                <div className="min-w-0 flex-1">

                                  <h4 className="truncate font-semibold text-foreground">
                                    {product?.product?.name}
                                  </h4>

                                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">

                                    <span>
                                      Size: {product?.size}
                                    </span>

                                    <span>
                                      Qty: {product?.quantity}
                                    </span>

                                  </div>

                                  <p className="mt-2 font-semibold text-foreground">
                                    ₹{product?.price?.toLocaleString("en-IN")}
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

                              {order.payment?.paymentMethod || order.paymentMethod}

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
                                {order?.shippingAddress?.fullName}
                              </p>

                              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">

                                <Phone size={15} />

                                {order?.shippingAddress?.phoneNumber}

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

                              {order.shippingAddress.streetAddress}
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
                                  handleAcceptAndReject(order?._id, "accepted", order)
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                              >

                                <Check size={18} />

                                Accept Order

                              </button>


                              {/* REJECT */}

                              <button
                                onClick={() =>
                                  handleAcceptAndReject(order?._id, "rejected")
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3.5 font-semibold text-red-600 transition-luxury hover:bg-red-100"
                              >

                                <X size={18} />

                                Reject Order

                              </button>

                              {/* DETAILS */}

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

              )

            )
        }

      </div>

      <CourierModal
        isOpen={showCourierModal}
        onClose={() => setShowCourierModal(false)}
        couriers={couriers}
        onSelectCourier={async (courier) => {
          try {

            setSelectedCourier(courier);
            setShowCourierModal(false);
            setShowShipmentModal(true);
            setShipmentStep("generating-awb");

            // setAwbData({courier_name: "Delhivery", awb_code: 123445});
            // setTimeout(() => {
            //   console.log(awbData);
            //   setLabelData({label: "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/4477576/labels/2f763cd0c954ab5b3fd224b075326ed2.pdf", invoice: "https://kr-shipmultichannel-mum.s3.ap-south-1.amazonaws.com/4477576/labels/2f763cd0c954ab5b3fd224b075326ed2.pdf"})
            //   setShipmentStep("awb-generated");
            // }, 10000);

            const response = await generateAWB({ orderId: selectedOrderId, courierId: courier?.courier_company_id });

            // console.log("AWB Response:", response);

            setAwbData(response?.data || response);

            setShipmentStep("awb-generated");

          } catch (error) {
            // console.error(error);
            toast.error(error.response?.data?.message || error?.message || "Failed to generate AWB");
            // setShowShipmentModal(false);
            setShipmentStep("error");
          }

          // Call your Shiprocket assign/generate AWB API here
        }}
      />

      <ShipmentModal
        isOpen={showShipmentModal}
        onClose={() => setShowShipmentModal(false)}
        step={shipmentStep}
        order={allOrdersData.find(
          (order) => order._id === selectedOrderId
        )}
        selectedCourier={selectedCourier}
        awbData={awbData}
        labelData={labelData}
        selectedOrderId={selectedOrderId}
        setLabelData={setLabelData}
        setShipmentStep={setShipmentStep}
        setAwbData={setAwbData}
        packedData={packedData}
        pickupData={pickupData}
        manifestData={manifestData}

        onGenerateLabel={async () => {
          // next Shiprocket API
          try {

            setShipmentStep("generating-label");

            const response = await generateLabelAndInvoice(selectedOrderId);

            // console.log("Label Response:", response);

            setLabelData(response?.data || response)

            setShipmentStep("label-generated");

          } catch (error) {
            toast.error(error.response?.data?.message || error?.message || "Failed to generate label and invoice");
            // setShowShipmentModal(false);
            setShipmentStep("error");
          }

        }}

        onMarkPacked={async () => {
          // update order status to 
          try {

            setShipmentStep("packing");

            const response = await dispatch(updateOrder({ orderId: selectedOrderId, url: "?orderStatus=Packed" })).unwrap();

            // console.log("response", response);           
            
            setPackedData(response);
            
            setShipmentStep("packed");
          } catch (error) {
            toast.error(error.response?.data?.message || error?.message || "Failed to Update status");
            // setShowShipmentModal(false);
            setShipmentStep("error");
          }
        }}

        onRequestPickup={async () => {
          // Shiprocket pickup 
          try {

            setShipmentStep("requesting-pickup");

            const response = await requestPickup(selectedOrderId);

            // console.log("Request pickup Response:", response);

            setPickupData(response?.data);

            setShipmentStep("pickup-requested");
          } catch (error) {
            toast.error(error.response?.data?.message || error?.message || "Failed to request pickup");
            // setShowShipmentModal(false);
            setShipmentStep("error");
          }
        }}

        onGenerateManifest={async () => {
          try {

            setShipmentStep("generating-manifest");

            const response = await createManifest(selectedOrderId);
            // console.log("Manifest generate Response:", response);

            setManifestData(response?.data);

            setShipmentStep("manifest-generated");

            const res = await dispatch(updateOrder({ orderId, url: urlContent })).unwrap();

            toast.success(`Order accepted successfully`);
            fetchData();
          } catch (error) {
            toast.error(error.response?.data?.message || error?.message || "Failed to generate manifest");
            // setShowShipmentModal(false);
            setShipmentStep("error");
          }
        }}
      />

    </main>
  );
};

export default PendingOrdersPage;