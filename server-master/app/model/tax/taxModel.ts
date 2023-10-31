import Model from "../Model";

class taxModel extends Model {
    constructor() {
        super()
    }
    async insert(data, userID) {
        try {
            var error_result = {
                output: {
                    status: 422,
                    error: true,
                    RetMsg: "عملیات با خطا مواجه شد",
                }
            }
            var obj = {
                output: {
                    RetID: 1,
                    RetMsg: "ذخیره با موفقیت انجام شد",
                },
            }
            const insQuery = `INSERT INTO [dbo].[TUserTaxInfo] ([TUX_FType], [TUX_FID_User], [TUX_FName],
                 [TUX_FMelli], [TUX_FShenas], [TUX_FEcoCode], [TUX_FAddress], [TUX_FTel], [TUX_FID_Address])
                 VALUES (
                    ${data.TUX_FType}, 
                    ${userID}, 
                    N'${data.TUX_FName || ''}', 
                    '${data.TUX_FMelli || ''}', 
                    '${data.TUX_FShenas || ''}', 
                    '${data.TUX_FEcoCode || ''}', 
                    N'${data.TUX_FAddress || ''}', 
                    '${data.TUX_FTel || ''}', 
                    ${data.TUX_FID_Address}
                    )`
            const res = await this.Database.request().query(insQuery)
            // console.log(res);
            
            if (res) {
                return obj
            }
        } catch {
            return error_result;
        }
    }
    async get(userID) {
        try {
            const getQuery = `SELECT * FROM [dbo].[TUserTaxInfo] WHERE [TUX_FID_User] = ${userID}`
            const res = await this.Database.request().query(getQuery)
            if (res) {
                return res.recordset
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(rowId) {
        try {
            const getQuery = `SELECT * FROM [dbo].[TUserTaxInfo] WHERE [TUX_FID] = ${rowId}`
            const res = await this.Database.request().query(getQuery)

            if (res) {
                if (res.recordset.length == 1)
                    return res.recordset[0]
            }
        } catch (error) {
            console.log(error)
        }
    }

    async update(data, userID) {
        try {
            var error_result = {
                output: {
                    status: 422,
                    error: true,
                    RetMsg: "عملیات با خطا مواجه شد",
                }
            }
            var obj = {
                output: {
                    RetID: 1,
                    RetMsg: "ویرایش با موفقیت انجام شد",
                },
            }
            const updQuery = `UPDATE [dbo].[TUserTaxInfo] SET [TUX_FType] = ${data.TUX_FType} , [TUX_FName] = '${data.TUX_FName || ''}', [TUX_FMelli] = '${data.TUX_FMelli || ''}'
            , [TUX_FShenas] = '${data.TUX_FShenas || ''}', [TUX_FEcoCode] = '${data.TUX_FEcoCode || ''}', [TUX_FAddress] = '${data.TUX_FAddress || ''}', [TUX_FTel] = '${data.TUX_FTel || ''}', [TUX_FID_Address] = ${data.TUX_FID_Address}
            WHERE [TUX_FID_User] = ${userID} AND [TUX_FID] = ${data.TUX_FID}`
            const ress = await this.Database.request().query(updQuery)
            if (ress) {
                return obj
            }
        } catch (error) {
            // console.log(error)
            return error_result;
        }
    }
    async delete(TUX_FID, userID) {
        try {
            var error_result = {
                output: {
                    status: 422,
                    error: true,
                    RetMsg: "عملیات با خطا مواجه شد",
                }
            }
            var obj = {
                output: {
                    RetID: 1,
                    RetMsg: "حذف با موفقیت انجام شد",
                },
            }

            const delQuery = `DELETE FROM [dbo].[TUserTaxInfo] WHERE [TUX_FID] = ${TUX_FID}`
            const res = await this.Database.request().query(delQuery)

            if (res && res.rowsAffected[0] > 0) {
                return obj;
            }

            return error_result;
        } catch (error) {
            return error_result;
        }
    }
}

export default new taxModel();