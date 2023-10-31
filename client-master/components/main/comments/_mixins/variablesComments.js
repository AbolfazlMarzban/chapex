export default {
    data(){
        return {
          statusBar: [
            {
                TD_FID: 26001, 
                TD_FName: "نطسمبس",
                event: "newComment" ,
                active: false
            },
            {
                TD_FID: 26002,
                TD_FName: "نظرات ارشیو", 
                event: "archive" , 
                active: false
            }
        ],
            table: {
                checkboxEnabled: true,
                selectedItems: [],
                unSelect: false,
                show: true,
                data: [],
                // schema: {},
                schema: {
                    TGC_FID:"",
                    TGC_FID_Goods:"",
                    TGC_FUserReg:"",
                    TGC_FDateReg:"",
                    TGC_FTimeReg:"",
                    TGC_FComment:"",
                    TGC_FSuggested:"",
                    TGC_FIsCustomer:"",
                    TGC_FIsUnknown:"",
                    TGC_FAdvantages:"",
                    TGC_FDisadvantages:"",
                    TGC_FID_Status:"",
                    TGC_FDelete:"",
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
              
        }
    }
}