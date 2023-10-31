import Model from "../Model";

class CommentsModel extends Model {
  constructor() {
    super();
  }
  async get(state, statusId, id = "0") {
    try {
      const result = await this.Database.request()
      .input("State", this.sql.NVarChar, state)
      .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
      .input("FID", this.sql.BigInt,statusId)
      .execute("USP_TGoodsComment_Select");
     


      return result.recordset
    } catch (error) {
      console.log(error);
    }
  }

  

  async save (state , data){
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
        
        
        const result = await this.Database.request()
        .input("state" , this.sql.NVarChar , state)
        .input("TGC_FBuyer" , this.sql.TinyInt , data.TGC_FBuyer)
        .input("TGC_FComment" , this.sql.NVarChar , data.TGC_FComment)
        .input("TGC_FDateReg" , this.sql.NVarChar , data.TGC_FDateReg)
        .input("TGC_FDelete" , this.sql.TinyInt , data.TGC_FDelete)
        .input("TGC_FID" , this.sql.Int , data.TGC_FID)
        .input("TGC_FID_Goods" , this.sql.Int , data.TGC_FID_Goods)
        .input("TGC_FID_Status" , this.sql.Int , data.TGC_FID_Status)
        .input("TGC_FSumLike" , this.sql.Int , data.TGC_FSumLike)
        .input("TGC_FTimeReg" , this.sql.NVarChar , data.TGC_FTimeReg)
        .input("TGC_FDisadvantages" , this.sql.NVarChar , data.TGC_FDisadvantages) //نقاط ضعف
        .input("TGC_FIsCustomer" , this.sql.NVarChar , data.TGC_FIsCustomer)
        .input("TGC_FIsUnknown" , this.sql.NVarChar , data.TGC_FIsUnknown) //ناشناس
        .input("TGC_FSuggested" , this.sql.NVarChar , data.TGC_FSuggested) //پیشنهاد خرید
        .input("TGC_FAdvantages" , this.sql.NVarChar , data.TGC_FAdvantages) //نقاط قوت
        .input("TGC_FUserReg" , this.sql.NVarChar , data.TGC_FUserReg)


        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TGoodsComment_Ins");
      return result;


    } catch (error) {
      console.log(error)
    }
}
}

export default new CommentsModel();
