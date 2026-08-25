import express from "express";
import { checkServiceability, createManifest, createShipmentOrder, generateAWB, generateShipmentLabelAndInvoice, getCourierDetails, requestPickup } from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.route("/check-serviceability").get(checkServiceability);
router.route("/:orderId/create").post(createShipmentOrder);
router.route("/:orderId/get-couriers").post(getCourierDetails);
router.route("/:orderId/generate-awb").post(generateAWB);
router.route("/:orderId/label").post(generateShipmentLabelAndInvoice);
router.route("/:orderId/pickup").post(requestPickup);
router.route("/:orderId/manifest").post(createManifest);

export default router;