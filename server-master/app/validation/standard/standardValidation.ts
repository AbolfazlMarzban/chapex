import {
    body,
  
  } from 'express-validator'
  
  class StandardValidation {
    insert: any
  
    constructor() {
      this.insert = [
        // body('data.TGB_FName').trim().notEmpty().withMessage('وارد کردن کد اجباریست'),
        body('data.TGB_FName').trim().notEmpty().withMessage('عنوان استاندارد اجباریست'),
      ]
    }   
  }
  
  export default new StandardValidation()