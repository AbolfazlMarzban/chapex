// main controller

import autoBind from 'auto-bind'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import ErrorController from './errorController'
// helper functions
import fileHelper from './../helper/file'

class Controller extends ErrorController {

    File: any

    constructor() {
        super()
        autoBind(this)
        // File Functionality
        this.File = fileHelper
        //
    }


    // crate activation and reset password code
    static createCode(number) {
        return Math.floor(Math.random() * Math.pow(10, number))
    }

    makeSlug(string) {
        let slug = ""
        for (let letter of string) {
            if (letter == ' ') {
                letter = '-'
            }
            slug += letter
        }
        return slug
    }

    createHashString(string) {
        try {
            const salt = bcrypt.genSaltSync(10)
            let hashedString = bcrypt.hashSync(string, salt)
            return hashedString
        } catch (error) {
            console.log(error)
        }
    }

    compareHashedString(string, hashedString) {

        let result = bcrypt.compareSync(string, hashedString)
        return result
    }

    createToken(data, expiresIn = "60m") {
        const secretKey = global.config.JSON_WEB_TOKEN_SECRET_KEY
        const token = jwt.sign(data,
            secretKey, {
            expiresIn
        }
        )
        return token
    }

    decodeToken(token) {
        try {
            const secretKey = global.config.JSON_WEB_TOKEN_SECRET_KEY

            const decodedToken = jwt.verify(token, secretKey)

            return decodedToken

        } catch (error) {
            return null
        }
    }

}

export default Controller