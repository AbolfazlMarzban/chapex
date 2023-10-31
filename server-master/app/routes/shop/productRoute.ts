import express, { Router } from "express";

import ProductController from "../../controller/shop/productController";

import ProductValidation from "../../validation/product/productValidation";

import isAuth from "../../middleware/is-auth";

const router: Router = express.Router();

router.get("/goods/get/:id", isAuth , ProductController.getGoods);

router.get("/TGO_FCode2TGO_FID/:TGO_FCode", isAuth , ProductController.TGO_FCode2TGO_FID)

router.post(  "/goods",
  isAuth,
  ProductValidation.goodsInsert,
  ProductController.insertGoods
);

router.patch(
  "/goods",
  isAuth,
  ProductValidation.goodsInsert,  
  ProductController.updateGoods
);

router.delete("/goods/:id", isAuth, ProductController.deleteGoods);

router.get("/get/:id", isAuth, ProductController.getProduct);

router.post("/", isAuth, ProductController.insertProduct);

router.patch("/", isAuth, ProductController.updateProduct);

router.delete("/:id", isAuth, ProductController.deleteProduct);

export default router;
