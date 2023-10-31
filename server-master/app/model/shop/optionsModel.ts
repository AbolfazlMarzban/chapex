import Model from "../Model";

class OptionsModel extends Model {
  constructor() {
    super();
  }
  async getOptionValue(state, id) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.BigInt, id)
        .execute("USP_TGoodsOption_Select");
      // console.log(result);
      
      return result.recordset;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async saveOption(data, user, state) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TGP_FID", this.sql.Int, data.TGP_FID)
        .input("TGP_FID_Goods", this.sql.Int, data.TGP_FID_Goods)
        .input("TGP_FID_Option", this.sql.Int, data.TGP_FID_Option)
        .input("TGP_FIndexDef", this.sql.Int, data.TGP_FIndexDef)
        .input("TGP_FType", this.sql.Int, data.TGP_FType)
        .input("TGP_FValue", this.sql.NVarChar, data.TGP_FValue)
        .input("TGP_FActive", this.sql.TinyInt, data.TGP_FActive)
        .input("TGP_FDelete", this.sql.TinyInt, data.TGP_FDelete)
        .input("TGP_FDateReg", this.sql.NVarChar, data.TGP_FDateReg)
        .input("TGP_FUserReg", this.sql.BigInt, data.TGP_FUserReg)
        .input("TGP_FLabel", this.sql.NVarChar, data.TGP_FLabel)
        .input("TGP_FMinValue", this.sql.Money, data.TGP_FMinValue)
        .input("TGP_FMaxValue", this.sql.Money, data.TGP_FMaxValue)
        .input("TGP_FFixable", this.sql.TinyInt, data.TGP_FFixable)
        .input("TGP_FExcept", this.sql.NVarChar, data.TGP_FExcept)
        .input("TGP_FOrder", this.sql.TinyInt, data.TGP_FOrder)
        .input("TGP_FOtherOption", this.sql.TinyInt, data.TGP_FOtherOption)
        // new for Bime 13990901
        .input("TGP_FID_Require", this.sql.TinyInt, data.TGP_FID_Require)
        .input("TGP_FHasDependency", this.sql.TinyInt, data.TGP_FHasDependency)
        .input("TGP_FID_Dependency", this.sql.Int, data.TGP_FID_Dependency)
        .input("TGP_FDependency", this.sql.NVarChar, data.TGP_FDependency)
        // User
        .input("User", this.sql.BigInt, user)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.bigint, ReturnFID)
        .execute("USP_TGoodsOption_Ins");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async saveOptionValue(data, user, state) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TGPV_FID", this.sql.Int, data.TGPV_FID)
        .input("TGPV_FID_Goods", this.sql.Int, data.TGPV_FID_Goods)
        .input("TGPV_FID_Option", this.sql.Int, data.TGPV_FID_Option)
        .input("TGPV_FID_Value", this.sql.Int, data.TGPV_FID_Value)
        .input("TGPV_FID_Product", this.sql.Int, data.TGPV_FID_Product)
        .input("TGPV_FID_Product2", this.sql.Int, data.TGPV_FID_Product2)
        .input("TGPV_FCount", this.sql.Money, data.TGPV_FCount)
        .input("TGPV_FRepet", this.sql.Money, data.TGPV_FRepet)
        .input("TGPV_FID_TypeSale", this.sql.Int, data.TGPV_FID_TypeSale)
        .input("TGPV_FComment", this.sql.NVarChar, data.TGPV_FComment)
        .input("TGPV_FID_GoodsOption", this.sql.Int, data.TGPV_FID_GoodsOption)
        .input("TGPV_FDelete", this.sql.Int, data.TGPV_FDelete)
        // User
        .input("User", this.sql.BigInt, user)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.bigint, ReturnFID)
        .execute("USP_TGoodsOptionValue_Ins");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async saveDependancyValue(data, user, state) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TGPD_FID", this.sql.Int, data.TGPD_FID)
        .input("TGPD_FID_Goods", this.sql.Int, data.TGPD_FID_Goods)
        .input("TGPD_FID_Option", this.sql.Int, data.TGPD_FID_Option)
        .input("TGPD_FID_Value", this.sql.Int, data.TGPD_FID_Value)
        .input(
          "TGPD_FID_OptionDepend",
          this.sql.Int,
          data.TGPD_FID_OptionDepend
        )
        .input("TGPD_FID_ValueDepend", this.sql.Int, data.TGPD_FID_ValueDepend)
        .input("TGPD_FID_Type", this.sql.Int, data.TGPD_FID_Type)
        .input("TGPD_FComment", this.sql.NVarChar, data.TGPD_FComment)
        .input("TGPD_FID_GoodsOption", this.sql.Int, data.TGPD_FID_GoodsOption)
        .input("TGPD_FDelete", this.sql.Int, data.TGPD_FDelete)
        // .input("TGPV_FID_GoodsOption", this.sql.Int, data.TGPV_FID_GoodsOption)
        // .input("TGPV_FDelete", this.sql.Int, data.TGPV_FDelete)
        // User
        .input("User", this.sql.BigInt, user)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.bigint, ReturnFID)
        .execute("USP_TGoodsOptionDepend_Ins");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async get(state, id: String = "0") {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.BigInt, id)
        .execute("USP_TGoods_Select");
      if (state == "TGoodsOptionList") {
        return result.recordset;
      } else if (state == "TGoodsOptionListFID") {
        return result.recordset[0];
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async delete(id: string, User: number) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, "TGoodsOption")
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
  async deleteValue(id: string, User: number) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, "TGoodsOptionValue")
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

export default new OptionsModel();
