import { Request, Response, NextFunction } from "express";

import DefaultsModel from "../../model/defaultModel";

import FormBuilderModel from "../../model/formBuilder/formBuilderModel";
import fileUploaderModel from "../../model/fileUploaderModel";
import abolTableModel from "../../model/abolTableModel";
import Controller from "../Controller";
import path from "path";
import Date from "../../helper/date";
import * as ftp from "basic-ftp";
import * as fs from "fs";
import e from "cors";
import galleryModel from "../../model/gallery/galleryModel";

class FormBuilder extends Controller {
  async getForm(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query.mode;
      const productRowId = req.params.productRowId;
      const formId = req.params.formId;

      let data = {
        form: {},
        fields: [],
        formData: [],
      };
      data.form = await FormBuilderModel.getForm("TFormFID", formId, "0");
      data.fields = await FormBuilderModel.getForm(
        "TFormFieldList",
        formId,
        "0"
      );
      data.formData = await FormBuilderModel.getFormData(
        "TFormData",
        req.TU_FID,
        formId,
        productRowId
      );
      // console.log(data.fields);
      for (const field of data.fields) {
        if (
          field.TFF_FID_TypeField == 11105 ||
          field.TFF_FID_TypeField == 11104 ||
          field.TFF_FID_TypeField == 11106 ||
          field.TFF_FID_TypeField == 11107 ||
          field.TFF_FID_TypeField == 11108
        ) {
          field["items"] = await FormBuilderModel.getForm(
            "TFormFieldList",
            formId,
            field.TFF_FID
          );
        }
      }
      // data.items = await FormBuilderModel.getFrom("TFormFieldList", )

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }
  async get(req: Request, res: Response, next: NextFunction) {
    const DateTime = new Date();
    try {
      const mode = req.query.mode;
      const id = req.params.id;

      let data = {
        table: [],
        form: {},
        fields: {},
        formFields: {},
        tableHeaders: [],
      };
      const neededDefaults: Array<number> = [111];
      if (mode == "init") {
        for (const def of neededDefaults) {
          data.fields["fields"] = await DefaultsModel.findByGroupId(def);
        }
        data.form = await FormBuilderModel.getTableSchema("TForm");
        data.form["TF_FDateReg"] = DateTime.now().currentDate;
      } else if (mode == "table") {
        data.table = await FormBuilderModel.getForm("TFormList");
        data.tableHeaders = await abolTableModel.get("fa", 11205, req.TU_FID);
      } else if (mode == "show") {
        data.form = await FormBuilderModel.getForm("TFormFID", id);
        data.formFields = await FormBuilderModel.getForm("TFormFieldList", id);
        for (const def of neededDefaults) {
          data.fields["fields"] = await DefaultsModel.findByGroupId(def);
        }
      }

      res.json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getByLink(req: Request, res: Response, next: NextFunction) {
    try {
      const link = req.body.data;
      const data : any = await FormBuilderModel.getByLink(link);
      data.formFields = await FormBuilderModel.getForm("TFormFieldList", data.form.TF_FID);
      
      // console.log('data', data)
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      // if (data.formPic) {
      //   if (data.formPic.path) {
      //     const picName = path.basename(data.formPic.path).replace("temp-", "");

      //     const oldPath = data.formPic.path;
      //     const newPath = path.join(data.formPic.uploadPath, picName);

      //     fs.rename(oldPath, newPath, (err) => {
      //       if (err) {
      //         throw err;
      //       }
      //     });
      //     data.TF_FPic = newPath;
      //     // console.log('data TF_FPic', data.TF_FPic)
      //   }
      // }

      const saveForm = await FormBuilderModel.saveForm(
        data,
        req.TU_FID,
        "Update"
      );

      if (saveForm) {
        if (data.formPic) {
          if (data.formPic.thumbnail_path) {
            fs.unlinkSync(data.formPic.thumbnail_path);
          }
        }

        let schemaFormField = await FormBuilderModel.getTableSchema(
          "TFormField"
        );

        for (const field of data.fields) {
          let schema = this.setFieldsFormValue(
            schemaFormField,
            saveForm,
            field,
            req.TU_FID,
            "update"
          );
          schema["TFF_FID_Form"] = data.TF_FID;

          let saveField = null;
          if (field.isnew) {
            if (field.TFF_FDelete == 0) {
              saveField = await FormBuilderModel.saveField(
                schema,
                req.TU_FID,
                "Insert"
              );
              // console.log("saveField", saveField);
            }
          } else {
            saveField = await FormBuilderModel.saveField(
              schema,
              req.TU_FID,
              "Update"
            );
            // console.log("updateField", saveField);
          }

          if (saveField) {
            // insert item value
            if (field.items) {
              // insert select value
              if (
                field.TFF_FType == "select" ||
                field.TFF_FType == "multiselect"
              ) {
                for (const selectItem of field.items) {
                  let item_schema = this.setFieldsFormValue(
                    schemaFormField,
                    saveForm,
                    selectItem,
                    req.TU_FID
                  );

                  item_schema["TFF_FID_Form"] = data.TF_FID;
                  schemaFormField["TFF_FLable"] = selectItem.name;

                  if (field.isnew) {
                    schemaFormField["TFF_FID_ParentFormField"] =
                      saveField.output.ReturnFID;
                  } else {
                    schemaFormField["TFF_FID_ParentFormField"] = field.TFF_FID;
                  }

                  if (selectItem.isnew) {
                    if (selectItem.TFF_FDelete == 0) {
                      let saveSelectItem = await FormBuilderModel.saveField(
                        schemaFormField,
                        req.TU_FID,
                        "Insert"
                      );
                      // console.log('save Items', saveSelectItem)
                      if (saveSelectItem) {
                        // console.log("select item inserted!");
                      }
                    }
                  } else {
                    let saveSelectItem = await FormBuilderModel.saveField(
                      schemaFormField,
                      req.TU_FID,
                      "Update"
                    );
                    if (saveSelectItem) {
                      // console.log("select item updated!");
                    }
                  }
                }
              }

              // insert radio value
              else if (
                field.TFF_FType == "radio" ||
                field.TFF_FType == "accardion"
              ) {
                for (const radioItem of field.items) {
                  let item_schema = this.setFieldsFormValue(
                    schemaFormField,
                    saveForm,
                    radioItem,
                    req.TU_FID
                  );
                  let saveRadioItem = null;

                  item_schema["TFF_FID_Form"] = data.TF_FID;
                  item_schema["TFF_FLable"] = radioItem.title;
                  item_schema["TFF_FDefault"] = radioItem.value;

                  if (field.isnew) {
                    schemaFormField["TFF_FID_ParentFormField"] =
                      saveField.output.ReturnFID;
                  } else {
                    schemaFormField["TFF_FID_ParentFormField"] = field.TFF_FID;
                  }

                  if (radioItem.isnew) {
                    if (radioItem.TFF_FDelete == 0) {
                      saveRadioItem = await FormBuilderModel.saveField(
                        item_schema,
                        req.TU_FID,
                        "Insert"
                      );
                      if (saveRadioItem) {
                        // console.log("radio item inserted!");
                      }
                    }
                  } else {
                    saveRadioItem = await FormBuilderModel.saveField(
                      item_schema,
                      req.TU_FID,
                      "Update"
                    );
                    if (saveRadioItem) {
                      // console.log("radio item updated!");
                    }
                  }
                }
              } else if (field.TFF_FType == "slider") {
                if (field.TFF_FDelete == 0) {
                  const userID = req.TU_FID;
                  for (var i = 0; i < field.items.length; i++) {
                    if (field.items[i].TFF_FDelete == 0) {
                      if (field.items[i].isnew) {
                        // console.log('retId', saveField.output.ReturnFID)
                        // console.log('parentID', field.TFF_FID)
                        if (field.TFF_FID == 0) {
                            await galleryModel.useSave(field.items[i].img, 2400202, saveField.output.ReturnFID, 0)                          
                        } else {
                          await galleryModel.useSave(field.items[i].img, 2400202, field.TFF_FID, 0)
                        }
                      } else {
                        // console.log("Update retId", saveField.output.ReturnFID);

                        var updateAddress = this.updateImage(field.items[i]);
                      }
                    } else if (field.items[i].TFF_FDelete == 1) {
                      // console.log("delete Picture");
                      this.updateImage(field.items[i]);
                    }
                  }
                } else {
                  for (var i = 0; i < field.items.length; i++) {
                    const address = this.updateImage(field.items[i]);
                  }
                }
              }
              else if(field.TFF_FType == "showimg"){
                if(field.TFF_FDelete == 0){
                  if(field.items[0] && field.items[0].TFF_FDelete == 0){  
                    if(field.items[0].isnew){
                      if(field.isnew){
                        await galleryModel.useSave(field.items[0].img, 2400202, saveField.output.ReturnFID, 0)
                      } else {
                        await galleryModel.useSave(field.items[0].img, 2400202, field.TFF_FID, 0)
                      }
                    } else{
                      //must update showimg
                     this.updateImage(field.items[0]) 
                    }
                  } else if(field.items[0] && field.items[0].TFF_FDelete == 1){
                    this.updateImage(field.items[0])
                  }
                } else{
                  this.updateImage(field.items[0])
                }
              }
              else if(field.TFF_FType == "video"){
                if(field.TFF_FDelete == 0){
                  if(field.items[0].TFF_FDelete == 0){
                    if(field.items[0].isnew){
                      if(field.isnew){
                        await galleryModel.useSave(field.items[0].img, 2400202, saveField.output.ReturnFID, 0)
                      } else {
                        await galleryModel.useSave(field.items[0].img, 2400202, field.TFF_FID, 0)
                      }
                    } else{
                      //must update video
                     this.updateImage(field.items[0]) 
                    }
                  } else if(field.items[0].TFF_FDelete == 1){
                    this.updateImage(field.items[0])
                  }
                } else{
                  this.updateImage(field.items[0])
                }
              }
              else if (field.TFF_FType == "salePage") {
                if (field.TFF_FDelete == 0) {
                  for (var i = 0; i < field.items.length; i++) {
                    let item_schema = this.setFieldsFormValue(
                      schemaFormField,
                      saveForm,
                      field.items[i],
                      req.TU_FID
                    );

                    if (field.items[i].isnew) {
                      console.log('saleParent', field.TFF_FID)
                        if(field.TFF_FID == 0){
                          schemaFormField["TFF_FID_ParentFormField"] =
                          saveField.output.ReturnFID;
                        item_schema["TFF_FID_ParentFormField"] =
                          saveField.output.ReturnFID;
                        item_schema["TFF_FID_Form"] = data.TF_FID;
                        item_schema["TFF_FDefault"] = field.items[i].id;
                        item_schema["TFF_FLable"] = field.items[i].title;
                        item_schema["TFF_FComment"] = field.items[i].image;
                        item_schema["TFF_FToolTip"] = field.items[i].link;
                        // console.log("salePage Insert");
                        console.log('sale parentID', saveField.output.ReturnFID)
                        await FormBuilderModel.saveField(
                          item_schema,
                          req.TU_FID,
                          "Insert"
                        );
                        } else {
                          schemaFormField["TFF_FID_ParentFormField"] =
                          field.TFF_FID;
                        item_schema["TFF_FID_ParentFormField"] =
                          field.TFF_FID;
                        item_schema["TFF_FID_Form"] = data.TF_FID;
                        item_schema["TFF_FDefault"] = field.items[i].id;
                        item_schema["TFF_FLable"] = field.items[i].title;
                        item_schema["TFF_FComment"] = field.items[i].image;
                        item_schema["TFF_FToolTip"] = field.items[i].link;
                        // console.log("salePage Insert");
                        // console.log('parentID', saveField.output.ReturnFID)
                        await FormBuilderModel.saveField(
                          item_schema,
                          req.TU_FID,
                          "Insert"
                        );
                        }
             
                    } else {
                      schemaFormField["TFF_FID_ParentFormField"] =
                        saveField.output.ReturnFID;
                      item_schema["TFF_FID_ParentFormField"] = field.TFF_FID;
                      item_schema["TFF_FID_Form"] = data.TF_FID;
                      item_schema["TFF_FDefault"] = field.items[i].id;
                      item_schema["TFF_FLable"] = field.items[i].title;
                      item_schema["TFF_FComment"] = field.items[i].image;
                      item_schema["TFF_FToolTip"] = field.items[i].link;
                      console.log("salePage Update");

                      await FormBuilderModel.saveField(
                        item_schema,
                        req.TU_FID,
                        "Update"
                      );
                    }
                  }
                }
              }
            }
          }
        }
        this.responseHandler(saveForm, res);
      }
    } catch (error) {
      next(error);
    }
  }
  async updateImage(item) {
    if (item.TFF_FDelete == 1) {
      await galleryModel.useDelete(item.img.TPIC_FID)
    }
  }
 
  async insert(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body.data;
      const saveForm = await FormBuilderModel.saveForm(
        data,
        req.TU_FID,
        "Insert"
      );
        // console.log('saveForm', saveForm)
      var ReturnFID = null;
      if (saveForm) {

        ReturnFID = saveForm.output.ReturnFID;
        // console.log('ReturnFID', ReturnFID)
        let schemaFormField = await FormBuilderModel.getTableSchema(
          "TFormField"
        );
        // console.log("dataFields", data.fields)
        for (const field of data.fields) {
          if (field.TFF_FDelete == 0) {
            let schema = this.setFieldsFormValue(
              schemaFormField,
              saveForm,
              field,
              req.TU_FID
            );
            // console.log('schemaFormField', schemaFormField)
            let saveField = await FormBuilderModel.saveField(
              schema,
              req.TU_FID,
              "Insert"
            );

            if (saveField) {
              // insert item value
              if (field.items) {
                // insert select value
                if (
                  field.TFF_FType == "select" ||
                  field.TFF_FType == "multiselect"
                ) {
                  for (const selectItem of field.items) {
                    if (selectItem.TFF_FDelete == 0) {
                      schemaFormField["TFF_FID_ParentFormField"] =
                        saveField.output.ReturnFID;
                      schemaFormField["TFF_FLable"] = selectItem.name;

                      let saveSelectItem = await FormBuilderModel.saveField(
                        schemaFormField,
                        req.TU_FID,
                        "Insert"
                      );

                      if (saveSelectItem) {
                        // console.log("select item inserted!");
                      }
                    }
                  }
                }
                // insert radio value
                else if (
                  field.TFF_FType == "radio" ||
                  field.TFF_FType == "accardion"
                ) {
                  for (const radioItem of field.items) {
                    if (radioItem.TFF_FDelete == 0) {
                      schemaFormField["TFF_FID_ParentFormField"] =
                        saveField.output.ReturnFID;
                      schemaFormField["TFF_FLable"] = radioItem.title;
                      schemaFormField["TFF_FDefault"] = radioItem.value;

                      let saveRadioItem = await FormBuilderModel.saveField(
                        schemaFormField,
                        req.TU_FID,
                        "Insert"
                      );

                      if (saveRadioItem) {
                        // console.log("radio item inserted!");
                      }
                    }
                  }
                }
                else if (field.TFF_FType == "slider") {
                  // console.log('slider items', field.items)
                  // console.log('retId', saveField.output.ReturnFID)
                  if (field.TFF_FDelete == 0) {
                    const userID = req.TU_FID;
                    for (var i = 0; i < field.items.length; i++) {
                      if (field.items[i].TFF_FDelete == 0) {
                          if (field.TFF_FID == 0) {
                            await galleryModel.useSave(field.items[i].img, 2400202, saveField.output.ReturnFID, i)
                          } 
                      }
                    }
                  }
                } 
                else if(field.TFF_FType == "showimg"){
                  if(field.TFF_FDelete == 0){
                    if(field.items[0].TFF_FDelete == 0){
                      await galleryModel.useSave(field.items[0].img, 2400202, saveField.output.ReturnFID, 0)
                    }
                  }
                }

                else if(field.TFF_FType == "video"){
                  if(field.TFF_FDelete == 0){
                    if(field.items[0].TFF_FDelete == 0){
                      await galleryModel.useSave(field.items[0].img, 2400202, saveField.output.ReturnFID, 0)
                    }
                  }
                }
                //insert salePage component
                else if (field.TFF_FType == "salePage") {
                  if (field.TFF_FDelete == 0) {
                    for (var i = 0; i < field.items.length; i++) {
                      let item_schema = this.setFieldsFormValue(
                        schemaFormField,
                        saveForm,
                        field.items[i],
                        req.TU_FID
                      );
  
                      // if (field.items[i].isnew) {
                        // console.log('saleParent', field.TFF_FID)
                          if(field.TFF_FID == 0){
                            schemaFormField["TFF_FID_ParentFormField"] =
                            saveField.output.ReturnFID;
                          item_schema["TFF_FID_ParentFormField"] =
                            saveField.output.ReturnFID;
                          item_schema["TFF_FID_Form"] = saveForm.output.ReturnFID;
                          item_schema["TFF_FDefault"] = field.items[i].id;
                          item_schema["TFF_FLable"] = field.items[i].title;
                          item_schema["TFF_FComment"] = field.items[i].image;
                          item_schema["TFF_FToolTip"] = field.items[i].link;
                          // console.log("salePage Insert");
                          console.log('sale parentID', saveField.output.ReturnFID)
                          await FormBuilderModel.saveField(
                            item_schema,
                            req.TU_FID,
                            "Insert"
                          );
                          }
               
                      // } 
                    }
                  }
                }
              }
            }
          }
        }
        this.responseHandler(saveForm, res, { ReturnFID: ReturnFID });
      }
    } catch (error) {
      next(error);
    }
  }

  setFieldsFormValue(schema, formData, field, user, status = "insert") {
    const DateTime = new Date();
    if (status == "update") {
      schema["TFF_FID_Form"] = field.TFF_FID_Form;
    } else {
      schema["TFF_FID_Form"] = formData.output.ReturnFID;
    }
    schema["TFF_FID"] = field.TFF_FID;
    schema["TFF_FID_ParentFormField"] = field.TFF_FID_ParentFormField
      ? field.TFF_FID_ParentFormField
      : 0;
    schema["TFF_FLable"] = field.TFF_FLable;
    schema["TFF_FComment"] = field.TFF_FComment;
    schema["TFF_FPlaceHolder"] = field.TFF_FPlaceHolder;
    schema["TFF_FToolTip"] = field.TFF_FToolTip;
    schema["TFF_FActive"] = field.TFF_FActive;
    schema["TFF_FOrder"] = field.TFF_FOrder;
    schema["TFF_FRequired"] = field.TFF_FRequired;
    schema["TFF_FIcon"] = field.TFF_FIcon;
    schema["TFF_FColumn"] = field.TFF_FColumn;
    schema["TFF_FLenMax"] = field.TFF_FLenMax;
    schema["TFF_FLenMin"] = field.TFF_FLenMin;
    schema["TFF_FDefault"] = field.TFF_FDefault;
    schema["TFF_FDelete"] = field.TFF_FDelete ? field.TFF_FDelete : 0;
    schema["TFF_FUserReg"] = user;
    schema["TFF_FDateReg"] = DateTime.now().currentDate;
    schema["TFF_FFileFormat"] = field.TFF_FFileFormat;
    schema["TFF_FColorFormat"] = field.TFF_FColorFormat;
    schema["TFF_FTempLink"] = field.TFF_FTempLink;
    schema["TFF_FResMin"] = field.TFF_FResMin;
    schema["TFF_FResMax"] = field.TFF_FResMax;
    schema["TFF_FSizeMin"] = field.TFF_FSizeMin;
    schema["TFF_FSizeMax"] = field.TFF_FSizeMax;
    schema["TFF_FFileWidth"] = field.TFF_FFileWidth;
    schema["TFF_FFileHeight"] = field.TFF_FFileHeight;
    schema["TFF_FID_TypeField"] = field.TFF_FID_TypeField;
    return schema;
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await FormBuilderModel.delete(id, req.TU_FID);
      this.responseHandler(result, res);
    } catch (error) {
      next(error);
    }
  }

