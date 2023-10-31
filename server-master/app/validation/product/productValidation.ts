import { body } from "express-validator";

class ProductValidation {
  goodsInsert: any;

  constructor() {
    this.goodsInsert = [
      // body('data.TGB_FName').trim().notEmpty().withMessage('وارد کردن کد اجباریست'),
      body("data.TGO_FName")
        .trim()
        .notEmpty()
        .withMessage("نام کالا اجباریست"),
      body("data.TGO_FCode")
        .trim()
        .custom((value, { req }) => {
          if (value == 0) {
            return false;
          }
          return true;
        })
        .withMessage("کد کالا اجباریست"),
    ];
  }
}

export default new ProductValidation();
