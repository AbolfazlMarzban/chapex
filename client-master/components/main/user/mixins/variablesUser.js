export default {
  data() {
    return {
      headerManager: {
        show: true,
        status: "",
        buttons: {
          insert: {
            show: true,
            enable: false
          },
          delete: {
            show: true,
            enable: false
          }
        }
      },
      table: {
        checkboxEnabled: true,
        selectedItems: [],
        unSelect: false,
        show: true,
        data: [],
        schema: {
          TU_FROWNUM: "ردیف",
          TU_FName: "نام و نام خانوادگی",
          TU_FFamil: "نام تجاری",
          TU_FMobile1: "شماره همراه",
          TU_FID_City1Name: "شهر",
          TU_FID_GroupName: "سطح دسترسی",
          show: "عملیات"
        },
        tableBtn: [
          {
            title: "eye",
            event: "show",
            className: "show_user_table_icon",
            value: "1"
          }
        ]
      },
      TabsItem: {
        data: [
          {
            id: 1,
            title: "پروفایل",
            link: "/admin/user/manage/profile"
          },
          {
            id: 2,
            title: "مدیریت حساب کاربری",
            link: "/admin/user/manage/account"
          },
          {
            id: 3,
            title: "سفارشات جاری",
            link: "/admin/user/manage/orders"
          },
          {
            id: 4,
            title: "فاکتورها",
            link: "/admin/user/manage/invoices"
          },
          {
            id: 5,
            title: "گردش حساب",
            link: "/admin/user/manage/transactions"
          },
          {
            id: 6,
            title: "چک و فیش",
            link: "/admin/user/manage/profile"
          },
          {
            id: 7,
            title: "استعلام قیمت",
            link: "/admin/user/manage/profile"
          },
          {
            id: 8,
            title: "بازاریابی",
            link: "/admin/user/manage/profile"
          },
          {
            id: 9,
            title: "پیام",
            link: "/admin/user/manage/profile"
          },
          {
            id: 10,
            title: "آرشیو الکترونیکی",
            link: "/admin/user/manage/fileManager"
          }
        ],
        show: false
      },
      form: {
        show: false,
        readonly: false,
        data: {}
      },
      defaults: {}
    };
  }
};
