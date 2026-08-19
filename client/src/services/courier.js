import axios from "axios";

const createShiprocketOrder = async (orderId) => {
    
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/create`, {withCredentials: true})

        // console.log("res", res);
        
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

const assignBestCourierAndGenerateAWB = async (orderId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/assign-best-courier-and-generate-awb`, {withCredentials: true})

        console.log("res", res);
        
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export {createShiprocketOrder, assignBestCourierAndGenerateAWB}