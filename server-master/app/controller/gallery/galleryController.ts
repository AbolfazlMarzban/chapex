import { Request, Response, NextFunction } from "express";
import Controller from "../Controller";
import galleryModel from "../../model/gallery/galleryModel";
import Date from "../../helper/date"
import Resizer from "../../helper/resizer";
import * as ftp from "basic-ftp";
import fs, { stat } from 'fs'
import path from "path"
import urls from "../../../config/url";
import Axios from "axios";
import pageSaleModel from "../../model/shop/pageSaleModel";
import formBuilderModel from "../../model/formBuilder/formBuilderModel";

class galleryController extends Controller{
async get(req: Request, res: Response, next: NextFunction){
    try{
        const result : any = await galleryModel.getAdmin()
        let baseUrl = urls[process.env.Company].server

        for(var i=0; i < result.images.length; i++){
            const item = result.images[i]
            if(item.TPIC_FType == "jpeg" || item.TPIC_FType == "png" || item.TPIC_FType == "jpg" || item.TPIC_FType == "webp" || item.TPIC_FType == "bmp" || item.TPIC_FType == "gif" ||  item.TPIC_FType == "svg"){
                        const smName = "sm-" + item.TPIC_FName 
                        item.thumbnail = item.TPIC_FAddress.replace(item.TPIC_FName, smName)
                        item.icon = baseUrl + "/public/images/icon/image-area.png"
                }
            if(!item.TPIC_FName){
                item.thumbnail = item.TPIC_FAddress
            }
            if(item.TPIC_FType == "tiff"){
                item.thumbnail = baseUrl + "/public/images/icon/image-area.png"
                item.icon = baseUrl + "/public/images/icon/image-area.png"
            }
            if(item.TPIC_FType == "mp4"){
                item.thumbnail = baseUrl + "/public/images/icon/07.png"
                item.icon = baseUrl + "/public/images/icon/07.png"
            }
            if(item.TPIC_FType == "psd"){
                item.thumbnail = baseUrl + "/public/images/icon/01.png"
                item.icon = baseUrl + "/public/images/icon/01.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "avi"){
                item.thumbnail = baseUrl + "/public/images/icon/05.png"
                item.icon = baseUrl + "/public/images/icon/05.png"
            }
            if(item.TPIC_FType == "mp3"){
                item.thumbnail = baseUrl + "/public/images/icon/06.png"
                item.icon = baseUrl + "/public/images/icon/06.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "xlsx"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
            if(item.TPIC_FType == "csv"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
            if(item.TPIC_FType == "doc" || item.TPIC_FType == "docx"){
                item.thumbnail = baseUrl + "/public/images/icon/10.png"
                item.icon = baseUrl + "/public/images/icon/10.png"
            }
            if(item.TPIC_FType == "pdf"){
                item.thumbnail = baseUrl + "/public/images/icon/11.png"
                item.icon = baseUrl + "/public/images/icon/11.png"
            }
            if(item.TPIC_FType == "zip"){
                item.thumbnail = baseUrl + "/public/images/icon/12.png"
                item.icon = baseUrl + "/public/images/icon/12.png"
            }
            if(item.TPIC_FType == "cdr"){
                item.thumbnail = baseUrl + "/public/images/icon/cdr.png"
                item.icon = baseUrl + "/public/images/icon/cdr.png"
            }
            if(item.TPIC_FType == "mov"){
                item.thumbnail = baseUrl + "/public/images/icon/MOV.png"
                item.icon = baseUrl + "/public/images/icon/MOV.png"            
            }
        }
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
}

async getByUser(req: Request, res: Response, next: NextFunction){
    try{
        try{
            const userID = req.params.id
            const result : any = await galleryModel.getByUser(userID)

            let baseUrl = urls[process.env.Company].server
    
            for(var i=0; i < result.images.length; i++){
                const item = result.images[i]
                if(item.TPIC_FType == "jpeg" || item.TPIC_FType == "png" || item.TPIC_FType == "jpg" || item.TPIC_FType == "webp" || item.TPIC_FType == "bmp" || item.TPIC_FType == "gif" ||  item.TPIC_FType == "svg"){
                            const smName = "sm-" + item.TPIC_FName 
                            item.thumbnail = item.TPIC_FAddress.replace(item.TPIC_FName, smName)
                            item.icon = baseUrl + "/public/images/icon/image-area.png"
                    }
                if(!item.TPIC_FName){
                    item.thumbnail = item.TPIC_FAddress
                }
                if(item.TPIC_FType == "tiff"){
                    item.thumbnail = baseUrl + "/public/images/icon/image-area.png"
                    item.icon = baseUrl + "/public/images/icon/image-area.png"
                }
                if(item.TPIC_FType == "mp4"){
                    item.thumbnail = baseUrl + "/public/images/icon/07.png"
                    item.icon = baseUrl + "/public/images/icon/07.png"
                }
                if(item.TPIC_FType == "psd"){
                    item.thumbnail = baseUrl + "/public/images/icon/01.png"
                    item.icon = baseUrl + "/public/images/icon/01.png"
                }
                if(item.TPIC_FType == "ai"){
                    item.thumbnail = baseUrl + "/public/images/icon/02.png"
                    item.icon = baseUrl + "/public/images/icon/02.png"
                }
                if(item.TPIC_FType == "avi"){
                    item.thumbnail = baseUrl + "/public/images/icon/05.png"
                    item.icon = baseUrl + "/public/images/icon/05.png"
                }
                if(item.TPIC_FType == "mp3"){
                    item.thumbnail = baseUrl + "/public/images/icon/06.png"
                    item.icon = baseUrl + "/public/images/icon/06.png"
                }
                if(item.TPIC_FType == "ai"){
                    item.thumbnail = baseUrl + "/public/images/icon/02.png"
                    item.icon = baseUrl + "/public/images/icon/02.png"
                }
                if(item.TPIC_FType == "xlsx"){
                    item.thumbnail = baseUrl + "/public/images/icon/08.png"
                    item.icon = baseUrl + "/public/images/icon/08.png"
                }
                if(item.TPIC_FType == "csv"){
                    item.thumbnail = baseUrl + "/public/images/icon/08.png"
                    item.icon = baseUrl + "/public/images/icon/08.png"
                }
                if(item.TPIC_FType == "doc" || item.TPIC_FType == "docx"){
                    item.thumbnail = baseUrl + "/public/images/icon/10.png"
                    item.icon = baseUrl + "/public/images/icon/10.png"
                }
                if(item.TPIC_FType == "pdf"){
                    item.thumbnail = baseUrl + "/public/images/icon/11.png"
                    item.icon = baseUrl + "/public/images/icon/11.png"
                }
                if(item.TPIC_FType == "zip"){
                    item.thumbnail = baseUrl + "/public/images/icon/12.png"
                    item.icon = baseUrl + "/public/images/icon/12.png"
                }
                if(item.TPIC_FType == "cdr"){
                    item.thumbnail = baseUrl + "/public/images/icon/cdr.png"
                    item.icon = baseUrl + "/public/images/icon/cdr.png"
                }
                if(item.TPIC_FType == "mov"){
                    item.thumbnail = baseUrl + "/public/images/icon/MOV.png"
                    item.icon = baseUrl + "/public/images/icon/MOV.png"            
                }
            }
            if(result){
                res.json(result)
            }
        } catch(error){
            next(error)
        }
    } catch(error){
        next(error)
    }
}
async getByUserAndID(req: Request, res: Response, next: NextFunction){
    try{
        const id = req.params.id
        const userID = req.params.userID
  
        const result = await galleryModel.getByUserAndID(userID, id)
        let baseUrl = urls[process.env.Company].server

        for(var i=0; i < result.images.length; i++){
            const item = result.images[i]
            if(item.TPIC_FType == "jpeg" || item.TPIC_FType == "png" || item.TPIC_FType == "jpg" || item.TPIC_FType == "webp" || item.TPIC_FType == "bmp"|| item.TPIC_FType == "gif" ||  item.TPIC_FType == "svg"){
                        const smName = "sm-" + item.TPIC_FName 
                        item.thumbnail = item.TPIC_FAddress.replace(item.TPIC_FName, smName)
                        item.icon = baseUrl + "/public/images/icon/image-area.png"
                }
            if(!item.TPIC_FName){
                item.thumbnail = item.TPIC_FAddress
            }
            if(item.TPIC_FType == "tiff"){
                item.thumbnail = baseUrl + "/public/images/icon/image-area.png"
                item.icon = baseUrl + "/public/images/icon/image-area.png"
            }
            if(item.TPIC_FType == "mp4"){
                item.thumbnail = baseUrl + "/public/images/icon/07.png"
                item.icon = baseUrl + "/public/images/icon/07.png"
            }
            if(item.TPIC_FType == "psd"){
                item.thumbnail = baseUrl + "/public/images/icon/01.png"
                item.icon = baseUrl + "/public/images/icon/01.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "avi"){
                item.thumbnail = baseUrl + "/public/images/icon/05.png"
                item.icon = baseUrl + "/public/images/icon/05.png"
            }
            if(item.TPIC_FType == "mp3"){
                item.thumbnail = baseUrl + "/public/images/icon/06.png"
                item.icon = baseUrl + "/public/images/icon/06.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "xlsx"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
            if(item.TPIC_FType == "doc" || item.TPIC_FType == "docx"){
                item.thumbnail = baseUrl + "/public/images/icon/10.png"
                item.icon = baseUrl + "/public/images/icon/10.png"
            }
            if(item.TPIC_FType == "pdf"){
                item.thumbnail = baseUrl + "/public/images/icon/11.png"
                item.icon = baseUrl + "/public/images/icon/11.png"
            }
            if(item.TPIC_FType == "zip"){
                item.thumbnail = baseUrl + "/public/images/icon/12.png"
                item.icon = baseUrl + "/public/images/icon/12.png"
            }
            if(item.TPIC_FType == "cdr"){
                item.thumbnail = baseUrl + "/public/images/icon/cdr.png"
                item.icon = baseUrl + "/public/images/icon/cdr.png"
            }
            if(item.TPIC_FType == "mov"){
                item.thumbnail = baseUrl + "/public/images/icon/MOV.png"
                item.icon = baseUrl + "/public/images/icon/MOV.png"            
            }
            if(item.TPIC_FType == "csv"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
        }
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
}
async getByID(req: Request, res: Response, next: NextFunction){
    try{
        const id = req.params.id

        const result = await galleryModel.getByID(id)
        let baseUrl = urls[process.env.Company].server

        for(var i=0; i < result.images.length; i++){
            const item = result.images[i]
            if(item.TPIC_FType == "jpeg" || item.TPIC_FType == "png" || item.TPIC_FType == "jpg" || item.TPIC_FType == "webp" || item.TPIC_FType == "bmp"|| item.TPIC_FType == "gif" ||  item.TPIC_FType == "svg"){
                        const smName = "sm-" + item.TPIC_FName 
                        item.thumbnail = item.TPIC_FAddress.replace(item.TPIC_FName, smName)
                        item.icon = baseUrl + "/public/images/icon/image-area.png"
                }
            if(!item.TPIC_FName){
                item.thumbnail = item.TPIC_FAddress
            }
            if(item.TPIC_FType == "tiff"){
                item.thumbnail = baseUrl + "/public/images/icon/image-area.png"
                item.icon = baseUrl + "/public/images/icon/image-area.png"
            }
            if(item.TPIC_FType == "mp4"){
                item.thumbnail = baseUrl + "/public/images/icon/07.png"
                item.icon = baseUrl + "/public/images/icon/07.png"
            }
            if(item.TPIC_FType == "psd"){
                item.thumbnail = baseUrl + "/public/images/icon/01.png"
                item.icon = baseUrl + "/public/images/icon/01.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "avi"){
                item.thumbnail = baseUrl + "/public/images/icon/05.png"
                item.icon = baseUrl + "/public/images/icon/05.png"
            }
            if(item.TPIC_FType == "mp3"){
                item.thumbnail = baseUrl + "/public/images/icon/06.png"
                item.icon = baseUrl + "/public/images/icon/06.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "xlsx"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
            if(item.TPIC_FType == "doc" || item.TPIC_FType == "docx"){
                item.thumbnail = baseUrl + "/public/images/icon/10.png"
                item.icon = baseUrl + "/public/images/icon/10.png"
            }
            if(item.TPIC_FType == "pdf"){
                item.thumbnail = baseUrl + "/public/images/icon/11.png"
                item.icon = baseUrl + "/public/images/icon/11.png"
            }
            if(item.TPIC_FType == "zip"){
                item.thumbnail = baseUrl + "/public/images/icon/12.png"
                item.icon = baseUrl + "/public/images/icon/12.png"
            }
            if(item.TPIC_FType == "cdr"){
                item.thumbnail = baseUrl + "/public/images/icon/cdr.png"
                item.icon = baseUrl + "/public/images/icon/cdr.png"
            }
            if(item.TPIC_FType == "mov"){
                item.thumbnail = baseUrl + "/public/images/icon/MOV.png"
                item.icon = baseUrl + "/public/images/icon/MOV.png"            
            }
            if(item.TPIC_FType == "csv"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
        }
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
}
async getUserFolders(req:Request, res: Response, next: NextFunction){
    try{
        const userID = req.params.id
        const result = await galleryModel.getUserFolders(userID)
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
}
async getFolders(req: Request, res: Response, next: NextFunction){
    try{
        const result = await galleryModel.getFolders()
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
}

async getAllUserImages(req: Request, res: Response, next: NextFunction){
    try{
        const userID = req.params.id
        const result = await galleryModel.getAllUserImages(userID)
        if(result){
            res.json(result)
        }
    } catch(err){
        next(err)
    }
}

async getAllImages(req: Request, res: Response, next: NextFunction){
    try{
        const result = await galleryModel.getAllImages()
        if(result){
            res.json(result)
        }
    } catch(err){
        next(err)
    }
}

async getPictureUse(req: Request, res: Response, next: NextFunction){
    try{
        const id = req.params.id
        const result = await galleryModel.getPictureUse(id)

        if(result){
            res.json(result)
        }
    } catch(err){
        next(err)
    }
}
async update(req: Request, res: Response, next: NextFunction){
    try{
        const data = req.body
        const result = await galleryModel.update(data)  
        if(result){
            this.responseHandler(result, res);

        }
    } catch(error){
        next(error)
    }
}
async delete(req: Request, res: Response, next: NextFunction){
    try{
        const data = req.body.data
        const result = await galleryModel.delete(data)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        next(error)
    }
}
async insertFolder(req: Request, res: Response, next: NextFunction){
    try{
        const data = req.body
        const userID = req.TU_FID
        const mode = req.query.mode
        const date = new Date().currentDate
        const time = new Date().currentTime
        const result = await galleryModel.insertFolder(data, userID, date, time, mode)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        next(error)
    }
}

async moveToFolder(req: Request, res: Response, next: NextFunction){
    try{
        const img = req.body.img
        const folderID = req.body.folderID
        const result = await galleryModel.moveToFolder(img, folderID)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        next(error)
    }
}

async upload(req: Request, res: Response, next: NextFunction){
    
    try{
        let data = []
        const files : any = req.files
        // const folderID = req.params.id
        // const userID = req.TU_FID
        // const date = new Date().currentDate
        // console.log('folerID', folderID)
        // console.log('userID', userID)
        // console.log('date', date)
        for(var i = 0; i < files.length; i++){  
        
            await Resizer.resize("sm", files[i].path, 100)
            const smName = "sm-" + files[i].filename 
            const smPath = path.join(files[i].destination, smName)
            // console.log('smName', smName)
            // console.log('smPath', smPath)
            data.push({
                originalName: files[i].originalname,
                fileName: files[i].filename,
                filePath: files[i].path,
                smFileName: smName,
                smPath: smPath,
                size: files[i].size
            })
            // await this.ftpConnect(files[i].path, files[i].filename, method.user, method.password, method.destination)
            // await this.ftpConnect(smPath, smName, method.user, method.password, method.destination)

        }   
        // console.log('files', files)
        // console.log('data', data)
        // const result = await galleryModel.upload(files, method, folderID, userID, date)
        // if(result){
        //     this.responseHandler(result, res)
        // }
        res.json(data)
    } catch(error){
        next(error)
    }
}

async save(req: Request, res: Response, next: NextFunction){
    try{
        
        const files = req.body
        const userID = req.TU_FID
        const isUser = req.query.userID
        const date = new Date().currentDate
        for(var i=0; i < files.length; i++){
              await this.ftpConnect(files[i].filePath, files[i].fileName, files[i].user, files[i].password, files[i].destination)
        
              await this.ftpConnect(files[i].smPath, files[i].smFileName, files[i].user, files[i].password, files[i].destination)
            
        }

         const result = await galleryModel.upload(files, files[0].destination, files[0].folderID, userID, date, isUser)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        next(error)
    }
}

async ftpConnect(path, name, user, password, host) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    let result;
    try {
      await client.access({
        host: host,
        port: 21,
        user: `${user}`,
        password: `${password}`,
        // secure: true,
      });  
      // console.log(await client.list())
    //   client.trackProgress(info => console.log('info',info.bytesOverall))
      result =  await client.uploadFrom(`${path}`, `${name}`);

      await fs.unlinkSync(path);
      // console.log(await client.downloadTo("first_COPY.jpeg", "first.jpeg"))
    } catch (err) {
      console.log(err);
    }
    if(result){
        client.close();
        return true
    }
  }

  async updateFolder(req: Request, res: Response, next: NextFunction){
    try{
        const folderData = req.body
        const result = await galleryModel.updateFolder(folderData)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        next(error)
    }
  }
  async externalSave(req: Request, res: Response, next: NextFunction){
    try{
        const data = req.body
        const userID = req.TU_FID
        const date = new Date().currentDate
        const result = await galleryModel.externalSave(data, userID, date)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        next(error)
    }
  }

  async downloadFile(req: Request, res: Response, next: NextFunction){
    try{
        const http = require('http');
        var file = req.body
        var url = file.TPIC_FAddress
        var name = file.TPIC_FName
        const response = await Axios.get(url, { responseType: 'stream' });
        res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
        response.data.pipe(res)
    } catch(err){
        next(err)
    }
  }

  async moveFiles(req: Request, res: Response, next: NextFunction){
    try{
        const dest = req.body.dest
        const files = req.body.data
  
        const result = await galleryModel.moveFiles(files, dest)
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
  }
  async getLink(req: Request, res: Response, next: NextFunction){
    try{
        const data = req.params.data
        const stateId = data.split(':')[0]
        const parentId = data.split(':')[1]
        const stateLevel = data.split(':')[2]
        let link;
        if(stateId == "2400101"){
            if(stateLevel == 'user'){
                const result = await pageSaleModel.get("contentManage", parentId)
                link = result.TPS_FLink
            }
        } else if(stateId == "2400202" ){
            if(parentId){
                if(stateLevel == 'admin'){
                    const result = await formBuilderModel.getField(parentId)
                    link = result.TFF_FID_Form
                } else if(stateLevel == 'user'){
                    const result = await formBuilderModel.getFormLink(parentId)
                    link = result.TF_FLink
                }
            }
        }
        if(link){
            res.json(link)
        }
    } catch(error){
        next(error)
    }
  }

  async getUsersFolders(req: Request, res: Response, next: NextFunction){
    try{
        const result : any = await galleryModel.getUsersFolders()
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
  }
  async getUsers(req:Request, res: Response, next: NextFunction){
    try{
        const result = await galleryModel.getUsersGallery()
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
  }
  async getUsersGalleryByID(req: Request, res: Response, next: NextFunction){
    try{
        const id = req.params.id
        const result = await galleryModel.getUsersGalleryByID(id)
        let baseUrl = urls[process.env.Company].server

        for(var i=0; i < result.images.length; i++){
            const item = result.images[i]
            if(item.TPIC_FType == "jpeg" || item.TPIC_FType == "png" || item.TPIC_FType == "jpg" || item.TPIC_FType == "webp" || item.TPIC_FType == "bmp" || item.TPIC_FType == "gif" ||  item.TPIC_FType == "svg"){
                        const smName = "sm-" + item.TPIC_FName 
                        item.thumbnail = item.TPIC_FAddress.replace(item.TPIC_FName, smName)
                        item.icon = baseUrl + "/public/images/icon/image-area.png"
                }
            if(!item.TPIC_FName){
                item.thumbnail = item.TPIC_FAddress
            }
            if(item.TPIC_FType == "tiff"){
                item.thumbnail = baseUrl + "/public/images/icon/image-area.png"
                item.icon = baseUrl + "/public/images/icon/image-area.png"
            }
            if(item.TPIC_FType == "mp4"){
                item.thumbnail = baseUrl + "/public/images/icon/07.png"
                item.icon = baseUrl + "/public/images/icon/07.png"
            }
            if(item.TPIC_FType == "psd"){
                item.thumbnail = baseUrl + "/public/images/icon/01.png"
                item.icon = baseUrl + "/public/images/icon/01.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "avi"){
                item.thumbnail = baseUrl + "/public/images/icon/05.png"
                item.icon = baseUrl + "/public/images/icon/05.png"
            }
            if(item.TPIC_FType == "mp3"){
                item.thumbnail = baseUrl + "/public/images/icon/06.png"
                item.icon = baseUrl + "/public/images/icon/06.png"
            }
            if(item.TPIC_FType == "ai"){
                item.thumbnail = baseUrl + "/public/images/icon/02.png"
                item.icon = baseUrl + "/public/images/icon/02.png"
            }
            if(item.TPIC_FType == "xlsx"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
            if(item.TPIC_FType == "csv"){
                item.thumbnail = baseUrl + "/public/images/icon/08.png"
                item.icon = baseUrl + "/public/images/icon/08.png"
            }
            if(item.TPIC_FType == "doc" || item.TPIC_FType == "docx"){
                item.thumbnail = baseUrl + "/public/images/icon/10.png"
                item.icon = baseUrl + "/public/images/icon/10.png"
            }
            if(item.TPIC_FType == "pdf"){
                item.thumbnail = baseUrl + "/public/images/icon/11.png"
                item.icon = baseUrl + "/public/images/icon/11.png"
            }
            if(item.TPIC_FType == "zip"){
                item.thumbnail = baseUrl + "/public/images/icon/12.png"
                item.icon = baseUrl + "/public/images/icon/12.png"
            }
            if(item.TPIC_FType == "cdr"){
                item.thumbnail = baseUrl + "/public/images/icon/cdr.png"
                item.icon = baseUrl + "/public/images/icon/cdr.png"
            }
            if(item.TPIC_FType == "mov"){
                item.thumbnail = baseUrl + "/public/images/icon/MOV.png"
                item.icon = baseUrl + "/public/images/icon/MOV.png"            
            }
        }
        if(result){
            res.json(result)
        }
    } catch(error){
        next(error)
    }
  }

  async usersGallerysave(req: Request, res: Response, next: NextFunction){
    try{
        const ownerID = req.query.ownerID
        const userID = req.TU_FID
        const files = req.body
        const date = new Date().currentDate
        for(var i=0; i < files.length; i++){
              await this.ftpConnect(files[i].filePath, files[i].fileName, files[i].user, files[i].password, files[i].destination)
        
              await this.ftpConnect(files[i].smPath, files[i].smFileName, files[i].user, files[i].password, files[i].destination)
        }
        console.log('folderID', files[0])
        const result = await galleryModel.upload(files, files[0].destination, files[0].folderID, userID, date, ownerID)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        next(error)
    }
  }
  async updateUserFolder(req: Request, res: Response, next: NextFunction){
    try{
        const data = req.body
        const result = await galleryModel.updateUserFolder(data)
        if(result){
            this.responseHandler(result, res)
        }
    } catch(error){
        console.log(error)
    }
  }
}

export default new galleryController();
