import Model from "../../Model";
import DefaultModel from "../../defaultModel";
import Date from "../../../helper/date";
import File from "../../../helper/file";
import path from "path";

class pageSaleInsertModel extends Model {
    constructor() {
        super();
    }

    async insert(salePage, User) {
        try {

            var salePage_result = await this.insert_SalePage(salePage, User);
            if (salePage_result) {
                salePage.TPS_FID = salePage_result.output.ReturnFID;

                const rootObject_id = await this.insert_rootDefault(salePage, User);

                await this.assign_newids(rootObject_id, salePage);

                const options_result = await this.insert_options(rootObject_id, salePage, User);

                if (options_result) {
                    if (options_result.rowsAffected[0] == salePage.options.length) {
                        const optionValues_result = await this.insert_optionValues(salePage, User);

                        if (optionValues_result) {
                            const products_result = await this.insert_products(salePage, User);

                            if (products_result) {
                                const productOptions_result = await this.insert_productOptionValues(salePage);
                                if (productOptions_result) {

                                    const picture_result = await this.insert_pictures(salePage, User)


                                    return salePage_result;
                                } else {
                                    return await this.roleBack(salePage.TPS_FID);
                                }
                            } else {
                                return await this.roleBack(salePage.TPS_FID);
                            }
                        } else {
                            return await this.roleBack(salePage.TPS_FID);
                        }
                    } else {
                        return await this.roleBack(salePage.TPS_FID);
                    }
                } else {
                    return await this.roleBack(salePage.TPS_FID);
                }

            } else {
                console.log("operations adding salepage failed!");
            }

        } catch (error) {
            console.log('pageSaleInsertModel -> insert', error);
            return null;
            //roleback
        }
    }

    async roleBack(salePage_id) {
        var sqlQuery = `
    delete from TPageSale
where TPS_FID=${salePage_id}

delete from TDefault
where saleid=${salePage_id}

delete from TGoods
where saleid=${salePage_id}

delete from [TGoodsOptionValue]
where saleid=${salePage_id}
    `;

        const db_result = await this.Database.request().query(sqlQuery);

        if (db_result) console.log("roleback operation done!");
        else console.log("roleback operation failed!");

        return db_result;
    }

