import express, { Router } from "express";

import AbolTableController from "../controller/AbolTableController";

import isAuth from "../middleware/is-auth";

const router: Router = express.Router();

router.get("/:id", isAuth, AbolTableController.get);
router.post("/", isAuth, AbolTableController.saveTable);
router.post("/column", isAuth, AbolTableController.addColumn);
router.patch("/column", isAuth, AbolTableController.saveColumn);
router.delete("/column/:id", isAuth, AbolTableController.deleteColumn);
router.delete(
  "/usersetting/:tableId",
  isAuth,
  AbolTableController.deleteUserSetting
);

export default router;
