import Model from "../Model";



class likeModel extends Model {
    constructor(){
        super();
    }

    async save (state , data){
        try {
            let RetID;
            let RetMsg;
            let ReturnFID;
              
              const result = await this.Database.request()
              .input("state" , this.sql.NVarChar , state)
              .input("TUL_FID" , this.sql.BigInt , data.TUL_FID)
              .input("TUL_FUserReg" , this.sql.Int , data.TUL_FUserReg)
              .input("TUL_FID_Item" , this.sql.Int , data.TUL_FID_Item)
              .input("TUL_FType" , this.sql.TinyInt , data.TUL_FType)

    
              .output("RetID", this.sql.BigInt, RetID)
              .output("RetMsg", this.sql.NVarChar, RetMsg)
              .output("ReturnFID", this.sql.BigInt, ReturnFID)
              .execute("USP_TUserLike");
            return result;
          
        
          
          } catch (error) {
            console.log(error)
          }
    }

    async get(state ,user , likeType){
        try{
          let RetID;
          let RetMsg;
          let ReturnFID;
          
            const result = await this.Database.request()
            .input("state", this.sql.NVarChar, state )
            .input("TUL_FUserReg", this.sql.Int, user )
            .input("TUL_FType", this.sql.BigInt, likeType )
            .output("RetID", this.sql.BigInt, RetID)
            .output("RetMsg", this.sql.NVarChar, RetMsg)
            .output("ReturnFID", this.sql.BigInt, ReturnFID)
            .execute("USP_TUserLike");
            // console.log(result)
            return result.recordset;

        }catch(error){
            console.log(error);
            
        }
    }

    async delete (state , likedRowId){
        try {
          let RetID;
          let RetMsg;
          let ReturnFID;
    
          
          const result = await this.Database.request()
          .input("state", this.sql.NVarChar, state )
          .input("TUL_FID", this.sql.BigInt, likedRowId )
          .output("RetID", this.sql.BigInt, RetID)
          .output("RetMsg", this.sql.NVarChar, RetMsg)
          .output("ReturnFID", this.sql.BigInt, ReturnFID)
          .execute("USP_TUserLike");
    
          return result;
        } catch (error) {
          console.log(error);
          
        }
    }
    
}


export default new likeModel();