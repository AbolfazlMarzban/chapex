export default {
  data() {
    return {
      currentParentGroupID: 0,
      table: {
        checkboxEnabled: true,
        selectedItems: [],
        unSelect: false,
        show: true,
        clickableColumn: "TD_FName",
        data: [],
        schema: {
          TD_FROWNUM: "ردیف",
          show: "نمایش",
          TD_FCode: "کد",
          TD_FName: "نام",
          TD_FCaption: "نوع تعریف پایه ",

          TD_FOrder: "ترتیب",
          TD_FActive: "فعال",
          TD_FSubGroup: "زیرگروه ",
          TD_FDateReg: "تاریخ ثبت",
          TD_FUserRegName: "کاربر",
          TD_FID: "سریال",
        },
        // schemaShort: {

        // },
        // schemaMain: {

        // },
        tableBtn: [
          {
            title: "eye",
            event: "show",
            className: "show_icon",
            value: "1"
          }
        ],

        customField: [
          {
            field: 'TD_FActive',
            value: [
              {
                icon: 'mdi-close',
                className: 'uncheck',
                value: "0"
              },
              {
                icon: 'mdi-check',
                className: "check",
                value: "1"
              }
            ]
          },
          {
            field: 'TD_FSubGroup',
            value: [
              {
                icon: 'mdi-close',
                className: 'uncheck',
                value: "0"
              },
              {
                icon: 'mdi-check',
                className: "check",
                value: "1"
              }
            ]
          },
        ],


      },
      breadcrumb: {
        show: true,
        values: [
          {
            TD_FName: "همه خصوصیات"
          }
        ]
      },

      headerManager: {
        show: true,
        status: "list",
        title: {
          fa: " تعاریف پایه",
          en: " Defaults",
          icon: "mdi-close"
        },
        buttons: {
          cancel: {
            show: false,
            enable: true
          },
          return: {
            show: true,
            enable: true
          },
          submit: {
            show: false,
            enable: true
          },
          insert: {
            show: true,
            enable: true
          },
          delete: {
            show: true,
            enable: true
          }
        }
      },

      form: {
        show: false,
        data: {},
        readonly: false
      },
      defaults: {}
    };
  }
};
