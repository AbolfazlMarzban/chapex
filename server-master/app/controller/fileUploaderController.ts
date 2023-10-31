import { Request, Response, NextFunction } from "express";

import Controller from "./Controller";
import Date from "../helper/date";

import fileUploaderModel from "../model/fileUploaderModel";

import File from "../helper/file";

class fileUploaderController extends Controller {
  constructor() {
    super();
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      const form = req.params.form
      const data = {
        form: {},
        table: [],
      };

      if (mode == "init") {
        data.form = await fileUploaderModel.getTableSchema("TPicture");
      } 
      
      else if (mode == "table") { 
        data.table = await fileUploaderModel.get("TPictureList" , id, form)
      }

      res.json({ data: data });
      
    } catch (error) {
      next(error);
    }
  }
  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      let data = req.body.data;
      const result = await fileUploaderModel.save(data, 0, "Insert");

      data["TPIC_FID"] = result.output.ReturnFID;

      // console.log(data["TPIC_FID"]);

      const imageFieldsName = ["TPIC_FAddress"];

      let uploadedFile = File.RealTimeImageHandler(
        "insert",
        "pageSale",
        data,
        imageFieldsName,
        data
      );
      // console.log(uploadedFile);
      const result2 = await fileUploaderModel.save(uploadedFile, 0, "Update");
      // console.log(result2);
      if (result2) {
        this.responseHandler(result2, res);
      }
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) { 
    try {
      const id = req.params.id
      const result = await fileUploaderModel.delete(id)
      this.responseHandler(result, res);

    } catch (error) {
      next(error)
    }
  }
}

export default new fileUploaderController();
