<template>
  <v-col v-if="state == 'currentCart' && cartData.currentCartItems.length > 0" cols="12" >
    <CartItem v-for="(item,i) in cartData.currentCartItems" :key="i" :cartData="cartData" :item="item" :state="state"
      @deleteItem="$emit('deleteItem', item)" @addToFuture="$emit('addToFuture', item)"  class="mb-5" @goToPayment="$emit('goToPayment')"/>
  </v-col>
  <v-col v-else-if="state == 'futureCart' && cartData.futureCartItems.length > 0" cols="12">
    <CartItem v-for="(item, i) in cartData.futureCartItems" :key="i" :cartData="cartData" :item="item" :state="state"
      @deleteItem="$emit('deleteItem', item)" @backToCurrent="$emit('backToCurrent', item)" class="mb-5"/>
  </v-col>
  <EmptyCart v-else />
</template>

<script>
import "../../../assets/style/cart/cart.scss";
import CartItem from "./cartItem.vue";
import cartDetailMixins from "./_mixins/cartDetailMixins";
import cartDetailVariables from "./_mixins/cartDetailVariables";
import EmptyCart from "./emptyCart.vue";

export default {
  mixins: [cartDetailMixins, cartDetailVariables],
  props: ["cartData", "state"],
  data() {
    return {
      isDetailsPayTablet: true,
    };
  },
  components: { CartItem, EmptyCart }
};
</script>

<style scoped></style>
