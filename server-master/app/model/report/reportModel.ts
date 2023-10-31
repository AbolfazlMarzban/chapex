import Model from "../Model";
class reportModel extends Model {
    constructor() {
      super();
    }
   
    async getReport(state, id = "0" , user = 0) { 
        try {
            const result = await this.Database.request()
            .input("State", this.sql.NVarChar, state)
            .input("FID", this.sql.Int, id)
            .input("User", this.sql.BigInt , user)

            .execute("USP_TGoods_Report");
            return result.recordset;
        } catch (error) {
            console.log(error);
            
        }
    }

    async getChart(state, goodsId , timeRange , priceType,todayTime) { 
        try {
     
            
            const result = await this.Database.request()
            .input("State", this.sql.NVarChar, state)
            .input("DateToday", this.sql.NVarChar, todayTime)
            .input("FID", this.sql.Int, goodsId)
            .input("TimeRenge", this.sql.NVarChar, timeRange)
            .input("TypePrice", this.sql.Int, priceType)
            .execute("USP_TGoods_Report");
            // console.log(result);
            
            return result.recordset;
        } catch (error) {
            console.log(error);
            
        }
    }
  
}
export default new reportModel();
