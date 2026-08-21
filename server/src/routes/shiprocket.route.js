import express from "express";
import { checkServiceability, createShipmentOrder, getCourierDetails } from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.route("/check-serviceability").get(checkServiceability);
router.route("/:orderId/create").post(createShipmentOrder);
router.route("/:orderId/get-couriers").post(getCourierDetails);

export default router;