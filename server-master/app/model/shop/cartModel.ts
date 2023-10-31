import Model from "../Model";
import PageSaleCartModel from "./pageSaleModels/pageSaleCartModel"


class cartModel extends Model {
    constructor() {
        super();
    }

    async saveProductDetails(state, data) {
        let RetID;
        let RetMsg;
        let ReturnFID;
        const result = await this.Database.request()
            .input("state", this.sql.NVarChar, state)
            .input("TOD_FID", this.sql.BigInt, data.TOD_FID)
            .input("TOD_FID_SalePage", this.sql.Int, data.TOD_FID_SalePage)
            .input("TOD_FID_Goods", this.sql.BigInt, data.TOD_FID_Goods)
            .input("TOD_FID_SelectedOptions", this.sql.VarChar, data.TOD_FID_SelectedOptions)
            .input("TOD_FDateReg", this.sql.NVarChar, data.TOD_FDateReg)
            .input("TOD_FTimeReg", this.sql.NVarChar, data.TOD_FTimeReg)
            .input("TOD_FID_Store", this.sql.Int, 0)
            .input("TOD_FID_Header", this.sql.BigInt, data.TOD_FID_Header)
            .input("TOD_FCount", this.sql.Money, data.TOD_FCount)
            .input("TOD_FPrice", this.sql.Money, data.TOD_FPrice)
            .input("TOD_FTax", this.sql.Money, data.TOD_FTax)
            .input("TOD_FDiscount", this.sql.Money, 0)
            .input("TOD_FCoupon", this.sql.NVarChar, '')
            .input("TOD_FName", this.sql.NVarChar, data.TOD_FName)
            .input("TOD_FOption", this.sql.NVarChar, data.TOD_FOption)
            .input("TOD_FComment", this.sql.NVarChar, '')
            .input("TOD_FActive", this.sql.TinyInt, 0)
            .input("TOD_FArchive", this.sql.TinyInt, 0)
            .input("TOD_FDelete", this.sql.TinyInt, 0)
            .input("TOD_FID_LastStatus", this.sql.Int, 0)
            .input("TOD_FID_Sheet", this.sql.Int, 0)
            .input("TOD_FID_Payment", this.sql.BigInt, 0)
            .input("TOD_FID_Account", this.sql.BigInt, 0)
            .input("TOD_FID_Session", this.sql.BigInt, 0)
            .input("TOD_FPicAdd1", this.sql.NVarChar, '')
            .input("TOD_FPicAdd2", this.sql.NVarChar, '')
            .input("TOD_FPicAdd3", this.sql.NVarChar, '')
            .input("TOD_FPicAdd4", this.sql.NVarChar, '')
            .input("TOD_FPicAdd5", this.sql.NVarChar, '')
            .input("TOD_FPicAdd6", this.sql.NVarChar, '')
            .input("TOD_FPicAdd7", this.sql.NVarChar, '')
            .input("TOD_FBasketIndex", this.sql.TinyInt, 0)
            .input("TOD_FDesignStatus", this.sql.TinyInt, data.TOD_FDesignStatus)
            .input("TOD_FID_Design", this.sql.BigInt, data.TOD_FID_Design)
            .input("TOD_FReviewNeed", this.sql.TinyInt, data.TOD_FReviewNeed)
            .input("TOD_FID_Review", this.sql.BigInt, data.TOD_FID_Review)
            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .output("ReturnFID", this.sql.BigInt, ReturnFID)
            .execute("USP_TOrderDetailTemp_Ins")
        return result;


    }

