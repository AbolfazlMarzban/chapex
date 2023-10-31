<template>
    <div class="left-content">

        <CartItemDeleteDialog v-if="showDeleteDialog" :item="item" @hiddenDialog="showDeleteDialog = false"
            @deleteItemFromTable="$emit('deleteItem', item); showDeleteDialog = false">
        </CartItemDeleteDialog>

        <!-- Start Block 1 -->
        <div class="my-left-content mb-xl-5 mb-lg-5 mb-md-5">

            <v-row class="align-center pt-4 px-xl-5 px-lg-5 px-md-5" style="width: 100%; margin: 0px !important;">
                <v-col cols="12" class="py-xl-1 py-lg-1 py-md-1 py-1" v-if="showError()">
                    <div class="cart-error-box pa-1 pr-3" style="width: 100%">برخی از مشخصات این محصول تغییر کرده است
                        <v-btn depressed rounded color="#FFF59D" class="mr-xl-3 mr-lg-3 mr-md-3 mr-1"
                            @click="$router.push(`/salePage/${salePage.TPS_FLink}?orderId=${item.TOD_FID}`)">ویرایش و ادامه
                            خرید</v-btn>
                    </div>
                </v-col>
                <v-col cols="12" class="py-xl-1 py-lg-1 py-md-1 py-1" v-if="showPriceError()">
                    <div class="cart-error-box pa-1 pr-3" style="width: 100%">قیمت این محصول تغییر کرده است
                        <v-btn depressed rounded color="#FFF59D" class="mr-xl-3 mr-lg-3 mr-md-3 mr-1"
                            @click="updateCartItem(salePage, item)">تایید قیمت</v-btn>
                    </div>
                </v-col>
                <v-col cols="12" class="py-xl-1 py-lg-1 py-md-1 py-1" v-if="product && product.TGO_FActive == 0">
                    <div class="cart-error-box-1 pa-1 pr-3" style="width: 100%">موقتاً این محصول به فروش نمی رسد
                        <v-btn depressed rounded color="red" dark class="mr-xl-3 mr-lg-3 mr-md-3 mr-1"
                            @click="removeAndShow()">حذف و مشاهده محصولات مشابه</v-btn>
                    </div>
                </v-col>
                <v-col cols="4" xl="1" lg="1" md="1" sm="2" class="d-flex align-center pt-0">
                    <img v-if="picture" :src="setImageUrl(picture.path)" :alt="picture.alt" class="img-responsive" />
                </v-col>

                <v-col v-if="salePage && item" cols="8" xl="6" lg="6" md="6" sm="10" class="d-flex flex-column pt-0">
                    <nuxt-link :to="'salePage/' + salePage.TPS_FLink" class="my-lbl-title-16"
                        style="color: #016670 !important">{{ salePage.TPS_FTitle }}</nuxt-link>
                    <span class="my-fn-14">({{ getProductName(salePage,
                        item.TOD_FID_Goods)
                    }})</span>
                    <p class="my-lbl-title-14 mb-0" style="color: #016670 m !important"> تیراژ سفارش: {{ item.TOD_FCount }}
                    </p>
                </v-col>
                <v-col cols="12" xl="5" lg="5" md="5" class="pt-0">
                    <v-row style="width: 100%; margin: 0px;">
                        <v-col cols="12" class="d-flex align-center justify-space-between pb-0">
                            <p class="mb-0" style="font-weight: bold; color: black;">قیمت سفارش:</p>
                            <span class="my-green" style="font-size: 22px; font-weight: bold;">
                                {{ showPrice(salePage, item) }} تومان
                            </span>
                        </v-col>
                        <v-col cols="5" class="cart-btn-box pr-0">
                            <v-btn style="width: 100%;" depressed @click="openItem = !openItem">تغییر و مشاهده
                                جزئیات</v-btn>
                        </v-col>
                        <v-col cols="5" class="cart-btn-box px-0">
                            <v-btn style="width: 100%;" depressed v-if="state == 'currentCart'"
                                @click=" $emit('addToFuture', item)">انتقال به خرید های آینده</v-btn>
                            <v-btn style="width: 100%;" depressed v-else-if="state == 'futureCart'"
                                @click=" $emit('backToCurrent', item)">برگرداندن به خرید های جاری</v-btn>

                        </v-col>
                        <v-col cols="2" class="cart-btn-box pl-0">
                            <v-btn color="red" dark style="min-width: 100%; width: inherit;"
                                @click="showDeleteDialog = true">
                                <v-icon> mdi-trash-can</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
                <cart-item-options-dialog :openItem="openItem" :salePage="salePage" :item="item" :picture="picture"
                    @closeItem="openItem = false" :date="today" :finalPrice="finalPrice()" />
            </v-row>
        </div>
    </div>
