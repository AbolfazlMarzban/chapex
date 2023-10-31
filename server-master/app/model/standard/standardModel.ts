import Model from "../Model";

class StandardyModel extends Model {
  constructor() {
    super();
  }
  async save(data, User, state) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;

      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TGB_FID", this.sql.Int, data.TGB_FID)
        .input("TGB_FCode", this.sql.Int, data.TGB_FCode)
        .input("TGB_FName", this.sql.NVarChar, data.TGB_FName)
        .input("TGB_FID_Type", this.sql.Int, data.TGB_FID_Type)
        .input("TGB_FSend", this.sql.NVarChar, data.TGB_FSend)
        .input("TGB_FLength", this.sql.Money, data.TGB_FLength)
        .input("TGB_FWidth", this.sql.Money, data.TGB_FWidth)
        .input("TGB_FPrice", this.sql.Money, data.TGB_FPrice)
        .input("TGB_FHight", this.sql.Money, data.TGB_FHight)
        .input("TGB_FWeightMin", this.sql.Money, data.TGB_FWeightMin)
        .input("TGB_FWeightMax", this.sql.Money, data.TGB_FWeightMax)
        .input("TGB_FComment", this.sql.NVarChar, data.TGB_FComment)
        .input("TGB_FDelete", this.sql.TinyInt, data.TGB_FDelete)
        .input("User", this.sql.BigInt, User)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TGoodsBox_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async get(state: string, id: string = "0") {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID", this.sql.BigInt, id)
        .execute("USP_TGoodsBox_Select_Del");
        if (state=="TGoodsBoxFID"){
          return result.recordset[0]

        }
        return result.recordset
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id, User) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "DeleteTGoodsBox")
        .input("FID", this.sql.Int, id)
        // User
        .input("User", this.sql.BigInt, User)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TGoodsBox_Select_Del");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // async findById(id) {
  //   try {
  //     const result = await this.Database.request()
  //       .input("State", this.sql.NVarChar, "MainGroup_TCategory")
  //       .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
  //       .input("FID_Group", this.sql.BigInt, id)
  //       .execute("USP_TCategory_Select");
  //     return result.recordset[0];
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }
}

export default new StandardyModel();
