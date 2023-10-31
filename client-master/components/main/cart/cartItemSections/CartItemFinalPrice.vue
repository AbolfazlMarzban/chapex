<template>
    <div class="mt-4 mb-4">
        <v-row class="pa-2">
            <v-col cols="12" class="pricebox">
                <span class="my-lbl-title-16">مبلغ نهایی سفارش شما: </span>
                <span class="my-green my-lbl-title-16">
                    <ICountUp :delay="delay" :endVal="calcPriceInCart(salePage, item.TOD_FID_Goods, item.TOD_FID_SelectedOptions,
                        item.TOD_FCount, 1, item.TOD_FDesignStatus, item.TOD_FReviewNeed)" :options="options" /> تومان
                </span>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';
import saleDataMixin from "../../sale/_mixins/saleDataMixin"
import cartDetailMixins from "../_mixins/cartDetailMixins";

export default {
    props: ["salePage", "item"],
    mixins: [saleDataMixin, cartDetailMixins],
    components: { ICountUp },
    data() {
        return {
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
}
</script>