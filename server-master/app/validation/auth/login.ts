import {
    body
} from 'express-validator'

class LoginValidation {
    constructor() {
        return [
            body('TU_FUserName').trim().notEmpty().withMessage('فیلد نام کاربری اجباریست'),
            body('TU_FPassWord').trim().isLength({
                min: 8
            }).withMessage('طول پسورد باید حداقل 4 کاراکتر باشد'),
        ]
    }
}

export default new LoginValidation()