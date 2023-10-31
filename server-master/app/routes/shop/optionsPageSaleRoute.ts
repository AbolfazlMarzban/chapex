import express, { Router } from "express";

import OptionsPageSaleController from "../../controller/shop/optionsPageSaleController";

import isAuth from '../../middleware/is-auth'

const router: Router = express.Router();

router.get("/get/:id",isAuth, OptionsPageSaleController.get);

router.post("/", isAuth, OptionsPageSaleController.insert);
router.patch("/", isAuth, OptionsPageSaleController.update);
router.post("/optionValue", isAuth, OptionsPageSaleController.insertOptionValue);

router.delete("/:id",isAuth, OptionsPageSaleController.delete);

export default router;
