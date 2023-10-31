import Model from "../Model";

class FormBuilderModel extends Model {
  constructor() {
    super();
  }

  async saveForm(data, user, state: string) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;

      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state) 
        .input("TF_FID", this.sql.Int, data.TF_FID)
        .input("TF_FName", this.sql.NVarChar, data.TF_FName)
        .input("TF_FTitle", this.sql.NVarChar, data.TF_FTitle)
        .input("TF_FLink", this.sql.NVarChar, data.TF_FLink)
        .input("TF_FKeywords", this.sql.NVarChar, data.TF_FKeywords)
        .input("TF_FMeta", this.sql.NVarChar, data.TF_FMeta)
        .input("TF_FComment", this.sql.NVarChar, data.TF_FComment)
        .input("TF_FCaption", this.sql.NVarChar, data.TF_FCaption)
        .input("TF_FDetails", this.sql.NVarChar, data.TF_FDetails)
        .input("TF_FID_FType", this.sql.BigInt, data.TF_FID_FType)
        .input("TF_FPic", this.sql.NVarChar, data.TF_FPic)
        .input("TF_FCenter", this.sql.TinyInt, data.TF_FCenter)
        .input("TF_FColumn", this.sql.TinyInt, data.TF_FColumn)
        .input("TF_FActive", this.sql.Int, data.TF_FActive)
        .input("TF_FUserReg", this.sql.Int, user)
        .input("TF_FDateReg", this.sql.NVarChar, data.TF_FDateReg)
        .input("TF_FDelete", this.sql.NVarChar, data.TF_FDelete)
        .input("User", this.sql.BigInt, user)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TForm_Ins");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async saveField(data, user, state: string) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;


      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TFF_FID", this.sql.Int, data.TFF_FID)
        .input("TFF_FID_Form", this.sql.Int, data.TFF_FID_Form)
        .input("TFF_FID_ParentFormField", this.sql.Int, data.TFF_FID_ParentFormField)
        .input("TFF_FID_TypeField", this.sql.Int, data.TFF_FID_TypeField)
        .input("TFF_FLable", this.sql.NVarChar, data.TFF_FLable)
        .input("TFF_FComment", this.sql.NVarChar, data.TFF_FComment)
        .input("TFF_FToolTip", this.sql.NVarChar, data.TFF_FToolTip)
        .input("TFF_FPlaceHolder", this.sql.NVarChar, data.TFF_FPlaceHolder)
        .input("TFF_FActive", this.sql.Int, data.TFF_FActive)
        .input("TFF_FOrder", this.sql.TinyInt, data.TFF_FOrder)
        .input("TFF_FRequired", this.sql.Int, data.TFF_FRequired)
        .input("TFF_FIcon", this.sql.NVarChar, data.TFF_FIcon)
        .input("TFF_FColumn", this.sql.TinyInt, data.TFF_FColumn)
        .input("TFF_FLenMax", this.sql.TinyInt, data.TFF_FLenMax)
        .input("TFF_FLenMin", this.sql.TinyInt, data.TFF_FLenMin)
        .input("TFF_FDefault", this.sql.NVarChar, data.TFF_FDefault)
        .input("TFF_FUserReg", this.sql.Int, data.TFF_FUserReg)
        .input("TFF_FDateReg", this.sql.NVarChar, data.TFF_FDateReg)
        .input("TFF_FDelete", this.sql.TinyInt, data.TFF_FDelete)
        .input("TFF_FFileFormat", this.sql.NVarChar, data.TFF_FFileFormat)
        .input("TFF_FColorFormat", this.sql.NVarChar, data.TFF_FColorFormat)
        .input("TFF_FTempLink", this.sql.NVarChar, data.TFF_FTempLink)
        .input("TFF_FResMin", this.sql.Float, data.TFF_FResMin)
        .input("TFF_FResMax", this.sql.Float, data.TFF_FResMax)
        .input("TFF_FSizeMin", this.sql.Float, data.TFF_FSizeMin)
        .input("TFF_FSizeMax", this.sql.Float, data.TFF_FSizeMax)
        .input("TFF_FFileWidth", this.sql.Float, data.TFF_FFileWidth)
        .input("TFF_FFileHeight", this.sql.Float, data.TFF_FFileHeight)
        .input("User", this.sql.BigInt, user)

        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .output("ReturnFID", this.sql.BigInt, ReturnFID)
        .execute("USP_TFormField_Ins");

      return result;
    } catch (error) {
      console.log(error);
    }
  }


  async getForm(state: string, id: string = "0", parentID: string = "0") {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("Year", this.sql.Int, process.env.YEAR_ACCOUNTING)
        .input("FID", this.sql.Int, id)
        .input("FID_ParentFormField", this.sql.Int, parentID)
        .execute("USP_TForm_Select");
      if (state == "TFormFID") {
        return result.recordset[0];
      } else
        if (state == "TFormList") {
          return result.recordset;
        }
        else
          if (state == "TFormFieldList") {
            for (var i = 0; i <= result.recordset.length - 1; i++) {
              //#region type
              // result.recordset[i].type = await this.return_type(result.recordset[i].TFF_FID_TypeField)
              //#endregion

              //#region items
              // console.log('TFormFieldList result', result)
              switch (result.recordset[i].TFF_FType) {
                case 'radio':
                  result.recordset[i].items = await this.return_radioitems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                  break

                case 'accardion':
                  result.recordset[i].items = await this.return_radioitems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                  break
                  
                case 'select':
                  result.recordset[i].items = await this.return_selectitems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                  break

                case 'multiselect':
                  result.recordset[i].items = await this.return_selectitems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                  break
                case 'slider':
                result.recordset[i].items = await this.return_slideritems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                break
                case 'salePage':
                  result.recordset[i].items = await this.return_pageSaleItems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                break
                case 'showimg':
                  result.recordset[i].items = await this.return_showImgItems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                break
                case 'video':
                  result.recordset[i].items = await this.return_videoItems(result.recordset[i].TFF_FID_Form, result.recordset[i].TFF_FID)
                break
              }
              //#endregion

            }

            //#region sort

            var sorted = result.recordset.sort((n1, n2) => {
              if (n1.TFF_FOrder > n2.TFF_FOrder) {
                return 1;
              }

              if (n1.TFF_FOrder < n2.TFF_FOrder) {
                return -1;
              }

              return 0;
            })

            //#endregion

            return sorted;
          }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async return_videoItems(formID, fieldID){
    try{
      const result = await this.Database.request().query(`SELECT * FROM [dbo].[V_TPictureUse] WHERE [TPU_FID_State] = 2400202 AND [TPU_FID_Parent] = ${fieldID}`)
      let items= []
      if(result.recordset.length > 0){
        items = [
         { img :{
          TPIC_FAddress: result.recordset[0].TPU_FAddress,
          TPIC_FID: result.recordset[0].TPU_FID_Picture
         }
         }   
      ]
      }
     return items

    } catch(error){
      console.log(error)
    }
  }

  async return_showImgItems(formID, fieldID){
    try{
      const result = await this.Database.request().query(`SELECT * FROM [dbo].[V_TPictureUse] WHERE [TPU_FID_State] = 2400202 AND [TPU_FID_Parent] = ${fieldID}`)
      let items;
      if(result.recordset.length > 0){
         items = [
           { img :{
            TPIC_FAddress: result.recordset[0].TPU_FAddress,
            TPIC_FComment: result.recordset[0].TPU_FAlt,
            TPIC_FID: result.recordset[0].TPU_FID_Picture
           }
           }   
        ]
      } else {
        items = []
      }
      return items
    } catch(err){
      console.log(err)
    }
  }
  async return_slideritems(TFF_FID_Form, FID_ParentFormField){
    var items = []
    // console.log('TFF_FID_Form', TFF_FID_Form)
    // console.log('FID_ParentFormField', FID_ParentFormField)
    const result = await this.Database.request().query(`SELECT * FROM [dbo].[V_TPictureUse] WHERE [TPU_FID_State] = 2400202 AND [TPU_FID_Parent] = ${FID_ParentFormField}
    `) 
  if (result.recordset.length > 0) {
    for (var i = 0; i <= result.recordset.length - 1; i++) {
      items.push({ img:{
        TPIC_FAddress: result.recordset[i].TPU_FAddress,
        imgAlt: result.recordset[i].TPU_FAlt,
        state: "formBuilder",
        parenID: TFF_FID_Form,
        TPIC_FID: result.recordset[i].TPU_FID_Picture
      },
      TFF_FDelete: 0,
      isnew: false
    })
    }
  }
  return items
}
  async return_pageSaleItems(TFF_FID_Form, FID_ParentFormField) {
    var items = []
    const result = await this.Database.request().query(`
    SELECT * FROM [dbo].[TFormField] WHERE [TFF_FID_Form] = ${TFF_FID_Form} AND [TFF_FID_ParentFormField] = ${FID_ParentFormField} AND [TFF_FDelete] = 0 
  `)
  if (result.recordset.length > 0) {
    for (var i = 0; i <= result.recordset.length - 1; i++) {
      items.push({ TFF_FID: result.recordset[i].TFF_FID,id: result.recordset[i].TFF_FDefault, title: result.recordset[i].TFF_FLable,
        image: result.recordset[i].TFF_FComment ,link: result.recordset[i].TFF_FToolTip, TFF_FDelete: result.recordset[i].TFF_FDelete })
    }
  }
  return items
  }

  async return_radioitems(TFF_FID_Form, FID_ParentFormField) {

    var items = []

    // var result = await this.getForm("TFormFieldList", TFF_FID_Form, FID_ParentFormField);
    const result = await this.Database.request().query(`
      SELECT * FROM [dbo].[TFormField] WHERE [TFF_FID_Form] = ${TFF_FID_Form} AND [TFF_FID_ParentFormField] = ${FID_ParentFormField} AND [TFF_FDelete] = 0 
    `)

    if (result.recordset.length > 0) {
      for (var i = 0; i <= result.recordset.length - 1; i++) {
        items.push({ TFF_FID: result.recordset[i].TFF_FID, title: result.recordset[i].TFF_FLable, value: result.recordset[i].TFF_FDefault ,TFF_FDelete: result.recordset[i].TFF_FDelete })
      }
    }
    return items
  }
  async return_selectitems(TFF_FID_Form, FID_ParentFormField) {

    var items = []

    // var result = await this.getForm("TFormFieldList", TFF_FID_Form, FID_ParentFormField);
    const result = await this.Database.request().query(`
      SELECT * FROM [dbo].[TFormField] WHERE [TFF_FID_Form] = ${TFF_FID_Form} AND [TFF_FID_ParentFormField] = ${FID_ParentFormField} AND [TFF_FDelete] = 0
    `)
    if (result.recordset.length > 0) {
      for (var i = 0; i <= result.recordset.length - 1; i++) {
        items.push({ TFF_FID: result.recordset[i].TFF_FID, name: result.recordset[i].TFF_FLable, TFF_FDelete: result.recordset[i].TFF_FDelete })
      }
    }
    return items
  }

  async getFormData(state: string, user, formId, productRowId) {
    try {
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("FID", this.sql.Int, formId)
        .input("User", this.sql.Int, user)
        .input("FLinkID", this.sql.Int, productRowId)
        .execute("USP_TForm_Select");


      return result.recordset;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


  async insertAndUpdateData(state, data, orderID) {
    try {
      let RetID;
      let RetMsg;
      let ReturnFID;
      if (state == "Insert") {
        const result = await this.Database.request()
          .input("State", this.sql.NVarChar, state)
          .input("TFD_FID_Form", this.sql.Int, data.formID)
          .input("TFD_FID_FormField", this.sql.Int, data.fieldID)
          .input("TFD_FID_Picture", this.sql.Int, data.picId)
          .input("TFD_FData", this.sql.NVarChar, data.TFF_FDefault)
          .input("TFD_FUserReg", this.sql.Int, data.userReg)
          .input("TFD_FDateReg", this.sql.NVarChar, data.dateReg)
          .input("TFD_FTimeReg", this.sql.NVarChar, data.timeReg)
          // .input("TFD_FID_Link", this.sql.BigInt, data.FID_Link)
          // .input("TFD_FID_TypeLink", this.sql.Int, null)
          .input("TFD_FDelete", this.sql.TinyInt, 0)
          .input("TFD_FID_OrderDetail", this.sql.Int, orderID)
          .output("RetID", this.sql.BigInt, RetID)
          .output("RetMsg", this.sql.NVarChar, RetMsg) 
          .output("ReturnFID", this.sql.BigInt, ReturnFID)
          .execute("USP_TFormData_Ins");
        return result;
      } else if (state == "Update") {
        const result = await this.Database.request()
          .input("State", this.sql.NVarChar, state)
          .input("TFD_FID", this.sql.Int, data.FID)
          .input("TFD_FID_Form", this.sql.Int, data.formID)
          .input("TFD_FID_FormField", this.sql.Int, data.fieldID)
          .input("TFD_FID_Picture", this.sql.Int, data.picId)
          .input("TFD_FData", this.sql.NVarChar, data.data)
          .input("TFD_FUserReg", this.sql.Int, data.userReg)
          .input("TFD_FDateReg", this.sql.NVarChar, data.dateReg)
          .input("TFD_FTimeReg", this.sql.NVarChar, data.timeReg)
          // .input("TFD_FID_Link", this.sql.BigInt, data.FID_Link)
          // .input("TFD_FID_TypeLink", this.sql.Int, null)
          .input("TFD_FDelete", this.sql.TinyInt, 0)
          .input("TFD_FID_OrderDetail", this.sql.Int, orderID)
          .output("RetID", this.sql.BigInt, RetID)
          .output("RetMsg", this.sql.NVarChar, RetMsg)
          .output("ReturnFID", this.sql.BigInt, ReturnFID)
          .execute("USP_TFormData_Ins");
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }




  async delete(id, user) {
    try {
      let RetID = "0";
      let RetMsg = "0";
      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, "TForm")
        .input("FID", this.sql.Int, id)
        .input("User", this.sql.BigInt, user)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TForm_Del");


      return result;
    } catch (error) {
      console.log(error)
    }

  }

  async updateTabState(state, tabState, productId) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("State", this.sql.NVarChar, state)
        .input("TOD_FID", this.sql.BigInt, productId)
        .input("TOD_FCoupon", this.sql.NVarChar, tabState)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TOrderDetailTemp_Ins");
      return result;
    } catch (error) {
      console.log(error)
    }

  }

  async getByLink(link){
    try{ 
      const data = {
        form: {},
        fields: {}
      }
      const result = await this.Database.request().query(`SELECT * FROM [dbo].[V_TForm] WHERE [TF_FLink] = '${link}'`)
      if(result){
        data.form = result.recordset[0]
        const id = result.recordset[0].TF_FID
        if(id){
          const ress = await this.Database.request().query(`SELECT * FROM [dbo].[V_TFormField] WHERE [TFF_FID_Form] = ${id}`)
          if(ress){
            data.fields = ress.recordset
          }
        }
        return data;
      }
    } catch(error){
      console.log(error)
    }
  }

  async deleteFormData(tableName, formId, productId) {
    try {
      let RetID;
      let RetMsg;
      const result = await this.Database.request()
        .input("TableName", this.sql.NVarChar, tableName)
        .input("FID", this.sql.BigInt, formId)
        .input("FLinkID", this.sql.BigInt, productId)
        .output("RetID", this.sql.BigInt, RetID)
        .output("RetMsg", this.sql.NVarChar, RetMsg)
        .execute("USP_TForm_Del");
      return result;
    } catch (error) {
      console.log(error)
    }

  }

  async getField(id){
    try{
      const result = await this.Database.request().query(`SELECT * FROM [dbo].[TFormField] WHERE [TFF_FID] = ${id}`)
      if(result.recordset.length > 0){
        return result.recordset[0]
      }
    } catch(error){
      console.log(error)
    }
  }

  async getFormLink(id){
    try{
      const result = await this.Database.request().query(`SELECT * FROM [dbo].[TFormField] WHERE [TFF_FID] = ${id}`)
      if(result.recordset.length > 0){
        const form = await this.Database.request().query(`SELECT * FROM [dbo].[TForm] WHERE [TF_FID] = ${result.recordset[0].TFF_FID_Form}`)
        if(form.recordset.length > 0){
          return form.recordset[0]
        }
      }
    } catch(error){
      console.log(error)
    }
  }
  async getResult(id, userID, orderID){
    try{
      const result = await this.Database.request().query(`SELECT * FROM [dbo].[V_TFormData] WHERE [TFD_FID_Form] = ${id} AND [TFD_FUserReg] = ${userID} AND [TFD_FID_OrderDetail] = ${orderID}`)
      let data = result.recordset
      if(data.length > 0){
        for(var i=0; i < data.length; i++){
          if(data[i].TFF_FID_TypeField == 11109 || data.TFF_FID_TypeField == 11125){
            const ress = await this.Database.request().query(`SELECT * FROM [dbo].[V_TPictureUse] WHERE [TPU_FID_State] = 2400203 AND [TPU_FID_Parent] = ${data[i].TFD_FID}`)
              if(ress.recordset.length > 0){
                data[i].pic = ress.recordset[0]
              }
          }
        }
      }
      return data
    } catch(error){
      console.log(error)
    }
  }
}

export default new FormBuilderModel();
