import Model from "../Model";
import DefaultModel from "../defaultModel";
import Date from "../../helper/date";
import File from "../../helper/file";
import path from "path";
import pageSaleManageModel from "./pageSaleModels/pageSaleManageModel";
import pageSaleContentManageModel from "./pageSaleModels/pageSaleContentManageModel";
import pageSaleInsertModel from "./pageSaleModels/pageSaleInsertModel";
import pageSaleUpdateModel from "./pageSaleModels/pageSaleUpdateModel";

class PageSellModel extends Model {
  constructor() {
    super();
  }

  async save(data, User, state: string) {
    switch (state) {
      case "Insert":
        return await pageSaleInsertModel.insert(data, User);

      case "Update":
        return await pageSaleUpdateModel.update(data, User);

      case "UpdateManage":
        return await pageSaleManageModel.update(data, User);
    }
  }

  //#region select
  async get(state: string, idPageSale: string = "0", idOption = 0) {
    if (state == "TPageSaleFID") {
      return this.get_show(idPageSale);
    } else if (state == "manage") {
      return pageSaleManageModel.get_show(idPageSale);
    } else if (state == "contentManage") {
      return pageSaleContentManageModel.get_show(idPageSale);
    } else {
      return this.get_list(state, idPageSale, idOption);
    }
  }

  // state: TGoodsFID_Pan - TGoodsList_Pan
  async get_list(state: string, idPageSale: string = "0", idOption = 0) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID", this.sql.BigInt, idPageSale)
        .input("FID_Option", this.sql.BigInt, idOption)
        .execute("USP_TPage_Select");

