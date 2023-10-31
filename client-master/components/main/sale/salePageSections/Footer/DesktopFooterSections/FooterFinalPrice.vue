<template>
    <div class="pa-0 ma-0">
        <v-row>
            <v-col class="pt-3 price-label" cols="4">
                <label>مبلغ سفارش</label>
            </v-col>
            <v-col cols="5" class="pa-0 pt-2">
                <p class="price-tag pb-0" v-if="salePageStatus.finalPrice">
                    <ICountUp :delay="delay" :endVal="salePageStatus.finalPrice" :options="options" @ready="onReady" />
                </p>
                <p v-else class="nonprice-tag-mobile">----</p>
            </v-col>

            <v-col cols="3" class="pt-5 text-right">
                <span class="tooman">تومان</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="ps-5 withTax pt-0" cols="12">
                <span class="me-2">با احتساب مالیات بر ارزش افزوده</span>
                <ICountUp :delay="delay" :endVal="priceWithValueAddedTax(salePageStatus.salePage, salePageStatus.finalPrice)" :options="options"
                    @ready="onReady" />
                <span class="ms-2 toomanWithTax">تومان</span>
            </v-col>

        </v-row>
    </div>
</template>
  
<script>
import ICountUp from 'vue-countup-v2';
import saleDataMixin from "../../../_mixins/saleDataMixin"

export default {
    inject: ["salePageStatus"],
    mixins: [saleDataMixin],

    data() {
        return {
            delay: 0,
            options: {
                duration: 0.8,
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            }
        };
    },

    methods: {

        onReady(instance, CountUp) {
            // const that = this;
            // instance.update(that.endVal + 100);
        },
    },

    components: { ICountUp }
}
</script>
  
<style scoped lang="scss">
@charset "UTF-8";

.price-tag {
    font-size: 28px !important;
    color: #016670 !important;
    font-family: boldbakhtiari !important;

    span {
        font-family: boldbakhtiari !important;
        text-align: center !important;
    }
}

.nonprice-tag-mobile {
    font-size: 30px !important;
    color: #016670 !important;
}

.tooman {
    font-size: 12px !important;
    font-family: bakhtiari !important;
    color: #016670 !important;
    text-align: right !important;
}

.toomanWithTax {
    font-size: 12px !important;
    font-family: bakhtiari !important;
    text-align: right !important;
}

.price-label {
    font-size: 20px !important;
    font-family: bakhtiari !important;
    color: #016670 !important;
    text-align: left !important;
}

.withTax {
    font-size: 14px !important;
    font-family: bakhtiari !important;
    color: black !important;
    text-align: right !important;
}
</style>