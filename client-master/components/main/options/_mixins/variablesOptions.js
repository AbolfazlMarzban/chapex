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
          TGP_FROWNUM: "ردیف",
          addValue: "افزودن مقدار",
          show: "نمایش",
          TGP_FOrder: "اولویت",
          TGP_FLabel: "عنوان",
          // TGP_FID_GoodsName: "محصول",
          TGP_FID_Option: "کد خصوصیت",
          TGP_FID_OptionName:"نام خصوصیت ",
          // TGP_FIndexDef: "",
          // TGP_FType: "ارتباط",
          TGP_FValue: "توضیحات",
          // TGP_FActive: "",
          // TGP_FDelete:"",
          // TGP_FUserReg: "",
          // TGP_FDateReg: "",
          // TGP_FMinValue: "",
          // TGP_FMaxValue: "",
          // TGP_FFixable: "",
          // TGP_FExcept: "",
          // TGP_FOtherOption: "",
          // TGP_FID_OptionName: "خصوصیت",
          // TGP_FIndexDefName: "",
          // TGP_FTypeName: "",
          TGP_FActiveName: "فعال",
          // TGP_FFixableName: "تغییر",
          // TGP_FOtherOptionName: "",
          // TGP_FUserRegName: "",
          // TGP_FID_Require: "",
          // TGP_FHasDependency: "",
          // TGP_FID_Dependency: "",
          TGP_FDependencyName: "مقادیر وابسته",
          TGP_FID: "سریال",
          // TGP_FID_DependencyName: "",
          // TGP_FHasDependencyName: "وابستگی",
        },
        tableBtn: [
          {
            title: "edit",
            event: "addValue",
            className: "show_icon",
            value: "1"
          },
          {
            title: "eye",
            event: "show",
            className: "show_icon",
            value: "1"
          }
        ]
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
        oldData: {},
        readonly: false
      },
      defaults: {},
      optionValues: []
    };
  }
};
