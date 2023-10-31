export default {
  data() {
    return {
      statusBar: [
        {
          TD_FName: "کاربرد خصوصیت ها",
          active: false,
          TD_FID: 0
        },
        {
          TD_FName: "کاربرد کالا  در محصولات",
          active: false,
          TD_FID: 1
        },
        {
          TD_FName: "کاربرد محصولات در صفحات فروش",
          active: false,
          TD_FID: 2
        },
        {
          TD_FName: "گزارش فروش کالاها",
          active: false,
          TD_FID: 3
        },
        {
          TD_FName: "گزارش فروش محصولات",
          active: false,
          TD_FID: 4
        },
        {
          TD_FName: "گزارش تغییرات قیمت کالاها",
          active: false,
          TD_FID: 5
        },
      ],
      table: {
        data: [],

        optionsInProductsSchema: {
          TGPV_FROWNUM: "ردیف",
          PageSaleName: "صفحه فروش ",
          TGOM_FID_TypeName: "نوع محصول",
          TGOM_FID_Category1Name: "گروه محصول",
          TGOM_FName: "نام محصول",
          TGPV_FID_OptionName: "خصوصیت مرتبط",
          TGPV_FID_ValueName: "مقدار خصوصیت مرتبط",
          TGO_FName: "کالای مرتبط",
          FDefault: "پپش فرض",
        },
        goodsInProductsSchema: {

          TGPV_FROWNUM: "ردیف",
          TGOM_FID_TypeName: "نوع محصول",
          TGOM_FID_Category1Name: "گروه محصول",
          TGOM_FName: "نام محصول",
          TGPV_FID_OptionName: "خصوصیت مرتبط",
          TGPV_FID_ValueName: "مقدار خصوصیت مرتبط",
          TGPV_FCount: "ضریب تعداد ",
          TGPV_FRepet: "تکرار",
          TGP_FActive: "فعال",
          TGP_FFixable: "ثابت",
          FDefault: "پپش فرض",

        },
        productsInSalePagesSchema: {
          TPG_FROWNUM: "ردیف",
          TGO_FID_TypeName: "نوع محصول",
          TGO_FID_Category1Name: "گروه محصول",
          TGO_FCode: "کد محصول",
          TGO_FName: "نام محصول",
          PageName: "نام صفحه فروش",
          PageCategory: "دسته صفحه فروش",
          TPG_FDefault: "پیشفرض",
          TPG_FActive: "فعال",

        },
        SaleGoodsSchema: {
          TPG_FROWNUM: "ردیف",
          TGO_FID_TypeName: "نوع محصول",
          TGO_FID_Category1Name: "گروه محصول",
          TGO_FName: "نام محصول",
          TGO_FCode: "کد محصول",
          TOD_FCount: "تعداد",
          TOD_FPriceTotal: "مبلغ کل",
          TOH_FDateReg: "تاریخ",
          TOH_FCode: "شماره سفارش",
          TOH_FID_CustomerName: "نام مشتری",
        },
        SaleProductSchema: {
          //  TGPV_FCount: "انتخاب ",
          TPG_FROWNUM: "ردیف",
          TGO_FID_TypeName: "نوع محصول",
          TGO_FID_Category1Name: "گروه محصول",
          TGO_FName: "نام محصول",
          TGO_FCode: "کد محصول",
          TOD_FCount: "تعداد",
          TOD_FPriceTotal: "مبلغ کل",
          TOH_FDateReg: "تاریخ",
          TOH_FCode: "شماره سفارش",
          TOH_FID_CustomerName: "نام مشتری",
        },
        reportGoodsChangePrice: {
          TGPC_FROWNUM: "ردیف",
          showChart: "نمودار تغییرات",
          TGO_FID_TypeName: "نوع کالا / خدمات",
          TGO_FID_Category1Name: "گروه کالا / خدمات",
          TGO_FName: "نام کالا / خدمات",
          TGO_FCode: "کد کالا / خدمات",
          TGPC_FID_TypePriceName: "نوع قیمت",
          TGPC_FPriceOld: "قیمت قبل",
          TGPC_FPriceNew: "قیمت جدید",
          TGPC_FDateReg: "تاریخ تغییر",
          // TGPC_FTimeReg: "ساعت تغییر",
          TGPC_FUserRegName: "نام کاربر",
        },
        tableBtn: [
          {
            title: "poll",
            event: "showChart",
            className: "show_icon",
            value: "1"
          },
        ],
        checkboxEnabled: true,
        unSelect: false,
        moneyField: ["TOD_FPriceTotal", "TGPV_FID_Option", "TGPV_FID_Product", "TGPC_FPriceNew", 'TGPC_FPriceOld'],
        customField: [
          {
            field: "TPP_FID_DefaultName",
            value: [
              {
                icon: "mdi-close",
                className: "uncheck",
                value: "0"
              },
              {
                icon: "mdi-check",
                className: "check",
                value: "1"
              }
            ]
          },
          {
            field: "FDefault",
            value: [
              {
                icon: "mdi-close",
                className: "uncheck",
                value: "0"
              },
              {
                icon: "mdi-check",
                className: "check",
                value: "1"
              }
            ]
          },
          {
            field: "TGP_FActive",
            value: [
              {
                icon: "mdi-close",
                className: "uncheck",
                value: "0"
              },
              {
                icon: "mdi-check",
                className: "check",
                value: "1"
              }
            ]
          },
          {
            field: "TGP_FFixable",
            value: [
              {
                icon: "mdi-close",
                className: "uncheck",
                value: "0"
              },
              {
                icon: "mdi-check",
                className: "check",
                value: "1"
              }
            ]
          },
          {
            field: "TPG_FDefault",
            value: [
              {
                icon: "mdi-close",
                className: "uncheck",
                value: "0"
              },
              {
                icon: "mdi-check",
                className: "check",
                value: "1"
              }
            ]
          }, {
            field: "TPG_FActive",
            value: [
              {
                icon: "mdi-close",
                className: "uncheck",
                value: "0"
              },
              {
                icon: "mdi-check",
                className: "check",
                value: "1"
              }
            ]
          },
        ]
      },



      data: {
        table: []
      },


      chartMonthSelect: '',
      chartMonthItems: [
        { F_Name: "یک ماهه", F_Month_value: 1 },
        { F_Name: "دو ماهه", F_Month_value: 2 },
        { F_Name: "سه ماهه", F_Month_value: 3 },
        { F_Name: "شش ماهه", F_Month_value: 6 },
        { F_Name: "دوازده ماهه", F_Month_value: 12 },
        { F_Name: "هجده ماهه", F_Month_value: 18 },

      ],
      chartData: {},
      tableOneRowData: '',


    }
  },
}