<template>
    <div class="tiraj-pan mb-4">
        <v-container class="pa-0">
            <v-row class="align-center justify-center" style="border: 1px solid #F2F2F2; border-radius: 15px;">
                <v-col cols="12" xl="8" lg="8" md="10" class="text-center pb-0">
                    <label class="my-lbl-title-14">تیراژ
                        انتخابی</label>
                    <v-select v-if="salePage.TPS_FID_NumberType === 'انتخابی' || salePage.TPS_FID_NumberType === 'پلکانی'"
                        flat rounded solo outlined :items="numberList" v-model="item.TOD_FCount" dense
                        @change="tirajChanged" class="pt-0 mt-0 select-tiraj">
                    </v-select>

                    <div v-else-if="salePage.TPS_FID_NumberType === 'عددی'">
                        <div class="option-title-warn mb-3 mt-0" v-if="notInRange()">
                            <span>تعداد انتخابی شما باید بین {{ item.TGO_FNumberMin }} و
                                {{ item.TGO_FNumberMax }} باشد.</span>
                        </div>
                        <input class="count-select-number pa-2 mb-2" type="number" v-model="item.TOD_FCount"
                            placeholder="انتخاب تیراژ" :min="min" :max="max" @change="tirajChanged" />
                    </div>
                </v-col>
                <!-- <v-col cols="1">
                    <v-divider vertical inset style="height: 80px;"></v-divider>
                </v-col> -->
                <v-col cols="12" @click="showDetails = !showDetails" style="cursor:pointer"
                    class="pt-0 text-center d-flex align-center justify-center">
                    <span class="showTirajText">مشاهده لیست قیمت در تیراژ مختلف</span>

                    <v-btn v-if="showDetails" @click="showDetails = false" icon class="float-left">
                        <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>

                    <v-btn v-else @click="showDetails = true" icon class="float-left">
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <transition name="slide">
                <div v-if="showDetails" class="px-xl-4 px-lg-4 px-md-4 px-0">
                    <CartItemPriceTable :salePage="salePage" :selectedTiraj="item.TOD_FCount" :finalProduct="item"
                        :selectedChildren="item.TOD_FID_SelectedOptions" @tirajChanged="priceTableTirajChanged" />
                </div>
            </transition>

        </v-container>
    </div>
</template>

<script>
import cartDetailMixins from '../_mixins/cartDetailMixins';
import saleDataMixin from '../../sale/_mixins/saleDataMixin';
import CartItemPriceTable from './CartItemPriceTable.vue';

export default {
    mixins: [cartDetailMixins, saleDataMixin],
    props: ["salePage", "item", "finalPrice"],
    data() {
        return {
            showDetails: false,
            numberList: this.salePage.TPS_FIDs_NumberList,
            min: this.item.TGO_FNumberMin ? this.item.TGO_FNumberMin : this.salePage.TPS_FNumberMin,
            max: this.item.TGO_FNumberMax ? this.item.TGO_FNumberMax : this.salePage.TPS_FNumberMax
        };
    },

    mounted() {
        if (this.item.TGO_FNumberMin || this.item.TGO_FNumberMax) {
            this.numberList = this.salePage.TPS_FIDs_NumberList.filter(n => (n >= this.item.TGO_FNumberMin && n <= this.item.TGO_FNumberMax))
        }
    },

    methods: {
        async tirajChanged() {
            const result = await this.updateCartItem(this.salePage, this.item);
        },

        async priceTableTirajChanged(newTiraj) {
            this.item.TOD_FCount = newTiraj
            this.tirajChanged()
        },

        notInRange() {
            if (this.item.TOD_FCount < this.item.TGO_FNumberMin || this.item.TGO_FNumberMax < this.item.TOD_FCount) {
                return true
            }
            return false
        },
    },
    components: { CartItemPriceTable }
}
</script>
<style lang="scss">
@media (max-width:600px) {
    .showTirajText {
        font-size: 13px !important;
    }
}

.option-title-warn {
    font-family: boldbakhtiari !important;
    font-size: 14px;
    color: #E9083E;
}
</style>