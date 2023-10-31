import { Request, Response, NextFunction } from "express";
import reportModel from "../../model/report/reportModel";


import Date from "../../helper/date";

import Controller from "../Controller";
class reportController extends Controller {
  constructor() {
    super();
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.params.id;
      const mode = req.query.mode;
      let data = {
        table: {},
      };

    if (mode == "optionsInProducts") {
        data.table = await reportModel.getReport(
          "OptionInProduct",
          id
        );
      } 
      else if (mode == "goodsInProducts") {
        data.table = await reportModel.getReport("GoodsInProduct", id);
      } 
      else if (mode == "productsInSalePages") {
        //this is my change and write it to know how resolve conflicts
        data.table = await reportModel.getReport(
          "ProductInTPageSale",
          id
        );
      } 
    
      else if (mode == "SaleGoods") {
        data.table = await reportModel.getReport("SaleGoods", id, req.TU_FID);
      } else if (mode == "SaleProduct") {
        data.table = await reportModel.getReport(
          "SaleProduct",
          "0",
          req.TU_FID
        );
      }
      else if (mode == "priceChanges") {
        data.table = await reportModel.getReport(
          "GoodsPriceChange",
          id
        );
      }
      res.json({ data });
    } 

    catch (error) {
      next(error);
    }
  }
  async getChart(req: Request, res: Response, next: NextFunction) {
    try {
      let goodsId = req.params.goodsId;
      let priceType = req.params.priceType;
      let timeRange = req.params.timeRange;
      const date = new Date();
      let todayTime = date.now().currentDate
      let data = {};
    
      data = await reportModel.getChart("GoodsPriceChart" , goodsId , timeRange ,  priceType, todayTime)
      
      res.json({ data });
    } 

    catch (error) {
      next(error);
    }
  }
}
export default new reportController();
