<template>
    <v-card elevation="2" class="pa-0 ma-2"
        v-if="productOptionValue.TGPV_FID_Value == optionValue.TD_FID && !productOptionValue.empty">

        <GoodsDetail v-if="showCommentDialog" :goodsInfo="selectedGoods" @cancelProcessDialog="cancelProcessDialog"
            @hiddenDialog="showCommentDialog = !showCommentDialog" />

        <GoodsPrice v-if="showPriceDialog" :goodsInfo="selectedGoods" @cancelProcessDialog="cancelProcessDialog"
            @hiddenDialog="showPriceDialog = !showPriceDialog" />

        <GoodsStock v-if="showStockDialog" :goodsInfo="selectedGoods" @cancelProcessDialog="cancelProcessDialog"
            @hiddenDialog="showStockDialog = !showStockDialog" />

        <v-card-text>
            <v-row>

                <v-col cols="1">
                    <v-btn v-if="!readonly" @click="$emit('removeObject', productOptionValue)" icon class="mt-4">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>

                <v-col cols="7">
                    <v-combobox single-line chips v-model="productOptionValue.TGPV_FID_Goods"
                        :items="goodsDefaults.filter(g => g.TGO_FArchive == 1)" :return-object="false" item-value="TGO_FID"
                        item-text="TGO_FName" label="کالا / خدمات مرتبط" :disabled="readonly">

                        <template v-slot:selection="{ index, item }">
                            <v-chip size="small">
                                {{ defaultName(item) }}
                            </v-chip>
                        </template>

                    </v-combobox>
                </v-col>

                <v-col cols="4">
                    <v-tooltip>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" v-if="productOptionValue.TGPV_FID_Goods" color="warning"
                                @click="openCommentDialog(productOptionValue.TGPV_FID_Goods)" icon dense>
                                <v-icon>mdi-information</v-icon>
                            </v-btn>
                        </template>
                        <span>شرح کالا / خدمات</span>
                    </v-tooltip>
                    <v-tooltip>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" v-if="productOptionValue.TGPV_FID_Goods" color="success"
                                @click="openPriceDialog(productOptionValue.TGPV_FID_Goods)" icon dense>
                                <v-icon>mdi-chart-line</v-icon>
                            </v-btn>
                        </template>
                        <span>قیمت کالا / خدمات</span>
                    </v-tooltip>
                    <v-tooltip>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" v-if="productOptionValue.TGPV_FID_Goods" color="primary"
                                @click="openStockDialog(productOptionValue.TGPV_FID_Goods)" icon dense>
                                <v-icon>mdi-store-search-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>موجودی کالا</span>
                    </v-tooltip>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="3">
                    <v-text-field label="ضریب قیمت" placeholder="ضریب قیمت" v-model.number="productOptionValue.TGPV_FPrice"
                        class="centered-input" type="number" :disabled="readonly" />
                </v-col>

                <v-col cols="3">
                    <v-text-field label="ضریب تعداد" placeholder="ضریب تعداد"
                        v-model.number="productOptionValue.TGPV_FCount" class="centered-input" type="number"
                        :disabled="readonly" />
                </v-col>

                <v-col cols="3">
                    <v-text-field label="ضریب تکرار" placeholder="ضریب تکرار"
                        v-model.number="productOptionValue.TGPV_FRepet" class="centered-input" type="number"
                        :disabled="readonly" />
                </v-col>

                <v-col cols="3">
                    <v-text-field label="ضایعات" placeholder="ضایعات" v-model.number="productOptionValue.TGPV_FWaste"
                        class="centered-input" type="number" :disabled="readonly" />
                </v-col>

            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ["productOptionValue", "optionValue", "goodsDefaults", "readonly"],
    data() {
        return {
            selectedValue: '',
            showCommentDialog: false,
            showPriceDialog: false,
            showStockDialog: false,
            selectedGoods: null
        }
    },
    methods: {
        async openCommentDialog(Goods_FID) {
            const result = this.goodsDefaults.find(g => g.TGO_FID == Goods_FID)
            if (result) {
                this.selectedGoods = result
                this.showCommentDialog = true
            }
        },

        async openPriceDialog(Goods_FID) {
            const result = this.goodsDefaults.find(g => g.TGO_FID == Goods_FID)
            if (result) {
                this.selectedGoods = result
                this.showPriceDialog = true
            }
        },

        async openStockDialog(Goods_FID) {
            const result = this.goodsDefaults.find(g => g.TGO_FID == Goods_FID)
            if (result) {
                this.selectedGoods = result
                this.showStockDialog = true
            }
        },

        defaultName(id) {
            const ret = this.goodsDefaults.find(d => d.TGO_FID == id)

            if (ret)
                return ret.TGO_FName
        },
    }
}
</script>

<style scoped>
.select_label {
    font-size: 12px;
    padding: 0;
    margin: 0;
    color: blue;
}
</style>