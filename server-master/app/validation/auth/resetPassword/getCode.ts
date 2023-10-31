import {
    body
} from 'express-validator'

class resetPasswordValidation {
    constructor() {
        return [
            body('code').trim().notEmpty().withMessage('لطفا کد پیامک شده را وارد کنید'),
        ]
    }
}

export default new resetPasswordValidation()