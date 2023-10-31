export default {
  data() {
    return {
      table: {
        show: true,
        data: [],
      },
      headerManager: {
        show: true,
        status: "start",
        title: {
          fa: "صفحه ساز",
          en: "pagebuilder",
          icon: "mdi-close"
        },
        buttons: {
          cancel: {
            show: false,
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
          },
          undo: {
            show: true,
            enable: false
          },
          redo: {
            show: true,
            enable: false
          }
        }
      },
      form: {
        show: false,
        readonly: false,
        data: {}
      },
      draggableShow: true,
      id: 0,
      initalfield: {},
      initalCreatedFields: [
        // { name: "John", id: 1 },
        // { name: "Joao", id: 2 },
        // { name: "Jean", id: 3 },
        // { name: "Gerard", id: 4 },
      ],
      fieldsForm: [],
      SettingComponents: "inputSetting",
      showFieldList: true,
      fieldSettingSelected: {},
      lastId: 0,
      designFormData: {},
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'نام',
          align: 'center',
          sortable: true,
          value: 'TF_FName'
        },
        {
          text: 'عنوان',
          align: 'center',
          value: 'TF_FTitle'
        },
        {
          text: 'کاربر ثبت کننده',
          align: 'center',
          value: 'TF_FUserReg'
        },
        {
          text: 'تاریخ ثبت',
          value: 'TF_FDateReg',
          align: 'center',
        },
        {
          text: 'سریال',
          value: 'TF_FID',
          align: 'center',
        },
        {
          text: 'عملیات',
          value: 'formButtons',
          align: 'center',
        },
      ]
    }
  }
};
