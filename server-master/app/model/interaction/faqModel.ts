

import Model from "../Model";

class faqModel extends Model {
  constructor() {
    super();
  }
  async get(state, statusId, id = "0") {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID", this.sql.BigInt, statusId)
        .execute("USP_TGoodsComment_Select");
      return result.recordset;
      
      
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
          .input("TGQ_FBuyer" , this.sql.TinyInt , data.TGQ_FBuyer)
          .input("TGQ_FComment" , this.sql.NVarChar , data.TGQ_FComment)
          .input("TGQ_FDateReg" , this.sql.NVarChar , data.TGQ_FDateReg)
          .input("TGQ_FDelete" , this.sql.TinyInt , data.TGQ_FDelete)
          .input("TGQ_FID" , this.sql.Int , data.TGQ_FID)
          .input("TGQ_FID_Goods" , this.sql.Int , data.TGQ_FID_Goods)
          .input("TGQ_FID_Question" , this.sql.NVarChar , data.TGQ_FID_Question)
          .input("TGQ_FID_Status" , this.sql.Int , data.TGQ_FID_Status)
          .input("TGQ_FQuestion" , this.sql.NVarChar , data.TGQ_FQuestion)
          .input("TGQ_FSumLike" , this.sql.Int , data.TGQ_FSumLike)
          .input("TGQ_FTimeReg" , this.sql.NVarChar , data.TGQ_FTimeReg)

          .output("RetID", this.sql.BigInt, RetID)
          .output("RetMsg", this.sql.NVarChar, RetMsg)
          .output("ReturnFID", this.sql.BigInt, ReturnFID)
          .execute("USP_TGoodsQuestion_Ins");
        return result;


      } catch (error) {
        console.log(error)
      }
  }
}

export default new faqModel();
