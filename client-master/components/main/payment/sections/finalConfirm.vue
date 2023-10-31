<template>
  <div class="my-cart-box mb-4 mt-8">
    <ChapexRules :show="showRules" @closeRules="showRules = false" />

    <v-row>
      <v-col cols="6" xl="6" lg="6" md="6" sm="12" xs="12">
        <label class="title fn-bold">تایید نهایی</label>
        <span v-if="paymentData.finalizeOrderRequested">
          <span v-if="!paymentData.acceptRules" class="mr-2" style="color: red;">قوانین چاپکس را مطالعه و تایید
            کنید!</span>
        </span>
      </v-col>
    </v-row>

    <hr class="my-1" />

    <v-row>
      <v-col cols="12" class="d-flex flex-column pb-5">
        <v-row class="align-center">
          <v-col cols="12" xl="9" lg="9" md="9">
            <v-checkbox v-model="paymentData.acceptRules" color="#016670"
              label="قوانین چاپکس  را پذیرفته و مشخصات تولیدی محصولم را مطالعه کرده ام" :value="true">
            </v-checkbox>
            <span style="font-size: 12px; margin-top: -20px; position: absolute;">لطفاً پیش از پرداخت نهایی، قوانین چاپکس
              و مشخصات تولید سفارشات خود را مطالعه و تایید نمایید.</span>

          </v-col>
          <v-col cols="12" xl="3" lg="3" md="3">
            <span style="color: #016670; font-weight: bold; font-size: 14px; cursor: pointer;"
              @click="showRules = true">مشاهده قوانین چاپکس</span>

          </v-col>
        </v-row>

        <v-row class="align-center" v-if="showPrintFactorRequest()">
          <v-col cosl="12" xl="9" lg="9" md="9">
            <v-checkbox v-model="paymentData.printFactor" color="#016670"
              label="درخواست ارسال فاکتور کاغذی به نام به همراه سفارش خود را دارم">
            </v-checkbox>
          </v-col>
          <v-col cosl="12" xl="3" lg="3" md="3">
            <a href="/cartInvoice/" target="_blank"
              style="color: #016670; font-weight: bold; font-size: 14px; cursor: pointer;" @click="saveLocal">مشاهده و چاپ
              پیش فاکتور</a>

          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </div>
</template>

<script>
import paymentMixin from "../_mixins/paymentMixins";
import ChapexRules from "./finalConfirm/ChapexRules.vue";

export default {
  mixins: [paymentMixin],
  props: ["cartData", "paymentData"],
  data() {
    return {
      showFactor: false,
      account: [],
      showRules: false
    };
  },
  methods: {
    saveLocal() {
      let data = {
        legalInfo: this.paymentData.legalInfo,
        account: this.account
      };
      localStorage.setItem('factor', JSON.stringify(data));
    },
    showPrintFactorRequest() {
      return (this.paymentData.TP_FID_Type == 303 && this.paymentData.acceptRules && this.paymentData.TP_FID_Bank)
    }
  },
  watch: {
    bankAccount(newValue) {
      this.account = newValue;
    }
  },
  components: { ChapexRules }
}
</script>