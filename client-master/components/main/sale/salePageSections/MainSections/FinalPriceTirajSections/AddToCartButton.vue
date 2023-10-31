<template>
    <div v-if="CheckUserAccess([11002])">

        <LazyAuthDialog v-if="loginDialog" @done="addOrder" />

        <v-btn rounded depressed block v-if="callUs()" class="call-btn" href="tel:02191017919">
            <span> تماس با 91017919-021 </span>
            <v-icon>mdi-phone</v-icon>
        </v-btn>
        <v-btn v-else :disabled="isDisabled()" rounded depressed block class="order-btn" @click="addOrder">شروع
            ثبت
            سفارش</v-btn>

        <div class="warnbox mt-3 mb-0" v-if="showReqWarn()">
            <span>برای ادامه برخی از خصوصیت ها انتخاب نشده اند.</span>
        </div>
    </div>

    <div v-else>
        <v-btn v-if="isDisabled()" :disabled="true" rounded depressed block class="order-btn">شروع
            ثبت
            سفارش</v-btn>

        <v-btn rounded depressed block v-else class="order-btn" href="tel:02191017919">
            <span> 021-91017919 </span>
            <v-icon>mdi-phone</v-icon>
        </v-btn>

        <div class="warnbox mt-3 mb-0" v-if="showReqWarn()">
            <span>برای ادامه برخی از خصوصیت ها انتخاب نشده اند.</span>
        </div>
    </div>
</template>   

<script>
import cartDetailMixins from "../../../../cart/_mixins/cartDetailMixins";
import cartDetailVariables from "../../../../cart/_mixins/cartDetailVariables";
import userSaleMixin from "../../../_mixins/userSaleMixin";
import saleDataMixin from "../../../_mixins/saleDataMixin";
import designMixin from "../../../_mixins/designMixin";

export default {
    inject: ["salePageStatus"],
    mixins: [cartDetailMixins, cartDetailVariables, userSaleMixin, saleDataMixin, designMixin],

    data() {
        return {
            loginDialog: false,
        }
    },
    methods: {
        async addOrder() {

            if (!this.CheckUserAccess([11002]))
                return

            if (!this.isAuthenticated) {
                this.loginDialog = true
            }
            else {
                this.loginDialog = false

                let selectedChildrenArr = []
                this.salePageStatus.salePage.optionsValues.filter(ov => ov.isSelected).forEach(child => { selectedChildrenArr.push(child.TD_FID) });

                let TOD_FID_Design = 0
                if (this.salePageStatus.designStatus > 0) {
                    const design = this.getDesignOptionValues(this.salePageStatus.salePage)
                    if (design)
                        TOD_FID_Design = design.TD_FID
                }

                let TOD_FID_Review = 0
                if (this.salePageStatus.salePage.reviewNeed) {
                    const review = this.getReviewOptionValues(this.salePageStatus.salePage)
                    if (review)
                        TOD_FID_Review = review.TD_FID
                }

                const cartObj = {
                    seri: this.salePageStatus.seri,
                    TOD_FID_SalePage: this.salePageStatus.salePage.TPS_FID,
                    TOD_FName: this.salePageStatus.salePage.TPS_FTitle,
                    TOD_FID_Goods: this.salePageStatus.finalProduct.TGO_FID,
                    TOD_FOption: this.salePageStatus.finalProduct.TGO_FName,
                    TOD_FPrice: this.salePageStatus.finalPrice,
                    TOD_FCount: this.salePageStatus.tiraj,
                    TOD_FID_SelectedOptions: selectedChildrenArr,
                    TOD_FDesignStatus: this.salePageStatus.designStatus,
                    TOD_FID_Design: TOD_FID_Design,
                    TOD_FReviewNeed: this.salePageStatus.salePage.reviewNeed,
                    TOD_FID_Review: TOD_FID_Review,
                }

                let result = await this.addToCart(0, cartObj, false, true)
            }
        },

        isDisabled() {
            let ret = false

            if (!this.salePageStatus.finalProduct)
                return true

            if (!this.salePageStatus.finalPrice)
                return true

            // console.log('designStatus', this.salePageStatus.designStatus);
            if (this.productHasDesignOptionValue(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID)) {
                if (this.salePageStatus.designStatus == -1) {
                    return true
                }
            }

            if (!this.allChildrenSelected(this.salePageStatus.salePage))
                return true


            this.salePageStatus.salePage.optionsValues.filter(ov => ov.isSelected).forEach(selectedChild => {
                const check = this.optionValue_CanSale(this.salePageStatus.salePage, this.salePageStatus.finalProduct, selectedChild)
                if (!check)
                    ret = true
            })
            return ret
        },

        callUs() {
            if (!this.salePageStatus.finalProduct)
                if (this.hasRequiredChildren(this.salePageStatus.salePage))
                    return true

            if (this.salePageStatus.finalProduct && this.hasRequiredChildren(this.salePageStatus.salePage) && !this.salePageStatus.finalPrice)
                return true
        },

        showReqWarn() {
            if (!this.hasRequiredChildren(this.salePageStatus.salePage))
                return true

            if (this.salePageStatus.finalProduct) {
                if (this.productHasDesignOptionValue(this.salePageStatus.salePage, this.salePageStatus.finalProduct.TGO_FID)) {
                    if (this.salePageStatus.designStatus == -1) {
                        return true
                    }
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.warnbox {
    text-align: center;
    font-size: 12px;
    font-family: bakhtiari !important;

    span {
        color: black;
    }
}
</style>