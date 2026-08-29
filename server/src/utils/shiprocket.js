import axios from "axios";
import apiError from "./apiError.js";

let shiprocketToken = null;

const getShiprocketToken = async () => {
    try {
        if (shiprocketToken)
            return shiprocketToken;

        const response = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/auth/login`,
            {
                email: process.env.SHIPROCKET_API_EMAIL,
                password: process.env.SHIPROCKET_API_SECRET
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        if (!response)
            throw new apiError(500, "Error while getting Shiprocket token");

        shiprocketToken = response?.data?.token

        return response?.data?.token;

    } catch (error) {
        console.error("Error while getting Shiprocket token:", error);
        throw error;
    }
}

const checkPinCode = async (pincode) => {
    try {
        let token = null;
        if (!shiprocketToken)
            token = await getShiprocketToken();
        const response = await axios.get(`${process.env.SHIPROCKET_BASE_URL}/courier/serviceability/`,
            {
                params: {
                    pickup_postcode: process.env.SHIPROCKET_PICKUP_PINCODE,
                    delivery_postcode: pincode,
                    weight: 1,
                    cod: 1
                },
                headers: {
                    Authorization: `Bearer ${shiprocketToken || token}`
                }
            }
        )

        if (!response)
            throw new apiError(500, "Error while checking pin code");

        return response?.data;
    } catch (error) {
        console.error(
            "Error while checking pin code:",
            error.response?.data || error.message
        );

        throw new apiError(
            error.response?.status || 500,
            error.response?.data?.message || "Error while checking pin code"
        );
    }
}

const createShiprocketOrder = async (order) => {

    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();

    const size = order?.products[0]?.size;
    // console.log(size);

    const sizesData = order?.products[0]?.product?.sizes?.filter((item) => item.size === size)
    // console.log(sizesData[0]);

    const data = {
        order_id: order.orderId,
        order_date: new Date(order.updatedAt)
            .toISOString()
            .split("T")[0],
        pickup_location: "Primary",
        invoice_number: order.invoiceNumber,
        billing_customer_name: order.shippingAddress.fullName,
        billing_last_name: "",
        billing_address: order.shippingAddress.streetAddress,
        billing_address_2: "",
        billing_city: order.shippingAddress.city,
        billing_pincode: order.shippingAddress.pinCode,
        billing_state: order.shippingAddress.state,
        billing_country: "India",
        billing_email: order.user.email,
        billing_phone: order.shippingAddress.phoneNumber,
        shipping_is_billing: true,
        order_items: order.products.map(item => {
            const gstInclusivePrice =
                item.price + (item.price * item.product.tax);
            return {
                name: item.product.name,
                sku: sizesData[0]?.sku,
                units: item.quantity,
                selling_price: Number(gstInclusivePrice),
                tax: item.product.tax * 100,
                hsn: item?.product?.hsn
            }
        }),
        "payment_method": order.paymentMethod === "COD" ? "COD" : "Prepaid",
        "shipping_charges": order.shippingCharges,
        "sub_total": order.totalAmount - order.shippingCharges,
        "length": order?.products[0]?.product?.length,
        "breadth": order?.products[0]?.product?.breadth,
        "height": order?.products[0]?.product?.height,
        "weight": order?.products[0]?.product?.weight
    }

    // console.log(data);

    const response = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/orders/create/adhoc`,
        data,
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    )

    if (!response)
        throw new apiError(500, "Error while creating Shiprocket order");

    // console.log("response", response);
    // console.log("response.data", response.data);


    return response?.data;
}

const checkCourierServiceability = async ({ orderId, pickupPostcode, deliveryPostcode }) => {
    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();
    const response = await axios.get(`${process.env.SHIPROCKET_BASE_URL}/courier/serviceability/`,
        {
            params: {
                pickup_postcode: pickupPostcode,
                delivery_postcode: deliveryPostcode,
                order_id: orderId
            },
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }

    )

    if (!response)
        throw new apiError(500, "Error while checking courier serviceability");

    // console.log(response);


    return response.data;

}

