import crypto from "crypto";
import Razorpay from "razorpay";
import apiError from "./apiError.js";

const createRazorpayOrder = async (totalAmount, currency, orderId) => {
    try {
        let instance = new Razorpay(
            {
                key_id: process.env.RAZORPAY_API_KEY,
                key_secret: process.env.RAZORPAY_SECRET
            }
        )

        const razorpayOrder = instance.orders.create({
            amount: totalAmount * 100,
            currency: currency,
            receipt: orderId,
        })

        if(!razorpayOrder)
            throw new apiError(500, "Razorpay order creation failed");

        return razorpayOrder;
    } catch (error) {
        throw new apiError(500, "Error creating Razorpay order");
    }
}

const verifyRazorpayPaymentSignature = async ({razorpayOrderId, razorpayPaymentId, razorpaySignature}) => {
    try {
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(razorpayOrderId + "|" + razorpayPaymentId)
            .digest("hex")

        if (!generated_signature)
            throw new apiError(500, "Failed to generate signature for verification");

        return generated_signature === razorpaySignature;
    } catch (error) {
        throw new apiError(500, "Error verifying Razorpay payment signature");
    }
}

const verifyRazorpayWebhookSignature = async (body, headers) => {
    try {
        const receivedSignature = headers["x-razorpay-signature"];

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

    if(!generatedSignature)
        throw new apiError(500, "Failed to generate signature for webhook verification");

    return receivedSignature === generatedSignature;
    } catch (error) {
        throw new apiError(500, "Error verifying Razorpay webhook signature");
    }
}

export {createRazorpayOrder, verifyRazorpayPaymentSignature, verifyRazorpayWebhookSignature}