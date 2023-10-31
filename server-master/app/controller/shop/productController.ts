import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";

import DefaultsModel from "../../model/defaultModel";
import CategoryModel from "../../model/shop/categoryModel";

import ProductModel from "../../model/shop/productModel";
import pageSaleController from "./pageSaleController";
import StandardModel from "../../model/standard/standardModel";

import FormBuilderModel from "../../model/formBuilder/formBuilderModel";

import Date from "../../helper/date";
import abolTableModel from "../../model/abolTableModel";

class ProductController extends Controller {
  // goods
  async getGoods(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data: any = {
        form: {},
        defaults: {},
        table: [],
        tableHeaders: [],
      };
      const neededDefaults: Array<number> = [206, 207, 222, 223, 224, 227, 225, 272];

      if (mode == "init") {
        data.form = await ProductModel.getTableSchema("TGoods");
        data.form.options = []

        for (const def of neededDefaults) {
          data.defaults[def] = await pageSaleController.getDefaults(def);
        }
        data.defaults.category = await CategoryModel.getCategoriesForCombo();
        data.defaults.box = await StandardModel.get("TGoodsBoxList", "0");

        this.setInitialData(req.TU_FID, data.form, 0);

      } else

        if (mode == "table") {
          data.table = await ProductModel.get("TGoodsList_Pan", "0");
          data.tableHeaders = await abolTableModel.get('fa', 11201, req.TU_FID);
          data.form = undefined;
          for (const def of neededDefaults) {
            data.defaults[def] = await pageSaleController.getDefaults(def);
          }
        } else

          if (mode == "show") {
            data.form = await ProductModel.get("TGoodsFID_Pan", id);
            data.table = undefined;
            for (const def of neededDefaults) {
              data.defaults[def] = await pageSaleController.getDefaults(def);
            }
            data.defaults.category = await CategoryModel.getCategoriesForCombo();
            data.defaults.box = await StandardModel.get("TGoodsBoxList", "0");
          }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async TGO_FCode2TGO_FID(req: Request, res: Response, next: NextFunction) {
    const TGO_FCode = req.params.TGO_FCode;

    let TGO_FID = await ProductModel.TGO_FCode2TGO_FID(TGO_FCode);

    if (TGO_FID)
      res.json({ TGO_FID });
  }

  async insertGoods(req: Request, res: Response, next: NextFunction) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next);
      if (errors) {
        return;
      }
      let data: Object;
      data = req.body.data;
      const result = await ProductModel.save(data, req.TU_FID, "Insert");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async updateGoods(req: Request, res: Response, next: NextFunction) {
    try {
      let data: object;
      // validation handler
      const errors = this.validationErrorHandler(req, res, next);
      if (errors) {
        return;
      }
      data = req.body.data;
      const result = await ProductModel.save(data, req.TU_FID, "Update");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async deleteGoods(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await ProductModel.delete(id, req.TU_FID);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  // product
  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const mode = req.query.mode;

      let data: any = {
        form: {},
        defaults: {},
        table: [],
      };

      let neededDefaults: Array<number> = [
        206,
        207,
        222,
        223,
        224,
        225,
        270,
        271,
        272,
      ];
      if (mode == "init") {
        data.form = await ProductModel.getTableSchema("TGoods");
        for (const def of neededDefaults) {
          const defaults = await DefaultsModel.findByGroupId(def);

          if (defaults) {
            for (var j = 0; j <= defaults.length - 1; j++) {
              if (defaults[j].TD_FSubGroup == 1) {
                defaults[j].children = await DefaultsModel.findByGroupId(defaults[j].TD_FID)
              }
            }
          }

          data.defaults[def] = defaults
        }
        // data.defaults.formList = await FormBuilderModel.getForm("TFormList");
        data.defaults.category = await CategoryModel.getCategoriesForCombo();
        data.defaults.goodsList = await ProductModel.get("TGoodsCombo_Pan");
        data.defaults.box = await StandardModel.get("TGoodsBoxList", "0");

        this.setInitialData(req.TU_FID, data.form, 1);

      } else if (mode == "table") {
        data.table = await ProductModel.get("TGoodsList_Pan", "1");
        data.form = undefined;
        data.defaults = undefined;
      } else

        if (mode == "show") {
          data.form = await ProductModel.get("TGoodsFID_Pan", id);
          data.table = undefined;
          for (const def of neededDefaults) {
            data.defaults[def] = await DefaultsModel.findByGroupId(def);
          }
          data.defaults.category = await CategoryModel.getCategoriesForCombo();
          data.defaults.formList = await FormBuilderModel.getForm("TFormList");
          data.defaults.goodsList = await ProductModel.get("TGoodsCombo_Pan");
          data.defaults.box = await StandardModel.get("TGoodsBoxList", "0");
        }
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
  async insertProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let data: Object;
      data = req.body.data;
      const result = await ProductModel.save(data, req.TU_FID, "Insert");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      let data: object;
      data = req.body.data;
      const result = await ProductModel.save(data, req.TU_FID, "Update");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await ProductModel.delete(id, req.TU_FID);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  setInitialData(user: number, schema: any, parent: number) {
    const DateTime = new Date();
    schema.TGO_FID_Parent = parent;
    schema.TGO_FUserReg = user;
    schema.TGO_FID_NumberType = 27002;
    schema.TGO_FDateReg = DateTime.now().currentDate;
    schema.TGO_FTimeReg = DateTime.now().currentTime;
  }
}

export default new ProductController();
