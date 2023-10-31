import { Request, Response, NextFunction } from "express";
import Controller from "../Controller";
import taxModel from "../../model/tax/taxModel";
import UserModel from "../../model/userModel";

class taxController extends Controller {
  constructor() {
    super();
  }
  async insert(req: Request, res: Response, next: NextFunction) {
    const errors = this.validationErrorHandler(req, res, next)
    
    if (errors) {
      return
    }

    try {
      const data = req.body.data
      const userID = req.TU_FID
      // console.log('data', data)
      const result = await taxModel.insert(data, userID)
      if (result) {
        this.responseHandler(result, res)
      }
    } catch (error) {
      next(error)
    }
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.TU_FID
      const rowId = req.params.rowId
      const mode = req.query.mode

      let data = {
        form: null,
        defaults: {},
        table: null,
      }


      if (mode == 'init') {
        data.form = await UserModel.getTableSchema('TUserTaxInfo')
      }
      else if (mode == 'show' || mode == 'update') {
        data.form = await taxModel.getById(rowId)
      }
      else if (mode == 'table') {
        data.table = await taxModel.get(userID)
      }
      res.json({ data })

      // const result = await taxModel.get(userID)
      // if (result) {
      //   res.json(result)
      // }
    } catch (error) {
      next(error)
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    const errors = this.validationErrorHandler(req, res, next)
    
    if (errors) {
      return
    }
    
    try {
      const data = req.body.data
      const userID = req.TU_FID
      const result = await taxModel.update(data, userID)
      if (result) {
        this.responseHandler(result, res)
      }
    } catch (error) {
      next(error)
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const userID = req.TU_FID
      const result = await taxModel.delete(id, userID)
      if (result) {
        this.responseHandler(result, res)
      }
    } catch (error) {
      next(error)
    }
  }
}

export default new taxController;