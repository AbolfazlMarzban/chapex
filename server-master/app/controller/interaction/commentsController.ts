import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";
import Date from "../../helper/date";

import CommentsModel from "../../model/interaction/commentsModel";
import DefaultsModel from "../../model/defaultModel";
class CommentsController extends Controller {
  constructor() {
    super();
  } 
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      const status = req.params.status;
      let data: any = {
        tabs: {},
        table: [],
        defaults: {},
      };
      const neededDefaults: Array<number> = [260];
      // get status bar item
      if (mode == "init") {
        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }
        for (const def of data.defaults[260]) {
          def["active"] = false;
        }
      }
      // table data
      else if (mode == "table") {
        data.table = await CommentsModel.get("TGoodsCommentList", status);
      }
      // get one row
      else if (mode == "show") {
        data.table = await CommentsModel.get("TGoodsCommentList", status, id);
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
  async getSchema (req : Request , res : Response , next : NextFunction){
    try{
      let data : any = {
        form: {}
      };
        data.form = await CommentsModel.getTableSchema("TGoodsComment");
        res.json({data});
      }catch(error){
      next(error)
    }
  }

  async insertComment (req : Request , res : Response , next : NextFunction){
    try{
      let data = req.body.data;
      const DateTime = new Date();
      data.TGC_FDateReg = DateTime.now().currentDate;
      data.TGC_FTimeReg = DateTime.now().currentTime;
      const result = await CommentsModel.save("Insert" , data);
      if (result) {
        this.responseHandler(result, res);
        return result;
        
      }
    }catch (error){
      next(error);
    }
  }
  async changeState (req : Request , res : Response , next : NextFunction){
    try{
      let data = req.body.data;
      const result = await CommentsModel.save("Update" , data);
      if (result) {
        this.responseHandler(result, res);
      }
    }catch (error){
      next(error);
    }
  
  }
}

export default new CommentsController();
