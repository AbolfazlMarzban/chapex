import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";

import addressModel from "../../model/address/addressModel";
import DefaultsModel from "../../model/defaultModel";
import userModel from "../../model/userModel";

class addressController extends Controller {
  constructor() {
    super();
  }
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      let userId: any = req.params.userId;
      userId = parseInt(userId)
      if (userId == 0) {
        userId = req.TU_FID;
      }
      let data: any = {
        addressData: {},
        userPercent: null,
        defaults: {},
        form: {}
      };

      const neededDefaults: Array<number> = [123, 124, 226, 232];

      if (mode == "init") {
        for (const def of neededDefaults) {
          data.defaults[def] = await DefaultsModel.findByGroupId(def);
        }

        data.form = await addressModel.getTableSchema("TUserAddress");
      }

      // get one row
      else if (mode == "show") {
        data.addressData = await addressModel.getInit("TUserAddressList", userId);
        data.userPercent = await userModel.getUserPercentById(userId)
      }



      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {

    const errors = this.validationErrorHandler(req, res, next)
    
    if (errors) {
      return
    }

    try {
      let data = req.body.data;
      let userId: any = req.params.userId
      userId = parseInt(userId)
      if (userId == 0) {
        userId = req.TU_FID;
      }

      const result = await addressModel.save("Insert", data, userId);

      if (result) {
        this.responseHandler(result, res);
      }


    } catch (error) {
      next(error);
    }
  }


  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      let addressId = req.params.addressId;
      // console.log(addressId);

      const result = await addressModel.delete("TUserAddress", addressId);
      if (result) {
        this.responseHandler(result, res);

      }

    } catch (error) {
      next(error);
    }
  }


  async getToEdit(req: Request, res: Response, next: NextFunction) {
    try {
      const addressRowId = req.params.addressRowId;
      let data: any = {
        addressData: {},
        defaults: {},
      };

      const neededDefaults: Array<number> = [123, 124, 125];
      // get status bar item

      for (const def of neededDefaults) {
        data.defaults[def] = await DefaultsModel.findByGroupId(def);
      }

      data.addressData = await addressModel.getToEdit("TUserAddressFID", addressRowId);



      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {

    const errors = this.validationErrorHandler(req, res, next)
    if (errors) {
      return
    }

    try {
      let data = req.body.data;
      const result = await addressModel.update("Update", data);
      if (result) {
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async getInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const address = req.body.data
      const result = await addressModel.getInfo(address)
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}



export default new addressController();
