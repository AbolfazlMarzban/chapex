<template>
    <div v-if="readonly">
        <v-icon v-if="isSelected(optionValue.TD_FID)" color="blue" size="48">mdi-link-box</v-icon>
    </div>
    <div v-else style="cursor: pointer;">
        <!-- {{ product.TGO_FID }} -->
        <v-icon v-if="isSelected(optionValue.TD_FID)" color="blue" size="48"
            @click="unlink(optionValue)">mdi-link-box</v-icon>
        <v-icon v-else color="#E0E0E0" size="48" @click="link(optionValue)">mdi-link-box-outline</v-icon>
    </div>
</template>

<script>
import saleManageMixin from "../../_mixins/saleManageMixin";
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";

export default {
    props: ["salePage", "readonly", "optionValue", "product"],
    mixins: [saleManageMixin, saleDataMixin],

    methods: {
        isSelected(optionValueId) {
            const productOptionValues = this.getProductOptionValues(this.salePage, this.product.TGO_FID);

            const index = productOptionValues.findIndex(pov => pov.TGPV_FID_Value == optionValueId && pov.TGPV_FID_Product == this.product.TGO_FID && pov.TGPV_FDelete == 0)

            if (index > -1)
                return true

            return false
        },

        select(item) {

            const productOptionValues = this.getProductOptionValues(this.salePage, this.product.TGO_FID)
            var product_option = productOptionValues.find(pov => pov.TGPV_FDelete == 0 && pov.TGPV_FID_Value == item.TGPV_FID_Value);

            if (!this.isSelected(item.TD_FID)) {
                if (product_option)
                    product_option.TGPV_FDelete = 0;
                else {
                    this.$emit('addObject', item)
                }
            }
            else {
                if (product_option) {
                    product_option.TGPV_FDelete = 1;
                }
            }
        },

        link(optionValue) {
            this.$emit('addOptionValue', optionValue)
        },

        unlink(optionValue) {
            this.$emit('removeOptionValue', optionValue)
        },
    }
}
</script>