import express from "express";
import { assignReturnAWB, checkServiceability, createManifest, createReturnShipment, createShipmentOrder, generateAWB, generateShipmentLabelAndInvoice, getCourierDetails, getReturnCourierOptions, requestPickup } from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.route("/check-serviceability").get(checkServiceability);
router.route("/:orderId/create").post(createShipmentOrder);
router.route("/:orderId/get-couriers").post(getCourierDetails);
router.route("/:orderId/generate-awb").post(generateAWB);
router.route("/:orderId/invoice-label").post(generateShipmentLabelAndInvoice);
router.route("/:orderId/pickup").post(requestPickup);
router.route("/:orderId/manifest").post(createManifest);


// RETURN
router.route("/return/:returnId/create").post(createReturnShipment);
router.route("/return/:returnId/get-couriers").get(getReturnCourierOptions);
router.route("/return/:returnId/generate-awb").post(assignReturnAWB);

export default router;