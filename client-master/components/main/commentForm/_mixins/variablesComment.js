export default {
    data(){
        return {
            statusBar: [],
            table: {
                checkboxEnabled: true,
                selectedItems: [],
                unSelect: false,
                show: true,
                data: [],
                
                schema: {
                TGC_FROWNUM: "ردیف",
                TGC_FDateReg: "تاریخ ثبت",
                TGC_FUserReg: "کاربر ثبت کننده",
                TGC_FComment: "متن نظر",
                TGC_FAdvantages:"نقاط قوت",
                TGC_FDisadvantages: "نقاط ضعف",
                TGC_FSuggested: " پیشنهاد خرید",
                show: "عملیات"
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
              data: [],
              rating: 2,
              rating2: 2,
              dialogConpopup1: false,
              readonly: false,
              plusComment: [],
              negativeComment: [],
              plus: "",
              negative: "",
              row: "1",
              plusCommentArray:[],
              negativeCommentArray:[],
              reRender: false,
              formSchema : {},
     
        }
    
          
    }
}
