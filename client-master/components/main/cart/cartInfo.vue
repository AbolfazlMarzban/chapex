<template>
  <!-- <v-col cols="3" xl="3" lg="3" md="0" sm="12" xs="12"> -->
  <div class="right-content">
    <v-expand-transition>
      <v-container class="my-final-price">
        <!-- <ul class="pl-0"> -->
        <v-row class="text-right">
          <v-col cols="6" xl="6" lg="6" md="9" sm="9" class="price-title pa-1"> قیمت کل ({{
            cartData.currentCartItems.length }} محصول)</v-col>
          <v-col cols="4" xl="4" lg="4" md="2" sm="2" class="pa-1 text-center">{{ numberSeparate(productTotal) }}</v-col>
          <v-col cols="2" xl="2" lg="2" md="1" sm="1" class="tooman pa-1">تومان</v-col>
        </v-row>
        <!-- <v-row class="text-right">
            <v-col cols="6" class="price-title pa-1">هزینه طراحی</v-col>
            <v-col cols="4" class="pa-1 text-center">{{ numberSeparate(designPrice) }}</v-col>
            <v-col cols="2" class="tooman pa-1">تومان</v-col>
          </v-row>
          <v-row class="text-right">
            <v-col cols="6" class="price-title pa-1">هزینه بررسی فایل</v-col>
            <v-col cols="4" class="pa-1 text-center">{{ numberSeparate(reviewPrice) }}</v-col>
            <v-col cols="2" class="tooman pa-1">تومان</v-col>
          </v-row> -->
        <v-row class="text-right">
          <v-col cols="6" xl="6" lg="6" md="9" sm="9" class="price-title pa-1">هزینه ارسال</v-col>
          <v-col cols="6" xl="6" lg="6" md="3" sm="3" class="pa-1 text-center fns-12">وابسته به شیوه ارسال</v-col>
          <!-- <v-col cols="2" class="tooman pa-1">تومان</v-col> -->
        </v-row>
        <v-row class="text-right">
          <v-col cols="6" xl="6" lg="6" md="9" sm="9" class="price-title pa-1">مالیات بر ارزش افزوده</v-col>
          <v-col cols="4" xl="4" lg="4" md="2" sm="2" class="pa-1 text-center"
            v-if="paymentData.TP_FID_Type == 303">{{ numberSeparate(taxValue) }}</v-col>
          <v-col cols="4" xl="4" lg="4" md="2" sm="2" class="pa-1 text-center" v-else>0</v-col>
          <v-col cols="2" xl="2" lg="2" md="1" sm="1" class="tooman pa-1">تومان</v-col>
        </v-row>
        <hr class="my-3" />
        <v-row class="text-right">
          <v-col cols="6" xl="6" lg="6" md="9" sm="9" class="price-title pa-1" style="color: red;">تخفیف دریافتی</v-col>
          <v-col cols="4" xl="4" lg="2" md="2" sm="2" class="pa-1 text-center" style="color: red;">{{
            numberSeparate(totalOff) }}</v-col>
          <v-col cols="2" xl="2" lg="2" md="1" sm="1" class="tooman pa-1" style="color: red;">تومان</v-col>
        </v-row>
        <hr class="my-3">
        <v-row class="text-right">
          <v-col cols="6" xl="6" lg="6" md="9" sm="9" class="price-title-bold pa-1 fns-14">مبلغ نهایی سفارش</v-col>
          <v-col cols="4" xl="4" lg="4" md="2" sm="2" class="price-title-green pa-1 text-center">{{
            numberSeparate(cartTotal) }}</v-col>
          <v-col cols="2" xl="2" lg="2" md="1" sm="1" class="tooman pa-1">تومان</v-col>
        </v-row>
        <!-- </ul> -->
      </v-container>
    </v-expand-transition>
    <!-- <div v-if="btnLoading" class="my-btn-green mt-2">
      <span class="lds-dual-ring"></span>
    </div>
    <div v-else class="my-btn-green mt-2" @click="$emit('next')">
      <span>{{ nextText ? nextText : 'ادامه فرآیند خرید' }}</span>
    </div> -->
    <div class="text-center">
      <v-btn rounded color="#016670" dark @click="$emit('next')" class="my-btn-green mt-2" :loading="btnLoading">{{
        nextText ? nextText : 'ادامه فرآیند خرید' }}</v-btn>
    </div>
  </div>
</template>
<script>
import ICountUp from 'vue-countup-v2';
import "../../../assets/style/cart/cart.scss";
import saleDataMixin from "../sale/_mixins/saleDataMixin"
import cartDetailsMixin from "./_mixins/cartDetailMixins"

export default {
  props: ["cartData", "nextText", "paymentData", "btnLoading"],
  components: { ICountUp },
  mixins: [saleDataMixin, cartDetailsMixin],
  data() {
    return {
      isDetailsPay: false,
      taxValue: 0,
      delay: 0,
      options: {
        duration: 0.5,
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '',
      }
    };
  },
  mounted() {
    this.valueAddedTaxPrice()
  },
  methods: {
    async valueAddedTaxPrice() {
      const tax = await this.valueAddedTax()
      if (tax) {
        const p = (this.productTotal * tax)
        this.taxValue = Math.round(p)
      }
    },
  },
  computed: {
    cartTotal() {
      var sum = 0
      if (this.cartData.currentCartItems && this.cartData.currentCartItems.length > 0) {
        this.cartData.currentCartItems.forEach(cartItem => {
          const salePage = this.getSalePage(this.cartData, cartItem.TOD_FID_SalePage)
          const finalPrice = this.calcPriceInCart(salePage, cartItem.TOD_FID_Goods, cartItem.TOD_FID_SelectedOptions, cartItem.TOD_FCount, 1, cartItem.TOD_FDesignStatus, cartItem.TOD_FReviewNeed)
          sum += finalPrice
        });
        if (this.paymentData.TP_FID_Type == 303) {
          sum = Math.round(sum + this.taxValue)
        }
      }
      this.$emit('changeTotal', sum)
      return Math.round(sum)
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

      return Math.round(sum)
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

    totalOff() {
      var sum = 0
      if (this.cartData.currentCartItems && this.cartData.currentCartItems.length > 0) {
        this.cartData.currentCartItems.forEach(i => sum += i.TOD_FDiscount)
      }
      return sum
    }
  },
};
</script>

<style scoped>
.price-title {
  font-size: 12px;
}

.tooman {
  font-size: 12px;
  font-weight: normal;
  text-align: left;
}
</style>
