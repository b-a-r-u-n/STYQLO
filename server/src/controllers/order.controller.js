import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js"
import asyncHandler from "../utils/asyncHandler.js";


const createOrder = asyncHandler(async (req, res) => {

    const { products, shippingAddress, subTotal, tax, shippingCharges, totalAmount } = req.body;

    // console.log(req.body);

    const order = await Order.create({
        user: req.user._id,
        products,
        shippingAddress,
        subTotal,
        tax,
        shippingCharges,
        totalAmount,
        orderStatus: "Pending",
        paymentStatus: "Pending"
    })

    if (!order)
        throw new apiError(500, "Order creation failed");

    const createdOrder = await Order.findById(order._id).select("-user -products -shippingAddress -subTotal -tax -shippingCharges -totalAmount -orderStatus -paymentStatus -createdAt -updatedAt -razorpayOrderId")

    res
        .status(200)
        .json(
            new apiResponse(200, "Order created successfully", createdOrder)
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
        .select("-payment -razorpayOrderId")
        .populate("products.product")
        .populate({
            path: "payment",
            select: "-amount -createdAt -currency -gatewayResponse -order -refundAmount -refundId -status -updatedAt -user -_id "
        })
        .populate({
            path: "user",
            select: "-fullName -password -phoneNumber -address -isAdmin -refreshToken -_id -createdAt -updatedAt"
        })

    if (!order)
        throw new apiError(404, "Order not found");

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

export { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrder }