import Model from "../../Model";
import Date from "../../../helper/date";
import DefaultModel from "../../defaultModel";
import pageSaleInsertModel from "./pageSaleInsertModel";

class pageSaleManageModel extends Model {
  constructor() {
    super();
  }

  async get_show(idPageSale: string = "0") {
    try {
      var sqlQuery = `
        select 
            [TPS_FID],
            [TPS_FTitle],
            [TPS_FIDs_NumberList],
            [TPS_FID_NumberType],
            [TPS_FNumberDefault],
            [TPS_FNumberMin],
            [TPS_FNumberMax],
            [TPS_FNumberStep]
        from V_TPageSale
        where TPS_FID=${idPageSale}
    
        select 
            [TD_FID],
            [TD_FID_Group],
            [TD_FName],
            [TD_FType],
            [TD_FOrder],
            [TD_FDelete],
            [TD_FDeleted],
            [TD_FActive],
            [TD_FDefault],
            [TD_FRequired],
            [TD_FShow],
            [TD_FCaption],
            [TD_FUserViewType],
            [TD_ActionToBgSet],
            [TD_FActionToDeps],
            [TD_FHideOnAloneSet],
            [TD_FSystem],
            [TD_FFormType],
            [TD_FFormTypeAll],
            [TD_FSubGroup],
            [TD_FEdited],
            [TD_FInserted],
            [dependecy],
            [saleid]
        from V_TDefault
        where saleid=${idPageSale}
        order by TD_FOrder asc
    

        select *
        from V_TGoods
            where (saleid=${idPageSale} or TGO_FID in (
                select TGPV_FID_Goods from [V_TGoodsOptionValue]
                    where saleid=${idPageSale}
                )) and (TGO_FDelete = 0) 
                order by TGO_FOrder
    
        select * from [TGoodsOptionValue]
        where saleid=${idPageSale} and (TGPV_FDelete = 0)
    
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
      const TGoods = db_result.recordsets[2];
      const TGoodsOptionValue = db_result.recordsets[3];

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

      //#region روت اصلی تعاریف پایه
      var default_root = TDefault.find((d) => d.TD_FID_Group == 220);

      if (default_root) obj.rootObject_id = default_root.TD_FID;
      //#endregion

      //#region خصوصیات
      var options = TDefault.filter(
        (d) => d.TD_FID_Group == default_root.TD_FID
      );
      obj.options = options;
      //#endregion

      //#region مقادیر خصوصیات
      obj.optionsValues = [];

      obj.options.forEach((option) => {
        var children = TDefault.filter((d) => d.TD_FID_Group == option.TD_FID);

        children.forEach((child) => {
          //#region وابستگی ها
          if (child.dependecy != "") {
            child.dependecy = child.dependecy
              .split(",")
              .map((entry) => parseInt(entry))
              .filter((entry) => typeof entry === "number");
          } else {
            child.dependecy = [];
          }
          //#endregion

          obj.optionsValues.push(child);
        });
      });
      //#endregion

      //#region محصولات
      obj.products = TGoods.filter((g) => g.saleid == obj.TPS_FID);
      for (var i = 0; i <= obj.products.length - 1; i++) {
        obj.products[i].TGO_FOrder = i;
        obj.products[i].TGO_FTag = Number(obj.products[i].TGO_FTag);
        obj.products[i].TGO_FSlug = Number(obj.products[i].TGO_FSlug);
      }
      obj.productsOptionValue = TGoodsOptionValue;
      //#endregion

      return obj;
    } catch (error) {
      console.log(error);
    }
  }

  async update(salePage, User) {
    var error_result = {
      status: 422,
      ret_data: salePage,
      error: true,
      mesages: ["خطا در ذخیره سازی!"],
    };

    var succesFlag = false;
    try {
      await pageSaleInsertModel.assign_newids(salePage.rootObject_id, salePage);
      const salePage_result = await this.update_salePage(salePage);
      if (salePage_result) {
        const options_result = await this.update_options(salePage, User);
        if (options_result) {
          const optionValue_result = await this.update_optionValue(
            salePage,
            User
          );
          if (optionValue_result) {
            const products_result = await this.update_products(
              salePage,
              User
            );
            if (products_result) {
              const productOptionValue_result = await this.update_productOptionValue(
                salePage
              );
              if (productOptionValue_result) {
                const deleteIfOptionDeleted_result = await this.deleteIfOptionDeleted(
                  salePage
                );
                if (deleteIfOptionDeleted_result) {
                  const deleteIfProductDeleted_result = await this.deleteIfProductDeleted(
                    salePage
                  );
                  if (deleteIfProductDeleted_result) {
                    succesFlag = true;
                  }
                }
              }
            }
          }
        }

      }

      var success_result = {
        status: 200,
        error: false,
        mesages: ["ذخیره شد"],
      };

      if (succesFlag) return success_result;
    } catch (error) {
      console.log(error);
      return error_result;
    }
  }

  async update_salePage(salePage) {
    try {
      var sqlQuery = ` 
        UPDATE [dbo].[TPageSale] SET 
             [TPS_FID_NumberType] = N'${salePage.TPS_FID_NumberType}' 
            ,[TPS_FIDs_NumberList] = '${salePage.TPS_FIDs_NumberList}' 
            ,[TPS_FNumberDefault] = ${salePage.TPS_FNumberDefault}
            ,[TPS_FNumberMin] = ${salePage.TPS_FNumberMin}
            ,[TPS_FNumberMax] = ${salePage.TPS_FNumberMax} 
            ,[TPS_FNumberStep] = ${salePage.TPS_FNumberStep} 
        WHERE  [TPS_FID] = '${salePage.TPS_FID}' `;

      const salePage_result = await this.Database.request().query(sqlQuery);
      return salePage_result;
    } catch (error) {
      console.log("update_salePage", error);
      return null;
    }
  }

  async update_options(salePage, User) {
    try {
      var sqlQuery = "";

      if (salePage.options && salePage.options.length > 0) {
        var counter = 0;

        const sel = await this.Database.request().query(
          `select count(TD_FID) as c from TDefault where saleid=${salePage.TPS_FID} and TD_FID_Group=${salePage.rootObject_id}`
        );
        if (sel) {
          counter = sel.recordset[0]["c"];
        }

        for (var i = 0; i <= salePage.options.length - 1; i++) {
          var option = salePage.options[i];

          if (option.isNew) {
            const option_id = salePage.rootObject_id * 100 + counter + 1;
            option.TD_FID = option_id;
            option.TD_FCode = option_id;

            sqlQuery += this._2insert_query(salePage, option, User);
            counter++;
          } else {
            sqlQuery += this._2update_query(option);
          }

          var optionValueCounter = 0;

          const sel = await this.Database.request().query(
            `select count(TD_FID) as c from TDefault where saleid=${salePage.TPS_FID} and TD_FID_Group=${option.TD_FID}`
          );
          if (sel) {
            optionValueCounter = sel.recordset[0]["c"];
          }

          const optionsValues = salePage.optionsValues.filter(
            (op) => op.TD_FID_Group == option.TD_FID
          );
          for (var j = 0; j <= optionsValues.length - 1; j++) {
            const optionValue = optionsValues[j];

            if (optionValue.isNew) {
              const optionValueId =
                option.TD_FID * 100 + optionValueCounter + 1;

              optionValue.TD_FID = optionValueId;
              optionValue.TD_FCode = optionValueId;
              optionValueCounter++;
            }
          }
        }
      }

      const options_result = await this.Database.request().query(sqlQuery);
      return options_result;
    } catch (error) {
      console.log("update_options", error);
      return null;
    }
  }
  _2update_query(option) {
    return ` 
    UPDATE [dbo].[TDefault] SET
         [TD_FName] = N'${option.TD_FName}'
        ,[TD_FOrder] = ${option.TD_FOrder}
        ,[TD_FActive] = ${option.TD_FActive}
        ,[TD_FShow] = ${option.TD_FShow}
        ,[TD_FSystem] = ${option.TD_FSystem}
        ,[TD_FDelete] = ${option.TD_FDelete}
        ,[TD_FFormType] = ${option.TD_FFormType}
        ,[TD_FFormTypeAll] = ${option.TD_FFormTypeAll}
        ,[TD_FSubGroup] = ${option.TD_FSubGroup}
        ,[TD_FDeleted] = ${option.TD_FDeleted}
        ,[TD_FID_Group] = ${option.TD_FID_Group}
        ,[TD_FEdited] = ${option.TD_FEdited}
        ,[TD_FInserted] = ${option.TD_FInserted}
        ,[TD_FRequired] = ${option.TD_FRequired}
        ,[TD_FUserViewType] = ${option.TD_FUserViewType}
        ,[TD_FActionToDeps] = ${option.TD_FActionToDeps}
        ,[TD_FHideOnAloneSet] = ${option.TD_FHideOnAloneSet}
        ,[TD_ActionToBgSet] = ${option.TD_ActionToBgSet}
    WHERE  [TD_FID] = ${option.TD_FID} `;
  }
  _2insert_query(salePage, option, User) {
    var sqlQuery = ` 
    INSERT INTO [dbo].[TDefault] 
      ([TD_FID]
      ,[TD_FCode]
      ,[TD_FName]
      ,[TD_FOrder] 
      ,[TD_FActive] 
      ,[TD_FShow] 
      ,[TD_FSystem] 
      ,[TD_FDelete] 
      ,[TD_FFormType] 
      ,[TD_FFormTypeAll] 
      ,[TD_FSubGroup]
      ,[TD_FDeleted]
      ,[TD_FID_Group]  
      ,[TD_FEdited] 
      ,[TD_FInserted] 
      ,[TD_FDateReg] 
      ,[TD_FYear] 
      ,[TD_FUserReg] 
      ,[saleid]
      ,[TD_FType]
      ,[TD_FRequired]
      ,[TD_FUserViewType]
      ,[TD_FActionToDeps]
      ,[TD_FHideOnAloneSet]
      ,[TD_ActionToBgSet] ) 

     VALUES 
      (${option.TD_FID}
      ,${option.TD_FCode}
      ,N'${option.TD_FName}'
      ,${option.TD_FOrder}
      ,1
      ,1
      ,0
      ,0
      ,${option.TD_FFormType}
      ,${option.TD_FFormTypeAll}
      ,1
      ,0
      ,${salePage.rootObject_id}
      ,0
      ,0
      ,'${new Date().currentDate}'
      ,'${process.env.YEAR_ACCOUNTING}'
      ,${User}
      ,${salePage.TPS_FID}
      ,${option.TD_FType}
      ,${option.TD_FRequired ? option.TD_FRequired : 0}
      ,${option.TD_FUserViewType ? option.TD_FUserViewType : 0}
      ,${option.TD_FActionToDeps ? option.TD_FActionToDeps : 0}
      ,${option.TD_FHideOnAloneSet ? option.TD_FHideOnAloneSet : 0}
      ,${option.TD_ActionToBgSet ? option.TD_ActionToBgSet : 0})
                `;

    // console.log(sqlQuery);
    return sqlQuery;
  }

  async update_optionValue(salePage, User) {
    try {
      var sqlQuery = "";

      if (salePage.optionsValues && salePage.optionsValues.length > 0) {
        for (var j = 0; j <= salePage.optionsValues.length - 1; j++) {
          var optionValue = salePage.optionsValues[j];

          if (!optionValue.isNew) {
            sqlQuery += await this._3update_query(optionValue);
          } else {
            const option = salePage.options.find(
              (o) => o.TD_FID == optionValue.TD_FID_Group
            );
            if (option)
              sqlQuery += await this._3insert_query(
                salePage.TPS_FID,
                option,
                optionValue,
                User
              );
          }
        }
      }
      const optionValue_result = await this.Database.request().query(sqlQuery);
      return optionValue_result;
    } catch (error) {
      console.log("update_optionValue", error);
      return null;
    }
  }
  async _3update_query(optionValue) {
    return ` 
    UPDATE [dbo].[TDefault] SET
         [TD_FName] = N'${optionValue.TD_FName}'
        ,[TD_FOrder] = ${optionValue.TD_FOrder}
        ,[TD_FActive] = ${optionValue.TD_FActive ? 1 : 0}
        ,[TD_FShow] = 1
        ,[TD_FSystem] = 0
        ,[TD_FDelete] = ${optionValue.TD_FDelete ? 1 : 0}
        ,[TD_FFormType] = 0
        ,[TD_FSubGroup] = 0
        ,[TD_FDeleted] = 0
        ,[TD_FEdited] = 0
        ,[TD_FInserted] = 0
        ,[TD_FDefault]=${optionValue.TD_FDefault ? 1 : 0}
        ,[dependecy]= '${optionValue.dependecy ? optionValue.dependecy : ""}'
    WHERE  [TD_FID] = ${optionValue.TD_FID} `;
  }
  async _3insert_query(salePage_id, option, optionValue, User) {
    var sql = ` 
    INSERT INTO [dbo].[TDefault] 
      ([TD_FID]
      ,[TD_FCode]
      ,[TD_FName]
      ,[TD_FOrder] 
      ,[TD_FActive] 
      ,[TD_FShow] 
      ,[TD_FSystem] 
      ,[TD_FDelete] 
      ,[TD_FFormType] 
      ,[TD_FSubGroup]
      ,[TD_FDeleted]
      ,[TD_FID_Group]  
      ,[TD_FEdited] 
      ,[TD_FInserted] 
      ,[TD_FDateReg] 
      ,[TD_FYear] 
      ,[TD_FUserReg] 
      ,[saleid]
      ,[dependecy]
      ,[TD_FType]
      ,[TD_FDefault] ) 
     VALUES 
      (${optionValue.TD_FID}
      ,${optionValue.TD_FCode}
      ,N'${optionValue.TD_FName}'
      ,${optionValue.TD_FOrder}
      ,${optionValue.TD_FActive ? optionValue.TD_FActive : 0}
      ,1
      ,0
      ,0
      ,0
      ,0
      ,0
      ,${option.TD_FID}
      ,0
      ,0
      ,'${new Date().currentDate}'
      ,'${process.env.YEAR_ACCOUNTING}',${User}
      ,${salePage_id}
      ,'${pageSaleInsertModel.depString(optionValue.dependecy)}'
      ,${option.TD_FType}
      ,${optionValue.TD_FDefault ? optionValue.TD_FDefault : 0}) 
      `;

    return sql;
  }

  async update_products(salePage, User) {
    try {
      var sqlQuery = "";

      if (salePage.products) {
        var counter = 0;
        for (var i = 0; i <= salePage.products.length - 1; i++) {
          if (salePage.products[i]) {
            var product = salePage.products[i];

            //#region insert product
            if (product.isNew) {
              if (product.TGO_FDelete == 0) {
                sqlQuery += await this._4insert_query(
                  salePage.TPS_FID,
                  product,
                  counter
                );
                counter++;
              }
            }
            //#endregion

            //#region update product
            else {
              sqlQuery += await this._4update_query(product);
            }
            //#endregion
          }
        }
      }

      const products_result = await this.Database.request().query(sqlQuery);
      return products_result;
    } catch (error) {
      console.log("update_products", error);
      return null;
    }
  }
  async _4update_query(product) {
    return ` 
    UPDATE [dbo].[TGoods] SET 
        [TGO_FName] = N'${product.TGO_FName}'
       ,[TGO_FCode] = ${product.TGO_FCode}
       ,[TGO_FComment] = N'${product.TGO_FComment}'
       ,[TGO_FHtml] = N'${product.TGO_FHtml}'
       ,[TGO_FBarcode] = N'${product.TGO_FBarcode}'
       ,[TGO_FSlug] = N'${product.TGO_FSlug ? product.TGO_FSlug : ""}'
       ,[TGO_FFormul] = N'${product.TGO_FFormul}'
       ,[TGO_FTag] = N'${product.TGO_FTag ? product.TGO_FTag : ""}'
       ,[TGO_FID_Unit] = ${product.TGO_FID_Unit ? product.TGO_FID_Unit : 0}
       ,[TGO_FID_Type] = ${product.TGO_FID_Type ? product.TGO_FID_Type : 0}
       ,[TGO_FBuyCode] = '${product.TGO_FBuyCode}'
       ,[TGO_FBuyPrice] = ${product.TGO_FBuyPrice}
       ,[TGO_FBuyOff] = ${product.TGO_FBuyOff}
       ,[TGO_FBuyPoint] = ${product.TGO_FBuyPoint}
       ,[TGO_FBuyPercent] = ${product.TGO_FBuyPercent}
       ,[TGO_FBuyLastDate] = '${product.TGO_FBuyLastDate}'
       ,[TGO_FSaleMin] = '${product.TGO_FSaleMin}'
       ,[TGO_FSalePriceMin] = ${product.TGO_FSalePriceMin}
       ,[TGO_FSalePriceMid] = ${product.TGO_FSalePriceMid}
       ,[TGO_FSalePriceMax] = ${product.TGO_FSalePriceMax}
       ,[TGO_FSaleOff] = ${product.TGO_FSaleOff}
       ,[TGO_FSalePriceFix] = ${product.TGO_FSalePriceFix}
       ,[TGO_FSaleLastDate] = '${product.TGO_FSaleLastDate}'
       ,[TGO_FCanChangePrice] = ${product.TGO_FCanChangePrice}
       ,[TGO_FCanSale] = ${product.TGO_FCanSale}
       ,[TGO_FCanOff] = ${product.TGO_FCanOff}
       ,[TGO_FCanTax] = ${product.TGO_FCanTax}
       ,[TGO_FActive] = ${product.TGO_FActive}
       ,[TGO_FArchive] = ${product.TGO_FArchive}
       ,[TGO_FYear] = '${product.TGO_FYear}'
       ,[TGO_FDelete] = ${product.TGO_FDelete}
       ,[TGO_FPicAdd1] = N'${product.TGO_FPicAdd1 ? product.TGO_FPicAdd1 : ""}'
       ,[TGO_FPicAdd2] = N'${product.TGO_FPicAdd2 ? product.TGO_FPicAdd2 : ""}'
       ,[TGO_FPicAdd3] = N'${product.TGO_FPicAdd3 ? product.TGO_FPicAdd3 : ""}'
       ,[TGO_FPicAdd4] = N'${product.TGO_FPicAdd4 ? product.TGO_FPicAdd4 : ""}'
       ,[TGO_FID_Category1] = '${product.TGO_FID_Category1 ? product.TGO_FID_Category1 : ""
      }'
       ,[TGO_FID_Category2] = '${product.TGO_FID_Category2 ? product.TGO_FID_Category2 : ""
      }'
       ,[TGO_FID_Parent] = ${product.TGO_FID_Parent}
       ,[TGO_FSubGroup] = '${product.TGO_FSubGroup}'
       ,[TGO_FID_Account] = '${product.TGO_FID_Account}'
       ,[TGO_FLinkID] = '${product.TGO_FLinkID}'   
       ,[TGO_FCount] = ${product.TGO_FCount}
       ,[TGO_FPicOrder] = '${product.TGO_FPicOrder}' 
       ,[TGO_FLength] = ${product.TGO_FLength}
       ,[TGO_FWidth] = ${product.TGO_FWidth}
       ,[TGO_FBorder] = ${product.TGO_FBorder} 
       ,[TGO_FFormulText] = '${product.TGO_FFormulText}' 
       ,[TGO_FHasOption] = ${product.TGO_FHasOption}
       
