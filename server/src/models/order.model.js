import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true
                },
                size: {
                    type: String,
                    // required: true
                }
            }
        ],
        shippingAddress: {
            fullName: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: Number,
                required: true
            },
            streetAddress: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            pinCode: {
                type: Number,
                required: true
            }
        },
        subTotal: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        },
        shippingCharges: {
            type: Number,
            default: 0
        },
        totalAmount: {
            type: Number,
            required: true 
        },
        orderStatus: {
            type: String,
            enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled", "Rejected"],
            default: "Pending"
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed", "Refunded"],
            default: "Pending"
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        },
        refundPayment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment"
        },
        razorpayOrderId: {
            type: String,
            default: null
        },
        deliveredAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Order", orderSchema);