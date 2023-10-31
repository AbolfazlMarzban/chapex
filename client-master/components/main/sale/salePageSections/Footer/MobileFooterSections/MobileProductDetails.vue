<template>
  <div class="product-details-mobile">
    <v-row v-if="salePageStatus.salePage">
      <v-col cols="12" md="12" lg="12" xl="12" class="d-flex align-center justify-space-between py-0">
        <label> مشخصات محصول</label>
        <v-btn icon depressed class="float-left" @click="$emit('hideDetails')">
          <v-icon>mdi-minus-thick</v-icon>
        </v-btn>
      </v-col>
      <v-divider width="85%" class="my-0 mb-3"></v-divider>

      <v-col cols="12" lg="12" md="12" xl="12" class="pa-0 d-flex">
        <v-container v-if="salePageStatus.salePage.options">
          <v-row v-for="option in salePageStatus.salePage.options.filter(
            (o) => o.TD_FType == 21703
          )">
            <v-col cols="4" class="py-2">
              <span class="option-name">{{ option.TD_FName }}:</span>
            </v-col>

            <v-col cols="8" class="py-2">
              <SelectedOptionValue :option="option" />
            </v-col>
          </v-row>
        </v-container>
        <div>
          <ul class="pl-0"></ul>
        </div>
      </v-col>

      <v-col cols="12" class="d-flex justify-center pt-0 mb-5">
        <v-btn text @click="clearSelection('All')" dense class="clear-btn">
          <v-icon>mdi-close-circle</v-icon>
          <span>پاک کردن انتخاب ها</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userSaleMixin from '../../../_mixins/userSaleMixin';
import SelectedOptionValue from '../../SidebarSections/ProductDetailsSections/SelectedOptionValue.vue';

export default {
  inject: ["salePageStatus", "clearSelection"],
  mixins: [userSaleMixin],
  methods: {},
  components: { SelectedOptionValue }
}
</script>

<style lang="scss">
@charset "UTF-8";

.product-details-mobile {
  position: absolute;
  bottom: 0;
  right: 18px;
  // left: 0;
  width: 90%;
  padding: 20px;
  padding-bottom: 80px;
  background-color: white;
  opacity: 0.95;
  border-radius: 15px;
  border: solid 1px #d4d4d4;

  label {
    font-family: boldbakhtiari !important;
  }

  .child-name {
    span {
      font-size: 15px !important;
    }
  }
}

.select-error {
  font-family: boldbakhtiari !important;
  color: #e9083e;
}

.select-warn {
  font-family: bakhtiari !important;
  color: #575757;
}

.clear-btn {
  border-radius: 15px;
  color: #930149 !important;

  span {
    letter-spacing: normal;
    font-family: boldbakhtiari !important;
    font-size: 16px;
  }

  i {
    font-size: 16px !important;
  }

}
</style>