const assignCourierAndGenerateAWB = async ({ shipmentId, courierId }) => {
    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();
    const response = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/courier/assign/awb`,
        {
            shipment_id: shipmentId,
            courier_id: courierId
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    )

    if (!response)
        throw new apiError(500, "Error while assigning recommended courier");

    return response.data;
}

// const generateLabelAndInvoice = async (shipmentIds) => {
//     try {
//         console.log("shipmentIds", shipmentIds);
//         const response = await axios.post(
//             `${process.env.SHIPROCKET_BASE_URL}/courier/generate/label-invoice`,
//             {
//                 shipment_ids: shipmentIds
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${shiprocketToken}`,
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         console.log("label-invoice response", response);

//         return response.data;
//     } catch (error) {
//         console.error("error", error);
//     }
// }

const generateLabel = async (shipmentId) => {
    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();
    const response = await axios.post(
        `${process.env.SHIPROCKET_BASE_URL}/courier/generate/label`,
        {
            shipment_id: shipmentId
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    );

    console.log("label", response);

    return response.data;
}

const generateInvoice = async (orderId) => {
    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();
    const response = await axios.post(
        `${process.env.SHIPROCKET_BASE_URL}/orders/print/invoice`,
        {
            ids: orderId
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    );

    console.log("invoice", response);

    return response.data;
}


const requestShipmentPickup = async (shipmentId) => {
    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();
    const response = await axios.post(
        `${process.env.SHIPROCKET_BASE_URL}/courier/generate/pickup`,
        {
            shipment_id: [Number(shipmentId)]
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
};

const generateManifest = async (shipmentId) => {
    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();
    const response = await axios.post(
        `${process.env.SHIPROCKET_BASE_URL}/manifests/generate`,
        {
            shipment_id: [Number(shipmentId)]
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

//      RETURN

const createShiprocketReturnOrder = async (returns) => {

    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();
    // console.log("returns.products.product", returns.products.product);

    const size = returns?.products?.size;

    const sizeData = returns?.products?.product?.sizes?.filter((item) => item.size === size)
    // console.log(sizeData);

    const data = {
        order_id: returns?.returnId,
        order_date: new Date(returns?.updatedAt)
            .toISOString()
            .split("T")[0],

        invoice_number: returns?.returnInvoiceNumber,

        pickup_customer_name: returns?.order?.shippingAddress?.fullName,
        pickup_last_name: "",
        pickup_address: returns?.order?.shippingAddress?.streetAddress,
        pickup_address_2: "",
        pickup_city: returns?.order?.shippingAddress?.city,
        pickup_state: returns?.order?.shippingAddress?.state,
        pickup_country: "India",
        pickup_pincode: Number(returns?.order?.shippingAddress?.pinCode),
        pickup_email: returns?.user?.email,
        pickup_phone: returns?.order?.shippingAddress?.phoneNumber,

        // shipping_location: "Primary",

        shipping_customer_name: process.env.SHIPROCKET_RETURN_NAME,
        shipping_last_name: "",
        shipping_address: process.env.SHIPROCKET_RETURN_ADDRESS,

        shipping_address_2: process.env.SHIPROCKET_RETURN_ADDRESS_2 || "",

        shipping_city: process.env.SHIPROCKET_RETURN_CITY,

        shipping_state: process.env.SHIPROCKET_RETURN_STATE,

        shipping_country: process.env.SHIPROCKET_RETURN_COUNTRY || "India",

        shipping_pincode: Number(process.env.SHIPROCKET_RETURN_PINCODE),
        shipping_email: process.env.SHIPROCKET_RETURN_EMAIL,
        shipping_phone: process.env.SHIPROCKET_RETURN_PHONE,

        order_items: [
            {
                name: returns?.products?.product?.name,
                sku: sizeData[0]?.sku,
                units: returns?.products?.quantity,
                selling_price: Number(returns?.products?.price + (returns?.products?.price * returns?.products?.product.tax)),
                return_reason: returns?.reason || returns?.description
            }
        ],

        payment_method: returns?.order.paymentMethod === "COD" ? "COD" : "Prepaid",
        sub_total: returns?.refundAmount,
        length: returns?.products?.product?.length,
        breadth: returns?.products?.product?.breadth,
        height: returns?.products?.product?.height,
        weight: returns?.products?.product?.weight
    }

    // console.log(data);

    const response = await axios.post(
        `${process.env.SHIPROCKET_BASE_URL}/orders/create/return`,
        data,
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    );

    if (!response)
        throw new apiError(500, "Error while creating return Shiprocket order");

    return response?.data;
};

const generateReturnAWB = async ({courierId, shipmentId}) => {
    let token = null;
    if (!shiprocketToken)
        token = await getShiprocketToken();

    const response = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/courier/assign/awb`, 
        {
            shipment_id: shipmentId,
            courier_id: courierId,
            is_return: 1
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken || token}`,
                "Content-Type": "application/json"
            }
        }
    )

    return response.data;
}

export { getShiprocketToken, checkPinCode, createShiprocketOrder, checkCourierServiceability, assignCourierAndGenerateAWB, requestShipmentPickup, generateManifest, generateLabel, generateInvoice, createShiprocketReturnOrder, generateReturnAWB }