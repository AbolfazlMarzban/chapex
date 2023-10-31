<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel class="category-box my-2" id="exp">
        <v-expansion-panel-header class="cat-header">
          <v-row>
            <v-col cols="12" class="d-flex justify-center flex-column flex-wrap align-center">
              <h2 v-if="element.TFF_FPlaceHolder">{{ element.TFF_FPlaceHolder }}</h2>
              <v-divider v-if="element.TFF_FPlaceHolder" class="mt-2" width="100%"></v-divider>
              <v-row v-if="element.items && element.items.length > 0" class="justify-center my-5">
                <template v-for="sp in element.items">
                  <v-col v-if="sp.TFF_FDelete == 0" :key="sp.id" cols="12" lg="4" md="5" sm="6"
                    class="px-xl-5 px-lg-5 px-md-5 px-sm-1 px-0 mt-5">
                    <!-- <SaleCard  :salePage="sp" class="salecards" @click.native.stop /> -->
                    <div>
                      <a :href="'/salePage/' + sp.link">
                        <v-card class="mx-auto prodcard" max-width="344">
                          <v-list-item three-line>
                            <v-list-item-avatar size="113" color="white">
                              <img v-if="sp.picture" :src="setImageUrl(sp.picture.thumbnail_path)
                                " :alt="sp.picture.alt" />
                              <img v-else :src="setImageUrl(sp.image)" :alt="sp.title" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="text-h5 mb-1">
                                <div class="d-flex flex-column"
                                  style="text-align: start; padding-right: 10px; padding-top: 10px;">
                                  <label style="cursor: pointer">{{
                                    sp.title
                                  }}</label>
                                  <div class="prod-action">
                                    <v-icon rounded class="prodbox-icon">mdi-currency-usd</v-icon>
                                    <span>محاسبه قیمت</span>
                                  </div>
                                </div>
                              </v-list-item-title>
                              <v-list-item-subtitle> </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </a>
                    </div>
                  </v-col>
                </template>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p v-if="element.TFF_FToolTip" class="cat-comment">
            {{ element.TFF_FToolTip }}
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import "../../../../../../assets/style/home/pageSaleList.scss"
export default {
  props: ["element"],
  data() {
    return {
      category: {}
    };
  },

  mounted() {
    console.log('element', this.element);
  }
};
</script>

<style lang="scss" src="../../../../../../assets/style/saleCard/saleCard.scss" scoped>
.prodpic {
  width: 100%;
}

#label {
  font-weight: bold;
  color: #016670;
}

.prodpic :hover {
  cursor: pointer;
}

label {
  font-weight: bold !important;
  font-size: 20px !important;
  color: #016670 !important;
}
</style>