    async saveBuyInfo(state, data) {

        let RetID;
        let RetMsg;
        let ReturnFID;

        const result = await this.Database.request()
            .input("state", this.sql.NVarChar, state)

            .input("TOH_FID_Type", this.sql.Int, data.TP_FID_Type)
            .input("TOH_FPayOnline", this.sql.Int, data.TP_FID_Payment)
            .input("TOH_FID_Bank", this.sql.BigInt, data.TP_FID_Bank)
            .input("TOH_FPriceTotal", this.sql.Money, data.TP_FPrice)
            
            .input("TOH_FLegal", this.sql.TinyInt, data.TUX_FType)
            
            .input("TUX_FType", this.sql.TinyInt, data.TUX_FType)
            .input("TUX_FName", this.sql.NVarChar, data.TUX_FName)
            .input("TUX_FMelli", this.sql.NVarChar, data.TUX_FMelli)
            .input("TUX_FShenas", this.sql.NVarChar, data.TUX_FShenas)
            .input("TUX_FEcoCode", this.sql.NVarChar, data.TUX_FEcoCode)
            .input("TUX_FAddress", this.sql.NVarChar, data.TUX_FAddress)
            .input("TUX_FTel", this.sql.NVarChar, data.TUX_FTel)
            
            .input("TOH_FPrinted", this.sql.TinyInt, data.printFactor)
            
            .input("TOH_FID_Payment", this.sql.BigInt, 0)
            .input("TOH_FCode", this.sql.BigInt, 0)
            .input("TOH_FDateReg", this.sql.NVarChar, data.TOH_FDateReg)
            .input("TOH_FTimeReg", this.sql.NVarChar, data.TOH_FTimeReg)
            .input("TOH_FID_Customer", this.sql.BigInt, data.TOH_FID_Header)
            .input("TOH_FUserReg", this.sql.BigInt, data.TOH_FID_Header)
            .input("TOH_FCpupon", this.sql.NVarChar, data.userCredit)
            .input("TOH_FID_Bman", this.sql.BigInt, 0)
            .input("TOH_FYear", this.sql.Int, 0)
            .input("TOH_FActive", this.sql.TinyInt, 1)
            .input("TOH_FArchive", this.sql.TinyInt, 0)
            .input("TOH_FDelete", this.sql.TinyInt, 0)
            .input("TOH_FComment", this.sql.NVarChar, '')
            .input("TOH_FID_LastStatus", this.sql.Int, 0)
            .input("TOH_FID_Account", this.sql.BigInt, 0)
            .input("TOH_FID_Session", this.sql.BigInt, 0)
            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .output("ReturnFID", this.sql.BigInt, ReturnFID)
            .execute("USP_TOrderHead_Ins")


        return result;
    }

    async saveSelectedOptions(state, orderId, data) {
        let RetID;
        let RetMsg;
        let ReturnFID;
        const result = await this.Database.request()
            .input("state", this.sql.NVarChar, state)
            .input("TOP_FID", this.sql.BigInt, data.TOP_FID)
            .input("TOP_FID_Order", this.sql.BigInt, orderId)
            .input("TOP_FID_Option", this.sql.Int, data.TOP_FID_Option)
            .input("TOP_FID_OptionValue", this.sql.VarChar, data.TOP_FID_OptionValue)
            .input("TOP_FCaption", this.sql.NVarChar, data.TOP_FCaption)
            .input("TOP_FComment", this.sql.NVarChar, data.TOP_FComment)
            .input("TOP_FPrice", this.sql.Money, data.TOP_FPrice)
            .input("TOP_FDelete", this.sql.TinyInt, data.TOP_FDelete)
            .input("TOP_FDiscount", this.sql.Money, data.TOP_FDiscount)
            .input("TOP_FBMan", this.sql.BigInt, data.TOP_FBMan)
            .input("TOP_FState", this.sql.Int, data.TOP_FState)
            .input("FLastOption", this.sql.TinyInt, 0)
            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .output("ReturnFID", this.sql.BigInt, ReturnFID)
            .execute("USP_TOrderOptionTemp_Ins")
        return result;
    }


    async getCount(userId, basketId) {

        var sqlQuery = `
        SELECT count(TOD_FID) as count
		FROM V_TOrderDetailTemp
		WHERE TOD_FID_Header = ${userId} and TOD_FBasketIndex=${basketId}
        `
        const result = await this.Database.request().query(sqlQuery);

        if (result)
            return result.recordset[0].count
    }
    async get(userId) {

        var sqlQuery = `
        SELECT * 
		,ROW_NUMBER() OVER(ORDER BY TOD_FID) AS TOD_FROWNUM
		FROM V_TOrderDetailTemp
		WHERE TOD_FID_Header = ${userId}
        `
        const result = await this.Database.request().query(sqlQuery);

        return await this.createFrontEndObject(result.recordset)

    }
    async createFrontEndObject(dbData) {

        let data = {
            salePages: [],
            cartItems: dbData,
        }

        for (var i = 0; i <= data.cartItems.length - 1; i++) {

            const item = data.cartItems[i]

            let selectedChildrenArray = []
            if (item.TOD_FID_SelectedOptions)
                selectedChildrenArray = item.TOD_FID_SelectedOptions.split(",")
                    .map((entry) => parseInt(entry))
                    .filter((entry) => typeof entry === "number");

            if (!item.TOD_FID_SelectedOptions || item.TOD_FID_SelectedOptions == "") {
                selectedChildrenArray = []
            }
            item.TOD_FID_SelectedOptions = selectedChildrenArray

            const SalePage_index = data.salePages.findIndex(sp => sp.TPS_FID == item.TOD_FID_SalePage)
            if (SalePage_index == -1) {
                const salePage_result = await PageSaleCartModel.get_show(item.TOD_FID_SalePage)
                if (salePage_result) {

                    const selected_product = salePage_result.products.find(p => p.TGO_FID == item.TOD_FID_Goods)
                    if (selected_product) {
                        data.salePages.push(salePage_result)
                    }
                }
            }
        }
        return data
    }


