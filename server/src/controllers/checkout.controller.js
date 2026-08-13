import { Checkout } from "../models/checkout.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createCheckout = asyncHandler(async (req, res) => {
    const { products, shippingAddress, subTotal, tax, shippingCharges, totalAmount } = req.body;

    if (!products || !products.length)
        throw new apiError(400, "Products are required");

    if (!shippingAddress)
        throw new apiError(400, "Shipping address is required");

    if (!subTotal)
        throw new apiError(400, "Sub total is required");

    if (!tax)
        throw new apiError(400, "Tax is required");

    if (!shippingCharges && shippingCharges !== 0)
        throw new apiError(400, "Shipping charges are required");

    if (!totalAmount)
        throw new apiError(400, "Total amount is required");

    const checkout = await Checkout.create({
        user: req.user._id,
        products,
        shippingAddress,
        subTotal,
        tax,
        shippingCharges,
        totalAmount,
        status: "Pending"
    })

    if (!checkout)
        throw new apiError(500, "Checkout creation failed");

    const createdCheckout = await Checkout.findById(checkout._id).select("-user -products -shippingAddress -subTotal -tax -shippingCharges -totalAmount -status -createdAt -updatedAt -razorpayOrderId")

    res
        .status(200)
        .json(
            new apiResponse(200, "Order created successfully", createdCheckout)
        )
})

const removeCheckout = asyncHandler(async (req, res) => {
    const { checkoutId } = req.params;

    if (!checkoutId)
        throw new apiError(400, "Checkout id is require");

    const deletedCheckout = await Checkout.findByIdAndDelete(checkoutId);

    if (!deletedCheckout)
        throw new apiError(404, "Checkout not found");

    res
        .status(200)
        .json(
            new apiResponse(200, "Checkout deleted successfully")
        )
})

export { createCheckout, removeCheckout }