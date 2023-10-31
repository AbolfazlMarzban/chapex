<template>
    <v-col cols="12" xl="10" lg="10" md="12" sm="12" xs="12">
        <div class="left-content">

            <!-- Start Block Tablet -->
            <div class="tablet-main d-none d-xl-none d-lg-none d-md-block d-sm-none d-xs-none">

                <v-row>
                    <v-col cols="4">
                        <div class="my-final-price">
                            <label>مبلغ نهایی سفارشات شما:</label>
                            <span class="lbl-number-price mr-2">15.256.258</span>
                            <span class="my-fn-12 my-green mr-1">تومان</span>
                        </div>
                    </v-col>

                    <v-col cols="2">

                    </v-col>

                    <v-col cols="6" class="text-left">
                        <div style="margin-top:10px">
                            <span class="my-btn-green-tablet ">ادامه فرآیند خرید</span>
                            <span class="my-btn-silver-tablet mr-1"
                                v-on:click="isDetailsPayTablet = !isDetailsPayTablet">مشاهده
                                صورت حساب
                            </span>
                        </div>
                    </v-col>
                </v-row>


                <v-col cols="12" v-if="isDetailsPayTablet">
                    <div class="details-pay-tablet mt-2">
                        <v-row>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span>قیمت کل (2 محصول)</span><br />
                                <span>5.067.258</span>
                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span>هزینه طراحی</span><br />
                                <span>5.067.258 تومان</span>
                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span>هزینه بررسی فایل</span><br />
                                <span>5.067.258 تومان</span>
                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span>هزینه ارسال</span><br />
                                <span>وابسته به شیوه ارسال</span>
                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span>مالیات بر ارزش افزوده</span><br />
                                <span>5.067.258 تومان</span>
                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span class="red-color">تخفیف دریافتی این سفارش</span><br />
                                <span class="red-color">250.000.000 تومان</span>
                            </v-col>
                        </v-row>

                        <hr class="mt-1" />

                        <v-row class="">
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span class="red-color">تخفیف بر اساس کد تخفیف</span><br />
                                <span class="red-color">250.000.000 تومان</span>
                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
                                <span class="red-color">اعتبار استفاده شده</span><br />
                                <span class="red-color">250.000.000 تومان</span>
                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">

                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">

                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">

                            </v-col>
                            <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">

                            </v-col>
                        </v-row>


                    </div>

                </v-col>

            </div>
            <!-- End Block Tablet -->


            <div class="space-transparent d-none d-xl-none d-lg-none d-md-block d-sm-none d-xs-none"></div>


            <!-- Start Block 1 -->
            <div class="my-left-content mb-5" v-for="(cartItem, index) in futureCartItems" :key="index">
                <v-row>
                    <v-col cols="12" xl="4" lg="4" md="4" sm="12" xs="12"><img src="img/p-main.png" alt="product"
                            class="img-responsive">
                    </v-col>

                    <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12">
                        <label class="my-lbl-title-16">{{ cartItem.TGO_FName }}</label>
                        <span class="my-fn-14 mr-2">({{ cartItem.TOD_FPrice }} تومان)</span>


                        <v-row class="mt-4">

                            <table class="mr-3">
                                <tr>
                                    <td style="border:none"><span class="my-lbl-title-14"> تیراژ انتخابی
                                        </span></td>
                                    <td class="pa-2" style="border:none">
                                        <select style="max-width:100px; min-width:70px">
                                            <option value="select">500</option>
                                            <option value="select">1000</option>
                                            <option value="select">1500</option>
                                            <option value="select">2000</option>
                                        </select>
                                    </td>
                                    <td style="border:none">
                                        <!-- Start Dialog -->
                                        <span>
                                            <v-dialog v-model="dialogListPrice" width="500">
                                                <template v-slot:activator="{ on, attrs }">

                                                    <span class="my-fn-14" v-bind="attrs" v-on="on">
                                                        مشاهده لیست تیراژ و قیمت
                                                    </span>

                                                </template>

                                                <v-card>
                                                    <v-card-title class="bgcolor-mid-silver">

                                                        <div style="min-width:100%;">
                                                            <v-row>
                                                                <v-col cols="9">
                                                                    <div class="my-popup-title">
                                                                        لیست قیمت در تیراژ مختلف
                                                                    </div>
                                                                </v-col>
                                                                <v-col cols="3" class="text-left">
                                                                    <div class="user-opinion float-left">
                                                                        <div class="" text
                                                                            @click="dialogListPrice = false">
                                                                            <v-icon>mdi-close-thick</v-icon>
                                                                        </div>
                                                                    </div>
                                                                </v-col>
                                                            </v-row>

                                                        </div>

                                                    </v-card-title>

                                                    <v-card-text><br />


                                                        <div class="my-dialog-table justify-center text-center">
                                                            <table>

                                                                <tr>
                                                                    <td class="my-fn-bold br-buttom">تخفیف
                                                                    </td>
                                                                    <td class="my-fn-bold br-buttom">قیمت کل
                                                                    </td>
                                                                    <td class="my-fn-bold br-buttom">قیمت تک
                                                                    </td>
                                                                    <td class="my-fn-bold br-buttom">تیراژ
                                                                    </td>
                                                                </tr>


                                                                <tr>
                                                                    <td><del>1.846.366</del></td>
                                                                    <td>
                                                                        <span class="sp-green">1.546.366</span>
                                                                        <span class="my-fn-12 mr-1">تومان</span>
                                                                    </td>
                                                                    <td>54165</td>
                                                                    <td>500</td>
                                                                </tr>

                                                                <tr>
                                                                    <td><del>1.846.366</del></td>
                                                                    <td>
                                                                        <span class="sp-green">1.546.366</span>
                                                                        <span class="my-fn-12 mr-1">تومان</span>
                                                                    </td>
                                                                    <td>54165</td>
                                                                    <td>1000</td>
                                                                </tr>

                                                                <tr>
                                                                    <td><del>1.846.366</del></td>
                                                                    <td>
                                                                        <span class="sp-green">1.546.366</span>
                                                                        <span class="my-fn-12 mr-1">تومان</span>
                                                                    </td>
                                                                    <td>54165</td>
                                                                    <td>1500</td>
                                                                </tr>

                                                                <tr>
                                                                    <td><del>1.846.366</del></td>
                                                                    <td>
                                                                        <span class="sp-green">1.546.366</span>
                                                                        <span class="my-fn-12 mr-1">تومان</span>
                                                                    </td>
                                                                    <td>54165</td>
                                                                    <td>2000</td>
                                                                </tr>



                                                            </table>

                                                        </div>


                                                    </v-card-text>

                                                    <v-divider></v-divider>

                                                    <v-card-actions class="d-none">
                                                        <v-spacer></v-spacer>
                                                        <div class="user-opinion">
                                                            <div class="btn-close" text
                                                                @click="dialogListPrice = false">
                                                                <v-icon>mdi-close-thick</v-icon>
                                                            </div>
                                                        </div>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </span>
                                        <!-- End Dialog -->
                                    </td>
                                </tr>
                            </table>

                        </v-row>

                        <div class="pa-0 ma-0 mt-3">
                            <v-checkbox class="pa-0 ma-0 mt-2" v-model="selected"
                                label="بررسی تخصصی فایل طراحی شما 50.000 هزار تومان"
                                value="بررسی تخصصی فایل طراحی شما 50.000 هزار تومان">
                            </v-checkbox>
                        </div>

                        <br />
                        <div class="my-product-info">
                            <label class="my-lbl-title-14">مشخصات تولیدی محصول:</label><br />
                            <p class="mt-1">
                                {{ cartItem.TGO_FCaption }}
                            </p>
                        </div>



                        <div class="mt-2">
                            <v-row class="pa-2">
                                <v-col cols="12">
                                    <span class="my-green my-lbl-title-14">مبلغ نهایی سفارش شما:
                                    </span>
                                    <span class="my-green my-lbl-title-16">{{ cartItem.TOD_FPrice }}
                                    </span>
                                    <span class="my-fn-12 my-green">تومان</span>
                                </v-col>
                            </v-row>
                        </div>

                        <hr style="margin-top : -10px;" />
                        <div class="my-fn-12 pa-0 mt-4 mr-3">
                            <v-row>
                                <v-col cols="12" xl="4" lg="5" md="12" sm="12" xs="12" class="pa-0">
                                    <v-icon>mdi-backburger</v-icon>
                                    <span @click="backInCurrentCart(cartItem.TOD_FID, cartItem)" class="mr-1">برگشت به
                                        سبد خرید</span>
                                </v-col>
                                <v-col cols="12" xl="4" lg="3" md="12" sm="12" xs="12" class="pa-0">
                                    <v-icon>mdi-delete</v-icon>
                                    <span @click="deleteItemFromFutureCart(cartItem.TOD_FID)" class="mr-1">حذف</span>
                                </v-col>
                            </v-row>
                        </div>


                        <br />

                    </v-col>
                </v-row>
            </div>
        </div>
    </v-col>

