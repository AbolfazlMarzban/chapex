<template>
    <v-expansion-panel class="exp-btn">
        <v-expansion-panel-header color="#F2F2F2" class="py-0" style="min-height: 35px !important;">
            <v-row>
                <v-col cols="12">
                    <div class="expansionTitle">
                        <span>مشاهده لیست تیراژ و قیمت</span>
                    </div>
                </v-col>
            </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content style="background: #f2f2f2 !important;">
            <v-row class="pt-5">
                <v-col cols="12" class="titleRow pa-1">
                    <v-row>
                        <v-col cols="2"></v-col>
                        <v-col cols="2">تیراژ</v-col>
                        <v-col cols="4" v-if="state == 'feeBase'">قیمت واحد</v-col>
                        <v-col cols="4" v-else-if="state == 'totalBase'">قیمت کل</v-col>
                        <v-col cols="4">سود شما</v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row v-for="(priceRow, i) in priceRows" :key="i" class="pa-0">
                <SelectedRow v-if="priceRow.tiraj == salePageStatus.tiraj" :priceRow="priceRow" :state="state" />
                <NotSelectedRow v-else :priceRow="priceRow" :state="state" />
            </v-row>
            <v-row class="mt-4 d-flex justify-center">
                <v-btn text block color="#016670" @click="showMore = true" class="show-more" rounded> مشاهده بیشتر</v-btn>
                <PriceDialog :showMore="showMore" @closePriceDialog="showMore = false" />
            </v-row>
            <v-row class="selectors align-center mt-2">
                <v-col cols="7" class="px-0">
                    <v-radio-group row v-model="state" class="mt-0">
                        <v-radio label="قیمت واحد" value="feeBase" class="mr-0" color="#016670"></v-radio>
                        <v-radio label="قیمت نهایی" value="totalBase" color="#016670"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="5" class="px-0 ">
                    <v-switch v-model="withTax" :value="withTax" flat label="با احتساب مالیات" class="mt-0"
                        color="#016670"></v-switch>
                </v-col>

            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
import NotSelectedRow from './PriceTableSections/PriceTableNotSelectedRow.vue';
import SelectedRow from './PriceTableSections/PriceTableSelectedRow.vue';
import saleDataMixin from '../../_mixins/saleDataMixin';

