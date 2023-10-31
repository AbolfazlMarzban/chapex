import express, { Router } from "express";

import OptionsController from "../../controller/shop/optionsController"

import isAuth from '../../middleware/is-auth'


const router: Router = express.Router()

router.get("/get/:id",isAuth, OptionsController.get)

router.post("/",isAuth, OptionsController.insert)
router.patch("/",isAuth, OptionsController.update)
router.post("/dependency",isAuth, OptionsController.insertDependency)

router.delete("/:id",isAuth, OptionsController.delete)

export default router