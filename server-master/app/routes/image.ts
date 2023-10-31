import express, { Request, Router } from 'express'
// controllers 
import ImageController from './../controller/ImageController'
// middlewares
// import isAuthenticated from './../middleware/is-auth'
import uploader from "./../middleware/multer"; 

import file from "../middleware/multerFile"

const router: Router = express.Router()

// router.post('/upload', ImageController.upload)
router.post('/upload', uploader, ImageController.upload)
router.post('/delete', ImageController.delete)
router.post('/file', file, ImageController.file)
router.post('/newUpload', uploader, ImageController.newUplaod)
router.post('/save', ImageController.save)
router.post('/saveVid', ImageController.saveVid)

export default router



