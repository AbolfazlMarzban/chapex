export default {
  data() {
    return {
      pageSaleTable: {
        checkboxEnabled: true,
        selectedItems: [],
        unSelect: false,
        show: true, 
        data: [], 
        schema: { 
          TPS_FROWNUM: "ردیف",
          show: "نمایش",
          TPS_FTitle: "نام صفحه",
          TPS_FTitlesss: "دسته نمایش",
          TPS_FCaption: "عنوان(تگ تایتل)",
          TPS_FLink: "لینک",
          TPS_FActive: "فعال",
          TPS_FDateReg: "تاریخ و ساعت ایجاد",
          TPS_FUserRegName: "کاربر ایجاد",
        },
        tableBtn: [
          {
            title: "eye",
            event: "show",
            className: "show_icon",
            value: "1"
          },
          {
            title: "plus-square",
            event: "add_product_option",
            className: "show_icon",
            value: "1"
          }
        ] , 

        customField: [
          {
            field: "TPS_FActive",
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
      productOptiobsTable: {
        checkboxEnabled: true,
        selectedItems: [],
        unSelect: false,
        show: true,
        data: [],
        schema: {
          TPP_FID: "آیدی",
          TPP_FID_PageSale: "",
          TPP_FID_Option: "",
          TPP_FID_Type: "روش نمایش",
          TPP_FOrder: "اولویت",
          TPP_FCaption: "نام خصوصیت",
          TPP_FComment: "شرح",
          TPP_FFix: "ثابت بودن",
          TPP_FActive: "فعال بودن",
          TPP_FIDs_Value: "",
          TPP_FID_Default: "مقدار پیش فرض",
          TPP_FUserReg: "کاربر ثبت",
          TPP_FDateReg: "تاریخ ثبت",
          TPP_FDelete: "حذف",
          show: "نمایش"
        },
        tableBtn: [
          {
            title: "eye",
            event: "show",
            className: "show_icon",
            value: "1"
          }
        ]
      },
      productTable: {
        checkboxEnabled: true,
        selectedItems: [],
        unSelect: false,
        show: true,
        data: [],
        schema: {
          TPG_FID: "آیدی",
          TGO_FName: "محصول",
          TPG_FDefault: "فعال",
          TPG_FUserReg: "کاربر",
          TPG_FDateReg: "تاریخ",
          TPG_FDelete: "حذف",
          TPG_FDefault: "پیش فرض",
          show: "نمایش"
        },
      
        tableBtn: [
          {
            title: "eye",
            event: "show",
            className: "show_icon",
            value: "1"
          }
        ]
      },
      headerManagerMain: {
        show: true,
        status: "start",
        title: {
          fa: "صفحه فروش",
          en: "",
          icon: "shopping-basket"
        },
        buttons: {
          cancel: {
            show: false,
            enable: true
          },
          edit: {
            show: false,
            enable: true
          },
          submit: {
            show: false,
            enable: true
          },
          insert: {
            show: false,
            enable: true
          },
          delete: {
            show: false,
            enable: true
          },
          undo: {
            show: false,
            enable: false
          },
          redo: {
            show: false,
            enable: false
          },
          json: {
            show: false,
            enable: true
          }
        }
      },
      headerManagerProduct: {
        show: true,
        status: "start",
        title: {
          fa: "صفحه فروش",
          en: "page sale",
          icon: "mdi-close"
        },
        buttons: {
          cancel: {
            show: false,
            enable: false
          },
          submit: {
            show: false,
            enable: false
          },
          insert: {
            show: true,
            enable: true
          },
          delete: {
            show: true,
            enable: false
          }
        }
      },
      headerManagerOption: {
        show: true,
        status: "start",
        title: {
          fa: "صفحه فروش",
          en: "page sale",
          icon: "mdi-close"
        },
        buttons: {
          cancel: {
            show: false,
            enable: false
          },
          submit: {
            show: false,
            enable: false
          },
          insert: {
            show: true,
            enable: true
          },
          delete: {
            show: true,
            enable: false
          }
        }
      },
      pageSaleForm:{
        show: false,
        data: {},
        readonly: false
      },
      form: {
        show: false,
        data: {},
        readonly: false
      },
      defaults: {},
      defaultProduct: {},
      defaultOption: {}
    };
  },
  computed:{
    headers(){
      return[
        {
          text: 'ردیف',
          align: 'start',
          sortable: true,
          value: 'TPS_FROWNUM',
        },
        {
          text: 'نام صفحه',
          value: 'TPS_FTitle',
        },
        {
          text: 'دسته نمایش',
          value: 'TPS_FTitlesss',
        },
        {
          text: 'عنوان (تگ تایتل)',
          value: 'TPS_FCaption',
        },
        {
          text: 'لینک',
          value: 'TPS_FLink',
        },
        {
          text: 'فعال',
          value: 'TPS_FActive',
        },
        {
          text: 'تاریخ و ساعت ایجاد',
          value: 'TPS_FDateReg',
        },
        {
          text: 'کاربر ایجاد کننده',
          value: 'TPS_FUserRegName',
        },
        {
          text: 'ایجاد کپی',
          value: 'copySalePage',
        },
      ]
    },
  }
};
