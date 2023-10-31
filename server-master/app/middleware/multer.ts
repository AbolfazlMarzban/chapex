import { Express, Request } from "express";
import multer from "multer";

import ImageHandle from "./../helper/image-uploader";

// interface FileOptions {
//   state: string // user, ...
//   image: any
//   type: string
// }

const instance = {
  diskStorage: multer.diskStorage({
    async destination(req: Request, file: Express.Multer.File, cb: CallableFunction) {

      const options = req.body;

      let filePath = await ImageHandle(options.state, options, "uploading");
      // let filePath = "public/images/"
      cb(null, filePath);
      // console.log('filePath', filePath)

    },
    filename(req: Request, file: Express.Multer.File, cb: CallableFunction) {
      const fileExtention = file.mimetype.split("/")[1];

      const options = req.body;

      const createdFilename = createFileName(options) + "." + fileExtention;
      cb(null, createdFilename);
    },
  }),

  fileFilter: (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
    const options = req.body;

    if (options.type == "image" || 1) {
      if (
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    } else if (options.type == "file") {
      cb(null, true);
    }
  },
};

const uploaderInstance = multer({ storage: instance.diskStorage, fileFilter: instance.fileFilter, });

const uploader = uploaderInstance.single("image");



// helper
const createFileName = (options) => {
  let newPath = "";

  if (options.state == "user") {
    newPath = "temp-" + Date.now().toString();
  }

  else if (options.state == "optionIcon") {
    newPath = "temp-" + Date.now().toString();
  }

  else if (options.state == "optionImage") {
    newPath = "temp-" + Date.now().toString();
  }

  else if (options.state == "product") {
    newPath = "temp-" + Date.now().toString();
  }

  else if (options.state == "pageSale") {
    newPath = "temp-" + Date.now().toString();
  } 
  else if(options.state == "advancedUploader"){
    newPath = "temp-" + Date.now().toString();
  } 
  else if(options.state == "salePageCategory"){
    newPath = "temp-" + Date.now().toString();
  }
  else {
    newPath = "temp-" + Date.now().toString()
  }
  return newPath;
};

export default uploader;