</template>
<script>
import '../../../assets/style/cart/cart.scss';
import cartDetailMixins from './_mixins/cartDetailMixins';
import cartDetailVariables from './_mixins/cartDetailVariables';

export default {
    mixins: [cartDetailMixins, cartDetailVariables],
    props: ["futureCartItems"],
    data() {
        return {
            state: 'backToCurrentCart'
        }
    },
    methods: {

        async changeCartItemStatus(cartItemRowId, cartItemDetail) {
            try {
                console.log(cartItemDetail);
                const result = await this.changeCartBasketId(0, cartItemRowId, cartItemDetail, this.state);
                if (result) {
                    if (result) {
                        this.$emit("updatedFutureCartItems")
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        async deleteItemFromCart(rowItem) {
            try {
                const result = await this.deleteCartItem(rowItem);
                if (result) {
                    this.$emit("futureItemDeletedAndUpdate");
                    // console.log("item was deleted");
                }
            } catch (error) {
                console.log(error);
            }
        },

        backInCurrentCart(cartItemRowId, cartItemDetail) {
            this.changeCartItemStatus(cartItemRowId, cartItemDetail);

        },

        deleteItemFromFutureCart(rowIdToDelete) {
            this.deleteItemFromCart(rowIdToDelete)
        }
    },
}
</script>

<style scoped>

</style>