import { Request, Response, NextFunction } from "express";

import Controller from "./Controller";
// helper
import ImageHandle from "./../helper/image-uploader";
import Resizer from "./../helper/resizer";
import File from "./../helper/file";
import path from "path";
import * as fs from 'fs';
import Date from "../helper/date"
import fileUploaderModel from "../model/fileUploaderModel";
// import * as ftp from "basic-ftp";
import console, { log } from "console";

class ImageController extends Controller {


  async file(req: Request, res: Response, next: NextFunction) {

    try {
      if (req.file == undefined) {
        console.log("req.file is undefined!");
        this.sendBackError(res, "آپلود فایل با موفقیت انجام نشد", 500);
        return;
      }
      const file = req.file
      // console.log('file', file);  

      res.json({ file: file })

    } catch (error) {
      next(error)
    }
  }


  async upload(req: Request, res: Response, next: NextFunction) {
    // console.log('upload');
    try {
      const state = req.body.state;
    
      if (req.file == undefined) {
        console.log("req.file is undefined!");
        this.sendBackError(res, "آپلود فایل با موفقیت انجام نشد", 500);
        return;
      }
      const options = {
        ...req.body,
        filePath: req.file.path,
      };
      // updating
      const status = "updating";
      const result = await ImageHandle(state, options, status, options.filePath);
      if (state == "user") {
        // resizer
        await Resizer.resize("sm-realtime", options.filePath, 100);
        return res.json({
          ...result,
          otherData: {
            path: options.filePath,
            smallSizeAccess: true,
          },
        });
      }

      else if (state == "optionIcon") {
        await Resizer.resize("sm-realtime", options.filePath, 100);

        return res.json({
          ...result,
          otherData: {
            path: options.filePath,
            smallSizeAccess: true,
          },
        });
      }

      else if (state == "optionImage") {
        const thumbnail_path = await Resizer.resize("sm", options.filePath, 100);

        return res.json({
          ...result,
          otherData: {
            path: options.filePath,
            thumbnail_path: thumbnail_path,
            smallSizeAccess: true,
          },
        });
      }

      else if (state == "product") {
        const thumbnail_path = await Resizer.resize('sm', options.filePath, 100)

        return res.json({
          ...result,
          otherData: {
            path: options.filePath,
            thumbnail_path: thumbnail_path,
            smallSizeAccess: true,
          },
        });
      }

      else if (state == "pageSale") {
        const thumbnail_path = await Resizer.resize('sm', options.filePath, 100)

        return res.json({
          ...result,
          otherData: {
            path: options.filePath,
            thumbnail_path: thumbnail_path,
            smallSizeAccess: true,
          },
        });
      }
      else if (state == "advancedUploader") {

        const thumbnail_path = await Resizer.resize('sm', options.filePath, 100)
        // this.ftpConnect(options.filePath);
        return res.json({
          ...result,
          otherData: {
            path: options.filePath,
            thumbnail_path: thumbnail_path,
            smallSizeAccess: true,
          },
        });
      }
      else if (state == "salePageCategory"){
        const thumbnail_path = await Resizer.resize('sm', options.filePath, 100)

        return res.json({
          ...result,
          otherData: {
            path: options.filePath,
            thumbnail_path: thumbnail_path,
            smallSizeAccess: true,
          },
        });
      }
    } catch (error) {
      next(error)
    }
  }
  async newUplaod(req: Request, res: Response, next: NextFunction) {
    try {
      const options = {
        ...req.body,
        filePath: req.file.path,
      };
      const status = "updating";
      const state = ""
      const result = await ImageHandle(state, options, status, req.file.path);

      const thumbnail_path = await Resizer.resize('sm', req.file.path, 100)
      // this.ftpConnect(req.file.path, req.file.originalname, req.body.user, req.body.password)
      return res.json({
        ...result,
        otherData: {
          path: req.file.path,
          thumbnail_path: thumbnail_path,
          smallSizeAccess: true,
        },
      });
      // }
    } catch (error) {
      next(error)
    }
  }
  // async ftpConnect(path, name, user, password) {
  //   try {
  //     const client = new ftp.Client()
  //     client.ftp.verbose = true
  //     await client.access({
  //       host: "upload.chapex.ir",
  //       port: 21,
  //       user: `${user}`,
  //       password: `${password}`,
  //       // secure: true,
  //     })
  //     console.log(await client.list())
  //     await client.uploadFrom(`${path}`, `${name}`)
  //     // console.log(await client.downloadTo("first_COPY.jpeg", "first.jpeg")) 
  //     client.close()
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  async delete(req: Request, res: Response, next: NextFunction) {

    try {
      const data = req.body.data

      // console.log('data', data);

      if (data.path)
        File.removeImage(data.path)

      if (data.thumbnail_path)
        File.removeImage(data.thumbnail_path)

      var result = {
        status: 200,
        error: false,
        mesages: ["حذف شد"],
      };

      res.status(result.status).json(result)
    } catch (error) {
      next(error);
    }
  }
  async save(req: Request, res: Response, next: NextFunction){
    try{
      const img = req.body
      const state = req.body.state
      const parentID = req.body.parentID
      const userID = req.TU_FID
        // console.log('img', img)
        const name = path.basename(img.path).replace('temp-', '')
        const thName = path.basename(img.thumbnail_path).replace('temp-', '')
        const newPath = path.join(img.uploadPath, name)
        const newThPath = path.join(img.uploadPath, thName)
        fs.rename(img.path, newPath, (err)=>{
          if(err){
            throw err;
          } 
        })
        fs.rename(img.thumbnail_path, newThPath, (err)=>{
          if(err){
            throw err;
          }
        })
       let data = {
        TPIC_FID: 0,
        TPIC_FID_Parent: parentID,
        TPIC_FForm: state,
        TPIC_FAddress: newPath,
        TPIC_FName: name,
        TPIC_FComment: '',
        TPIC_FOrder: 0,
        TPIC_FType: path.extname(newPath).replace('.', ''),
        TPIC_FUserReg: userID,
        TPIC_FDateReg: new Date().currentDate,
        TPIC_FActive: 1,
        TPIC_FDelete: 0
       }
        const result = await fileUploaderModel.save(data, 0 , "Insert")
        if(result){
          const response = {
            address: newPath,
            mesages: [result.output.RetMsg]
          }
          res.json(response)
        }
    } catch(error){
      next(error)
    }
  }

  async saveVid (req: Request, res: Response, next: NextFunction){
    try{
      const vid = req.body
      // console.log('file', vid)
      const userID = req.TU_FID
      if(vid){
        let data = {
          TPIC_FID: 0,
          TPIC_FID_Parent: vid.parentID,
          TPIC_FForm: vid.state,
          TPIC_FAddress: vid.path,
          TPIC_FName: path.basename(vid.path),
          TPIC_FComment: '',
          TPIC_FOrder: 0,
          TPIC_FType: vid.mimeType,
          TPIC_FUserReg: userID,
          TPIC_FDateReg: new Date().currentDate,
          TPIC_FActive: 1,
          TPIC_FDelete: 0
         }
         const result = await fileUploaderModel.save(data, 0 , "Insert")
         if(result){
          this.responseHandler(result, res)
         }
      }
    } catch(error){
      next(error)
    }
  }
}

export default new ImageController();