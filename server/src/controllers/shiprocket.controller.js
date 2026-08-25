import { Order } from "../models/order.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { assignCourierAndGenerateAWB, checkCourierServiceability, checkPinCode, createShiprocketOrder, generateLabelAndInvoice, generateManifest, getShiprocketToken, requestShipmentPickup } from "../utils/shiprocket.js";

const createShipmentOrder = asyncHandler(async (req, res) => {

    const { orderId } = req.params;

    await getShiprocketToken();

    const order = await Order.findById(orderId)
        .populate("products.product")
        .populate("user")

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    if (order.paymentStatus !== "Paid" && order.paymentMethod === "Razorpay") {
        return res.status(400).json({
            success: false,
            message: "Order payment is not completed"
        });
    }

    if (order.shiprocket?.shipmentId) {
        return res.status(400).json({
            success: false,
            message: "Shipment already created"
        });
    }

    const shiprocketResponse = await createShiprocketOrder(order);

    if (!shiprocketResponse)
        throw new apiError(500, "Error while creating Shiprocket shipment");

    // console.log("shiprocketResponse", shiprocketResponse);

    order.shiprocket = {
        orderId: String(shiprocketResponse.order_id),
        shipmentId: String(shiprocketResponse.shipment_id),
        status: shiprocketResponse.status
    }

    await order.save();

    res.status(200).json({
        success: true,
        message: "Shiprocket shipment created successfully",
        data: {
            orderId: order._id,
            shiprocketOrderId:
                shiprocketResponse.order_id,
            shipmentId:
                shiprocketResponse.shipment_id,
            status:
                shiprocketResponse.status
        }
    });

})

const checkServiceability = asyncHandler(async (req, res) => {

    const pincode = req.query.pincode;

    await getShiprocketToken();


    const checkedPinCode = await checkPinCode(pincode);

    if (!checkedPinCode)
        throw new apiError(500, "Error while checking pin code");

    res
        .status(200)
        .json(
            new apiResponse(200, "Pin code checked successfully", checkedPinCode)
        )

})

const getCourierDetails = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    if (!orderId)
        throw new apiError(400, "Order ID is required");

    const order = await Order.findById(orderId)

    if (!order)
        throw new apiError(404, "Order not found");

    if (!order.shiprocket?.orderId)
        throw new apiError(400, "Shiprocket order has not been created");

    // 1. Check courier serviceability
    const serviceability = await checkCourierServiceability({
        orderId: order?.shiprocket?.orderId,
        pickupPostcode: process.env.SHIPROCKET_PICKUP_PINCODE,
        deliveryPostcode: order?.shippingAddress?.pinCode
    })

    if (!serviceability)
        throw new apiError(500, "Error while checking courier serviceability");

    // console.log(serviceability?.data?.available_courier_companies);


    // 2. Get Shiprocket's recommended courier
    // const recommendedCourierId = serviceability?.data?.recommended_courier_company_id;

    // if (!recommendedCourierId)
    //     throw new apiError(400, "No recommended courier available")

    // // 3. Generate AWB
    // const awbResponse = await assignRecommendedCourier({
    //     shipmentId: order?.shiprocket?.shipmentId,
    //     courierId: recommendedCourierId
    // })

    // console.log("awbResponse", awbResponse);


    // if (awbResponse?.awb_assign_status !== 1)
    //     throw new apiError(500, "Error while assigning recommended courier");

    // const awb = awbResponse?.response?.data;

    // order.shiprocket = {
    //     ...order.shiprocket,

    //     awbCode:
    //         awb?.awb_code || null,

    //     courierCompanyId:
    //         awb?.courier_company_id
    //             ? String(awb.courier_company_id)
    //             : null,

    //     courierName:
    //         awb?.courier_name || null,

    //     status: "AWB Generated"
    // };

    // await order.save();

    // const data = {
    //     courierName: awb?.courier_name,
    //     courierCompanyId: awb?.courier_company_id,
    //     awbCode: awb?.awb_code,
    //     shipmentId: order.shiprocket.shipmentId
    // }

    res
        .status(200)
        .json(
            new apiResponse(200, "Courier details fetched successfully", serviceability?.data?.available_courier_companies)
        )
})

