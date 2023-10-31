import Database from './../model/Model'
import ErrorController from './../controller/errorController'

export default async (req, res, next) => {
    let db = new Database()
    const isConnected = await db.checkConnection()

    if (!isConnected) {
        const errorController = new ErrorController()
        errorController.databaseNotConnected(res)
        return
    }
    next()
}
