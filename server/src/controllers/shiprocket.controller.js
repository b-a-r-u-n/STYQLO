import { Order } from "../models/order.model.js";
import { Return } from "../models/return.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { assignCourierAndGenerateAWB, checkCourierServiceability, checkPinCode, createShiprocketOrder, createShiprocketReturnOrder, generateInvoice, generateLabel, generateManifest, generateReturnAWB, getShiprocketToken, requestShipmentPickup } from "../utils/shiprocket.js";

const parseShiprocketDate = (value) => {

    if (!value) {
        return null;
    }

    const match = value.match(
        /^(\d{2}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2})$/
    );

    if (!match) {
        return null;
    }

    const [
        ,
        day,
        month,
        year,
        hour,
        minute,
        second
    ] = match;

    return new Date(
        `${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`
    );
};

const parseScanDate = (value) => {

    if (!value) {
        return null;
    }

    const [date, time] = value.split(" ");

    if (!date || !time) {
        return null;
    }

    return new Date(
        `${date}T${time}+05:30`
    );
};

const createShipmentOrder = asyncHandler(async (req, res) => {
    console.log("createShipmentOrder called");
    const { orderId } = req.params;

    await getShiprocketToken();

    const order = await Order.findById(orderId)
        .populate("products.product")
        .populate("user")

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    if (order.paymentStatus !== "Paid" && order.paymentMethod === "Razorpay") {
        return res.status(400).json({
            success: false,
            message: "Order payment is not completed"
        });
    }

    if (order.shiprocket?.shipmentId) {
        return res.status(400).json({
            success: false,
            message: "Shipment already created"
        });
    }

    const shiprocketResponse = await createShiprocketOrder(order);

    // console.log("shiprocketResponse", shiprocketResponse);


    if (!shiprocketResponse)
        throw new apiError(500, "Error while creating Shiprocket shipment");

    // console.log("shiprocketResponse", shiprocketResponse);

    order.shiprocket = {
        orderId: String(shiprocketResponse.order_id),
        shipmentId: String(shiprocketResponse.shipment_id),
        status: shiprocketResponse.status
    }

    await order.save();

    res.status(200).json({
        success: true,
        message: "Shiprocket shipment created successfully",
        data: {
            orderId: order.orderId,
            shiprocketOrderId:
                shiprocketResponse.order_id,
            shipmentId:
                shiprocketResponse.shipment_id,
            status:
                shiprocketResponse.status
        }
    });

})

const checkServiceability = asyncHandler(async (req, res) => {

    const pincode = req.query.pincode;

    await getShiprocketToken();

    const checkedPinCode = await checkPinCode(pincode);

    if (!checkedPinCode)
        throw new apiError(500, "Error while checking pin code");

    res
        .status(200)
        .json(
            new apiResponse(200, "Pin code checked successfully", checkedPinCode)
        )

})

const getCourierDetails = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    if (!orderId)
        throw new apiError(400, "Order ID is required");

    const order = await Order.findById(orderId)

    if (!order)
        throw new apiError(404, "Order not found");

    if (!order.shiprocket?.orderId)
        throw new apiError(400, "Shiprocket order has not been created");

    // 1. Check courier serviceability
    const serviceability = await checkCourierServiceability({
        orderId: order?.shiprocket?.orderId,
        pickupPostcode: process.env.SHIPROCKET_PICKUP_PINCODE,
        deliveryPostcode: order?.shippingAddress?.pinCode
    })

    if (!serviceability)
        throw new apiError(500, "Error while checking courier serviceability");

    console.log("serviceability", serviceability);
    console.log(serviceability?.data?.available_courier_companies);
    
    

    res
        .status(200)
        .json(
            new apiResponse(200, "Courier details fetched successfully", serviceability?.data?.available_courier_companies)
        )
})

const generateAWB = asyncHandler(async (req, res) => {

    const { courierId } = req.body;

    const { orderId } = req.params;

    if (!courierId)
        throw new apiError(400, "Courier ID is required");

    const order = await Order.findById(orderId);

    if (!order)
        throw new apiError(404, "Order not found");

    if (!order.shiprocket?.orderId)
        throw new apiError(400, "Shiprocket order has not been created");

    // Generate AWB
    const awbResponse = await assignCourierAndGenerateAWB({
        shipmentId: order?.shiprocket?.shipmentId,
        courierId
    })

    // console.log("awbResponse", awbResponse);


    if (awbResponse?.awb_assign_status !== 1)
        throw new apiError(500, awbResponse?.response?.data?.awb_assign_error || "Error while assigning recommended courier");

    const awb = awbResponse?.response?.data;

    order.shiprocket = {
        ...order.shiprocket,

        awbCode:
            awb?.awb_code || null,

        courierCompanyId:
            awb?.courier_company_id
                ? String(awb.courier_company_id)
                : null,

        courierName:
            awb?.courier_name || null,

        status: "AWB Generated"
    };

    await order.save();

    const data = {
        courierName: awb?.courier_name,
        courierCompanyId: awb?.courier_company_id,
        awbCode: awb?.awb_code,
        shipmentId: order.shiprocket.shipmentId
    }

    res
        .status(200)
        .json(
            new apiResponse(200, "AWB generated successfully", data)
        )
})

