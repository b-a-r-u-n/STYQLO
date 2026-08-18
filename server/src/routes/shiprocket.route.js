import express from "express";
import { checkServiceability, createShipmentOrder } from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.route("/check-serviceability").get(checkServiceability);
router.route("/:orderId/create").post(createShipmentOrder);

export default router;