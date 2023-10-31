<template>
  <v-container class="align-center px-3 pt-3 tirajbox">

    <v-row class="pt-3 pb-1">
      <v-col cols="12" class="pa-0">
        <div class="count-box" v-if="salePageStatus.salePage.TPS_FID_NumberType === 'انتخابی'">
          <label class="pb-1">تیراژ</label>

          <span class="option-title-warn pr-3" v-if="!tiraj">
            را انتخاب نکرده اید.</span>

          <div class="option-title-warn mb-3 mt-0" v-if="notInRange()">
            <span>تعداد انتخابی شما باید بین {{ salePageStatus.finalProductNotInRange.TGO_FNumberMin }} و
              {{ salePageStatus.finalProductNotInRange.TGO_FNumberMax }} باشد.</span>
          </div>
          <v-select v-model="tiraj" :items="numberList" background-color="white" flat outlined rounded solo
            @change="tirajChanged(tiraj)" class="count-select mt-1"></v-select>
        </div>

        <div class="align-center" v-if="salePageStatus.salePage.TPS_FID_NumberType === 'عددی'">
          <label>انتخاب تیراژ</label>
          <input class="count-select-number pa-2 mb-2" type="number" v-model="tiraj" placeholder="انتخاب تیراژ" :min="min"
            :max="max" @change="tirajChanged(tiraj)" />
        </div>

        <div class="count-box-stair" v-if="salePageStatus.salePage.TPS_FID_NumberType == 'پلکانی'">
          <label class="count-label-stair">انتخاب تیراژ</label>
          <v-select v-model="tiraj" :items="numberList" background-color="white" flat outlined rounded solo
            class="count-select" @change="tirajChanged(tiraj)"></v-select>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pa-0 pt-3">
        <label style="font-family: boldbakhtiari !important; color: #016670;">سری سفارش</label>
        <input class="seri-select-number pa-2 mb-2 mt-1" type="number" v-model="seri" placeholder="سری سفارش" :min="1"
          :max="100" @change="seriChanged(seri)" />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

export default {
  inject: ["salePageStatus", "tirajChanged", "seriChanged"],

  data() {
    return {
      tiraj: this.salePageStatus.tiraj,
      seri: 1,
      // showNumberWarn: false,
      numberList: this.salePageStatus.salePage.TPS_FIDs_NumberList,
      min: this.salePageStatus.salePage.TPS_FNumberMin,
      max: this.salePageStatus.salePage.TPS_FNumberMax
    }
  },

  mounted() {
    this.tiraj = this.salePageStatus.salePage.TPS_FNumberDefault
    this.tirajChanged(this.tiraj)
  },

  methods: {
    notInRange() {
      if (!this.salePageStatus.finalProduct && this.salePageStatus.finalProductNotInRange) {
        if (this.salePageStatus.finalProductNotInRange.TGO_FNumberMin || this.salePageStatus.finalProductNotInRange.TGO_FNumberMax) {
          return true
        }

        return false
      }
    },
  },

  watch: {
    "salePageStatus.tiraj": {
      handler(newValue, oldValue) {
        this.tiraj = newValue
      },
      immediate: true
    },
  }
}
</script>
<style lang="scss">
.v-menu__content {
  .v-list-item {
    min-height: 25px !important;
    height: 25px !important;
  }

  .v-list-item--active {
    background: rgba(1, 102, 112, 0.1) !important;

    .v-list-item__title {
      color: #016670 !important;
    }
  }

  .v-menu__content {
    border-radius: 20px;
  }

  .v-list {
    padding: 15px 0px !important;
  }
}

.count-box {
  label {
    font-family: boldbakhtiari !important;
    color: #016670;
  }
}
</style>
