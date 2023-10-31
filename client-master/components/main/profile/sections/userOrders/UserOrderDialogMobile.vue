<template>
  <div class="order-page pa-xl-4 pa-lg-4 pa-md-4 d-flex flex-column align-center">

    <OrderBrief :data="data" @closeOrder="$emit('closeOrder')" />

    <v-expansion-panels accordion class="order-panels mt-5">
      <OrderDesign :data="data" />
      <order-form-result :data="data" />
      <OrderDetails :data="options" />
      <OrderSteps :steps="steps" />
    </v-expansion-panels>

  </div>
</template>

<script>
import OrderBrief from './orderDialog/OrderBrief.vue';
import OrderDesign from './orderDialog/OrderDesign.vue';
import OrderDetails from './orderDialog/DialogOrderDetails.vue';
import OrderSteps from './orderDialog/OrderSteps.vue';

export default {
  props: ["data", "steps", "options"],
  methods: {

  },
  components: { OrderBrief, OrderDesign, OrderDetails, OrderSteps }
}
</script>

<style lang="scss">
@charset "UTF-8";

.order-item {
  width: 100%;
  margin: auto;
}

.status-chip {
  width: 100%;
  justify-content: center;
  background: #d9d9d9;

  span {
    font-family: boldbakhtiari !important;
    color: #016670;
  }
}

.order-panels {
  .v-expansion-panel-header {
    font-family: bakhtiari !important;
  }

  .v-expansion-panel-header--active {
    font-family: boldbakhtiari !important;
    color: #016670;
  }

  .v-expansion-panel-header__icon {
    margin-left: 0px;
    margin-right: auto;
  }

  .v-expansion-panel::before {
    box-shadow: none !important;
  }
}

.order-log {
  li {
    font-family: boldbakhtiari !important;
    color: black;

    span {
      padding-right: 10px;
      font-family: boldbakhtiari !important;
      color: #016670;
    }
  }
}

.order-alarm {
  span {
    margin-top: 15px;
    font-size: 14px;
    color: red;
  }
}
</style>