<template>
  <div>
    <div class="d-flex justify-start align-center flex-row">
      <div class="d-xl-block d-lg-block d-md-block d-sm-block d-flex flex-column">
        <span class="option-title">وضعیت طراحی</span>
      </div>
      <span class="option-title-warn pr-3" v-if="designStatus == -1">
        را انتخاب نکرده اید</span>
    </div>

    <v-row v-if="CheckUserAccess([11002])" class="my-2">
      <v-col cols="12" class="pa-1">خصوصیات طراحی انتخاب شده:</v-col>

      <v-col v-for="(val, i) in getDesignOptionValues(salePageStatus.salePage)" cols="12" class="pa-1 pr-3">{{ i + 1 }}-
        {{ val.TD_FName }}</v-col>
    </v-row>

    <v-row class="mt-1 pl-2 justify-center justify-sm-center justify-xl-start justify-lg-start justify-md-start">
      <v-col cols="12" xl="6" lg="6" md="6" class="pa-1">
        <v-checkbox label="فایل طراحی را بعدا آپلود میکنم" :class="getStyle(0)"
          @change="setDesignStatus($event, 0)"></v-checkbox>
      </v-col>

      <v-col cols="12" xl="6" lg="6" md="6" class="pa-1">
        <v-checkbox label="طراحی را به تیم چاپکس سفارش میدهم" :class="getStyle(1)"
          @change="setDesignStatus($event, 1)"></v-checkbox>
      </v-col>
    </v-row>

    <v-row v-if="designStatus == 0 &&
      productHasReviewOptionValue(
        this.salePageStatus.salePage,
        this.salePageStatus.finalProduct
      )
      "
      class="pr-4 pl-2 justify-center justify-sm-center justify-xl-start justify-lg-start justify-md-start fileCheckSwitch">
      <v-switch v-model="salePageStatus.salePage.reviewNeed" :value="salePageStatus.salePage.reviewNeed" flat
        @change="reviewNeedChanged(salePageStatus.salePage.reviewNeed)"
        label="نیاز به چک کردن تخصصی فایل توسط کارشناس دارم"></v-switch>
    </v-row>
  </div>
</template>

<script>
import saleDataMixin from "../../../_mixins/saleDataMixin";
import userSaleMixin from "../../../_mixins/userSaleMixin";
import designMixin from "../../../_mixins/designMixin";

export default {
  props: ["option"],
  inject: ["salePageStatus", "designStatusChanged", "reviewNeedChanged"],

  mixins: [saleDataMixin, userSaleMixin, designMixin],
  data() {
    return {
      designStatus: -1,
      items: [
        { value: false, id: 0, text: "فایل طراحی را بعدا آپلود میکنم" },
        {
          value: false,
          id: 1,
          text: "طراحی را به تیم چاپکس سفارش میدهم",
          disabled: !this.productHasDesignOptionValue(
            this.salePageStatus.salePage,
            this.salePageStatus.finalProduct.TGO_FID
          )
        }
      ]
    };
  },

  mounted() {
    this.$vuetify.rtl = true;
    this.designStatus = this.salePageStatus.salePage.designStatus;
  },
  methods: {
    setDesignStatus(event, value) {
      if (this.designStatus == value) this.designStatus = -1;
      else this.designStatus = value;

      this.designStatusChanged(this.designStatus)
    },

    getStyle(item) {
      if (this.designStatus == item) return "modern-selector-user-set";
      else return "modern-selector-normal";
    }
  }
};
</script>
<style lang="scss">
.fileCheckSwitch {
  .v-input__slot {
    label {
      text-align: initial !important;
    }
  }
}

.design-status-selector {
  margin-top: 0px;
  background-color: #016670;
  border-radius: 15px;
  transition: 0.5s;
  padding: 0px;
  border: 3px solid #016670;

  .v-input--selection-controls__input {
    display: none !important;
  }

  label {
    font-family: bakhtiari !important;
    font-weight: 400;
    font-size: 16px;
    justify-content: center;
    text-align: center;
    color: White !important;
  }

  .v-messages {
    display: none !important;
  }

  .v-input__slot {
    padding: 10px;
    margin: 0px;
  }
}

.design-status-selector:hover {
  transition: 0.5s;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  label {
    font-family: boldbakhtiari !important;
  }
}
</style>
