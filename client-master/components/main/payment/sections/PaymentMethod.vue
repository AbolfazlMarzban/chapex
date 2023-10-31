<template>
  <div class="my-cart-box mb-4">
    <v-row>
      <v-col cols="12" class="d-flex flex-row">
        <label class="title fn-bold"> روش پرداخت</label>
        <span v-if="paymentData.finalizeOrderRequested">
          <span v-if="!paymentData.TP_FID_Payment" style="color: red;" class="mr-2">روش پرداخت را انتخاب نکرده اید!</span>
          <span v-else-if="!paymentData.TP_FID_Bank && paymentData.TP_FID_Payment == paymentData.TP_FID_Type + '01'"
            class="mr-2" style="color: red;">درگاه پرداخت را انتخاب نکرده
            اید!</span>
        </span>
      </v-col>
    </v-row>

    <hr class="my-1" />
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-radio-group v-model="paymentData.TP_FID_Payment">

          <v-radio color="#016670" label="پرداخت از طریق درگاه پرداخت آنلاین" :value="paymentData.TP_FID_Type + '01'"
            class="option_list_item text-right"></v-radio>

          <Transition>
            <PaymentGatewaySelector v-if="paymentData.TP_FID_Payment == paymentData.TP_FID_Type + '01'"
              :cartData="cartData" :paymentData="paymentData" class="mb-4" />
          </Transition>

          <v-radio color="#016670" class="option_list_item text-right"
            label="پرداخت از طریق انتقال وجه (واریز از طریق شماره حساب، شماره کارت یا شماره شبا)"
            :value="paymentData.TP_FID_Type + '02'"></v-radio>

          <Transition>
            <ChapexBankAccountDetails v-if="paymentData.TP_FID_Payment == paymentData.TP_FID_Type + '02'"
              @bankAccount="value => $emit('bankAccount', value)" />
          </Transition>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import paymentMixin from "../_mixins/paymentMixins";
import ChapexBankAccountDetails from "./paymentMethod/ChapexBankAccountDetails.vue";
import PayIncreaseDialog from "./paymentMethod/PayIncreaseDialog.vue";
import PaymentGatewaySelector from "./paymentMethod/PaymentGatewaySelector.vue";

export default {
  mixins: [paymentMixin],
  props: ["cartData", "paymentData"],
  components: {
    PayIncreaseDialog,
    ChapexBankAccountDetails,
    PaymentGatewaySelector
  },
  data() {
    return {
      BankAccountsShow: false,
      PaymentGatewayShow: false,
      showPayError: false,
      showGateWayError: false
    };
  },
  methods: {

  },
  watch: {
    watch: {
      "paymentData.TP_FID_Payment"(newValue) {
        this.paymentData.finalizeOrderRequested = false

        if (newValue == this.paymentData.TP_FID_Type + '02')
          this.paymentData.TP_FID_Bank = null
      }
    }
  }
};
</script>

<style lang="scss">
.option_list_item {
  .v-input__slot {
    margin-bottom: 0px !important;
  }
}
</style>
