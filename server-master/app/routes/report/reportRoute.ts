import express, { Router } from "express";


import reportController from "../../controller/report/reportController";
const router: Router = express.Router();


router.get("/get/:id" ,reportController.get);

router.get("/getChart/:goodsId/:timeRange/:priceType" ,reportController.getChart);

export default router;
