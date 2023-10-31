<template>
  <div class="my-cart-box mb-8">
    <label class="title fn-bold">روش تحویل سفارش</label>
    <hr />

    <DeliveryMethods :deliveryStatusData="deliveryStatusData" :methods="defaults[232]"
      @deliveryMethodChanged="storeDeliveryStatusInVuex" />

    <GetInAddress :defaults="defaults" :deliveryStatusData="deliveryStatusData" @dataChanged="storeDeliveryStatusInVuex"
      :addressesList="addressesList" @selectedAddressChanged="selectedAddressChanged"
      @addressSubmited="addressSubmited" />

  </div>
</template>

<script>
import "../../../assets/style/cart/cart.scss";
import deliveryStatusMixin from "./_mixins/deliveryStatusMixins";
import deliveryStatusVariables from "./_mixins/deliveryStatusVariables";
import cartDetailMixins from "../cart/_mixins/cartDetailMixins";
import DeliveryMethods from "./sections/deliveryMethods.vue";
import GetInOwnPlace from "./sections/getInOwnPlace.vue";
import GetInAddress from "./sections/getInAddress.vue";


export default {
  props: ["cartData"],

  mixins: [deliveryStatusMixin, deliveryStatusVariables, cartDetailMixins],

  data() {
    return {
      selected: "",
    };
  },

  methods: {
    async getInitFormAddress() {
      const result = await this.getAddressesInDeliveryStatus("init");
      if (result) {
        this.defaults = result.defaults;
        this.data = result.form;
      }
    },

    async getAddresses() {
      const result = await this.getAddressesInDeliveryStatus("show");
      if (result) {
        this.addressesList = result.addressData;
        // console.log('addressesList', this.addressesList);
        return result;
      }
    },

    async addressSubmited() {
      const resultAfterMounting = await this.getAddresses();
      this.selectedAddress = resultAfterMounting.addressData[0];
    },

    selectedAddressChanged(address) {
      this.selectedAddress = address
      this.deliveryStatusData.selectedAddress = address;
      this.storeDeliveryStatusInVuex()
    },

    storeDeliveryStatusInVuex() {
      this.$store.dispatch("cart/setDeliveryStatusData", this.deliveryStatusData);
    }
  },
  async mounted() {

    const resultAfterMounting = await this.getAddresses();
    await this.getInitFormAddress();
    this.deliveryStatusData.selectedAddress = resultAfterMounting.addressData[0];

    const getDeliveryStatusDataFromVuex = this.$store.getters["cart/getDeliveryStatusData"];

    let arrayOfVuexData = Object.values(getDeliveryStatusDataFromVuex);
    if (arrayOfVuexData[0] == "" && arrayOfVuexData[1] == "" && arrayOfVuexData[2] == "" && arrayOfVuexData[3] == "" && arrayOfVuexData[4] == "") {
    }
    else {
      this.deliveryStatusData = getDeliveryStatusDataFromVuex;
    }
  },
  components: { DeliveryMethods, GetInOwnPlace, GetInAddress }
};
</script>


<style lang="scss" src="../../../assets/style/commentForm/CommentForm.scss">