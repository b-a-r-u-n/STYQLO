import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { Webhook } from "../models/webhook.model.js";
import { Payment } from "../models/payment.model.js";
import { Checkout } from "../models/checkout.model.js"
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { razorpayOrder, verifyRazorpayPaymentSignature, verifyRazorpayWebhookSignature } from "../utils/razorpay.js";
import generateSequenceId from "../utils/generateSequence.js";


// const createRazorpayOrder = asyncHandler(async (req, res) => {
//     const { orderId } = req.body;
//     if (!orderId)
//         throw new apiError(400, "Order id is required.");

//     const order = await Order.findById(orderId);

//     if (!order)
//         throw new apiError(404, "Order not found");

//     const createdRazorpayOrder = await razorpayOrder(order.totalAmount, "INR", order._id);

//     if (!createRazorpayOrder)
//         throw new apiError(500, "Razorpay order creation failed");


//     order.razorpayOrderId = createdRazorpayOrder.id;
//     await order.save();

//     res
//         .status(200)
//         .json(
//             new apiResponse(200, "Razorpay order created successfully", createdRazorpayOrder)
//         )
// })

// const verifyRazorpayPayment = asyncHandler(async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const verify = await verifyRazorpayPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)

//     if (!verify)
//         throw new apiError(400, "Razorpay payment verification failed");

//     res
//         .status(200)
//         .json(
//             new apiResponse(200, "Razorpay payment verified successfully", {})
//         )

// })

// const handleRazorpayWebhook = asyncHandler(async (req, res) => {
//     // console.log("req.body", req.body);
//     // console.log("req.header", req.header);
//     // console.log("reg.body.string", req.body.toString());  

//     const verify = await verifyRazorpayWebhookSignature(req.body, req.headers);

//     // console.log("verify", verify);

//     if (!verify)
//         throw new apiError(400, "Invalid webhook signature");

//     const event = JSON.parse(req.body.toString());
//     const paymentEntity = event?.payload?.payment?.entity;
//     const refundEntity = event?.payload?.refund?.entity;

//     // console.log("event", event);
//     // console.dir(event, { depth: null });
//     // console.log("event.payload", paymentEntity);
//     // console.log("refundEntity", refundEntity);

//     const session = await mongoose.startSession();

//     let payment;
//     let existingPayment;


//     try {

//         session.startTransaction();

//         const alreadyProcessed = await Webhook.findOne(
//             {
//                 eventId: paymentEntity.id
//             },
//             null,
//             {
//                 session
//             }
//         )

//         if (alreadyProcessed) {
//             await session.abortTransaction();

//             return res
//                 .status(200)
//                 .json(
//                     new apiResponse(200, "Webhook already processed")
//                 )
//         }

//         let order = await Order.findOne(
//             {
//                 razorpayOrderId: paymentEntity.order_id
//             },
//             null,
//             {
//                 session
//             }
//         )

//         if (!order)
//             throw new apiError(404, "Order not found");

//         switch (event.event) {
//             case "payment.captured":

//                 existingPayment = await Payment.findOne(
//                     {
//                         razorpayPaymentId: paymentEntity.id
//                     },
//                     null,
//                     {
//                         session
//                     }
//                 )

//                 if (existingPayment) {
//                     await session.abortTransaction();

//                     return res
//                         .status(200)
//                         .json(
//                             new apiResponse(
//                                 200,
//                                 "Payment already processed",
//                                 existingPayment
//                             )
//                         );
//                 }

//                 payment = new Payment({
//                     user: order.user,
//                     order: order._id,
//                     razorpayOrderId: paymentEntity.order_id,
//                     razorpayPaymentId: paymentEntity.id,
//                     amount: paymentEntity.amount / 100,
//                     currency: paymentEntity.currency,
//                     paymentMethod: paymentEntity.method,
//                     status: "Captured",
//                     gatewayResponse: {
//                         payment: paymentEntity,
//                         refund: null
//                     }
//                 })

//                 await payment.save({ session });


//                 // order.orderStatus = "Confirmed";
//                 order.paymentStatus = "Paid";
//                 order.payment = payment._id;

//                 await order.save({ session });

//                 break;

//             case "payment.failed":

//                 existingPayment = await Payment.findOne(
//                     {
//                         razorpayPaymentId: paymentEntity.id
//                     },
//                     null,
//                     {
//                         session
//                     }
//                 )

//                 if (existingPayment) {
//                     await session.abortTransaction();

//                     return res
//                         .status(200)
//                         .json(
//                             new apiResponse(
//                                 200,
//                                 "Payment already processed",
//                                 existingPayment
//                             )
//                         );
//                 }