    async insert_SalePage(salePage, User) {
        try {
            let RetID;
            let RetMsg;
            let ReturnFID;
            const result = await this.Database.request()
                .input("State", this.sql.NVarChar, 'Insert')
                .input("TPS_FID", this.sql.Int, salePage.TPS_FID)
                .input("TPS_FTitle", this.sql.NVarChar, salePage.TPS_FTitle)
                .input("TPS_FLink", this.sql.NVarChar, salePage.TPS_FLink)
                .input("TPS_FIDs_Category", this.sql.NVarChar, salePage.TPS_FIDs_Category)
                .input("TPS_FIDs_CategoryIndex", this.sql.NVarChar, salePage.TPS_FIDs_CategoryIndex)
                .input(
                    "TPS_FIDs_PageRelation",
                    this.sql.NVarChar,
                    salePage.TPS_FIDs_PageRelation
                )
                .input("TPS_FCaption", this.sql.NVarChar, salePage.TPS_FCaption)
                .input("TPS_FH1", this.sql.NVarChar, salePage.TPS_FH1)
                .input("TPS_FDetails", this.sql.NVarChar, salePage.TPS_FDetails)
                .input("TPS_FComment", this.sql.NVarChar, salePage.TPS_FComment)
                .input("TPS_FDesign", this.sql.NVarChar, salePage.TPS_FDesign)
                .input("TPS_FQuestion", this.sql.NVarChar, salePage.TPS_FQuestion)
                .input("TPS_FIntroduction", this.sql.NVarChar, salePage.TPS_FIntroduction)
                .input("TPS_FIDs_Quality", this.sql.NVarChar, salePage.TPS_FIDs_Quality)
                .input("TPS_FIDs_KeyWord", this.sql.NVarChar, salePage.TPS_FIDs_KeyWord)

                .input("TPS_FVideoAlt", this.sql.NVarChar, salePage.TPS_FVideoAlt)
                .input("TPS_FVideoAdd", this.sql.NVarChar, salePage.TPS_FVideoAdd)

                .input("TPS_FSEO1", this.sql.NVarChar, salePage.TPS_FSEO1)
                .input("TPS_FSEO2", this.sql.NVarChar, salePage.TPS_FSEO2)
                .input("TPS_FSEOProp", this.sql.NVarChar, salePage.TPS_FSEOProp)
                .input("TPS_FSEONetwork", this.sql.NVarChar, salePage.TPS_FSEONetwork)

                .input("TPS_FActive", this.sql.Int, salePage.TPS_FActive)
                .input("TPS_FUserReg", this.sql.Int, salePage.TPS_FUserReg)
                .input("TPS_FDateReg", this.sql.NVarChar, salePage.TPS_FDateReg)
                .input("TPS_FDelete", this.sql.TinyInt, salePage.TPS_FDelete)

                .input("TPS_FOrder", this.sql.NVarChar, salePage.TPS_FOrder)
                .input("TPS_FIcon", this.sql.NVarChar, salePage.TPS_FIcon)

                .input("TPS_FID_NumberType", this.sql.NVarChar, salePage.TPS_FID_NumberType)
                .input(
                    "TPS_FIDs_NumberList",
                    this.sql.NVarChar,
                    salePage.TPS_FIDs_NumberList
                )
                .input("TPS_FNumberDefault", this.sql.NVarChar, salePage.TPS_FNumberDefault)
                .input("TPS_FNumberMin", this.sql.NVarChar, salePage.TPS_FNumberMin)
                .input("TPS_FNumberMax", this.sql.NVarChar, salePage.TPS_FNumberMax)
                .input("TPS_FNumberStep", this.sql.NVarChar, salePage.TPS_FNumberStep)
                .input("TPS_FUserViewType", this.sql.NVarChar, salePage.TPS_FUserViewType)
                // .input("TPS_FID_IndexImage", this.sql.Int, salePage.TPS_FID_IndexImage)
                .input("TPS_FID_IndexImage", this.sql.Int, 0)

                .output("RetID", this.sql.BigInt, RetID)
                .output("RetMsg", this.sql.NVarChar, RetMsg)
                .output("ReturnFID", this.sql.BigInt, ReturnFID)
                .execute("USP_TPageSale_Ins");
            return result;
        } catch (error) {
            console.log("pageSaleInsertModel -> insert_SalePage", error);
            return null;
        }
    }

    async insert_rootDefault(salePage, User) {
        try {
            var rootObject = await DefaultModel.getTableSchema("TDefault");

            rootObject["TD_FName"] = salePage.TPS_FTitle;
            rootObject["TD_FID_Group"] = 220;
            rootObject["TD_FCaption"] = "خصوصیات محصول " + salePage.TPS_FTitle;
            rootObject["TD_FActive"] = 1;
            rootObject["TD_FShow"] = 1;
            rootObject["TD_FSubGroup"] = 1;

            rootObject["TD_FCode"] = 0;
            rootObject["TD_FYear"] = process.env.YEAR_ACCOUNTING;
            rootObject["TD_FUserReg"] = User;
            rootObject["TD_FDateReg"] = new Date().currentDate;
            rootObject["saleid"] = salePage.TPS_FID;

            const rootObject_result = await DefaultModel.save(rootObject, User);

            if (rootObject_result) {
                return rootObject_result.output.ReturnFID;
            } else {
                return null;
            }
        } catch (error) {
            console.log("pageSaleInsertModel -> add_rootDefault", error);
            return null;
            //roleback
        }
    }

