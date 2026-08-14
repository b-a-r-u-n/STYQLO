import apiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getShiprocketToken } from "../utils/shiprocket.js";

const createShipmentOrder = asyncHandler(async (req, res ) => {
    const token = await getShiprocketToken();
    
    console.log(token);

    if(!token)
        throw new apiError(500, "Error while getting Shiprocket token");

    
})

export {createShipmentOrder}