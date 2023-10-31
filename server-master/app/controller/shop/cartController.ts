import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";
import Date from "../../helper/date";

import cartModel from "../../model/shop/cartModel";
import DefaultModel from "../../model/defaultModel";

class cartController extends Controller {
  constructor() {
    super();
  }
  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;

      const cartObj = this.createCartDBObject(data, req.TU_FID)

      const date = new Date();
      cartObj.TOD_FDateReg = date.now().currentDate;
      cartObj.TOD_FTimeReg = date.now().currentTime;
      cartObj.TOD_FID_Header = req.TU_FID;

      for (var i = 0; i <= data.seri - 1; i++) {
        const result = await cartModel.saveProductDetails("InsertTemp", cartObj);

        if (i == data.seri - 1) {
          if (result) {
            this.responseHandler(result, res);
          }
        }
      }
    } catch (error) {
      next(error)
    }
  }

  createCartDBObject(data, userId) {

    let cartObj = {
      "TOD_FID": data.TOD_FID ? data.TOD_FID : 0,
      "TOD_FID_Header": userId,
      "TOD_FID_SalePage": data.TOD_FID_SalePage,
      "TOD_FID_Goods": data.TOD_FID_Goods,
      "TOD_FID_SelectedOptions": data.TOD_FID_SelectedOptions.toString(),
      "TOD_FID_Store": 0,
      "TOD_FCount": data.TOD_FCount,
      "TOD_FPrice": data.TOD_FPrice / data.seri,
      "TOD_FTax": 0,
      "TOD_FDiscount": 0,
      "TOD_FCoupon": "",
      "TOD_FName": data.TOD_FName,
      "TOD_FOption": data.TOD_FOption,
      "TOD_FComment": "",
      "TOD_FPicAdd1": "",
      "TOD_FPicAdd2": "",
      "TOD_FPicAdd3": "",
      "TOD_FPicAdd4": "",
      "TOD_FPicAdd5": "",
      "TOD_FPicAdd6": "",
      "TOD_FPicAdd7": "",
      "TOD_FDateReg": "",
      "TOD_FTimeReg": "",
      "TOD_FBasketIndex": 0,
      "TOD_FDesignStatus": data.TOD_FDesignStatus ? 1 : 0,
      "TOD_FID_Design": data.TOD_FID_Design,
      "TOD_FReviewNeed": data.TOD_FReviewNeed ? 1 : 0,
      "TOD_FID_Review": data.TOD_FID_Review,
    }

    return cartObj
  }


  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;

      const cartObj = this.createCartDBObject(data, req.TU_FID)
      // console.log('update', cartObj);

      const result = await cartModel.saveProductDetails("UpdateTemp", cartObj);

      if (result) {
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error)
    }
  }


  async insertBuy(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.paymentData;

      const date = new Date();
      data.TOH_FDateReg = date.now().currentDate;
      data.TOH_FTimeReg = date.now().currentTime;
      data.TOH_FID_Header = req.TU_FID;

      if (data.legalInfo.length > 0) {
        data.TUX_FType = data.legalInfo[0].TUX_FType
        data.TUX_FName = data.legalInfo[0].TUX_FName
        data.TUX_FMelli = data.legalInfo[0].TUX_FMelli
        data.TUX_FShenas = data.legalInfo[0].TUX_FShenas
        data.TUX_FEcoCode = data.legalInfo[0].TUX_FEcoCode
        data.TUX_FAddress = data.legalInfo[0].TUX_FAddress
        data.TUX_FTel = data.legalInfo[0].TUX_FTel
      }

      const result = await cartModel.saveBuyInfo("InsertBuy", data);
      if (result && result.output) {
        let output = {
          orderId: result.output.ReturnFID,
          price: data.TP_FPrice
        }
        this.responseHandler(result, res, output);
      }
    } catch (error) {
      next(error)
    }
  }


  async getInit(req: Request, res: Response, next: NextFunction) {
    try {
      let data = {
        salePage: { TPS_FID: 0, TPS_FTitle: '' },
        finalProduct: { TGO_FID: 0, TGO_FName: '' },
        selectedChildren: [],
        finalPrice: 0,
        tiraj: 0
      }

      res.json({ data })

    } catch (error) {
      next(error)
    }
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await cartModel.get(req.TU_FID);

      res.json({ data })

    } catch (error) {
      next(error)
    }
  }

  async getItemCount(req: Request, res: Response, next: NextFunction) {
    try {
      const basketId = req.params.basketId;
      let data = await cartModel.getCount(req.TU_FID, basketId);

      res.json({ data })

    } catch (error) {
      next(error)
    }
  }

  async changeBasketId(req: Request, res: Response, next: NextFunction) {
    try {
      const rowId = req.params.cartRowId;
      const basketId = req.params.basketId;


      let result = await cartModel.changeBasket(basketId, rowId);
      if (result) {
        res.json({ result })
      }
    } catch (error) {
      next(error)
    }
  }


  async deleteCartItem(req: Request, res: Response, next: NextFunction) {
    try {
      const rowIdToDelete = req.params.rowIdToDelete;
      let data = await cartModel.delete(rowIdToDelete);
      res.json({ data })
    } catch (error) {
      next(error)
    }
  }
  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.TU_FID
      const date = new Date().currentDate
      const result = await cartModel.getOrders(id, date)
      let respo;
      if (result) {
        respo = await DefaultModel.findDefaultsByCodeId([Number(30202)], 2)
      } else {
        respo = await DefaultModel.findDefaultsByCodeId([Number(30302)], 2)
      }
      res.json(respo)
    } catch (error) {
      next(error)
    }
  }
}





export default new cartController();
