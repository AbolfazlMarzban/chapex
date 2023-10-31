import express, { Router } from "express";
const router: Router = express.Router();
import isAuth from "../../middleware/is-auth";
import galleryController from "../../controller/gallery/galleryController";
import galleryUplaoder from "../../middleware/galleryUploader";



router.get("/admin", isAuth, galleryController.get)
router.get('/users', isAuth, galleryController.getUsers)
router.get("/user/:id", isAuth, galleryController.getByUser)
router.get("/getByID/:id", isAuth, galleryController.getByID)
router.get('/getUsersGalleryByID/:id', isAuth, galleryController.getUsersGalleryByID)
router.get("/getByUserAndID/:userID/:id", isAuth, galleryController.getByUserAndID)
router.get("/pictureUse/:id", isAuth, galleryController.getPictureUse)
router.get('/getLink/:data', isAuth, galleryController.getLink)
router.get("/getUserFolders/:id", isAuth, galleryController.getUserFolders)
router.get("/getFolders", isAuth, galleryController.getFolders)
router.get("/getAllUserImages/:id", isAuth, galleryController.getAllUserImages)
router.get("/getAllImages", isAuth, galleryController.getAllImages)
router.get('/getUsersFolders', isAuth, galleryController.getUsersFolders)
router.post("/external", isAuth, galleryController.externalSave)
router.post("/updateFolder", isAuth, galleryController.updateFolder)
router.post('/updateUserFolder', isAuth, galleryController.updateUserFolder)
router.post("/upload/:id", isAuth,galleryUplaoder, galleryController.upload)
router.post("/save", isAuth, galleryController.save)
router.post('/usersGallerysave', isAuth, galleryController.usersGallerysave)
router.post("/edit", isAuth, galleryController.update)
router.post("/delete", isAuth, galleryController.delete)
router.post("/insertFolder", isAuth, galleryController.insertFolder)
router.post("/moveToFolder", isAuth, galleryController.moveToFolder)
router.post("/filedownload", galleryController.downloadFile)
router.post("/moveFiles", isAuth, galleryController.moveFiles)


export default router; 