       ,[TGO_FID_Unit2] = ${product.TGO_FID_Unit2 ? product.TGO_FID_Unit2 : 0}
       ,[TGO_FCountINUnit] = ${product.TGO_FCountINUnit ? product.TGO_FCountINUnit : 0
      } 
       ,[TGO_FCountINBox] = ${product.TGO_FCountINBox} 
       ,[TGO_FID_TypeBox] = ${product.TGO_FID_TypeBox ? product.TGO_FID_TypeBox : 0
      }
       ,[TGO_FProductionTime] = ${product.TGO_FProductionTime} 
       ,[TGO_FID_TypeSale] = ${product.TGO_FID_TypeSale} 
       ,[TGO_FSaleMax] = ${product.TGO_FSaleMax}
       ,[TGO_FID_Brand] = ${product.TGO_FID_Brand}
       ,[TGO_FID_TypeUpload] = ${product.TGO_FID_TypeUpload} 
       ,[TGO_FID_TypeDesign] = ${product.TGO_FID_TypeDesign} 
       ,[TGO_FID_ShowFormat] = ${product.TGO_FID_ShowFormat} 
       ,[TGO_FID_ShowDesign] = ${product.TGO_FID_ShowDesign} 
       
       ,[TGO_FNumberDefault] = ${product.TGO_FNumberDefault} 
       ,[TGO_FNumberMin] = ${product.TGO_FNumberMin} 
       ,[TGO_FNumberMax] = ${product.TGO_FNumberMax} 
       ,[TGO_FNumberStep] = ${product.TGO_FNumberStep} 
       ,[TGO_FOrder] = ${product.TGO_FOrder} 

