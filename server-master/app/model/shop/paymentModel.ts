import Model from "../Model";
import DefaultsModel from "../../model/defaultModel";
import axios, { AxiosRequestConfig } from "axios";
import qs from 'qs';
import Date from "../../helper/date";



class paymentModel extends Model {
    constructor() {
        super();
    }

    async getGateways(id) {
        try {
            var sqlQuery = `
                 SELECT TD_FID,TD_FName,TD_FComment,TD_FPicAdd1, TD_FValue1, TD_FValue2, TD_FValue3, TD_FValue4
                       FROM V_TDefault
                       WHERE (TD_FID_Group = ${id} and TD_FActive = 1)
                       ORDER BY TD_FOrder ,TD_FID `

            const db_result = await this.Database.request().query(sqlQuery);

            if (db_result.recordsets[0].length > 0) {
                return db_result.recordsets[0]
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getGateway(id) {
        try {
            var sqlQuery = `
                 SELECT TD_FID,TD_FName,TD_FComment,TD_FPicAdd1, TD_FValue1, TD_FValue2, TD_FValue3, TD_FValue4
                       FROM V_TDefault
                       WHERE TD_FID = ${id} `

            const db_result = await this.Database.request().query(sqlQuery);

            if (db_result.recordsets[0].length > 0) {
                return db_result.recordsets[0][0]
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getGatewayByType(type) {
        try {
            var sqlQuery = `
                 SELECT TD_FID,TD_FName,TD_FComment,TD_FPicAdd1, TD_FValue1, TD_FValue2, TD_FValue3, TD_FValue4
                       FROM V_TDefault
                       WHERE TD_FValue4 = '${type}' `

            const db_result = await this.Database.request().query(sqlQuery);

            // console.log('getGatewayByType db_result', db_result);

            if (db_result.recordsets[0].length > 0) {
                return db_result.recordsets[0]
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getPaymentUrl(data) {

        const gateway = await this.getGateway(data.TP_FID_Bank)

        if (gateway) {
            if (gateway.TD_FValue4 == 'zp') {
                const zp = new zarinpal(gateway.TD_FComment)
                return await zp.getPaymentUrl(data)
            }

            else if (gateway.TD_FValue4 == 'sep') {
                const samanKish = new sep(gateway.TD_FComment)
                return await samanKish.getPaymentUrl(data)
            }
        }
    }

    async verifyPayment(authority, RefNum: null) {

        // console.log('verifyPayment authority', authority);

        const payment = await this.getPayment(authority)

        if (payment) {

            const gateway = await this.getGateway(payment.TP_FID_Bank)

            if (gateway) {
                if (gateway.TD_FValue4 == 'zp') {
                    const zp = new zarinpal(gateway.TD_FComment)
                    const zpResult = await zp.verify(payment)

                    if (zpResult.firstPass) {
                        await this.save_RefId(payment.TP_FID, zpResult.refId)
                        const result = await this.update_asPaid(payment.TP_FID, payment.TP_FID_Customer)
                        zpResult.orderId = result.output.ReturnFID
                    }

                    return zpResult
                }

                else if (gateway.TD_FValue4 == 'sep') {
                    const samanKish = new sep(gateway.TD_FComment)
                    const zpResult = await samanKish.verify(payment, RefNum)

                    if (zpResult.firstPass) {
                        await this.save_RefId(payment.TP_FID, RefNum)
                        const result = await this.update_asPaid(payment.TP_FID, payment.TP_FID_Customer)
                        zpResult.orderId = result.output.ReturnFID
                    }

                    return zpResult
                }
            }
        }
    }

    async getPayment(authority) {
        var sqlQuery = ` select [TP_FID],[TP_FID_Customer],[TP_FID_Type],[TP_FID_Payment],[TP_FID_Bank],[TP_FPrice],[TP_PID] from V_TPayment where TP_PID='${authority}' `

        const db_result = await this.Database.request().query(sqlQuery);

        if (db_result.recordsets[0].length > 0) {
            return db_result.recordsets[0][0]
        }
    }

    async insertPayment(state, data) {
        let RetID;
        let RetMsg;
        let ReturnFID;
        const result = await this.Database.request()
            .input("state", this.sql.NVarChar, state)
            .input("TP_FID_Type", this.sql.Int, data.TP_FID_Type)
            .input("TP_FID_Payment", this.sql.Int, data.TP_FID_Payment)
            .input("TP_FID_Bank", this.sql.Int, data.TP_FID_Bank)
            .input("TP_FCode", this.sql.NVarChar, data.TP_FCode)
            .input("TP_FDate", this.sql.NVarChar, data.TP_FDate)
            .input("TP_FPrice", this.sql.Money, data.TP_FPrice)
            .input("TP_FID_Customer", this.sql.BigInt, data.TP_FID_Customer)
            .input("TP_ClientFName", this.sql.NVarChar, data.TP_ClientFName)
            .input("TP_ClientLName", this.sql.NVarChar, data.TP_ClientLName)
            .input("TP_ClientEmail", this.sql.NVarChar, data.TP_ClientEmail)
            .input("TP_ClientPhone", this.sql.NVarChar, data.TP_ClientPhone)
            .input("TP_FID_UnderAccount", this.sql.BigInt, data.TP_FID_UnderAccount)
            .input("TP_FComment", this.sql.NVarChar, data.TP_FComment)
            .input("TP_FBankPartName", this.sql.NVarChar, data.TP_FBankPartName)
            .input("TP_FAccountNumber", this.sql.NVarChar, data.TP_FAccountNumber)
            .input("TP_FAccountName", this.sql.NVarChar, data.TP_FAccountName)
            .input("TP_FVajh", this.sql.NVarChar, data.TP_FVajh)
            .input("TP_FShenase", this.sql.NVarChar, data.TP_FShenase)
            .input("TP_FYear", this.sql.Int, data.TP_FYear)
            .input("TP_FDelete", this.sql.TinyInt, data.TP_FDelete)
            .input("TP_FArchive", this.sql.TinyInt, data.TP_FArchive)
            .input("TP_FUserReg", this.sql.BigInt, data.TP_FUserReg)
            .input("TP_FDateReg", this.sql.NVarChar, data.TP_FDateReg)
            .input("TP_FTimeReg", this.sql.NVarChar, data.TP_FTimeReg)
            .input("TP_FID_LastStatus", this.sql.Int, data.TP_FID_LastStatus)
            .input("TP_FID_Session", this.sql.BigInt, data.TP_FID_Session)
            .input("TP_TransactionCode", this.sql.NVarChar, data.TP_TransactionCode)
            .input("TP_PID", this.sql.NVarChar, data.TP_PID)
            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .output("ReturnFID", this.sql.BigInt, ReturnFID)
            .execute("USP_TPayment_Ins")

        return result;
    }

    async update_TOrderHead_TOH_FID_Payment(orderId, FID_Payment) {
        var sqlQuery = ` update TOrderHead set TOH_FID_Payment=${FID_Payment} where TOH_FID=${orderId} `

        const db_result = await this.Database.request().query(sqlQuery);

        return db_result
    }

    async save_RefId(TP_FID, refId) {

        var sqlQuery = ` update TPayment set TP_TransactionCode='${refId}' where TP_FID='${TP_FID}' `

        const db_result = await this.Database.request().query(sqlQuery);

        return db_result
    }

    async update_asPaid(FID_Payment, FID_Customer) {

        const date = new Date();

        let RetID;
        let RetMsg;
        let ReturnFID;
        const result = await this.Database.request()
            .input("State", this.sql.NVarChar, 'InsertPaid')
            .input("TOH_FYear", this.sql.Int, process.env.YEAR_ACCOUNTING)
            .input("TOH_FID_Customer", this.sql.BigInt, FID_Customer)
            .input("TOH_FID_Payment", this.sql.BigInt, FID_Payment)
            .input("TOH_FDateReg", this.sql.NVarChar, date.now().currentDate)
            .input("TOH_FTimeReg", this.sql.NVarChar, date.now().currentTime)
            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .output("ReturnFID", this.sql.BigInt, ReturnFID)
            .execute("USP_TOrderHead_Ins")

        return result;
    }
}

class zarinpal extends paymentModel {

    MerchantID: string

    constructor(MerchantID: string) {
        super()
        this.MerchantID = MerchantID
    }

    async getPaymentUrl(data) {
        const result = await this.request(data)

        if (result) {
            const authority = result.authority
            data.TP_PID = authority
            const insertPayment_result = await this.insertPayment('Insert', data)

            if (insertPayment_result) {
                const paymentId = insertPayment_result.output.ReturnFID
                if (paymentId) {
                    await this.update_TOrderHead_TOH_FID_Payment(data.orderId, paymentId)
                    return result.url;
                }
            }
        }
    }

    async authorize(data) {

        try {
            var price = data.TP_FPrice * 10
            const requestData = {
                merchant_id: this.MerchantID,
                amount: price,
                callback_url: global.config.url.client + 'payment/zpReturn/',
                description: data.TP_FComment,
                metadata: { email: data.TP_ClientEmail, mobile: data.TP_ClientPhone }
            }

            const config: AxiosRequestConfig = {
                method: 'POST',
                headers: { 'content-type': 'application/json', 'accept': 'application/json', },
                data: requestData,
                url: 'https://api.zarinpal.com/pg/v4/payment/request.json',
            };
            const result = await axios(config)

            return result
        }
        catch (err) {
            return null
        }
    }

    async request(data) {

        try {
            const result = await this.authorize(data)

            if (result.data.data.code == 100) {
                const data = {
                    url: 'https://www.zarinpal.com/pg/StartPay/' + result.data.data.authority,
                    authority: result.data.data.authority
                }
                return data
            }

        }
        catch (err) {
            // console.error(err);
            return null
        };
    }

    async verify(payment) {

        const requestData = {
            merchant_id: this.MerchantID,
            amount: payment.TP_FPrice * 10,
            authority: payment.TP_PID,
        }

        const config: AxiosRequestConfig = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'accept': 'application/json', },
            data: requestData,
            url: 'https://api.zarinpal.com/pg/v4/payment/verify.json',
        };
        const result = await axios(config)

        let return_data = {
            firstPass: false,
            pass: false,
            refId: 0,
            orderId: 0
        }

        if (result && result.data && result.data.data) {
            const code = result.data.data.code

            if (code == 100) {
                return_data.firstPass = true
                return_data.pass = true
                return_data.refId = result.data.data.ref_id
            }

            if (code == 101) {
                return_data.pass = true
                return_data.refId = result.data.data.ref_id
            }
        }


        return return_data
    }
}

class sep extends paymentModel {
    MerchantID: string

    constructor(MerchantID: string) {
        super()
        this.MerchantID = MerchantID
    }

    async getPaymentUrl(data) {
        const result = await this.request(data)
        if (result) {
            const authority = result.authority
            data.TP_PID = authority
            const insertPayment_result = await this.insertPayment('Insert', data)

            if (insertPayment_result) {
                const paymentId = insertPayment_result.output.ReturnFID
                if (paymentId) {
                    await this.update_TOrderHead_TOH_FID_Payment(data.orderId, paymentId)
                    return result.url;
                }
            }
        }
    }

    async authorize(data) {

        var price = data.TP_FPrice * 10
        const requestData = {
            "action": "token",
            "TerminalId": this.MerchantID,
            "Amount": price,
            "ResNum": data.TP_FComment,
            "RedirectUrl": global.config.url.client + 'payment/sepReturn/',
            "CellNumber": data.TP_ClientPhone
        }

        const config: AxiosRequestConfig = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'accept': 'application/json', },
            data: requestData,
            url: ' https://sep.shaparak.ir/onlinepg/onlinepg',
        };
        const result = await axios(config)

        return result
    }

    async request(data) {

        try {
            const result = await this.authorize(data)
            if (result.data.status == 1) {
                const data = {
                    url: 'https://sep.shaparak.ir/OnlinePG/SendToken?token=' + result.data.token,
                    authority: result.data.token
                }
                return data
            }

        }
        catch (err) {
            console.error(err);
        };
    }

    async verify(payment, RefNum) {

        const requestData = {
            "RefNum": RefNum,
            "TerminalNumber": this.MerchantID,
        }

        const config: AxiosRequestConfig = {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'accept': 'application/json', },
            data: requestData,
            url: ' https://sep.shaparak.ir/verifyTxnRandomSessionkey/ipg/VerifyTransaction',
        };

        const result: any = await axios(config)

        let return_data = {
            firstPass: false,
            pass: false,
            refId: 0,
            orderId: 0
        }

        if (result && result.data && result.data.Success && result.data.TransactionDetail) {

            const amount = result.data.TransactionDetail.AffectiveAmount

            if (amount == (payment.TP_FPrice * 10)) {

                if (!payment.TP_TransactionCode) {
                    return_data.firstPass = true
                    return_data.pass = true
                    return_data.refId = result.data.TransactionDetail.RefNum
                }
                else {
                    return_data.pass = true
                    return_data.refId = result.data.TransactionDetail.RefNum
                }
            }
        }

        return return_data
    }
}


export default new paymentModel();