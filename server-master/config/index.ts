import fs from 'fs';
import path from 'path';
// types
import { CorsOptions } from 'cors'
// options
import corsOptions from './cors'
import databaseOptions from './database'
import smsOptions from './sms'
import urlOptions from './url'
import { ImageOptions, options as ImageOptionsValue } from './image'


declare global {
    namespace NodeJS {
        interface Global {
            config: {
                database: {
                    server: string
                    database: string
                    user: string
                    password: string
                    options: any
                },
                sms: {
                    SERVICE_Name: string
                    REGISTER_PID: string
                    API_KEY: string
                },
                cors: CorsOptions,
                port: number | string,
                rootPath: string,
                mode: string,
                company: string,
                JSON_WEB_TOKEN_SECRET_KEY: string,
                YEAR_ACCOUNTING: number,
                url: {
                    client: string
                    server: string
                    server_base: string
                },
            }
            imageSize: ImageOptions
        }
    }
}



function setConfigs(rootPath: string) {
    const Company = process.env["Company"]

    global.config = {
        database: databaseOptions[Company],
        sms: smsOptions[Company],
        cors: corsOptions[Company],
        port: process.env.PORT || process.env.APPLICATION_PORT,
        rootPath: rootPath,
        mode: process.env.mode,
        company: Company,
        JSON_WEB_TOKEN_SECRET_KEY: "rayan_software_jsonwebtoken_secret_key",
        YEAR_ACCOUNTING: 1399,
        url: urlOptions[Company],
    }
    global.imageSize = ImageOptionsValue
}

export default setConfigs