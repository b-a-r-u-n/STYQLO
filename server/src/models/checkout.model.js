import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                size: {
                    type: String
                },
                price: {
                    type: Number,
                    required: true
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
        totalAmount: {
            type: Number,
            required: true
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
        razorpayOrderId: {
            type: String,
            default: null
        },
        status: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Failed",
                "Expired"
            ],
            default: "Pending"
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "razorpay"],
            required: true
        }
    },
    {timestamps: true}
)

export const Checkout = mongoose.model("Checkout", checkOutSchema)