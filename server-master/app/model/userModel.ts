import Model from './Model'
import Controller from '../controller/Controller'
import addressModel from './address/addressModel'

// Date helper
import Date from './../helper/date'

class UserModel extends Model {
    constructor() {
        super()
    }

    async create(userData, creatorUser = null) {
        try {
            let RetID
            let RetMsg
            let ReturnFID
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'Insert')
                .input('TU_FUserName', this.sql.NVarChar, userData.TU_FUserName)
                .input('TU_FPassWord', this.sql.NVarChar, userData.TU_FPassWord)
                .input('TU_FYear', this.sql.Int, global.config.YEAR_ACCOUNTING)
                .input('TU_FCodeMeli', this.sql.NVarChar, userData.TU_FCodeMeli)
                .input('TU_FCode', this.sql.NVarChar, userData.TU_FCode)
                .input('TU_FName', this.sql.NVarChar, userData.TU_FName)
                .input('TU_FFamil', this.sql.NVarChar, userData.TU_FFamil)
                .input('TU_FID_Caption', this.sql.Int, userData.TU_FID_Caption)
                .input('TU_FID_Group', this.sql.Int, userData.TU_FID_Group)
                .input('TU_FDateBirth', this.sql.NVarChar, userData.TU_FDateBirth)
                .input('TU_FDateReg', this.sql.NVarChar, userData.TU_FDateReg)
                .input('TU_FTimeReg', this.sql.NVarChar, userData.TU_FTimeReg)
                .input('TU_FDateExit', this.sql.NVarChar, userData.TU_FDateExit)
                .input('TU_FDelete', this.sql.TinyInt, userData.TU_FDelete)
                .input('TU_FActive', this.sql.Int, userData.TU_FActive)
                .input('TU_FIsUser', this.sql.TinyInt, userData.TU_FIsUser)
                .input('TU_FPicAdd1', this.sql.NVarChar, userData.TU_FPicAdd1)
                .input('TU_FPicAdd2', this.sql.NVarChar, userData.TU_FPicAdd2)
                .input('TU_FUserReg', this.sql.BigInt, creatorUser)
                .input('TU_FUserBman', this.sql.BigInt, userData.TU_FUserBman)
                .input('TU_FArchive', this.sql.TinyInt, userData.TU_FArchive)
                .input('TU_FType', this.sql.TinyInt, userData.TU_FType)
                .input('TU_FID_Sex', this.sql.Int, userData.TU_FID_Sex)
                .input('TU_FID_City1', this.sql.Int, userData.TU_FID_City1)
                .input('TU_FID_City2', this.sql.Int, userData.TU_FID_City2)
                .input('TU_FID_Relation', this.sql.Int, userData.TU_FID_Relation)
                .input('TU_FID_Bussines', this.sql.Int, userData.TU_FID_Bussines)
                .input('TU_FManager', this.sql.NVarChar, userData.TU_FManager)
                .input('TU_FWork', this.sql.NVarChar, userData.TU_FWork)
                .input('TU_FComment', this.sql.NVarChar, userData.TU_FComment)
                .input('TU_FEmail', this.sql.NVarChar, userData.TU_FEmail)
                .input('TU_FWebsite', this.sql.NVarChar, userData.TU_FWebsite)
                .input('TU_FPost', this.sql.NVarChar, userData.TU_FPost)
                .input('TU_FID_Access', this.sql.Int, userData.TU_FID_Access)
                .input('TU_FAccess', this.sql.NVarChar, userData.TU_FAccess)
                .input('TU_FMobile1', this.sql.NVarChar, userData.TU_FMobile1)
                .input('TU_FTell1', this.sql.NVarChar, userData.TU_FTell1)
                .input('TU_FTell2', this.sql.NVarChar, userData.TU_FTell2)
                .input('TU_FMobile2', this.sql.NVarChar, userData.TU_FMobile2)
                .input('TU_FAdd2', this.sql.NVarChar, userData.TU_FAdd2)
                .input('TU_FAdd1', this.sql.NVarChar, userData.TU_FAdd1)
                .input('TU_FAccount', this.sql.NVarChar, userData.TU_FAccount)
                .input('TU_FAccountCard', this.sql.NVarChar, userData.TU_FAccountCard)
                .input('TU_FID_Semat', this.sql.Int, userData.TU_FID_Semat)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .output('ReturnFID', this.sql.BigInt, ReturnFID)
                .execute('USP_TUser_Ins')
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getTU_FCode() {
        try {
            const result = await this.Database.request()
                .query("select  DBO.UFN_Coding('TUser_Fcode',0) as TU_FCode")
            return result.recordset[0].TU_FCode
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findByUsername(username) {
        try {
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserLogin')
                .input('Year', this.sql.Int, global.config.YEAR_ACCOUNTING)
                .input('FUserName', this.sql.NVarChar, username)
                .execute('USP_TUser_Select')

            return result.recordset[0]
        } catch (error) {
            return null
        }
    }

    async findById(id: number) {
        try {
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserFID')
                .input('FID', this.sql.BigInt, id)
                .execute('USP_TUser_Select')

            return result.recordset[0]

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getUserDataById(id: number) {
        try {
            let neededDefaults = [125, 126]
            let defaults = {}

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserFID')
                .input('FID', this.sql.BigInt, id)
                .execute('USP_TUser_Select')

            for (let id of neededDefaults) {
                let defaultData = await this.getDefault(id)
                defaults[id] = defaultData
            }

            let data = {
                user: result.recordset[0],
                defaults,
            }

            return data

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getDefault(TD_FID_Group) {
        try {
            var sqlQuery = `
        SELECT TD_FID,TD_FName,TD_FComment,TD_FSubGroup
              FROM V_TDefault
              WHERE (TD_FID_Group = ${TD_FID_Group} and TD_FActive = 1)
              ORDER BY TD_FOrder ,TD_FID 
        `

            const db_result = await this.Database.request().query(sqlQuery);

            if (db_result.recordsets[0].length > 0) {
                const withSub = db_result.recordsets[0].filter(c => c.TD_FSubGroup == 1)
                for (var i = 0; i <= withSub.length - 1; i++) {
                    withSub[i].children = await this.getDefault(withSub[i].TD_FID)
                }

                return db_result.recordsets[0]
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async findByIdDeleted(id) {
        try {
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserFID_Deleted')
                .input('FID', this.sql.BigInt, id)
                .execute('USP_TUser_Select')
            return result.recordset[0]

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findByIdForCustomer(id: number) {
        try {
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserFIDForCustomer')
                .input('FID', this.sql.BigInt, id)
                .execute('USP_TUser_Select')
            return result.recordset[0]
        } catch (error) {
            return null
        }
    }

    async getListByType(type) {
        try {
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserListFType')
                .input('FID', this.sql.BigInt, type)
                .execute('USP_TUser_Select')
            return result.recordset
        } catch (error) {
            return null
        }
    }

    async setToken(userId, token) {
        try {
            let RetID
            let RetMsg
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'SetToken')
                .input('FID', this.sql.BigInt, userId)
                .input('Value', this.sql.NVarChar, token)
                .input('Year', this.sql.Int, global.config.YEAR_ACCOUNTING)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TUser_Auth')

            return result
        } catch (error) {
            return null
        }
    }

    async changePassword(id, password) {
        try {

            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'ResetPassword')
                .input('FID', this.sql.BigInt, id)
                .input('Value', this.sql.NVarChar, password)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TUser_Auth')
            return result
        } catch (error) {
            return null
        }
    }

    async setActiveCode(code, userId) {
        try {

            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'SetActiveCode')
                .input('FID', this.sql.BigInt, userId)
                .input('Value', this.sql.NVarChar, code)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TUser_Auth')
            return result
        } catch (error) {
            return null
        }
    }

    async setActiveUser(userId) {
        try {

            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'SetActiveUser')
                .input('FID', this.sql.BigInt, userId)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TUser_Auth')
            return result
        } catch (error) {
            return null
        }
    }

    async getUserOnlyList() {
        try {

            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserOnlyList')
                .execute('USP_TUser_Select')
            return result.recordset

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getUserOnlyListForCombo() {
        try {

            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserOnlyForCombo')
                .execute('USP_TUser_Select')
            return result.recordset

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async update(user, status) {
        try {
            let RetID
            let RetMsg
            let ReturnFID
            if (status === 'Customer') {
                const result = await this.Database.request()
                    .input('State', this.sql.NVarChar, 'UpdateForCustomer')
                    .input('TU_FID', this.sql.BigInt, user.TU_FID)
                    .input('TU_FName', this.sql.NVarChar, user.TU_FName)
                    .input('TU_FFamil', this.sql.NVarChar, user.TU_FFamil)
                    .input('TU_FEmail', this.sql.NVarChar, user.TU_FEmail)
                    .input('TU_FID_Sex', this.sql.Int, user.TU_FID_Sex)
                    .input('TU_FDateBirth', this.sql.NVarChar, user.TU_FDateBirth)
                    .input('TU_FCodeMeli', this.sql.NVarChar, user.TU_FCodeMeli)
                    .input('TU_FCode', this.sql.NVarChar, user.TU_FCode)
                    .input('TU_FID_Caption', this.sql.Int, user.TU_FID_Caption)
                    .input('TU_FPicAdd1', this.sql.NVarChar, user.TU_FPicAdd1)
                    .input('TU_FPicAdd2', this.sql.NVarChar, user.TU_FPicAdd2)
                    .input('TU_FID_City1', this.sql.Int, user.TU_FID_City1)
                    .input('TU_FID_City2', this.sql.Int, user.TU_FID_City2)
                    .input('TU_FID_Relation', this.sql.Int, user.TU_FID_Relation)
                    .input('TU_FID_Bussines', this.sql.Int, user.TU_FID_Bussines)
                    .input('TU_FWork', this.sql.NVarChar, user.TU_FWork)
                    .input('TU_FComment', this.sql.NVarChar, user.TU_FComment)
                    .input('TU_FWebsite', this.sql.NVarChar, user.TU_FWebsite)

                    .input('TU_FInstagram', this.sql.NVarChar, user.TU_FInstagram)
                    .input('TU_FTelegram', this.sql.NVarChar, user.TU_FTelegram)

                    .input('TU_FPost', this.sql.NVarChar, user.TU_FPost)
                    .input('TU_FMobile1', this.sql.NVarChar, user.TU_FMobile1)
                    .input('TU_FTell1', this.sql.NVarChar, user.TU_FTell1)
                    .input('TU_FTell2', this.sql.NVarChar, user.TU_FTell2)
                    .input('TU_FMobile2', this.sql.NVarChar, user.TU_FMobile2)
                    .input('TU_FAdd2', this.sql.NVarChar, user.TU_FAdd2)
                    .input('TU_FAdd1', this.sql.NVarChar, user.TU_FAdd1)
                    .input('TU_FAccount', this.sql.NVarChar, user.TU_FAccount)
                    .input('TU_FAccountCard', this.sql.NVarChar, user.TU_FAccountCard)
                    .input('TU_FID_Semat', this.sql.Int, user.TU_FID_Semat)

                    .output('RetID', this.sql.BigInt, RetID)
                    .output('RetMsg', this.sql.NVarChar, RetMsg)
                    .output('ReturnFID', this.sql.BigInt, ReturnFID)
                    .execute('USP_TUser_Ins')
                return (result)
            }

            if (status === 'Employee') {
                const result = await this.Database.request()
                    .input('State', this.sql.NVarChar, 'Update')
                    .input('TU_FID', this.sql.BigInt, user.TU_FID)
                    .input('TU_FUserName', this.sql.NVarChar, user.TU_FUserName)
                    .input('TU_FYear', this.sql.Int, global.config.YEAR_ACCOUNTING)
                    .input('TU_FCodeMeli', this.sql.NVarChar, user.TU_FCodeMeli)
                    .input('TU_FCode', this.sql.NVarChar, user.TU_FCode)
                    .input('TU_FName', this.sql.NVarChar, user.TU_FName)
                    .input('TU_FFamil', this.sql.NVarChar, user.TU_FFamil)
                    .input('TU_FID_Caption', this.sql.Int, user.TU_FID_Caption)
                    .input('TU_FID_Group', this.sql.Int, user.TU_FID_Group)
                    .input('TU_FDateBirth', this.sql.NVarChar, user.TU_FDateBirth)
                    .input('TU_FDateReg', this.sql.NVarChar, user.TU_FDateReg)
                    .input('TU_FTimeReg', this.sql.NVarChar, user.TU_FTimeReg)

                    .input('TU_FDateExit', this.sql.NVarChar, user.TU_FDateExit)
                    .input('TU_FActive', this.sql.Int, user.TU_FActive)
                    .input('TU_FIsUser', this.sql.TinyInt, user.TU_FIsUser)
                    .input('TU_FPicAdd1', this.sql.NVarChar, user.TU_FPicAdd1)
                    .input('TU_FPicAdd2', this.sql.NVarChar, user.TU_FPicAdd2)
                    .input('TU_FUserReg', this.sql.BigInt, user.TU_FUserReg)
                    .input('TU_FUserBman', this.sql.BigInt, user.TU_FUserBman)
                    .input('TU_FArchive', this.sql.TinyInt, user.TU_FArchive)
                    .input('TU_FType', this.sql.TinyInt, user.TU_FType)
                    .input('TU_FID_Sex', this.sql.Int, user.TU_FID_Sex)
                    .input('TU_FID_City1', this.sql.Int, user.TU_FID_City1)
                    .input('TU_FID_City2', this.sql.Int, user.TU_FID_City2)
                    .input('TU_FID_Relation', this.sql.Int, user.TU_FID_Relation)
                    .input('TU_FID_Bussines', this.sql.Int, user.TU_FID_Bussines)
                    .input('TU_FManager', this.sql.NVarChar, user.TU_FManager)
                    .input('TU_FWork', this.sql.NVarChar, user.TU_FWork)
                    .input('TU_FComment', this.sql.NVarChar, user.TU_FComment)
                    .input('TU_FEmail', this.sql.NVarChar, user.TU_FEmail)
                    .input('TU_FWebsite', this.sql.NVarChar, user.TU_FWebsite)
                    .input('TU_FPost', this.sql.NVarChar, user.TU_FPost)
                    .input('TU_FID_Access', this.sql.Int, user.TU_FID_Access)
                    .input('TU_FAccess', this.sql.NVarChar, user.TU_FAccess)
                    .input('TU_FMobile1', this.sql.NVarChar, user.TU_FMobile1)
                    .input('TU_FTell1', this.sql.NVarChar, user.TU_FTell1)
                    .input('TU_FTell2', this.sql.NVarChar, user.TU_FTell2)
                    .input('TU_FMobile2', this.sql.NVarChar, user.TU_FMobile2)
                    .input('TU_FAdd2', this.sql.NVarChar, user.TU_FAdd2)
                    .input('TU_FAdd1', this.sql.NVarChar, user.TU_FAdd1)
                    .input('TU_FAccount', this.sql.NVarChar, user.TU_FAccount)
                    .input('TU_FAccountCard', this.sql.NVarChar, user.TU_FAccountCard)

                    // new for ahvaz 13990821
                    .input('TU_FPassWord', this.sql.NVarChar, user.TU_FPassWord)
                    .input('TU_FDelete', this.sql.TinyInt, user.TU_FDelete)
                    .input('TU_FOnline', this.sql.TinyInt, user.TU_FOnline)
                    .input('TU_FLoginToken', this.sql.NVarChar, user.TU_FLoginToken)
                    .input('TU_FLoginLastDate', this.sql.NVarChar, user.TU_FLoginLastDate)
                    .input('TU_FLoginLastTime', this.sql.NVarChar, user.TU_FLoginLastTime)
                    .input('TU_FID_Semat', this.sql.Int, user.TU_FID_Semat)

                    .output('RetID', this.sql.BigInt, RetID)
                    .output('RetMsg', this.sql.NVarChar, RetMsg)
                    .output('ReturnFID', this.sql.BigInt, ReturnFID)
                    .execute('USP_TUser_Ins')
                return (result)

            }

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async setLoginLastDate(userId) {
        try {
            let RetID
            let RetMsg

            // const date = Date.Now().date + Date.Now().timeWithSecond
            const date = new Date().currentDate + new Date().timeWithSecond


            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'SetLogin')
                .input('FID', this.sql.BigInt, userId)
                .input('Value', this.sql.NVarChar, date)
                .execute('USP_TUser_Auth')
            return result.recordset

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getAllUserForTable() {
        try {
            let RetID
            let RetMsg

            // const date = Date.Now().date + Date.Now().timeWithSecond
            const date = new Date().currentDate + new Date().timeWithSecond

            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserList')
                .execute('USP_TUser_Select')
            return result.recordset

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async delete(id) {
        try {
            let RetID
            let RetMsg

            const result = await this.Database.request()
                .input('TableName', this.sql.NVarChar, 'TUser')
                .input('FID', this.sql.BigInt, id)
                .output('RetID', this.sql.BigInt, RetID)
                .output('RetMsg', this.sql.NVarChar, RetMsg)
                .execute('USP_TUser_Del')
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    }

    // get cart items for user by userID
    async cartItemsCustomer(userID) {
        try {
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TOrderDetailTempStoreFID')
                .input('FID', this.sql.BigInt, userID)
                .execute('USP_TOrder_Select')
            return result.recordset
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async comboDataList() {
        try {
            const result = await this.Database.request()
                .input('State', this.sql.NVarChar, 'TUserForCombo')
                .execute('USP_TUser_Select')
            return result.recordset
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getUserPercentById(userId) {
        const userData = await this.findById(userId)

        if (userData)
            return await this.getUserPercent(userData)
    }

    async getUserPercent(userData) {
        const addressCount = await addressModel.getCount(userData.TU_FID)

        let ret = 0
        if (userData.TU_FMobile1) {
            // console.log('TU_FMobile1',userData.TU_FMobile1);
            ret += 20
        }

        if (addressCount > 0) {
            // console.log('addressCount');
            ret += 25
        }

        if (userData.TU_FName) {
            // console.log('TU_FName');
            ret += 5
        }

        if (userData.TU_FFamil) {
            // console.log('TU_FFamil');
            ret += 5
        }

        if (userData.TU_FID_Sex) {
            // console.log('TU_FID_Sex');
            ret += 5
        }

        if (userData.TU_FID_Relation) {
            // console.log('TU_FID_Sex');
            ret += 5
        }

        if (userData.TU_FWork) {
            // console.log('TU_FID_Sex');
            ret += 5
        }

        if (userData.TU_FDateBirth) {
            // console.log('TU_FDateBirth',userData.TU_FDateBirth);
            ret += 10
        }

        if (userData.TU_FCodeMeli) {
            ret += 10
        }

        if (userData.TU_FEmail) {
            // console.log('TU_FEmail');
            ret += 10
        }

        return ret
    }

    // for vuex in client
    async setDefaultDataForLoggedInUserInClient(userData, token, decodedToken, expiresInDay) {

        let user = {
            TU_FUserName: userData.TU_FUserName,
            TU_FActive: userData.TU_FActive,
            TU_FNameFamil: userData.TU_FNameFamil,
            TU_FUserLevel: await this.getUserPercent(userData),
            TU_FCodeMeli: userData.TU_FCodeMeli,
            // TU_FMobile1: userData.TU_FMobile1,
            // TU_FAddressCount: addressCount,
            // TU_FName: userData.TU_FName,
            // TU_FFamil: userData.TU_FFamil,
            // TU_FID_Sex: userData.TU_FID_Sex,
            // TU_FDateBirth: userData.TU_FDateBirth,
            // TU_FEmail: userData.TU_FEmail,
            TU_FPicAdd1: userData.TU_FPicAdd1,
            TU_FID_Group: userData.TU_FID_Group,
            TU_FID: userData.TU_FID,
            TU_FIsUser: userData.TU_FIsUser,
            TU_FID_Access: userData.TU_FID_Access,
            // other datas
            token,
            expiresIn: decodedToken.exp,
            expiresInDay
        }

        return user
    }


}

export default new UserModel()