//                 payment = new Payment({
//                     user: order.user,
//                     order: order._id,
//                     razorpayOrderId: paymentEntity.order_id,
//                     razorpayPaymentId: paymentEntity.id,
//                     amount: paymentEntity.amount / 100,
//                     currency: paymentEntity.currency,
//                     paymentMethod: paymentEntity.method,
//                     status: "Failed",
//                     gatewayResponse: {
//                         payment: paymentEntity,
//                         refund: null
//                     }
//                 })

//                 await payment.save({ session });

//                 order.paymentStatus = "Failed";
//                 order.payment = payment._id;

//                 await order.save({ session });

//                 break;

//             case "refund.processed":
//                 payment = await Payment.findOneAndUpdate(
//                     {
//                         razorpayPaymentId: paymentEntity.id,
//                     },
//                     {
//                         $set: {
//                             status: "Refunded",
//                             refundId: refundEntity.id,
//                             refundAmount: refundEntity.amount / 100,
//                             "gatewayResponse.refund": refundEntity
//                         }
//                     },
//                     {
//                         new: true,
//                         session
//                     }
//                 )

//                 if (!payment)
//                     throw new apiError(404, "Payment not found.");

//                 order.orderStatus = "Cancelled";
//                 order.paymentStatus = "Refunded";
//                 order.refundPayment = payment._id;

//                 await order.save({ session });

//                 break;

//             default:
//                 await session.commitTransaction();
//                 return res.status(200).send("Ignored");

//         }        

//         const webhook = new Webhook({
//             eventId: paymentEntity.id,
//             eventType: event.event
//         })
//         await webhook.save({ session })

//         console.log(`Webhook processed successfully for event: ${event.event}, paymentId: ${paymentEntity.id}`);
//         await session.commitTransaction();


//     } catch (err) {
//         await session.abortTransaction();

//         if (err.code === 11000) {
//             return res.status(200).json(
//                 new apiResponse(200, "Webhook already processed")
//             );
//         }

//         throw err;
//     } finally {
//         session.endSession();
//     }

//     res
//         .status(200)
//         .json(
//             new apiResponse(200, "payment received.")
//         )
// })

const createOrders = async (checkout, payment, paymentEntity, session) => {
    const orderGroupId = new mongoose.Types.ObjectId();

    const orderId = await generateSequenceId("order", "STYQLO");

    const invoiceNumber = await generateSequenceId("invoice", "INV");

    const createdOrders = [];

    for (const item of checkout.products) {

        const itemSubTotal =
            item.price * item.quantity;

        const ratio =
            itemSubTotal / checkout.subTotal;

        const itemTax =
            checkout.tax * ratio;

        const itemShipping =
            checkout.shippingCharges * ratio;

        const itemTotal =
            itemSubTotal +
            Math.round(itemTax) +
            itemShipping;


        const order = await Order.create(
            [
                {
                    user: checkout.user,

                    products: [
                        {
                            product: item.product,
                            quantity: item.quantity,
                            price: item.price,
                            size: item.size
                        }
                    ],

                    shippingAddress: checkout.shippingAddress,

                    subTotal: itemSubTotal,

                    tax: Math.round(itemTax),

                    shippingCharges: itemShipping,

                    totalAmount: itemTotal,

                    orderStatus: "Pending",

                    paymentStatus: "Paid",

                    payment: payment._id,

                    razorpayOrderId:
                        paymentEntity.order_id,

                    orderGroupId,

                    paymentMethod: "Razorpay",
                    
                    orderId,
                    invoiceNumber
                }
            ],
            {
                session
            }
        );

        createdOrders.push(order[0]);
    }
}

const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { checkoutId } = req.body;

    if (!checkoutId)
        throw new apiError(400, "Checkout id is required.");

    const checkout = await Checkout.findOne({
        _id: checkoutId,
        user: req.user._id
    });

    if (!checkout)
        throw new apiError(404, "Order not found");

    const createdRazorpayOrder = await razorpayOrder(checkout.totalAmount, "INR", checkout._id);

    if (!createdRazorpayOrder)
        throw new apiError(500, "Razorpay order creation failed");

    checkout.razorpayOrderId = createdRazorpayOrder.id;
    await checkout.save();

    res
        .status(200)
        .json(
            new apiResponse(200, "Razorpay order created successfully", createdRazorpayOrder)
        )

})

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const verify = await verifyRazorpayPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!verify)
        throw new apiError(400, "Razorpay payment verification failed");

    res
        .status(200)
        .json(
            new apiResponse(200, "Razorpay payment verified successfully", {})
        )

})

