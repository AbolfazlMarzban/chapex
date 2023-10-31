<template>
    <v-row>
        <v-col cols="12" class="text-center mt-5 payment-success  px-8 py-16">
            <v-row class="justify-center">
                <v-col cols="4">
                    <img src="../../../assets/img/close.png" alt="" class="payment-pic"></v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="12">
                    <span class="payment-txt">متأسفانه پرداخت شما ناموفق بود!</span>
                    <br>
                    <v-btn class="btn-order mt-5">پرداخت مجدد</v-btn>
                    <hr>
                    <v-row class="mb-5">
                        <v-col cols="6">
                            <ul class="payment-method">
                                <li>شماره پیگیری:</li>
                                <li>شیوه پرداخت:</li>
                            </ul>
                        </v-col>
                        <v-col cols="6">
                            <ul class="payment-info">
                                <li>0025855215465</li>
                                <li>درگاه پرداخت آنلاین</li>
                            </ul>
                        </v-col>
                    </v-row>
                    <hr class="mt-2">
                    <span class="fns-14 text-color-gray">برای تغییر در روش پرداخت سفارش خود، میتوانید از طریق
                        <a href="" class="gr-color">سبد خرید</a>
                        اقدام نمایید
                    </span>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import '../../../assets/style/cart/cart.scss';
export default {

}
</script>

<style>

</style>