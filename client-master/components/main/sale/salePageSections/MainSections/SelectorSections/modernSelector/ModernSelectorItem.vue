<template>
  <v-col cols="6" xl="3" lg="3" md="3" class="pa-1" style="position: relative !important" v-if="optionValue && canShow">

    <v-icon v-if="isDisabled" class="btn-lock" @click="lockClick(optionValue)">mdi-lock-outline</v-icon>

    <v-icon v-if="isSelected == 3 || isSelected == 4" class="btn-lock">mdi-star</v-icon>

    <v-checkbox :label="optionValue.TD_FName" :value="isSelected" :id="optionValue.TD_FID.toString()"
      :disabled="isDisabled" v-model="isSelected" @click="itemClick" :class="getStyle()">
    </v-checkbox>
  </v-col>
</template>

<script>
import userSaleMixin from "../../../../_mixins/userSaleMixin";
import saleDataMixin from "../../../../_mixins/saleDataMixin";

export default {
  props: ["option", "optionValue"],
  inject: ["salePageStatus", "optionsValues", "itemClicked", "lockClick"],

  mixins: [userSaleMixin, saleDataMixin],

  data() {
    return {
      isSelected: false,
      isDisabled: false,
      canShow: false,
    };
  },

  mounted() {
    this.setCanShow()
    this.isSelected = this.optionValue.isSelected
    this.setDisabled()
  },

  methods: {
    getStyle() {
      if (
        this.isSelected == 1 ||
        this.isSelected == 7
      ) {
        return "modern-selector-background-set";
      } else if (this.isSelected > 1) {
        return "modern-selector-user-set";
      }

      return "modern-selector-normal";
    },

    setDisabled() {
      if (this.option.TD_FActionToDeps == 23102) {
        //نمایش همیشگی
        this.isDisabled = false;
      }
      else {

        this.isDisabled = this.childDisabledByDeps(
          this.salePageStatus.state,
          this.salePageStatus.salePage,
          this.option,
          this.optionValue
        );
      }
    },

    itemClick() {
      this.itemClicked(this.optionValue)
    },

    setCanShow() {

      this.canShow = true;

      if (this.option.TD_FActionToDeps == 23103) {
        //نمایش مشروط
        const check = this.childDisabledByDeps(
          this.salePageStatus.state,
          this.salePageStatus.salePage,
          this.option,
          this.optionValue
        );
        if (check) this.canShow = false;
      }

      const activeCheck = this.optionValue_isActive(
        this.salePageStatus.salePage,
        this.salePageStatus.finalProduct,
        this.optionValue
      );
      if (!activeCheck) this.canShow = false;

      const showInProductCheck = this.optionValue_showInProducts(
        this.salePageStatus.salePage,
        this.salePageStatus.finalProduct,
        this.optionValue
      );
      if (!showInProductCheck) this.canShow = false;

      if (this.optionValue.TD_FActive == 0) this.canShow = false;

    },
  },

  watch: {
    "salePageStatus.changed": {
      handler(newValue, oldValue) {
        if (this.optionValue) {
          this.setCanShow()
          this.isSelected = this.optionValue.isSelected
          this.setDisabled()
        }
      },
      immediate: true
    },
  }
};
</script>
