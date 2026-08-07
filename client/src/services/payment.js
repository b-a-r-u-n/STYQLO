import axios from "axios"

const createRazorpayOrder = async (orderId) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payments/create-order`, {orderId}, {withCredentials: true});

    return response.data.data;
}

const verifyRazorpayPayment = async ({razorpay_order_id, razorpay_payment_id, razorpay_signature}) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payments/verify`, { razorpay_order_id, razorpay_payment_id, razorpay_signature}, {withCredentials: true});

    // console.log(response);

    return response.data;
}

const handleRazorpayWebhook = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/payments/verify`, {}, {withCredentials: true});

    console.log("response", webhook);
}

export {createRazorpayOrder, verifyRazorpayPayment, handleRazorpayWebhook}