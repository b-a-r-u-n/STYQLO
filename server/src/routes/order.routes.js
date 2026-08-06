import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createOrder, getOrderById, getUserOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").post(verifyJWT, createOrder);
router.route("/").get(verifyJWT, getUserOrders);
router.route("/:orderId").get(verifyJWT, getOrderById);

export default router;