import { Order } from "../models/order.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { razorpayOrder, verifyRazorpayPaymentSignature } from "../utils/razorpay.js";


const createRazorpayOrder = asyncHandler(async (req, res) => {
    const {orderId} = req.body;
    if(!orderId)
        throw new apiError(400, "Order id is required.");

    const order = await Order.findById(orderId);

    if(!order)
        throw new apiError(404, "Order not found");

    const createdRazorpayOrder = await razorpayOrder(order.totalAmount, "INR", order._id)

    if(!createRazorpayOrder)
        throw new apiError(500, "Razorpay order creation failed");

    order.razorpayOrderId = createRazorpayOrder.id;
    await order.save();

    res
    .status(200)
    .json(
        new apiResponse(200, "Razorpay order created successfully", createdRazorpayOrder)
    )
})

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;

    const verify = await verifyRazorpayPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)
    

    if(!verify)
        throw new apiError(400, "Razorpay payment verification failed");

    res
    .status(200)
    .json(
        new apiResponse(200, "Razorpay payment verified successfully", {})
    )

})

const handleRazorpayWebhook = asyncHandler(async (req, res) => {})

export {createRazorpayOrder, verifyRazorpayPayment, handleRazorpayWebhook}