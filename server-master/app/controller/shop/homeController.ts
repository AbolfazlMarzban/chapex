import { Request, Response, NextFunction } from "express";
import Controller from "../Controller";
import userSalePageModel from "../../model/shop/salePageUserModel";
import pageSaleController from "./pageSaleController";

class HomeController extends Controller {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await userSalePageModel.getProductViewData();

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getSiteMap(req: Request, res: Response, next: NextFunction) {
    try {
      let type = req.params.type;
      const data = await userSalePageModel.getSiteMap(type);

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
}
export default new HomeController();
