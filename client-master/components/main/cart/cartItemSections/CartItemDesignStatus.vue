<template>
    <div class="design-status-pan mb-4">
        <v-container class="pa-1 pt-0">
            <div class="status">
                <v-row class="justify-center pt-0">
                    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                        <div @click="removeDesign()" class="sbox" :class="[{ activeBox: item.TOD_FDesignStatus == 0 }]">
                            <span>فایل طراحی را دارم</span>
                        </div>
                    </v-col>

                    <v-col v-if="selectDesignOptionValues(salePage, item.TOD_FID_SelectedOptions)" cols="12" sm="12" md="6"
                        lg="6" xl="6">
                        <div @click="addDesign()" class="sbox" :class="[{ activeBox: item.TOD_FDesignStatus == 1 }]">
                            <span>طراحی توسط تیم چاپکس</span>
                        </div>
                    </v-col>
                </v-row>

                <v-row v-if="item.TOD_FDesignStatus == 0">
                    <v-col v-if="selectReviewOptionValues(salePage, item.TOD_FID_SelectedOptions)" cols="12">
                        <v-switch class="pa-0 ma-0 mt-2 text-right" v-model="item.TOD_FReviewNeed"
                            :value="item.TOD_FReviewNeed" flat @change="changeReview"
                            :label="`بررسی تخصصی فایل طراحی شما ${numberSeparate(calcReviewPriceInCart(salePage, item.TOD_FID_Goods, item.TOD_FID_SelectedOptions))} هزار تومان`"
                            :true-value="1" :false-value="0"></v-switch>
                    </v-col>
                </v-row>

                <v-row v-if="item.TOD_FDesignStatus == 1">
                    <v-col v-if="selectReviewOptionValues(salePage, item.TOD_FID_SelectedOptions)" cols="12">
                        <span>هزینه طراحی بصورت جداگانه به مبلغ</span>
                        <span>{{ numberSeparate(calcDesignPriceInCart(salePage,
                            item.TOD_FID_Goods, item.TOD_FID_SelectedOptions)) }}
                            تومان</span>
                        <span>به صورتحساب شما اضافه شده است</span>
                    </v-col>
                </v-row>

            </div>

        </v-container>
    </div>
</template>

<script>
import userSaleMixin from "../../sale/_mixins/userSaleMixin"
import saleDataMixin from "../../sale/_mixins/saleDataMixin";
import designMixin from "../../sale/_mixins/designMixin";
import cartDetailMixins from "../../cart/_mixins/cartDetailMixins";

export default {
    props: ["item", "salePage", "finalPrice"],
    mixins: [userSaleMixin, saleDataMixin, cartDetailMixins, designMixin],
    data() {
        return {
            reviewPrice: 0,
            showDetails: false,
        };
    },
    methods: {

        async addDesign() {

            const designChilds = this.selectDesignOptionValues(this.salePage, this.item.TOD_FID_SelectedOptions)
            const reviewChilds = this.selectReviewOptionValues(this.salePage, this.item.TOD_FID_SelectedOptions)

            if (designChilds.length > 0) {
                designChilds.forEach(dov => {
                    this.item.TOD_FID_SelectedOptions.push(dov.TD_FID)
                })
                reviewChilds.forEach(rov => {
                    const index = this.item.TOD_FID_SelectedOptions.findIndex(so => so == rov.TD_FID)
                    if (index > -1)
                        this.item.TOD_FID_SelectedOptions.splice(index, 1)
                })
                this.item.TOD_FDesignStatus = 1
                this.item.TOD_FReviewNeed = 0

                const result = await this.updateCartItem(this.salePage, this.item)
            }
        },
        async removeDesign() {
            const designChilds = this.selectDesignOptionValues(this.salePage, this.item.TOD_FID_SelectedOptions)

            if (designChilds.length > 0) {

                designChilds.forEach(dov => {
                    dov.isSelected = null
                    const index = this.item.TOD_FID_SelectedOptions.findIndex(so => so == dov.TD_FID)
                    if (index > -1)
                        this.item.TOD_FID_SelectedOptions.splice(index, 1)
                })
            }

            this.item.TOD_FDesignStatus = 0
            this.item.TOD_FReviewNeed = 0

            const result = await this.updateCartItem(this.salePage, this.item)
        },
        async changeReview(value) {
            if (value)
                await this.addReview()
            else
                await this.removeReview()

        },
        async addReview() {
            const reviewChilds = this.selectReviewOptionValues(this.salePage, this.item.TOD_FID_SelectedOptions)

            if (reviewChilds.length > 0) {
                reviewChilds.forEach(rov => {
                    this.item.TOD_FID_SelectedOptions.push(rov.TD_FID)
                    // rov.isSelected = 1
                })

                this.item.TOD_FDesignStatus = 0
                this.item.TOD_FReviewNeed = 1

                const result = await this.updateCartItem(this.salePage, this.item)
            }
        },
        async removeReview() {
            this.item.TOD_FReviewNeed = 0

            const reviewChilds = this.selectReviewOptionValues(this.salePage, this.item.TOD_FID_SelectedOptions)

            if (reviewChilds.length > 0) {
                reviewChilds.forEach(rov => {
                    // rov.isSelected = null

                    const index = this.item.TOD_FID_SelectedOptions.findIndex(so => so == rov.TD_FID)
                    if (index > -1)
                        this.item.TOD_FID_SelectedOptions.splice(index, 1)
                })
            }

            const result = await this.updateCartItem(this.salePage, this.item)
        },

    },

    async mounted() {
        this.$vuetify.rtl = true;
        // this.reviewPrice = this.calcReviewPrice(this.salePage, this.item.TOD_FID_SelectedOptions)
    },
}
</script>
<style>
.v-list-item__content {
    font-family: bakhtiari;
}
</style>