import mongoose from "mongoose";
import { Order } from "../models/order.model.js";
import { Return } from "../models/return.model.js";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";
import generateSequenceId from "../utils/generateSequence.js";


// const createOrder = asyncHandler(async (req, res) => {

//     const { products, shippingAddress, subTotal, tax, shippingCharges, totalAmount } = req.body;

//     // console.log(req.body);

//     if (!products || !products.length)
//         throw new apiError(400, "Products are required");

//     if (!shippingAddress)
//         throw new apiError(400, "Shipping address is required");

//     if (!subTotal)
//         throw new apiError(400, "Sub total is required");

//     if (!tax)
//         throw new apiError(400, "Tax is required");

//     if (!shippingCharges && shippingCharges !== 0)
//         throw new apiError(400, "Shipping charges are required");

//     if (!totalAmount)
//         throw new apiError(400, "Total amount is required");

//     const order = await Order.create({
//         user: req.user._id,
//         products,
//         shippingAddress,
//         subTotal,
//         tax,
//         shippingCharges,
//         totalAmount,
//         orderStatus: "Pending",
//         paymentStatus: "Pending"
//     })

//     if (!order)
//         throw new apiError(500, "Order creation failed");

//     const createdOrder = await Order.findById(order._id).select("-user -products -shippingAddress -subTotal -tax -shippingCharges -totalAmount -orderStatus -paymentStatus -createdAt -updatedAt -razorpayOrderId")

//     res
//         .status(200)
//         .json(
//             new apiResponse(200, "Order created successfully", createdOrder)
//         )
// })

const createOrder = asyncHandler(async (req, res) => {

    const {
        products,
        shippingAddress,
        subTotal,
        tax,
        shippingCharges,
        totalAmount,
        paymentMethod
    } = req.body;

    // console.log(paymentMethod); 
    

    if (!products || !products.length)
        throw new apiError(400, "Products are required");

    if (!shippingAddress)
        throw new apiError(400, "Shipping address is required");

    if (subTotal === undefined)
        throw new apiError(400, "Sub total is required");

    if (tax === undefined)
        throw new apiError(400, "Tax is required");

    if (shippingCharges === undefined)
        throw new apiError(400, "Shipping charges are required");

    if (totalAmount === undefined)
        throw new apiError(400, "Total amount is required");

    if (!paymentMethod)
        throw new apiError(400, "Payment method is required");

    const orderId = await generateSequenceId("order", "STYQLO");

    const invoiceNumber = await generateSequenceId("invoice", "INV");

    // Generate one ID for this checkout
    const orderGroupId = new mongoose.Types.ObjectId();

    const createdOrders = [];

    for (const item of products) {

        const itemSubTotal = item.price * item.quantity;

        // Calculate item's percentage of the total subtotal
        const ratio = itemSubTotal / subTotal;

        // Divide tax and shipping proportionally
        const itemTax = tax * ratio;
        const itemShippingCharges = shippingCharges * ratio;

        const itemTotalAmount =
            itemSubTotal +
            Math.round(itemTax) +
            itemShippingCharges;


        const order = await Order.create({

            user: req.user._id,

            products: [
                {
                    product: item.product,
                    quantity: item.quantity,
                    price: item.price,
                    size: item.size
                }
            ],

            shippingAddress,

            subTotal: itemSubTotal,

            tax: Math.round(itemTax),

            shippingCharges: itemShippingCharges,

            totalAmount: itemTotalAmount,

            orderStatus: "Pending",

            paymentStatus: "Pending",

            orderGroupId,

            paymentMethod,
            
            orderId,

            invoiceNumber
        });


        if (!order)
            throw new apiError(500, "Order creation failed");


        createdOrders.push(order);
    }


    const createdOrdersResponse = createdOrders.map(order => ({
        _id: order._id,
        products: order.products,
        subTotal: order.subTotal,
        tax: order.tax,
        shippingCharges: order.shippingCharges,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        orderGroupId: order.orderGroupId,
        paymentMethod: order.paymentMethod,
        orderId: order.orderId
    }));


    res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Orders created successfully",
                createdOrdersResponse
            )
        );
});

const removeOrder = asyncHandler(async (req, res) => {
    const {orderId} = req.params;

    if(!orderId)
        throw new apiError(400, "Order id is required");

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    // console.log(deletedOrder);
    
    if(!deletedOrder)
        throw new apiError(404, "Order not found");

    res
    .status(200)
    .json(
        new apiResponse(200, "Order deleted successfully")
    )

})

const updateOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    if (!orderId)
        throw new apiError(400, "Order id is required");

    // const {orderStatus} = req.body;

    const filter = {}

    if (req.query?.orderStatus)
        filter.orderStatus = req.query?.orderStatus;

    // exit();


    const order = await Order.findByIdAndUpdate(
        orderId,
        {
            $set: filter
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!order)
        throw new apiError(400, "Error while updating order");

    res
        .status(200)
        .json(
            new apiResponse(200, "Order Updated", order)
        )
})

const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    let orders = await Order.find({
        user: userId
    })
        .sort({ createdAt: -1 })
        .select("-payment -razorpayOrderId -createdAt")
        .populate("products.product")

    if (!orders)
        throw new apiError(404, "No orders found for this user");


    res
        .status(200)
        .json(
            new apiResponse(200, "User orders fetched successfully", orders)
        )
})

const getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    if (!orderId)
        throw new apiError(400, "Order id not found");

    const order = await Order.findById(orderId)
        .select("-razorpayOrderId")
        .populate("products.product")
        .populate({
            path: "payment",
            select: "-amount -createdAt -currency -gatewayResponse -order -refundAmount -refundId -status -updatedAt -user -_id "
        })
        .populate({
            path: "user",
            select: "-fullName -password -phoneNumber -address -isAdmin -refreshToken -_id -createdAt -updatedAt"
        })
        .lean()

    if (!order)
        throw new apiError(404, "Order not found");

    const returns = await Return.find({
        order: order._id
    })
        .sort({createdAt: -1})
        .populate({
            path: "products.product",
            select: "name images"
        })
        .lean();

        order.returns = returns;       

    res
        .status(200)
        .json(
            new apiResponse(200, "Order fetched successfully", order)
        )
})

const getAllOrders = asyncHandler(async (req, res) => {

    const user = req.user;

    const userData = await User.findById(user._id);

    // console.log(userData);


    if (!userData.isAdmin)
        throw new apiError(403, "You are not authorized to access this resource");

    const filter = {};
    

    if (req.query?.orderStatus)
        filter.orderStatus = req.query?.orderStatus;
    if (req.query?.orderId)
        filter._id = req.query?.orderId;
    if (req.query?._id)
        filter._id = req.query?._id;
    if (req.query?.orderIdd)
        filter.orderId = req.query?.orderIdd;

    const orders = await Order.find(filter)
        .sort({ updatedAt: -1 })
        .select("-razorpayOrderId")
        .populate("products.product")
        .populate({
            path: "user",
            select: "-fullName -password -phoneNumber -address -isAdmin -refreshToken -_id -createdAt -updatedAt"
        })
        .populate({
            path: "payment",
            select: "-amount -createdAt -currency -gatewayResponse -order -razorpayOrderId -razorpayPaymentId -refundAmount -refundId -status -updatedAt -user -_id "
        })

    if (!orders)
        throw new apiError(404, "No orders found");

    res
        .status(200)
        .json(
            new apiResponse(200, "Orders fetched successfully", orders)
        )
})

export { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrder, removeOrder }