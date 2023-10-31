<template>
  <div class="pa-0 ma-0">
    <div class="pa-0 gray price-label">
      <label>مبلغ سفارش</label>
    </div>
    <v-row class="align-center">
      <v-col cols="8" class="pa-0 pt-2 text-left">
        <p class="price-tag-mobile pb-0" v-if="finalPrice">
          <ICountUp
            :delay="delay"
            :endVal="finalPrice"
            :options="options"
            @ready="onReady"
          />
          <!-- {{ numberSeparate(this.finalPrice) }} -->
        </p>
        <p v-else class="nonprice-tag-mobile">----</p>
      </v-col>

      <v-col cols="4 pt-0 pr-1 text-right">
        <span class="tooman-mobile">تومان</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ICountUp from 'vue-countup-v2';

export default {
    props: ["finalPrice"],

    data() {
        return {
            delay: 100,
            options: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            }
        };
    },

    methods: {

        onReady(instance, CountUp) {
            // const that = this;
            // instance.update(that.endVal + 100);
        },
    },

    components: { ICountUp }
}
</script>

<style scoped lang="scss">
@charset "UTF-8";
.price-tag-mobile {
  font-size: 22px;
  color: white;
  span {
    font-family: boldbakhtiari !important;
  }
}

.nonprice-tag-mobile {
  font-size: 30px;
  color: white;
}

.tooman-mobile {
  font-family: bakhtiari !important;
  color: white;
}

.price-label {
  font-family: bakhtiari !important;
  color: white;
}
</style>