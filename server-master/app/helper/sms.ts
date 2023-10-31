
import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs';

class SmsController {

  service: any
  serviceName: string
  services: any
  // smsData: SmsDataType
  url: string
  method: string
  patterncode: string
  apikey: string
  user: string
  pass: string
  from: string
  to: string
  message: string
  inputData: object

  constructor(smsData: any) {

    this.method = "post";
    this.patterncode = global.config.sms.REGISTER_PID;
    this.apikey = global.config.sms.API_KEY;
    this.serviceName = global.config.sms.SERVICE_Name;
    this.service = null;


    this.services = {
      ghasedak: {
        url: "http://api.iransmsservice.com/v2/send/verify",
        body: {
          type: 1,
          receptor: smsData.to,
          template: this.patterncode,
          param1: smsData.message
        },
        inputPattern: 'Array',
        message: smsData.message
      }
    }

    this.service = this.services[this.serviceName]
  }
  async send() {

    let result
    try {

      if (this.serviceName == 'ghasedak') {

        const config: AxiosRequestConfig = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded', 'apikey': this.apikey, },
          data: qs.stringify(this.service.body),
          url: this.service.url,
        };
        result = await axios(config)

      }

      return result.data
    } catch (error) {
      if (error.isAxiosError)
        console.log('AxiosError', error.response.data.message)
      else
        console.log(error)

      return null

    }
  }

  async send2() {

    let result
    try {

      if (this.method == "get") {
        result = await axios.get(this.service.url)
      }

      else if (this.method == "post") {
        if (this.service.body.Authorization) {
          result = await axios.post(this.service.url, this.service.body, {
            headers: {
              'Authorization': "AccessKey " + this.service.body.Authorization
            }
          })
        } else {
          result = await axios.post(this.service.url, this.service.body)
        }
      }
      return result.data
    } catch (error) {
      console.log(error)
      return null

    }
  }


  // helper
  // find service name
  findService(serviceName) {
    let selectedWebService = ''

    if (serviceName == "ghasedak") {
      selectedWebService = "ws_1"
    }

    this.service = this.services[selectedWebService]
  }


  findService2(methodName, apiKey, patterncode) {
    let selectedWebService = ''
    if (methodName == "post") {
      // ws_1 , ws_2 , ws_4 , ws_5,
      if (apiKey) {
        // ws_1 ws_2
        if (patterncode) {
          // ws_2
          selectedWebService = "ws_2"
        } else {
          // ws_1
          selectedWebService = "ws_1"
        }
      } else {
        // ws_4 ws_5
        if (patterncode) {
          // ws_5
          selectedWebService = "ws_5"
        } else {
          // ws_4
          selectedWebService = "ws_4"
        }
      }
    } else if (methodName == "get") {
      // only ws_3
      selectedWebService = "ws_3"
    }

    this.service = this.services[selectedWebService]
  }

  convertInputDataToJson() {
    if (this.service) {
      let neededDataForInputData = this.service.message
      if (this.service.inputPattern == "Array") {
        this.service.body.inputData = [JSON.parse(neededDataForInputData)]
      } else if (this.service.inputPattern == "Object") {
        this.service.body.inputData = JSON.parse(neededDataForInputData)
      }
    }
  }

  // if parsed hole data before creating data in class
  creatingInputPattrenData() {
    if (this.service) {
      let neededDataForInputData = this.service.message
      if (this.service.inputPattern == "Array") {
        this.service.body.inputData = [neededDataForInputData]
        if (this.service.body.values) {
          this.service.body.values = [neededDataForInputData]
        }
      } else if (this.service.inputPattern == "Object") {
        this.service.body.inputData = neededDataForInputData
        // if (this.service.body.values) {
        this.service.body.values = neededDataForInputData
        // }
      }
    }
  }

}

export default SmsController