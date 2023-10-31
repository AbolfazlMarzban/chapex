import { Request, Response, NextFunction } from "express";

import Controller from "../Controller";
import orderModel from "../../model/shop/orderModel";
import DefaultsModel from "../../model/defaultModel";
import abolTableModel from "../../model/abolTableModel";
import dateHelper from "../../helper/date"


class orderController extends Controller {

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const par = req.params.state.split(',')
            const state = par[0]
            const userId = par[1]
            let result;
            result = await orderModel.get(userId, state)
            const abolTable = await abolTableModel.get('fa', 11202, Number(userId));
            // console.log('result', result.recordset)
            const response = {
                table: result.recordset,
                tableHeaders: abolTable
            }
            if (result) {
                res.json(response)
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderID = req.params.id
            let result = {
                data: {},
                options: {},
                designFormResult: {},
                uploadFormResult: {},
                status: {}
            }
            result.data = await orderModel.getOrder(orderID)
            var goodId = 0
            var customer = ''
            if(result.data){
                goodId = result.data[0].TOD_FID_Goods
                customer = result.data[0].TOH_FID_Customer
            }
            // result.options = await orderModel.getOrderOptions(goodId)
            result.options = await orderModel.getOrderOptions(orderID)
            result.status = await orderModel.getOrderStatus(orderID)
            var designFormId = 0
            var uploadFormId = 0
            const formIds = await orderModel.getGoodInfo(goodId)
            if(formIds){
                designFormId = formIds[0].TGO_FSlug
                uploadFormId = formIds[0].TGO_FTag
            }
            if(designFormId){
                result.designFormResult = await orderModel.getFormResults(customer, designFormId)
            }
            if(uploadFormId){
                result.uploadFormResult = await orderModel.getFormResults(customer,uploadFormId)
            }
            if(result){
                res.json(result)
            }
        } catch (error) {
            next(error)
        }
    }

    async getUserOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.TU_FID
            const data = {
                defaults: {},
                table: [],
                // steps: [],
                // options: [],
            }

            const neededDefaults = [245]

            for (const def of neededDefaults) {
                data.defaults[def] = await orderModel.getDefaults(def);
            }

            let result = await orderModel.get(userId, 'userOrders')
            data.table = result.recordsets[0]
            // data.steps = result.recordsets[1]
            // data.options = result.recordsets[2]

            if (result) {
                res.json({ data })
            }
        }
        catch (error) {
            next(error);
        }
    }

    async getUserOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderID = req.params.id
            const data = {
                order: [],
                steps: [],
                options: [],
            }

            let result = await orderModel.getUserOrder(orderID)
            data.order = result.recordsets[0]
            data.steps = result.recordsets[1]
            data.options = result.recordsets[2]

            if (result) {
                res.json({ data })
            }
        }
        catch (error) {
            next(error);
        }
    }
    async changeStatus(req: Request, res: Response, next: NextFunction){
        try{
            var data = req.body.value
            data.date = new dateHelper().currentDate
            data.time = new dateHelper().currentTime
            data.state = "Insert"
            // console.log('data', data)
            let result = await orderModel.changeStatus(data)
            if(result){
                this.responseHandler(result, res);
            }
        } catch(error){
            next(error);
        }
       
    }
}
export default new orderController();