import {
  body,

} from 'express-validator'

class DefaultsValidation {
  rules: any

  constructor() {
    this.rules = [
      body('data.TD_FCode').trim().notEmpty().withMessage('وارد کردن کد اجباریست'),
      body('data.TD_FName').trim().notEmpty().withMessage('نام اجباریست'),
    ]
  }
}

export default new DefaultsValidation()