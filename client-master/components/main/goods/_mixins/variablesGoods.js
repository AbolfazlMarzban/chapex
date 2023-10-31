export default {
  data() {
    return {
      table: {
        show: true,
        data: [],
      },
      headerManagerForm: {   
        show: false,
        status: "edit",
        title: {
          fa: "ویرایش کالاها و خدمات",
          en: "Goods",
          icon: "mdi-close"
        },
        buttons: {
          cancel: {
            show: true,
            enable: true
          },
          submit: {
            show: true,
            enable: true
          },
          json:{
            show:false,
            enable:false
          },
          delete: {
            show: false,
            enable: false
          },
          redo: {
            show: false,
            enable: false
          }
        }
      },
      headerManager: {
        show: true,
        status: "start",
        title: {
          fa: "کالاها و خدمات",
          en: "Goods",
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
          copy: {
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
      // defaults: {}
    };
  },
  computed: {
    headers() {
      return [
        {
          text: 'ردیف',  
          align: 'start',
          sortable: true,
          value: 'TGO_FROWNUM',
        },
        // {
        //   text: 'عملیات',
        //   value: 'tableButtons'
        // },
        {
          text: 'کد',
          value: 'TGO_FCode',
        },
        {
          text: 'نام کالا / خدمات',
          value: 'TGO_FName',
          sortable: true,
        },      
        {
          text: 'قیمت فروش',
          value: 'TGO_FSalePriceMax',
          // filter: value => {            
          //   if (!this.priceRange) return true
          //   return parseInt(this.priceRange[0]) <= value.split(',').join('')
          //     &&
          //     value.split(',').join('') <= parseInt(this.priceRange[1])
          // }
        },
        {
          text: 'مبلغ ثابت کلیشه',
          value: 'TGO_FSalePriceFix'
        },
        {
          text: 'مبلغ ثابت فرم بندی',
          value: 'TGO_FBuyPercent'
        },
        {
          text: 'تاریخ ثبت',
          value: 'TGO_FDateReg',
          // filter: value => {
          //   if (!this.dateRange.toString()) return true
          //   return this.dateRange[0] < value
          //     &&
          //     value < this.dateRange[1]
          // }
        },
        {
          text: 'گروه',
          value: 'TGO_FID_Category1',
          // filter: value => {
          //   if (!this.combo.toString()) return true
          //   return this.combo.includes(value)
          // }
        },
        {
          text: 'نوع',
          value: 'TGO_FID_TypeName',
          // filter: value => {
          //   if(!this.type.toString()) return true
          //   return this.type.includes(value)
          // }
        },
        {
          text: 'قیمت',
          value: 'price',
        },
        {
          text: 'موجودی',
          value: 'TGO_FStock',
        },
        {
          text: 'شرح',
          value: 'TGO_FComment',
        },
        {
          text: 'کاربرد',
          value: 'TGO_FUsage',
        },
        {
          text: 'گزارش فروش',
          value: 'TGO_FSaleReport',
        },
        {
          text: 'فعال',
          value: 'TGO_FActive',
        },
        {
          text: 'فروش',
          value: 'TGO_FCanSale',
        },
        {
          text: 'نمایش',
          value: 'TGO_FArchive',
        },
      ]
    }
  }
};
