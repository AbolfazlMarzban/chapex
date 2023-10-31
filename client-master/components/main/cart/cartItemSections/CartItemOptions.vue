<template>
    <div class="product-info-pan mb-4 pb-4 pt-0">
        <!-- <label @click="showDetails = !showDetails" style="cursor:pointer" class="my-lbl-title-14">مشخصات تولیدی
            محصول</label>

        <v-btn v-if="showDetails" @click="showDetails = false" icon class="float-left">
            <v-icon>mdi-chevron-up</v-icon>
        </v-btn>

        <v-btn v-else @click="showDetails = true" icon class="float-left">
            <v-icon>mdi-chevron-down</v-icon>
        </v-btn> -->

        <!-- <transition-group tag="div" name="slide"> -->
            <!-- v-if="showDetails"  -->
            <v-row v-for="selectedChildId in item.TOD_FID_SelectedOptions" :key="selectedChildId"
                class="mt-2 productDetail">
                <v-col cols="4" class="pa-1">
                    <span class="child-name">{{ getOptionName_byOptionValueId(salePage, selectedChildId) }}</span>
                </v-col>
                <v-col cols="8" class="pa-1">
                    <span class="child-name">{{ getOptionValueName(salePage, selectedChildId) }}</span>
                    <span v-if="getRelatedGood_FTag(salePage, selectedChildId, item.TOD_FID_Goods)">({{
                        getRelatedGood_FTag(salePage, selectedChildId, item.TOD_FID_Goods)
                    }})</span>
                </v-col>
            </v-row>
        <!-- </transition-group> -->
    </div>
</template>

<script>
import saleDataMixin from '../../sale/_mixins/saleDataMixin';

export default {
    props: ["salePage", "item"],
    mixins: [saleDataMixin],
    data() {
        return {
            showDetails: false,
        }
    },
}
</script>

<style>
.productDetail {
    font-size: 14px;
}

.slide-enter-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}
</style>