    async assign_newids(rootObject_id, salePage) {
        try {

            if (salePage.options && salePage.options.length > 0) {

                //#region counter
                var option_counter = 0;

                if (salePage.TPS_FID) {
                    const sel = await this.Database.request().query(
                        `select count(TD_FID) as c from TDefault where saleid=${salePage.TPS_FID} and TD_FID_Group=${rootObject_id}`
                    );
                    if (sel) option_counter = sel.recordset[0]["c"];
                }
                //#endregion
                for (var i = 0; i <= salePage.options.length - 1; i++) {
                    if (salePage.options[i]) {
                        const option = salePage.options[i];
                        const optionTempId = option.TD_FID

                        //#region newid
                        if (option.isNew) {
                            const option_id = rootObject_id * 100 + option_counter + 1;
                            option_counter++;
                            option.TD_FID = option_id;
                            option.TD_FCode = option_id;
                        }
                        //#endregion

                        var optionValue_counter = 0;
                        //#region optionValues
                        const optionValues = salePage.optionsValues.filter(ov => ov.TD_FID_Group == optionTempId)

                        for (var j = 0; j <= optionValues.length - 1; j++) {
                            if (optionValues[j]) {
                                const optionValue = optionValues[j];

                                const optionValueTempId = optionValue.TD_FID

                                //#region optionValue newid
                                if (optionValue.isNew) {
                                    const TD_FID = option.TD_FID * 100 + optionValue_counter + 1;
                                    optionValue_counter++;
                                    optionValue.TD_FID = TD_FID;
                                    optionValue.TD_FCode = TD_FID;
                                    optionValue.TD_FID_Group = option.TD_FID;

                                    await this.replace_tempid_inDeps(salePage, optionValueTempId, TD_FID)
                                    await this.replace_tempid_inProductOptionValues(salePage, optionValueTempId, option.TD_FID, TD_FID)
                                    await this.replace_tempid_inGallery(salePage, 'optionImage', optionValueTempId, option.TD_FID)

                                }
                                //#endregion
                            }
                        }

                        //#endregion
                    }
                }
            }

            await this.replace_tempid_inProducts(salePage)

        } catch (error) {
            console.log("assign_newids error", error);
            return null;
            //roleback
        }
    }

    async replace_tempid_inDeps(salePage, tempid, TD_FID) {

        for (var j = 0; j <= salePage.optionsValues.length - 1; j++) {
            if (salePage.optionsValues[j]) {
                const optionValue = salePage.optionsValues[j];

                if (optionValue.dependecy && optionValue.dependecy.length > 0) {
                    for (var k = 0; k <= optionValue.dependecy.length - 1; k++) {
                        const dep = optionValue.dependecy[k];

                        if (dep.length == 36)
                            if (dep == tempid)
                                optionValue.dependecy[k] = TD_FID;
                    }
                }
            }
        }
    }

    async replace_tempid_inProducts(salePage) {

        var first_id = await DefaultModel.UFN_TGoodsCoding("TGoods_FID");

        var prodop_counter = 0;

        if (salePage.products) {

            var productCounter = 0
            for (var i = 0; i <= salePage.products.length - 1; i++) {

                if (salePage.products[i]) {
                    const product = salePage.products[i];
                    const productTempId = product.TGO_FID


                    if (product.isNew) {
                        const product_id = Number(first_id) + productCounter;
                        productCounter++
                        product.TGO_FID = product_id;

                        //#region productOptionValues TGPV_FID_Goods
                        if (salePage.productsOptionValue) {
                            const optionValues = salePage.productsOptionValue.filter(pov => pov.TGPV_FID_Product == productTempId)

                            for (var j = 0; j <= optionValues.length - 1; j++) {
                                optionValues[j].TGPV_FID_Product = product.TGO_FID
                            }
                        }
                        //#endregion

                        await this.replace_tempid_inGallery(salePage, 'product', productTempId, product.TGO_FID)
                    }
                }
            }
        }

        //#region  product option values
        if (salePage.productsOptionValue) {
            var first_prodop_id = await DefaultModel.UFN_TGoodsCoding("TGoodsOptionValue_FID");

            for (var j = 0; j <= salePage.productsOptionValue.length - 1; j++) {
                if (salePage.productsOptionValue[j]) {
                    const product_option = salePage.productsOptionValue[j];

                    //#region newid
                    if (product_option.isNew) {
                        const options_id = Number(first_prodop_id) + prodop_counter;
                        prodop_counter++;

                        product_option.TGPV_FID = options_id;
                    }
                    //#endregion
                }
            }
        }
        //#endregion
    }

    async replace_tempid_inProductOptionValues(salePage, tempid, option_TD_FID, optionValue_TD_FID) {

        for (var i = 0; i <= salePage.productsOptionValue.length - 1; i++) {
            const productOptionValue = salePage.productsOptionValue[i]

            if (productOptionValue.TGPV_FID_Value == tempid) {
                productOptionValue.TGPV_FID_Option = option_TD_FID
                productOptionValue.TGPV_FID_Value = optionValue_TD_FID
            }
        }
    }

