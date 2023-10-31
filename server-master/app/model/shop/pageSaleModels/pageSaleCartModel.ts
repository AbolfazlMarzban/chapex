import Model from "../../Model";
import path from "path";

class pageSaleCartModel extends Model {
    constructor() {
        super();
    }

    async get_show(salePageId: Number = 0) {

        try {

            var sqlQuery = `

            DECLARE @idPageSale INT;

            set @idPageSale=${salePageId}

            select 
            [TPS_FID],
            [TPS_FTitle],
            [TPS_FActive],
            [TPS_FDelete],
            [TPS_FID_NumberType],
            [TPS_FIDs_NumberList],
            [TPS_FLink],
            [TPS_FNumberMax],
            [TPS_FNumberMin]
            from V_TPageSale
            where TPS_FID=@idPageSale
    
            select 
            [TD_FID],
            [TD_FID_Group],
            [TD_FName],
            [TD_FActive],
            [TD_FDelete],
            [TD_FShow],
            [TD_FType],
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
            [TGO_FActive],
            [TGO_FArchive],
            [TGO_FCanSale],
            [TGO_FID_Parent],
            [TGO_FNumberMin],
            [TGO_FProductionTime],
            [TGO_FSlug],
            [TGO_FTag],
            [TGO_FSaleMin],
            [TGO_FSalePriceMax],
            [TGO_FSalePriceFix],
            [TGO_FBuyPercent],
            [saleid]
            from V_TGoods
            where (saleid=@idPageSale or TGO_FID in (
                select TGPV_FID_Goods from [V_TGoodsOptionValue]
                    where saleid=@idPageSale
                )) and (TGO_FDelete = 0) 
                order by TGO_FOrder
    
            select 
            [TGPV_FID],
            [TGPV_FID_Goods],
            [TGPV_FID_Option],
            [TGPV_FID_Value],
            [TGPV_FID_Product],
            [TGPV_FPrice],
            [TGPV_FCount],
            [TGPV_FRepet],
            [TGPV_FWaste],
            [saleid]
            from [TGoodsOptionValue]
            where saleid=@idPageSale and (TGPV_FDelete = 0)
    
    
            SELECT 
            [TPIC_FID],
            [TPIC_FID_Parent],
            [TPIC_FName],
            [TPIC_FAddress],
            [TPIC_FOrder],
            [TPIC_FDelete],
            [TPIC_FComment],
            [TPIC_FForm]
            FROM [V_TPicture]
            where 
		        (TPIC_FForm='pageSale' and TPIC_FID_Parent=@idPageSale)
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
                    const p = TPicture.find(p => p.TPIC_FID_Parent == child.TD_FID)

                    if (p) {
                        child.picture = {
                            TPIC_FID: p.TPIC_FID,
                            TPIC_FName: p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf('.')),
                            path: path.normalize(p.TPIC_FAddress),
                            thumbnail_path: path.normalize(path.join(path.dirname(p.TPIC_FAddress), 'sm-' + p.TPIC_FName)),
                            TPIC_FOrder: p.TPIC_FOrder,
                            TPIC_FDelete: p.TPIC_FDelete,
                            alt: p.TPIC_FComment,
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
                if (p && p.TPIC_FAddress && p.TPIC_FName) {
                    // p.TPIC_FName = p.TPIC_FName.substr(0, p.TPIC_FName.lastIndexOf('.'));
                    p.path = path.normalize(p.TPIC_FAddress);
                    p.thumbnail_path = path.normalize(path.join(path.dirname(p.TPIC_FAddress), 'sm-' + p.TPIC_FName));
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

export default new pageSaleCartModel();