export default {
  data() {
    return {
      table: {
        checkboxEnabled: true,
        selectedItems: [],   
        unSelect: false,
        show: true, 
        data: [],
        schema: {
          TPP_FROWNUM: "ردیف",
          TPP_FCaption: "عنوان",
          TPP_FComment: "شرح",
          TPP_FDateReg: "تاریخ ثبت", 
          TPP_FID_OptionName: "خصوصیت",
          TPP_FID_TypeName: "نوع",
          TPP_FIDs_ValueName: "مقادیر",
          TPP_FOrder: "ترتیب",
          TPP_FUserReg: "کاربر ثبت کننده",
          TPP_FID: "سریال",
          show: "",
          addValue: ""
        },
        tableBtn: [
          {
            title: "edit",
            event: "show",
            className: "show_icon",
            value: "1"
          },
          {
            title: "eye",
            event: "addValue",
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
        TPG_FROWNUM: "ردیف" , 
        show : "" ,
        TPG_FActive: "فعال" ,
        TPG_FDefault: "پیشفرض" ,
        TGO_FCode: "کد " ,
        TGO_FName: "نام محصول" ,
        TGO_FID_Category1Name: "گروه " ,
        TPG_FDateReg: "تاریخ ثبت" ,
        TPG_FID: "سریال" ,
        TPG_FUserRegName: "کاربر ثبت کننده ",
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
      productHeaderManager: {
        show: true,
        status: "start",
        title: {
          fa: "لیست محصولات",
          en: "product",
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
        headerManager: {
        show: true,
        status: "start",
        title: {
          fa: "لیست خصوصیات",
          en: "Options",
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

      form: {
        show: false,
        data: {},
        tabs: {},
        readonly: false
      },
      defaults: {}
    };
  },
  computed:{
    optionHeaders(){
      return[
        {
          text: 'کد خصوصیت',
          align: 'start',
          sortable: true,
          value: 'TD_FID'
        },
        {
          text: 'ترتیب',
          value: 'optionOrder'
        },
        {
          text: 'نام خصوصیت',
          value: 'TD_FName'
        },      
        {
          text: 'مقدارهای خصوصیت',
          value: 'children'
        },
        {
          text: 'شرح خصوصیت',
          value: 'TPP_FComment'
        },
        {
          text: 'فعال',
          value: 'TD_FActive'
        }
      ]
    },
    optionChildHeaders(){
      return[
        {
          text: 'ترتیب',
          value: 'optionChildOrder'
        },
        {
          text: 'پیشفرض',
          value: 'defaultChild'
        },
        {
          text: 'مقدار',
          value: 'TD_FName'
        },
        {
          text: 'ایجاد وابستگی',
          value: 'makeDependency'
        },
        {
          text: 'وابستگی',
          value: 'dependencies'
        },
        {
          text: 'آیکون',
          value: 'optionIcon'
        },
        {
          text: 'عکس',
          value: 'optionImg'
        }
      ]
    },
    productHeaders(){
      return[
        {
          text: 'کد محصول',
          align: 'start',
          sortable: true,
          value: 'TGO_FID'
        },
        {
          text: 'اسم محصول',
          value: 'TGO_FName'
        },
        {
          text: 'خصوصیت ها',
          value: 'productOptions'
        },
        {
          text: 'تاریخ ثبت',
          value: 'TGO_FDateReg'
        },
        {
          text: 'کاربر ثبت',
          value: 'TGO_FUserRegName'
        }
      ]
    }
  }
};
