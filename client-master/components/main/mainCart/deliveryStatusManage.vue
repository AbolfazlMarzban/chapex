<template>
  <v-row class="ma-3">
    <v-col cols="12">
      <OrderProgress currentStep="deliveryStatus" />
    </v-col>
    
    <DeliveryStatus />

  </v-row>
</template>
<script>
import "../../../assets/style/cart/cart.scss";
import OrderProgress from "./orderProgress.vue";
import DeliveryStatus from "../deliveryStatus/deliveryStatus.vue";


export default {
  components: { OrderProgress, DeliveryStatus },

};
</script>
