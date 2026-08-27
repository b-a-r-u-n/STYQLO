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
                },
                returnedQuantity: {
                    type: Number
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
        },
        orderGroupId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "Razorpay"],
            required: true
        },
        orderId: {
            type: String,
            unique: true,
            required: true
        },
        invoiceNumber: {
            type: String,
            unique: true,
            require: true
        },
        shiprocket: {
            orderId: {
                type: String,
                default: null
            },

            shipmentId: {
                type: String,
                default: null
            },

            awbCode: {
                type: String,
                default: null
            },

            courierCompanyId: {
                type: String,
                default: null
            },

            courierName: {
                type: String,
                default: null
            },

            status: {
                type: String,
                default: null
            },

            invoiceUrl: {
                type: String,
                default: null
            },
            labelUrl: {
                type: String,
                default: null
            },
            pickupStatus: {
                type: String,
                enum: [
                    "NOT_REQUESTED",
                    "REQUESTED",
                    "SCHEDULED",
                    "PICKED_UP",
                    "FAILED"
                ],
                default: "NOT_REQUESTED"
            },
            pickupScheduledDate: {
                type: Date,
                default: null
            },
            pickupTokenNumber: {
                type: String,
                default: null
            },
            manifestUrl: {
                type: String,
                default: null
            },
            manifestStatus: {
                type: String,
                enum: [
                    "NOT_GENERATED",
                    "GENERATED",
                    "FAILED"
                ],
                default: "NOT_GENERATED"
            },
            tracking: {
                currentStatus: {
                    type: String,
                    default: null
                },

                currentStatusId: {
                    type: Number,
                    default: null
                },

                shipmentStatus: {
                    type: String,
                    default: null
                },

                shipmentStatusId: {
                    type: Number,
                    default: null
                },

                currentTimestamp: {
                    type: Date,
                    default: null
                },

                etd: {
                    type: Date,
                    default: null
                },

                scans: [
                    {
                        date: {
                            type: Date,
                            default: null
                        },

                        status: {
                            type: String,
                            default: null
                        },

                        activity: {
                            type: String,
                            default: null
                        },

                        location: {
                            type: String,
                            default: null
                        },

                        srStatus: {
                            type: String,
                            default: null
                        },

                        srStatusLabel: {
                            type: String,
                            default: null
                        }
                    }
                ]
            }
        }
    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Order", orderSchema);