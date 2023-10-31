import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";

import FaqModel from "../../model/interaction/faqModel";
import DefaultsModel from "../../model/defaultModel";
import faqModel from "../../model/interaction/faqModel";
import Date from "../../helper/date";
class FaqController extends Controller {
  constructor() {
    super();
  } 
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      const statusID = req.params.statusID;
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
        data.table = await FaqModel.get("TGoodsQuestionList", statusID);
      }
      // get one row
      else if (mode == "show") {
        data.table = await FaqModel.get("TGoodsComment", statusID, id);
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
        data.form = await FaqModel.getTableSchema("TGoodsQuestion");
        res.json({data});
      }catch(error){
      next(error)
    }
  }

    async insertQuestion (req : Request , res : Response , next : NextFunction){
      try{
        let data = req.body.data;
        const DateTime = new Date();
        data.TGQ_FDateReg = DateTime.now().currentDate;
        data.TGQ_FTimeReg = DateTime.now().currentTime;
        const result = await faqModel.save("Insert" , data);
      }catch (error){
        next(error);
      }
    }

    async insertAnswer (req : Request , res : Response , next : NextFunction){
      try{
        let data = req.body.data;
        const DateTime = new Date();
        data.TGQ_FDateReg = DateTime.now().currentDate;
        data.TGQ_FTimeReg = DateTime.now().currentTime;
        const result = await faqModel.save("Insert" , data);
        if (result) {
          console.log("bibbidi bobbidy boo");
        }
      }catch (error){
        next(error);
      }
    
    }

    async changeState (req : Request , res : Response , next : NextFunction){
      try{
        let data = req.body.data;
        const result = await faqModel.save("Update" , data);
        if (result) {
          this.responseHandler(result, res);
        }
      }catch (error){
        next(error);
      }
    
    }



}



export default new FaqController();
