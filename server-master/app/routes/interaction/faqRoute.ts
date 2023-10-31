import express, { Router } from "express";


import FaqController from "../../controller/interaction/faqController";
const router: Router = express.Router();

router.get("/get/:id/:statusID", FaqController.get);
router.get("/getSchema", FaqController.getSchema);
router.post("/question", FaqController.insertQuestion);
router.post("/answer", FaqController.insertAnswer);
router.patch("/state", FaqController.changeState);

export default router;
