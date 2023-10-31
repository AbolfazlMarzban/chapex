
import { table } from "console";
import { Request } from "express";
import Model from "../Model";

class orderModel extends Model {
    constructor() {
        super();
    }
    async getDefaults(TD_FID_Group) {
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
                    withSub[i].children = await this.getDefaults(withSub[i].TD_FID)
                }

                return db_result.recordsets[0]
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async get(userID, state) {
        let result;
        if (state == 'myOrders') {
            const myOrderQuery = `SELECT * FROM [V_TOrderDetail]`
            result = await this.Database.request().query(myOrderQuery);
        } else if (state == 'allOrders') {
            const allOrdersQuery = `SELECT * FROM [V_TOrderDetail]`
            result = await this.Database.request().query(allOrdersQuery);
        } else if (state == 'ordersArchive') {
            const ordersArchiveQuery = `SELECT * FROM [V_TOrderDetail] WHERE [TOD_FArchive] = 1`
            result = await this.Database.request().query(ordersArchiveQuery);
        }
        else if (state == 'userOrders') {
            let ordersArchiveQuery = ` SELECT * FROM [V_TOrderDetail] WHERE [TOH_FID_Customer] = ${userID} `
            result = await this.Database.request().query(ordersArchiveQuery);
        }

        return result
    }
    async getUserOrder(orderId) {
        try {
            let orderQuery = `SELECT * FROM [V_TOrderDetail] WHERE [TOD_FID] = ${orderId}`

            orderQuery += ` SELECT TOS_FID,TOS_FID_Order,TOS_FStatus2,TOS_FStatusName2,TOS_FDateReg,TOS_TimeReg
                                        FROM [V_TOrderStatus] WHERE [TOS_FID_Order] = ${orderId} `

            orderQuery += ` SELECT * FROM [V_TOrderOption] WHERE [TOP_FID_OrderDetails] = ${orderId} `

            const result = await this.Database.request().query(orderQuery)
            if (result) {
                return result
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getOrder(id) {
        try {
            const orderQuery = `SELECT * FROM [V_TOrderDetail] WHERE [TOD_FID] = ${id}`
            const result = await this.Database.request().query(orderQuery)
            if (result) {
                return result.recordset
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getOrderOptions(id) {
        try {
            var optionQuery = `SELECT * FROM [V_TOrderOption] WHERE [TOP_FID_OrderDetails] = ${id}`
            const result = await this.Database.request().query(optionQuery)
            if (result) {
                return result.recordset
            }
        } catch (error) {
            console.log(error)
        }

    }
    async getGoodInfo(id) {
        try {
            var optionQuery = `SELECT * FROM [V_TGoods] WHERE [TGO_FID] = ${id}`
            const result = await this.Database.request().query(optionQuery)
            if (result) {
                return result.recordset
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getFormResults(customer, formId) {
        try {
            var optionQuery = `SELECT * FROM [V_TFormData] WHERE [TFD_FUserReg] = ${customer} AND [TFD_FID_Form] = ${formId}`
            const result = await this.Database.request().query(optionQuery)
            if (result) {
                return result.recordset
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getOrderStatus(id){
        try{
            var statQuery = `SELECT * FROM [V_TOrderStatus] WHERE [TOS_FID_Order] = ${id}`
            const result = await this.Database.request().query(statQuery)
            if(result){
                return result.recordset
            }
        }catch(error){
            console.log(error)
        }
    }
    async changeStatus(data){
        try{
            let RetID;
            let RetMsg;
            const result = await this.Database.request()
            .input("State", this.sql.NVarChar, data.state)
            .input("TOS_FUserReg", this.sql.BigInt, data.userReg)
            .input("TOS_FStatus1",this.sql.Int, data.status1) 
            .input("TOS_FStatusDetail1",this.sql.Int, data.statusDetail1)
            .input("TOS_FStatus2",this.sql.Int, data.status2)
            .input("TOS_FStatusDetail2",this.sql.Int, data.statusDetail2)
            .input("TOS_FID_OrderHead",this.sql.BigInt, data.orderHeadID)
            .input("TOS_FID_Order",this.sql.BigInt, data.orderID)
            .input("TOS_FDateReg",this.sql.NVarChar, data.date)
            .input("TOS_TimeReg",this.sql.NVarChar, data.time)
            .input("TOS_FComment", this.sql.NVarChar, data.caption)

            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .execute("USP_TOrderStatus")
            if(result){
                return result
            }
        }catch(error){
            console.log(error)
            return null;

        }
    }
}

export default new orderModel()