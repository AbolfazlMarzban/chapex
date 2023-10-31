import { Request, Response, NextFunction } from "express";
import abolTableModel from "../model/abolTableModel";
import Controller from "./Controller";
import DefaultsModel from "../model/defaultModel";

class AbolTableController extends Controller {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      let data: any = {
        form: {},
        defaults: {},
        table: [],
      };
      const neededDefaults = [113];

      for (const def of neededDefaults) {
        data.defaults[def] = await DefaultsModel.findByGroupId(def);
      }

      if (mode == "tables") {
        data.table = await abolTableModel.getTables();
      } else if (mode == "columns") {
        const id = req.params.id;
        data.table = await abolTableModel.getColumns("fa", Number(id));
      } else if (mode == "init") {
        data.form = await abolTableModel.getInit();
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async saveTable(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      const userID = req.TU_FID;
      let result = await abolTableModel.save("fa", data, userID);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async addColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      let result = await abolTableModel.addColumn(data);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async saveColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;

      let result = await abolTableModel.saveColumn(data);

      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async deleteColumn(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      let result = await abolTableModel.deleteColumn(id);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async deleteUserSetting(req: Request, res: Response, next: NextFunction) {
    try {
      const tableId = req.params.tableId;
      let result = await abolTableModel.deleteUserSetting(tableId);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }
}

export default new AbolTableController();
