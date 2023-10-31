<template>
    <div>
        <v-row class="pt-5 pt-xl-2 pt-lg-2 pt-md-2">
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
            <SelectedRow v-if="priceRow.tiraj == selectedTiraj" :sood="priceRow.sood" :tiraj="priceRow.tiraj"
                :fee="priceRow.fee" :price="priceRow.price" :state="state" />
            <NotSelectedRow v-else :sood="priceRow.sood" :tiraj="priceRow.tiraj" :fee="priceRow.fee" :price="priceRow.price"
                :state="state" @tirajChanged="t => $emit('tirajChanged', t)" />
        </v-row>
        <v-row class="mt-4 d-flex justify-center">
            <v-btn v-if="!showMore" text block color="#016670" @click="showMore = true" class="show-more" rounded> مشاهده
                بیشتر</v-btn>
            <!-- <PriceDialog :showMore="showMore" :finalProduct="finalProduct" :salePage="salePage"
                @closePriceDialog="showMore = false" :selectedTiraj="selectedTiraj" :selectedChildren="selectedChildren" /> -->
        </v-row>
        <v-row class="selectors align-center mt-2">
            <v-col cols="12" xl="7" lg="7" md="7" class="px-0 pb-0">
                <v-radio-group row v-model="state" class="mt-0">
                    <v-radio label="قیمت واحد" value="feeBase" class="mr-0" color="#016670"></v-radio>
                    <v-radio label="قیمت نهایی" value="totalBase" color="#016670"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" xl="5" lg="5" md="5" class="px-0  py-0">
                <v-switch v-model="withTax" :value="withTax" flat label="با احتساب مالیات"
                    class="mt-xl-2 mt-lg-2 mt-md-2 mt-0" color="#016670"></v-switch>
            </v-col>

        </v-row>
    </div>
</template>

<script>
import NotSelectedRow from '../../sale/salePageSections/SidebarSections/PriceTableSections/PriceTableNotSelectedRow.vue';
import SelectedRow from '../../sale/salePageSections/SidebarSections/PriceTableSections/PriceTableSelectedRow.vue';
import saleDataMixin from '../../sale/_mixins/saleDataMixin';

export default {
    props: ["salePage", "selectedTiraj", "finalProduct", "selectedChildren"],
    mixins: [saleDataMixin],
    components: { SelectedRow, NotSelectedRow },
    data() {
        return {
            withTax: false,
            state: 'feeBase',
            showMore: false
        }
    },
    mounted() {
        this.$vuetify.rtl = true;
    },
    methods: {
        priceRows(limit = 4) {
            let ret = []
            if (this.finalProduct) {
                if (this.salePage.TPS_FID_NumberType == 'انتخابی' || this.salePage.TPS_FID_NumberType == 'پلکانی') {
                    if (this.salePage.TPS_FIDs_NumberList && this.salePage.TPS_FIDs_NumberList.length > 0) {

                        let basePrice = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, this.selectedTiraj, 1)
                        if (this.withTax)
                            basePrice = this.priceWithValueAddedTax(this.salePage, basePrice)

                        const baseFee = basePrice / this.selectedTiraj

                        const selectedTirajIndex = this.salePage.TPS_FIDs_NumberList.findIndex(t => t == this.selectedTiraj)
                        // console.log('selected Tiraj index', selectedTirajIndex)
                        let counter = 0
                        for (var i = 0; i <= this.salePage.TPS_FIDs_NumberList.length - 1; i++) {
                            if (this.showMore) {
                                const tiraj = this.salePage.TPS_FIDs_NumberList[i]
                                let price = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, tiraj, 1)
                                if (this.withTax)
                                    price = this.priceWithValueAddedTax(this.salePage, price)

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
                                    const tiraj = this.salePage.TPS_FIDs_NumberList[i]
                                    let price = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, tiraj, 1)
                                    if (this.withTax)
                                        price = this.priceWithValueAddedTax(this.salePage,price)

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

                else if (this.salePage.TPS_FID_NumberType == 'عددی') {
                    let basePrice = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, this.selectedTiraj, 1)
                    if (this.withTax)
                        basePrice = this.priceWithValueAddedTax(this.salePage,basePrice)

                    const baseFee = basePrice / this.selectedTiraj

                    let counter = 0
                    for (var i = 0; i <= 4; i++) {
                        var tiraj = Number(this.selectedTiraj) + Number(i * this.salePage.TPS_FNumberStep)

                        if (tiraj < this.salePage.TPS_FNumberMin)
                            tiraj = this.salePage.TPS_FNumberMin

                        if (tiraj <= this.salePage.TPS_FNumberMax) {
                            let price = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, tiraj, 1)
                            if (this.withTax)
                                price = this.priceWithValueAddedTax(this.salePage,price)

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
                } if (this.salePage.TPS_FID_NumberType == 'انتخابی' || this.salePage.TPS_FID_NumberType == 'پلکانی') {
                    if (this.salePage.TPS_FIDs_NumberList && this.salePage.TPS_FIDs_NumberList.length > 0) {

                        let basePrice = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, this.selectedTiraj, 1)
                        if (this.withTax)
                            basePrice = this.priceWithValueAddedTax(this.salePage,basePrice)

                        const baseFee = basePrice / this.selectedTiraj

                        const selectedTirajIndex = this.salePage.TPS_FIDs_NumberList.findIndex(t => t == this.selectedTiraj)
                        let counter = 0
                        for (var i = 0; i <= this.salePage.TPS_FIDs_NumberList.length - 1; i++) {
                            if (this.showMore) {
                                const tiraj = this.salePage.TPS_FIDs_NumberList[i]
                                let price = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, tiraj, 1)
                                if (this.withTax)
                                    price = this.priceWithValueAddedTax(this.salePage,price)

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
                                    const tiraj = this.salePage.TPS_FIDs_NumberList[i]
                                    let price = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, tiraj, 1)
                                    if (this.withTax)
                                        price = this.priceWithValueAddedTax(this.salePage,price)

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

                else if (this.salePage.TPS_FID_NumberType == 'عددی') {
                    let basePrice = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, this.selectedTiraj, 1)
                    if (this.withTax)
                        basePrice = this.priceWithValueAddedTax(this.salePage,basePrice)

                    const baseFee = basePrice / this.selectedTiraj

                    let counter = 0
                    for (var i = 0; i <= 4; i++) {
                        var tiraj = Number(this.selectedTiraj) + Number(i * this.salePage.TPS_FNumberStep)

                        if (tiraj < this.salePage.TPS_FNumberMin)
                            tiraj = this.salePage.TPS_FNumberMin

                        if (tiraj <= this.salePage.TPS_FNumberMax) {
                            let price = this.calcPriceInCart(this.salePage, this.finalProduct.TOD_FID_Goods, this.selectedChildren, tiraj, 1)
                            if (this.withTax)
                                price = this.priceWithValueAddedTax(this.salePage,price)

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
            console.log('ret', ret)
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

@media (max-width:600px) {
    .titleRow {
        font-size: 13px !important;
    }
}

.show-more {
    span {
        letter-spacing: normal !important;
        color: #016670;
        font-family: boldbakhtiari !important;
    }
}
</style>