      if (
        state == "TPageSaleFID" ||
        state == "TPageGoodsFID" ||
        state == "TPageOptionFID"
      ) {
        return result.recordset[0];
      } else if (
        state == "TPageSaleList" ||
        state == "TPageGoodsList" ||
        state == "TPageOptionList" ||
        state == "TPageOptionValueListAll" ||
        state == "TPageOptionValueList"
      ) {
        return result.recordset;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async get_show(idPageSale: string = "0") {
    try {
      var sqlQuery = `
    select * from V_TPageSale
    where TPS_FID=${idPageSale}

    select * from V_TDefault
    where saleid=${idPageSale}
    order by TD_FOrder asc

    select * from V_TGoods
    where saleid=${idPageSale} and (TGO_FDelete = 0)

    select * from [TGoodsOptionValue]
    where saleid=${idPageSale} and (TGPV_FDelete = 0)

    select * from V_TGoods
    where TGO_FID in (
      select TGPV_FID_Goods from [V_TGoodsOptionValue]
      where saleid=${idPageSale}
    )

    SELECT *
      FROM [V_TPicture]
      where TPIC_FForm='pageSale' and TPIC_FID_Parent=${idPageSale}
      order by TPIC_FOrder asc


      SELECT *
      FROM [V_TPicture]
      where TPIC_FForm='optionImage'
      order by TPIC_FOrder asc

      SELECT *
      FROM [V_TPicture]
      where TPIC_FForm='product'
      order by TPIC_FOrder asc
          `;

      const db_result = await this.Database.request().query(sqlQuery);

      if (db_result.recordsets[0].length > 0) {
        var obj = this.create_object(db_result);

        return obj;
      } else {
        console.log("salepage not found");
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
      //roleback
    }
  }

  async create_object(db_result) {
    try {
      //#region values
      const TPageSale = db_result.recordsets[0];
      const TDefault = db_result.recordsets[1];
      const TProducts = db_result.recordsets[2];
      const TGoodsOptionValue = db_result.recordsets[3];
      const TGoods = db_result.recordsets[4];
      const TPicture = db_result.recordsets[5];
      const TOptionPicture = db_result.recordsets[6];
      const TProductPicture = db_result.recordsets[7];

      var obj = TPageSale[0];
      //#endregion

      //#region تعداد
      if (obj.TPS_FIDs_NumberList)
        obj.TPS_FIDs_NumberList = obj.TPS_FIDs_NumberList.split(",")
          .map((entry) => parseInt(entry))
          .filter((entry) => typeof entry === "number");

      if (obj.TPS_FIDs_NumberList == "") {
        obj.TPS_FIDs_NumberList = [];
      }
      //#endregion

      //#region دسته بندی
      if (obj.TPS_FIDs_Category)
        obj.TPS_FIDs_Category = obj.TPS_FIDs_Category.split(",")
          .map((entry) => parseInt(entry))
          .filter((entry) => typeof entry === "number");

      if (!obj.TPS_FIDs_Category || obj.TPS_FIDs_Category == "") {
        obj.TPS_FIDs_Category = [];
      }

      if (obj.TPS_FIDs_CategoryIndex)
        obj.TPS_FIDs_CategoryIndex = obj.TPS_FIDs_CategoryIndex.split(",")
          .map((entry) => parseInt(entry))
          .filter((entry) => typeof entry === "number");

      if (!obj.TPS_FIDs_CategoryIndex || obj.TPS_FIDs_CategoryIndex == "") {
        obj.TPS_FIDs_CategoryIndex = [];
      }
      //#endregion

      //#region محصولات مرتبط
      if (obj.TPS_FIDs_PageRelation)
        obj.TPS_FIDs_PageRelation = obj.TPS_FIDs_PageRelation.split(",")
          .map((entry) => parseInt(entry))
          .filter((entry) => typeof entry === "number");

      if (obj.TPS_FIDs_PageRelation == "") {
        obj.TPS_FIDs_PageRelation = [];
      }
      //#endregion

      //#region دسته کیفی
      if (obj.TPS_FIDs_Quality)
        obj.TPS_FIDs_Quality = obj.TPS_FIDs_Quality.split(",")
          .map((entry) => parseInt(entry))
          .filter((entry) => typeof entry === "number");

      if (obj.TPS_FIDs_Quality == "") {
        obj.TPS_FIDs_Quality = [];
      }
      //#endregion

      //#region روت اصلی تعاریف پایه
      var default_root = TDefault.find((d) => d.TD_FID_Group == 220);

      if (default_root) obj.rootObject_id = default_root.TD_FID;
      //#endregion

      obj.all_children = [];
      obj.all_dependecy = [];
      obj.all_product_children = db_result.recordsets[3];

      var options = TDefault.filter(
        (d) => d.TD_FID_Group == default_root.TD_FID
      );
      obj.options = options;
      obj.options.forEach((option) => {
        var children = TDefault.filter((d) => d.TD_FID_Group == option.TD_FID);
        option.children = children;

        option.children.forEach((child) => {
          //#region  child Picture
          const p = TOptionPicture.find(
            (p) => p.TPIC_FID_Parent == child.TD_FID
          );

          if (p) {
            child.picture = {
              TPIC_FID: p.TPIC_FID,
              TPIC_FName: p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf(".")),
              path: path.normalize(p.TPIC_FAddress),
              thumbnail_path: path.normalize(
                path.join(path.dirname(p.TPIC_FAddress), "sm-" + p.TPIC_FName)
              ),
              TPIC_FOrder: p.TPIC_FOrder,
              TPIC_FDelete: p.TPIC_FDelete,
              alt: p.TPIC_FComment,
            };
          }

          //#endregion

          obj.all_children.push(child);

          if (child.dependecy != "") {
            child.dependecy = child.dependecy
              .split(",")
              .map((entry) => parseInt(entry))
              .filter((entry) => typeof entry === "number");

            child.dependecy.forEach((dep) => {
              var parent_option = TDefault.find(
                (d) => d.TD_FID == child.TD_FID
              );
              var dep_option = TDefault.find((d) => d.TD_FID == dep);

              if (parent_option && dep_option) {
                obj.all_dependecy.push({
                  parent_optionId: parent_option.TD_FID_Group,
                  parent_id: child.TD_FID,

                  dep_optionId: dep_option.TD_FID_Group,
                  dep_id: dep,
                });

                obj.all_dependecy.push({
                  parent_optionId: dep_option.TD_FID_Group,
                  parent_id: dep,

                  dep_optionId: parent_option.TD_FID_Group,
                  dep_id: child.TD_FID,
                });
              }
            });
          } else {
            child.dependecy = [];
          }
        });
      });

      TGoodsOptionValue.forEach((v) => {
        var goods = TGoods.filter((g) => g.TGO_FID == v.TGPV_FID_Goods);
        if (goods.length > 0) v.realted_good = goods[0];
      });

      obj.products = TProducts;
      obj.products.forEach((product) => {
        var options = TGoodsOptionValue.filter(
          (v) => v.TGPV_FID_Product == product.TGO_FID
        );
        product.options = options;

        //#region  product Picture
        product.gallery = [];
        const pictures = TProductPicture.filter(
          (p) => p.TPIC_FID_Parent == product.TGO_FID
        );

        pictures.forEach((p) => {
          if (p && p.TPIC_FAddress && p.TPIC_FName) {
            product.gallery.push({
              TPIC_FID: p.TPIC_FID,
              TPIC_FName: p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf(".")),
              path: path.normalize(p.TPIC_FAddress),
              thumbnail_path: path.normalize(
                path.join(path.dirname(p.TPIC_FAddress), "sm-" + p.TPIC_FName)
              ),
              TPIC_FOrder: p.TPIC_FOrder,
              TPIC_FDelete: p.TPIC_FDelete,
              alt: p.TPIC_FComment,
            });
          }
        });
        //#endregion
      });

      //#region گالری تصاویر
      obj.gallery = [];

      if (TPicture && TPicture.length > 0) {
        if (
          TPicture[0] &&
          TPicture[0].TPIC_FAddress &&
          TPicture[0].TPIC_FName
        ) {
          obj.picture = {
            TPIC_FID: TPicture[0].TPIC_FID,
            TPIC_FName: TPicture[0].TPIC_FName.substr(
              0,
              TPicture[0].TPIC_FName.lastIndexOf(".")
            ),
            path: path.normalize(TPicture[0].TPIC_FAddress),
            thumbnail_path: path.normalize(
              path.join(
                path.dirname(TPicture[0].TPIC_FAddress),
                "sm-" + TPicture[0].TPIC_FName
              )
            ),
            TPIC_FOrder: TPicture[0].TPIC_FOrder,
            TPIC_FDelete: TPicture[0].TPIC_FDelete,
            alt: TPicture[0].TPIC_FComment,
          };
        }

        TPicture.forEach((p) => {
          if (p && p.TPIC_FAddress && p.TPIC_FName) {
            obj.gallery.push({
              TPIC_FID: p.TPIC_FID,
              TPIC_FName: p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf(".")),
              path: path.normalize(p.TPIC_FAddress),
              thumbnail_path: path.normalize(
                path.join(path.dirname(p.TPIC_FAddress), "sm-" + p.TPIC_FName)
              ),
              TPIC_FOrder: p.TPIC_FOrder,
              TPIC_FDelete: p.TPIC_FDelete,
              alt: p.TPIC_FComment,
            });
          }
        });
      }
      //#endregion

      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async getid(flink: string) {
    try {
      const res = await this.Database.request().query(
        `select [TPS_FID] from [dbo].[TPageSale] where [TPS_FLink]='${flink}' `
      );

      if (res.recordsets.length > 0) {
        return res.recordsets[0][0].TPS_FID;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getbyflink(flink: string) {
    try {
      const res = await this.Database.request().query(
        `select [TPS_FID] from [dbo].[TPageSale] where [TPS_FLink]='${flink}' `
      );

      if (res.recordsets.length > 0) {
        const idPageSale = res.recordsets[0][0].TPS_FID;

        return this.get_show(idPageSale);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //#endregion

  //#region delete

  async delete(id: string, User: number, state) {
    if (state == "TPageSale") {
      const result = await this.delete_TPageSale(id);

      if (result) {
        var obj = {
          output: {
            RetID: 1,
            RetMsg: "عملیات حذف با موفقیت انجام شد",
          },
        };

        return obj;
      }
    }
  }

  async delete_TPageSale(id: string) {
    try {
      var sqlQuery = `
    update TPageSale
    set TPS_FDelete = 1
    where TPS_FID=${id}

    update TDefault
    set TD_FDelete = 1
    where saleid=${id}

    update TGoods
    set TGO_FDelete = 1
    where saleid=${id}

    update [TGoodsOptionValue]
    set TGPV_FDelete = 1
    where saleid=${id}
    `;

      const db_result = await this.Database.request().query(sqlQuery);

      if (db_result) {
        return db_result;
      }
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  //#endregion

  // async delete(id: string, User: number) {
  //   try {
  //     let RetID;
  //     let RetMsg;
  //     const result = await this.Database.request()
  //       .input("TableName", this.sql.NVarChar, "TGoods")
  //       .input("FID", this.sql.Int, id)
  //       .input("User", this.sql.BigInt, User)
  //       .output("RetID", this.sql.BigInt, RetID)
  //       .output("RetMsg", this.sql.NVarChar, RetMsg)
  //       .execute("USP_TGoods_Del");
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  /*optimization tab */

  /***************************Goods */
  async saveGoods(data, User, state: string) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TPG_FID", this.sql.Int, data.TPG_FID)
        .input("TPG_FActive", this.sql.Int, data.TPG_FActive)
        .input("TPG_FDefault", this.sql.TinyInt, data.TPG_FDefault)
        .input("TPG_FUserReg", this.sql.Int, data.TPG_FUserReg)
        .input("TPG_FDateReg", this.sql.NVarChar, data.TPG_FDateReg)
        .input("TPG_FDelete", this.sql.TinyInt, data.TPG_FDelete)
        .input("TPG_FID_Goods", this.sql.Int, data.TPG_FID_Goods)
        .input("TPG_FID_PageSale", this.sql.Int, data.TPG_FID_PageSale)

        // .outpTPG_FID_PageSale

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TPageGoods_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /***************************options */

  async saveOption(data, User, state: string) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TPP_FID", this.sql.Int, data.TPP_FID)
        .input("TPP_FID_Option", this.sql.Int, data.TPP_FID_Option)
        .input("TPP_FID_Type", this.sql.Int, data.TPP_FID_Type)
        .input("TPP_FOrder", this.sql.TinyInt, data.TPP_FOrder)
        .input("TPP_FCaption", this.sql.NVarChar, data.TPP_FCaption)
        .input("TPP_FFix", this.sql.TinyInt, data.TPP_FFix)
        .input("TPP_FActive", this.sql.Int, data.TPP_FActive)
        .input("TPP_FIDs_Value", this.sql.Int, data.TPP_FIDs_Value)
        .input("TPP_FID_Default", this.sql.Int, data.TPP_FID_Default)
        .input("TPP_FDateReg", this.sql.NVarChar, data.TPP_FDateReg)
        .input("TPP_FDelete", this.sql.TinyInt, data.TPP_FDelete)
        .input("TPP_FUserReg", this.sql.Int, data.TPP_FUserReg)
        .input("TPP_FID_PageSale", this.sql.Int, data.TPP_FID_PageSale)

        // .input("TPG_FID_PageSale", this.sql.BigInit,result.output.ReturnFID)
        // .input("State", this.sql.NVarChar, state)
        // .input("State", this.sql.NVarChar, state)
        // .input("State", this.sql.NVarChar, state)
        // .input("State", this.sql.NVarChar, state)

        // .outpTPG_FID_PageSale

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TPageOption_Ins");
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new PageSellModel();
