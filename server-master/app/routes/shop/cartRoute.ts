import express, { Router } from "express";

import cartController from '../../controller/shop/cartController';

import isAuth from '../../middleware/is-auth';

const router: Router = express.Router();


router.post("/", isAuth, cartController.insert);
router.post("/update", isAuth, cartController.update);
router.post("/buy", isAuth, cartController.insertBuy);
router.get("/get/", isAuth, cartController.getCart);
router.get("/getOrders/", isAuth, cartController.getOrder)
router.get("/get/itemCount/:basketId", isAuth, cartController.getItemCount);
router.get("/getInit", isAuth, cartController.getInit);
router.patch("/set/:basketId/:cartRowId", isAuth, cartController.changeBasketId);
router.delete("/delete/:rowIdToDelete", isAuth, cartController.deleteCartItem);

export default router;
