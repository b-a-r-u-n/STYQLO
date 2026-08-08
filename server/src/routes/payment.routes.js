import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createRazorpayOrder, handleRazorpayWebhook, verifyRazorpayPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.route("/create-order").post(verifyJWT, createRazorpayOrder);
router.route("/verify").post(verifyJWT, verifyRazorpayPayment);
router.route("/webhook").post(handleRazorpayWebhook);

export default router;