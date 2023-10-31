<template>
    <div>
        <v-row class="mt-4 pb-0">
            <v-col cols="12" class="text-center pb-0">
                <!-- <v-btn depressed block color="#016670" text @click="showTable = true">مشاهده لیست تیراژ و قیمت</v-btn> -->
                <span style="font-family: boldbakhtiari !important; color: #016670;" @click="showTable = true">مشاهده لیست
                    تیراژ و قیمت</span>
            </v-col>
        </v-row>



        <v-dialog v-model="showTable">
            <v-card class="pa-2">
                <div class="text-left">
                    <v-icon color="#016670" @click="showTable = false">mdi-close</v-icon>
                </div>
                <v-card-text>
                    <v-row class="pt-2">
                        <v-col cols="12" class="titleRow pa-1 pb-0">
                            <v-row style="margin-bottom: -10px;">
                                <v-col cols="1"></v-col>
                                <v-col cols="3" class="pb-0">تیراژ</v-col>
                                <v-col cols="4" class="pb-0" v-if="state == 'feeBase'">قیمت واحد</v-col>
                                <v-col cols="4" class="pb-0" v-else-if="state == 'totalBase'">قیمت کل</v-col>
                                <v-col cols="4" class="pb-0" style="color: #016670 !important;">سود شما</v-col>
                            </v-row>
                        </v-col>
                    </v-row>

                    <v-row v-for="(priceRow, index) in priceRows()" :key="index" class="pa-0" style="background: white;">
                        <SelectedRow v-if="priceRow.tiraj == salePageStatus.tiraj" :sood="priceRow.sood"
                            :tiraj="priceRow.tiraj" :fee="priceRow.fee" :price="priceRow.price" :state="state" />
                        <NotSelectedRow v-else :sood="priceRow.sood" :tiraj="priceRow.tiraj" :fee="priceRow.fee"
                            :price="priceRow.price" :state="state" />
                    </v-row>
                    <v-row class="mt-4 d-flex justify-center">
                        <v-btn v-if="!showMore" text block color="#016670" @click="showMore = true" class="show-more"
                            rounded> مشاهده بیشتر</v-btn>
                    </v-row>
                    <v-row class="selectors align-center mt-2">
                        <v-col cols="12" class="px-0 pb-0">
                            <v-radio-group row v-model="state" class="mt-0">
                                <v-radio label="قیمت واحد" value="feeBase" class="mr-0" color="#016670"></v-radio>
                                <v-radio label="قیمت نهایی" value="totalBase" color="#016670"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" class="px-0 py-0">
                            <v-switch v-model="withTax" :value="withTax" flat label="با احتساب مالیات" class="mt-0"
                                color="#016670"></v-switch>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>

        </v-dialog>

    </div>
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
            showTable: false,
            showMore: false
        }
    },
    mounted() {
        this.$vuetify.rtl = true;
    },
    methods: {
        priceRows(limit = 4) {
            let ret = []
            if (this.salePageStatus.finalProduct) {
                if (this.salePageStatus.salePage.TPS_FID_NumberType == 'انتخابی' || this.salePageStatus.salePage.TPS_FID_NumberType == 'پلکانی') {
                    if (this.salePageStatus.salePage.TPS_FIDs_NumberList && this.salePageStatus.salePage.TPS_FIDs_NumberList.length > 0) {

                        let basePrice = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, this.salePageStatus.tiraj, 1)
                        if (this.withTax)
                            basePrice = this.priceWithValueAddedTax(this.salePageStatus.salePage, basePrice)

                        const baseFee = basePrice / this.salePageStatus.tiraj

                        const selectedTirajIndex = this.salePageStatus.salePage.TPS_FIDs_NumberList.findIndex(t => t == this.salePageStatus.tiraj)
                        // console.log('selected Tiraj index', selectedTirajIndex)
                        let counter = 0
                        for (var i = 0; i <= this.salePageStatus.salePage.TPS_FIDs_NumberList.length - 1; i++) {
                            if (this.showMore) {
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
                            } else {
                                if (i >= selectedTirajIndex && counter <= limit) {
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
                }

                else if (this.salePageStatus.salePage.TPS_FID_NumberType == 'عددی') {
                    let basePrice = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, this.salePageStatus.tiraj, 1)
                    if (this.withTax)
                        basePrice = this.priceWithValueAddedTax(this.salePageStatus.salePage, basePrice)

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
                        if (this.withTax)
                            basePrice = this.priceWithValueAddedTax(this.salePageStatus.salePage, basePrice)

                        const baseFee = basePrice / this.salePageStatus.tiraj

                        const selectedTirajIndex = this.salePageStatus.salePage.TPS_FIDs_NumberList.findIndex(t => t == this.salePageStatus.tiraj)
                        let counter = 0
                        for (var i = 0; i <= this.salePageStatus.salePage.TPS_FIDs_NumberList.length - 1; i++) {
                            if (this.showMore) {
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
                            } else {
                                if (i >= selectedTirajIndex && counter <= limit) {
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
                }

                else if (this.salePageStatus.salePage.TPS_FID_NumberType == 'عددی') {
                    let basePrice = this.calcPrice(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID, this.salePageStatus.tiraj, 1)
                    if (this.withTax)
                        basePrice = this.priceWithValueAddedTax(this.salePageStatus.salePage, basePrice)

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
                }
            }
            return ret
        }
    }
}
</script>

<style lang="scss">
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
    font-family: boldbakhtiari !important;
    color: black;
}
</style>