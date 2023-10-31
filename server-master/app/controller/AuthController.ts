import jwt from 'jsonwebtoken'

import Controller from './Controller'
// model 
import UserModel from '../model/userModel'
import addressModel from '../model/address/addressModel'
// helper
import DateHelper from '../helper/date'
import Sms from '../helper/sms'
import { log } from 'console'

class AuthController extends Controller {

  // checking user existence 
  async getUserNumber(req, res, next) {
    try {

      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }


      let requestData = req.body.data
      let userNumber = requestData.userNumber

      const user = await UserModel.findByUsername(userNumber)



      if (user) {
        res.json({
          user: {
            TU_FID: user.TU_FID,
            TU_FUserName: user.TU_FUserName,
          },
          registered: true
        })
        return
      }

      // insert user data with phone number
      const userSchema = await UserModel.getTableSchema('TUser')
      const code = Controller.createCode(5)

      // create token
      const secretKey = global.config.JSON_WEB_TOKEN_SECRET_KEY

      const activeCodeToken = jwt.sign({
        code,
        username: userNumber
      },
        secretKey, {
        expiresIn: "60m"
      }
      )
      // console.log(activeCodeToken);
      // console.log(code)

      this.setDefaultData(userSchema, userNumber, code, 2, activeCodeToken)

      const result = await UserModel.create(userSchema, 0)
      if (result.output.RetID) {
        const userId = result.output.ReturnFID
        // const user = await UserModel.findByIdDeleted(userId)

        const smsOption: any = {
          to: userNumber,
          message: code
        }
        // send sms 
        const sms = new Sms(smsOption)
        let smsResult = await sms.send()

        res.json({
          user: {
            activeCodeToken: activeCodeToken,
            username: userNumber,
            id: userId
          },
          registered: false
        })

      } else {
        this.responseErrorHandler(result, res)
      }



    } catch (error) {
      next(error)
    }
  }


  async checkUserPassword(req, res, next) {
    try {
      // console.log("aaaa");

      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }

      let requestData = req.body.data
      let id = requestData.user.id
      let password = requestData.user.password

      // checking for correct user password
      const user = await UserModel.findById(id)


      const isCorrect = this.compareHashedString(password, user.TU_FPassWord)


      // create login Token
      let token = null
      let decodedToken = null
      const expiresInDay = 12

      if (!isCorrect) {
        this.userNotFoundError(res)
        return
      }

      token = this.createToken({
        TU_FUserName: user.TU_FUserName,
        TU_FID: user.TU_FID
      }, expiresInDay + 'd')

      decodedToken = this.decodeToken(token)

      // update lastLogin Date
      await UserModel.setLoginLastDate(id)

      res.json({
        user: await UserModel.setDefaultDataForLoggedInUserInClient(user, token, decodedToken, expiresInDay),
        error: false
      })

    } catch (error) {
      next(error)
    }
  }

  async checkActiveCode(req, res, next) {
    try {

      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }

      let requestData = req.body.data
      let userId = requestData.user.userId
      let enteredCode = requestData.user.enteredCode
      let activeCodeToken = requestData.user.activeCodeToken

      let user = await UserModel.findByIdDeleted(userId)

      const secretKey = global.config.JSON_WEB_TOKEN_SECRET_KEY

      let activeCodeTokenDecoded
      try {
        activeCodeTokenDecoded = jwt.verify(activeCodeToken, secretKey)
      } catch (error) {
        this.sendBackError(res, 'کد شما منقضی شده است,دوباره درخواست کد بدهید', 422)
        return
      }

      if (enteredCode == activeCodeTokenDecoded.code && user.TU_FUserName == activeCodeTokenDecoded.username) {

        res.json({
          user: {
            id: userId,
          },
          active: true
        })

      } else {
        this.sendBackError(res, 'کاربری با این مشخصات یافت نشد', 422)
        return
      }
    } catch (error) {
      next(error)
    }
  }

  async setPasswordRegisteration(req, res, next) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }


      let requestData = req.body.data
      let id = requestData.user.id
      let password = requestData.user.password


      const user = await UserModel.findByIdDeleted(id)

      const hashedPassword = this.createHashString(password)


      // create token for auto login client
      let expiresInDay = 12
      let token = this.createToken({
        TU_FUserName: user.TU_FUserName,
        TU_FID: user.TU_FID
      }, expiresInDay + 'd')
      let decodedToken = this.decodeToken(token)


      // change password and active user and TU_FDelete = 0
      user.TU_FPassWord = hashedPassword
      user.TU_FDelete = 0
      user.TU_FActive = 1
      user.TU_FOnline = 1

      user.TU_FLoginToken = token
      // update lastLogin Date
      user.TU_FLoginLastDate = new DateHelper().currentDate
      user.TU_FLoginLastTime = new DateHelper().currentTime

      const result = await UserModel.update(user, "Employee")

      let neededDataForUserLogin = await UserModel.setDefaultDataForLoggedInUserInClient(user, token, decodedToken, expiresInDay)

      this.responseHandler(result, res, neededDataForUserLogin)

    } catch (error) {
      next(error)
    }
  }

  async forgetPasswordRequest(req, res, next) {
    try {
      let requestData = req.body.data
      let id = requestData.user.id

      const user = await UserModel.findById(id)

      // create code
      const code = Controller.createCode(5)

      const resetToken = this.createToken({
        userId: id,
        code: code,
        username: user.TU_FUserName
      }, '10m')
      // send sms

      const smsOption: any = {
        to: user.TU_FUserName,
        message: code
      }
      // send sms 
      const sms = new Sms(smsOption)
      let smsResult = await sms.send()

      const result = await UserModel.setActiveCode(code, id)

      // update db for code
      this.responseHandler(result, res, {
        resetToken
      })

    } catch (error) {
      next(error)
    }
  }


  async checkForgetPasswordToken(req, res, next) {
    try {

      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }


      let requestData = req.body.data
      let id = requestData.user.id
      let resetToken = requestData.user.resetToken
      let enteredCode = requestData.user.enteredCode



      const secretKey = global.config.JSON_WEB_TOKEN_SECRET_KEY

      let resetTokenDecoded
      try {
        resetTokenDecoded = jwt.verify(resetToken, secretKey)
      } catch (error) {
        this.sendBackError(res, 'کد شما منقضی شده است,دوباره درخواست کد بدهید', 422)
        return
      }

      let user = await UserModel.findById(id)

      if (enteredCode == resetTokenDecoded.code && user.TU_FUserName == resetTokenDecoded.username) {

        res.json({
          user: {
            id: id,
          },
          valid: true
        })

      } else {
        this.sendBackError(res, 'کاربری با این مشخصات یافت نشد', 422)
        return
      }


    } catch (error) {
      next(error)
    }
  }

  async changePassword(req, res, next) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }


      let requestData = req.body.data
      let id = requestData.user.id
      let password = requestData.user.password
      let confirmPassword = requestData.user.confirmPassword

      const hashedPassword = this.createHashString(password)
      const result = await UserModel.changePassword(id, hashedPassword)



      if (result.output.RetID) {
        const user = await UserModel.findById(id)
        // create login Token
        let token = null
        let decodedToken = null
        const expiresInDay = 12
        token = this.createToken({
          TU_FUserName: user.TU_FUserName,
          TU_FID: user.TU_FID
        }, expiresInDay + 'd')

        decodedToken = this.decodeToken(token)

        // update lastLogin Date
        await UserModel.setLoginLastDate(id)

        this.responseHandler(result, res, {
          user: await UserModel.setDefaultDataForLoggedInUserInClient(user, token, decodedToken, expiresInDay),
          error: false
        })

        // db error handler
      } else {
        this.responseHandler(result, res, {
          error: true
        })
      }

    } catch (error) {
      next(error)
    }
  }

  async resetTokenCode(req, res, next) {
    try {

      let requestData = req.body.data
      let id = requestData.user.id

      let state = requestData.state

      const needSearchInDeleted = state == "ActivePhoneNumber" ? true : false

      let user
      if (needSearchInDeleted) {
        user = await UserModel.findByIdDeleted(id)
      } else {
        user = await UserModel.findById(id)
      }

      if (!user) {
        this.userNotFoundError(res)
        return
      }


      // create code
      const code = Controller.createCode(5)

      const tokenCode = this.createToken({
        userId: id,
        code: code,
        username: user.TU_FUserName
      }, '10m')

      const smsOption: any = {
        to: user.TU_FUserName,
        message: code
      }
      // send sms 
      const sms = new Sms(smsOption)
      let smsResult = await sms.send()

      const result = await UserModel.setActiveCode(code, id)

      this.responseHandler(result, res, {
        tokenCode
      })


    } catch (error) {
      next(error)
    }
  }

  setDefaultData(userSchema, phoneNumber, code, deleted = 0, activeCodeToken) {
    userSchema.TU_FUserName = phoneNumber
    userSchema.TU_FMobile1 = phoneNumber
    userSchema.TU_FDateReg = new DateHelper().currentDate
    userSchema.TU_FTimeReg = new DateHelper().currentTime
    userSchema.TU_FManager = code
    userSchema.TU_FDelete = deleted
    userSchema.TU_FLoginToken = activeCodeToken
  }


  // for vuex in client
  // async setDefaultDataForLoggedInUserInClient(userData, token, decodedToken, expiresInDay) {
  //   const addressCount = await addressModel.getCount(userData.TU_FID)
  //   let user = {
  //     TU_FUserName: userData.TU_FUserName,
  //     TU_FActive: userData.TU_FActive,
  //     TU_FMobile1: userData.TU_FMobile1,
  //     TU_FAddressCount: addressCount,
  //     TU_FName: userData.TU_FName,
  //     TU_FFamil: userData.TU_FFamil,
  //     TU_FNameFamil: userData.TU_FNameFamil,
  //     TU_FID_Sex: userData.TU_FID_Sex,
  //     TU_FDateBirth: userData.TU_FDateBirth,
  //     TU_FCodeMeli: userData.TU_FCodeMeli,
  //     TU_FEmail: userData.TU_FEmail,
  //     TU_FPicAdd1: userData.TU_FPicAdd1,
  //     TU_FID_Group: userData.TU_FID_Group,
  //     TU_FID: userData.TU_FID,
  //     TU_FIsUser: userData.TU_FIsUser,
  //     TU_FID_Access: userData.TU_FID_Access,
  //     // other datas
  //     token,
  //     expiresIn: decodedToken.exp,
  //     expiresInDay
  //   }

  //   return user
  // }


}

export default new AuthController()