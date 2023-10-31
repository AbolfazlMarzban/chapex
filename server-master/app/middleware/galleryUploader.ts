import { Request } from "express";
import multer from "multer";
import path from "path";
import { Express } from "express";

const instance = {
    diskStorage : multer.diskStorage({
        destination: (req: Request, file:Express.Multer.File, cb:CallableFunction)=>{
            const p = path.join("public", "images", "generaltemp") 
            cb(null, p)
        },
        filename: (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
            const fileExtention = file.mimetype.split("/")[1];
            const name =  Date.now().toString() + '.' + fileExtention  
            cb(null, name)
        }
    }),
    fileFilter: (req: Request, file:Express.Multer.File, cb:CallableFunction) => {
        // console.log('mime', file.mimetype)
        if(file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif"
            || file.mimetype == "application/pdf" || file.mimetype == "application/octet-stream" || file.mimetype == "application/octet-stream" 
            || file.mimetype == "application/postscript" || file.mimetype == "image/webp" || file.mimetype == "image/svg+xml" || file.mimetype == "font/ttf"
            || file.mimetype == "image/bmp" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "text/csv"
            || file.mimetype == "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "video/avi" || file.mimetype == "video/x-msvideo" || file.mimetype == "video/mp4" || file.mimetype == "video/quicktime"
            || file.mimetype == "image/vnd.adobe.photoshop" || file.mimetype == "application/cdr" || file.mimetype == "application/coreldraw" 
            || file.mimetype == "application/x-cdr" || file.mimetype == "image/cdr" || file.mimetype == "image/x-cdr" || file.mimetype == "zz-application/zz-winassoc-cdr"
            || file.mimetype == "image/tiff" || file.mimetype == "audio/mpeg" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.documnet"
            || file.mimetype == "application/zip"
        ) {
            cb(null, true)
        } else {
            cb(null , false)
        }
    }
}

const galleryInstance =  multer({storage:  instance.diskStorage, fileFilter: instance.fileFilter })

const galleryUplaoder = galleryInstance.array('files')


export default galleryUplaoder;