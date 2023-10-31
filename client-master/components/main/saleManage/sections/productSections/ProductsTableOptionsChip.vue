<template>
    <div class="pa-1 ma-1">
        <template v-for="option in salePage.options">
            <v-chip
                v-if="selectedCount(product, option) > 0 && selectedCount(product, option) == getOptionValues(salePage, option.TD_FID).length"
                small class="ml-1 mb-1 pa-2" color="green" text-color="white">

                <span>{{ option.TD_FName }}</span>

                <v-avatar right class="green darken-4">{{ selectedCount(product, option) + '/' +
                    getOptionValues(salePage, option.TD_FID).length
                }}
                </v-avatar>

            </v-chip>

            <v-chip v-else-if="selectedCount(product, option) > 0" small class="ml-1 mb-1 pa-2" color="blue"
                text-color="white">

                <span>{{ option.TD_FName }}</span>

                <v-avatar right class="blue darken-4">{{ selectedCount(product, option) + '/' +
                    getOptionValues(salePage, option.TD_FID).length
                }}
                </v-avatar>

            </v-chip>

            <v-chip v-else small class="ml-1 mb-1 pa-2">

                <span>{{ option.TD_FName }}</span>

                <v-avatar right class="grey">{{ selectedCount(product, option) + '/' + getOptionValues(salePage,
                    option.TD_FID).length }}
                </v-avatar>

            </v-chip>
        </template>
    </div>
</template>

<script>

import saleManageMixin from '../../_mixins/saleManageMixin';
import saleDataMixin from '../../../sale/_mixins/saleDataMixin';

export default {
    props: ["salePage", "product"],
    mixins: [saleManageMixin, saleDataMixin],
    methods: {
        selectedCount(product, option) {
            var count = 0
            const products = this.getProductOptionValues(this.salePage, this.product.TGO_FID)
            if (products) {
                const optionValues = this.getOptionValues(this.salePage, option.TD_FID)
                optionValues.forEach(child => {
                    var index = products.findIndex(o => o.TGPV_FDelete == 0 && o.TGPV_FID_Value == child.TD_FID)

                    if (index > -1)
                        count++
                });
            }
            return count
        },
    },
}
</script>