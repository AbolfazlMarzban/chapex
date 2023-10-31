import express, { Router } from "express";




import likeController from "../../controller/interaction/likeController";
import isAuth from '../../middleware/is-auth';

const router: Router = express.Router();


router.post("/" , isAuth , likeController.insert);
router.post("/type" , isAuth , likeController.get);
router.get("/type" , isAuth , likeController.get);
router.post("/delete" , isAuth , likeController.delete);


export default router;
