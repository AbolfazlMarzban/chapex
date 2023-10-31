import {
    body
} from 'express-validator'

class reserPasswordValidation {
    constructor() {
        return [
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
            body('changePassword').custom((value, {
                req
            }) => {
                if (value) {
                    if (!req.body.oldPassword) {
                        return false
                    }
                    return true
                }
                return true
            }).withMessage('رمز عبور فعلی خود را وارد کنید'),
        ]
    }
}

export default new reserPasswordValidation()