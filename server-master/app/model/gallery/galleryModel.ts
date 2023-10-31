import Model from "../Model";
import File from "../../helper/file";
import path from "path";
import * as ftp from "basic-ftp";
import fs from "fs";

class galleryModel extends Model {
  constructor() {
    super();
  }
  async getAdmin() {
    try {
      let data = {
        images: [],
        folders: [],
        address: "",
      };
      const query = `SELECT * FROM [dbo].[V_TPicture] WHERE [TPIC_FDelete] = 0 AND [TPIC_FID_Folder] IS NULL AND [TPIC_FUserOwner] IS NULL`;
      const result = await this.Database.request().query(query);
      data.images = result.recordset;
      const fquery = `SELECT * FROM [dbo].[V_TPictureFolder] WHERE [TPF_FID_Parent] IS NULL AND [TPF_FName] <> '' AND [TPF_FID_User] IS NULL`;
      const folds = await this.Database.request().query(fquery);
      data.folders = folds.recordset;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getByUser(userID){
    try {
      let data = {
        images: [],
        folders: [],
        folderSize: "",
        capacity: ''
      };
      const query = `SELECT * FROM [dbo].[V_TPicture] WHERE [TPIC_FDelete] = 0 AND [TPIC_FID_Folder] IS NULL AND [TPIC_FUserOwner] = ${userID}`;
      const result = await this.Database.request().query(query);
      data.images = result.recordset;
      const fquery = `SELECT * FROM [dbo].[V_TPictureFolder] WHERE [TPF_FID_Parent] IS NULL AND [TPF_FName] <> '' AND [TPF_FID_User] = ${userID}`;
      const folds = await this.Database.request().query(fquery);
      data.folders = folds.recordset;
      const cap = await this.Database.request().query(`select [TU_Quota], [TU_FolderSize] from [V_TUser] where [TU_FID] = ${userID}`)
      if(cap.recordset){
        data.folderSize = cap.recordset[0].TU_FolderSize
        data.capacity = cap.recordset[0].TU_Quota
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getByUserAndID(userID, id){
    try {
      let data = {
        images: [],
        folders: [],
        folderSize: "",
        capacity: ''
      };
      const imgQuery = `SELECT * FROM [dbo].[V_TPicture] WHERE [TPIC_FID_FOLDER] = ${id} AND [TPIC_FDelete] = 0 AND [TPIC_FUserReg] = ${userID}`;
      const imgres = await this.Database.request().query(imgQuery);
      data.images = imgres.recordset;
      const folderQuery = `SELECT * FROM [dbo].[V_TPictureFolder] WHERE [TPF_FID_Parent] = ${id} AND [TPF_FName] <> '' AND [TPF_FID_UserReg] = ${userID}`;
      const fldres = await this.Database.request().query(folderQuery);
      data.folders = fldres.recordset;
      const cap = await this.Database.request().query(`select [TU_Quota], [TU_FolderSize] from [V_TUser] where [TU_FID] = ${userID}`)
      if(cap.recordset){
        data.folderSize = cap.recordset[0].TU_FolderSize
        data.capacity = cap.recordset[0].TU_Quota
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getByID(id) {
    try {
      let data = {
        images: [],
        folders: [],
        parent: {}
      };
      const imgQuery = `SELECT * FROM [dbo].[V_TPicture] WHERE [TPIC_FID_FOLDER] = ${id} AND [TPIC_FDelete] = 0`;
      const imgres = await this.Database.request().query(imgQuery);
      data.images = imgres.recordset;
      const folderQuery = `SELECT * FROM [dbo].[V_TPictureFolder] WHERE [TPF_FID_Parent] = ${id} AND [TPF_FName] <> ''`;
      const fldres = await this.Database.request().query(folderQuery);
      data.folders = fldres.recordset;
      const parent = await this.Database.request().query(`select * from [dbo].[V_TPictureFolder] where [TPF_FID] = ${id}`)
      data.parent = parent.recordset[0]
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserFolders(userID) {
    try {
      const getfQ = `SELECT * FROM [dbo].[V_TPictureFolder] WHERE [TPF_FID_User] = ${userID} AND [TPF_FName] <> ''`;
      const res = await this.Database.request().query(getfQ);
      return res.recordset;
    } catch (error) {
      console.log(error);
    }
  }
  async getFolders() {
    try {
      const getfQ = `SELECT * FROM [dbo].[V_TPictureFolder] WHERE [TPF_FName] <> ''`;
      const res = await this.Database.request().query(getfQ);
      return res.recordset;
    } catch (error) {
      console.log(error);
    }
  }
   async getAllUserImages(userID){
    try{
      const query = `SELECT * FROM [dbo].[V_TPicture] WHERE [TPIC_FUserReg] = ${userID}`
      const res = await this.Database.request().query(query)
      return res.recordset;
    } catch(error){
      console.log(error)
    }
  }

  async getAllImages(){
    try{
      const query = 'SELECT * FROM [dbo].[V_TPicture]'
      const res = await this.Database.request().query(query)
      return res.recordset;
    } catch(error){
      console.log(error)
    }
  }
  async getPictureUse(id){
    try{  
      const result = await this.Database.request().query(`SELECT * FROM [dbo].[V_TPictureUse] WHERE [TPU_FID_Picture] = ${id}`)
      if(result){
        return result.recordset;
      }
    } catch(err){
      console.log(err)
    }
  }
  async update(data) {
    try {
      // console.log('data', data)
      // data = this.checkName(data)
      // let dupl;
      // if (data.TPIC_FID_Folder) {
      //   dupl = await this.Database.request().query(
      //     `SELECT * FROM [dbo].[TPicture] WHERE [TPIC_FID_Folder] = ${data.TPIC_FID_Folder}`
      //   );
      // } else {
      //   dupl = await this.Database.request().query(
      //     `SELECT * FROM [dbo].[TPicture] WHERE [TPIC_FID_Folder] IS NULL`
      //   );
      // }
      // const items = dupl.recordset;
      // console.log("items", items);
      // if (items.length > 0) {
      //   // console.log("item", items[0]);
      //   // data.TPIC_FName = `${items[0].TPIC_FName.split(".")[0]}-${
      //   //   items.length
      //   // }.${items[0].TPIC_FType}`; 
      //   data.TPIC_FName = this.returnFileName(
      //     data.TPIC_FName,
      //     data.TPIC_FType,
      //     items
      //   );
      //   data.TPIC_FAddress = this.renameFile(
      //     data.TPIC_FAddress,
      //     data.TPIC_FName
      //   );
      // } else {
      //   data.TPIC_FAddress = this.renameFile(
      //     data.TPIC_FAddress,
      //     data.TPIC_FName
      //   );
      // }
      let query;
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "تغییرات با موفقیت انجام شد",
        },
      };
      var error_result = {
        output: {
          status: 422,
          error: true,
          RetMsg: "عملیات با خطا مواجه شد",
        },
      };
      // console.log('data', data)
      if (data.destination) {
        query = `UPDATE [dbo].[TPicture] SET [TPIC_FShowName] = N'${data.TPIC_FShowName}',[TPIC_FComment] = N'${data.TPIC_FComment}',  [TPIC_FAddress] = N'${data.TPIC_FAddress}', [TPIC_FID_Folder] = ${data.destination.TPF_FID} WHERE [TPIC_FID] = ${data.TPIC_FID}`;
      } else {
        query = `UPDATE [dbo].[TPicture] SET [TPIC_FShowName] = N'${data.TPIC_FShowName}',[TPIC_FComment] = N'${data.TPIC_FComment}', [TPIC_FAddress] = N'${data.TPIC_FAddress}' WHERE [TPIC_FID] = ${data.TPIC_FID}`;
      }
      // console.log('query', query)
      const res = await this.Database.request().query(query);
      if (res) {
        return obj;
      } else {
        return error_result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  returnFileName(newName, FType, fileList) {
    const check = fileList.find((f) => f.TPIC_FName == newName);
    if (!check) return newName;

    const changedName = `${newName.split(".")[0]}-(2).${FType}`;
    return this.returnFileName(changedName, FType, fileList);
  }

  renameFile(address, name) {
    const date = Date.now().toString();
    const newAddress = address.replace(
      path.basename(address),
      date + "-" + name
    );
    const newThAddress = address.replace(
      path.basename(address),
      "sm-" + date + "-" + name
    );
    const thAddress = address.replace(
      path.basename(address),
      "sm-" + path.basename(address)
    );
    // console.log("new Address", newAddress);
    fs.rename(address, newAddress, (err) => {
      if (err) {
        throw err;
      }
    });
    // console.log("newTHaddress", newThAddress);
    fs.rename(thAddress, newThAddress, (err) => {
      if (err) {
        throw err;
      }
    });
    return newAddress;
  }
  async delete(data) {
    try {
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "حذف با موفقیت انجام شد",
        },
      };
      var error_result = {
        output: {
          status: 422,
          error: true,
          RetMsg: "عملیات با خطا مواجه شد",
        },
      };
      let query = "";

      for(var i=0; i < data.length; i++){
        if(data[i].TPF_FID){

          query += `DELETE FROM [dbo].[TPictureFolder] WHERE [TPF_FID] = ${data[i].TPF_FID}
          
          UPDATE [dbo].[TPicture] SET [TPIC_FID_Folder] = NULL WHERE [TPIC_FID_Folder] = ${data[i].TPF_FID}
          `
        } else {
          query += `DELETE FROM [dbo].[TPicture] WHERE [TPIC_FID] = ${data[i].TPIC_FID} 
             
          `;

          const address = data[i].TPIC_FAddress;
          const name = path.basename(address);
          const thName = "sm-" + name;
          const thPath = address.replace(name, thName);
          File.removeImage(data[i].TPIC_FAddress);
          File.removeImage(thPath);
        }
      }

      const res = await this.Database.request().query(query);
      if (res) {
        return obj;
      } else {
        return error_result;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async insertFolder(data, userID, date, time, mode) {
    try {
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "ایجاد پوشه با موفقیت انجام شد",
        },
      };
      let parentHostID;
      if(data.parentId){
        const parentHost = await this.Database.request().query(`SELECT [TPF_FID_Host] FROM [dbo].[TPictureFolder] WHERE [TPF_FID] = ${data.parentId}`)
        if(parentHost){
          parentHostID = parentHost.recordset[0].TPF_FID_Host
        }
      } else {
        parentHostID = data.host
      }
     var  query = `INSERT INTO [dbo].[TPictureFolder] ([TPF_FName], [TPF_FID_Parent], [TPF_FID_UserReg], [TPF_FDateReg], [TPF_FTimeReg], [TPF_FID_User], [TPF_Quota], [TPF_FID_Host]) 
        VALUES
        (N'${data.name}' , ${data.parentId}, ${userID}, '${date}', '${time}', ${mode ? userID : null } , ${data.capacity.length > 0 ? data.capacity : null}, ${parentHostID? parentHostID: null})`
  
      const res = await this.Database.request().query(query);
      if (res) {
        return obj;
      }
    } catch (error) {
      console.log(error);
    }
  }


  async moveToFolder(img, id) {
    try {
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "انتقال با موفقیت انجام شد",
        },
      };
      let moveQuery = '';
      if(img.length > 0){
        for(var i=0; i < img.length; i++){
          moveQuery += `UPDATE [dbo].[TPicture] SET [TPIC_FID_Folder] = ${id} WHERE [TPIC_FID] = ${img[i].TPIC_FID}`
        }
      }
      else {
         moveQuery = `UPDATE [dbo].[TPicture] SET [TPIC_FID_Folder] = ${id} WHERE [TPIC_FID] = ${img.TPIC_FID}`;

      }
      const res = await this.Database.request().query(moveQuery);
      if (res) {
        return obj;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async upload(files, method, folderID, userID, date, ownerID) {
    try {
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "آپلود با موفقیت انجام شد",
        },
      };
      const firstIdQuery = " select DBO.UFN_Coding('TPicture_FID',0) ";
      const res = await this.Database.request().query(firstIdQuery);
      let firstId = res.recordset[0][""];
        // console.log("firstId", firstId);
        let query = "";
        for (var i = 0; i < files.length; i++) {
          var type = files[i].originalName.split(".")[1]
          query += `
            INSERT INTO [dbo].[TPicture] ([TPIC_FID], [TPIC_FID_Parent], [TPIC_FForm], [TPIC_FAddress], [TPIC_FName], [TPIC_FType], [TPIC_FUserOwner], [TPIC_FUserReg], [TPIC_FDateReg], [TPIC_FActive], [TPIC_FDelete], [TPIC_FID_Folder],
              [TPIC_FFileSize], [TPIC_FShowName], [TPIC_FWidth], [TPIC_FHeight], [TPIC_FResolution], [TPIC_FColorMode]
              ) 
            VALUES
            (${firstId}, 0 , '', N'http://${files[i].destination}/${files[i].fileName}', N'${files[i].fileName}', '${type}', ${ownerID ? ownerID : null} , ${userID}, '${date}', 1, 0, ${folderID? folderID : null}, ${files[i].size},
             N'${files[i].originalName}', ${files[i].width ? files[i].width : null},
              ${files[i].height ? files[i].height : null}, ${files[i].resolution ? files[i].resolution: null}, '${files[i].colorMode ? files[i].colorMode : null }'
            )

            `;
          firstId++;
        }
        // console.log('query',  query)
        const result = await this.Database.request().query(query);
        if (result) {
          return obj;
        }
    } catch (error) {
      console.log(error);
    }
  }

  async ftpConnect(path, name) {
    try {
      const client = new ftp.Client();
      client.ftp.verbose = true;
      await client.access({
        host: "upload.chapex.ir",
        port: 21,
        user: `upload@upload.chapex.ir`,
        password: `tJX5qqQXd726nNa9`,
        // secure: true,
      });
      // console.log(await client.list());
      await client.uploadFrom(`${path}`, `${name}`);
      // console.log(await client.downloadTo("first_COPY.jpeg", "first.jpeg"))
      client.close();
    } catch (error) {
      console.log(error);
    }
  }

  async updateFolder(folderData){
    try{
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "ویرایش با موفقیت انجام شد",
        },
      };
      const query = `UPDATE [dbo].[TPictureFolder] SET 
      [TPF_FName] = N'${folderData.TPF_FName}',
      [TPF_FID_Parent] = ${folderData.TPF_FID_Parent},
      [TPF_FID_UserReg] = ${folderData.TPF_FID_UserReg},
      [TPF_FDateReg] = '${folderData.TPF_FDateReg}',
      [TPF_FTimeReg] = '${folderData.TPF_FTimeReg}',
      [TPF_FID_User] = ${folderData.TPF_FID_User},
      [TPF_Quota] = ${folderData.TPF_Quota},
      [TPF_FID_Host] = ${folderData.TPF_FID_Host}
      WHERE [TPF_FID] = ${folderData.TPF_FID}
      `
      const result = await this.Database.request().query(query)
      if(result){
        return(obj)
      }
    } catch(error){
      console.log(error)
    }
  }
  async externalSave(data, userID,  date){
    try{
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "ذخیره فایل با موفقیت انجام شد",
        },
      };
      const firstIdQuery = " select DBO.UFN_Coding('TPicture_FID',0) ";
      const res = await this.Database.request().query(firstIdQuery);
      let firstId = res.recordset[0][""];
      var query = `INSERT INTO [dbo].[TPicture] ([TPIC_FID], [TPIC_FAddress], [TPIC_FComment], [TPIC_FUserReg], [TPIC_FDateReg], [TPIC_FActive], [TPIC_FDelete], [TPIC_FID_Folder],
         [TPIC_FShowName])
        VALUES
        (${firstId}, N'${data.link}', N'${data.alt}', ${userID}, '${date}', 1, 0, ${data.folderID ? data.folderID : null}, N'${data.name}')
      `
      const result = await this.Database.request().query(query)
      if(result){
        return obj;
      }
    } catch(error){
      console.log(error)
    }
  }
  async useSave(file, state, parentID, index) {
    try {
      var obj = {
        output: {
            ReturnFID: 1,
            RetMsg: "ذخیره فایل با موفقیت انجام شد",
        },
    }
      const result = await this.Database.request().query(`INSERT INTO [dbo].[TPictureUse] ([TPU_FID_State], [TPU_FID_Parent], [TPU_FID_Picture], [TPU_FOrder])
        VALUES
        (${state}, ${parentID}, ${file.TPIC_FID}, ${index})
      `)
      if(result){
        return obj; 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async useDelete(id){
    try{
      const result = await this.Database.request().query(`DELETE FROM [dbo].[TPictureUse] WHERE [TPU_FID] = ${id}`)
    } catch(error){
      console.log(error)
    }
  }
  async moveFiles(files, dest){
    try{
      var obj = {
        output: {
            ReturnFID: 1,
            RetMsg: "انتقال فایل با موفقیت انجام شد",
        },
    }
      let query = ''
      for(var i=0; i < files.length; i++){
        query += `UPDATE [dbo].[TPicture] SET [TPIC_FID_Folder] = ${dest} WHERE [TPIC_FID] = ${files[i].TPIC_FID}

        `
      }
      const result = await this.Database.request().query(query)
      if(result){
        return obj;
      }
    } catch(error){
      console.log(error)
    }
  }

  async getUsersFolders(){
    try{  
      const result = await this.Database.request().query(`select distinct(TPIC_FUserOwner),(TPIC_FUserOwnerName) from [V_TPicture] where [TPIC_FUserOwner] IS NOT NULL
      group by [TPIC_FUserOwner],[TPIC_FUserOwnerName]`)
      if(result){
           if(result.recordset.length > 0){
        for(var i=0; i < result.recordset.length; i++){
          var capacity = await this.Database.request().query(`select [TU_Quota], [TU_FolderSize] from [dbo].[V_TUser] where [TU_FID] = ${result.recordset[i].TPIC_FUserOwner}`)
          result.recordset[i].capacity = capacity.recordset[0].TU_Quota
          result.recordset[i].folderSize = capacity.recordset[0].TU_FolderSize
        }
      }
        return result.recordset
      }
    } catch(error){
      console.log(error)
    }
  }

  async getUsersGallery(){
    try{  
      let data = {
        images: [],
        folders: [],
      };
      const folds = await this.Database.request().query(`select distinct(TPIC_FUserOwner),(TPIC_FUserOwnerName) from [V_TPicture] where [TPIC_FUserOwner] IS NOT NULL
      group by [TPIC_FUserOwner],[TPIC_FUserOwnerName]`)
      if(folds){
        data.folders = folds.recordset;
      }
      if(data.folders.length > 0){
        for(var i=0; i < data.folders.length; i++){
          var capacity = await this.Database.request().query(`select [TU_Quota], [TU_FolderSize] from [dbo].[V_TUser] where [TU_FID] = ${data.folders[i].TPIC_FUserOwner}`)
          data.folders[i].capacity = capacity.recordset[0].TU_Quota
          data.folders[i].folderSize = capacity.recordset[0].TU_FolderSize
        }
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getUsersGalleryByID(id){
    let data = {
      images: [],
      folders: [],
    };
    const imgQuery = `SELECT * FROM [dbo].[V_TPicture] WHERE [TPIC_FUserOwner] = ${id} AND [TPIC_FDelete] = 0`;
    const imgres = await this.Database.request().query(imgQuery);
    data.images = imgres.recordset;
    const folderQuery = `SELECT * FROM [dbo].[V_TPictureFolder] WHERE [TPF_FID_User] = ${id}`;
    const fldres = await this.Database.request().query(folderQuery);
    data.folders = fldres.recordset;
    return data;
  }

  async updateUserFolder(data){
    try{
      var obj = {
        output: {
          RetID: 1,
          RetMsg: "ویرایش با موفقیت انجام شد",
        },
      };
      const result = await this.Database.request().query(`update [dbo].[TUser] set [TU_Quota] = ${data.capacity} where [TU_FID] = ${data.TPIC_FUserOwner}`)
      if(result){
        return obj;
      }
    } catch(error){
      console.log(error)
    }
  }
}

export default new galleryModel();
