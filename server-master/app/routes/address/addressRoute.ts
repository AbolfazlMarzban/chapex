import express, { Router } from "express";


import addressController from "../../controller/address/addressController";
import isAuth from '../../middleware/is-auth';

import userAddress from "../../validation/user/userAddress";

const router: Router = express.Router();

router.post("/:userId", isAuth, userAddress.rules, addressController.insert);
router.patch("/edit", isAuth, userAddress.rules, addressController.update);
router.get("/get/:userId", isAuth, addressController.get);
router.get("/get/edit/:addressRowId", isAuth, addressController.getToEdit);
router.post("/getinfo/post", isAuth, addressController.getInfo)
router.patch("/delete/:addressId", isAuth, addressController.delete);

export default router;
