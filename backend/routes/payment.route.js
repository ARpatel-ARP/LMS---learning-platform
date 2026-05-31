import express from "express";
import { initiatePayment, getMyPurchases } from "../controllers/payment.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/initiate", isAuthenticated, initiatePayment);
router.get("/my-purchases", isAuthenticated, getMyPurchases);

export default router;