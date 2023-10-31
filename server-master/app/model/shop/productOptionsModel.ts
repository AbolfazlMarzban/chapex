// import Model from "../Model";

// class PageSellModel extends Model {
//   constructor() {
//     super();
//   }
//   async save(data, User, state: string) {
//     try {
//       let RetID;
//       let RetMsg;
//       let ReturnFID;
//       const result = await this.Database.request()
        
       
       
//         .input("TPS_FID", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FTitle", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FLink", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FIDs_Category", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FIDs_PageRelation", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FCaption", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FDetails", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FComment", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FDesign", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FQuestion", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FIntroduction", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FIDs_Quality", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FSEO1", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FSEO2", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FSEOProp", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FSEONetwork", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FActive", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FUserReg", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FDateReg", this.sql.Int, data.TGO_FID_ShowDesign)
//         .input("TPS_FDelete", this.sql.Int, data.TGO_FID_ShowDesign)
      
//         .output("RetID", this.sql.BigInt, RetID)
//         .output("RetMsg", this.sql.NVarChar, RetMsg)
//         .output("ReturnFID", this.sql.BigInt, ReturnFID)
//         .execute("USP_TPageSale_Ins");
//       return result;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   }

//   // state: TGoodsFID_Pan - TGoodsList_Pan
//   async get(state: string, id: string = "0") {
//     try {
//       const result = await this.Database.request()
//         .input("State", this.sql.NVarChar, state)
//         .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
//         .input("FID", this.sql.BigInt, id)
//         .execute("USP_TPage_Select");
//         return result.recordset;

//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   }

//   // async delete(id: string, User: number) {
//   //   try {
//   //     let RetID;
//   //     let RetMsg;
//   //     const result = await this.Database.request()
//   //       .input("TableName", this.sql.NVarChar, "TGoods")
//   //       .input("FID", this.sql.Int, id)
//   //       .input("User", this.sql.BigInt, User)
//   //       .output("RetID", this.sql.BigInt, RetID)
//   //       .output("RetMsg", this.sql.NVarChar, RetMsg)
//   //       .execute("USP_TGoods_Del");
//   //     return result;
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // }
  



// }

// export default new PageSellModel();
