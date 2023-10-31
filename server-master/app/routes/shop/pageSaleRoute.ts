import express, { Router } from "express";

import pageSaleController from "../../controller/shop/pageSaleController";
import isAuth from '../../middleware/is-auth'


const router: Router = express.Router();

router.get("/get/:id",isAuth, pageSaleController.get);          
router.post("/", isAuth, pageSaleController.insert);
router.patch("/",isAuth, pageSaleController.update);
router.delete("/:id",isAuth, pageSaleController.delete);


router.get("/goods/get/:id" ,isAuth, pageSaleController.getGoods)
router.post("/goods",isAuth,  pageSaleController.insertGoods);
router.patch("/goods",isAuth, pageSaleController.updateGoods);
router.delete("/goods/:id",isAuth, pageSaleController.deleteGoods);


router.get("/productOptions/get/:id" ,isAuth, pageSaleController.getOptions)
router.post("/productOptions/",isAuth,  pageSaleController.insertOptions);
router.patch("/productOptions/",isAuth, pageSaleController.updateOptions);
router.delete("/productOptions/:id",isAuth, pageSaleController.deleteOptions);

router.get("/pageSale/get/:id" , pageSaleController.getPageSell)


export default router;
