import express, { Router } from "express";

import productOptionsController from "../../controller/shop/productOptionsController";
import isAuth from "../../middleware/is-auth";

const router: Router = express.Router();

// router.get("/get/:id", isAuth, productOptionsController.get);
router.get("/get/:id", productOptionsController.get);
router.post("/", isAuth, productOptionsController.insert);
router.patch("/", isAuth, productOptionsController.update);
router.delete("/:id", isAuth, productOptionsController.delete);

export default router;
