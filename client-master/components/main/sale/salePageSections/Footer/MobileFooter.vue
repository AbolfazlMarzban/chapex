<template>
  <v-footer app bottom fixed :padless="padless" class="mobile-footer" >
    <!-- v-scroll="moveFooter" -->
    <div class="salePageFooter pt-4 text-center">
      <v-row class="align-center">
        <v-col cols="3" class="text-left d-flex flex-row-reverse align-start pr-5">
          <!-- <div class="rounded-circle productDatailsBtn" :class="showDetails ? 'productDatailsBtn-active' : ''"> -->
          <v-btn icon depressed color="white" dark @click="showDetails = !showDetails">
            <v-icon v-if="showDetails">mdi-format-list-bulleted</v-icon>
            <v-icon v-else>mdi-list-box-outline</v-icon>

          </v-btn>
          <!-- </div> -->
          <!-- <MobileFooterTirajSelector :salePage="salePage" @tirajChanged="(t) => $emit('tirajChanged', t)" /> -->
        </v-col>
        <v-col cols="6" class="text-center">
          <MobileFinalPrice />
        </v-col>
        <v-col cols="3" class="d-flex flex-row justify-start">
          <div class="rounded-circle">
            <v-btn v-if="salePageStatus.finalProduct" text depressed block @click="addOrder" class="cart-btn">
              <v-icon color="white">mdi-cart-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <Transition name="slide">
      <MobileProductDetails v-if="showDetails" @hideDetails=" showDetails = false" />
    </Transition>
  </v-footer>
</template>

<script>
import MobileFinalPrice from './MobileFooterSections/MobileFinalPrice.vue';
import MobileFooterTirajSelector from './MobileFooterSections/MobileFooterTirajSelector.vue';
import cartDetailMixins from "../../../cart/_mixins/cartDetailMixins";
import MobileProductDetails from './MobileFooterSections/MobileProductDetails.vue';


export default {
  inject: ["salePageStatus"],
  props: ["tiraj", "designStatus"],

  data() {
    return {
      showDetails: false,
      padless: true
    }
  },

  methods: {
    moveFooter() {
      if ((document.documentElement.scrollHeight - window.innerHeight) == window.pageYOffset) {
        document.getElementsByClassName("mobile-footer")[0].style.bottom = "240px"
      } else {
        document.getElementsByClassName("mobile-footer")[0].style.bottom = "0px"
      }
    },
    async addOrder() {

      if (!this.isAuthenticated) {
        this.loginDialog = true
      }
      else {
        this.loginDialog = false

        let selectedChildrenArr = []
        this.selectedChildren.forEach(child => { selectedChildrenArr.push(child.TD_FID) });

        const cartObj = {
          salePage: {
            TPS_FID: this.salePageStatus.salePage.TPS_FID,
            TPS_FTitle: this.salePageStatus.salePage.TPS_FTitle
          },
          finalProduct: {
            TGO_FID: this.salePageStatus.finalProduct.TGO_FID,
            TGO_FName: this.salePageStatus.finalProduct.TGO_FName
          },
          selectedChildren: selectedChildrenArr,
          finalPrice: this.salePageStatus.finalPrice,
          tiraj: this.tiraj,
        }

        let result = await this.addToCart(0, cartObj, false, true)

        // console.log('add to cart result', this.cartData);
      }
    },

  },
  mixins: [cartDetailMixins],
  components: { MobileFooterTirajSelector, MobileFinalPrice, MobileProductDetails }
}
</script>

<style lang="scss">
.mobile-footer {
  background: transparent !important;
  padding: 0px !important;
  background: #016670;
  z-index: 2000;
}

.salePageFooter {
  position: relative;
  width: 100%;
  height: 80px;
  padding-bottom: 10px;
  overflow: hidden;
  background: #016670;
  color: aliceblue;
  opacity: 0.95;
  z-index: 1000;
  // border-radius: 20px 20px 0px 0px;
  // --mask:
  //     radial-gradient(22.36px at 50% 30.00px, #000 99%, #0000 101%) calc(50% - 20px) 0/40px 100%,
  //     radial-gradient(22.36px at 50% -20px, #0000 99%, #000 101%) 50% 10px/40px 100% repeat-x;
  // -webkit-mask: var(--mask);
  // mask: var(--mask);
}

.addToBascketBtn {
  // position: absolute;
  // bottom: 15px;
  // left: -5px;
  width: 80px;
  height: auto;
  padding-top: 20px;
  overflow: hidden;
  text-align: center;
  opacity: 0.95;
  z-index: 1001;
}

.productDatailsBtn {
  bottom: 40px;
  right: -2px;
  // width: 30px;
  // height: 30px;
  overflow: hidden;
  text-align: center;
  opacity: 0.95;
  z-index: 1001;

  span {
    color: white !important;
  }
}

.productDatailsBtn-active {
  background-color: white;
  border: solid 1px #b9b9b9;

  button {
    color: #016670;
    height: 30px !important;
    width: 30px !important;

    span {
      color: #016670 !important;
    }
  }
}

.slide-enter-active {
  // transition: all 0.8s ease-out;
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(80px);
  opacity: 0;
}

.cart-btn {
  border-radius: 50px;
}
</style>