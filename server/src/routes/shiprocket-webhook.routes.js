import express from "express";
import { verifyShiprocketWebhook } from "../middlewares/shiprocket.middleware.js";
import { shiprocketWebhook } from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.route("/tracking").post(verifyShiprocketWebhook, shiprocketWebhook)

export default router;