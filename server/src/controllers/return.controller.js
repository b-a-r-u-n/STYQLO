import mongoose from "mongoose";
import { Return } from "../models/return.model.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import generateSequenceId from "../utils/generateSequence.js";


// const createReturn = asyncHandler(async (req, res) => {
//     const { returnData } = req.body;

//     if (!returnData?.orderId)
//         throw new apiError(400, "Order id is required");

//     if (!returnData?.products || !returnData?.products.length)
//         throw new apiError(400, "Products are required");

//     if (!returnData?.reason)
//         throw new apiError(400, "Reason is required");

//     if (!returnData?.refundAmount)
//         throw new apiError(400, "Refund amount is required");

//     const user = req.user;

//     const productReturn = await Return.create({
//         order: returnData?.orderId,
//         user,
//         products: returnData?.products,
//         reason: returnData?.reason,
//         description: returnData?.description,
//         returnStatus: "Pending",
//         refundStatus: "NotStarted",
//         refundAmount: returnData?.refundAmount,
//         requestedAt: Date.now()
//     })

//     if (!productReturn)
//         throw new apiError(500, "Return request creation failed");

//     res
//         .status(200)
//         .json(
//             new apiResponse(200, "Return request created successfully", productReturn)
//         )


// })

// const createReturn = asyncHandler(async (req, res) => {
//     // console.log(req.body);
//     // console.log(req.body.products[0]);

//     const { orderId, products, reason, description, selectedQuantity, refundAmount } = req.body;

//     if (!orderId)
//         throw new apiError(400, "Order id is required");

//     if (!products || !products.length)
//         throw new apiError(400, "Products are required");

//     if (!reason)
//         throw new apiError(400, "Reason is required");

//     if (!selectedQuantity)
//         throw new apiError(400, "Selected quantity is required");

//     if(!refundAmount)
//         throw new apiError(400, "Refund amount is required");

//     const order = await Order.findById(orderId);

//     if (!order)
//         throw new apiError(404, "Order not found");

//     if (products[0]?.returnedQuantity == null)
//         products[0].returnedQuantity = 0;

//     const newReturnedQuantity = products[0].returnedQuantity + selectedQuantity;

//     if (newReturnedQuantity > products[0].quantity)
//         throw new apiError(400, "Returned quantity cannot be greater than ordered quantity");

//     products[0].returnedQuantity = newReturnedQuantity;

//     console.log("newReturnedQuantity", newReturnedQuantity);
//     console.log("products[0].quantity", products[0].quantity);
//     console.log("products[0].returnedQuantity", products[0].returnedQuantity);



//     // exit();

//     const returnData = await Return.create({
//         order: orderId,
//         user: req?.user?._id,
//         products: {
//             product: req.body.products[0].product._id,
//             quantity: selectedQuantity,
//             price: req.body.products[0].price,
//             size: req.body.products[0].size,
//             returnedQuantity: newReturnedQuantity
//         },
//         reason,
//         description,
//         returnStatus: "Pending",
//         refundStatus: "NotStarted",
//         refundAmount
//     })

//     if(!returnData)
//         throw new apiError(500, "Return request creation failed");

//     res
//         .status(200)
//         .json(
//             new apiResponse(200, "Return request created successfully", returnData)
//         )

// })

