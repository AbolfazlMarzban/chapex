import Model from "./Model";

class fileUploaderModel extends Model {
  constructor() {
    super();
  }
  async get(state ,parentId= "0" , form) {
    try {
      const result = await this.Database.request()
      .input("state" , this.sql.NVarChar , state)
      .input("FID" , this.sql.Int , parentId)
      .input("Form" , this.sql.NVarChar , form)
      .execute("USP_TPicture_Select_Del")
      // console.log(result);
      
      return result.recordset
    } catch (error) {
      console.log(error)
    }
  }
  async save(data, User, state) {
    try {
      let RetID; 
      let RetMsg;
      let ReturnFID;

      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TPIC_FID", this.sql.BigInt, data.TPIC_FID)
        .input("TPIC_FID_Parent", this.sql.BigInt, data.TPIC_FID_Parent)
        .input("TPIC_FForm", this.sql.NVarChar, data.TPIC_FForm)
        .input("TPIC_FAddress", this.sql.NVarChar, data.TPIC_FAddress) 
        .input("TPIC_FName", this.sql.NVarChar, data.TPIC_FName)
        .input("TPIC_FComment", this.sql.NVarChar, data.TPIC_FComment)
        .input("TPIC_FOrder", this.sql.TinyInt, data.TPIC_FOrder)
        .input("TPIC_FType", this.sql.NVarChar, data.TPIC_FType)
        .input("TPIC_FUserReg", this.sql.Int, data.TPIC_FUserReg)
        .input("TPIC_FDateReg", this.sql.NVarChar, data.TPIC_FDateReg)
        .input("TPIC_FActive", this.sql.TinyInt, data.TPIC_FActive)
        .input("TPIC_FDelete", this.sql.TinyInt, data.TPIC_FDelete)
        // User
        .input("User", this.sql.BigInt, User)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TPicture_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id: string,) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("state", this.sql.NVarChar, "DeleteTPicture")
        .input("FID", this.sql.Int, id)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TPicture_Select_Del");
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new fileUploaderModel();
