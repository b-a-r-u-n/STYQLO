import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { createReturn, getAllReturns, getReturnById, updateReturn } from "../controllers/return.controller.js";

const router = express.Router();

router.route("/").post(verifyJWT, createReturn);
router.route("/:returnId").get(verifyJWT, getReturnById);
router.route("/admin/returns").get(verifyJWT, getAllReturns);
router.route("/admin/returns/update/:returnId").put(verifyJWT, updateReturn);

export default router;