export default {
    inject: ["salePageStatus"],
    mixins: [saleDataMixin],
    components: { SelectedRow, NotSelectedRow },
    data() {
        return {
            withTax: false,
            state: 'feeBase',
            showMore: false,
            priceRows: []
        }
    },
    async mounted() {
        this.$vuetify.rtl = true;
        await this.setPriceRows()
    },

    methods: {
        async setPriceRows() {
            let ret = []
            if (this.salePageStatus.finalProduct) {
                if (this.salePageStatus.salePage.TPS_FID_NumberType == 'انتخابی' || this.salePageStatus.salePage.TPS_FID_NumberType == 'پلکانی') {
                    if (this.salePageStatus.salePage.TPS_FIDs_NumberList && this.salePageStatus.salePage.TPS_FIDs_NumberList.length > 0) {

                        let basePrice = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, this.salePageStatus.tiraj, 1)
                        if (this.withTax) {
                            const valueAddedTax = await this.valueAddedTax()
                            basePrice = basePrice + (basePrice * valueAddedTax)
                        }
                        const baseFee = basePrice / this.salePageStatus.tiraj

                        const selectedTirajIndex = this.salePageStatus.salePage.TPS_FIDs_NumberList.findIndex(t => t == this.salePageStatus.tiraj)
                        // console.log('selected Tiraj index', selectedTirajIndex)
                        let counter = 0
                        for (var i = 0; i <= this.salePageStatus.salePage.TPS_FIDs_NumberList.length - 1; i++) {
                            if (i >= selectedTirajIndex && counter <= 4) {
                                // && counter <= 4
                                const tiraj = this.salePageStatus.salePage.TPS_FIDs_NumberList[i]
                                let price = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, tiraj, 1)
                                if (this.withTax)
                                    price = this.priceWithValueAddedTax(this.salePageStatus.salePage, price)

                                const fee = price / tiraj
                                const sood = (baseFee * tiraj) - (fee * tiraj)

                                const obj = {
                                    tiraj: tiraj,
                                    sood: sood,
                                    fee: fee,
                                    price: price
                                }
                                if (!ret.some(item => item.tiraj === obj.tiraj)) {
                                    ret.push(obj)
                                }
                                counter++
                            }
                        }
                    }
                }

                else if (this.salePageStatus.salePage.TPS_FID_NumberType == 'عددی') {
                    let basePrice = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, this.salePageStatus.tiraj, 1)
                    if (this.withTax) {
                        const valueAddedTax = await this.valueAddedTax()
                        basePrice = basePrice + (basePrice * valueAddedTax)
                    }

                    const baseFee = basePrice / this.salePageStatus.tiraj

                    let counter = 0
                    for (var i = 0; i <= 4; i++) {
                        var tiraj = Number(this.salePageStatus.tiraj) + Number(i * this.salePageStatus.salePage.TPS_FNumberStep)

                        if (tiraj < this.salePageStatus.salePage.TPS_FNumberMin)
                            tiraj = this.salePageStatus.salePage.TPS_FNumberMin

                        if (tiraj <= this.salePageStatus.salePage.TPS_FNumberMax) {
                            let price = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, tiraj, 1)
                            if (this.withTax)
                                price = this.priceWithValueAddedTax(this.salePageStatus.salePage, price)

                            const fee = price / tiraj
                            const sood = (baseFee * tiraj) - (fee * tiraj)

                            const obj = {
                                tiraj: tiraj,
                                sood: sood,
                                fee: fee,
                                price: price
                            }

                            if (!ret.some(item => item.tiraj === obj.tiraj)) {
                                ret.push(obj)
                            }
                        }
                    }
                } if (this.salePageStatus.salePage.TPS_FID_NumberType == 'انتخابی' || this.salePageStatus.salePage.TPS_FID_NumberType == 'پلکانی') {
                    if (this.salePageStatus.salePage.TPS_FIDs_NumberList && this.salePageStatus.salePage.TPS_FIDs_NumberList.length > 0) {

                        let basePrice = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, this.salePageStatus.tiraj, 1)
                        if (this.withTax) {
                            const valueAddedTax = await this.valueAddedTax()
                            basePrice = basePrice + (basePrice * valueAddedTax)
                        }

                        const baseFee = basePrice / this.salePageStatus.tiraj

                        const selectedTirajIndex = this.salePageStatus.salePage.TPS_FIDs_NumberList.findIndex(t => t == this.salePageStatus.tiraj)
                        let counter = 0
                        for (var i = 0; i <= this.salePageStatus.salePage.TPS_FIDs_NumberList.length - 1; i++) {
                            if (i >= selectedTirajIndex && counter <= 4) {
                                const tiraj = this.salePageStatus.salePage.TPS_FIDs_NumberList[i]
                                let price = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, tiraj, 1)
                                if (this.withTax) {
                                    const valueAddedTax = await this.valueAddedTax()
                                    price = price + (price * valueAddedTax)
                                }

                                const fee = price / tiraj
                                const sood = (baseFee * tiraj) - (fee * tiraj)

                                const obj = {
                                    tiraj: tiraj,
                                    sood: sood,
                                    fee: fee,
                                    price: price
                                }

                                if (!ret.some(item => item.tiraj === obj.tiraj)) {
                                    ret.push(obj)
                                }
                                counter++
                            }
                        }
                    }
                }

                else if (this.salePageStatus.salePage.TPS_FID_NumberType == 'عددی') {
                    let basePrice = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, this.salePageStatus.tiraj, 1)
                    if (this.withTax) {
                        const valueAddedTax = await this.valueAddedTax()
                        basePrice = basePrice + (basePrice * valueAddedTax)
                    }

                    const baseFee = basePrice / this.salePageStatus.tiraj

                    let counter = 0
                    for (var i = 0; i <= 4; i++) {
                        var tiraj = Number(this.salePageStatus.tiraj) + Number(i * this.salePageStatus.salePage.TPS_FNumberStep)

                        if (tiraj < this.salePageStatus.salePage.TPS_FNumberMin)
                            tiraj = this.salePageStatus.salePage.TPS_FNumberMin

                        if (tiraj <= this.salePageStatus.salePage.TPS_FNumberMax) {
                            let price = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, tiraj, 1)
                            if (this.withTax) {
                                const valueAddedTax = await this.valueAddedTax()
                                price = price + (price * valueAddedTax)
                            }

                            const fee = price / tiraj
                            const sood = (baseFee * tiraj) - (fee * tiraj)

                            const obj = {
                                tiraj: tiraj,
                                sood: sood,
                                fee: fee,
                                price: price
                            }

                            if (!ret.some(item => item.tiraj === obj.tiraj)) {
                                ret.push(obj)
                            }
                        }
                    }
                }
            }
            this.priceRows = ret
        }
    },

    watch: {
        "salePageStatus.changed": {
            handler(newValue, oldValue) {
                this.setPriceRows()
            },
            immediate: true
        },
    }
}
</script>

<style lang="scss" >
.selectors {
    .v-input__slot {
        margin-bottom: 0px !important;
    }

    label {
        font-size: 14px;
    }

    //   .v-messages{
    //     display: none !important;
    // }
}

.titleRow {
    height: 32px;
    text-align: center !important;
}
</style>