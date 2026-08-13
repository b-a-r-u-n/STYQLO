import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createCheckout, removeCheckout } from "../controllers/checkout.controller.js";

const router = express.Router();

router.route("/").post(verifyJWT, createCheckout);
router.route("/:checkoutId").delete(removeCheckout);

export default router;