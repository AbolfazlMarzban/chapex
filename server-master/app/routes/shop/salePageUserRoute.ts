import express, { Router } from "express";

import pageSaleUserController from "../../controller/shop/pageSaleUserController";

const router: Router = express.Router();

router.get("/get/:id", pageSaleUserController.get);
router.get("/getbyflink/:flink", pageSaleUserController.getbyflink);
router.get("/getid/:flink", pageSaleUserController.getid);

export default router;