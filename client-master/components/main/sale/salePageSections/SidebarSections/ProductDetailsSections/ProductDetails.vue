<template>
  <v-expansion-panel style="border-radius: 20px !important;" class="exp-btn">
    <v-expansion-panel-header color="#F2F2F2" class="py-0" style="min-height: 35px !important;">
      <v-row class="align-center">
        <v-col cols="7">
          <div class="expansionTitle">
            <span>مشخصات محصول انتخاب شده</span>
          </div>
        </v-col>
      </v-row>

    </v-expansion-panel-header>

    <v-expansion-panel-content style="background: #f2f2f2 !important;">
      <v-row class="salesidebar ml-lg-16 mt-0">
        <v-col cols="12" lg="12" md="12" xl="12" class="pa-0 d-flex">
          <v-container v-if="salePageStatus.salePage.options">
            <v-row v-for="option in salePageStatus.salePage.options.filter((o) => o.TD_FType == 21703)"
              :key="option.TD_FID" class="mt-0">
              <v-col cols="4" class="py-2">
                <span class="option-name">{{ option.TD_FName }}:</span>
              </v-col>

              <v-col cols="8" class="py-2">
                <SelectedOptionValue :option="option" />

              </v-col>
            </v-row>
            <v-col cols="4" class="d-flex align-center justify-center pb-0 pr-0">
              <v-btn text @click.stop="clearSelection('All')" dense class="clear-btn" block>
                <v-icon>mdi-close-circle</v-icon>
                <span>پاک کردن انتخاب ها</span>
              </v-btn>
            </v-col>
          </v-container>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import SelectedOptionValue from './SelectedOptionValue.vue';



export default {
  inject: ["salePageStatus","clearSelection"],
  components: { SelectedOptionValue }
}
</script>
<style lang="scss">
/* .exp-btn:hover{
  background:none !important;
} */
.exp-btn {
  .v-expansion-panel-header:before {
    background-color: transparent !important;
  }
}
</style>