    async replace_tempid_inGallery(salePage, state, tempid, FID) {
        if (salePage.gallery) {
            const pictures = salePage.gallery.filter(p => p.TPIC_FForm == state && p.TPIC_FID_Parent == tempid)

            if (pictures.length > 0) {
                for (var i = 0; i <= pictures.length - 1; i++) {
                    pictures[i].TPIC_FID_Parent = FID
                }
            }
        }
    }

    async insert_options(rootObject_id, salePage, User) {
        try {
            var ret = { rowsAffected: [0] };

            if (salePage.options && salePage.options.length > 0) {
                var sqlQuery = ` 
                insert into [dbo].[TDefault] (
                     [TD_FID], [TD_FCode], [TD_FName], [TD_FCaption]
                    ,[TD_FOrder] ,[TD_FActive] 
                    ,[TD_FShow] ,[TD_FSystem] ,[TD_FDelete] ,[TD_FFormType] ,[TD_FSubGroup],[TD_FDeleted]
                    ,[TD_FID_Group]  
                    ,[TD_FEdited] ,[TD_FInserted] 
                    ,[TD_FDateReg] 
                    ,[TD_FYear] ,[TD_FUserReg] ,[saleid],[TD_FType],[TD_FRequired],[TD_FUserViewType],[TD_FActionToDeps],[TD_FHideOnAloneSet] ) 
                                  VALUES `;

                for (var i = 0; i <= salePage.options.length - 1; i++) {
                    const option = salePage.options[i];

                    sqlQuery += await this.return_optionsSQL(salePage.TPS_FID, rootObject_id, option, User);

                    if (i < salePage.options.length - 1) sqlQuery += ",";
                }

                const db_result = await this.Database.request().query(sqlQuery);
                return db_result;
            } else {
                return ret;
            }
        } catch (error) {
            // console.log('add_options', error);
            console.log("insert_options", error);
            return null;
            //roleback
        }
    }

    async return_optionsSQL(salePageid, rootObject_id, option, User) {
        var sqlQuery = `  (
          ${option.TD_FID},${option.TD_FCode},N'${option.TD_FName}',N'${option.TD_FCaption
            }'
          ,${option.TD_FOrder}
          ,1,1,0,0,0,1,0
          ,${rootObject_id}
          ,0,0
          ,'${new Date().currentDate}'
          ,'${process.env.YEAR_ACCOUNTING}',${User},${salePageid}
          ,${option.TD_FType}
          ,${option.TD_FRequired ? option.TD_FRequired : 0}
          ,${option.TD_FUserViewType ? option.TD_FUserViewType : 0}
          ,${option.TD_FActionToDeps ? option.TD_FActionToDeps : 0}
          ,${option.TD_FHideOnAloneSet ? option.TD_FHideOnAloneSet : 0}
      )`;

        return sqlQuery;
    }

    async insert_optionValues(salePage, User) {
        try {
            var ret = { rowsAffected: [0] };

            if (salePage.optionsValues && salePage.optionsValues.length > 0) {
                var sqlQuery = ` insert into [dbo].[TDefault] (
                [TD_FID], [TD_FCode], [TD_FName]
               ,[TD_FOrder] ,[TD_FActive] 
               ,[TD_FShow] ,[TD_FSystem] ,[TD_FDelete] ,[TD_FFormType] ,[TD_FSubGroup],[TD_FDeleted]
               ,[TD_FID_Group]  
               ,[TD_FEdited] ,[TD_FInserted] 
               ,[TD_FDateReg] 
               ,[TD_FYear] ,[TD_FUserReg] ,[saleid],[dependecy],[TD_FType],[TD_FDefault] ) 
                                          VALUES `;

                var picture_sql = ''

                for (var j = 0; j <= salePage.optionsValues.length - 1; j++) {
                    const optionValue = salePage.optionsValues[j];

                    sqlQuery += await this.return_childSQL(salePage, optionValue, User);

                    if (j < salePage.optionsValues.length - 1) sqlQuery += ",";


                    // if (optionValue.picture) {
                    //     picture_sql += await this.insertOptionValuePicture_query(optionValue, User);
                    // }
                }

                const db_result = await this.Database.request().query(sqlQuery);

                if (picture_sql.length > 1) {
                    // console.log('picture_sql', picture_sql);

                    const pic_db_result = await this.Database.request().query(picture_sql);
                }

                return db_result;
            }
            else {
                return ret;
            }
        } catch (error) {
            console.log("insert_optionValues", error);
            return null;
            //roleback
        }
    }

