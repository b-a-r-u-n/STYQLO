import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createOrder, getAllOrders, getOrderById, getUserOrders, updateOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").post(verifyJWT, createOrder);
router.route("/").get(verifyJWT, getUserOrders);
router.route("/:orderId").get(verifyJWT, getOrderById);

router.route("/admin/orders").get(verifyJWT, getAllOrders);
router.route("/admin/orders/update/:orderId").put(verifyJWT, updateOrder);

export default router;