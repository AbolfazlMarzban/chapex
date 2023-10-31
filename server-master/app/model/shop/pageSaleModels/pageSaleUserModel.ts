import Model from "../../Model";
import path from "path";

class pageSaleUserModel extends Model {
    constructor() {
        super();
    }

    async get_show(FLink: string = "0") {

        try {

            var sqlQuery = `

            DECLARE @idPageSale INT;

            set @idPageSale=(select [TPS_FID] from [dbo].[TPageSale] where [TPS_FLink]='${FLink}')

            select 
                [TPS_FID],
	            [TPS_FTitle],
	            [TPS_FCaption],
	            [TPS_FDetails],
	            [TPS_FDesign],
                [TPS_FIntroduction],
	            [TPS_FIDs_Quality],
	            [TPS_FIDs_KeyWord],
	            [TPS_FSEO1],
	            [TPS_FID_NumberType],
	            [TPS_FIDs_PageRelation],
	            [TPS_FIDs_NumberList],
	            [TPS_FNumberDefault],
	            [TPS_FNumberMin],
	            [TPS_FNumberMax],
	            [TPS_FNumberStep],
	            [TPS_FUserViewType],
	            [TPS_IndexImage],
	            [TPS_FH1]
            from V_TPageSale
            where TPS_FID=@idPageSale
    
            select 
                [TD_FID],
                [TD_FID_Group],
                [TD_FType],
                [TD_FName],
                [TD_FCaption],
                [TD_FComment],
                [TD_FDefault],
                [TD_FShow],
                [TD_FActive],
                [TD_FRequired],
                [TD_FUserViewType],
                [TD_FFormType],
                [TD_FFormTypeAll],
                [TD_FActionToDeps],
                [TD_FHideOnAloneSet],
                [TD_ActionToBgSet],
                [TD_FValue2],
                [dependecy],
                [saleid]
            from V_TDefault
            where (saleid=@idPageSale
            OR TD_FID=20301)
            order by TD_FOrder asc
    

            select 
                [TGO_FID],
                [TGO_FName],
			    [TGO_FTag],
			    [TGO_FBuyPercent],
			    [TGO_FSaleMin],
			    [TGO_FSaleMax],
			    [TGO_FSalePriceMin],
			    [TGO_FSalePriceMid],
			    [TGO_FSalePriceMax],
			    [TGO_FSalePriceFix],
			    [TGO_FIDs_NumberList],
			    [TGO_FNumberDefault],
			    [TGO_FNumberMin],
			    [TGO_FNumberMax],
			    [TGO_FNumberStep],
			    [TGO_FProductionTime],
			    [TGO_IndexImage],
			    [saleid]
            from V_TGoods
            where (saleid=@idPageSale or TGO_FID in 
                    (select TGPV_FID_Goods from [V_TGoodsOptionValue]
                    where saleid=@idPageSale))
            order by TGO_FOrder
    
            select * from [TGoodsOptionValue]
            where saleid=@idPageSale and (TGPV_FDelete = 0)
    
    
            SELECT 
                [TPU_FID],
                [TPU_FID_State],
                [TPU_FID_Parent],
                [TPU_FID_Picture],
                [TPU_FAddress],
                [TPU_FAlt],
                [TPU_FShowName],
                [TPU_FOrder],
                [TPU_FName]
            FROM [V_TPictureUse]
            where 
		        (TPU_FID_State=2400101 and TPU_FID_Parent=@idPageSale)
		        or 
		        (TPU_FID_State=2400103 and TPU_FID_Parent in 
		            (
			            select TD_FID from V_TDefault
			            where saleid=@idPageSale
		            ))
		        or 
		        (TPU_FID_State=2400102 and TPU_FID_Parent in (
			        select TGO_FID from V_TGoods
			        where saleid=@idPageSale
		        )
                or 
               (TPU_FID_State = 2400301 and TPU_FID_Parent in (
                 select TGPV_FID from V_TGoodsOptionValue
                 where saleid=@idPageSale
               )))
                order by TPU_FOrder asc
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
            if (obj.TPS_FIDs_PageRelation)
                obj.TPS_FIDs_PageRelation = obj.TPS_FIDs_PageRelation.split(",")
                    .map((entry) => parseInt(entry))
                    .filter((entry) => typeof entry === "number");

            if (obj.TPS_FIDs_PageRelation == "") {
                obj.TPS_FIDs_PageRelation = []
            }
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

            //#region مالیات بر ارزش افزوده
            const valueAddedTax = TDefault.find((d) => d.TD_FID == 20301);
            if (valueAddedTax)
                obj.valueAddedTax = valueAddedTax.TD_FValue2
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
                            TPIC_FID: p.TPU_FID,
                            TPIC_FName: p.TPU_FAddress.lastIndexOf('/'),
                            // path: path.normalize(p.TPIC_FAddress),
                            path: p.TPU_FAddress,
                            thumbnail_path: p.TPU_FAddress.replace(p.TPIC_FName, 'sm-'+p.TPIC_FName),
                            TPIC_FOrder: p.TPU_FOrder,
                            TPIC_FDelete: 0,
                            TPIC_FAddress: p.TPU_FAddress,
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
            obj.relatedGoods = TGoods.filter(g => g.saleid != obj.TPS_FID);
            for (var i = 0; i <= obj.products.length - 1; i++) {
                obj.products[i].TGO_FOrder = i
            }
            obj.productsOptionValue = TGoodsOptionValue;
            //#endregion

            //#region تصاویر
            obj.gallery = TPicture
            obj.gallery.forEach(p => {
                if (p && p.TPU_FAddress) {
                    p.TPIC_FName = p.TPU_FAddress.lastIndexOf('/')
                    p.path = p.TPU_FAddress;
                    p.thumbnail_path = p.TPU_FAddress.replace(p.TPU_FName, 'sm-' + p.TPU_FName)
                    p.path = p.TPU_FAddress,
                    p.TPIC_FAddress= p.TPU_FAddress,
                    p.alt = p.TPU_FAlt
                    p.TPIC_FID_Parent = p.TPU_FID_Parent.toString()
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

            // console.log('gallery', obj.gallery)
            return obj;
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default new pageSaleUserModel();