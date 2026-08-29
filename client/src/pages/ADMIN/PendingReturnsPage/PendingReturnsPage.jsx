import { Check, ChevronRight, Clock3, MapPin, Package, Phone, RefreshCcw, ShoppingBag, X } from "lucide-react";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllReturns, updateReturn, } from "../../../features/returnSlice";
import { assignReturnAWB, createReturnShipment, getReturnCourierOptions, requestReturnPickup } from "../../../services/courier";
import { CourierModal, ShipmentReturnModal } from "../../../components";
import { useState } from "react";


const PendingReturnsPage = () => {

  const { loading, returnDatas } = useSelector((state) => state.return);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(returnDatas);


  // ==================================================
  // FETCH PENDING RETURNS
  // ==================================================

  const fetchData = async () => {

    try {

      const url =
        "?returnStatus=Pending";

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

  const [currentPageLoading, setCurrentPageLoading] = useState(false);
  const [showCourierModal, setShowCourierModal] = useState(false);
  const [couriers, setCouriers] = useState([]);
  const [selectedReturnId, setSelectedReturnId] = useState(null);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [showShipmentReturnModal, setShowShipmentReturnModal] = useState(false);
  const [shipmentStep, setShipmentStep] = useState(null);
  const [awbData, setAwbData] = useState(null);
  const [pickupData, setPickupData] = useState(null);


  // ==================================================
  // APPROVE / REJECT RETURN
  // ==================================================

  const handleAcceptAndReject = async (returnId, returnData, action) => {

    let url = "";

    if (action === "approved") {

      url = "?returnStatus=Approved";

    } else if (action === "rejected") {

      url = "?returnStatus=Rejected";

    }

    setCurrentPageLoading(true);

    try {

      // await dispatch(updateReturn({ returnId, url })).unwrap();

      if (action === "approved") {

        if (!returnData?.shiprocket?.shipmentId)
          await createReturnShipment(returnId);

        const response = await getReturnCourierOptions(returnId);
        // console.log(response);

        setCouriers(response?.data || response || []);
        setSelectedReturnId(returnId);
        setShowCourierModal(true);

      } else if (action === "rejected") {

        await fetchData();
        toast.success(`Return ${action} successfully`);

      }

    } catch (error) {

      toast.error(error.response?.data?.message || error?.message || "Failed to update return");
      setCurrentPageLoading(false);
    } finally {
      setCurrentPageLoading(false);
    }

  };


  // ==================================================
  // LOADING
  // ==================================================

  if (loading || currentPageLoading) {

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

      <div className="mx-auto max-w-7xl">


        {/* ==================================================
                    HEADER
                ================================================== */}

        <div className="mb-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">


            <div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                STYQLO ADMIN
              </p>


              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Pending Returns
              </h1>


              <p className="mt-2 text-sm text-muted-foreground">
                Review and manage customer return requests.
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

                  {returnDatas?.length || 0}

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
                    RETURNS
                ================================================== */}

        {returnDatas?.length > 0 ? (

          <div className="space-y-6">


            {returnDatas.map(
              (returnData) => {

                /*
                 * Your API returns products as an object:
                 *
                 * products: {
                 *     product: {...},
                 *     quantity: 3,
                 *     returnedQuantity: 3,
                 *     price: 499,
                 *     size: null
                 * }
                 *
                 * This converts it to an array
                 * so the UI can use .map().
                 */

                const returnedProducts =
                  Array.isArray(
                    returnData?.products
                  )
                    ? returnData.products
                    : returnData?.products
                      ? [
                        returnData.products
                      ]
                      : [];


                return (

                  <article
                    key={
                      returnData._id
                    }
                    className="card-luxury overflow-hidden"
                  >


                    {/* ==================================
                                            RETURN HEADER
                                        ================================== */}

                    <div className="flex flex-col gap-4 border-b border-border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                      <div>

                        <div className="flex flex-wrap items-center gap-3">


                          <h2 className="text-lg font-bold text-foreground">

                            #
                            {
                              returnData.returnId || returnData._id
                            }

                          </h2>


                          <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">

                            <Clock3
                              size={13}
                            />

                            Pending

                          </span>

                        </div>


                        <p className="mt-1 text-xs text-muted-foreground">

                          Requested on{" "}

                          {new Date(
                            returnData.requestedAt ||
                            returnData.createdAt
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

                      <div className="text-left sm:text-right">

                        <p className="text-xs text-muted-foreground">
                          Refund Amount
                        </p>


                        <p className="mt-1 text-xl font-bold text-foreground">

                          ₹
                          {Number(
                            returnData?.refundAmount ||
                            0
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </p>

                      </div>

                    </div>


                    {/* ==================================
                                            RETURN CONTENT
                                        ================================== */}

                    <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">


                      {/* =================================
                                                LEFT - PRODUCT
                                            ================================= */}

                      <div className="p-5 sm:p-6">


                        <div className="mb-5 flex items-center gap-2">

                          <ShoppingBag
                            size={18}
                            className="text-primary"
                          />

                          <h3 className="font-bold text-foreground">
                            Returned Items
                          </h3>

                        </div>


                        <div className="space-y-4">


                          {returnedProducts.map(
                            (
                              returnProduct
                            ) => {

                              const product =
                                returnProduct?.product;


                              return (

                                <div
                                  key={
                                    returnProduct?._id ||
                                    product?._id
                                  }
                                  className="flex gap-4 rounded-2xl border border-border bg-card p-3 sm:p-4"
                                >


                                  {/* IMAGE */}

                                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">

                                    {product?.images?.[0]?.url ? (

                                      <img
                                        src={
                                          product.images[0].url
                                        }
                                        alt={
                                          product?.name
                                        }
                                        className="h-full w-full object-cover"
                                      />

                                    ) : (

                                      <div className="flex h-full w-full items-center justify-center">

                                        <Package
                                          size={
                                            28
                                          }
                                          className="text-muted-foreground"
                                        />

                                      </div>

                                    )}

                                  </div>


                                  {/* INFO */}

                                  <div className="min-w-0 flex-1">

                                    <h4 className="truncate font-semibold text-foreground">

                                      {
                                        product?.name
                                      }

                                    </h4>


                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">


                                      {returnProduct?.size && (

                                        <span>
                                          Size:{" "}
                                          {
                                            returnProduct.size
                                          }
                                        </span>

                                      )}


                                      <span>
                                        Qty:{" "}
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


                                    <p className="mt-2 font-semibold text-foreground">

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

                              );

                            }
                          )}

                        </div>


                        {/* RETURN REASON */}

                        <div className="mt-5 rounded-2xl border border-border bg-primary/5 p-4">

                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Return Reason
                          </p>


                          <p className="mt-2 text-sm font-medium text-foreground">

                            {
                              returnData?.reason ||
                              "No reason provided"
                            }

                          </p>

                        </div>


                        {/* DESCRIPTION */}

                        {returnData?.description && (

                          <div className="mt-4 rounded-2xl border border-border bg-card p-4">

                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Description
                            </p>


                            <p className="mt-2 text-sm leading-6 text-muted-foreground">

                              {
                                returnData.description
                              }

                            </p>

                          </div>

                        )}


                        {/* REFUND */}

                        <div className="mt-5 flex flex-wrap gap-3">

                          <div className="rounded-xl bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">

                            Refund: ₹
                            {Number(
                              returnData?.refundAmount ||
                              0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </div>


                          <div className="rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">

                            Refund Status:{" "}

                            {
                              returnData?.refundStatus ||
                              "NotStarted"
                            }

                          </div>

                        </div>

                      </div>


                      {/* =================================
                                                RIGHT - CUSTOMER
                                            ================================= */}

                      <div className="border-t border-border bg-primary/5 p-5 sm:p-6 lg:border-l lg:border-t-0">


                        {/* CUSTOMER */}

                        <div>

                          <h3 className="font-bold text-foreground">
                            Customer
                          </h3>


                          <div className="mt-4">


                            <p className="font-semibold text-foreground">

                              {
                                returnData?.user?.fullName ||
                                returnData?.order?.shippingAddress?.fullName ||
                                "Customer"
                              }

                            </p>


                            <p className="mt-2 text-sm text-muted-foreground">

                              {
                                returnData?.user?.email ||
                                "No email"
                              }

                            </p>


                            {returnData?.order?.shippingAddress?.phoneNumber && (

                              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">

                                <Phone
                                  size={15}
                                />

                                {
                                  returnData.order.shippingAddress.phoneNumber
                                }

                              </div>

                            )}

                          </div>

                        </div>


                        {/* ADDRESS */}

                        {returnData?.order?.shippingAddress && (

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

                              {
                                returnData.order.shippingAddress.streetAddress
                              }

                              <br />

                              {
                                returnData.order.shippingAddress.city
                              }
                              ,{" "}

                              {
                                returnData.order.shippingAddress.state
                              }

                              <br />

                              PIN:{" "}

                              {
                                returnData.order.shippingAddress.pinCode
                              }

                            </p>

                          </div>

                        )}


                        {/* RETURN ACTIONS */}

                        <div className="mt-6 border-t border-border pt-5">

                          <p className="mb-3 text-xs text-muted-foreground">
                            Return Action
                          </p>


                          <div className="flex flex-col gap-3">


                            {/* ACCEPT */}

                            <button
                              onClick={() =>
                                handleAcceptAndReject(
                                  returnData?._id,
                                  returnData,
                                  "approved"
                                )
                              }
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-luxury hover:-translate-y-0.5 hover:shadow-hover"
                            >

                              <Check
                                size={18}
                              />

                              Accept Return

                            </button>


                            {/* REJECT */}

                            <button
                              onClick={() =>
                                handleAcceptAndReject(
                                  returnData?._id,
                                  "rejected"
                                )
                              }
                              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3.5 font-semibold text-red-600 transition-luxury hover:bg-red-100"
                            >

                              <X
                                size={18}
                              />

                              Reject Return

                            </button>


                            {/* DETAILS */}

                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/returns/${returnData._id}`
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


          /* ==================================================
             EMPTY STATE
          ================================================== */

          <div className="card-luxury flex flex-col items-center justify-center px-6 py-24 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">

              <Package
                size={40}
                className="text-primary"
              />

            </div>


            <h2 className="mt-6 text-2xl font-bold text-foreground">
              No Pending Returns
            </h2>


            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              You're all caught up. New customer return requests will appear here.
            </p>

          </div>

        )}

      </div>

      <CourierModal
        isOpen={showCourierModal}
        onClose={() => setShowCourierModal(false)}
        couriers={couriers}
        onSelectCourier={async (courier) => {
          try {

            setSelectedCourier(courier);
            setShowCourierModal(false);
            setShowShipmentReturnModal(true);
            setShipmentStep("generating-awb");

            // setTimeout(() => {
            //   setAwbData({courier_name: "Delhivery", awb_code: 123445});
            //   console.log(awbData);
            //   setShipmentStep("awb-generated");
            // }, 10000);

            const response = await assignReturnAWB({ returnId: selectedReturnId, courierId: courier?.courier_company_id });

            console.log("AWB Response:", response);

            setAwbData(response?.data || response);

            setShipmentStep("awb-generated");

          } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error?.message || "Failed to generate AWB");
            setShipmentStep("error");
          }
        }}
      />


      <ShipmentReturnModal
        isOpen={showShipmentReturnModal}
        onClose={() => setShowShipmentReturnModal(false)}
        step={shipmentStep}
        returns={returnDatas.find(
          (returns) => returns._id === selectedReturnId
        )}
        selectedCourier={selectedCourier}
        awbData={awbData}
        selectedReturnId={selectedReturnId}
        setShipmentStep={setShipmentStep}
        setAwbData={setAwbData}
        pickupData={pickupData}

        onRequestPickup={async () => {
          // Shiprocket pickup 
          try {

            setShipmentStep("requesting-pickup");

            const response = await requestReturnPickup(selectedReturnId);

            // console.log("Request pickup Response:", response);

            setPickupData(response?.data);

            setShipmentStep("pickup-requested");

            toast.success(`Return accepted successfully`);
            fetchData();
          } catch (error) {
            toast.error(error.response?.data?.message || error?.message || "Failed to request pickup");
            // setShowShipmentReturnModal(false);
            setShipmentStep("error");
          }
        }}
      />

    </main>

  );

};


export default PendingReturnsPage;