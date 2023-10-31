<template>
    <div style="border-radius:30px !important;">
        <v-dialog persistent width="500" v-model="dialog" style="border-radius:30px !important;">
            <v-card style="border-radius:30px !important;">
                <v-card-text class="pa-8 text-center">
                    <div class="popup-title">
                        ارسال به تلگرام
                    </div>
                    <v-divider></v-divider>
                        <v-row>
                            <v-col cols="12">
                                <p class="fn-bold ublack">
                                    فایل طراحی مربوط به سفارش خود را به شماره تماس 09167015093
                                    ارسال بفرمایید، لطفا به هنگام ارسال فایل طراحی، حتما شماره
                                    سفارش خود را برای ما ارسال نمایید.</p>
                                <v-divider></v-divider>
                                <div class="bib d-flex align-center">
                                    <v-checkbox></v-checkbox>
                                    <p class="text-color-gray fns-14 d-inline pb-0 mb-0">اگر فکر می کنید فایل طراحی شما
                                        نیاز به بررسی تخصصی کارشناسان ما دارد، هزینه بررسی این فایل مبلغ 50.000 تومان می
                                        باشد</p>
                                </div>
                            </v-col>
                        </v-row>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col cols="12">
                            <p class="text-color-gray text-center" style="font-size: 12px;">
                                لطفاً به هنگام ارسال فایل طراحی، حتماً شماره سفارش خود را برای ما ارسال نمایید*
                            </p>
                        </v-col>
                    </v-row>
                    <v-row class="justify-center">
                        <v-col cols="5">
                            <v-btn class="popupclose pa-5" @click="$emit('close')" block>انصراف</v-btn>
                        </v-col>
                        <v-col cols="5">
                            <v-btn class="popupbtn pa-5" block>تکمیل سفارش</v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import "../../../../assets/style/cart/cart.scss";

export default {
    data() {
        return {
            dialog: true
        }
    }
}
</script>

<style>

</style>