  async insertDataUpdateData(req: Request, res: Response, next: NextFunction) {
    try {
      const DateTime = new Date();
      const data = req.body.data;
      const mode = req.query.mode;
      // const result = await FormBuilderModel.insertData("Insert" , data);
      let result;
      let orderID;
      for (let field of data) {
        field.userReg = req.TU_FID;
        field.timeReg = DateTime.now().currentTime;
        field.dateReg = DateTime.now().currentDate;
        field.formID = field.TFF_FID_Form;
        field.fieldID = field.TFF_FID;
        if (mode == "insert") {
          if(field.orderID){
            orderID = field.orderID
          }
          if (field.TFF_FType == "file" || field.TFF_FType == "advUploader") {
            if (field.value) {
              field.picId = field.value.TPIC_FID
            } else{
              field.picId = null
            }
          } else {
            field.picId = null
          }
          // console.log('field',field)
          result = await FormBuilderModel.insertAndUpdateData("Insert", field, orderID);
        } else {
          result = await FormBuilderModel.insertAndUpdateData("Update", field, orderID);
        }
      }

      if (result) {
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async ftpConnect(path, name, user, password) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: "upload.chapex.ir",
        port: 21,
        user: `${user}`,
        password: `${password}`,
        // secure: true,
      });
      // console.log(await client.list())
      await client.uploadFrom(`${path}`, `${name}`);
      // console.log(await client.downloadTo("first_COPY.jpeg", "first.jpeg"))
    } catch (err) {
      console.log(err);
    }
    fs.unlinkSync(path);
    client.close();
  }

  async updateTabState(req: Request, res: Response, next: NextFunction) {
    try {
      const tabState = req.body.data.tabState;
      const productId = req.body.data.productId;
      const result = await FormBuilderModel.updateTabState(
        "UpdateTempField",
        tabState,
        productId
      );
      if (result) {
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteFormData(req: Request, res: Response, next: NextFunction) {
    try {
      const formId = req.params.formId;
      const productId = req.params.productRowId;
      // console.log(formId, productId, " formIdin delete datda controller");

      const result = await FormBuilderModel.deleteFormData(
        "TFormData",
        formId,
        productId
      );
      if (result) {
        this.responseHandler(result, res);
      }
    } catch (error) {
      next(error);
    }
  }

  async getResult(req: Request, res: Response, next: NextFunction){
    try{
      const id = req.query.id
      const userID = req.TU_FID
      const orderID = req.query.orderID

      const result: any = await FormBuilderModel.getResult(id, userID, orderID)
      if(result){
        res.json(result)
      }
    } catch(error){
      next(error)
    }
  }
}

export default new FormBuilder();
