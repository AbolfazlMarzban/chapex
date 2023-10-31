import {
  body
} from 'express-validator'

class AuthValidation {
  rules: any

  constructor() {
    this.rules = {
      getUserNumber: [
        body('data.userNumber').trim().notEmpty().withMessage(' شماره موبایل اجباریست'),
        body('data.userNumber').trim().isNumeric().withMessage(' شماره موبایل معتبر نمی باشد'),
        body('data.userNumber').trim().isLength({
          min: 11
        }).withMessage(' شماره موبایل معتبر نمی باشد'),
      ],
      checkPassword: [
        // body('data.user.password').trim().notEmpty().withMessage(' رمز عبور  اجباریست'),
        body('data.user.password').trim().isLength({
          min: 6
        }).withMessage('رمز حساب کاربری شما باید حداقل 6 کاراکتر باشد.'),
      ],
      checkActiveCode: [
        body('data.user.enteredCode').trim().notEmpty().withMessage(' کد تایید اجباریست'),
      ],
      passwordRegister: [
        body('data.user.password').trim().isLength({
          min: 6
        }).withMessage('رمز حساب کاربری شما باید حداقل 6 کاراکتر باشد.'),
        body('data.user.confirmPassword').custom((value, {
          req
        }) => {
          if (value.trim() !== req.body.data.user.password.trim()) {
            return false
          }
          return true
        }).withMessage('رمز عبور مطابقت ندارد')
      ]
    }
  }
}

export default new AuthValidation()