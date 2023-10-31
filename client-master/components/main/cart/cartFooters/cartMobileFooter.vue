<template>
  <v-footer app bottom fixed :padless="true" class="cart-mobile-footer" >
    <!-- v-scroll="moveFooter" -->
        <v-row class="align-center py-3">
            <v-col cols="12" class="text-center pb-0">
                <label>مبلغ نهایی سفارشات</label>
            </v-col>
            <v-col cols="12" class="text-center pt-0">
                <ICountUp :delay="delay" :endVal="cartTotal" :options="options" style="font-size:22px"/>
                <span style="font-size:12px !important">تومان</span>
            </v-col>
            <v-col cols="12" class="d-flex justify-center pt-0 mt-0">
                <v-btn rounded color="#016670" dark @click="$emit('next')" :loading="btnLoading" >{{ nextText }}</v-btn>
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
      } else{
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
                var heigth = document.getElementsByClassName('footer-main')[0].clientHeight
                if(width > 600){
                    document.getElementsByClassName("cart-mobile-footer")[0].style.bottom = `${heigth}px`
                }
                else {
                    document.getElementsByClassName("cart-mobile-footer")[0].style.bottom = `${heigth}px`
                }
            } else {
                document.getElementsByClassName("cart-mobile-footer")[0].style.bottom = "0px"
            }
        },
}
}
</script>

<style lang="scss">
.cart-mobile-footer{
    background: white  !important;
    color: #016670 !important;
    // border-radius: 20px 20px 0px 0px !important;

}
</style>