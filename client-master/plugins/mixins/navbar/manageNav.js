export default {
  data() {
    return {
      manageNavbar: [
        {
          title: "داشبورد",
          icon: "list-ul",
          link: ""
        },
        {
          title: "سفارشات",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "سفارشات من",
              icon: "",
              link: "/admin/orders/myOrders"
            },
            {
              title: "کلیه سفارشات",
              icon: "",
              link: "/admin/orders/allOrders"
            },
            {
              title: "بایگانی سفارشات",
              icon: "",
              link: "/admin/orders/ordersArchive"
            }
          ]
        },

        {
          title: "بازاریابی",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "فعالیت ها",
              icon: "",
              link: ""
            },
            {
              title: "وظیفه ها",
              icon: "",
              link: ""
            },
            {
              title: "فرصت روشن",
              icon: "",
              link: ""
            },
            {
              title: "استعلام قیمت",
              icon: "",
              link: ""
            },
            {
              title: "سوابق  مشتری",
              icon: "",
              link: ""
            }
          ]
        },
        {
          title: "حسابداری",
          icon: "list-ul",
          link: ""
        },
        {
          title: "کاربران",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "مدیرت مشتریان",
              icon: "",
              link: "/admin/user/customer"
            },
            {
              title: "مدیریت تامین کنندگان",
              icon: "",
              link: "/admin/user/provider"
            },
            {
              title: "مدیریت کارمندان",
              icon: "",
              link: "/admin/user/employee"
            }
          ]
        },
        {
          title: "محصولات",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: " معرفی کالا و خدمات",
              icon: "",
              link: "/admin/goods"
            },
            {
              title: "مدیریت صفحات فروش ",
              icon: "",
              link: "/admin/salePageManage"
            },
            {
              title: "مدیریت صفحات دسته بندی",
              icon: "",
              link: "/admin/salePageCategory"
            }
          ]
        },
        {
          title: "ارتباطات و تعاملات",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "نظرات کاربران",
              icon: "",
              link: "/admin/comment"
            },
            {
              title: "پرسش و پاسخ",
              icon: "",
              link: ""
            },
            {
              title: "استخدام",
              icon: "",
              link: ""
            }
          ]
        },
        {
          title: "پیام ها",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "یادآوری ها",
              icon: "",
              link: ""
            },
            {
              title: "پیام",
              icon: "",
              link: ""
            },
            {
              title: "مدیریت فایل",
              icon: "",
              link: ""
            }
          ]
        },
        {
          title: "امکانات جانبی",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "بلاگ",
              icon: "",
              link: ""
            },
            {
              title: "صفحه ساز",
              icon: "",
              link: "/admin/formBuilder"
            },
            {
              title: "مدیریت",
              icon: "",
              link: ""
            }
          ]
        },
        {
          title: "گزارشات",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "گزارش CRM",
              icon: "",
              link: ""
            },
            {
              title: "گزارش کالا",
              icon: "",
              link: "/admin/report"
            },
            {
              title: "گزارش فروش",
              icon: "",
              link: ""
            },
            {
              title: "گزارش انبار",
              icon: "",
              link: ""
            }
          ]
        },
        {
          title: " تعاریف و تنظیمات ",
          icon: "list-ul",
          link: "",
          show: false,
          children: [
            {
              title: "تعاریف پایه",
              icon: "",
              link: "/admin/defaults"
            },
            {
              title: "تنظیمات",
              icon: "",
              link: ""
            },
            {
              title: "جداول سامانه",
              icon: "",
              link: "/admin/tables"
            },
            {
              title: "استانداردهای بسته بندی",
              icon: "",
              link: "/admin/packStandard"
            },
            {
              title: "استانداردهای طراحی و آپلود",
              icon: "",
              link: "/admin/designStandard"
            }

            // {
            //   title: "دسته بندی محتوا",
            //   icon: "",
            //   link: ""
            // },
            // {
            //   title: "تعیین سطوح دسترسی",
            //   icon: "",
            //   link: ""
            // }
          ]
        },
        // {
        //   title: "فرم ساز",
        //   icon: "list-ul",
        //   link: "/formBuilder"
        // },
        {
          title: "مدیریت فایل",
          icon: "list-ul",
          link: "/admin/library"
        },
        {
          title: "مدیریت فایل کاربران",
          icon: "list-ul",
          link: "/admin/userlibrary"
        }
      ]
    };
  },
  computed: {
    // add id to items
    navbarItem() {
      let manageNavbar = [];
      for (let [index, item] of this.manageNavbar.entries()) {
        let parentId = index + 1;
        if (item.children) {
          item.id = parentId.toString();
          manageNavbar.push(item);
          for (let [Subindex, subItem] of item.children.entries()) {
            let childId = Subindex + 1;
            subItem.id = parentId.toString() + childId;
          }
        } else {
          item.id = parentId.toString();
          manageNavbar.push(item);
        }
      }
      return manageNavbar;
    }
  }
};
