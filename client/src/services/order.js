import axios from "axios"


const createOrder = async (products, inputData, subTotal, shipping, orderTotal, gst) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/orders/`, {
        products, shippingAddress: inputData, 
        subTotal, shippingCharges: shipping, 
        totalAmount: orderTotal,
        tax: gst
    }, { withCredentials: true });

    return response.data.data;
}

const getUserOrders = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/`, { withCredentials: true });

    console.log("response", response);
}

const getOrderById = async (orderId) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/${orderId}`, { withCredentials: true })

    console.log("response", response);
}

export { createOrder, getUserOrders, getOrderById }