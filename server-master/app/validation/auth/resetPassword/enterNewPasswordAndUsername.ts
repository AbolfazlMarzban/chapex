import {
    body
} from 'express-validator'

class reserPasswordValidation {
    constructor() {
        return [
            body('TU_FUserName').trim().notEmpty().withMessage('فیلد نام کاربری اجباریست'),
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

export default new reserPasswordValidation()