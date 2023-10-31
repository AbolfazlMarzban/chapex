<template>
  <v-container>
    <v-row class="align-center px-3 pt-xl-3 pt-lg-3 pt-md-3 pt-0">
      <v-col cols="12" xl="3" lg="3" md="3" class="pa-0 text-center">
        <label class="priceTitle">مبلغ سفارش</label>
      </v-col>
      <v-col cols="12" xl="9" lg="9" md="9"
        class="d-flex align-center pa-0 justify-xl-end justify-lg-end justify-md-end justify-center">
        <p class="ml-1 mb-0 price-tag" v-if="this.salePageStatus.finalPrice">
          <ICountUp :delay="delay" :endVal="salePageStatus.finalPrice" :options="options" @ready="onReady" />
        </p>
        <p v-else class="nonprice-tag mb-0">----</p>
        <span class="tooman">تومان</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-3 ps-5 withTax text-xl-start text-lg-start text-md-start text-center" cols="12">
        <span class="me-2">با احتساب مالیات بر ارزش افزوده</span>
        <ICountUp :delay="delay" :endVal="priceWithValueAddedTax(salePageStatus.salePage, salePageStatus.finalPrice)"
          :options="options" @ready="onReady" />
        <span class="ms-2 toomanWithTax">تومان</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ICountUp from 'vue-countup-v2';
import saleDataMixin from '../../../_mixins/saleDataMixin';

export default {
  inject: ["salePageStatus"],
  mixins: [saleDataMixin],

  data() {
    return {
      delay: 100,
      options: {
        duration: 0.7,
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

<style scoped>
.priceTitle {
  font-family: boldbakhtiari !important;
  font-size: 15px !important;
  color: #016670 !important;
}

.price-tag {
  font-family: boldbakhtiari !important;
  font-size: 38px !important;
  color: #016670 !important;
  font-weight: 700 !important;
}

.nonprice-tag {
  font-size: 40px;
  padding-left: 30px;
  color: #016670;
}

.tooman {
  font-family: bakhtiari !important;
  color: #016670;
  font-size: 12px;
}
</style>