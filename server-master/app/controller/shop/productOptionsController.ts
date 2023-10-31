import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";
import Date from "../../helper/date";

import DefaultsModel from "../../model/defaultModel";

import File from "../../helper/file";

// import featuresModel from "../../model/shop/featuresModel";
// import CategoryModel from "../../model/shop/categoryModel";

// import ProductModel from "../../model/shop/productModel";

// import Date from "../../helper/date";

class productOptionsController extends Controller {

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      let id = req.params.id;
      let data: any = {
        form: {},
        defaults: {},
        table: [],
      };

      if (mode == "init") {
        data.form = await DefaultsModel.getTableSchema("TDefault");
        if (id == "0") {
          id = "220";
        }
        data.form.TD_FCode = Number(
          await DefaultsModel.UFN_Coding("TDefault_FCode", Number(id))
        );

        data.form.TD_FID_Group = id;
        data.form.children = [];
        data.form.TD_FShow = 1;
        data.form.TD_FActive = 1;
        data.form.TD_FUserReg = req.TU_FID;
        data.form["TD_FDateReg"] = new Date().currentDate;
      }
      else if (mode == "table") {
        data.table = await DefaultsModel.get("220", "Detail_TDefault");
        data.form = undefined;
        data.defaults = undefined;
      }
      else if (mode == "show") {
        data.form = await DefaultsModel.get(id, "MainGroup_TDefault");
        data.table = undefined;
        // for (const def of neededDefaults) {
        //   data.defaults[def] = await DefaultsModel.findByGroupId(def);
        // }
      }
      else if (mode == "children") {
        if (id == "0" || id == "220") {
          data.table = await DefaultsModel.get("220", "Detail_TDefault");
        } else {
          data.table = await DefaultsModel.findByGroupId(Number(id));
        }
      }
      else if (mode == "all") {
        data.table = await DefaultsModel.getAll(220, "Detail_TDefault");

        // await data.table.forEach(option=>{
        //   option.children = DefaultsModel.findByGroupId(Number(option.TD_FID))
        // })
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      let data: Object;
      data = req.body.data;
      const result = await DefaultsModel.save(data, req.TU_FID, "Insert");
      if (result.output.RetID == 1) {
        // console.log(result);

        data["TD_FID"] = result.output.ReturnFID;
        const imageFieldsName = ["TD_FValue4", "TD_FComment"];
        File.RealTimeImageHandler(
          "insert",
          "optionIcon",
          data,
          imageFieldsName,
          data
        );
        let newProductOptionData = File.RealTimeImageHandler(
          "insert",
          "optionImage",
          data,
          imageFieldsName,
          data
        );
        await DefaultsModel.save(newProductOptionData, req.TU_FID, "Update");

        // if (data["children"] && data["children"].length > 0) {
        //   data["children"].forEach(async child => {
        //     const childRes = await DefaultsModel.save(child, req.TU_FID, "Insert");
        //   })
        // }
      }
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      let data: object;
      data = req.body.data;
      const result = await DefaultsModel.save(data, req.TU_FID, "Update");
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await DefaultsModel.delete(id);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
}

export default new productOptionsController();