// const generateShipmentLabelAndInvoice = asyncHandler(async (req, res) => {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId);

//     if (!order)
//         throw new apiError(404, "Order not found.");

//     const shipmentId = order?.shiprocket?.shipmentId;

//     if (!shipmentId)
//         throw new apiError(400, "Shiprocket shipment not found.");

//     if (!order?.shiprocket?.awbCode)
//         throw new apiError(400, "AWB must be generated before creating label.");

//     const result = await generateLabelAndInvoice([Number(shipmentId)]);

//     console.log("Shiprocket Label + Invoice Response:", result);

//     if (!result || result.error_count > 0 || !result.file_url)
//         throw new apiError(400, "Failed to generate label and invoice.");

//     order.shiprocket = {
//         ...order.shiprocket,
//         invoiceAndLabel: result?.file_url
//     }

//     await order.save();

//     res
//         .status(200)
//         .json(
//             new apiResponse(200, "Label and invoice generated successfully.", result)
//         )
// })

const generateShipmentLabelAndInvoice = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order)
        throw new apiError(404, "Order not found.");

    if (!order?.shiprocket?.shipmentId)
        throw new apiError(400, "Shiprocket shipment not found.");

    if (!order?.shiprocket?.orderId)
        throw new apiError(400, "Shiprocket shipment not found.");

    if (!order?.shiprocket?.awbCode)
        throw new apiError(400, "AWB must be generated before creating label.");

    // const result = await generateLabelAndInvoice([Number(shipmentId)]);
    const invoice = await generateInvoice([Number(order?.shiprocket?.orderId)])
    const label = await generateLabel([Number(order?.shiprocket?.shipmentId)]);

    // console.log("Shiprocket Label Response:", label);
    // console.log("Shiprocket Invoice Response:", invoice);

    if (!invoice || !invoice?.invoice_url)
        throw new apiError(400, "Failed to generate invoice.");
    if (!label || !label?.label_url)
        throw new apiError(400, "Failed to generate label.");

    order.shiprocket = {
        ...order.shiprocket,
        invoiceUrl: invoice?.invoice_url,
        labelUrl: label?.label_url
    }

    await order.save();

    res
        .status(200)
        .json(
            new apiResponse(200, "Label and invoice generated successfully.", { invoice: invoice?.invoice_url, label: label?.label_url })
        )
})

const requestPickup = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order)
        throw new apiError(404, "Order not found");

    const shipmentId = order.shiprocket?.shipmentId;

    if (!shipmentId)
        throw new apiError(400, "Shiprocket shipment not found");

    if (!order?.shiprocket?.awbCode)
        throw new apiError(400, "AWB must be generated before requesting pickup.");

    if (order?.shiprocket?.pickupStatus === "REQUESTED")
        throw new apiError(400, "Pickup has already been requested.");

    order.shiprocket.pickupStatus = "REQUESTED";

    const result = await requestShipmentPickup(shipmentId);

    // console.log("Shiprocket Pickup Response:", result);

    if (!result || result?.pickup_status !== 1) {
        order.shiprocket.pickupStatus = "FAILED";
        await order.save();
        throw new apiError(400, "Failed to request pickup.");
    }

    order.shiprocket.pickupStatus = "SCHEDULED";

    if (result?.response?.pickup_scheduled_date && result?.response?.pickup_token_number) {
        order.shiprocket.pickupScheduledDate = result?.response?.pickup_scheduled_date;
        order.shiprocket.pickupTokenNumber = result?.response?.pickup_token_number;
    }

    await order.save();

    res
        .status(200)
        .json(
            new apiResponse(200, "Pickup requested successfully", result)
        )
})

