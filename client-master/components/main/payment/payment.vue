<template>
  <div>

    <PaymentType :cartData="cartData" :paymentData="paymentData" />

    <PaymentMethod :cartData="cartData" :paymentData="paymentData" />

    <FinalConfirm :cartData="cartData" :paymentData="paymentData" />

  </div>
</template>
<script>
import "../../../assets/style/cart/cart.scss";
import PaymentType from "./sections/PaymentType.vue";
import PaymentMethod from "./sections/PaymentMethod.vue";
import FinalConfirm from './sections/finalConfirm.vue';

export default {
  props: ["cartData", "paymentData"],
  data() {
    return {
      sRules: false,
      sFactor: false,
      bankAccount: []
    };
  },
  methods: {
    showRules() {
      this.sRules = !this.sRules;
    },
    setBankAccount(value) {
      this.bankAccount = value;
    },
  },
  components: { PaymentType, PaymentMethod, FinalConfirm }
};
</script>
<style lang="scss"></style>
