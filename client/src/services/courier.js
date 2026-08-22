import axios from "axios";
import toast from "react-hot-toast";

const createShiprocketOrder = async (orderId) => {
    
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/create`, {withCredentials: true})

        // console.log("res", res);
        
    } catch (error) {
        throw error;
    }
}

const getCourierDetails = async (orderId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/get-couriers`, {withCredentials: true})

        // console.log("res", res);
        return res.data;
        
    } catch (error) {
        // console.log("error", error.response);
        throw error;
    }
}
const generateAWB = async ({orderId, courierId}) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/generate-awb`, {courierId}, {withCredentials: true})

        // console.log("res", res);
        return res;
        
    } catch (error) {
        // console.log("error", error.response);
        throw error;
    }
}

export {createShiprocketOrder, getCourierDetails, generateAWB}