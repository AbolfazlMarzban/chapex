<template>
    <div>
        <v-dialog v-model="showMore" width="600" scrollable>
            <v-card class="px-3 pb-3">
                <v-card-title class="d-flex justify-end">
                    <v-icon color="#016670" @click="$emit('closePriceDialog')">mdi-close</v-icon>
                </v-card-title>
                <!-- <v-card-subtitle></v-card-subtitle> -->
                <v-card-text>
                    <v-row class="pt-2">
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
                    <v-row v-for="(priceRow, i) in priceRows()" :key="i" class="pa-0">
                        <SelectedRow v-if="priceRow.tiraj == salePageStatus.tiraj" :priceRow="priceRow" :state="state" />
                        <NotSelectedRow v-else :priceRow="priceRow" :state="state" />
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import saleDataMixin from '../../../_mixins/saleDataMixin';
import SelectedRow from './PriceTableSelectedRow.vue'
import NotSelectedRow from './PriceTableNotSelectedRow.vue'

export default {
    props: ["showMore"],
    inject: ["salePageStatus"],
    mixins: [saleDataMixin],
    components: { SelectedRow, NotSelectedRow },
    data() {
        return {
            state: 'feeBase',
        }
    },
    methods: {
        priceRows() {
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
                            // if (i >= selectedTirajIndex && counter <= 4) {
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
                            // }
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
                            if (i >= selectedTirajIndex && counter <= 4) {
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

<style></style>