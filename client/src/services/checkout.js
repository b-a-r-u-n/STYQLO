import axios from "axios";

const createCheckout = async ({ products, inputData, subTotal, shipping, totalPrice, tax, paymentMethod }) => {
    
    try {        
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/checkout/`, {
            products, shippingAddress: inputData,
            subTotal, shippingCharges: shipping,
            totalAmount: totalPrice,
            tax: tax,
            paymentMethod
        }, {withCredentials: true});

        return response.data.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

const removeCheckout = async (checkoutId) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/checkout/${checkoutId}`, {withCredentials: true})

        return response.data.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export {createCheckout, removeCheckout}