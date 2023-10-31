import express from "express";

import authRoutes from "./auth/auth";
import userRoutes from "./user";
import imageRoutes from "./image";
import defaultRoutes from "./defaults";

// Product
import abolTableRoutes from './abolTable'
import ProductRoutes from "./shop/productRoute";
import orderRoutes from "./shop/orderRoute"
import OptionsRoutes from "./shop/optionsRoute";
import OptionsPageSaleRoute from "./shop/optionsPageSaleRoute";
import PageSaleRoutes from "./shop/pageSaleRoute";
import StandardRoutes from "./standard/standardRoute";
import productOptionsRoutes from "./shop/productOptionsRoute";
import FormBuilderRoutes from "./formBuilder/formBuilderRoute";
import pageSaleUserRoutes from "./shop/salePageUserRoute";
import HomeRoutes from "./shop/homeRoute";
import commentsRoutes from "./interaction/commentsRoute";
import faqRoutes from "./interaction/faqRoute";
import cartRoutes from "./shop/cartRoute";
import paymentRoutes from "./shop/paymentRoute";
import likeRoutes from "./interaction/likeRoutes";
import fileUploaderRoutes from "./fileUploader";
import addressRoutes from "./address/addressRoute";
import reportRoutes from "./report/reportRoute";
import taxRoute from "./tax/taxRoute"
import galleryRoute from "./gallery/galleryRoute"



const router = express.Router();

import dbConnectionMiddleware from "./../middleware/is-database-connected";

// adding /auth/index.js routes
router.use(dbConnectionMiddleware, authRoutes);
router.use("/user", dbConnectionMiddleware, userRoutes);

router.use("/image", dbConnectionMiddleware, imageRoutes);

router.use("/aboltable", dbConnectionMiddleware, abolTableRoutes)
router.use("/defaults", dbConnectionMiddleware, defaultRoutes);
router.use("/products", dbConnectionMiddleware, ProductRoutes);
router.use("/options", dbConnectionMiddleware, OptionsRoutes);
router.use("/optionsPageSale", dbConnectionMiddleware, OptionsPageSaleRoute);

router.use("/pageSale", dbConnectionMiddleware, PageSaleRoutes);
router.use("/salePageUser", dbConnectionMiddleware, pageSaleUserRoutes);
router.use("/cart", dbConnectionMiddleware, cartRoutes);
router.use("/payment", dbConnectionMiddleware, paymentRoutes);

router.use("/productOptions", dbConnectionMiddleware, productOptionsRoutes);
router.use("/order", dbConnectionMiddleware, orderRoutes)
router.use("/goods", dbConnectionMiddleware);
router.use("/standard", dbConnectionMiddleware, StandardRoutes);
router.use("/formBuilder", dbConnectionMiddleware, FormBuilderRoutes);


router.use("/home", dbConnectionMiddleware, HomeRoutes);

router.use("/comment", dbConnectionMiddleware, commentsRoutes);
router.use("/faq", dbConnectionMiddleware, faqRoutes);


router.use("/like", dbConnectionMiddleware, likeRoutes);
router.use("/fileUploader", dbConnectionMiddleware, fileUploaderRoutes);
router.use("/address", dbConnectionMiddleware, addressRoutes);
router.use("/report", dbConnectionMiddleware, reportRoutes);
router.use("/tax", dbConnectionMiddleware, taxRoute)
router.use("/gallery", dbConnectionMiddleware, galleryRoute)

export default router;
