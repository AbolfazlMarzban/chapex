import express, { Router } from "express";

import FormBuilderController from "../../controller/formBuilder/formBuilderController";

import isAuth from '../../middleware/is-auth';

const router: Router = express.Router();

                        
router.get("/get/:id", isAuth ,FormBuilderController.get);         

router.get("/getUserForm/:formId" ,FormBuilderController.getForm); 

router.get("/getResult", isAuth, FormBuilderController.getResult)

router.get("/:productRowId/getForm/:formId", isAuth , FormBuilderController.getForm);  

router.post("/getbylink", FormBuilderController.getByLink) 

router.post("/", isAuth , FormBuilderController.insert);  

router.post("/insertAndUpdateData", isAuth , FormBuilderController.insertDataUpdateData);

router.patch("/designstatus/tabstate", isAuth , FormBuilderController.updateTabState);

router.patch("/deleteFormData/:formId/:productRowId", isAuth , FormBuilderController.deleteFormData);

router.patch("/", isAuth , FormBuilderController.update);

router.delete("/:id", isAuth , FormBuilderController.delete);
 


export default router;
