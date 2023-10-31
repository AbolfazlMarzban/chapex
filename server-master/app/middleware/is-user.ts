
import ErrorController from './../controller/errorController'
const errorConteroller = new ErrorController()
import attachUserToRequestHelper from './../helper/attach-user-to-request'

export default async (req, res, next) => {
    if (!req.user) {
        await attachUserToRequestHelper(req.TU_FID, req, next)
    }

    if (req.user.TU_FIsUser !== 1) {
        errorConteroller.isNotUserError(res)
        return
    }

    next()
}