    WHERE  [TGO_FID] = ${product.TGO_FID}  `;
  }
  async _4insert_query(salePage_id, product, counter) {
    var sqlQuery = ` 
    INSERT INTO [dbo].[TGoods]
      ([TGO_FID] 
      ,[TGO_FCode] 
      ,[TGO_FName] 
      ,[TGO_FComment]
      ,[TGO_FHtml]
      ,[TGO_FBarcode]
      ,[TGO_FSlug] 
      ,[TGO_FFormul] 
      ,[TGO_FTag]
      ,[TGO_FID_Unit] 
      ,[TGO_FID_Type]
      ,[TGO_FBuyCode] 
      ,[TGO_FBuyPrice]
      ,[TGO_FBuyOff]  
      ,[TGO_FBuyPoint] 
      ,[TGO_FBuyPercent]
      ,[TGO_FBuyLastDate] 
      ,[TGO_FSaleMin] 
      ,[TGO_FSalePriceMin] 
      ,[TGO_FSalePriceMid]
      ,[TGO_FSalePriceMax]
      ,[TGO_FSaleOff] 
      ,[TGO_FSalePriceFix] 
      ,[TGO_FSaleLastDate]
      ,[TGO_FCanChangePrice]
      ,[TGO_FCanSale] 
      ,[TGO_FCanOff] 
      ,[TGO_FCanTax] 
      ,[TGO_FActive]
      ,[TGO_FArchive]
      ,[TGO_FYear]
      ,[TGO_FDelete] 
      ,[TGO_FUserReg]  
      ,[TGO_FDateReg] 
      ,[TGO_FTimeReg] 
      ,[TGO_FPicAdd1] 
      ,[TGO_FPicAdd2] 
      ,[TGO_FPicAdd3]
      ,[TGO_FPicAdd4]
      ,[TGO_FID_Category1] 
      ,[TGO_FID_Category2] 
      ,[TGO_FID_Parent]
      ,[TGO_FSubGroup] 
      ,[TGO_FID_Account]
      ,[TGO_FLinkID]
      ,[TGO_FCount] 
      ,[TGO_FPicOrder]
      ,[TGO_FLength] 
      ,[TGO_FWidth] 
      ,[TGO_FBorder] 
      ,[TGO_FFormulText]
      ,[TGO_FHasOption]
      ,[TGO_FID_Unit2]  
      ,[TGO_FCountINUnit] 
      ,[TGO_FCountINBox]   
      ,[TGO_FID_TypeBox]
      ,[TGO_FProductionTime]   
      ,[TGO_FID_TypeSale]   
      ,[TGO_FSaleMax]  
      ,[TGO_FID_Brand]
      ,[TGO_FID_TypeUpload] 
      ,[TGO_FID_TypeDesign]
      ,[TGO_FID_ShowFormat]
      ,[TGO_FID_ShowDesign]
      ,[saleid]
      ,[TGO_FNumberDefault]
      ,[TGO_FNumberMin]
      ,[TGO_FNumberMax]
      ,[TGO_FNumberStep]
      ,[TGO_FOrder])

