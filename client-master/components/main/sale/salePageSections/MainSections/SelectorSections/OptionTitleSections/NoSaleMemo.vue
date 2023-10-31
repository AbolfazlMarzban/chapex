<template>
    <Transition name="slide-fade">
        <span class="option-title-noSale-memo pr-xl-3 pr-lg-3 pr-md-3 pr-sm-3" v-if="!canSale()" @click="disableSelected()">
            <v-icon>mdi-emoticon-sad-outline</v-icon>
            <span>امکان فروش غیرفعال شده است. لطفا انتخاب خود را تغییر دهید</span>
        </span>
    </Transition>
</template>                        
  
<script>
import userSaleMixin from '../../../../_mixins/userSaleMixin';

export default {
    props: ["option"],
    inject: ["salePageStatus"],
    mixins: [userSaleMixin],
    methods: {
        canSale() {
            const check = this.option_CanSale(this.salePageStatus.salePage, this.salePageStatus.finalProduct, this.option)
            return check
        },
        disableSelected() {
            const selectedChild = this.getAnySet(this.salePageStatus.salePage, this.option.TD_FID)
            var index = this.selectedChildren.findIndex(c => c.TD_FID == selectedChild.TD_FID)

            if (index > -1)
                this.selectedChildren.splice(index, 1)

            this.$emit('userSelectedOptionChanged')
        },
    },
}
</script>
  
<style scoped>
.optionName {
    font-family: boldbakhtiari !important;
}
</style>