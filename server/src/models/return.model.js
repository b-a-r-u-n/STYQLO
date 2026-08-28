import mongoose from "mongoose";

const returnSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products: {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
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
            },
            returnedQuantity: {
                type: Number,
                default: 0
            }
        },
        reason: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        returnStatus: {
            type: String,
            enum: ["Pending", "Approved", "Rejected", "Received", "Refunded", "Completed"],
            default: "Pending"
        },
        refundStatus: {
            type: String,
            enum: ["NotStarted", "Processing", "Completed", "Failed"],
            default: "NotStarted"
        },
        refundAmount: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
        },
        shippingCharges: {
            type: Number
        },
        requestedAt: {
            type: Date,
            default: Date.now
        },
        approvedAt: {
            type: Date,
            default: null
        },
        rejectedAt: {
            type: Date,
            default: null
        },
        receivedAt: {
            type: Date,
            default: null
        },
        refundedAt: {
            type: Date,
            default: null
        },
        refundPayment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            default: null
        },
        returnId: {
            type: String,
            unique: true,
            required: true
        },
        returnInvoiceNumber: {
            type: String,
            unique: true,
            require: true
        },
        method: {
            type: String,
            enum: ["ORIGINAL_PAYMENT", "UPI", "BANK_ACCOUNT"],
            required: true,
        },

        upiId: {
            type: String,
            trim: true,
        },

        bankDetails: {
            accountHolderName: {
                type: String,
                trim: true,
            },
            accountNumber: {
                type: String,
                trim: true,
            },

            ifscCode: {
                type: String,
                trim: true,
                uppercase: true,
            },
        },
        transactionId: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true
    }
)

export const Return = mongoose.model("Return", returnSchema);