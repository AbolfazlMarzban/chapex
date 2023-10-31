import { Request, Response, NextFunction } from "express";

import DefaultsModel from "../../model/defaultModel";

import OptionsPageSaleModel from "../../model/shop/optionsPageSaleModel";

import ProductModel from "../../model/shop/productModel";
import PageSaleModel from "../../model/shop/pageSaleModel"

import Controller from "../Controller";

import Date from "../../helper/date";

class OptionsPageSaleController extends Controller {
  constructor() {
    super();
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      let data = {
        valueList: [],
        form: {},
        defaults: {},
        table: [],
        optionValueSchema: {},
      };
      const neededDefaults: Array<number> = [220, 222];
      data.defaults["goodsList"] = await ProductModel.get("TGoodsCombo_Pan");
      data.defaults["productList"] = await ProductModel.get(
        "TGoodsCombo_Pan",
        "1"
      );
      if (mode == "init") {
        data.form = await OptionsPageSaleModel.getTableSchema("TPageOption");

        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
        // this.setInitialValue(data.form, req.TU_FID);
        data.table = undefined;
      } else if (mode == "table") {
        // console.log("idddddddddd", id);
        data.table = await OptionsPageSaleModel.get("TPageOptionList", id);
      } else if (mode == "show") {
        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
        data.form = await OptionsPageSaleModel.get("TPageOptionFID", id);
        
        let OptionValueList = data.form["TPP_FIDs_Value"].split(",");
        data.optionValueSchema = await OptionsPageSaleModel.getTableSchema(
          "TPageOptionValue"
        );
        
        data.valueList = await PageSaleModel.get(
          "TPageOptionValueList",
          data.form['TPP_FID_PageSale'],
          data.form['TPP_FID_Option']
        );
          
        
        // for (const valueId of OptionValueList) {
        //   const value = await DefaultsModel.findById(valueId);
        //   let optionsValueSchema = await OptionsPageSaleModel.getTableSchema(
        //     "TPageOptionValue"
        //   );
        //   if (optionsValueSchema["TPPV_FCaption"] == "") {
        //     optionsValueSchema["TPPV_FCaption"] = value.TD_FName;
        //   }
        //   // optionsValueSchema['TPPV_FID_Value'] = value.TD_FID
        //   // optionsValueSchema['TPPV_FID_Option'] = data.form['TPP_FID_Option']
        //   optionsValueSchema["TPPV_FID_PageSale"] =
        //     data.form["TPP_FID_PageSale"];
        //   data.valueList.push(optionsValueSchema);
        // }
      } else if (mode == "optionsList") {
        data.defaults["subGroup"] = await DefaultsModel.findByGroupId(
          parseInt(id)
        );
      }
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      let valuesID = [];
      const valueList = [...data.data.TPP_FIDs_Value]
      for (const valueID of data.data.TPP_FIDs_Value) {
        valuesID.push(valueID.TD_FID);
      }

      data.data.TPP_FIDs_Value = valuesID.toString();
      const result = await OptionsPageSaleModel.saveOption(
        "Insert",
        data.data,
        req.TU_FID
      );

      if (result) {
        const optionsValuesSchema = await OptionsPageSaleModel.getTableSchema(
          "TPageOptionValue"
        );
        for (const item of valueList) {
          optionsValuesSchema['TPPV_FID_Option']= data.data.TPP_FID_Option
          optionsValuesSchema['TPPV_FID_PageSale'] = data.data.TPP_FID_PageSale
          optionsValuesSchema['TPPV_FID_Value']= item['TD_FID']
          // data.tabs[tab]["data" + data.tabs[tab].item.TD_FID][
          //   "TPPV_FID_Option"
          // ] = data.data["TPP_FID_Option"];

          // data.tabs[tab]["data" + data.tabs[tab].item.TD_FID][
          //   "TPPV_FID_Value"
          // ] = data.tabs[tab]["item"].TD_FID;

          // data.tabs[tab]["data" + data.tabs[tab].item.TD_FID][
          //   "TPPV_FID_Pa geSale"
          // ] =
          //   data.tabs[tab]["data" + data.tabs[tab]["item"].TD_FID][
          //     "TPPV_FID_PageSale"
          //   ];

          const result = await OptionsPageSaleModel.saveOptionsValue(
            "Insert",
            optionsValuesSchema,
            req.TU_FID
          );
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
      let dependencyListArray = [...data.data.TPP_FIDs_Value];
      for (const dependency of data.data.TPP_FIDs_Value) {
        dependencyList += dependency.TD_FID + ",";
      }
      data.data.TPP_FIDs_Value = dependencyList;
      const result = await OptionsPageSaleModel.saveOption(
        "Update",
        data.data,
        req.TU_FID
      );
      if (result) {
        if (data.status == "insert") {
          const optionsValuesSchema = await OptionsPageSaleModel.getTableSchema(
            "TPageOptionValue"
          );
          for (const dependID of data.ids) {
            optionsValuesSchema["TPPV_FID_PageSale"] = data.data.TPP_FID_PageSale;
            optionsValuesSchema["TPPV_FID_Option"] = data.data.TPP_FID_Option;
            optionsValuesSchema["TPPV_FID_Value"] = dependID.TD_FID;

            const optionsValueResult = await OptionsPageSaleModel.saveOptionsValue(
              "Insert",
              optionsValuesSchema,
              req.TU_FID,
            );
          }
        } else if (data.status == "delete") {
 
          let optionValueList = await OptionsPageSaleModel.getOptionValueList(
            "TPageOptionValueList",
            data.data.TPP_FID_PageSale,
            data.data.TPP_FID_Option
          );
          
          for (const dependID of data.ids) {
            const valueDeleted = optionValueList.find(
              (item) => item.TPPV_FID_Value == dependID.TD_FID
            );
            const result = await OptionsPageSaleModel.deleteOption(
              valueDeleted.TPPV_FID,
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

  async insertOptionValue(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      const result = await OptionsPageSaleModel.saveOptionsValue(
        "Update",
        data,
        req.TU_FID
      );
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await OptionsPageSaleModel.delete(id, req.TU_FID);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
}

export default new OptionsPageSaleController();
