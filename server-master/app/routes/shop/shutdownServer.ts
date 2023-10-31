import express, { response, Router } from "express";

import isAuth from "../../middleware/is-auth";

const router: Router = express.Router();

router.get("/"  , () => {
    console.log('Chapex server shutdown successfully')
    process.kill(process.pid)
});

export default router;