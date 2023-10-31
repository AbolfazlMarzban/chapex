import jwt from 'jsonwebtoken'
import User from './../model/userModel'

import ErrorController from './../controller/errorController'
const errorConteroller = new ErrorController()

export default async (req, res, next) => {
    // get token from client
    const authorizationHeader = req.get('Authorization')
    if (!authorizationHeader) {
        errorConteroller.notAuthenticatedError(res)
        return
    }
    // getting token value and decode it
    const token = authorizationHeader.split(' ')[1]
    
    let decodedToken

    try {
        const jsonWebTojenSecretKey = global.config.JSON_WEB_TOKEN_SECRET_KEY
        // verifing json web token and decode it
        decodedToken = jwt.verify(token, jsonWebTojenSecretKey)
    } catch (error) {
        errorConteroller.notAuthenticatedError(res)
        return
    }
    if (!decodedToken) {
        errorConteroller.notAuthenticatedError(res)
        return
    }

    req.TU_FID = decodedToken.TU_FID
    User.setLoginLastDate(req.TU_FID)
    next()
}