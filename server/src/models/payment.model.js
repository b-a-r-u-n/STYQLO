import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        checkout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Checkout",
            required: true
        },
        razorpayPaymentId: {
            type: String,
            default: null
        },
        razorpayOrderId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR"
        },
        paymentMethod: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: ["Pending", "Captured", "Failed", "Refunded"],
            default: "Pending"
        },
        refundId: {
            type: String,
            default: null
        },
        refundAmount: {
            type: Number,
            default: 0
        },
        gatewayResponse: {
            type: Object,
            default: {}
        }
    },
    {
        timestamps: true
    }
)

export const Payment = mongoose.model("Payment", paymentSchema);