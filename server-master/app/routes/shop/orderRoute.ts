import isAuth from '../../middleware/is-auth'
import express, { Router } from "express";
import orderController from '../../controller/shop/orderController'


const router: Router = express.Router()

router.get('/:state', isAuth, orderController.get)
router.get('/getOrder/:id', isAuth, orderController.getOrder)
router.post('/changeStatus/', isAuth, orderController.changeStatus)


export default router;