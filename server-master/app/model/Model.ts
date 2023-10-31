import sql from 'mssql'
// import sql from 'mssql/msnodesqlv8'
//این فقط برای اتصال لوکال استفاده میشه
import autoBind from 'auto-bind' 

class Model {

    config: object
    Database: any
    isConnect: any
    sql: any

    constructor() {
        autoBind(this)
        this.config = global.config.database
        this.Database = null
        this.isConnect = null
        this.sql = sql
        this.setupPool()
    }

    async setupPool() {
        try {
            this.Database = await new sql.ConnectionPool(global.config.database)
            await this.Database.connect()
        } catch (error) {
            console.log(error)
        }
    }

    async checkConnection() {
        try {
            this.Database = await new sql.ConnectionPool(global.config.database)
            await this.Database.connect()
            return true
        } catch (error) {
            return false
        }
    }

    async getTableSchema(tableName) {
        try {
            const result = await this.Database.request()
                .query(`Select * From [dbo].[UFN_SchemaTable]('${tableName}') as shcema`)

            let data = {}
            for (const defalut of result.recordset) {
                let defaultValue
                if (defalut.Defs === '0') {
                    defaultValue = 0
                } else if (defalut.Defs === "''") {
                    defaultValue = ''
                } else if (defalut.Defs == null) {
                    defaultValue = null
                }
                data[defalut.Keys] = defaultValue
            }
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async UFN_Coding(tableName, Year = 0, state = null) {
        try {
            let result
            if (!state) {
                result = await this.Database.request()
                    .query(`select  DBO.UFN_Coding('${tableName}', ${Year}) as code`)

            } else if (state == "product") {
                result = await this.Database.request()
                    .query(`select  DBO.UFN_TGoodsCoding('${tableName}', ${process.env.YEAR_ACCOUNTING}) as code`)

            }
            return result.recordset[0].code

        } catch (error) {
            console.log(error)
            return null
        }
    }

    async UFN_TGoodsCoding(tableName) {
        try {
            let result

            result = await this.Database.request()
                .query(`select  DBO.UFN_TGoodsCoding('${tableName}', ${process.env.YEAR_ACCOUNTING}) as code`)

            return result.recordset[0].code

        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default Model