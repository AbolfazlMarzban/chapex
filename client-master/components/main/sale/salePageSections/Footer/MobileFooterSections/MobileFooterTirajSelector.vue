<template>
  <v-row class="align-center px-3 pt-3 pr-0">
    <v-col cols="12" class="pa-0 pr-4">
      <div
        class="count-box-mobile"
        v-if="salePage.TPS_FID_NumberType === 'انتخابی'"
      >
        <label class="mobile-count-label">تیراژ</label>
        <v-select
          v-model="tiraj"
          :items="salePage.TPS_FIDs_NumberList"
          background-color="white"
          flat
          outlined
          rounded
          solo
          @change="$emit('tirajChanged', tiraj)"
          class="count-select-mobile"
        ></v-select>
      </div>

      <v-row class="align-center" v-if="salePage.TPS_FID_NumberType === 'عددی'">
        <v-col cols="4" class="pb-5">
          <label>انتخاب تیراژ</label>
        </v-col>

        <v-col cols="8">
          <input
            class="count-select-number pa-2 mb-2"
            type="number"
            v-model="tiraj"
            placeholder="انتخاب تیراژ"
            :min="salePage.TPS_FNumberMin"
            :max="salePage.TPS_FNumberMax"
            @change="$emit('tirajChanged', tiraj)"
          />
        </v-col>
      </v-row>

      <div
        class="count-box-stair"
        v-if="salePage.TPS_FID_NumberType == 'پلکانی'"
      >
        <label class="count-label-stair">انتخاب تیراژ</label>
        <v-select
          v-model="tiraj"
          :items="salePage.TPS_FIDs_NumberList"
          background-color="white"
          flat
          outlined
          rounded
          solo
          class="count-select"
          @change="$emit('tirajChanged', tiraj)"
        ></v-select>
      </div>
    </v-col>

    <v-col cols="12" class="pa-0 ma-0">
      <div class="warnbox mb-3 mt-0" v-if="this.showNumberWarn">
        <span
          >تعداد انتخابی شما باید بین {{ this.salePage.TPS_FNumberMin }} و
          {{ this.salePage.TPS_FNumberMax }} باشد.</span
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>

export default {
    props: ["salePage"],

    data() {
        return {
            tiraj: null,
            showNumberWarn: false,
        }
    },

    watch: {
        salePage: function (newVal, oldVal) { // watch it
            this.tiraj = this.salePage.TPS_FNumberDefault
            this.$emit('tirajChanged', this.tiraj)
        },
        tiraj(newValue) {
            if (this.salePage.TPS_FID_NumberType == 'عددی') {
                if (newValue > this.salePage.TPS_FNumberMax || newValue < this.salePage.TPS_FNumberMin) {
                    // this.showPrice = false
                    this.showNumberWarn = true
                } else {
                    // this.showPrice = true
                    this.showNumberWarn = false
                }
            }
            // this.finalPrice = this.calc_price(this.salePage, this.finalProduct, this.selectedChildren, newValue);
        },
    },
}
</script>
<style lang="scss">
.mobile-count-label {
  color: white !important;
}
</style>