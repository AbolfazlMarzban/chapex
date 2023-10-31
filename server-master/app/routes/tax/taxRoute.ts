import express, { Router } from "express";
import isAuth from '../../middleware/is-auth';
import taxController from "../../controller/tax/taxController";
import taxInfo from "../../validation/user/taxInfo";

const router: Router = express.Router();

router.post("/", isAuth, taxInfo.rules, taxController.insert)
router.get("/get/:rowId", isAuth, taxController.get)
router.post("/update", isAuth, taxInfo.rules, taxController.update)
router.delete("/delete/:id", isAuth, taxController.delete)

export default router;