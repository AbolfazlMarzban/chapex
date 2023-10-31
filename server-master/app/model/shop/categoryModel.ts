import Model from "../Model";

class CategoryModel extends Model {
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
        .input("TC_FID", this.sql.Int, data.TC_FID)
        .input("TC_FCode", this.sql.Int, data.TC_FCode)
        .input("TC_FName", this.sql.NVarChar, data.TC_FName)
        .input("TC_FCaption", this.sql.NVarChar, data.TC_FCaption)
        .input("TC_FComment", this.sql.NVarChar, data.TC_FComment)
        .input("TC_FValue1", this.sql.Money, data.TC_FValue1)
        .input("TC_FSlug", this.sql.NVarChar, data.TC_FSlug)
        .input("TC_FAddPic1", this.sql.NVarChar, data.TC_FAddPic1)
        .input("TC_FAddPic2", this.sql.NVarChar, data.TC_FAddPic2)
        .input("TC_FAddPic3", this.sql.NVarChar, data.TC_FAddPic3)
        .input("TC_FHtml", this.sql.NVarChar, data.TC_FHtml)
        .input("TC_FOrder", this.sql.Int, data.TC_FOrder)
        .input("TC_FActive", this.sql.TinyInt, data.TC_FActive)
        .input("TC_FShow", this.sql.TinyInt, data.TC_FShow)
        .input("TC_FSystem", this.sql.TinyInt, data.TC_FSystem)
        .input("TC_FDelete", this.sql.TinyInt, data.TC_FDelete)
        .input("TC_FFormType", this.sql.TinyInt, data.TC_FFormType)
        .input("TC_FSubGroup", this.sql.TinyInt, data.TC_FSubGroup)
        .input("TC_FID_Group", this.sql.Int, data.TC_FID_Group)
        .input("TC_FDateReg", this.sql.NVarChar, data.TC_FDateReg)
        .input("TC_FTimeReg", this.sql.NVarChar, data.TC_FTimeReg)
        .input("TC_FYear", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("TC_FUserReg", this.sql.BigInt, data.TC_FUserReg)
        // User
        .input("User", this.sql.BigInt, User)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TCategory_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id, User) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, "TCategory")
        .input("FID", this.sql.Int, id)
        // User
        .input("User", this.sql.BigInt, User)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TDefault_Del");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findById(id) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "MainGroup_TCategory")
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.BigInt, id)
        .execute("USP_TCategory_Select");
      return result.recordset[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findByGroupId(groupId, show = 1) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "Detail_TCategory")
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("Show", this.sql.Int, show)
        .input("FID_Group", this.sql.BigInt, groupId)
        .execute("USP_TCategory_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findByGroupIdForTable(groupId) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "List_TCategory")
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID_Group", this.sql.BigInt, groupId)
        .execute("USP_TCategory_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getCategoriesForCombo() {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, "Combo_TCategory")
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .execute("USP_TCategory_Select");
      return result.recordset;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new CategoryModel();
