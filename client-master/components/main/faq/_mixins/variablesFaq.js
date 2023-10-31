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
                // schema: {},
                schema: {
                //  TGQ_FBuyer: 1,
                TGQ_FROWNUM: "ردیف",
                TGQ_FQuestion: "متن سوال",
                TGQ_FComment: "توضیحات",
                TGQ_FID_StatusName: "وضعیت",
                TGQ_FDateReg: "تاریخ ثبت",
                  TGQ_FUserRegName: "کاربر ثبت کننده",
                  TGQ_FID: "سریال",
                    show: "نمایش"
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

              likeData : {
                TUL_FID : '' , 
                TUL_FID_Item : '' , 
                TUL_FUserReg : '' , 
                TUL_FType : '' , 
               }
        }
    }
}