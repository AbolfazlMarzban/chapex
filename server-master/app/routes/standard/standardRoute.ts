import express, { Router } from "express";

import StandardController from "../../controller/standard/standardController";
import StandardValidation from "../../validation/standard/standardValidation";
import isAuth from "../../middleware/is-auth";

const router: Router = express.Router();

router.get("/get/:id", isAuth, StandardController.get);

router.post("/", isAuth, StandardValidation.insert, StandardController.insert);

router.patch("/", isAuth, StandardValidation.insert, StandardController.update);

router.delete("/:id", isAuth, StandardController.delete);

export default router;
