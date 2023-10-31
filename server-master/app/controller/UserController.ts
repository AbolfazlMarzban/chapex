import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";
// model
import UserModel from "../model/userModel";
import DefaultModel from "../model/defaultModel";

// helper
import DateHelper from "./../helper/date";
import File from "./../helper/file";
import abolTableModel from "../model/abolTableModel";

class UserController extends Controller {
  userStatus: string;

  public get userType(): number {
    if (this.userStatus == "customer") {
      return 0;
    } else if (this.userStatus == "provider") {
      return 1;
    } else if (this.userStatus == "employee") {
      return 0;
    }
    return 0;
  }

  // profile form init
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      let id = req.TU_FID;

      let data = {
        user: {},
        defaults: {},
        date: new DateHelper().now(),
        error: false,
      };

      let result = await UserModel.getUserDataById(id);

      data.user = result.user;
      data.defaults = result.defaults;

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next);
      if (errors) {
        return;
      }

      const userData = req.body.data.user;

      // valiation needed

      const result = await UserModel.update(userData, "Customer");

      const expiresInDay = 12;

      let token = this.createToken(
        {
          TU_FUserName: userData.TU_FUserName,
          TU_FID: userData.TU_FID,
        },
        expiresInDay + "d"
      );

      let decodedToken = this.decodeToken(token);

      let updatedUserData = await UserModel.setDefaultDataForLoggedInUserInClient(
        userData,
        token,
        decodedToken,
        expiresInDay
      );
      this.responseHandler(result, res, { updatedUserData });
    } catch (error) {
      next(error);
    }
  }

  // user manage initialize data
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.id);
      const mode = req.query.mode;
      this.userStatus = req.query.status.toString();

      let defaultIds = [
        117,
        126,
        125,
        128,
        123,
        122,
        124,
        121,
        129,
        120,
        800,
        12001,
        11601,
        12901,
      ];

      let data = {
        table: [],
        tableHeaders: [],
        form: {},
        defaults: {},
      };

      if (mode == "init") {
        data.form = await UserModel.getTableSchema("TUser");
        this.setUserInitData(req.TU_FID, data.form);
        data.defaults = await this.getDefaultsChildre(defaultIds);
        data.table = undefined;
      } else if (mode == "show" || mode == "update") {
        data.form = await UserModel.findById(id);
        data.defaults = await this.getDefaultsChildre(defaultIds);
        data.table = undefined;
      } else if (mode == "table") {
        if (this.userStatus == "employee") {
          data.tableHeaders = await abolTableModel.get("fa", 11208, req.TU_FID);
          data.table = await UserModel.getUserOnlyList();
        } else if (this.userStatus == "customer") {
          data.tableHeaders = await abolTableModel.get("fa", 11206, req.TU_FID);
          data.table = await UserModel.getListByType(this.userType);
        } else if (this.userStatus == "provider") {
          data.tableHeaders = await abolTableModel.get("fa", 11207, req.TU_FID);
          data.table = await UserModel.getListByType(this.userType);
        }
        data.form = undefined;
        data.defaults = undefined;
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next);
      if (errors) {
        return;
      }

      const user = req.body.data;

      user.TU_FUserName = user.TU_FMobile1;
      user.TU_FPassWord = this.createHashString(user.TU_FUserName);

      const result = await UserModel.create(user, req.TU_FID);
      if (result.output.RetID == 1) {
        const newUserId = result.output.ReturnFID;
        user.TU_FID = newUserId;

        // image handle
        const imageFieldsName = ["TU_FPicAdd1"];
        let newUserConvertedData = File.RealTimeImageHandler(
          "insert",
          "user",
          user,
          imageFieldsName,
          user
        );

        await UserModel.update(newUserConvertedData, "Employee");
      }

      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // validation handler
      const errors = this.validationErrorHandler(req, res, next);
      if (errors) {
        return;
      }

      const user = req.body.data;

      const oldUserData = await UserModel.findById(user.TU_FID);

      const result = await UserModel.update(user, "Customer");

      if (result.output.RetID == 1) {
        // image handle
        const imageFileds = ["TU_FPicAdd1"];
        const newUserConvertedData = File.RealTimeImageHandler(
          "update",
          "user",
          user,
          imageFileds,
          oldUserData
        );
        const resultUpdate = await UserModel.update(
          newUserConvertedData,
          "Employee"
        );
        this.responseHandler(resultUpdate, res);
      } else {
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = +req.params.id;

      if (id == req.TU_FID) {
        this.sendBackError(res, "شما مجاز به این حذف نمیباشید", 422);
        return;
      }

      const user = await UserModel.findById(id);
      const result = await UserModel.delete(id);
      // delete images
      if (result.output.RetID == 1) {
        if (user.TU_FPicAdd1.length) {
          File.removeImage(user.TU_FPicAdd1);
          File.DeleteResizeRealTime(user.TU_FPicAdd1, "user");
        }
      }
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  // helper
  async getDefaultsChildre(defaultIds: Array<number>) {
    let defaults = {};
    for (let id of defaultIds) {
      defaults[id] = await DefaultModel.getDefaultsChildren(id);
    }
    return defaults;
  }

  setUserInitData(userRegId: number, dataSchema: any) {
    dataSchema.TU_FUserReg = userRegId;
    dataSchema.TU_FDateReg = new DateHelper().now().currentDate;
    dataSchema.TU_FTimeReg = new DateHelper().now().currentTime;
    dataSchema.TU_FActive = 12902;
    dataSchema.TU_FType = this.userType;
    if (this.userStatus == "employee") {
      dataSchema.TU_FIsUser = 1;
    }
  }
}

export default new UserController();
