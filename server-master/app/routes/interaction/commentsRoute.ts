import express, { Router } from "express";


import CommentsController from "../../controller/interaction/commentsController";
const router: Router = express.Router();

router.get("/get/:id/:status", CommentsController.get);
router.get("/getSchema", CommentsController.getSchema);
router.post("/", CommentsController.insertComment);
router.patch("/state", CommentsController.changeState);



export default router;
