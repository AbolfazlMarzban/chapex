import { Request, Response, NextFunction } from "express";

import DefaultsModel from "../../model/defaultModel";

import OptionsModel from "../../model/shop/optionsModel";

import ProductModel from "../../model/shop/productModel";

import Controller from "../Controller";

import Date from "../../helper/date";

class OptionsController extends Controller {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data = {
        form: {},
        defaults: {},
        table: [],
        optionsValue: [],
      };
      const neededDefaults: Array<number> = [220, 222];

      if (mode == "init") {
        data.form = await OptionsModel.getTableSchema("TGoodsOption");

        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
        data.defaults["goodsList"] = await ProductModel.get("TGoodsCombo_Pan");
        this.setInitialValue(data.form, req.TU_FID);

        data.table = undefined;
      } else if (mode == "table") {
        data.table = await OptionsModel.get("TGoodsOptionList", id);
        data.form = undefined;
      } else if (mode == "show") {
        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
        data.defaults["goodsList"] = await ProductModel.get("TGoodsCombo_Pan");

        data.form = await OptionsModel.get("TGoodsOptionListFID", id);
        data.table = undefined;
      } else if (mode == "optionsList") {
        data.defaults["subGroup"] = await DefaultsModel.findByGroupId(
          parseInt(id)
        );
      } else if (mode == "optionsValueList") {
        console.log("sdfsdf", id);

        data.optionsValue = await OptionsModel.getOptionValue(
          "TGoodsOptionValueList",
          id
        );

        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
        data.defaults["goodsList"] = await ProductModel.get("TGoodsCombo_Pan");
      }
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;

