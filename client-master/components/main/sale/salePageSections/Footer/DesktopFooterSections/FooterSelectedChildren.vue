<template>
    <div v-if="salePageStatus.salePage.options">
        <span v-for="option in salePageStatus.salePage.options.filter((o) => o.TD_FType == 21703)">
            <span v-if="hasAnySet(salePageStatus.salePage, option.TD_FID)">
                <span>{{ optionValueName(option) }}</span>
                <span class="me-1">،</span>
            </span>
        </span>
    </div>
</template>


<script>
import userSaleMixin from '../../../_mixins/userSaleMixin';
import saleDataMixin from '../../../_mixins/saleDataMixin';

export default {
    inject: ["salePageStatus"],
    mixins: [userSaleMixin, saleDataMixin],

    methods: {
        optionValueName(option) {
            const selectedOptionValue = this.getAnySet(this.salePageStatus.salePage, option.TD_FID)

            if (selectedOptionValue) {
                return this.getOptionValueName(this.salePageStatus.salePage, selectedOptionValue.TD_FID)
            }
        },
    },
}
</script>