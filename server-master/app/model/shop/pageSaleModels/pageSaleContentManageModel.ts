import Model from "../../Model";
import DefaultModel from "../../defaultModel";
import Date from "../../../helper/date";
import defaultModel from "../../defaultModel";
import File from "../../../helper/file";
import path from "path";

class pageSaleContentManageModel extends Model {
    constructor() {
        super();
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
            where (saleid=${idPageSale} or TGO_FID in (
                select TGPV_FID_Goods from [V_TGoodsOptionValue]
                    where saleid=${idPageSale}
                )) and (TGO_FDelete = 0) 
                order by TGO_FOrder
    
        select * from [TGoodsOptionValue]
        where saleid=${idPageSale} and (TGPV_FDelete = 0)
    
    
        SELECT *
          FROM [V_TPictureUse]
          where 
		  (TPU_FID_State= 2400101 and TPU_FID_Parent=${idPageSale})
		  or 
		  (TPU_FID_State = 2400103 and TPU_FID_Parent in 
		  (
			select TD_FID from V_TDefault
			where saleid=${idPageSale}
		  ))
		  or 
		  (TPU_FID_State = 2400102 and TPU_FID_Parent in (
			select TGO_FID from V_TGoods
			where saleid=${idPageSale}
            )
            or 
            (TPU_FID_State = 2400301 or TPU_FID_State = 2400302) and TPU_FID_Parent in (
              select TGPV_FID from V_TGoodsOptionValue
              where saleid=${idPageSale}
            ))
          order by TPU_FOrder asc

          --select TPS_FTitle,TPS_FID from V_TPageSale
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
            const TPicture = db_result.recordsets[4];
            // const TRelatedPagesDefault = db_result.recordsets[5];

            var obj = TPageSale[0];
            //#endregion

            //#region تعداد
            if (obj.TPS_FIDs_NumberList)
                obj.TPS_FIDs_NumberList = obj.TPS_FIDs_NumberList.split(",")
                    .map((entry) => parseInt(entry))
                    .filter((entry) => typeof entry === "number");

            if (obj.TPS_FIDs_NumberList == "") {
                obj.TPS_FIDs_NumberList = []
            }
            //#endregion

            //#region دسته بندی
            if (obj.TPS_FIDs_Category)
                obj.TPS_FIDs_Category = obj.TPS_FIDs_Category.split(",")
                    .map((entry) => parseInt(entry))
                    .filter((entry) => typeof entry === "number");

            if (!obj.TPS_FIDs_Category || obj.TPS_FIDs_Category == "") {
                obj.TPS_FIDs_Category = []
            }


            if (obj.TPS_FIDs_CategoryIndex)
                obj.TPS_FIDs_CategoryIndex = obj.TPS_FIDs_CategoryIndex.split(",")
                    .map((entry) => parseInt(entry))
                    .filter((entry) => typeof entry === "number");

            if (!obj.TPS_FIDs_CategoryIndex || obj.TPS_FIDs_CategoryIndex == "") {
                obj.TPS_FIDs_CategoryIndex = []
            }
            //#endregion

            //#region محصولات مرتبط
            // obj.RelatedPages = TRelatedPagesDefault
            // if (obj.TPS_FIDs_PageRelation)
            //     obj.TPS_FIDs_PageRelation = obj.TPS_FIDs_PageRelation.split(",")
            //         .map((entry) => parseInt(entry))
            //         .filter((entry) => typeof entry === "number");

            // if (obj.TPS_FIDs_PageRelation == "") {
            //     obj.TPS_FIDs_PageRelation = []
            // }
            //#endregion

            //#region دسته کیفی
            if (obj.TPS_FIDs_Quality)
                obj.TPS_FIDs_Quality = obj.TPS_FIDs_Quality.split(",")
                    .map((entry) => parseInt(entry))
                    .filter((entry) => typeof entry === "number");

            if (obj.TPS_FIDs_Quality == "") {
                obj.TPS_FIDs_Quality = []
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

                    //#region  تصویر خصوصیت
                    const p = TPicture.find(p => p.TPU_FID_Parent == child.TD_FID)

                    if (p) {
                        child.picture = {
                            TPIC_FID: p.TPU_FID_Picture,
                            // TPIC_FName: p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf('.')),
                            // path: path.normalize(p.TPIC_FAddress),
                            path: p.TPU_FAddress,

                            // thumbnail_path: path.normalize(path.join(path.dirname(p.TPIC_FAddress), 'sm-' + p.TPIC_FName)),
                            TPIC_FOrder: p.TPU_FOrder,
                            TPIC_FDelete: 0,
                            alt: p.TPU_FAlt,
                        }
                    }

                    //#endregion

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
            obj.products = TGoods.filter(g => g.saleid == obj.TPS_FID);
            for (var i = 0; i <= obj.products.length - 1; i++) {
                obj.products[i].TGO_FOrder = i
                obj.products[i].TGO_FTag = Number(obj.products[i].TGO_FTag)
                obj.products[i].TGO_FSlug = Number(obj.products[i].TGO_FSlug)
            }
            obj.productsOptionValue = TGoodsOptionValue;
            //#endregion

            //#region تصاویر
            obj.gallery = TPicture
            obj.gallery.forEach(p => {
                if (p && p.TPU_FAddress) {
                    p.TPIF_FName = p.TPU_FShowName
                    p.path = p.TPU_FAddress
                    p.TPIC_FID = p.TPU_FID_Picture
                    p.TPIC_FID_Parent = p.TPU_FID_Parent
                    // p.TPIC_FName = p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf('.'));
                    // p.path = path.normalize(p.TPIC_FAddress);
                    // p.thumbnail_path = path.normalize(path.join(path.dirname(p.TPU_FAddress), 'sm-' + p.TPU_FN));
                    p.TPIC_FDelete = 0
                }
                if(p.TPU_FID_State == 2400101){
                    p.TPIC_FForm = 'pageSale'
                }
                if(p.TPU_FID_State == 2400102){
                    p.TPIC_FForm = 'product'
                }
                if(p.TPU_FID_State == 2400103){
                    p.TPIC_FForm = 'optionImage'
                }
            })
            //#endregion


            return obj;
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default new pageSaleContentManageModel();