import path from "path";
import Model from "../Model";

class userSalePageModel extends Model {
  constructor() {
    super();
  }

  async getProductViewData() {
    let data = {
      pageSaleList: [],
      menu_category: [],
      index_category: [],
    };

    data.pageSaleList = await this.getSalePageList()
    data.menu_category = await this.getDefault(273)
    data.index_category = await this.getDefault(275)

    return data
  }

  async getSalePageList() {
    try {

      //   var sqlQuery = `
      // SELECT TPS_FID, TPS_FTitle, TPS_FLink, TPS_FIDs_CategoryIndex, TPS_FIDs_Category
      //   ,ROW_NUMBER() OVER(ORDER BY TPS_FID) AS TPS_FROWNUM
      //   FROM V_TPageSale
      //   WHERE TPS_FActive=1

      // SELECT TPIC_FID,TPIC_FID_Parent,TPIC_FName,TPIC_FAddress,TPIC_FOrder,TPIC_FDelete,TPIC_FComment
      //   FROM [V_TPicture]
      //   where TPIC_FForm='pageSale' and TPIC_FOrder=0 
      //   `
      var sqlQuery = `
    SELECT TPS_FID, TPS_FTitle, TPS_FLink, TPS_FIDs_CategoryIndex, TPS_FIDs_Category
		  ,ROW_NUMBER() OVER(ORDER BY TPS_FID) AS TPS_FROWNUM
		  FROM V_TPageSale
      WHERE TPS_FActive=1
      
    SELECT TPU_FID_Picture,TPU_FID_Parent,TPU_FName,TPU_FAddress,TPU_FOrder,TPU_FAlt
      FROM [V_TPictureUse]
      where [TPU_FID_State]=2400101
      `
      const db_result = await this.Database.request().query(sqlQuery);

      if (db_result.recordsets[0].length > 0) {
        db_result.recordsets[0].forEach(page => {
          let pic = db_result.recordsets[1].find(p => Number(p.TPU_FID_Parent) == Number(page.TPS_FID))

          if (pic) {
            const index = pic.TPU_FAddress.indexOf(pic.TPU_FName);

            page.picture = {
              TPIC_FID: pic.TPU_FID_Picture,
              TPIC_FName: pic.TPU_FName.substr(0, pic.TPU_FName.lastIndexOf('.')),
              path: path.normalize(pic.TPU_FAddress),
              thumbnail_path: pic.TPU_FAddress.substring(0, index) + 'sm-' + pic.TPU_FAddress.substring(index),
              TPIC_FOrder: pic.TPU_FOrder,
              alt: pic.TPU_FAlt,
            }
          }
        })

        return db_result.recordsets[0]
      }

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getDefault(TD_FID_Group) {
    try {
      var sqlQuery = `
    SELECT TD_FID,TD_FName,TD_FComment,TD_FSubGroup
		  FROM V_TDefault
		  WHERE (TD_FID_Group = ${TD_FID_Group} and TD_FActive = 1)
		  ORDER BY TD_FOrder ,TD_FID 
    `

      const db_result = await this.Database.request().query(sqlQuery);

      if (db_result.recordsets[0].length > 0) {
        const withSub = db_result.recordsets[0].filter(c => c.TD_FSubGroup == 1)
        for (var i = 0; i <= withSub.length - 1; i++) {
          withSub[i].children = await this.getDefault(withSub[i].TD_FID)
        }

        return db_result.recordsets[0]
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getSiteMap(type) {
    try {
      if (type == 'salePage') {
        var sqlQuery = ` select TPS_FLink from V_TPageSale where TPS_FActive=1`
        const db_result = await this.Database.request().query(sqlQuery);
        return db_result.recordset
      }
      else if (type == 'category') {
        var sqlQuery = ` select TD_FCaption from V_TDefault where (TD_FID_Group=273 or TD_FID_Group=275) and TD_FActive = 1 and TD_FCaption<>'' `
        const db_result = await this.Database.request().query(sqlQuery);
        return db_result.recordset
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new userSalePageModel();
