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
    }
}

const checkPinCode = async (pincode) => {
    try {
        const response = await axios.get(`${process.env.SHIPROCKET_BASE_URL}/courier/serviceability/`,
            {
                params: {
                    pickup_postcode: process.env.SHIPROCKET_PICKUP_PINCODE,
                    delivery_postcode: pincode,
                    weight: 1,
                    cod: 1
                },
                headers: {
                    Authorization: `Bearer ${shiprocketToken}`
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
    // console.log("order", order);
    // console.log("order.products[0].product", order.products[0].product);

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
        // order_items: [
        //     {
        //         "name": "Kunai",
        //         "sku": "chakra123",
        //         "units": 10,
        //         "selling_price": 900,
        //         "discount": "",
        //         "tax": "",
        //         "hsn": 441122
        //     }
        // ],
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
                Authorization: `Bearer ${shiprocketToken}`,
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

    const response = await axios.get(`${process.env.SHIPROCKET_BASE_URL}/courier/serviceability/`,
        {
            params: {
                pickup_postcode: pickupPostcode,
                delivery_postcode: deliveryPostcode,
                order_id: orderId
            },
            headers: {
                Authorization: `Bearer ${shiprocketToken}`,
                "Content-Type": "application/json"
            }
        }

    )

    if (!response)
        throw new apiError(500, "Error while checking courier serviceability");

    return response.data;

}

const assignCourierAndGenerateAWB = async ({ shipmentId, courierId }) => {
    const response = await axios.post(`${process.env.SHIPROCKET_BASE_URL}/courier/assign/awb`,
        {
            shipment_id: shipmentId,
            courier_id: courierId
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken}`,
                "Content-Type": "application/json"
            }
        }
    )

    if (!response)
        throw new apiError(500, "Error while assigning recommended courier");

    return response.data;
}

const generateLabelAndInvoice = async (shipmentIds) => {
    const response = await axios.post(
        `${SHIPROCKET_BASE_URL}/courier/generate/label-invoice`,
        {
            shipment_ids: shipmentIds
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

const requestShipmentPickup = async (shipmentId) => {

    const response = await axios.post(
        `${SHIPROCKET_BASE_URL}/courier/generate/pickup`,
        {
            shipment_id: [Number(shipmentId)]
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
};

const generateManifest = async (shipmentId) => {
    const response = await axios.post(
        `${SHIPROCKET_BASE_URL}/manifests/generate`,
        {
            shipment_id: [Number(shipmentId)]
        },
        {
            headers: {
                Authorization: `Bearer ${shiprocketToken}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

export { getShiprocketToken, checkPinCode, createShiprocketOrder, checkCourierServiceability, assignCourierAndGenerateAWB, generateLabelAndInvoice, requestShipmentPickup, generateManifest }