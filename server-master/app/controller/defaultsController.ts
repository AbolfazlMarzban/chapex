// controller for defaults in DB

import { Request, Response, NextFunction } from "express";

import Date from "../helper/date";

import Controller from "./Controller";

import DefaultModel from "../model/defaultModel";
import abolTableModel from "../model/abolTableModel";

import File from "../helper/file";
import path from "path";
// import commentsModel from "app/model/interaction/commentsModel";

class DefaultController extends Controller {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const id = req.params.id;
      const data = {
        form: {},
        table: {},
        defaults: [],
        tableHeaders: [],
        parentId: null,
        breadcrumb: []
      };
      if (mode == "init") {
        data.form = await DefaultModel.getTableSchema("TDefault");
        // console.log(data.form);

        data.form["TD_FCode"] = await DefaultModel.UFN_Coding(
          "TDefault_FCode",
          Number(id)
        );
        data.form["TD_FYear"] = process.env.YEAR_ACCOUNTING;
        data.form["TD_FActive"] = 1;
        data.form["TD_FUserReg"] = req.TU_FID;
        data.form["TD_FDateReg"] = new Date().currentDate
      }

      else if (mode == "table") {
        data.tableHeaders = await abolTableModel.get('fa', 11203, req.TU_FID);
        data.table = await DefaultModel.findByGroupId(Number(id))
        data.parentId = await DefaultModel.findParentId(Number(id))
        data.breadcrumb = await DefaultModel.initBreadcrumb(Number(id))
      }

      else if (mode == "tablechildren") {
        data.table = await DefaultModel.findDefaultsByCodeId([Number(id)], 2);
      }

      else if (mode == "show") {
        data.form = await DefaultModel.findById(id);
        data.parentId = await DefaultModel.findParentId(Number(id))
      }
      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
  async getMenu(req: Request, res: Response, next: NextFunction) {
    try {
      let parent;
      parent = await DefaultModel.findByGroupId(273)
      let data = []
      for (var i = 0; i < parent.length; i++) {
        data.push(await DefaultModel.findDefaultsByCodeId([Number(parent[i].TD_FID)]))
      }
      if (data) {
        res.json(data)
      }
    } catch (error) {
      next(error)
    }

  }
  async getSteps(req: Request, res: Response, next: NextFunction) {
    try {
      let parent;
      parent = await DefaultModel.findByGroupId(245)
      let data = {}
      for (var i = 0; i < parent.length; i++) {
        // data[i] =  await DefaultModel.findDefaultsByCode([Number(parent[i].TD_FID)])
        parent[i].children = await DefaultModel.getDefaultsChildren(parent[i].TD_FID);
      }
      // if(data){
      //   res.json(data)
      // }
      if (parent) {
        res.json(parent)
      }
    } catch (error) {
      next(error)
    }

  }
  async insert(req: Request, res: Response, next: NextFunction) {
    try {

      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }

      const data = req.body.data;

      const result = await DefaultModel.save(data, req.TU_FID);
      this.responseHandler(result, res, result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next)
      if (errors) {
        return
      }
      const data = req.body.data;
      const result = await DefaultModel.save(data, req.TU_FID, "Update");
      this.responseHandler(result, res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async salePageCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      // console.log('data', data)
      const result = await DefaultModel.save(data, req.TU_FID, "Update");
      this.responseHandler(result, res);

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  async getSalePageCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        form: {},
        gallery: {},
        faq: []
      }
      const id = req.params.id;
      data.form = await DefaultModel.findById(id);
      data.gallery = await DefaultModel.getGallery(id)
      data.faq = await DefaultModel.getFAQ(id)
      if (data) {
        res.json(data)
      }
    } catch (error) {
      next(error)
    }
  }
  async categoryFLink(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = {
        form: {},
        gallery: {},
        faq: []
      }
      data.form = await DefaultModel.findByFLink(id);
      if (data.form) {
        // console.log('data form', data.form)
        const defID = data.form[0].TD_FID
        data.gallery = await DefaultModel.getGallery(defID)
        data.faq = await DefaultModel.getFAQ(defID)
      }
      if (data) {
        res.json(data)
      }
    } catch (error) {
      next(error)
    }
  }


  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await DefaultModel.delete(id);
      this.responseHandler(result, res);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new DefaultController();
