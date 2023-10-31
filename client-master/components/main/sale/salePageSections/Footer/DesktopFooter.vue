<template>
    <v-footer app bottom fixed :padless="padless" class="footer" >
        <!-- v-scroll="moveFooter" -->
        <div class="footerContainer pt-4 text-center">
            <v-row class="footerRow  mx-auto">

                <v-col cols="7" class="text-left pr-5">
                    <FooterProductMemo />
                </v-col>

                <v-col cols="3">
                    <FooterFinalPrice />
                </v-col>

                <v-col cols="2">
                    <AddToCartButton />
                </v-col>

            </v-row>
        </div>
    </v-footer>
</template>
  
<script>
import MobileFooterTirajSelector from './MobileFooterSections/MobileFooterTirajSelector.vue';
import cartDetailMixins from "../../../cart/_mixins/cartDetailMixins";
import MobileProductDetails from './MobileFooterSections/MobileProductDetails.vue';
import AddToCartButton from '../MainSections/FinalPriceTirajSections/AddToCartButton.vue';
import FooterFinalPrice from './DesktopFooterSections/FooterFinalPrice.vue';
import FooterProductMemo from './DesktopFooterSections/FooterProductMemo.vue';

export default {
    data() {
        return {
            showDetails: false,
            padless: true
        }
    },

    methods: {
        moveFooter() {
            if ((document.documentElement.scrollHeight - window.innerHeight) == window.pageYOffset) {
                document.getElementsByClassName("footer")[0].style.bottom = "80px"
            } else {
                document.getElementsByClassName("footer")[0].style.bottom = "0px"
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
                        TPS_FID: this.salePage.TPS_FID,
                        TPS_FTitle: this.salePage.TPS_FTitle
                    },
                    finalProduct: {
                        TGO_FID: this.finalProduct.TGO_FID,
                        TGO_FName: this.finalProduct.TGO_FName
                    },
                    selectedChildren: selectedChildrenArr,
                    finalPrice: this.finalPrice,
                    tiraj: this.tiraj,
                }

                let result = await this.addToCart(0, cartObj, false, true)

                // console.log('add to cart result', this.cartData);
            }
        },

    },
    mixins: [cartDetailMixins],
    components: { MobileFooterTirajSelector, FooterFinalPrice, MobileProductDetails, AddToCartButton, FooterProductMemo }
}
</script>
  
<style lang="scss">
.footer {
    background: transparent !important;
    padding: 0px !important;
    background: #FFFFFF;
    z-index: 2000;
}

.footerContainer {
    position: relative;
    width: 100%;
    height: 100px;
    padding-bottom: 10px;
    overflow: hidden;
    background: #FFFFFF;
    color: aliceblue;
    opacity: 0.95;
    z-index: 1000;
}

.footerRow {
    width: 80%;
}

.addToBascketBtn {
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

.cart-btn {
    border-radius: 50px;
}
</style>