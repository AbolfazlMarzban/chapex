import Model from "../Model";

class ProductModel extends Model {
  constructor() {
    super();
  }

  async save(data, User, state: string) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TGO_FID", this.sql.BigInt, data.TGO_FID)
        .input("TGO_FCode", this.sql.Int, data.TGO_FCode)
        .input("TGO_FName", this.sql.NVarChar, data.TGO_FName)
        .input("TGO_FCaption", this.sql.NVarChar, data.TGO_FCaption)
        .input("TGO_FComment", this.sql.NVarChar, data.TGO_FComment)
        .input("TGO_FHtml", this.sql.NVarChar, data.TGO_FHtml)
        .input("TGO_FBarcode", this.sql.NVarChar, data.TGO_FBarcode)
        .input("TGO_FSlug", this.sql.NVarChar, data.TGO_FSlug)
        .input("TGO_FTag", this.sql.NVarChar, data.TGO_FTag)
        .input("TGO_FFormul", this.sql.NVarChar, data.TGO_FFormul)
        .input("TGO_FID_Unit", this.sql.BigInt, data.TGO_FID_Unit)
        .input("TGO_FID_Type", this.sql.BigInt, data.TGO_FID_Type)
        .input("TGO_FBuyCode", this.sql.NVarChar, data.TGO_FBuyCode)
        .input("TGO_FBuyPrice", this.sql.Money, data.TGO_FBuyPrice)
        .input("TGO_FBuyOff", this.sql.Money, data.TGO_FBuyOff)
        .input("TGO_FBuyPoint", this.sql.Money, data.TGO_FBuyPoint)
        .input("TGO_FBuyPercent", this.sql.Money, data.TGO_FBuyPercent)
        .input("TGO_FBuyLastDate", this.sql.NVarChar, data.TGO_FBuyLastDate)
        .input("TGO_FSaleMin", this.sql.Money, data.TGO_FSaleMin)
        .input("TGO_FSalePriceMin", this.sql.Money, data.TGO_FSalePriceMin)
        .input("TGO_FSalePriceMid", this.sql.Money, data.TGO_FSalePriceMid)
        .input("TGO_FSalePriceMax", this.sql.Money, data.TGO_FSalePriceMax)
        .input("TGO_FSaleOff", this.sql.Money, data.TGO_FSaleOff)
        .input("TGO_FSalePriceFix", this.sql.Money, data.TGO_FSalePriceFix)
        .input("TGO_FSaleLastDate", this.sql.NVarChar, data.TGO_FSaleLastDate)
        .input(
          "TGO_FCanChangePrice",
          this.sql.TinyInt,
          data.TGO_FCanChangePrice
        )
        .input("TGO_FCanSale", this.sql.TinyInt, data.TGO_FCanSale)
        .input("TGO_FCanOff", this.sql.TinyInt, data.TGO_FCanOff)
        .input("TGO_FCanTax", this.sql.TinyInt, data.TGO_FCanTax)
        .input("TGO_FActive", this.sql.TinyInt, data.TGO_FActive)
        .input("TGO_FArchive", this.sql.TinyInt, data.TGO_FArchive)
        // proccess .env
        .input("TGO_FYear", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("TGO_FDelete", this.sql.TinyInt, data.TGO_FDelete)
        .input("TGO_FUserReg", this.sql.BigInt, data.TGO_FUserReg)
        .input("TGO_FDateReg", this.sql.NVarChar, data.TGO_FDateReg)
        .input("TGO_FTimeReg", this.sql.NVarChar, data.TGO_FTimeReg)
        .input("TGO_FPicAdd1", this.sql.NVarChar, data.TGO_FPicAdd1)
        .input("TGO_FPicAdd2", this.sql.NVarChar, data.TGO_FPicAdd2)
        .input("TGO_FPicAdd3", this.sql.NVarChar, data.TGO_FPicAdd3)
        .input("TGO_FID_Category1", this.sql.BigInt, data.TGO_FID_Category1)
        .input("TGO_FID_Category2", this.sql.BigInt, data.TGO_FID_Category2)
        .input("TGO_FID_Parent", this.sql.BigInt, data.TGO_FID_Parent)
        .input("TGO_FSubGroup", this.sql.TinyInt, data.TGO_FSubGroup)
        .input("TGO_FHasOption", this.sql.TinyInt, data.TGO_FHasOption)
        .input("TGO_FID_Account", this.sql.BigInt, data.TGO_FID_Account)
        .input("TGO_FLinkID", this.sql.BigInt, data.TGO_FLinkID)
        // new at 13990703
        .input("TGO_FCount", this.sql.Int, data.TGO_FCount)
        .input("TGO_FPicOrder", this.sql.NVarChar, data.TGO_FPicOrder)
        .input("TGO_FLength", this.sql.Money, data.TGO_FLength)
        .input("TGO_FWidth", this.sql.Money, data.TGO_FWidth)
        .input("TGO_FBorder", this.sql.Money, data.TGO_FBorder)
        .input("TGO_FFormulText", this.sql.NVarChar, data.TGO_FFormulText)
        .input("TGO_FID_Unit2", this.sql.Int, data.TGO_FID_Unit2)
        .input("TGO_FCountINUnit", this.sql.Money, data.TGO_FCountINUnit)
        .input("TGO_FCountINBox", this.sql.Money, data.TGO_FCountINBox)
        .input("TGO_FID_TypeBox", this.sql.Int, data.TGO_FID_TypeBox)
        .input("TGO_FProductionTime", this.sql.Int, data.TGO_FProductionTime)
        .input("TGO_FID_TypeSale", this.sql.Int, data.TGO_FID_TypeSale)
        .input("TGO_FSaleMax", this.sql.Money, data.TGO_FSaleMax)
        .input("TGO_FID_Brand", this.sql.Int, data.TGO_FID_Brand)
        .input("TGO_FID_TypeUpload", this.sql.Int, data.TGO_FID_TypeUpload)
        .input("TGO_FID_TypeDesign", this.sql.Int, data.TGO_FID_TypeDesign)
        .input("TGO_FID_ShowFormat", this.sql.Int, data.TGO_FID_ShowFormat)
        .input("TGO_FID_ShowDesign", this.sql.Int, data.TGO_FID_ShowDesign)
        // .input("TGO_FID_NumberType", this.sql.Int, data.TGO_FID_NumberType)
        // .input("TGO_FIDs_NumberList", this.sql.NVarChar, data.TGO_FIDs_NumberList)
        // .input("TGO_FNumberDefault", this.sql.Int, data.TGO_FNumberDefault)
        // .input("TGO_FNumberMin", this.sql.Money, data.TGO_FNumberMin)
        // .input("TGO_FNumberMax", this.sql.Money, data.TGO_FNumberMax)
        // .input("TGO_FNumberStep", this.sql.Money, data.TGO_FNumberStep)
        // User
        .input("User", this.sql.BigInt, User)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TGoods_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // state: TGoodsFID_Pan - TGoodsList_Pan - TGoodsCombo_Pan
  async get(state: string, id: string = "0") {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID", this.sql.BigInt, id)
        .execute("USP_TGoods_Select");
      if (state == "TGoodsList_Pan" || state == "TGoodsCombo_Pan") {
        return result.recordset;
      } else if (state == "TGoodsFID_Pan" || state == "TGoodsFID") {
        return result.recordset[0];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async TGO_FCode2TGO_FID(TGO_FCode: string) {
    try {
      var sqlQuery = `SELECT TGO_FID FROM V_TGoods WHERE TGO_FCode = ${TGO_FCode} `

      const db_result = await this.Database.request().query(sqlQuery);
      if (db_result.recordset[0]) {
        return db_result.recordset[0].TGO_FID
      }

      return null
    }
    catch (err) {
      console.log('TGO_FCode2TGO_FID', err);
    }
  }

  async delete(id: string, User: number) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, "TGoods")
        .input("FID", this.sql.Int, id)
        .input("User", this.sql.BigInt, User)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TGoods_Del");
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProductModel();
