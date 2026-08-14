import axios from "axios";
import apiError from "./apiError.js";

const getShiprocketToken = async () => {
    try {
        const response = await axios.post("https://apiv2.shiprocket.in/v1/external/auth/login",
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

        return response?.data?.token;

    } catch (error) {
        console.error("Error while getting Shiprocket token:", error);
    }
}

export { getShiprocketToken }