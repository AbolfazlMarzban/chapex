import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";
import Date from "../../helper/date";

import DefaultsModel from "../../model/defaultModel";
import paymentModel from "../../model/shop/paymentModel";

class paymentGatewayController extends Controller {
    constructor() {
        super();
    }

    async getPaymentGateways(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const data = await paymentModel.getGateways(id);
            res.json({ data })

        } catch (error) {
            next(error)
        }
    }

    async getPaymentURL(req: Request, res: Response, next: NextFunction) {

        try {

            const data = req.body.data;
            const date = new Date();
            data.TP_FDate = date.now().currentDate;
            data.TP_FDateReg = date.now().currentDate;
            data.TP_FTimeReg = date.now().currentTime;
            data.TP_FID_Customer = req.TU_FID;

            const payment = await paymentModel.getPaymentUrl(data)
            if (payment) {
                res.json({ payment })
            }
        }

        catch (error) {
            console.log('getPaymentURL error', error);
        }
    }

    async verifyPayment(req: Request, res: Response, next: NextFunction) {

        try {
            const authority = req.body.authority;
            const RefNum = req.body.RefNum;

            const verifyResult = await paymentModel.verifyPayment(authority, RefNum)

            if (verifyResult) {
                res.json(verifyResult)
            }
        }
        catch (err) {
            console.log('verifyPayment error', err);
        }

    }


}

export default new paymentGatewayController();
