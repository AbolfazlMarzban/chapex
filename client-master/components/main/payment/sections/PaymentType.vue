<template>
    <div class="my-cart-box mb-4">
        <v-row>
            <v-col cols="12">
                <label class="title fn-bold"> نوع فاکتور</label>
                <span v-if="paymentData.finalizeOrderRequested">
                    <span v-if="!paymentData.TP_FID_Type" style="color: red;" class="mr-2">نوع فاکتور را انتخاب نکرده
                        اید!</span>
                    <span v-else-if="paymentData.TP_FID_Type == 303 && paymentData.legalInfo.length == 0"
                        style="color: red;" class="mr-2">اطلاعات مالیاتی خود را انتخاب نکرده اید!</span>
                </span>
            </v-col>
        </v-row>
        <hr />
        <p>
            مشترک گرامی، دقت نمایید پس از پرداخت به هیچ عنوان امکان تغییر نوع فاکتور وجود ندارد.
        </p>

        <v-radio-group v-model="paymentData.TP_FID_Type">
            <v-radio label="نیازی به دریافت فاکتور رسمی ندارم" :value="302" color="#016670" class="text-right"></v-radio>
            <v-radio class="text-right" label="فاکتور به صورت رسمی صادر شود" color="#016670" :value="303"></v-radio>
        </v-radio-group>

        <div v-if="paymentData.TP_FID_Type == 303 && table.length == 0" class="legalinfobox">
            <p>
                مشتری گرامی، شما هنوز اطلاعات حقوقی خود را ثبت نکرده‌اید. برای صدور
                فاکتور رسمی بر روی لینک
                کلیک کرده و اطلاعات لازم را تکمیل نمایید.
            </p>
            <span @click="showLegal = true" style="cursor: pointer;">تکمیل اطلاعات</span>
        </div>

        <div v-if="paymentData.TP_FID_Type == 303 && table.length > 0" class="legalinfobox">
            <div v-if="paymentData.legalInfo.length > 0" class="d-flex flex-column" style="width: 100%;">
                <div class="d-flex flex-row align-center">
                    <label for="">اطلاعات مالیاتی شما</label>
                    <span style="color:#016670; cursor: pointer;" class="mr-2" @click="showLegal = true">ویرایش
                        اطلاعات</span>
                </div>
                <span>شخصیت تجاری: {{ detectLegalPerson(paymentData.legalInfo[0].TUX_FType) }}</span>
                <span>نام کامل: {{ paymentData.legalInfo[0].TUX_FName }}</span>
                <span>شماره شناسنامه: {{ paymentData.legalInfo[0].TUX_FShenas }}</span>
                <span>شماره ملی: {{ paymentData.legalInfo[0].TUX_FMelli }}</span>
                <span>شماره اقتصادی: {{ paymentData.legalInfo[0].TUX_FEcoCode }}</span>
                <span>شماره تماس: {{ paymentData.legalInfo[0].TUX_FTel }}</span>
                <span>آدرس: {{ paymentData.legalInfo[0].TUX_FAddress }}</span>
            </div>
            <div style="width: 100%;" v-else>
                <p>اطلاعات مالیاتی خود را برای این فاکتور انتخاب نمایید</p>
                <span @click="showLegal = true" style="cursor: pointer;">انتخاب اطلاعات</span>
            </div>

        </div>

        <hr />
        <PaymentLegalBox :show="showLegal" :table="table" :paymentData="paymentData" @closeLegal="showLegal = false"
            @getTax="getTaxInfo" />
    </div>
</template>

<script>
import paymentMixin from "../_mixins/paymentMixins";

export default {
    props: ["cartData", "paymentData"],
    mixins: [paymentMixin],
    data() {
        return {
            showFactorError: false,
            showLegal: false,
            table: [],
        }
    },
    mounted() {
        this.getTaxInfo()
    },
    methods: {
        detectLegalPerson(value) {
            if (value == 0) {
                return 'حقیقی'
            } else if (value == 1) {
                return 'حقوقی'
            }
        },

        async getTaxInfo() {
            try {
                const res = await this.$authAxios.$get('/tax/get/0?mode=table')
                if (res) {
                    this.table = res.data.table

                    if (this.table.length == 1) {
                        this.paymentData.legalInfo = [this.table[0]]
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
    },
    watch: {
        "paymentData.TP_FID_Type"(newValue) {
            this.paymentData.finalizeOrderRequested = false
            this.paymentData.TP_FID_Payment = null
        }
    }
}
</script>
<style lang="scss">
.legalinfobox {
    background: #f2f2f2;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-end;
    justify-content: flex-end;

    p {
        margin: 0px;
        color: black;
        width: 100%;
    }

    a {
        color: black;
    }
}
</style>