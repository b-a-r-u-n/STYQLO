import { Return } from "../models/return.model.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const createReturn = asyncHandler(async (req, res) => {
    const {orderId, products, reason, description, refundAmount} = req.body;

    if(!orderId)
        throw new apiError(400, "Order id is required");

    if(!products || !products.length)
        throw new apiError(400, "Products are required");

    if(!reason)
        throw new apiError(400, "Reason is required");

    if(!refundAmount)
        throw new apiError(400, "Refund amount is required");

    const user = req.user;

    const productReturn = await Return.create({
        order: orderId,
        user,
        products,
        reason,
        description,
        returnStatus: "Pending",
        refundStatus: "NotStarted",
        refundAmount,
        requestedAt: Date.now 
    })

    if(!productReturn)
        throw new apiError(500, "Return request creation failed");

    res
    .status(200)
    .json(
        new apiResponse(200, "Return request created successfully", productReturn)
    )

})



export {createReturn}