const createManifest = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order)
        throw new apiError(400, "Order not found.");

    if (!order?.shiprocket?.shipmentId)
        throw new apiError(400, "Shiprocket shipment not found.");

    if (!order?.shiprocket?.awbCode)
        throw new apiError(400, "AWB must be generated first.");

    if (order?.shiprocket?.pickupStatus !== "SCHEDULED")
        throw new apiError(400, "Pickup must be scheduled before generating manifest.");

    if (order?.shiprocket?.manifestStatus === "GENERATED")
        return res
            .status(200)
            .json(
                new apiResponse(200, "Manifest already generated", order?.shiprocket?.manifestUrl)
            )

    const result = await generateManifest(order?.shiprocket?.shipmentId)

    if (!result || !result?.manifest_url) {
        order.shiprocket.manifestStatus = "FAILED";
        await order.save();
        throw new apiError(400, "Failed to generate manifest.");
    }

    order.shiprocket.manifestStatus = "GENERATED";
    order.shiprocket.manifestUrl = result?.manifest_url;

    await order.save();

    res
        .status(200)
        .json(
            new apiResponse(200, "Manifest generated successfully", result)
        )


})

//           RETURN

const createReturnShipment = asyncHandler(async (req, res) => {
    const { returnId } = req.params;

    await getShiprocketToken();

    const returns = await Return.findById(returnId)
        .populate("products.product", "-_id -description -originalPrice -discountPrice -stock -images -star -createdAt -updatedAt -__v")
        .populate("user", "email -_id")
        .populate("order", "paymentMethod shippingAddress -_id")
        .select("-createdAt -__v -method -refundPayment -refundedAt -receivedAt -rejectedAt -requestedAt -approvedAt -refundStatus -returnStatus -products.returnedQuantity")


    if (!returns) {
        return res.status(404).json({
            success: false,
            message: "Return not found"
        });
    }


    if (returns?.shiprocket?.shipmentId) {
        return res.status(400).json({
            success: false,
            message: "Shipment already created"
        });
    }

    const shiprocketResponse = await createShiprocketReturnOrder(returns);

    if (!shiprocketResponse)
        throw new apiResponse(500, "Error while creating Shiprocket return shipment");

    // console.log(shiprocketResponse);

    returns.shiprocket.orderId = shiprocketResponse.order_id;
    returns.shiprocket.shipmentId = shiprocketResponse.shipment_id;
    returns.shiprocket.status = shiprocketResponse.status;

    await returns.save();

    // console.log(returns);

    res.status(200).json({
        success: true,
        message: "Shiprocket shipment created successfully",
        data: {
            orderId: returns.returnId,
            shiprocketOrderId: shiprocketResponse.order_id,
            shipmentId: shiprocketResponse.shipment_id,
            status: shiprocketResponse.status
        }
    });

})

const getReturnCourierOptions = asyncHandler(async (req, res) => {

    const { returnId } = req.params;

    if (!returnId)
        throw new apiError(400, "Return ID is required");

    const returns = await Return.findById(returnId)
        .populate("order", "paymentMethod shippingAddress -_id")

    if (!returns)
        throw new apiError(404, "Return not found");

    if (!returns?.shiprocket?.orderId)
        throw new apiError(400, "Shiprocket return order has not been created");

    const serviceability = await checkCourierServiceability({
        orderId: returns?.shiprocket?.orderId,
        pickupPostcode: returns?.order?.shippingAddress?.pinCode,
        deliveryPostcode: process.env.SHIPROCKET_PICKUP_PINCODE
    })

    if (!serviceability)
        throw new apiError(500, "Error while checking return courier serviceability");

    res
        .status(200)
        .json(
            new apiResponse(200, "Courier details fetched successfully", serviceability?.data?.available_courier_companies)
        )
})

const assignReturnAWB = asyncHandler(async (req, res) => {
    // console.log(req.body);

    const { courierId } = req.body;

    if (!courierId)
        throw new apiError(400, "Courier ID is required");

    const { returnId } = req.params;
    // console.log(returnId);

    const returns = await Return.findById(returnId);

    if (!returns)
        throw new apiError(404, "Return not found");

    if (!returns?.shiprocket?.orderId)
        throw new apiError(400, "Shiprocket return order has not been created");

    returns.shiprocket.pickupStatus = "REQUESTED";

    // Generate AWB
    const awbResponse = await generateReturnAWB({
        shipmentId: returns?.shiprocket?.shipmentId,
        courierId
    })

    // console.log("awbResponse", awbResponse);

    if (awbResponse?.awb_assign_status !== 1){

        returns.shiprocket.pickupStatus = "FAILED";

        await returns.save();

        throw new apiError(500, awbResponse?.response?.data?.awb_assign_error || "Error while assigning recommended courier");
    }

    const awb = awbResponse?.response?.data;

    returns.shiprocket = {
        ...returns.shiprocket,
        awbCode: awb?.awb_code || null,
        courierCompanyId: awb?.courier_company_id ? String(awb.courier_company_id) : null,

        courierName: awb?.courier_name || null,
        status: "AWB Generated",
        pickupStatus: "SCHEDULED",
        pickupScheduledDate: awb?.pickup_scheduled_date
    };

    await returns.save();

    const data = {
        courierName: awb?.courier_name,
        courierCompanyId: awb?.courier_company_id,
        awbCode: awb?.awb_code,
        shipmentId: returns.shiprocket.shipmentId
    }

    res
        .status(200)
        .json(
            new apiResponse(200, "Return AWB generated successfully", data)
        )
})


