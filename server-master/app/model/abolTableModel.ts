import { table } from "console";
import { Request } from "express";
import Model from "./Model";
import DefaultModel from "../model/defaultModel";

class abolTableModel extends Model {
  constructor() {
    super();
  }

  async getTables() {
    var sqlQuery = `
        select * from [V_TDefault]
                where [TD_FID_Group]=112 `;

    const db_result = await this.Database.request().query(sqlQuery);

    if (db_result.recordsets[0].length > 0) {
      return db_result.recordsets[0];
    }

    return null;
  }

  async getInit() {
    try {
      return await DefaultModel.getTableSchema("TAbolTable");
    } catch (err) {
      console.log(err);
    }
  }

  async get(FLang: string, FID_Table: number, user: number) {
    var sqlQuery = `
        select * from [V_TAbolTable]
                where [TABL_FLang]='${FLang}' 
                and [TABL_FID_Table]=${FID_Table} 
                and ([TABL_FID_User]= ${user} OR [TABL_FID_User] IS NULL)
        `;

    const db_result = await this.Database.request().query(sqlQuery);

    if (db_result.recordsets[0].length > 0) {
      return db_result.recordsets[0];
    }

    return null;
  }

  async getColumns(FLang: string, FID_Table: number) {
    var sqlQuery = `
        select * from [V_TAbolTable]
                where [TABL_FLang]='${FLang}' 
                and [TABL_FID_Table]=${FID_Table} 
                and [TABL_FID_User] IS NULL
        `;

    const db_result = await this.Database.request().query(sqlQuery);

    if (db_result.recordsets[0].length > 0) {
      return db_result.recordsets[0];
    }

    return null;
  }

  returnSql(data, tableID, FLang, userID) {
    return `
        UPDATE [dbo].[TAbolTable] 
            SET [TABL_FLang] = '${data.TABL_FLang}', [TABL_FFieldName] = N'${data.TABL_FFieldName}',
            [TABL_FFieldTitle] = N'${data.TABL_FFieldTitle}', [TABL_FFiltrable] = ${data.TABL_FFiltrable}, [TABL_FSortable] = ${data.TABL_FSortable} ,
            [TABL_FDefaultWidth] = ${data.TABL_FDefaultWidth}, [TABL_FOrder] = ${data.TABL_FOrder}, [TABL_FID_Table] = ${data.TABL_FID_Table} , 
            [TABL_FDefault] = ${data.TABL_FDefault},  [TABL_FID_FieldType] = ${data.TABL_FID_FieldType}, 
             [TABL_FID_RelatedDefault] = ${data.TABL_FID_RelatedDefault}, [TABL_FID_User]= ${userID}
            WHERE  [TABL_FLang]='${FLang}' and [TABL_FID_Table]=${tableID} and [TABL_FFieldName]='${data.TABL_FFieldName}' and [TABL_FID_User]= ${userID}
        
        IF @@ROWCOUNT = 0
        
        INSERT INTO [dbo].[TAbolTable]
            ([TABL_FLang], [TABL_FFieldName], [TABL_FFieldTitle],
            [TABL_FFiltrable], [TABL_FSortable], [TABL_FDefaultWidth], [TABL_FOrder], [TABL_FID_Table], [TABL_FDefault], 
            [TABL_FID_FieldType], [TABL_FID_RelatedDefault], [TABL_FID_User]) 
        VALUES
            ('${data.TABL_FLang}', N'${data.TABL_FFieldName}', N'${data.TABL_FFieldTitle}', ${data.TABL_FFiltrable},
                ${data.TABL_FSortable},  ${data.TABL_FDefaultWidth}, ${data.TABL_FOrder}, ${data.TABL_FID_Table},
                ${data.TABL_FDefault}, ${data.TABL_FID_FieldType}, ${data.TABL_FID_RelatedDefault} , 
                ${userID})
            `;
  }

  async save(FLang: string, data, userID) {
    try {
      var error_result = {
        output: {
          status: 422,
          error: true,
          RetMsg: "عملیات با خطا مواجه شد",
        },
      };

      var tableID = data[0].TABL_FID_Table;

      var sqlQuery = "";
      for (var i = 0; i <= data.length - 1; i++) {
        sqlQuery += this.returnSql(data[i], tableID, "fa", userID);
      }

      const saveResult = await this.Database.request().query(sqlQuery);
      if (saveResult) {
        var obj = {
          output: {
            RetID: 1,
            RetMsg: "ذخیره جدول با موفقیت انجام شد",
          },
        };

        return obj;
      } else {
        return error_result;
      }
    } catch (error) {
      return error_result;
    }
  }

