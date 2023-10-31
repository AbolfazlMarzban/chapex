<template>
    <v-footer app bottom fixed padless class="cart-desktop-footer py-5" >
      <!-- v-scroll="moveFooter" -->
        <v-row class="align-center justify-center">
            <v-col cols="3" xl="2" lg="2" md="3" class="d-flex flex-row justify-center align-center">
                        <label>مبلغ نهایی سفارشات</label>
                  <ICountUp :delay="delay" :endVal="cartTotal" :options="options" style="font-size:22px; font-weight: bold;" class="mr-5 ml-5"/>
                  <span style="font-size:12px !important">تومان</span>
              </v-col>
            <v-col cols="3" xl="2" lg="2" md="3" class="d-flex justify-start">
                <v-btn rounded color="#016670" dark @click="$emit('next')" class="orderProg" :loading="btnLoading" >{{ nextText }}</v-btn>
            </v-col>
        </v-row>
    </v-footer>
  </template>
  
  <script>
  import ICountUp from 'vue-countup-v2';
  import "../../../../assets/style/cart/cart.scss";
  import saleDataMixin from "../../sale/_mixins/saleDataMixin"
  import cartDetailsMixin from "../_mixins/cartDetailMixins"
  export default {
      props: ["cartData", "nextText", "totalPrice", "btnLoading"],
      mixins: [saleDataMixin, cartDetailsMixin],
  
      components: {ICountUp},
      data(){
          return{
              isDetailsPay: false,
        delay: 0,
              options: {
          duration: 0.5,
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
        }
          }
      },
      computed: {
      cartTotal() {
        if(this.totalPrice){
          return this.totalPrice
        } else {
          var sum = 0
        if (this.cartData.currentCartItems && this.cartData.currentCartItems.length > 0) {
          this.cartData.currentCartItems.forEach(cartItem => {
            const salePage = this.getSalePage(this.cartData, cartItem.TOD_FID_SalePage)
            const finalPrice = this.calcPriceInCart(salePage, cartItem.TOD_FID_Goods, cartItem.TOD_FID_SelectedOptions, cartItem.TOD_FCount, 1, cartItem.TOD_FDesignStatus, cartItem.TOD_FReviewNeed)
            sum += finalPrice
          });
        }
  
        return sum
        }
      },
      productTotal() {
        var sum = 0
        if (this.cartData.currentCartItems && this.cartData.currentCartItems.length > 0) {
          this.cartData.currentCartItems.forEach(cartItem => {
            const salePage = this.getSalePage(this.cartData, cartItem.TOD_FID_SalePage)
            const finalPrice = this.calcPriceInCart(salePage, cartItem.TOD_FID_Goods, cartItem.TOD_FID_SelectedOptions, cartItem.TOD_FCount, 1)
            sum += finalPrice
          });
        }
  
        return sum
      },
      designPrice() {
        var sum = 0
        if (this.cartData.currentCartItems && this.cartData.currentCartItems.length > 0) {
          this.cartData.currentCartItems.forEach(cartItem => {
            if (cartItem.TOD_FDesignStatus == 1) {
              const salePage = this.getSalePage(this.cartData, cartItem.TOD_FID_SalePage)
              const finalPrice = this.calcDesignPrice(salePage, cartItem.TOD_FID_SelectedOptions)
              sum += finalPrice
            }
          });
        }
  
        return sum
      },
      reviewPrice() {
        var sum = 0
        if (this.cartData.currentCartItems && this.cartData.currentCartItems.length > 0) {
          this.cartData.currentCartItems.forEach(cartItem => {
            if (cartItem.TOD_FReviewNeed == 1) {
              const salePage = this.getSalePage(this.cartData, cartItem.TOD_FID_SalePage)
              const finalPrice = this.calcReviewPrice(salePage, cartItem.TOD_FID_SelectedOptions)
              sum += finalPrice
            }
          });
        }
        return sum
      },
      valueAddedTaxPrice() {
        return (this.cartTotal * this.valueAddedTax())
      },
    },
  methods:{
      moveFooter(){
              if((document.documentElement.scrollHeight - window.innerHeight) == window.pageYOffset){
                var width = this.$vuetify.breakpoint.width
                // console.log('footerHeight', document.getElementsByClassName('footer-main')[0].clientHeight)
                var heigth = document.getElementsByClassName('footer-main')[0].clientHeight
                if(width >= 1264){
                    document.getElementsByClassName("cart-desktop-footer")[0].style.bottom = `${heigth}px`
                } else{
                    document.getElementsByClassName("cart-desktop-footer")[0].style.bottom = `${heigth}px`
                }
              } else {
                  document.getElementsByClassName("cart-desktop-footer")[0].style.bottom = "0px"
              }
          },
  }
  }
  </script>
  
  <style lang="scss">
  .cart-desktop-footer{
      background: white  !important;
      color: #016670 !important;
      // border-radius: 20px 20px 0px 0px !important;
  
  }
  .orderProg{
    span{
        letter-spacing: normal;
        font-family: boldbakhtiari !important;
    }
  }
  @media(max-width:600px){
    .orderProg{
      margin-bottom: 200px;
    }
  }
  @media (max-width: 960px) and (min-width:600px){
    .orderProg{
      margin-bottom: 200px;
    }
  }
  </style>