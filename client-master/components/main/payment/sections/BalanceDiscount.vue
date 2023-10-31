<template>
    <div class="my-cart-box text-center mb-4">
        <v-row class="text-right">
            <label class="title pr-2 fn-bold mt-2">اعتبار و تخفیف</label>
        </v-row>

        <hr class="mt-5" />

        <br />
        <p>
            مبلغ اعتبار شما
            <span class="gr-color fn-bold fns-18"> (0) </span> تومان و موجودی حساب
            شما <span class="gr-color fn-bold fns-18"> (5.000.000) </span> تومان
            است. شما می توانید تا مبلغ
            <span class="gr-color fn-bold fns-18"> (5.000.000) </span>
            تومان از اعتبار خود برای خرید استفاده نمایید.
        </p>

        <v-row>
            <v-col cols="6" class="d-flex justify-end finalprice">
                <span>مبلغ نهایی سفارش</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-start finalprice">
                <span>10.000.000 تومان</span>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" xl="9" lg="8" md="8" sm="12" xs="12" class="pb-lg-3 pb-md-3 pb-0">
                <ui-input v-model="paymentData.userCredit" type="text"
                    placeholder="مبلغی که می خواهید از اعتبار خود هزینه کنید" class="credit-input" />
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="4" sm="12" xs="12" class="pt-lg-3 pt-md-3 pt-0">
                <div class="btn-chr">استفاده از اعتبار</div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" xl="9" lg="8" md="8" sm="12" xs="12" class="pb-lg-3 pb-md-3 pb-0">
                <ui-input v-model="paymentData.discountCode" type="text" placeholder="کد تخفیف خود را وارد کنید"
                    class="credit-input" />
            </v-col>
            <v-col cols="12" xl="3" lg="4" md="4" sm="12" xs="12" class="pt-lg-3 pt-md-3 pt-0">
                <div class="btn-chr">ثبت کد تخفیف</div>
            </v-col>
        </v-row>

        <hr />
        <v-row class="mt-3">
            <v-col cols="6" class="d-flex justify-end finalprice">
                <span>مبلغ قابل پرداخت</span>
            </v-col>
            <v-col cols="6" class="d-flex justify-start payprice">
                <span>10.000.000 تومان</span>
            </v-col>
        </v-row>

        <br />
    </div>
</template>

<script>
import paymentMixin from "../_mixins/paymentMixins";
import paymentVariables from "../_mixins/paymentVariables";

export default {
    mixins: [paymentMixin, paymentVariables],

}
</script>