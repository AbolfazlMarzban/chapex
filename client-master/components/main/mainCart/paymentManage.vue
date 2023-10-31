<template>
  <ui-loading v-if="loading" />

  <v-row v-else class="pa-lg-5 pa-md-5" style="margin-bottom: 100px;">

    <v-col cols="12">
      <OrderProgress currentStep="payment" />
    </v-col>

    <EmptyCart v-if="cartData.currentCartItems.length == 0" />

    <v-col v-if="cartData.currentCartItems.length > 0" class="" cols="12" xl="8" lg="8" md="12">
      <LazyPayment :cartData="cartData" :paymentData="paymentData" />
    </v-col>

    <v-col cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
      <LazyDiscountCoupon />
      <LazyCartInfo v-if="cartData.currentCartItems.length > 0" :cartData="cartData" nextText="تکمیل خرید و پرداخت"
        class="mb-3" @next="finalizeOrder" :paymentData="paymentData" @changeTotal="changeTotal"
        :btnLoading="btnLoading" />
    </v-col>

    <v-col cols="12" class="pt-0 d-xl-none d-lg-none d-none">
      <v-btn block rounded color="#016670" dark @click="finalizeOrder" class="orderProg" :loading="btnLoading">تکمیل
        خرید و پرداخت</v-btn>
    </v-col>

    <LazyCartMobileFooter v-if="cartData.currentCartItems.length > 0" :cartData="cartData"
      class="d-xl-none d-lg-none d-md-none d-block" :totalPrice="paymentData.TP_FPrice" :nextText="'تکمیل خرید و پرداخت'"
      @next="finalizeOrder" :btnLoading="btnLoading" />

    <LazyCartDesktopFooter v-if="cartData.currentCartItems.length > 0" :cartData="cartData"
      :nextText="'تکمیل خرید و پرداخت'" @next="finalizeOrder" class="d-xl-block d-lg-block d-md-block d-none"
      :totalPrice="paymentData.TP_FPrice" :btnLoading="btnLoading" />

  </v-row>
</template>
<script>
import "../../../assets/style/cart/cart.scss";
import Payment from "../payment/payment.vue";
import OrderProgress from "./orderProgress.vue";
import cartDetailMixins from "../cart/_mixins/cartDetailMixins";
import CartInfo from "../cart/cartInfo.vue";
import paymentMixin from "../payment/_mixins/paymentMixins";
import paymentVariables from "../payment/_mixins/paymentVariables";
import saleDataMixin from "../sale/_mixins/saleDataMixin";
import EmptyCart from "../cart/emptyCart.vue";

export default {
  mixins: [cartDetailMixins, paymentMixin, saleDataMixin, paymentVariables],

  data() {
    return {
      loading: true,
      btnLoading: false,
      cartData: {
        currentCartItems: [],
        salePages: [],
      },
      selectedGateway: null,
      pMethod: null,
      showRulesError: false,
      showPayError: false,
      showFactorError: false,
      showGateWayError: false,
      showFactor: false,
      showLegalInfoError: false,
    };
  },

  mounted() {
    this.getCartItems();
  },

  methods: {
    async getCartItems() {
      const result = await this.getCartData();

      if (result) {
        if (result.cartItems && result.cartItems.length > 0) {
          this.cartData.currentCartItems = result.cartItems.filter(
            item => item.TOD_FBasketIndex == 0
          );
          this.cartData.salePages = result.salePages;

          this.cartData.currentCartItems.forEach(cartItem => {
            const salePage = this.getSalePage(
              this.cartData,
              cartItem.TOD_FID_SalePage
            );
            const finalPrice = this.calcPriceInCart(
              salePage,
              cartItem.TOD_FID_Goods,
              cartItem.TOD_FID_SelectedOptions,
              cartItem.TOD_FCount,
              1,
              cartItem.TOD_FDesignStatus,
              cartItem.TOD_FReviewNeed
            );
            this.paymentData.TP_FPrice += finalPrice;
          });

          this.loading = false;
        }
      }
    },

    async finalizeOrder() {
      this.paymentData.finalizeOrderRequested = true
      this.btnLoading = true

      if (this.finalizeOrderValidation()) {
        try {
          const result = await this.setDataBuyToHeader(this.paymentData);

          if (result) {
            const orderId = result.otherData.orderId;

            const price = result.otherData.price
            if (!result.error) {
              let data = {
                state: "Insert",
                TP_FID_Type: this.paymentData.TP_FID_Type,
                TP_FPrice: Math.round(price),
                TP_ClientFName: this.User.TU_FName,
                TP_ClientLName: this.User.TU_FFamil,
                TP_ClientEmail: this.User.TU_FEmail,
                TP_ClientPhone: this.User.TU_FMobile1,
                TP_FComment: "سفارش " + orderId,
                TP_FID_Payment: this.paymentData.TP_FID_Payment,
                TP_FID_Bank: this.paymentData.TP_FID_Bank,
                TP_FDelete: 0,
                TP_FArchive: 0,
                orderId: orderId
              };

              result.mesages[0] = "  سفارش #" + orderId + " ثبت شد   ";

              var urlResult = "";
              if (this.paymentData.TP_FID_Payment == this.paymentData.TP_FID_Type + '01') {
                urlResult = await this.getPaymentURL(data);
                result.mesages[1] = "   در حال انتقال به درگاه پرداخت...  ";
              } else if (this.paymentData.TP_FID_Payment == this.paymentData.TP_FID_Type + '02') {
                urlResult = `payment/cardPayment/${orderId}`;
              }

              window.location.href = urlResult;

              this.showResponseSuccessMessages(result);
            } else {
              this.showResponseErrors(result);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      this.btnLoading = false
    },

    finalizeOrderValidation() {
      if (!this.paymentData.acceptRules)
        return false

      if (!this.paymentData.TP_FID_Type)
        return false

      if (!this.paymentData.TP_FID_Payment)
        return false

      if (this.paymentData.TP_FID_Payment == this.paymentData.TP_FID_Type + '01')
        if (!this.paymentData.TP_FID_Bank)
          return false

      return true
    },

    changeTotal(value) {
      this.paymentData.TP_FPrice = value
    }
  },

  components: { Payment, OrderProgress, CartInfo, EmptyCart }
};
</script>
<style lang=""></style>