     VALUES `;

    var first_id = await DefaultModel.UFN_TGoodsCoding("TGoods_FID");

    const product_id = Number(first_id) + counter;

    product.TGO_FID = product_id;

    sqlQuery += `
      (${product.TGO_FID}
      ,${product.TGO_FCode}
      ,N'${product.TGO_FName}' 
      ,N'${product.TGO_FComment}' 
      ,N'${product.TGO_FHtml}'
      ,'${product.TGO_FBarcode}' 
      ,N'${product.TGO_FSlug ? product.TGO_FSlug : ""}' 
      ,N'${product.TGO_FFormul}' ,N'${product.TGO_FTag ? product.TGO_FTag : ""}' 
      ,${product.TGO_FID_Unit ? product.TGO_FID_Unit : 0}  
     
      ,${product.TGO_FID_Type ? product.TGO_FID_Type : 0}
     
      ,'${product.TGO_FBuyCode}'  
      ,'${product.TGO_FBuyPrice}' 
      ,'${product.TGO_FBuyOff}'   
      ,'${product.TGO_FBuyPoint}' 
      ,'${product.TGO_FBuyPercent}'
      ,'${product.TGO_FBuyLastDate}' 
      ,'${product.TGO_FSaleMin}'
      ,'${product.TGO_FSalePriceMin}' 
      ,'${product.TGO_FSalePriceMid}'
      ,'${product.TGO_FSalePriceMax}' 
      ,'${product.TGO_FSaleOff}' 
      ,'${product.TGO_FSalePriceFix}' 
      ,'${product.TGO_FSaleLastDate}'
      ,0
      ,1
      ,0
      ,0
      ,1
      ,0
      ,'${process.env.YEAR_ACCOUNTING}'
      ,0
      ,'${product.TGO_FUserReg}' 
      ,'${new Date().currentDate}'
      ,'${product.TGO_FTimeReg}' 
      ,N'${product.TGO_FPicAdd1}' 
      ,N'${product.TGO_FPicAdd2}' 
      ,N'${product.TGO_FPicAdd3}'
      ,N'${product.TGO_FPicAdd4}' 
      ,${product.TGO_FID_Category1 ? product.TGO_FID_Category1 : 0}
      ,${product.TGO_FID_Category2 ? product.TGO_FID_Category2 : 0}  
      ,${salePage_id}
      ,${product.TGO_FSubGroup} 
      ,${product.TGO_FID_Account ? product.TGO_FID_Account : 0} 
      ,'${product.TGO_FLinkID}'
      ,'${product.TGO_FCount}' 
      ,'${product.TGO_FPicOrder}'
      ,'${product.TGO_FLength}'
      ,'${product.TGO_FWidth}' 
      ,'${product.TGO_FBorder}'
      ,'${product.TGO_FFormulText}'
      ,${product.TGO_FHasOption}
      ,${product.TGO_FID_Unit2 ? product.TGO_FID_Unit2 : 0} 
      ,${product.TGO_FCountINUnit ? product.TGO_FCountINUnit : 0} 
      ,'${product.TGO_FCountINBox}' 
      ,${product.TGO_FID_TypeBox ? product.TGO_FID_TypeBox : 0}
      ,'${product.TGO_FProductionTime}'
      ,'${product.TGO_FID_TypeSale}'
      ,'${product.TGO_FSaleMax}'
      ,'${product.TGO_FID_Brand}'
      ,'${product.TGO_FID_TypeUpload}'
      ,'${product.TGO_FID_TypeDesign}' 
      ,'${product.TGO_FID_ShowFormat}'
      ,'${product.TGO_FID_ShowDesign}'
      ,${salePage_id}
      ,${product.TGO_FNumberDefault}
      ,${product.TGO_FNumberMin}
      ,${product.TGO_FNumberMax}
      ,${product.TGO_FNumberStep}
      ,${product.TGO_FOrder}
)
    `;

    return sqlQuery;
  }

  async update_productOptionValue(salePage) {
    try {
      var sqlQuery = "";

      if (
        salePage.productsOptionValue &&
        salePage.productsOptionValue.length > 0
      ) {
        for (var j = 0; j <= salePage.productsOptionValue.length - 1; j++) {
          var productOptionValue = salePage.productsOptionValue[j];

          if (productOptionValue.isNew) {
            sqlQuery += await this._5insert_query(
              salePage.TPS_FID,
              productOptionValue
            );
          } else {
            sqlQuery += await this._5update_query(productOptionValue);
          }
        }
      }

      const productOptionValue_result = await this.Database.request().query(
        sqlQuery
      );
      return productOptionValue_result;
    } catch (error) {
      console.log("update_productOptionValue", error);
      return null;
    }
  }
  async _5update_query(productOptionValue) {
    return ` 
    UPDATE [dbo].[TGoodsOptionValue] SET
         [TGPV_FID_Goods] = ${productOptionValue.TGPV_FID_Goods
        ? productOptionValue.TGPV_FID_Goods
        : null
      }
        ,[TGPV_FID_Option] = ${productOptionValue.TGPV_FID_Option
        ? productOptionValue.TGPV_FID_Option
        : null
      }
        ,[TGPV_FID_Value] = ${productOptionValue.TGPV_FID_Value
        ? productOptionValue.TGPV_FID_Value
        : null
      }
        ,[TGPV_FID_Product] = ${productOptionValue.TGPV_FID_Product}
        ,[TGPV_FCount] = ${productOptionValue.TGPV_FCount ? productOptionValue.TGPV_FCount : 0
      }
        ,[TGPV_FRepet] = ${productOptionValue.TGPV_FRepet ? productOptionValue.TGPV_FRepet : 0
      }
        ,[TGPV_FWaste] = ${productOptionValue.TGPV_FWaste ? productOptionValue.TGPV_FWaste : 0
      }
        ,[TGPV_FPrice] = ${productOptionValue.TGPV_FPrice ? productOptionValue.TGPV_FPrice : 0
      }
        ,[TGPV_FDelete] = ${productOptionValue.TGPV_FDelete}
    WHERE  [TGPV_FID] = ${productOptionValue.TGPV_FID} `;
  }
  async _5insert_query(salePage_id, productOptionValue) {
    var sqlQuery = ` 
    INSERT INTO [dbo].[TGoodsOptionValue]
        ([TGPV_FID]
        ,[TGPV_FID_Goods]
        ,[TGPV_FID_Option]
        ,[TGPV_FID_Value]
        ,[TGPV_FID_Product]
        ,[TGPV_FCount]
        ,[TGPV_FRepet]
        ,[TGPV_FWaste]
        ,[TGPV_FPrice]
        ,[TGPV_FDelete]
        ,[saleid])
     VALUES 
        (${productOptionValue.TGPV_FID}
        ,${productOptionValue.TGPV_FID_Goods ? productOptionValue.TGPV_FID_Goods : null}
        ,${productOptionValue.TGPV_FID_Option ? productOptionValue.TGPV_FID_Option : null}
        ,${productOptionValue.TGPV_FID_Value ? productOptionValue.TGPV_FID_Value : null}
        ,${productOptionValue.TGPV_FID_Product}
        ,${productOptionValue.TGPV_FCount ? productOptionValue.TGPV_FCount : 0}
        ,${productOptionValue.TGPV_FRepet ? productOptionValue.TGPV_FRepet : 0}
        ,${productOptionValue.TGPV_FWaste ? productOptionValue.TGPV_FWaste : 0}
        ,${productOptionValue.TGPV_FPrice ? productOptionValue.TGPV_FPrice : 0}
        ,${productOptionValue.TGPV_FDelete}
        ,${salePage_id})`;

    return sqlQuery;
  }

  async deleteIfOptionDeleted(salePage) {
    try {
      var sqlQuery = `
    UPDATE [TGoodsOptionValue] SET
      TGPV_FDelete=1
    WHERE saleid=${salePage.TPS_FID}
    AND TGPV_FID_Value IN
      (SELECT TD_FID FROM TDefault
        WHERE saleid=${salePage.TPS_FID} AND TD_FDelete=1)
    `;
      const deleteIfOptionDeleted_result = await this.Database.request().query(
        sqlQuery
      );
      return deleteIfOptionDeleted_result;
    } catch (error) {
      console.log("deleteIfOptionDeleted", error);
      return null;
    }
  }

  async deleteIfProductDeleted(salePage) {
    try {
      var sqlQuery = `
    UPDATE [TGoodsOptionValue] SET
      TGPV_FDelete=1
    WHERE saleid=${salePage.TPS_FID}
    AND TGPV_FID_Product IN 
      (SELECT TGO_FID FROM TGoods
        WHERE saleid=${salePage.TPS_FID} and TGO_FDelete=1)
    `;

      const deleteIfProductDeleted_result = await this.Database.request().query(
        sqlQuery
      );
      return deleteIfProductDeleted_result;
    } catch (error) {
      console.log("deleteIfProductDeleted", error);
      return null;
    }
  }
}

export default new pageSaleManageModel();
