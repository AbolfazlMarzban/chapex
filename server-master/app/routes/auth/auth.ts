// authentications routes
import express, { Router } from 'express'

// controllers 
import AuthController from '../../controller/AuthController'
// middlewares

// validations
import AuthValidation from '../../validation/auth'

const router: Router = express.Router()

// routes
router.post('/auth/get-user-number', AuthValidation.rules.getUserNumber, AuthController.getUserNumber)

router.post('/auth/check-password', AuthValidation.rules.checkPassword, AuthController.checkUserPassword)

router.post('/auth/check-active-code', AuthValidation.rules.checkActiveCode, AuthController.checkActiveCode)

router.post('/auth/set-password-registeration', AuthValidation.rules.passwordRegister, AuthController.setPasswordRegisteration)

router.post('/auth/forget-password', AuthController.forgetPasswordRequest)

router.post('/auth/check-forget-password-code', AuthValidation.rules.checkActiveCode, AuthController.checkForgetPasswordToken)

router.post('/auth/change-password', AuthValidation.rules.passwordRegister, AuthController.changePassword)

router.post('/auth/reset-code-token', AuthController.resetTokenCode)

export default router