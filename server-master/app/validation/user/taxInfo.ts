import {
    body
} from 'express-validator'

class TaxValidation {
    rules: any

    constructor() {
        this.rules = [

            body('data.TUX_FType').trim().notEmpty().withMessage(' نوع شخصیت تجاری را انتخاب نمایید'),
            body('data.TUX_FName').trim().notEmpty().withMessage(' نام تجاری را وارد نمایید'),
            body('data.TUX_FShenas').trim().notEmpty().withMessage(' شماره شناسنامه / ثبت را وارد نمایید'),
            body('data.TUX_FMelli').trim().notEmpty().withMessage(' شماره / شناسه ملی را وارد نمایید'),
            body('data.TUX_FEcoCode').trim().notEmpty().withMessage(' کد اقتصادی را وارد نمایید'),
            body('data.TUX_FTel').trim().notEmpty().withMessage(' شماره تماس را وارد نمایید'),
            body('data.TUX_FAddress').trim().notEmpty().withMessage(' آدرس را وارد نمایید'),

            body('data.TUX_FEcoCode').trim().custom((value, { req }) => {
                if (this.isValidEcoCode(value)) {
                    return true
                }

                if (value.length == 0)
                    return true

                return false
            }).withMessage('کد اقتصادی معتبر نمی باشد'),
        ]
    }

    isValidEcoCode = code => {
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
}

export default new TaxValidation()