export default{
    data(){
      return {
        table: {
          checkboxEnabled: true,
          selectedItems: [],
          unSelect: false,
          show: true,
          data: [],
          schema: {
            TGB_FID:"شماره سریال",
            show:"نمایش",
            // TGB_FCode:"",
            TGB_FName:"عنوان استاندارد",
            TGB_FID_TypeName:"نوع بسته بندی",
            TGB_FPrice:"هزینه ارسال هر بسته",
            TGB_FLength:"طول (CM)",
            TGB_FWidth:"عرض (CM)",
            TGB_FHight:"ارتفاع (CM)",
            TGB_FWeightMin:"حداقل وزن (KG)",
            TGB_FWeightMax:"حداکثر وزن (KG)",
            TGB_FComment:"توضیحات",


          },
          tableBtn: [
            {
              title: "eye",
              event: "show",
              className: "show_icon",
              value: "1"
            }
          ],
          moneyFields: ["TGB_FPrice"]
        },
        headerManager: {
          show: true,
          status: "start",
          title: {
            fa: "لیست استانداردهای بسته بندی",
            en: "Packing Standard",
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
            },
            
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
}