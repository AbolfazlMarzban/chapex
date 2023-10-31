import {Request , Response , NextFunction} from "express";

import Controller from "../Controller";

import likeModel from '../../model/interaction/likeModel';


class likeController extends Controller {
        constructor(){
            super()
        }

        async insert(req : Request , res : Response , next : NextFunction){
            try{
                let data = req.body.data;
                data.TUL_FUserReg  = req.TU_FID;
                console.log(data);
                let result = await likeModel.save("insert" , data); 
                if(result){
                    this.responseHandler(result, res);
                }
            }catch(error){
                next(error)
            }       
        }


        async get(req : Request , res : Response , next : NextFunction){
            try{
                let data : any = {
                    likesData : {}
                }
                let rowType = req.body.rowType;
                let user_id = req.TU_FID;
                 data.likesData = await likeModel.get("TUserLikeList"  , user_id , rowType);
                res.json({
                    data
                })

                console.log(data.likesData);
                
            }catch(error){
                next(error)
            }
        }

        async delete(req : Request , res : Response , next : NextFunction){
            try{
                let data = req.body.likedId;
                
                console.log(data);
                let result = await likeModel.delete("Delete" , data); 

                if(result) {
                    this.responseHandler(result, res);
                }
            }catch(error){
                next(error)
            }      
        }
}


export default new likeController();