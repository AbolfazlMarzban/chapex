import path from "path";
import { Express, Request } from "express";
import multer from "multer";

const instance = {
  diskStorage: multer.diskStorage({
    async destination(req, file, cb) {
      const options = req.body;
      let route;

      if (options.state == "productPdf") {
        route = path.join("public/images/product");
      }


      else if (options.state == "productCDR") {
        route = path.join("public/images/product");
      }

      else if (options.state == "productAi") {
        route = path.join("public/images/product");
      }

      else if (options.state == "productPsd") {
        route = path.join("public/images/product");
      }

      else if(options.state == "videoMP4"){
        route = path.join("public/images/formBuilder")
      }

      cb(null, route);
    },

    filename(req, file, cb) {
      const options = req.body;
      if (options.state == "productAi") {
        cb(null, "ai-" + Date.now().toString() + ".ai");
      }

      else if (options.state == "productPdf") {
        cb(null, "pdf-" + Date.now().toString() + ".pdf");
      }

      else if (options.state == "productCDR") {
        cb(null, "cdr-" + Date.now().toString() + ".cdr");
      }

      else if (options.state == "productPsd") {
        cb(null, "psd-" + Date.now().toString() + ".psd");
      }

      else if(options.state == "videoMP4"){
        cb(null, "mp4-" + Date.now().toString() + ".mp4")
      }
    },
  }),
  fileFilter: (req, file, cb) => {
    
    // validating
    const options = req.body;
    
    // console.log('file.mimetype', file.mimetype);
    // console.log('options.state', options.state);

    if (file.mimetype == "application/pdf" && options.state == "productPdf") {
      cb(null, true);
    }

    else if (
      file.mimetype == "application/octet-stream" &&
      options.state == "productPsd"
    ) {
      cb(null, true);
    }

    else if (
      file.mimetype == "application/octet-stream" &&
      options.state == "productCDR"
    ) {
      cb(null, true);
    }

    else if (
      file.mimetype == "application/postscript" &&
      options.state == "productAi"
    ) {
      cb(null, true);
    }

    else if (
      file.mimetype == "video/mp4" &&
      options.state == "videoMP4"
    ) {
      cb(null, true);
    }

    else {
      cb(null, false);
    }
  },
};

const uploaderInstance = multer({
  storage: instance.diskStorage,
  fileFilter: instance.fileFilter,
});

const uploader = uploaderInstance.single("file");

export default uploader;
