import {
    body
} from 'express-validator'

class AuthValidation {
    rules: any

    constructor() {
        this.rules = [

            body('data.TUA_FID_City1').trim().custom((value, { req }) => {
                if (value > 0)
                    return true
                return false
            }).withMessage(' استان را انتخاب نمایید'),

            body('data.TUA_FID_City2').trim().custom((value, { req }) => {
                if (value > 0)
                    return true
                return false
            }).withMessage(' شهر را انتخاب نمایید'),

            body('data.TUA_FAddress').trim().notEmpty().withMessage(' آدرس را وارد نمایید'),
            body('data.TUA_FPlates').trim().notEmpty().withMessage(' پلاک را وارد نمایید'),
            body('data.TUA_FPost').trim().notEmpty().withMessage(' کد پستی را وارد نمایید'),

            body('data.TUA_FPost').trim().custom((value, { req }) => {
                if (this.isValidPostCode(value)) {
                    return true
                }

                if (value.length == 0)
                    return true

                return false
            }).withMessage('کد پستی معتبر نمیباشد'),
        ]
    }

    isValidPostCode = code => {
        if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;

        return true
    };
}

export default new AuthValidation()