const handleRazorpayWebhook = asyncHandler(async (req, res) => {
    // console.log("req.body", req.body);
    // console.log("req.header", req.header);
    // console.log("reg.body.string", req.body.toString());  

    const verify = await verifyRazorpayWebhookSignature(req.body, req.headers);

    // console.log("verify", verify);

    if (!verify)
        throw new apiError(400, "Invalid webhook signature");

    const event = JSON.parse(req.body.toString());
    const paymentEntity = event?.payload?.payment?.entity;
    const refundEntity = event?.payload?.refund?.entity;

    // console.log("event", event);
    // console.dir(event, { depth: null });
    // console.log("event.payload", paymentEntity);
    // console.log("refundEntity", refundEntity);

    const session = await mongoose.startSession();

    let payment;
    let existingPayment;


    try {

        session.startTransaction();

        const alreadyProcessed = await Webhook.findOne(
            {
                eventId: paymentEntity.id
            },
            null,
            {
                session
            }
        )

        if (alreadyProcessed) {
            await session.abortTransaction();

            return res
                .status(200)
                .json(
                    new apiResponse(200, "Webhook already processed")
                )
        }

        let checkout = await Checkout.findOne(
            {
                razorpayOrderId: paymentEntity.order_id
            },
            null,
            {
                session
            }
        )

        if (!checkout)
            throw new apiError(404, "Checkout not found");

        switch (event.event) {
            case "payment.captured":

                existingPayment = await Payment.findOne(
                    {
                        razorpayPaymentId: paymentEntity.id
                    },
                    null,
                    {
                        session
                    }
                )

                if (existingPayment) {
                    await session.abortTransaction();

                    return res
                        .status(200)
                        .json(
                            new apiResponse(
                                200,
                                "Payment already processed",
                                existingPayment
                            )
                        );
                }

                payment = new Payment({
                    user: checkout.user,
                    checkout: checkout._id,
                    razorpayOrderId: paymentEntity.order_id,
                    razorpayPaymentId: paymentEntity.id,
                    amount: paymentEntity.amount / 100,
                    currency: paymentEntity.currency,
                    paymentMethod: paymentEntity.method,
                    status: "Captured",
                    gatewayResponse: {
                        payment: paymentEntity,
                        refund: null
                    }
                })

                await payment.save({ session });

                await createOrders(checkout, payment, paymentEntity, session);

                //Checkout
                checkout.status = "Paid";

                await checkout.save({ session });

                break;

            case "payment.failed":

                existingPayment = await Payment.findOne(
                    {
                        razorpayPaymentId: paymentEntity.id
                    },
                    null,
                    {
                        session
                    }
                )

                if (existingPayment) {
                    await session.abortTransaction();

                    return res
                        .status(200)
                        .json(
                            new apiResponse(
                                200,
                                "Payment already processed",
                                existingPayment
                            )
                        );
                }

                payment = new Payment({
                    user: checkout.user,
                    order: checkout._id,
                    razorpayOrderId: paymentEntity.order_id,
                    razorpayPaymentId: paymentEntity.id,
                    amount: paymentEntity.amount / 100,
                    currency: paymentEntity.currency,
                    paymentMethod: paymentEntity.method,
                    status: "Failed",
                    gatewayResponse: {
                        payment: paymentEntity,
                        refund: null
                    }
                })

                await payment.save({ session });

                checkout.status = "Failed";

                await checkout.save({ session });

                break;

            case "refund.processed":
                console.log("paymentEntity_id", paymentEntity_id);
                console.log("event", event);
                
                
                payment = await Payment.findOneAndUpdate(
                    {
                        razorpayPaymentId: paymentEntity_id,
                    },
                    {
                        $set: {
                            status: "Refunded",
                            refundId: refundEntity.id,
                            refundAmount: refundEntity.amount / 100,
                            "gatewayResponse.refund": refundEntity
                        }
                    },
                    {
                        new: true,
                        session
                    }
                )

                if (!payment)
                    throw new apiError(404, "Payment not found.");

                // checkout.status = "Cancelled";
                // order.paymentStatus = "Refunded";
                // // order.refundPayment = payment._id;

                // await order.save({ session });

                break;

            default:
                await session.commitTransaction();
                return res.status(200).send("Ignored");

        }

        const webhook = new Webhook({
            eventId: paymentEntity.id,
            eventType: event.event
        })
        await webhook.save({ session })

        console.log(`Webhook processed successfully for event: ${event.event}, paymentId: ${paymentEntity.id}`);
        await session.commitTransaction();


    } catch (err) {
        await session.abortTransaction();

        if (err.code === 11000) {
            return res.status(200).json(
                new apiResponse(200, "Webhook already processed")
            );
        }

        throw err;
    } finally {
        session.endSession();
    }

    res
        .status(200)
        .json(
            new apiResponse(200, "payment received.")
        )
})

export { createRazorpayOrder, verifyRazorpayPayment, handleRazorpayWebhook }