const createReturn = asyncHandler(async (req, res) => {

    const { orderId, products, reason, description, selectedQuantity, refundAmount, tax, shippingCharges, refundMethod, upiId, bankDetails } = req.body;   

    // console.log(req.body);

    if (!orderId)
        throw new apiError(400, "Order id is required");

    if (!products || !products.length)
        throw new apiError(400, "Products are required");

    if (!reason)
        throw new apiError(400, "Reason is required");

    if (!selectedQuantity || selectedQuantity <= 0)
        throw new apiError(400, "Selected quantity is required");

    if (refundAmount == null || refundAmount <= 0)
        throw new apiError(400, "Refund amount is required");

    if (tax == null || tax < 0)
        throw new apiError(400, "Tax is required");

    if (shippingCharges == null || shippingCharges < 0)
        throw new apiError(400, "Shipping charges is required");


    const order = await Order.findById(orderId);

    if (!order)
        throw new apiError(404, "Order not found");

    if (order.paymentMethod === "COD") {
        if (!refundMethod) {
            throw new apiError( 400, "Refund method is required for COD orders");
        }

        if (!["UPI", "BANK_ACCOUNT"].includes(refundMethod)) {
            throw new apiError( 400, "Invalid refund method" );
        }

        // UPI
        if (refundMethod === "UPI") {
            if (!upiId?.trim()) {
                throw new apiError( 400, "UPI ID is required" );
            }
        }

        // BANK
        if (refundMethod === "BANK_ACCOUNT") {
            if ( !bankDetails?.accountHolderName?.trim() || !bankDetails?.accountNumber?.trim() || !bankDetails?.ifscCode?.trim()) {
                throw new apiError(400, "Complete bank details are required");
            }
        }
    }


    // Find product in the order
    const orderProduct = order.products.find(
        item =>
            String(item.product) ===
            String(products[0].product._id)
    );

    if (!orderProduct)
        throw new apiError(404, "Product not found in order");


    // If returnedQuantity doesn't exist, create it
    if (orderProduct.returnedQuantity == null) {
        orderProduct.returnedQuantity = 0;
    }


    // Calculate new returned quantity
    const newReturnedQuantity = orderProduct.returnedQuantity + selectedQuantity;


    // Check quantity
    if (newReturnedQuantity > orderProduct.quantity) {
        throw new apiError( 400, "Please select a valid quantity");
    }


    // Update returned quantity in order
    orderProduct.returnedQuantity = newReturnedQuantity;

    await order.save();

    const returnId = await generateSequenceId("return", "STYQLO-RETURN-");
    const returnInvoiceNumber = await generateSequenceId("return-invoice", "RETURN-INV-");

    // Create return
    const returnData = await Return.create({
        order: orderId,
        user: req.user._id,
        products: {
            product: orderProduct.product,
            quantity: selectedQuantity,
            price: orderProduct.price,
            size: orderProduct.size,
            returnedQuantity: newReturnedQuantity,
        },
        reason,
        description,
        returnStatus: "Pending",
        refundStatus: "NotStarted",
        refundAmount,
        tax,
        shippingCharges,
        returnId,
        returnInvoiceNumber,
        method: order.paymentMethod === "COD" ? refundMethod : "ORIGINAL_PAYMENT",
        upiId,
        bankDetails: {
            accountHolderName: bankDetails?.accountHolderName,
            accountNumber: bankDetails?.accountNumber,
            ifscCode: bankDetails?.ifscCode.toUpperCase()
        }
    });


    if (!returnData)
        throw new apiError(
            500,
            "Return request creation failed"
        );


    res
        .status(200)
        .json(
            new apiResponse(
                200,
                "Return request created successfully",
                returnData
            )
        );
});

const getAllReturns = asyncHandler(async (req, res) => {

    const user = req.user;

    const userData = await User.findById(user._id);

    // console.log(userData);


    if (!userData.isAdmin)
        throw new apiError(403, "You are not authorized to access this resource");

    // console.log("req.query", req.query);
    const filter = {};

    if (req.query?.returnStatus)
        filter.returnStatus = req.query?.returnStatus;
    if (req.query?._id)
        filter._id = req.query?._id;



    const returnData = await Return.find(filter)
        .sort({ updatedAt: -1 })
        .populate("user")
        .populate("products.product")
        .populate("order")

    // console.log("returnData", returnData);


    if (!returnData)
        throw new apiError(404, "No return data found");

    res
        .status(200)
        .json(
            new apiResponse(200, "Return data fetched successfully", returnData)
        )
})

const getReturnById = asyncHandler(async (req, res) => {
    const { returnId } = req.params;

    if (!returnId)
        throw new apiError(400, "Return id not found");

    const returnData = await Return.findById(returnId)
        .populate("user")
        .populate("products.product")
        .populate("order")

    if (!returnData)
        throw new apiError(404, "Return not found");

    res
        .status(200)
        .json(
            new apiResponse(200, "Return fetched successfully", returnData)
        )
})

const updateReturn = asyncHandler(async (req, res) => {
    const { returnId } = req.params;

    if (!returnId)
        throw new apiError(400, "Return id is required");
    // console.log(returnId);


    const filter = {};
    console.log("req.query", req.query);

    if (req?.query?.returnStatus)
        filter.returnStatus = req?.query?.returnStatus;
    if (req?.query?.approvedAt){
        // console.log("Hello");
        filter.approvedAt = new Date();
    }

    const returnData = await Return.findByIdAndUpdate(
        returnId,
        {
            $set: filter
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!returnData)
        throw new apiError(400, "Error while updating return");

    if (returnData.returnStatus === "Approved") {
        returnData.approvedAt = new Date();
        await returnData.save()
    }

    if (returnData.returnStatus === "Rejected") {
        returnData.rejectedAt = new Date();
        await returnData.save()
    }

    res
        .status(200)
        .json(
            new apiResponse(200, "Return Updated", returnData)
        )
})



export { createReturn, getAllReturns, updateReturn, getReturnById }