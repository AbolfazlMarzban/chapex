<template>
    <span class="child-name" v-if="anySet">
        <span>{{ optionValueName }}</span>
        <span v-if="goodTag">({{ goodTag }})</span>
    </span>
    <span v-else-if="option.TD_FRequired == 1" class="select-error">«انتخاب نشده»</span>
    <span v-else class="select-warn">«اختیاری»</span>
</template>

<script>
import userSaleMixin from '../../../_mixins/userSaleMixin';
import saleDataMixin from '../../../_mixins/saleDataMixin';

export default {
    props: ["option"],
    inject: ["salePageStatus"],
    mixins: [userSaleMixin, saleDataMixin],

    data() {
        return {
            anySet: false,
            optionValueName: '',
            goodTag: null,
        }
    },

    mounted() {
        this.setAnySet()
    },

    methods: {
        setAnySet() {
            this.anySet = this.hasAnySet(this.salePageStatus.salePage, this.option.TD_FID)

            const selectedOptionValue = this.getAnySet(this.salePageStatus.salePage, this.option.TD_FID)

            if (selectedOptionValue) {
                this.optionValueName = this.getOptionValueName(this.salePageStatus.salePage, selectedOptionValue.TD_FID)
                this.goodTag = this.getRelatedGoodTag(selectedOptionValue.TD_FID, this.salePageStatus.salePage)
            }

        },
    },


    watch: {
        "salePageStatus.changed": {
            handler(newValue, oldValue) {
                if (this.option) {
                    this.setAnySet()
                }
            },
            immediate: true
        },
    }
}
</script>