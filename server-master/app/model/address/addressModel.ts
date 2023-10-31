

import Model from "../Model";

class addressModel extends Model {
  constructor() {
    super();
  }
  async getInit(state, userId) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.BigInt, userId)
        .execute("USP_TUser_Select");
      return result.recordset;


    } catch (error) {
      console.log(error);
    }
  }

  async getCount(userId) {
    try {
      var sqlQuery = `
        SELECT count(TUA_FID) as count
		      FROM V_TUserAddress
		      WHERE TUA_FID_User = ${userId}
        `
      const result = await this.Database.request().query(sqlQuery);

      if (result)
        return result.recordset[0].count


    } catch (error) {
      console.log(error);
    }
  }

  async save(state, data, userId) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      // console.log(userId , "in model");


      const result = await this.Database.request()
        .input("state", this.sql.NVarChar, state)
        .input("TUA_FID", this.sql.BigInt, data.TUA_FID)
        .input("TUA_FID_User", this.sql.BigInt, userId)
        .input("TUA_FID_City1", this.sql.Int, data.TUA_FID_City1)
        .input("TUA_FID_City2", this.sql.Int, data.TUA_FID_City2)
        .input("TUA_FPlace", this.sql.NVarChar, data.TUA_FPlace)
        .input("TUA_FAddress", this.sql.NVarChar, data.TUA_FAddress)
        .input("TUA_FPlates", this.sql.NVarChar, data.TUA_FPlates)
        .input("TUA_FUnit", this.sql.NVarChar, data.TUA_FUnit)
        .input("TUA_FPost", this.sql.NVarChar, data.TUA_FPost)
        .input("TUA_FMapX", this.sql.NVarChar, data.TUA_FMapX)
        .input("TUA_FMapY", this.sql.NVarChar, data.TUA_FMapY)
        .input("TUA_FTell1", this.sql.NVarChar, data.TUA_FTell1)
        .input("TUA_FTell2", this.sql.NVarChar, data.TUA_FTell2)
        .input("TUA_FName", this.sql.NVarChar, data.TUA_FName)
        .input("TUA_FCodeMeli", this.sql.NVarChar, data.TUA_FCodeMeli)
        .input("TUA_FUserReg", this.sql.Int, data.TUA_FUserReg)
        .input("TUA_FActive", this.sql.TinyInt, data.TUA_FActive)
        .input("TUA_FDelete", this.sql.TinyInt, data.TUA_FDelete)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TUserAddress_Ins");
      return result;


    } catch (error) {
      console.log(error)
    }
  }

  async delete(tableName, addressId) {
    try {
      let RetID;
      let RetMsg;

      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, tableName)
        .input("FID", this.sql.BigInt, addressId)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TUser_Del");

      return result;

    } catch (error) {
      console.log(error);
    }
  }


  async getToEdit(state, addressRowId) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.BigInt, addressRowId)
        .execute("USP_TUser_Select");
      return result.recordset[0];


    } catch (error) {
      console.log(error);
    }
  }


  async update(state, data) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;

      const result = await this.Database.request()
        .input("state", this.sql.NVarChar, state)
        .input("TUA_FID", this.sql.BigInt, data.TUA_FID)
        .input("TUA_FID_User", this.sql.BigInt, data.TUA_FID_User)
        .input("TUA_FID_City1", this.sql.Int, data.TUA_FID_City1)
        .input("TUA_FID_City2", this.sql.Int, data.TUA_FID_City2)
        .input("TUA_FPlace", this.sql.NVarChar, data.TUA_FPlace)
        .input("TUA_FAddress", this.sql.NVarChar, data.TUA_FAddress)
        .input("TUA_FPlates", this.sql.NVarChar, data.TUA_FPlates)
        .input("TUA_FUnit", this.sql.NVarChar, data.TUA_FUnit)
        .input("TUA_FPost", this.sql.NVarChar, data.TUA_FPost)
        .input("TUA_FMapX", this.sql.NVarChar, data.TUA_FMapX)
        .input("TUA_FMapY", this.sql.NVarChar, data.TUA_FMapY)
        .input("TUA_FTell1", this.sql.NVarChar, data.TUA_FTell1)
        .input("TUA_FTell2", this.sql.NVarChar, data.TUA_FTell2)
        .input("TUA_FName", this.sql.NVarChar, data.TUA_FName)
        .input("TUA_FCodeMeli", this.sql.NVarChar, data.TUA_FCodeMeli)
        .input("TUA_FUserReg", this.sql.Int, data.TUA_FUserReg)
        .input("TUA_FActive", this.sql.TinyInt, data.TUA_FActive)
        .input("TUA_FDelete", this.sql.TinyInt, data.TUA_FDelete)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TUserAddress_Ins");
      return result;


    } catch (error) {
      console.log(error)
    }
  }


  async getInfo(address) {
    try {
      let data = {
        postalCode: '',
        city: '',
        province: ''
      }
      const sql = `SELECT [TUA_FID_City1], [TUA_FID_City2], [TUA_FPost] FROM [dbo].[TUserAddress] WHERE [TUA_FID] = ${address}`
      const result = await this.Database.request().query(sql)
      if (result) {
        data.postalCode = result.recordset[0].TUA_FPost
        const provinceID = result.recordset[0].TUA_FID_City1
        const cityID = result.recordset[0].TUA_FID_City2
        const provinceQuery = `SELECT [TD_FName] FROM [dbo].[TDefault] WHERE [TD_FID] = ${provinceID}`
        const cityQuery = `SELECT [TD_FName] FROM [dbo].[TDefault] WHERE [TD_FID] = ${cityID}`
        const provRes = await this.Database.request().query(provinceQuery)
        const nameRes = await this.Database.request().query(cityQuery)
        data.province = provRes.recordset[0].TD_FName
        data.city = nameRes.recordset[0].TD_FName
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }


}

export default new addressModel();
