// .env
import * as  dotenv from 'dotenv'
dotenv.config()

// set configs 
import setConfigs from './config'
setConfigs(__dirname)

// setup App
import Application from './app/index'
new Application()
