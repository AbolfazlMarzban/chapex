import Model from "../../Model";
import DefaultModel from "../../defaultModel";
import Date from "../../../helper/date";
import File from "../../../helper/file";
import path from "path";
import pageSaleInsertModel from "./pageSaleInsertModel";
import pageSaleManageModel from "./pageSaleManageModel";

class pageSaleUpdateModel extends Model {
    constructor() {
        super();
    }

    async update(salePage, User) {
        var error_result = {
            status: 422,
            ret_data: salePage,
            error: true,
            mesages: ["خطا در ذخیره سازی!"],
        }

        var succesFlag = false
        try {

            await pageSaleInsertModel.assign_newids(salePage.rootObject_id, salePage);

            const salePage_result = await this.update_salePage(salePage);
            if (salePage_result) {

                const rootObject_result = await this.update_rootObject(salePage);
                if (rootObject_result) {

                    const options_result = await this.update_options(salePage, User);
                    if (options_result) {

                        const products_result = await this.update_products(salePage, User);
                        if (products_result) {

                            const productOptionValue_result = await this.update_productOptionValue(salePage);
                            if (productOptionValue_result) {

                                const gallery_result = await this.update_gallery(salePage, User)
                                if (gallery_result) {
                                    succesFlag = true
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

            if (succesFlag)
                return success_result;


        }
        catch (error) {
            console.log(error);
            return error_result;
        }
    }

    async update_salePage(salePage) {

        try {
            var sqlQuery = ` 
            UPDATE [dbo].[TPageSale] SET 
                 [TPS_FTitle] = N'${salePage.TPS_FTitle}'
                ,[TPS_FLink] = N'${salePage.TPS_FLink}'   
                ,[TPS_FIDs_Category] = '${salePage.TPS_FIDs_Category}'   
                ,[TPS_FIDs_CategoryIndex] = '${salePage.TPS_FIDs_CategoryIndex}'   
                ,[TPS_FIDs_PageRelation] = '${salePage.TPS_FIDs_PageRelation}'     
                ,[TPS_FCaption] = N'${salePage.TPS_FCaption}'    
                ,[TPS_FH1] = N'${salePage.TPS_FH1}'    
                ,[TPS_FDetails] = N'${salePage.TPS_FDetails}'    
                ,[TPS_FComment] = N'${salePage.TPS_FComment}'    
                ,[TPS_FDesign] = N'${salePage.TPS_FDesign}'    
                ,[TPS_FQuestion] = N'${salePage.TPS_FQuestion}'    
                ,[TPS_FIntroduction] = N'${salePage.TPS_FIntroduction}'    
                ,[TPS_FIDs_Quality] = N'${salePage.TPS_FIDs_Quality}'    
                ,[TPS_FIDs_KeyWord] = N'${salePage.TPS_FIDs_KeyWord}' 
                ,[TPS_FVideoAdd] = '${salePage.TPS_FVideoAdd}' 
                ,[TPS_FVideoAlt] = '${salePage.TPS_FVideoAlt}' 
                ,[TPS_FSEO1] = N'${salePage.TPS_FSEO1}'    
                ,[TPS_FSEO2] = N'${salePage.TPS_FSEO2}'    
                ,[TPS_FSEOProp] = N'${salePage.TPS_FSEOProp}'    
                ,[TPS_FSEONetwork] = N'${salePage.TPS_FSEONetwork}'    
                ,[TPS_FActive] = '${salePage.TPS_FActive}'   
                ,[TPS_FDelete] = '${salePage.TPS_FDelete}'  
                ,[TPS_FOrder] = '${salePage.TPS_FOrder}' 
                ,[TPS_FIcon] = N'${salePage.TPS_FIcon}' 
                ,[TPS_FUserViewType] = ${salePage.TPS_FUserViewType} 
                ,[TPS_FID_IndexImage]=${salePage.TPS_FID_IndexImage}
            WHERE  [TPS_FID] = '${salePage.TPS_FID}' `;

            const salePage_result = await this.Database.request().query(sqlQuery);
            return salePage_result
        }
        catch (error) {
            console.log('update_salePage', error);
            return null
        }
    }

    async update_rootObject(salePage) {
        try {
            var sqlQuery = ` update TDefault set
    
         TD_FName='${salePage.TPS_FTitle}'
        ,TD_FCaption='${"خصوصیات محصول " + salePage.TPS_FTitle}'
        ,TD_FActive=${salePage.TD_FDelete ? 0 : 1}
        ,TD_FShow=${salePage.TD_FDelete ? 0 : 1}
              
        where saleid=${salePage.TPS_FID} and TD_FID_Group=220
        `;

            const rootObject_result = await this.Database.request().query(sqlQuery);
            return rootObject_result
        }
        catch (error) {
            console.log('update_rootObject', error);
            return null
        }
    }

    async update_options(salePage, User) {
        try {
            var sqlQuery = "";

            if (salePage.options && salePage.options.length > 0) {

                for (var i = 0; i <= salePage.options.length - 1; i++) {
                    var option = salePage.options[i];
                    sqlQuery += this._2update_query(option);
                }
            }

            const options_result = await this.Database.request().query(sqlQuery);
            return options_result
        }
        catch (error) {
            console.log('update_options', error);
            return null
        }
    }
    _2update_query(option) {

        return ` 
        UPDATE [dbo].[TDefault] SET
            [TD_FCaption] = N'${option.TD_FCaption}'
        WHERE  [TD_FID] = ${option.TD_FID} `;
    }

    async update_products(salePage, User) {
        try {
            var sqlQuery = "";

            if (salePage.products) {
                var counter = 0;
                for (var i = 0; i <= salePage.products.length - 1; i++) {
                    if (salePage.products[i]) {
                        var product = salePage.products[i];
                        sqlQuery += await this._4update_query(product);
                    }
                }
            }

            const products_result = await this.Database.request().query(sqlQuery);
            return products_result
        }
        catch (error) {
            console.log('update_products', error);
            return null
        }
    }
    async _4update_query(product) {
        return ` 
        UPDATE [dbo].[TGoods] SET 
             [TGO_FComment] = N'${product.TGO_FComment}'
            ,[TGO_FID_IndexImage] = ${product.TGO_FID_IndexImage ? product.TGO_FID_IndexImage : 0} 
        WHERE  [TGO_FID] = ${product.TGO_FID}  `;
    }

    async update_productOptionValue(salePage) {
        try {
            var sqlQuery = "";

            if (salePage.productsOptionValue && salePage.productsOptionValue.length > 0) {
                for (var j = 0; j <= salePage.productsOptionValue.length - 1; j++) {
                    var productOptionValue = salePage.productsOptionValue[j];
                    sqlQuery += await this._5update_query(productOptionValue);
                }
            }

            const productOptionValue_result = await this.Database.request().query(sqlQuery);
            return productOptionValue_result;
        }
        catch (error) {
            console.log('update_productOptionValue', error);
            return null
        }
    }
    async _5update_query(productOptionValue) {
        return ` 
        UPDATE [dbo].[TGoodsOptionValue] SET
             [TGPV_FID_DesignForm] = ${productOptionValue.TGPV_FID_DesignForm}
            ,[TGPV_FID_UploadForm] = ${productOptionValue.TGPV_FID_UploadForm}
        WHERE  [TGPV_FID] = ${productOptionValue.TGPV_FID} `;
    }

    async update_gallery(salePage, User) {
        try {

            var sqlQuery = "";

            if (salePage.gallery && salePage.gallery.length > 0) {

                for (var i = 0; i <= salePage.gallery.length - 1; i++) {
                    const image = salePage.gallery[i];

                    if (image.isnew && image.TPIC_FDelete == 0) {
                        sqlQuery += await pageSaleInsertModel.picUse_insertQuery(image, i)
                    }
                    else if (!image.isnew && image.TPIC_FDelete == 0) {
                        sqlQuery += await pageSaleInsertModel.picUse_updateQuery(image, i)
                    }
                    else if (image.TPIC_FDelete == 1) {
                        sqlQuery += await pageSaleInsertModel.picUse_deleteQuery(image, i)
                    }
                }
            }
            const gallery_result = await this.Database.request().query(sqlQuery);
            return gallery_result;
        }
        catch (error) {
            console.log('update_gallery', error);
            return null
        }
    }
    async picture_updateQuery(image, User) {

        var sqlQuery = ''
        if (image.TPIC_FID) {

            if (image.TPIC_FDelete == 1) {
                File.removeImage(image.path)
                File.removeImage(image.thumbnail_path)
            }

            let file_name = path.basename(image.path.substr(0, image.path.lastIndexOf('.')))

            let newPath = image.path
            let newFileName = path.basename(image.path)
            if (file_name != image.TPIC_FName) {

                let extname = path.basename(image.path.substr(image.path.lastIndexOf('.'), image.path.length))

                newFileName = image.TPIC_FName + extname
                let newThumbnailFileName = 'sm-' + image.TPIC_FName + extname
                newPath = path.join(path.dirname(image.path), newFileName)
                let newThumbnailPath = path.join(path.dirname(image.thumbnail_path), newThumbnailFileName)

                File.moveFile(image.path, newPath)
                File.moveFile(image.thumbnail_path, newThumbnailPath)
            }


            sqlQuery += ` update [dbo].[TPicture] 
      set 
     [TPIC_FComment]='${image.alt}'
    ,[TPIC_FAddress]=N'${newPath}'
    ,[TPIC_FName]=N'${newFileName}'
    ,[TPIC_FDelete]=${image.TPIC_FDelete}
    ,[TPIC_FOrder]=${image.TPIC_FOrder}

    where [TPIC_FID]=${image.TPIC_FID}
    `
        }

        return sqlQuery
    }
}

export default new pageSaleUpdateModel();
