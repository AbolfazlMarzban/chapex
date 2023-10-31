export default {
  
  data() {
    return {
      goodsList: [], 
      pageSaleData: {},
      optionsData: [], 
      optionList: [],
      productList: [],
      resultProduct: {} , 
      orderDetail : {
        TOD_FID_Goods : '' , 
        TOD_FCount : 0 , 
        TOD_FPrice : '' ,
        TOD_FTax : 0 , 
        TOD_FBasketIndex : 0 , 
        TOD_FDateReg : '' , 
        TOD_FTimeReg : '' , 
        options: []
      },
        // title: "", 
        // description: "",
        // value: 0, 
        // fieldName: {
        //   name: "",
        //   value: ""
        // },
        // items: []
    }
  },
}