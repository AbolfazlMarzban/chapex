import express, { Router } from "express";

import DefaultController from "../controller/defaultsController";

import isAuth from './../middleware/is-auth'

import defaultsValidation from "../validation/defaults/insert-update";

const router: Router = express.Router();

router.get("/get/:id", isAuth, DefaultController.get);
router.get("/getmenu/", DefaultController.getMenu)
router.get("/getsteps/", DefaultController.getSteps)
router.post("/", isAuth, defaultsValidation.rules, DefaultController.insert);
router.delete("/:id", isAuth, DefaultController.delete);
router.patch("/", isAuth, defaultsValidation.rules, DefaultController.update);
router.post('/salePageCategory/', isAuth, defaultsValidation.rules, DefaultController.salePageCategory)
router.get('/getSalePageCategory/:id', isAuth, DefaultController.getSalePageCategory)
router.get('/getCategoryFLink/:id', DefaultController.categoryFLink)
export default router;
