import express, { Router } from "express";

import isAuth from "../middleware/is-auth";
import fileUploader from "../controller/fileUploaderController";

const router: Router = express.Router();

router.get("/get/:id/:form", fileUploader.get);
router.post("/", fileUploader.insert);
router.delete("/:id", fileUploader.delete);

export default router;
