import express, { Router } from "express";

import homeController from "../../controller/shop/homeController";

const router: Router = express.Router();

router.get("/get/:id", homeController.get);
router.get("/getSiteMap/:type", homeController.getSiteMap);

export default router;