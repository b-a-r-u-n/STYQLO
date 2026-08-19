import express from "express";
import { assignBestCourierAndGenerateAWB, checkServiceability, createShipmentOrder } from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.route("/check-serviceability").get(checkServiceability);
router.route("/:orderId/create").post(createShipmentOrder);
router.route("/:orderId/assign-best-courier-and-generate-awb").post(assignBestCourierAndGenerateAWB);

export default router;