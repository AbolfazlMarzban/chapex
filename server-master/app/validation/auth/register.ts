import {
    body
} from 'express-validator'

class RegisterValidation {
    constructor() {
        return [
            // body('TU_FEmail').trim().isEmail().withMessage('ایمیل معتبر نمیباشد'),
            body('TU_FUserName').trim().notEmpty().withMessage('فیلد نام کاربری اجباریست'),
            body('TU_FUserName').trim().isLength({
                min: 4,
                max: 20
            }).withMessage('فیلد نام کاربری اجباریست'),
            body('TU_FUserName').trim().isAlphanumeric('en-US').withMessage('نام کاربری باید شامل حروف انگلیسی یا عدد باشد'),

            body('TU_FName').trim().notEmpty().withMessage('فیلد نام اجباریست'),
            body('TU_FFamil').trim().notEmpty().withMessage('فیلد نام خانوادگی اجباریست'),
            body('TU_FMobile1').trim().notEmpty().withMessage('فیلد شماره تلفن اجباریست'),
            body('TU_FMobile1').trim().isLength({
                min: 10,
                max: 11
            }).withMessage('فیلد شماره تلفن معتبر نیست'),
            body('TU_FMobile1').trim().isNumeric().withMessage(' شماره تلفن معتبر نمیباشد'),
            body('TU_FPassWord').trim().isLength({
                min: 8
            }).withMessage('طول پسورد باید حداقل 4 کاراکتر باشد'),
            body('confirmPassword').trim().custom((value, {
                req
            }) => {

                if (value.trim() !== req.body.TU_FPassWord.trim()) {
                    return false
                }
                return true
            }).withMessage('رمز عبور مطابقت ندارد'),
        ]
    }
}

export default new RegisterValidation()