</template>

<script>
import '../../../assets/style/designStatus/designStatus.scss';
// import userSaleMixin from "../sale/_mixins/userSaleMixin"
import saleDataMixin from "../sale/_mixins/saleDataMixin"
import cartDetailMixins from '../cart/_mixins/cartDetailMixins';
import CartItemTiraj from './cartItemSections/CartItemTiraj.vue';
import CartItemDesignStatus from './cartItemSections/CartItemDesignStatus.vue';
import CartItemFinalPrice from './cartItemSections/CartItemFinalPrice.vue';
import CartItemOptions from './cartItemSections/CartItemOptions.vue';
import ICountUp from 'vue-countup-v2';
import CartItemOptionsDialog from './cartItemSections/cartItemOptionsDialog.vue';


export default {

    props: ["cartData", "item", "state"],
    mixins: [saleDataMixin, cartDetailMixins],
    components: { CartItemTiraj, CartItemDesignStatus, CartItemFinalPrice, CartItemOptions, ICountUp, CartItemOptionsDialog },

    data() {
        return {
            showDeleteDialog: false,
            showInvoiceDialog: false,
            salePage: null,
            picture: null,
            openItem: false,
            product: null,
            today: '',
        }
    },
    methods: {
        finalPrice() {
            return this.calcPriceInCart(this.salePage, this.item.TOD_FID_Goods, this.item.TOD_FID_SelectedOptions,
                this.item.TOD_FCount, 1)
        },
        showPrice(salePage, item) {
            return this.numberSeparate(Math.round(this.finalPrice()))
        },
        showError() {
            if (this.salePage) {
                const relgoods = this.salePage.relatedGoods
                for (var i = 0; i < relgoods.length; i++) {
                    if (relgoods[i].TGO_FActive == 0 || relgoods[i].TGO_FCanSale == 0) {
                        return true
                    }
                    else {
                        return false
                    }
                }
            }
        },
        showPriceError() {
            // console.log('this.finalPrice()', this.finalPrice());
            // console.log('this.item.TOD_FPrice', this.item.TOD_FPrice);

            if (this.finalPrice() == this.item.TOD_FPrice) {
                return false
            } else {
                return true
            }
        },
        removeAndShow() {
            this.$emit('deleteItem', this.item)
            this.$router.push("/")
        },
    },
    async mounted() {
        this.salePage = this.getSalePage(this.cartData, this.item.TOD_FID_SalePage)
        this.picture = this.getSalePagePicture(this.salePage)
        this.product = this.getProduct(this.salePage, this.item.TOD_FID_Goods)

        var today = new Date()
        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }
        this.today = today.toLocaleDateString("fa-IR", options)
    },
    watch: {
        state(newValue) {
            this.salePage = this.getSalePage(this.cartData, this.item.TOD_FID_SalePage)
            this.product = this.getProduct(this.salePage, this.item.TOD_FID_Goods)
        }
    }
}
</script>
<style lang="scss">
.cart-btn-box {
    button {
        background: white !important;
        border: 1px solid rgba(140, 140, 140, 0.2);
        border-radius: 15px;

        span {
            letter-spacing: normal;
            font-family: boldbakhtiari !important;
            // font-size: 13px;
        }
    }

}

@media (max-width:600px) {
    .cart-btn-box {
        span {
            font-size: 13px;
        }
    }
}

.cart-error-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #FFFDE7;
    width: fit-content;
    border-radius: 20px;

    button {
        span {
            letter-spacing: normal;
            font-weight: bold;
        }
    }
}

@media(max-width:600px) {
    .cart-error-box {
        font-size: 12px;
    }

    .cart-error-box-1 {
        font-size: 12px;
    }
}

.cart-error-box-1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #FFEBEE;
    width: fit-content;
    border-radius: 20px;

    button {
        span {
            letter-spacing: normal;
            font-weight: bold;
        }
    }
}
</style>