    async return_childSQL(salePage, optionValue, User) {

        const option = salePage.options.find(o => o.TD_FID == optionValue.TD_FID_Group)

        var sqlQuery = `  (
          ${optionValue.TD_FID},${optionValue.TD_FCode},'${optionValue.TD_FName}'
          ,${optionValue.TD_FOrder}
          ,1,1,0,0,0,0,0
          ,${option.TD_FID}
          ,0,0
          ,'${new Date().currentDate}'
          ,'${process.env.YEAR_ACCOUNTING}',${User},${salePage.TPS_FID}
          ,'${this.depString(optionValue.dependecy)}'
          ,${option.TD_FType}
          ,${option.TD_FDefault ? option.TD_FDefault : 0}
      ) `;

        return sqlQuery;
    }

    depString(dep) {
        if (dep) return dep.toString();

        return "";
    }

    async insert_products(salePage, User) {
        try {
            var ret = { rowsAffected: [0] };

            if (salePage.products && salePage.products.length > 0) {
                var sqlQuery = ` INSERT INTO [dbo].[TGoods](
                [TGO_FID] ,[TGO_FCode] ,[TGO_FName] ,[TGO_FCaption] ,[TGO_FComment],[TGO_FHtml]
               ,[TGO_FBarcode],[TGO_FSlug] ,[TGO_FFormul] ,[TGO_FTag],[TGO_FID_Unit] ,[TGO_FID_Type]
               ,[TGO_FBuyCode] ,[TGO_FBuyPrice],[TGO_FBuyOff]  ,[TGO_FBuyPoint] ,[TGO_FBuyPercent]
               ,[TGO_FBuyLastDate] ,[TGO_FSaleMin] ,[TGO_FSalePriceMin] ,[TGO_FSalePriceMid]
               ,[TGO_FSalePriceMax],[TGO_FSaleOff] ,[TGO_FSalePriceFix] ,[TGO_FSaleLastDate]
               ,[TGO_FCanChangePrice],[TGO_FCanSale] ,[TGO_FCanOff] ,[TGO_FCanTax] ,[TGO_FActive]
               ,[TGO_FArchive],[TGO_FYear],[TGO_FDelete] ,[TGO_FUserReg]  ,[TGO_FDateReg] ,[TGO_FTimeReg] 
               ,[TGO_FPicAdd1] ,[TGO_FPicAdd2] ,[TGO_FPicAdd3] ,[TGO_FPicAdd4]
               ,[TGO_FID_Category1] ,[TGO_FID_Category2] ,[TGO_FID_Parent],[TGO_FSubGroup] ,[TGO_FID_Account],[TGO_FLinkID]
               ,[TGO_FCount] ,[TGO_FPicOrder],[TGO_FLength] ,[TGO_FWidth] ,[TGO_FBorder] ,[TGO_FFormulText],[TGO_FHasOption]
               ------------------------------------
               ,[TGO_FID_Unit2]  ,[TGO_FCountINUnit] ,[TGO_FCountINBox]   ,[TGO_FID_TypeBox]
               ,[TGO_FProductionTime]   ,[TGO_FID_TypeSale]   ,[TGO_FSaleMax]  ,[TGO_FID_Brand]
               ,[TGO_FID_TypeUpload] ,[TGO_FID_TypeDesign],[TGO_FID_ShowFormat],[TGO_FID_ShowDesign],[saleid]
               ,[TGO_FNumberDefault]
               ,[TGO_FNumberMin]
               ,[TGO_FNumberMax]
               ,[TGO_FNumberStep]
               ,[TGO_FOrder])
    
                                  VALUES `;

                for (var i = 0; i <= salePage.products.length - 1; i++) {
                    const product = salePage.products[i];

                    if (product.TGO_FDelete == 0) {
                        sqlQuery += await this.return_productSQL(salePage.TPS_FID, product, User);

                        if (i < salePage.products.length - 1) sqlQuery += ",";
                    }
                }

                console.log(sqlQuery);

                const db_result = await this.Database.request().query(sqlQuery);
                return db_result;
            } else {
                return ret;
            }
        } catch (error) {
            console.log("insert_products", error);
            return null;
            //roleback
        }
    }

