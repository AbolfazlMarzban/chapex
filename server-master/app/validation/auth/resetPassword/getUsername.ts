import {
    body
} from 'express-validator'

class reserPasswordValidation {
    constructor() {
        return [
            body('TU_FUserName').trim().notEmpty().withMessage('لطفا نام کاربری را وارد کنید'),
        ]
    }
}

export default new reserPasswordValidation()