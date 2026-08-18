import { Order } from "../models/order.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { checkPinCode, createShiprocketOrder, getShiprocketToken } from "../utils/shiprocket.js";

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

    if(!shiprocketResponse)
        throw new apiError(500, "Error while creating Shiprocket shipment");

    console.log(shiprocketResponse);
    
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

export { createShipmentOrder, checkServiceability }