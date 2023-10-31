<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel class="categoryPage-box my-2" id="exp">
            <v-expansion-panel-header class="cat-header" @click.native.stop style="cursor:default">
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex justify-center flex-column flex-wrap align-center"
                >
                  <h2>{{ category.TD_FName }}</h2>
                  <v-divider class="mt-2" width="100%"></v-divider>
                  <v-row class="justify-center my-xl-5 my-lg-5">
                    <v-col
                      cols="12"
                      lg="4"
                      md="5"
                      sm="6"
                      v-for="sp in getCategoryPages(salePageList, category)"
                      :key="sp.TD_FID"
                      class="px-xl-5 px-lg-5 px-md-5 px-sm-1 px-0"
                    >
                      <SaleCard :salePage="sp" @click.native.stop />
                    </v-col>
                    <div v-if="category.TD_FComment" v-html="category.TD_FComment" class="cat-comment">
                    </div>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import "../../../assets/style/home/pageSaleList.scss";
import homeMixins from "../home/_mixins/homeMixins";
import SaleCard from "../home/homeSections/ProductViewSections/SaleCard.vue";
export default {
  props: ["category"],
  mixins: [homeMixins],
  data() {
    return {
      salePageList: []
    };
  },
  async mounted() {
    const result = await this.getSalePageList();
    console.log("result", result);
    this.salePageList = result.pageSaleList;
  },
  methods: {
    getCategoryPages(salePageList, category) {
      if (salePageList && salePageList.length > 0)
        return salePageList.filter(sp => {
          if (sp.TPS_FIDs_Category == category.TD_FID) return true;

          if (category.children && category.children.length > 0) {
            for (var i = 0; i <= category.children.length - 1; i++) {
              if (category.children[i].TD_FID == sp.TPS_FIDs_Category)
                return true;
            }
          }
        });
    }
  },
  components: { SaleCard }
};
</script>