    async return_productSQL(salePageid, product, User) {
        var sqlQuery = `  (
                ${product.TGO_FID},${product.TGO_FCode},'${product.TGO_FName}' ,'${product.TGO_FCaption
            }'  ,'${product.TGO_FComment}' ,'${product.TGO_FHtml}'
               ,'${product.TGO_FBarcode}' ,'${product.TGO_FSlug ? product.TGO_FSlug : ''}' ,'${product.TGO_FFormul
            }' ,'${product.TGO_FTag ? product.TGO_FTag : ''}' ,'${product.TGO_FID_Unit ? product.TGO_FID_Unit : 0}'  
            ,${product.TGO_FID_Type ? product.TGO_FID_Type : 0}
               ,'${product.TGO_FBuyCode}'  ,'${product.TGO_FBuyPrice}' ,'${product.TGO_FBuyOff
            }'   ,'${product.TGO_FBuyPoint}'  ,'${product.TGO_FBuyPercent}'
               ,'${product.TGO_FBuyLastDate}' ,'${product.TGO_FSaleMin}','${product.TGO_FSalePriceMin
            }' ,'${product.TGO_FSalePriceMid}'
               ,'${product.TGO_FSalePriceMax}' ,'${product.TGO_FSaleOff}' ,'${product.TGO_FSalePriceFix
            }' ,'${product.TGO_FSaleLastDate}'
               ,0,1,0,0,1
               ,0,'${process.env.YEAR_ACCOUNTING}',0,'${product.TGO_FUserReg}' ,'${new Date().currentDate
            }'
               ,'${product.TGO_FTimeReg}' ,N'${product.TGO_FPicAdd1}' ,N'${product.TGO_FPicAdd2
            }' ,N'${product.TGO_FPicAdd3}',N'${product.TGO_FPicAdd4}' ,${product.TGO_FID_Category1 ? product.TGO_FID_Category1 : 0}
               ,${product.TGO_FID_Category2 ? product.TGO_FID_Category2 : 0}  ,${salePageid},${product.TGO_FSubGroup
            } ,'${product.TGO_FID_Account}' ,'${product.TGO_FLinkID}'
               ,'${product.TGO_FCount}' ,'${product.TGO_FPicOrder}', '${product.TGO_FLength
            }','${product.TGO_FWidth}' ,'${product.TGO_FBorder}','${product.TGO_FFormulText
            }',${product.TGO_FHasOption}
               ,${product.TGO_FID_Unit2 ? product.TGO_FID_Unit2 : 0} ,${product.TGO_FCountINUnit ? product.TGO_FCountINUnit : 0} ,'${product.TGO_FCountINBox
            }' ,${product.TGO_FID_TypeBox ? product.TGO_FID_TypeBox : 0}
               ,'${product.TGO_FProductionTime ? product.TGO_FProductionTime : 0}','${product.TGO_FID_TypeSale}','${product.TGO_FSaleMax}'
            ,${product.TGO_FID_Brand ? product.TGO_FID_Brand : 0}
               ,'${product.TGO_FID_TypeUpload}','${product.TGO_FID_TypeDesign}' ,'${product.TGO_FID_ShowFormat
            }','${product.TGO_FID_ShowDesign}',${salePageid}
          ,${product.TGO_FNumberDefault}
          ,${product.TGO_FNumberMin}
          ,${product.TGO_FNumberMax}
          ,${product.TGO_FNumberStep}
          ,${product.TGO_FOrder}
      )`;

        return sqlQuery;
    }

    async insert_productOptionValues(salePage) {
        try {
            var ret = { rowsAffected: [0] };

            if (salePage.productsOptionValue && salePage.productsOptionValue.length > 0) {
                var sqlQuery = ` INSERT INTO [dbo].[TGoodsOptionValue]
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
    
                                      VALUES `;

                for (var j = 0; j <= salePage.productsOptionValue.length - 1; j++) {
                    var product_option = salePage.productsOptionValue[j];

                    sqlQuery += await this.return_productOptionSQL(salePage, product_option.TGPV_FID_Product, product_option);

                    if (j < salePage.productsOptionValue.length - 1) sqlQuery += ",";

                }

                // console.log(sqlQuery);

                const db_result = await this.Database.request().query(sqlQuery);
                return db_result;
            } else {
                return ret;
            }
        } catch (error) {
            console.log("insert_productOptionValues:", error);
            return null;
            //roleback
        }
    }

