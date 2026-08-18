import { Order } from "../models/order.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { assignRecommendedCourier, checkCourierServiceability, checkPinCode, createShiprocketOrder, getShiprocketToken } from "../utils/shiprocket.js";

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

    // console.log(shiprocketResponse);

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

const assignBestCourierAndGenerateAWB = asyncHandler(async (req, res) => {
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

    // 2. Get Shiprocket's recommended courier
    const recommendedCourierId = serviceability?.data?.recommended_courier_company_id;

    if (!recommendedCourierId)
        throw new apiError(400, "No recommended courier available")

    // 3. Generate AWB
    const awbResponse = await assignRecommendedCourier({
        shipmentId: order?.shiprocket?.shipmentId,
        courierId: recommendedCourierId
    })

    if (awbResponse?.awb_assign_status !== 1)
        throw new apiError(500, "Error while assigning recommended courier");

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
            new apiResponse(200, "Best courier assigned and AWB generated", data)
        )
})

export { createShipmentOrder, checkServiceability, assignBestCourierAndGenerateAWB }