//     WEBHOOK

const shiprocketWebhook = asyncHandler(async (req, res) => {
    try {

        const data = req.body;
        console.log("Webhook data", data);
        /*
        |--------------------------------------------------------------------------
        | Basic validation
        |--------------------------------------------------------------------------
        */

        if (!data) {
            return res.status(200).json({
                success: true
            });
        }


        /*
        |--------------------------------------------------------------------------
        | AWB is required
        |--------------------------------------------------------------------------
        */

        if (!data.awb) {

            console.log(
                "Shiprocket webhook received without AWB"
            );

            return res.status(200).json({
                success: true
            });
        }


        /*
        |--------------------------------------------------------------------------
        |   RETURN
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | Check if AWB belongs to a Return
        |--------------------------------------------------------------------------
        */

        const returns = await Return.findOne({
            "shiprocket.awbCode": String(data.awb)
        });

        if (returns) {

            const currentStatus = (data.current_status || "").toUpperCase();


            /*
            |--------------------------------------------------------------------------
            | Update Shiprocket return status
            |--------------------------------------------------------------------------
            */

            returns.shiprocket.status = data.current_status || null;


            /*
            |--------------------------------------------------------------------------
            | Update courier
            |--------------------------------------------------------------------------
            */

            if (data.courier_name) {
                returns.shiprocket.courierName = data.courier_name;
            }


            /*
            |--------------------------------------------------------------------------
            | Pickup status
            |--------------------------------------------------------------------------
            */

            if (currentStatus === "PICKED UP") {
                returns.shiprocket.pickupStatus = "PICKED_UP";
            }


            /*
            |--------------------------------------------------------------------------
            | Pickup failed
            |--------------------------------------------------------------------------
            */

            else if (
                currentStatus.includes("PICKUP") &&
                (
                    currentStatus.includes("FAILED") ||
                    currentStatus.includes("CANCELLED") ||
                    currentStatus.includes("CANCELED")
                )
            ) {

                returns.shiprocket.pickupStatus = "FAILED";
            }


            /*
            |--------------------------------------------------------------------------
            | Return delivered
            |--------------------------------------------------------------------------
            |
            | Customer's returned package has reached STYQLO.
            |
            */

            if (currentStatus === "DELIVERED") {
                returns.returnStatus = "Received";
                returns.receivedAt = new Date();
            }


            /*
            |--------------------------------------------------------------------------
            | Save Return
            |--------------------------------------------------------------------------
            */

            await returns.save();


            console.log(
                `Shiprocket return tracking updated | ` +
                `Return: ${returns.returnId} | ` +
                `AWB: ${data.awb} | ` +
                `Status: ${currentStatus}`
            );

            return res.status(200).json({
                success: true
            });
        }


        /*
        |--------------------------------------------------------------------------
        |   ORDER
        |--------------------------------------------------------------------------
        */

        /*
        |--------------------------------------------------------------------------
        | Find STYQLO order using AWB
        |--------------------------------------------------------------------------
        */

        const order = await Order.findOne({
            "shiprocket.awbCode": String(data.awb)
        });


        /*
        |--------------------------------------------------------------------------
        | Order not found
        |--------------------------------------------------------------------------
        */

        if (!order) {

            console.log(
                `No STYQLO order found for AWB: ${data.awb}`
            );

            // Still return 200 so Shiprocket
            // does not repeatedly retry.
            return res.status(200).json({
                success: true
            });
        }


        /*
        |--------------------------------------------------------------------------
        | Initialize tracking object
        |--------------------------------------------------------------------------
        */

        if (!order.shiprocket.tracking) {

            order.shiprocket.tracking = {
                currentStatus: null,
                currentStatusId: null,
                shipmentStatus: null,
                shipmentStatusId: null,
                currentTimestamp: null,
                etd: null,
                scans: []
            };
        }


        /*
        |--------------------------------------------------------------------------
        | Update latest tracking status
        |--------------------------------------------------------------------------
        */

        order.shiprocket.tracking.currentStatus = data.current_status || null;

        order.shiprocket.tracking.currentStatusId = data.current_status_id || null;

        order.shiprocket.tracking.shipmentStatus = data.shipment_status || null;

        order.shiprocket.tracking.shipmentStatusId = data.shipment_status_id || null;

        order.shiprocket.tracking.currentTimestamp = parseShiprocketDate(data.current_timestamp);

        order.shiprocket.tracking.etd = data.etd ? new Date(data.etd) : null;


        /*
        |--------------------------------------------------------------------------
        | Update courier information
        |--------------------------------------------------------------------------
        */

        if (data.courier_name) {
            order.shiprocket.courierName = data.courier_name;
        }


        /*
        |--------------------------------------------------------------------------
        | Process tracking scans
        |--------------------------------------------------------------------------
        */

        const existingScans = order.shiprocket.tracking.scans || [];

        const incomingScans = Array.isArray(data.scans) ? data.scans : [];


        for (const scan of incomingScans) {

            const scanDate = parseScanDate(scan.date);

            const scanActivity = scan.activity || "";

            const scanLocation = scan.location || "";


            /*
            |--------------------------------------------------------------
            | Prevent duplicate scans
            |--------------------------------------------------------------
            */

            const alreadyExists = existingScans.some(existing => {

                const sameDate =
                    existing.date &&
                    scanDate &&
                    existing.date.getTime() ===
                    scanDate.getTime();

                const sameActivity =
                    existing.activity ===
                    scanActivity;

                const sameLocation =
                    existing.location ===
                    scanLocation;

                return (
                    sameDate &&
                    sameActivity &&
                    sameLocation
                );
            }
            );


            if (!alreadyExists) {

                existingScans.push({
                    date: scanDate,

                    status:
                        scan.status || null,

                    activity:
                        scan.activity || null,

                    location:
                        scan.location || null,

                    srStatus:
                        scan["sr-status"] || null,

                    srStatusLabel:
                        scan["sr-status-label"] || null
                });
            }
        }


        order.shiprocket.tracking.scans = existingScans;


        /*
        |--------------------------------------------------------------------------
        | Update pickup status
        |--------------------------------------------------------------------------
        */

        const currentStatus = (data.current_status || "").toUpperCase();


        if (currentStatus === "PICKED UP") {
            order.shiprocket.pickupStatus = "PICKED_UP";
        }


        /*
        |--------------------------------------------------------------------------
        | Update STYQLO Order Status
        |--------------------------------------------------------------------------
        */

        if (currentStatus === "PICKED UP" || currentStatus === "SHIPPED" || currentStatus === "IN TRANSIT" || currentStatus === "OUT FOR DELIVERY") {
            order.orderStatus = "Shipped";
        }


        else if (currentStatus === "DELIVERED") {
            order.orderStatus = "Delivered";
            order.paymentStatus = "Paid";
            order.deliveredAt = new Date();
        }


        else if (currentStatus === "CANCELLED" || currentStatus === "CANCELED") {
            order.orderStatus = "Cancelled";
        }


        /*
        |--------------------------------------------------------------------------
        | Save order
        |--------------------------------------------------------------------------
        */

        await order.save();


        /*
        |--------------------------------------------------------------------------
        | Log
        |--------------------------------------------------------------------------
        */

        console.log(`Shiprocket tracking updated | ` + `Order: ${order._id} | ` + `AWB: ${data.awb} | ` + `Status: ${currentStatus}`);


        /*
        |--------------------------------------------------------------------------
        | IMPORTANT
        |--------------------------------------------------------------------------
        | Shiprocket expects HTTP 200.
        |--------------------------------------------------------------------------
        */

        return res.status(200).json({
            success: true
        });

    }

    catch (error) {
        console.error("Shiprocket webhook error:", error);


        /*
        |--------------------------------------------------------------------------
        | Important:
        | Even in processing errors, return 200 to prevent
        | unnecessary repeated webhook calls.
        |--------------------------------------------------------------------------
        */

        return res.status(200).json({
            success: false
        });
    }
})

export { createShipmentOrder, checkServiceability, getCourierDetails, generateAWB, generateShipmentLabelAndInvoice, requestPickup, createManifest, shiprocketWebhook, createReturnShipment, getReturnCourierOptions, assignReturnAWB }