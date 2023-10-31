import {
  body,

} from 'express-validator'

class UserManageValidation {
  rules: any

  constructor() {
    this.rules = [
      body('data.TU_FName').trim().notEmpty().withMessage(' نام را وارد نمایید'),
      body('data.TU_FFamil').trim().notEmpty().withMessage(' نام خانوادگی را وارد نمایید'),
      body('data.TU_FEmail').trim().notEmpty().withMessage(' ایمیل را وارد نمایید'),

      body('data.TU_FID_Sex').trim().custom((value, { req }) => {
        if (value > 0)
          return true
        return false
      }).withMessage(' جنسیت را انتخاب نمایید'),

      body('data.TU_FDateBirth').trim().notEmpty().withMessage(' تاریخ تولد را وارد نمایید'),
      body('data.TU_FCodeMeli').trim().notEmpty().withMessage(' کد ملی را وارد نمایید'),
      body('data.TU_FWork').trim().notEmpty().withMessage(' شرح فعالیت خود را وارد نمایید'),
      body('data.TU_FMobile1').trim().isNumeric().withMessage(' شماره موبایل معتبر نمی باشد'),

      body('data.TU_FMobile1').trim().isLength({
        min: 11
      }).withMessage(' شماره موبایل معتبر نمی باشد'),

      body('data.TU_FID_Relation').trim().custom((value, { req }) => {
        if (value > 0)
          return true
        return false
      }).withMessage(' روش آشنایی را انتخاب نمایید'),

      body('data.TU_FEmail').trim().custom((value, { req }) => {
        if (this.isValidEmail(value)) {
          return true
        }

        if (value.length == 0)
          return true

        return false
      }).withMessage('ایمیل وارد شده معتبر نمی باشد'),

      body('data.TU_FCodeMeli').trim().custom((value, { req }) => {
        if (this.isValidNationalCode(value)) {
          return true
        }

        if (value.length == 0)
          return true

        return false
      }).withMessage('کد ملی معتبر نمی باشد'),

    ]
  }

  isValidNationalCode = code => {
    if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;

    let sum = 0,
      chars = code.split(''),
      lastDigit,
      remainder;

    for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);

    remainder = sum % 11;
    lastDigit = remainder < 2 ? remainder : 11 - remainder;

    return +chars[9] === lastDigit;
  };

  isValidEmail = email => {
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validRegex.test(email)) return true;

    return false
  };
}

export default new UserManageValidation()