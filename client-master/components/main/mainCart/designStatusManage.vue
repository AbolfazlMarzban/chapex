<template>

  <v-container>
    <v-row>
      <v-col cols="12">
        <OrderProgress currentStep="designStatus" />
      </v-col>
    </v-row>

    <v-row class="mb-8 mt-3">
      <v-col cols="12">
        <p class="title text-center">وضعیت طراحی سفارش خود را مشخص کنید...</p>  
      </v-col>
    </v-row>

    <v-row>

      <v-col cols="9">
        <LazyDesignStatus v-for="(item, index) in currentCartItems" :key="index" :cartData="currentCartItems"
          :item="item" /> 
      </v-col>

      <LazyCartInfo v-if="currentCartItems.length > 0" :cartData="currentCartItems" @next="$router.push('/cart')" />

    </v-row>
  </v-container>
</template>
<script>
import cartDetailMixins from "../cart/_mixins/cartDetailMixins";
import "../../../assets/style/cart/cart.scss";
import OrderProgress from "./orderProgress.vue";

export default {
  mixins: [cartDetailMixins],
  components: { OrderProgress },
  data() {
    return {
      currentCartItems: [],
    };
  },
  created() {
    // this.currentCartItems = this.$store.getters["cart/getCartData"];
  },
  methods: {
    async getCartItems(basketId = 0) {
      const result = await this.getBascket(0);
      this.currentCartItems = result;
    },
  },
  mounted() {
    this.getCartItems(0);
  },
};
</script>
