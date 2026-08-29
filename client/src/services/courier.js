import axios from "axios";
import toast from "react-hot-toast";

const createShiprocketOrder = async (orderId) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/create`, { withCredentials: true })

        // console.log("res", res);

    } catch (error) {
        throw error;
    }
}

const getCourierDetails = async (orderId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/get-couriers`, { withCredentials: true })

        // console.log("res", res);
        return res.data;

    } catch (error) {
        // console.log("error", error.response);
        throw error;
    }
}

const generateAWB = async ({ orderId, courierId }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/generate-awb`, { courierId }, { withCredentials: true })

        // console.log("res", res);
        return res.data;

    } catch (error) {
        // console.log("error", error.response);
        throw error;
    }
}

const generateLabelAndInvoice = async (orderId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/invoice-label`, { withCredentials: true })

        // console.log("res", res);
        return res?.data;

    } catch (error) {
        // console.log("error", error.response);
        throw error;
    }
}

const requestPickup = async (orderId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/pickup`, { withCredentials: true })

        return res.data;
    } catch (error) {
        throw error;
    }
}

const createManifest = async (orderId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/${orderId}/manifest`, {withCredentials: true});

        return res.data;
    } catch (error) {
        throw error;
    }
}


//     RETURN

const createReturnShipment = async (returnId) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/return/${returnId}/create`, { withCredentials: true })

        // console.log("res", res);

    } catch (error) {
        throw error;
    }
}

const getReturnCourierOptions = async (returnId) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/shiprocket/return/${returnId}/get-couriers`, { withCredentials: true })
        // console.log(res);
        
        return res.data;
    } catch (error) {
        throw error
    }
}

const assignReturnAWB = async ({returnId, courierId}) => {
    try {
        
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/return/${returnId}/generate-awb`, {courierId}, {withCredentials: true})
        console.log(res);
        
        return res.data;

    } catch (error) {
        throw error;
    }
}

const requestReturnPickup = async (returnId) => {
    try {
        
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shiprocket/return/${returnId}/pickup`, {withCredentials: true})
        // console.log(res);
        
        return res.data;

    } catch (error) {
        throw error;
    }
}

export { createShiprocketOrder, getCourierDetails, generateAWB, generateLabelAndInvoice, requestPickup, createManifest, createReturnShipment, getReturnCourierOptions, assignReturnAWB, requestReturnPickup }