    async return_productOptionSQL(salePage, productId, option) {
        try {
            var sqlQuery = `
          (${option.TGPV_FID}
          ,${option.TGPV_FID_Goods}
          ,${option.TGPV_FID_Option}
          ,${option.TGPV_FID_Value}
          ,${productId}
          ,${option.TGPV_FCount ? option.TGPV_FCount : 0}
          ,${option.TGPV_FRepet ? option.TGPV_FRepet : 0}
          ,${option.TGPV_FWaste ? option.TGPV_FWaste : 0}
          ,${option.TGPV_FPrice ? option.TGPV_FPrice : 0}
          ,0
          ,${salePage.TPS_FID})`;

            return sqlQuery;
        } catch (error) {
            console.log(error);
        }

        return "";
    }

    async insert_pictures(salePage, User) {
        try {
            var ret = { rowsAffected: [0] };

            var sqlQuery = ''
            if (salePage.gallery && salePage.gallery.length > 0) {
                for (var i = 0; i <= salePage.gallery.length - 1; i++) {
                    const image = salePage.gallery[i]
                    sqlQuery += await this.picUse_insertQuery(image, i)
                }
            }

            if (sqlQuery.length > 2) {
                const db_result = await this.Database.request().query(sqlQuery);
                return db_result;
            }
            else {
                return ret;
            }

        } catch (error) {
            console.log("insert_pictures:", error);
            return null;
            //roleback
        }
    }

    async picUse_insertQuery(image, index) {
        try {
            var sqlQuery = '';
            sqlQuery += `INSERT INTO [dbo].[TPictureUse] ([TPU_FID_State], [TPU_FID_Parent], [TPU_FID_Picture], [TPU_FOrder])
            VALUES
            (${image.TPU_FID_State}, ${image.TPU_FID_Parent}, ${image.TPIC_FID}, ${index})
            `
            return sqlQuery;
        } catch (error) {
            console.log(error)
        }
    }

    async picUse_updateQuery(image, index) {
        try {
            var sqlQuery = '';
            sqlQuery += `UPDATE [dbo].[TPictureUse] SET [TPU_FOrder] = ${index} WHERE [TPU_FID_State] = ${image.TPU_FID_State} AND [TPU_FID_Parent] = ${image.TPU_FID_Parent} AND [TPU_FID_Picture] = ${image.TPIC_FID}`
            return sqlQuery;
        } catch (error) {
            console.log(error)
        }
    }

    async picUse_deleteQuery(image, index) {
        try {
            var sqlQuery = '';
            sqlQuery += `DELETE FROM [dbo].[TPictureUse] WHERE [TPU_FID_State] = ${image.TPU_FID_State} AND  [TPU_FID_Parent] = ${image.TPU_FID_Parent} AND [TPU_FID_Picture] = ${image.TPIC_FID}`
            return sqlQuery;
        } catch (error) {
            console.log(error)
        }
    }

    async picture_insertQuery(state, salePageid, image, User) {

        var sqlQuery = '';

        const newPath = File.createCorrectNameForImage(state, image.path, image.TPIC_FName)
        File.moveFile(image.path, newPath)

        const newThumbnailPath = File.createCorrectNameForImage(state, image.thumbnail_path, image.TPIC_FName)
        File.moveFile(image.thumbnail_path, newThumbnailPath)


        sqlQuery += ` EXEC [dbo].[USP_TPicture_Ins] 
        @State='Insert',
    @TPIC_FID_Parent='${salePageid}',
    @TPIC_FForm='${state}',
    @TPIC_FAddress='${newPath}',
    @TPIC_FName='${path.basename(newPath)}',
    @TPIC_FComment= '${image.alt}',
    @TPIC_FType='${path.extname(newPath).replace('.', '')}',
    @TPIC_FUserReg='${User}',
    @TPIC_FDateReg='${new Date().currentDate}',
    @TPIC_FActive=1,
                        @TPIC_FDelete=0 `;

        return sqlQuery
    }
}
export default new pageSaleInsertModel();
