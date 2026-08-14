import express from "express";
import { createShipmentOrder } from "../controllers/shiprocket.controller.js";

const router = express.Router();

router.route("/create").post(createShipmentOrder);

export default router;