  async addColumn(data) {
    try {
      var error_result = {
        output: {
          status: 422,
          error: true,
          RetMsg: "عملیات با خطا مواجه شد",
        },
      };

      var sqlQuery = `
      INSERT INTO [dbo].[TAbolTable]
            ([TABL_FLang], [TABL_FFieldName], [TABL_FFieldTitle],
            [TABL_FFiltrable], [TABL_FSortable], [TABL_FDefaultWidth], [TABL_FOrder], [TABL_FID_Table], [TABL_FDefault], 
            [TABL_FID_FieldType], [TABL_FID_RelatedDefault],[TABL_FUrlPattern],[TABL_FIcon]) 
        VALUES
            ('fa', N'${data.TABL_FFieldName}', N'${data.TABL_FFieldTitle}', ${
        data.TABL_FFiltrable
      },
                ${data.TABL_FSortable},  ${data.TABL_FDefaultWidth}, ${
        data.TABL_FOrder
      }, ${data.TABL_FID_Table},
                ${data.TABL_FDefault}, ${data.TABL_FID_FieldType}, ${
        data.TABL_FID_RelatedDefault ? data.TABL_FID_RelatedDefault : "NULL"
      },N'${data.TABL_FUrlPattern ? data.TABL_FUrlPattern : ""}'
      ,'${data.TABL_FIcon ? data.TABL_FIcon : ""}')
      `;

      const saveResult = await this.Database.request().query(sqlQuery);
      if (saveResult) {
        var obj = {
          output: {
            RetID: 1,
            RetMsg: "با موفقیت افزوده شد",
          },
        };

        return obj;
      } else {
        return error_result;
      }
    } catch (error) {
      console.log(error);

      return error_result;
    }
  }

  async saveColumn(data) {
    try {
      var error_result = {
        output: {
          status: 422,
          error: true,
          RetMsg: "عملیات با خطا مواجه شد",
        },
      };

      var sqlQuery = `
      UPDATE [dbo].[TAbolTable] 
            SET [TABL_FFieldName] = N'${data.TABL_FFieldName}',
            [TABL_FFieldTitle] = N'${
              data.TABL_FFieldTitle
            }', [TABL_FFiltrable] = ${data.TABL_FFiltrable}, 
            [TABL_FSortable] = ${data.TABL_FSortable} ,
            [TABL_FDefaultWidth] = ${
              data.TABL_FDefaultWidth
            }, [TABL_FOrder] = ${data.TABL_FOrder}, 
            [TABL_FDefault] = ${data.TABL_FDefault},  [TABL_FID_FieldType] = ${
        data.TABL_FID_FieldType
      }, 
            [TABL_FID_RelatedDefault] = ${
              data.TABL_FID_RelatedDefault
                ? data.TABL_FID_RelatedDefault
                : "NULL"
            },
            [TABL_FUrlPattern]=N'${
              data.TABL_FUrlPattern ? data.TABL_FUrlPattern : ""
            }',
            [TABL_FIcon]='${data.TABL_FIcon ? data.TABL_FIcon : ""}'
            WHERE  [TABL_FID]='${data.TABL_FID}'
            `;

      const saveResult = await this.Database.request().query(sqlQuery);

      if (saveResult) {
        var obj = {
          output: {
            RetID: 1,
            RetMsg: "با موفقیت انجام شد",
          },
        };

        return obj;
      } else {
        return error_result;
      }
    } catch (error) {
      console.log(error);

      return error_result;
    }
  }

  async deleteColumn(id) {
    try {
      var error_result = {
        output: {
          status: 422,
          error: true,
          RetMsg: "عملیات با خطا مواجه شد",
        },
      };

      var sqlQuery = ` delete from TAbolTable where TABL_FID=${id}`;

      const saveResult = await this.Database.request().query(sqlQuery);
      if (saveResult) {
        var obj = {
          output: {
            RetID: 1,
            RetMsg: "با موفقیت حذف شد",
          },
        };

        return obj;
      } else {
        return error_result;
      }
    } catch (error) {
      return error_result;
    }
  }

  async deleteUserSetting(tableId) {
    try {
      var error_result = {
        output: {
          status: 422,
          error: true,
          RetMsg: "عملیات با خطا مواجه شد",
        },
      };

      var sqlQuery = ` delete from TAbolTable where (TABL_FID_User is not NULL) and (TABL_FID_Table=${tableId})`;

      const saveResult = await this.Database.request().query(sqlQuery);
      if (saveResult) {
        var obj = {
          output: {
            RetID: 1,
            RetMsg: "با موفقیت حذف شد",
          },
        };

        return obj;
      } else {
        return error_result;
      }
    } catch (error) {
      return error_result;
    }
  }
}

export default new abolTableModel();