      let dependencyList = "";
      let dependencyListArray = [...data.data.TGP_FDependency];
      for (const dependency of data.data.TGP_FDependency) {
        dependencyList += dependency.TD_FID + ",";
      }
      data.data.TGP_FDependency = dependencyList;
      const result = await OptionsModel.saveOption(
        data.data,
        req.TU_FID,
        "Insert"
      );
      if (result) {
        const optionsValuesSchema = await OptionsModel.getTableSchema(
          "TGoodsOptionValue"
        );
        for (const dependID of dependencyListArray) {
          optionsValuesSchema["TGPV_FID_Goods"] = data.data.TGP_FID_Goods;
          optionsValuesSchema["TGPV_FID_Option"] = data.data.TGP_FID_Option;
          console.log("dependID", dependID);

          optionsValuesSchema["TGPV_FID_Value"] = dependID.TD_FID;
          optionsValuesSchema["TGPV_FID_GoodsOption"] = result.output.ReturnFID;
          optionsValuesSchema["TGPV_FCount"] = 1;
          optionsValuesSchema["TGPV_FRepet"] = 1;

          const optionsValueResult = await OptionsModel.saveOptionValue(
            optionsValuesSchema,
            req.TU_FID,
            "Insert"
          );
          if (optionsValueResult) {
            console.log("optionValue INSERTED !!!!!");
          }
        }
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      let dependencyList = "";
      let dependencyListArray = [...data.data.TGP_FDependency];
      for (const dependency of data.data.TGP_FDependency) {
        dependencyList += dependency.TD_FID + ",";
      }
      data.data.TGP_FDependency = dependencyList;
      const result = await OptionsModel.saveOption(
        data.data,
        req.TU_FID,
        "Update"
      );

      if (result) {
        if (data.status == "insert") {
          const optionsValuesSchema = await OptionsModel.getTableSchema(
            "TGoodsOptionValue"
          );
          for (const dependID of data.changeIDs) {
            optionsValuesSchema["TGPV_FID_Goods"] = data.data.TGP_FID_Goods;
            optionsValuesSchema["TGPV_FID_Option"] = data.data.TGP_FID_Option;
            optionsValuesSchema["TGPV_FID_Value"] = dependID.TD_FID;
            optionsValuesSchema["TGPV_FID_GoodsOption"] = data.data.TGP_FID;

            const optionsValueResult = await OptionsModel.saveOptionValue(
              optionsValuesSchema,
              req.TU_FID,
              "Insert"
            );
          }
        } else if (data.status == "delete") {
          let optionValueList = await OptionsModel.getOptionValue(
            "TGoodsOptionValueList",
            data.data.TGP_FID
          );
          for (const dependID of data.changeIDs) {
            const valueDeleted = optionValueList.find(
              (item) => item.TGPV_FID_Value == dependID.TD_FID
            );
            const result = await OptionsModel.deleteValue(
              valueDeleted.TGPV_FID,
              req.TU_FID
            );
          }
        }
      }
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async insertDependency(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      // const optionsDependancySchema = await OptionsModel.getTableSchema(
      //   "TGoodsOptionDepend"
      // );
      console.log(data);
      await OptionsModel.saveOptionValue(data, req.TU_FID, "Update");
      const dependancyValueResult = await OptionsModel.saveDependancyValue(
        data,
        req.TU_FID,
        "Insert"
      );
      if (dependancyValueResult) {
        this.responseHandler(dependancyValueResult, res);
      }
    } catch (error) {
      next(error);
    }
  }
  async Oldinsert(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      console.log(data.data.TGP_FDependency);
      let dependencyList = "";
      for (const dependency of data.data.TGP_FDependency) {
        dependencyList += dependency.id + ",";
      }
      data.data.TGP_FDependency = dependencyList;
      const result = await OptionsModel.saveOption(
        data.data,
        req.TU_FID,
        "Insert"
      );

      if (result) {
        const optionsValuesSchema = await OptionsModel.getTableSchema(
          "TGoodsOptionValue"
        );
        const optionValues = { ...data.tabs };
        for (const value in optionValues) {
          optionsValuesSchema["TGPV_FID_Goods"] = data.data.TGP_FID_Goods;
          optionsValuesSchema["TGPV_FID_Option"] = data.data.TGP_FID_Option;
          optionsValuesSchema["TGPV_FID_Value"] = optionValues[value].item.id;
          optionsValuesSchema["TGPV_FCount"] = parseInt(
            optionValues[value]["data" + value].TGPV_FCount
          );
          optionsValuesSchema["TGPV_FID_Product"] = parseInt(
            optionValues[value]["data" + value].TGPV_FID_Goods
          );

          optionsValuesSchema["TGPV_FRepet"] = parseInt(
            optionValues[value]["data" + value].TGPV_FRepet
          );
          // TGP_FID_Option
          // optionsValuesSchema["TGPV_FID_Option"] =
          //   optionValues[value]["data" + value].TGPV_FID_Option;
          optionsValuesSchema["TGPV_FComment"] =
            optionValues[value]["data" + value].TGPV_FComment;
          optionsValuesSchema["TGPV_FID_GoodsOption"] = result.output.ReturnFID;
          const optionsValueResult = await OptionsModel.saveOptionValue(
            optionsValuesSchema,
            req.TU_FID,
            "Insert"
          );
          if (optionsValueResult) {
            const optionsDependancySchema = await OptionsModel.getTableSchema(
              "TGoodsOptionDepend"
            );
            if (optionValues[value]["dependencyValue"].length > 0) {
              for (const dependancy of optionValues[value]["dependencyValue"]) {
                optionsDependancySchema["TGPD_FID_Goods"] =
                  data.data.TGP_FID_Goods;
                optionsDependancySchema["TGPD_FID_Option"] =
                  data.data.TGP_FID_Option;
                optionsDependancySchema["TGPD_FID_Value"] =
                  optionValues[value].item.id;
                optionsDependancySchema["TGPD_FID_OptionDepend"] =
                  dependancy.TGPD_FID_OptionDepend;
                optionsDependancySchema["TGPD_FID_ValueDepend"] =
                  dependancy.TGPD_FID_ValueDepend;
                optionsDependancySchema["TGPD_FID_Type"] =
                  dependancy.TGPD_FID_Type;
                optionsDependancySchema["TGPD_FComment"] =
                  dependancy.TGPD_FComment;
                optionsDependancySchema["TGPD_FID_GoodsOption"] =
                  optionsValueResult.output.ReturnFID;
                const dependancyValueResult = await OptionsModel.saveDependancyValue(
                  optionsDependancySchema,
                  req.TU_FID,
                  "Insert"
                );
              }
            }
          }
        }
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await OptionsModel.delete(id, req.TU_FID);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  setInitialValue(schema, user) {
    const DateTime = new Date();
    schema.TGP_FUserReg = user;
    schema.TGP_FDateReg = DateTime.now().currentDate;
  }
}

export default new OptionsController();
