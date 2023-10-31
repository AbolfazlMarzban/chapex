// authentications routes
import express, { Router } from 'express'

// controllers 
import UserController from '../controller/UserController'
import orderController from '../controller/shop/orderController'

// middlewares
import isAuthenticated from './../middleware/is-auth'
import isUser from './../middleware/is-user'

// validation
import UpdateProfileValidation from './../validation/user/updateProfile'
import UserManageValidation from "./../validation/user/insert-update";

const router: Router = express.Router()

// user profile
router.get('/', isAuthenticated, UserController.getUserData)

router.patch('/update-profile', isAuthenticated, UpdateProfileValidation.rules, UserController.updateProfile)

// manage
// get initial insert data, table, update, show data
router.get('/get/:id', isAuthenticated, isUser, UserController.get)
router.post('/', isAuthenticated, isUser, UserManageValidation.rules, UserController.insert)
router.patch('/', isAuthenticated, isUser, UserManageValidation.rules, UserController.update)
router.delete('/:id', isAuthenticated, isUser, UserController.delete)

router.get('/orders/get/', isAuthenticated, orderController.getUserOrders)
router.get('/orders/get/:id', isAuthenticated, orderController.getUserOrder)

export default router