<template>
  <ui-loading v-if="loading" />

  <v-row v-else>

    <v-col cols="12">
      <OrderProgress currentStep="cart" @next="nextLevel" />
    </v-col>

    <v-col cols="12">
      <div class="my-main-tab">
        <v-row class="text-center bottom-line px-3">
          <v-col @click="state = 'currentCart'" class="pb-0 pt-customize pr-0 pl-0" cols="6" xl="6" lg="6" md="6" sm="6">
            <span>خرید های جاری</span>
            <span class="number-basket">{{ cartData.currentCartItems.length }}</span>
            <div v-if="state == 'currentCart'" class="green-line-tab mt-5"></div>
          </v-col>

          <v-col @click="state = 'futureCart'" class="pb-0 pl-0 pr-0  mt-md-0 " cols="6" xl="6" lg="6" md="6" sm="6">
            <span>خرید های آینده</span>
            <span class="number-basket">{{ cartData.futureCartItems.length }}</span>
            <div v-if="state == 'futureCart'" class="green-line-tab  mt-5"></div>
          </v-col>
        </v-row>
      </div>
    </v-col>

    <v-col v-if="state == 'currentCart' && cartData.currentCartItems.length > 0" cols="12">
      <div class=" my-user-attention">
        {{ cartCaption }}
      </div>
    </v-col>
    <v-col v-else-if="state == 'futureCart' && cartData.futureCartItems.length > 0" cols="12">
      <div class=" my-user-attention">
        {{ cartCaption }}
      </div>
    </v-col>

    <LazyCartItems :cartData="cartData" @deleteItem="deleteItem" :state="state" @addToFuture="addToFuture"
      @backToCurrent="backToCurrent" @goToPayment="nextLevel" />
    <v-col cols="12" class="pt-0 cart-bottom">
      <v-btn block rounded color="#016670" dark @click="nextLevel" class="orderProg">ادامه فرآیند خرید</v-btn>
    </v-col>


    <fill-info :showDialog="showError" @cancelProcessDialog="$router.push('/profile/profile')"></fill-info>
    <LazyCartMobileFooter v-if="state == 'currentCart' && cartData.currentCartItems.length > 0" :cartData="cartData"
      :nextText="'ادامه فرآیند خرید'" @next="nextLevel" class="d-xl-none d-lg-none d-md-none d-block" />
    <LazyCartDesktopFooter v-if="state == 'currentCart' && cartData.currentCartItems.length > 0" :cartData="cartData"
      @next="nextLevel" :nextText="'ادامه فرآیند خرید'" class="d-xl-block d-lg-block d-md-block d-none" />
    <!-- <LazyCartInfo v-if="state == 'currentCart' && cartData.currentCartItems.length > 0" :cartData="cartData"
      @next="$router.push('/payment')" /> -->

  </v-row>
</template>

<script>
import cartDetailMixins from "../cart/_mixins/cartDetailMixins";
import user from '../user/mixins/user';
import fillInfo from './dialog/fillInfo.vue';
// import OrderProgress from "./orderProgress.vue";
// import CartItems from "../cart/cartItems.vue";
// import CartInfo from "../cart/cartInfo.vue";

export default {
  components: { fillInfo },
  mixins: [cartDetailMixins],
  data() {
    return {
      loading: true,
      state: 'currentCart',
      cartData: {
        currentCartItems: [],
        futureCartItems: [],
        salePages: [],
      },
      cartCaption: '',
      captionItems: [],
      showError: false
    };
  },

  methods: {
    async nextLevel() {
      try {
        if (this.profilePercent == 100) {
          this.$router.push('/payment')
        } else {
          this.showError = true
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      let result = await this.deleteCartItem(item.TOD_FID)

      if (result) {
        await this.getCartItems()
      }
    },

    async addToFuture(item) {
      let result = await this.addToFutureCart(item.TOD_FID)

      if (result) {
        // console.log('cart result', result)
        await this.getCartItems()
        // this.state = 'futureCart'
      }
    },

    async backToCurrent(item) {
      let result = await this.backToCurrentCart(item.TOD_FID)

      if (result) {
        await this.getCartItems()
        // this.state = 'currentCart'
      }
    },

    async getCartItems() {
      this.loading = true

      const result = await this.getCartData();
      if (result) {
        if (result.cartItems) {
          this.cartData.currentCartItems = result.cartItems.filter(item => item.TOD_FBasketIndex == 0)
          this.cartData.futureCartItems = result.cartItems.filter(item => item.TOD_FBasketIndex == 1)
          this.cartData.salePages = result.salePages
          // console.log('cartData', this.cartData)

        }
      }
      this.loading = false
    },
    async getCartCaption() {
      try {
        const result = await this.$authAxios.$get(`/defaults/get/${353}?mode=tablechildren`)
        if (result) {
          this.captionItems = result.data.table[0].children
          if (this.state == 'currentCart') {
            this.cartCaption = this.captionItems[0].TD_FComment
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  },

  mounted() {
    this.getCartItems();
    this.getCartCaption()
  },
  watch: {
    state(newValue) {
      if (newValue == "currentCart") {
        this.cartCaption = this.captionItems[0].TD_FComment
      } else {
        this.cartCaption = this.captionItems[1].TD_FComment
      }
    }
  }

  // components: { OrderProgress, CartItems, CartInfo }
};
</script>
<style lang="scss" src="../../../assets/style/cart/cart.scss" scoped></style>
<style lang="scss">
@media (min-width:1920px) {
  .cart-bottom {
    margin-bottom: 200px;
  }
}

@media (min-width:1280px) and (max-width:1919px) {
  .cart-bottom {
    margin-bottom: 150px;
  }
}

@media (min-width:960px) and (max-width:1279px) {
  .cart-bottom {
    margin-bottom: 150px;
  }
}</style>