    async delete(rowId) {

        var sqlQuery = `
        DELETE TOrderDetailTEMP
			WHERE TOD_FID = ${rowId}
        `

        const db_result = await this.Database.request().query(sqlQuery);

        return db_result
    }

    async changeBasket(basketId, rowId) {
        var sqlQuery = `
        UPDATE TOrderDetailTEMP
            SET TOD_FBasketIndex=${basketId}
			WHERE TOD_FID = ${rowId}
        `

        const db_result = await this.Database.request().query(sqlQuery);

        return db_result
    }

    async changeBasket_old(state, data, basketId, userId, rowId) {
        let RetID;
        let RetMsg;
        let ReturnFID;
        const result = await this.Database.request()
            .input("state", this.sql.NVarChar, state)
            .input("TOD_FID", this.sql.BigInt, rowId)
            .input("TOD_FID_Goods", this.sql.BigInt, data.TOD_FID_Goods)
            .input("TOD_FDateReg", this.sql.NVarChar, data.TOD_FDateReg)
            .input("TOD_FTimeReg", this.sql.NVarChar, data.TOD_FTimeReg)
            .input("TOD_FID_Store", this.sql.Int, 0)
            .input("TOD_FID_Header", this.sql.BigInt, userId)
            .input("TOD_FCount", this.sql.Money, 0)
            .input("TOD_FPrice", this.sql.Money, data.TOD_FPrice)
            .input("TOD_FTax", this.sql.Money, data.TOD_FTax)
            .input("TOD_FDiscount", this.sql.Money, 0)
            .input("TOD_FCoupon", this.sql.NVarChar, '')
            .input("TOD_FName", this.sql.NVarChar, '')
            .input("TOD_FOption", this.sql.NVarChar, '')
            .input("TOD_FComment", this.sql.NVarChar, '')
            .input("TOD_FActive", this.sql.TinyInt, 0)
            .input("TOD_FArchive", this.sql.TinyInt, 0)
            .input("TOD_FDelete", this.sql.TinyInt, 0)
            .input("TOD_FID_LastStatus", this.sql.Int, 0)
            .input("TOD_FID_Sheet", this.sql.Int, 0)
            .input("TOD_FID_Payment", this.sql.BigInt, 0)
            .input("TOD_FID_Account", this.sql.BigInt, 0)
            .input("TOD_FID_Session", this.sql.BigInt, 0)
            .input("TOD_FPicAdd1", this.sql.NVarChar, '')
            .input("TOD_FPicAdd2", this.sql.NVarChar, '')
            .input("TOD_FPicAdd3", this.sql.NVarChar, '')
            .input("TOD_FPicAdd4", this.sql.NVarChar, '')
            .input("TOD_FPicAdd5", this.sql.NVarChar, '')
            .input("TOD_FPicAdd6", this.sql.NVarChar, '')
            .input("TOD_FPicAdd7", this.sql.NVarChar, '')
            .input("TOD_FBasketIndex", this.sql.TinyInt, basketId)
            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .output("ReturnFID", this.sql.BigInt, ReturnFID)
            .execute("USP_TOrderDetailTemp_Ins")
        return result;

    }
    async getOrders(id, date) {
        try {
            const Query = `SELECT TOP 1 * FROM [dbo].[TOrderHead] WHERE [TOH_FID_Customer] =${id} AND [TOH_FDateReg] = '${date}'
            ORDER BY [TOH_FID] DESC`
            const res = await this.Database.request().query(Query)
            if (res) {
                const legal = res.recordset[0].TOH_FLegal
                if (legal == 1) {
                    return true;
                } else if (legal != 1) {
                    return false
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export default new cartModel();