import Model from "../Model";

class OptionsPageSaleModel extends Model {
  constructor() {
    super();
  }

  async saveOption(state, data, user) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TPP_FID", this.sql.Int, data.TPP_FID)
        .input("TPP_FID_PageSale", this.sql.Int, data.TPP_FID_PageSale)
        .input("TPP_FID_Option", this.sql.Int, data.TPP_FID_Option)
        .input("TPP_FID_Type", this.sql.Int, data.TPP_FID_Type)
        .input("TPP_FOrder", this.sql.TinyInt, data.TPP_FOrder)
        .input("TPP_FCaption", this.sql.NVarChar, data.TPP_FCaption)
        .input("TPP_FComment", this.sql.NVarChar, data.TPP_FComment)
        .input("TPP_FFix", this.sql.TinyInt, data.TPP_FFix)
        .input("TPP_FActive", this.sql.Int, data.TPP_FActive)
        .input("TPP_FIDs_Value", this.sql.NVarChar, data.TPP_FIDs_Value)
        .input("TPP_FID_Default", this.sql.Int, data.TPP_FID_Default)
        .input("TPP_FUserReg", this.sql.Int, data.TPP_FUserReg)
        .input("TPP_FDateReg", this.sql.NVarChar, data.TPP_FDateReg)
        .input("TPP_FDelete", this.sql.Int, data.TPP_FDelete)
        .input("User", this.sql.BigInt, user)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.bigint, ReturnFID)
        .execute("USP_TPageOption_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async saveOptionsValue(state, data, user) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TPPV_FID", this.sql.Int, data.TPPV_FID)
        .input("TPPV_FID_PageSale", this.sql.Int, data.TPPV_FID_PageSale)
        .input("TPPV_FID_Option", this.sql.Int, data.TPPV_FID_Option)
        .input("TPPV_FID_Value", this.sql.Int, data.TPPV_FID_Value)
        .input("TPPV_FCaption", this.sql.NVarChar, data.TPPV_FCaption)
        .input("TPPV_FComment", this.sql.NVarChar, data.TPPV_FComment)
        .input("TPPV_FActive", this.sql.Int, data.TPPV_FActive)
        .input("TPPV_FID_PageOption", this.sql.Int, data.TPPV_FID_PageOption)
        .input("TPPV_FDelete", this.sql.Int, data.TPPV_FDelete)
        .input("User", this.sql.BigInt, user)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.bigint, ReturnFID)
        .execute("USP_TPageOptionValue_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // async saveOption(data, user, state) {
  //   try {
  //     let RetID;
  //     let RetMsg;
  //     let ReturnFID;
  //     const result = await this.Database.request()
  //       .input("State", this.sql.NVarChar, state)
  //       .input("TGP_FID", this.sql.Int, data.TGP_FID)
  //       .input("TGP_FID_Goods", this.sql.Int, data.TGP_FID_Goods)
  //       .input("TGP_FID_Option", this.sql.Int, data.TGP_FID_Option)
  //       .input("TGP_FIndexDef", this.sql.Int, data.TGP_FIndexDef)
  //       .input("TGP_FType", this.sql.Int, data.TGP_FType)
  //       .input("TGP_FValue", this.sql.NVarChar, data.TGP_FValue)
  //       .input("TGP_FActive", this.sql.TinyInt, data.TGP_FActive)
  //       .input("TGP_FDelete", this.sql.TinyInt, data.TGP_FDelete)
  //       .input("TGP_FDateReg", this.sql.NVarChar, data.TGP_FDateReg)
  //       .input("TGP_FUserReg", this.sql.BigInt, data.TGP_FUserReg)
  //       .input("TGP_FLabel", this.sql.NVarChar, data.TGP_FLabel)
  //       .input("TGP_FMinValue", this.sql.Money, data.TGP_FMinValue)
  //       .input("TGP_FMaxValue", this.sql.Money, data.TGP_FMaxValue)
  //       .input("TGP_FFixable", this.sql.TinyInt, data.TGP_FFixable)
  //       .input("TGP_FExcept", this.sql.NVarChar, data.TGP_FExcept)
  //       .input("TGP_FOrder", this.sql.TinyInt, data.TGP_FOrder)
  //       .input("TGP_FOtherOption", this.sql.TinyInt, data.TGP_FOtherOption)
  //       // new for Bime 13990901
  //       .input("TGP_FID_Require", this.sql.TinyInt, data.TGP_FID_Require)
  //       .input("TGP_FHasDependency", this.sql.TinyInt, data.TGP_FHasDependency)
  //       .input("TGP_FID_Dependency", this.sql.Int, data.TGP_FID_Dependency)
  //       .input("TGP_FDependency", this.sql.NVarChar, data.TGP_FDependency)
  //       // User
  //       .input("User", this.sql.BigInt, user)
  //       .output("RetID", this.sql.BigInt, RetID)
  //       .output("RetMsg", this.sql.NVarChar, RetMsg)
  //       .output("ReturnFID", this.sql.bigint, ReturnFID)
  //       .execute("USP_TGoodsOption_Ins");
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async saveOptionValue(data, user, state) {
  //   try {
  //     let RetID;
  //     let RetMsg;
  //     let ReturnFID;
  //     const result = await this.Database.request()
  //       .input("State", this.sql.NVarChar, state)
  //       .input("TGPV_FID", this.sql.Int, data.TGPV_FID)
  //       .input("TGPV_FID_Goods", this.sql.Int, data.TGPV_FID_Goods)
  //       .input("TGPV_FID_Option", this.sql.Int, data.TGPV_FID_Option)
  //       .input("TGPV_FID_Value", this.sql.Int, data.TGPV_FID_Value)
  //       .input("TGPV_FID_Product", this.sql.Int, data.TGPV_FID_Product)
  //       .input("TGPV_FID_Product2", this.sql.Int, data.TGPV_FID_Product2)
  //       .input("TGPV_FCount", this.sql.Money, data.TGPV_FCount)
  //       .input("TGPV_FRepet", this.sql.Money, data.TGPV_FRepet)
  //       .input("TGPV_FID_TypeSale", this.sql.Int, data.TGPV_FID_TypeSale)
  //       .input("TGPV_FComment", this.sql.NVarChar, data.TGPV_FComment)
  //       .input("TGPV_FID_GoodsOption", this.sql.Int, data.TGPV_FID_GoodsOption)
  //       .input("TGPV_FDelete", this.sql.Int, data.TGPV_FDelete)
  //       // User
  //       .input("User", this.sql.BigInt, user)
  //       .output("RetID", this.sql.BigInt, RetID)
  //       .output("RetMsg", this.sql.NVarChar, RetMsg)
  //       .output("ReturnFID", this.sql.bigint, ReturnFID)
  //       .execute("USP_TGoodsOptionValue_Ins");
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async saveDependancyValue(data, user, state) {
  //   try {
  //     let RetID;
  //     let RetMsg;
  //     let ReturnFID;
  //     const result = await this.Database.request()
  //       .input("State", this.sql.NVarChar, state)
  //       .input("TGPD_FID", this.sql.Int, data.TGPD_FID)
  //       .input("TGPD_FID_Goods", this.sql.Int, data.TGPD_FID_Goods)
  //       .input("TGPD_FID_Option", this.sql.Int, data.TGPD_FID_Option)
  //       .input("TGPD_FID_Value", this.sql.Int, data.TGPD_FID_Value)
  //       .input(
  //         "TGPD_FID_OptionDepend",
  //         this.sql.Int,
  //         data.TGPD_FID_OptionDepend
  //       )
  //       .input("TGPD_FID_ValueDepend", this.sql.Int, data.TGPD_FID_ValueDepend)
  //       .input("TGPD_FID_Type", this.sql.Int, data.TGPD_FID_Type)
  //       .input("TGPD_FComment", this.sql.NVarChar, data.TGPD_FComment)
  //       .input("TGPD_FID_GoodsOption", this.sql.Int, data.TGPD_FID_GoodsOption)
  //       .input("TGPD_FDelete", this.sql.Int, data.TGPD_FDelete)
  //       // .input("TGPV_FID_GoodsOption", this.sql.Int, data.TGPV_FID_GoodsOption)
  //       // .input("TGPV_FDelete", this.sql.Int, data.TGPV_FDelete)
  //       // User
  //       .input("User", this.sql.BigInt, user)
  //       .output("RetID", this.sql.BigInt, RetID)
  //       .output("RetMsg", this.sql.NVarChar, RetMsg)
  //       .output("ReturnFID", this.sql.bigint, ReturnFID)
  //       .execute("USP_TGoodsOptionDepend_Ins");
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async getOptionValue(state , idPageSale, goodsId) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.BigInt, idPageSale)
        .input("FID_Goods", this.sql.BigInt, goodsId)
        .execute("USP_TGoodsOption_Select");
        // console.log("result.recordset");
        // console.log(idPageSale);
        // console.log(goodsId);
    
        // console.log(result.recordset);
        
      return result.recordset
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getOptionValueList(state , idPageSale , idOption = 0) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.BigInt, idPageSale)
        .input("FID_Option", this.sql.BigInt, idOption)
        .execute("USP_TPage_Select");
      return result.recordset
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async get(state, id: String = "0") {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.BigInt, id)
        .execute("USP_TPage_Select");
      
      
      if (state == "TPageOptionList") {
        return result.recordset;
      } else if (state == "TPageOptionFID") {
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
        .input("TableName", this.sql.NVarChar, "TPageOption")
        .input("FID", this.sql.Int, id)
        .input("User", this.sql.BigInt, User)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TPage_Del");
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteOption(id: string, User: number) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, "TPageOptionValue")
        .input("FID", this.sql.Int, id)
        .input("User", this.sql.BigInt, User)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TPage_Del");
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new OptionsPageSaleModel();
