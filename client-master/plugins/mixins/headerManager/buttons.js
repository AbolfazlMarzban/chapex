export default {
  data() {
    return {
      buttons: {
        insert: {
          enable: true,
          loading: false,
          show: false,
        },
        copy:{
          enable: true,
          loading: false,
          show: false,
        },
        edit: {
          enable: true,
          loading: false,
          show: false,
        }, 
        delete: {
          enable: false,
          show: false,
        },
        show: {
          enable: true,
          loading: false,
          show: false,
        },
        pay: {
          enable: true,
          loading: false,
          show: false,
        },
        changeStatusGroup: {
          enable: true,
          show: false,
        },
        changeStatus: {
          enable: true,
          show: false,
        },
        submit: {
          enable: true,
          loading: false,
        },
        cancel: {
          enable: true,
          loading: false,
        },
        back: {
          enable: true,
          show: false,
        },
        option: {
          enable: false,
          show: false,
        },
        undo: {
          enable: false,
          show: false,
        },
        redo: {
          enable: false,
          show: false,
        },
        json: {
          enable: false,
          show: false,
        },
        // others: {
        // 	option: {
        // 		enable: true,
        // 		show: true,
        // 		lable: "تنظیمات",
        // 		eventName: "option",
        // 	},
        // },
      },
    }
  }
}
