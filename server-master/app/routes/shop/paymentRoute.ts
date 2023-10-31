import express, { Router } from "express";

import paymentGatewayController from '../../controller/shop/paymentGatewayController';

import isAuth from '../../middleware/is-auth';

const router: Router = express.Router();

router.get("/get/:id", isAuth, paymentGatewayController.getPaymentGateways);
router.post("/getPaymentURL", isAuth, paymentGatewayController.getPaymentURL);
router.post("/verifyPayment", paymentGatewayController.verifyPayment);

export default router;