const generateAWB = asyncHandler(async (req, res) => {

    const { courierId } = req.body;

    const { orderId } = req.params;

    if (!courierId)
        throw new apiError(400, "Courier ID is required");

    const order = await Order.findById(orderId);

    if (!order)
        throw new apiError(404, "Order not found");

    if (!order.shiprocket?.orderId)
        throw new apiError(400, "Shiprocket order has not been created");

    // Generate AWB
    const awbResponse = await assignCourierAndGenerateAWB({
        shipmentId: order?.shiprocket?.shipmentId,
        courierId
    })

    console.log("awbResponse", awbResponse);


    if (awbResponse?.awb_assign_status !== 1)
        throw new apiError(500, awbResponse?.response?.data?.awb_assign_error || "Error while assigning recommended courier");

    const awb = awbResponse?.response?.data;

    order.shiprocket = {
        ...order.shiprocket,

        awbCode:
            awb?.awb_code || null,

        courierCompanyId:
            awb?.courier_company_id
                ? String(awb.courier_company_id)
                : null,

        courierName:
            awb?.courier_name || null,

        status: "AWB Generated"
    };

    await order.save();

    const data = {
        courierName: awb?.courier_name,
        courierCompanyId: awb?.courier_company_id,
        awbCode: awb?.awb_code,
        shipmentId: order.shiprocket.shipmentId
    }

    res
        .status(200)
        .json(
            new apiResponse(200, "AWB generated successfully", data)
        )
})

const generateShipmentLabelAndInvoice = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order)
        throw new apiError(404, "Order not found.");

    const shipmentId = order?.shiprocket?.shipmentId;

    if (!shipmentId)
        throw new apiError(400, "Shiprocket shipment not found.");

    if (!order?.shiprocket?.awbCode)
        throw new apiError(400, "AWB must be generated before creating label.");

    const result = await generateLabelAndInvoice([Number(shipmentId)]);

    console.log("Shiprocket Label + Invoice Response:", result);

    if (!result || result.error_count > 0 || !result.file_url)
        throw new apiError(400, "Failed to generate label and invoice.");

    order.shiprocket = {
        ...order.shiprocket,
        invoiceAndLabel: result?.file_url
    }

    await order.save();

    res
        .status(200)
        .json(
            new apiResponse(200, "Label and invoice generated successfully.", result)
        )
})

const requestPickup = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order)
        throw new apiError(404, "Order not found");

    const shipmentId = order.shiprocket?.shipmentId;

    if (!shipmentId)
        throw new apiError(400, "Shiprocket shipment not found");

    if (!order?.shiprocket?.awbCode)
        throw new apiError(400, "AWB must be generated before requesting pickup.");

    if (order?.shiprocket?.pickupStatus === "REQUESTED")
        throw new apiError(400, "Pickup has already been requested.");

    order.shiprocket.pickupStatus = "REQUESTED";

    const result = await requestShipmentPickup(shipmentId);

    console.log("Shiprocket Pickup Response:", result);

    if (!result || result?.pickup_status !== 1) {
        order.shiprocket.pickupStatus = "FAILED";
        await order.save();
        throw new apiError(400, "Failed to request pickup.");
    }

    order.shiprocket.pickupStatus = "SCHEDULED";

    if (result?.response?.pickup_scheduled_date && result?.response?.pickup_token_number) {
        order.shiprocket.pickupScheduledDate = result?.response?.pickup_scheduled_date;
        order.shiprocket.pickupTokenNumber = result?.response?.pickup_token_number;
    }

    await order.save();

    res
        .status(200)
        .json(
            new apiResponse(200, "Pickup requested successfully", result)
        )
})

const createManifest = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order)
        throw new apiError(400, "Order not found.");

    if (!order?.shiprocket?.shipmentId)
        throw new apiError(400, "Shiprocket shipment not found.");

    if (!order?.shiprocket?.awbCode)
        throw new apiError(400, "AWB must be generated first.");

    if (order?.shiprocket?.pickupStatus !== "SCHEDULED")
        throw new apiError(400, "Pickup must be scheduled before generating manifest.");

    if (order?.shiprocket?.manifestStatus === "GENERATED")
        return res
            .status(200)
            .json(
                new apiResponse(200, "Manifest already generated", order?.shiprocket?.manifestUrl)
            )

    const result = await generateManifest(order?.shiprocket?.orderId)

    if (!result || !result?.manifest_url) {
        order.shiprocket.manifestStatus = "FAILED";
        await order.save();
        throw new apiError(400, "Failed to generate manifest.");
    }

    order.shiprocket.manifestStatus = "GENERATED";
    order.shiprocket.manifestUrl = result?.manifest_url;

    await order.save();

    res
        .status(200)
        .json(
            new apiResponse(200, "Manifest generated successfully", {})
        )


})

export { createShipmentOrder, checkServiceability, getCourierDetails, generateAWB, generateShipmentLabelAndInvoice, requestPickup, createManifest }