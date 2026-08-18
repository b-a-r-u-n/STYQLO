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
    const data = {
        order_id: order.orderId,
        order_date: new Date(order.updatedAt)
            .toISOString()
            .split("T")[0],
        pickup_location: "Primary",
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
        order_items: order.products.map(item => ({
            name: item.product.name,
            sku: item.product._id.toString(),
            units: item.quantity,
            selling_price: item.price,
            tax: order.tax / item.quantity,
            // "hsn": 
        })),
        "payment_method": order.paymentMethod === "COD" ? "COD" : "Prepaid",
        "shipping_charges": order.shippingCharges,
        "sub_total": order.subTotal,
        "length": 10,
        "breadth": 10,
        "height": 10,
        "weight": 0.5
    }

    const response = await axios.post(`${import.meta.env.SHIPROCKET_BASE_URL}/orders/create/adhoc`,
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

    return response?.data;
}

export { getShiprocketToken, checkPinCode, createShiprocketOrder }