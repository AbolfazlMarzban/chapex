export default {
  data() {
    return {
      authNavbar: [

        {
          title: "پیشخوان",
          icon: "mdi-chart-pie",
          name: "dashboard",
          show: true,
        },
        {
          title: "تکمیل فرم سفارش",
          icon: "mdi-form-select",
          name: "orderForms",
          show: false,
        },
        {
          title: "سفارشات",
          icon: "mdi-order-bool-descending-variant",
          name: "orders",
          show: true,
        },
        {
          title: "مدیریت ارسال",
          icon: "mdi-truck-delivery",
          name: "delivery",
          show: false,
        },
        {
          title: 'مدیریت فایل',
          icon: 'mdi-image-multiple',
          name: 'fileManager',
          show: true,
        },
        {
          title: "پیام ها",
          icon: "mdi-message",
          name: "message",
          show: false,
        },
        {
          title: "ارسال",
          icon: "mdi-package",
          name: "",
          show: false,
        },
        {
          title: "گردش حساب",
          icon: "mdi-cash-sync",
          name: "",
          show: false,
        },
        {
          title: "افزایش موجودی",
          icon: "mdi-cash-plus",
          name: "",
          show: false,
        },
        {
          title: "پروفایل",
          icon: "mdi-account",
          name: "profile",
          show: true,
        },
        {
          title: "تغییر رمز عبور",
          icon: "mdi-lock",
          name: "profile",
          show: true,
        },
      ]
    };
  },
  computed: {
    // add id to items
    navbarItem() {
      let authNavbar = [];
      for (let [index, item] of this.authNavbar.entries()) {
        let parentId = index + 1;
        if (item.children) {
          item.id = parentId.toString();
          authNavbar.push(item);
          for (let [Subindex, subItem] of item.children.entries()) {
            let childId = Subindex + 1;
            subItem.id = parentId.toString() + childId;
          }
        } else {
          item.id = parentId.toString();
          authNavbar.push(item);
        }
      }
      return authNavbar;
    }
  }
};
