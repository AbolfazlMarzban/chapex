import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";

import DefaultsModel from "../../model/defaultModel";
import formBuilderModel from "../../model/formBuilder/formBuilderModel";

import PageSaleModel from "../../model/shop/pageSaleModel";
import ProductModel from "../../model/shop/productModel";
import abolTableModel from "../../model/abolTableModel";

import fileUploaderModel from "../../model/fileUploaderModel";
// import CategoryModel from "../../model/shop/categoryModel";

// import ProductModel from "../../model/shop/productModel";

import Date from "../../helper/date";

class PageSaleController extends Controller {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data: any = {
        form: {},
        defaults: {},
        table: [],
        tableHeaders: [],
      };
      const neededDefaults = [211, 217, 228, 231, 273, 274, 275];

      if (mode == "init") {
        for (const def of neededDefaults) {
          data.defaults[def] = await this.getDefaults(def);
        }

        data.form = await PageSaleModel.getTableSchema("TPageSale");
        data.form["TPS_FUserReg"] = req.TU_FID;
        data.form["TPS_FActive"] = 0;
        data.form["TPS_FDateReg"] = new Date().currentDate;
        data.form.options = [];
        data.form.optionsValues = [];
        data.form.TPS_FIDs_Category = [];
        data.form.TPS_FIDs_CategoryIndex = [];
        data.form.products = [];
        data.form.productsOptionValue = [];
        data.form.gallery = [];
        data.form.TPS_FID_NumberType = "";
        data.form.TPS_FNumberMin = null;
        data.form.TPS_FNumberMax = null;
        data.form.TPS_FNumberStep = null;
        data.form.TPS_FNumberDefault = null;
        data.form.TPS_FIDs_NumberList = [];
      } else if (mode == "table") {
        data.table = await PageSaleModel.get("TPageSaleList", "0");
        data.tableHeaders = await abolTableModel.get("fa", 11204, req.TU_FID);

        data.form = undefined;
        data.defaults = undefined;
      } else if (mode == "show") {
        for (const def of neededDefaults) {
          data.defaults[def] = await this.getDefaults(def);
        }

        data.form = await PageSaleModel.get("TPageSaleFID", id);
        data.table = undefined;
      } else if (mode == "manage") {
        for (const def of neededDefaults) {
          data.defaults[def] = await this.getDefaults(def);
        }

        data.form = await PageSaleModel.get("manage", id);
        data.table = undefined;
      } else if (mode == "contentManage") {
        for (const def of neededDefaults) {
          data.defaults[def] = await this.getDefaults(def);
        }

        data.form = await PageSaleModel.get("contentManage", id);
        data.form.formList = await formBuilderModel.getForm("TFormList");
        data.table = undefined;
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getDefaults(def) {
    var ret = await DefaultsModel.findByGroupId(def);

    if (ret) {
      for (var i = 0; i <= ret.length - 1; i++) {
        ret[i].id = ret[i].TD_FID;
        ret[i].name = ret[i].TD_FName;
        ret[i].children = [];
        if (ret[i].TD_FSubGroup == 1) {
          ret[i].children = await this.getDefaults(ret[i].TD_FID);
        }
      }

      return ret;
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      let data: Object;
      data = req.body.data;

      const result = await PageSaleModel.save(data, req.TU_FID, "Insert");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      let data: object;
      data = req.body.data;
      let state = req.body.state;

      const result = await PageSaleModel.save(data, req.TU_FID, state);

      if (result) {
        res.status(result.status).json(result);
      } else {
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await PageSaleModel.delete(id, req.TU_FID, "TPageSale");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  /***************** Goods */

  async getGoods(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data: any = {
        form: {},
        defaults: {},
        table: [],
      };

      if (mode == "init") {
        data.form = await PageSaleModel.getTableSchema("TPageGoods");
        data.defaults.goodsList = await ProductModel.get(
          "TGoodsCombo_Pan",
          "1"
        );
      } else if (mode == "table") {
        data.table = await PageSaleModel.get("TPageGoodsList", id);
        data.form = undefined;
        data.defaults = undefined;
      } else if (mode == "show") {
        data.form = await PageSaleModel.get("TPageGoodsFID", id);
        data.defaults.goodsList = await ProductModel.get("TGoodsCombo_Pan");

        data.table = undefined;
        // for (const def of neededDefaults) {
        //   data.defaults[def] = await DefaultsModel.findByGroupId(def);
        // }
      }
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async insertGoods(req: Request, res: Response, next: NextFunction) {
    try {
      let data: Object;
      data = req.body.data;
      const result = await PageSaleModel.saveGoods(data, req.TU_FID, "Insert");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async updateGoods(req: Request, res: Response, next: NextFunction) {
    try {
      let data: object;
      data = req.body.data;
      const result = await PageSaleModel.saveGoods(data, req.TU_FID, "Update");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async deleteGoods(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await PageSaleModel.delete(id, req.TU_FID, "TPageGoods");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  /*******************options */

  async getOptions(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data: any = {
        form: {},
        defaults: {},
        table: [],
      };

      if (mode == "init") {
        data.form = await PageSaleModel.getTableSchema("TPageOption");
        // console.log(data.form);
      } else if (mode == "table") {
        data.table = await PageSaleModel.get("TPageOptionList", "0");
        data.form = undefined;
        data.defaults = undefined;
      } else if (mode == "show") {
        data.form = await PageSaleModel.get("TPageOptionFID", id);
        data.table = undefined;
        // for (const def of neededDefaults) {
        //   data.defaults[def] = await DefaultsModel.findByGroupId(def);
        // }
      }
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async insertOptions(req: Request, res: Response, next: NextFunction) {
    try {
      let data: Object;
      data = req.body.data;
      const result = await PageSaleModel.saveOption(data, req.TU_FID, "Insert");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async updateOptions(req: Request, res: Response, next: NextFunction) {
    try {
      let data: object;
      data = req.body.data;
      const result = await PageSaleModel.saveOption(data, req.TU_FID, "Update");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async deleteOptions(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await PageSaleModel.delete(id, req.TU_FID, "TPageOption");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  // page sale user

  async getPageSell(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      let data = {
        pageSell: {},
        optionPageSell: {},
        product: [],
      };
      data.pageSell = await PageSaleModel.get("TPageSaleFID", id);

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
}

export default new PageSaleController();
