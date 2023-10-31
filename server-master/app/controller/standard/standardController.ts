import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";

import DefaultsModel from "../../model/defaultModel";
import CategoryModel from "../../model/shop/categoryModel";

import StandardModel from "../../model/standard/standardModel";

// import Date from "../../helper/date";

class StandardController extends Controller {
  // goods
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data: any = {
        form: {},
        defaults: {},
        table: [],
      };
      const neededDefaults: Array<number> = [226, 227];
      if (mode == "init") {
        data.form = await StandardModel.getTableSchema("TGoodsBox");
        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
        data.defaults.category = await CategoryModel.getCategoriesForCombo();
        // this.setInitialData(req.TU_FID, data.form, 0);
      } else if (mode == "table") {
        data.table = await StandardModel.get("TGoodsBoxList", "0");
        // console.log(data.table);
        data.form = undefined;
        data.defaults = undefined;
      } else if (mode == "show") {
        data.form = await StandardModel.get("TGoodsBoxFID", id);
        data.table = undefined;
        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next);
      if (errors) {
        return;
      }
      let data: Object;
      data = req.body.data;
      const result = await StandardModel.save(data, req.TU_FID, "Insert");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next);
      if (errors) {
        return;
      }
      let data: object;
      data = req.body.data;
      const result = await StandardModel.save(data, req.TU_FID, "Update");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await StandardModel.delete(id, req.TU_FID);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
}

export default new StandardController();
