import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";

import PageSaleModel from "../../model/shop/pageSaleModel";

import OptionsModel from "../../model/shop/optionsModel";
import OptionsPageSaleModel from "../../model/shop/optionsPageSaleModel";

import ProductModel from "../../model/shop/productModel";

import fileUploaderModel from "../../model/fileUploaderModel";
import pageSaleUserModel from "../../model/shop/pageSaleModels/pageSaleUserModel";

class PageSaleUserController extends Controller {
  constructor() {
    super();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data = {
        pageSale: {},
        pageSaleOption: [],
        productList: [],
        goodsList: [],
      };
      if (mode == "init") {
        // get a page sale {object}
        data.pageSale = await PageSaleModel.get("TPageSaleFID", id);
        const pageSaleID = data["pageSale"]["TPS_FID"];

        // get options of page sale {object}
        data.pageSaleOption = await PageSaleModel.get(
          "TPageOptionList",
          pageSaleID
        );

        // get options from TGoodsOptionValue
        const pageSaleOptionValues = await PageSaleModel.get(
          "TPageOptionValueListAll",
          pageSaleID
        );
        // console.log(data.pageSaleOption);

        // console.log(pageSaleOptionValues);


        // get product list of page sale [array]
        data.productList = await PageSaleModel.get(
          "TPageGoodsList",
          pageSaleID
        );

        // set options value to pageSaleOption Data
        for (const product of data.productList) {
          for (const option of data.pageSaleOption) {
            const result = pageSaleOptionValues.filter(
              (op) => op.TGPV_FID_Option == option.TGP_FID_Option
            );
            option["options"] = result;
            const optionsValue = await OptionsPageSaleModel.getOptionValue(
              "TGoodsOptionValueListFID",
              option.TGP_FID_Option,
              0
            );
            option["optionValues"] = optionsValue
            product["optionValues"] = optionsValue
          }
        }

        // get all goods
        data.goodsList = await ProductModel.get("TGoodsList_Pan", "0");

        // get option of product list
        if (data.productList.length > 0) {
          for (let product of data.productList) {
            let productID = product["TPG_FID_Goods"];
            product["option"] = await OptionsModel.get(
              "TGoodsOptionList",
              productID
            );
            product["detail"] = await ProductModel.get("TGoodsFID_Pan", productID);
          }
        }
      }
      res.json({ data });
      // console.log(data);

    } catch (error) {
      next(error);
    }
  }

  async getid(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const flink = req.params.flink;
      // console.log('get by flink', flink);

      let data = await PageSaleModel.getid(flink);

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getbyflink(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const flink = req.params.flink;
      // console.log('get by flink', flink);

      let data = await pageSaleUserModel.get_show(flink);

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default new PageSaleUserController();
