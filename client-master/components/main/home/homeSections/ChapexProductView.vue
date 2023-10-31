<template>
    <v-row>
        <v-col cols="12">
            <v-expansion-panels>
                <v-expansion-panel v-for="category in categories" :key="category.TD_FID" class="category-box my-2" id="exp">
                    <v-expansion-panel-header class="cat-header">
                        <v-row>
                            <v-col cols="12" class="d-flex justify-center flex-column flex-wrap align-center">
                                <h2>{{ category.TD_FName }}</h2>
                                <v-divider class="mt-2" width="100%"></v-divider>
                                <v-row v-if="getCategorySalePages(salePageList,category).length > 0" class="justify-center">
                                    <v-col cols="12" lg="4" md="5" sm="6" v-for="sp in getCategorySalePages(salePageList,category)" :key="sp.TD_FID"
                                        class="px-xl-5 px-lg-5 px-md-5 px-sm-1 px-0">
                                        <SaleCard :salePage="sp" class="salecards" @click.native.stop />
                                    </v-col>
                                </v-row> 
                            </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <p v-if="category.TD_FComment" class="cat-comment">
                            {{ category.TD_FComment }}
                        </p>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
</template>

<script>
import homeMixins from "../_mixins/homeMixins";
import SaleCard from "./ProductViewSections/SaleCard.vue";

export default {
    mixins: [homeMixins],
    data() {
        return {
            categories: null,
            salePageList: null,
        };
    },
    async mounted() {
        const result = await this.getSalePageList();
        this.salePageList = result.pageSaleList;
        this.categories = result.index_category;
    },
    components: { SaleCard }
}
</script>