<template>
  <div>
    <v-row v-for="(item, i) in cartData.currentCartItems" :key="i" class="chapex-factor"
      style="page-break-before:always !important;">
      <v-col cols="12">
        <v-row class="pa-2 align-center">
          <v-col cols="4" class="text-center d-flex align-center justify-start">
            <img src="../../../../assets/img/Chapex.png" alt="" style="width: 30%;" />
          </v-col>
          <v-col cols="4" class="text-center d-flex align-center justify-center">
            <label class="fn-bold fns-18">پیش فاکتور فروش کالا و خدمات</label>
          </v-col>
          <v-col cols="4">
            <div class="d-flex flex-row justify-end">
              <div class="d-flex flex-column">
                <span>تاریخ:</span>
                <span>شماره پیش فاکتور:</span>
                <span>شماره پیگیری:</span>
              </div>
              <div class="mr-5">
                <div class="px-3" style="border: 1px solid lightgray;">
                  {{ today }}
                </div>
                <div class="px-3" style="border: 1px solid lightgray;">
                  0203223874
                </div>
                <div class="px-3" style="border: 1px solid lightgray;">
                  {{ item.TOD_FID }}
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="text-center factor-header">
              <label>مشخصات فروشنده</label>
            </div>
            <v-row style="width: 100%; margin: 0px; border: 1px solid black; border-top: none; border-bottom: none;">
              <v-col cols="6">
                <label class="fn-bold">نام شخص تجاری:</label>
                <span>مجتمع چاپ چاپِکس</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">نام شخص حقیقی:</label>
                <span>احسان عصاره زادگان دزفولی</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شماره ملی:</label>
                <span>1750484307</span>
              </v-col>
              <v-col cols="6">
                <label class="fn-bold">نشانی:</label>
                <span>اهواز - بلوار آیت اله بهبهانی اهواز (روبروی ایران خودرو
                  زیبایی)- نبش خیابان نبی ئی - مجتمع چاپ چاپکس</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">کد پستی:</label>
                <span>6194794761</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شماره تلفن:</label>
                <span>02191017919</span>
              </v-col>
            </v-row>
            <div class="text-center factor-header">
              <label>مشخصات خریدار</label>
            </div>
            <v-row style="width: 100%; margin: 0px; border: 1px solid black; border-top: none; border-bottom: none;"
              v-if="legal.length > 0 && legal[0].TUX_FType == 0">
              <v-col cols="3">
                <label class="fn-bold">نام شخص حقیقی / حقوقی:</label>
                <span>{{ legal[0].TUX_FName }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شماره اقتصادی:</label>
                <span>{{ legal[0].TUX_FEcoCode }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شماره ملی:</label>
                <span>{{ legal[0].TUX_FMelli }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شماره تلفن:</label>
                <span>{{ legal[0].TUX_FTel }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">نشانی:</label>
                <span>{{ legal[0].TUX_FAddress }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">استان:</label>
                <span>{{ province }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شهر:</label>
                <span>{{ city }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">کد پستی:</label>
                <span>{{ postalCode }}</span>
              </v-col>
            </v-row>
            <v-row v-else-if="legal.length > 0 && legal[0].TUX_FType == 1"
              style="width: 100%; margin: 0px; border: 1px solid black; border-top: none; border-bottom: none;">
              <v-col cols="3">
                <label class="fn-bold">نام تجاری:</label>
                <span>{{ legal[0].TUX_FName }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">کد اقتصادی:</label>
                <span>{{ legal[0].TUX_FEcoCode }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شناسه ملی:</label>
                <span>{{ legal[0].TUX_FMelli }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شماره تلفن:</label>
                <span>{{ legal[0].TUX_FTel }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">نشانی:</label>
                <span>{{ legal[0].TUX_FAddress }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">استان:</label>
                <span>{{ province }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">شهر:</label>
                <span>{{ city }}</span>
              </v-col>
              <v-col cols="3">
                <label class="fn-bold">کد پستی:</label>
                <span>{{ postalCode }}</span>
              </v-col>
            </v-row>
            <div class="text-center factor-header">
              <label>مشخصات کالا یا خدمات مورد معامله </label>
            </div>
            <table style="width: 100%;border-collapse: collapse;" class="factor-table">
              <tr class="text-center">
                <th>ردیف</th>
                <th>کد کالا</th>
                <th>شرح کالا / خدمت</th>
                <th>تعداد / مقدار</th>
                <th>واحد</th>
                <th>مبلغ واحد</th>
                <th>مبلغ کل</th>
                <th>مبلغ تخفیف</th>
                <th>مبلغ اضافات</th>
                <th>مبلغ کل پس از تخفیف و اضافات</th>
                <th>جمع مالیات و عوارض</th>
                <th>خالص فاکتور</th>
              </tr>

              <tr>
                <td>{{ i }}</td>
                <td>{{ item.TOD_FID }}</td>
                <td>{{ item.TOD_FName }}</td>
                <td>{{ item.TOD_FCount }}</td>
                <td>{{ item.TGO_FID_UnitName }}</td>
                <td>{{ calcUnitPrice(item) }}</td>
                <td>{{ totalPriceCalc(item) }}</td>
                <td>{{ numberSeparate(item.TOD_FDiscount * 10) }}</td>
                <td>0</td>
                <td>{{ calcAfterPrice(item) }}</td>
                <td>{{ taxCalc(item) }}</td>
                <td>{{ numberSeparate(finalCalc(item)) }}</td>
              </tr>
              <tr>
                <td colspan="6">جمع کل</td>
                <td>{{ totalPriceCalc(item) }}</td>
                <td>{{ numberSeparate(item.TOD_FDiscount * 10) }}</td>
                <td>0</td>
                <td>{{ calcAfterPrice(item) }}</td>
                <td>{{ taxCalc(item) }}</td>
                <td>{{ numberSeparate(finalCalc(item)) }}</td>
              </tr>
              <tr>
                <td colspan="6">
                  <div class="d-flex justify-space-between">
                    <span>شرایط و نحوه فروش:</span>
                    <div class="d-flex">
                      <div class="d-flex align-center naghdi">
                        <span>نقدی</span>
                        <div class="mr-2" style="width: 16px; height: 16px; border: 1px solid #000; background: #000;">
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td colspan="6">
                  <span class="mr-2">{{ totalInWords(item) }} ريال</span>
                </td>
              </tr>
              <tr>
                <td colspan="12">
                  <div class="d-flex align-center">
                    <span>توضیحات:</span>
                    <div class="d-flex flex-column mr-1">
                      <span>زمان مورد نیاز برای چاپ این محصول:
                        {{ item.TGO_FProductionTime }} روز کاری
                      </span>
                      <span>مدت اعتبار پیش فاکتور
                        {{ item.TGO_FProductionTime }} روز تا تاریخ
                        {{ doomDay(item.TGO_FProductionTime) }} می باشد</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="12">
                  <div class="d-flex flex-column">
                    <span>اطلاعات حساب:</span>
                    <span v-for="(item, i) in bankAccount" :key="i">
                      {{ item }}
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="6">
                  <span>مهر و امضای فروشنده:</span>
                  <img src="../../../../assets/img/mohr & emza.png" alt="" style="width: 10%;" />
                </td>
                <td colspan="6">
                  <span>مهر و امضای خریدار:</span>
                </td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <br />
  </div>
</template>

<script>
// import Num2persian from "num2persian";
import cartDetailMixins from "../../cart/_mixins/cartDetailMixins";
import saleDataMixin from "../../sale/_mixins/saleDataMixin";
import paymentMixins from "../_mixins/paymentMixins";
export default {
  mixins: [cartDetailMixins, saleDataMixin, paymentMixins],
  props: ["showFactor", "legal", "account"],
  data() {
    return {
      cartData: {
        currentCartItems: [],
        salePages: []
      },
      totalPrice: 0,
      pmethod: null,
      taxRate: 0,
      city: "",
      province: "",
      postalCode: "",
      today: ""
    };
  },
  computed: {
    bankAccount() {
      return this.account;
    }
  },
  mounted() {
    this.getCartItems();
    this.getTaxRate();
    var today = new Date();
    var options = {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    };
    this.today = today.toLocaleDateString("fa-IR", options);
  },
  created() {
    this.getAddress(this.legal);
    this.printFactor();
  },
  methods: {
    printFactor() {
      setTimeout(() => {
        window.print();
      }, 3000);
    },

    totalInWords(item) {
      var x = this.finalCalc(item);
      return Num2persian(x * 10);
    },

    doomDay(value) {
      var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      };
      var date = new Date(new Date().getTime() + value * 24 * 60 * 60 * 1000);
      return date.toLocaleDateString("fa-IR", options);
    },

    async getAddress(value) {
      try {
        const addressID = value[0].TUX_FID_Address;
        const result = await this.$authAxios.$post(`/address/getinfo/post`, {
          data: addressID
        });
        if (result) {
          console.log("reulst", result);
          this.postalCode = result.postalCode;
          this.city = result.city;
          this.province = result.province;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getCartItems() {
      const result = await this.getCartData();
      // console.log('result', result)
      if (result) {
        if (result.cartItems && result.cartItems.length > 0) {
          this.cartData.currentCartItems = result.cartItems.filter(
            item => item.TOD_FBasketIndex == 0
          );
          this.cartData.salePages = result.salePages;

          this.cartData.currentCartItems.forEach(cartItem => {
            const salePage = this.getSalePage(
              this.cartData,
              cartItem.TOD_FID_SalePage
            );
            const finalPrice = this.calcPriceInCart(
              salePage,
              cartItem.TOD_FID_Goods,
              cartItem.TOD_FID_SelectedOptions,
              cartItem.TOD_FCount,
              1,
              cartItem.TOD_FDesignStatus,
              cartItem.TOD_FReviewNeed
            );
            this.totalPrice += finalPrice;
          });
          // console.log("cartData", this.cartData);
          this.loading = false;
        }
      }
    },
    totalPriceCalc(item) {
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
        var finalPrice = this.calcPriceInCart(
          salePage,
          item.TOD_FID_Goods,
          item.TOD_FID_SelectedOptions,
          item.TOD_FCount,
          1,
          item.TOD_FDesignStatus,
          item.TOD_FReviewNeed
        );
      }
      var x = Math.round(finalPrice);
      return this.numberSeparate(x * 10);
    },
    totalDiscount() {
      var sum = 0;
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        this.cartData.currentCartItems.forEach(i => (sum += i.TOD_FDiscount));
      }
      return this.numberSeparate(Math.round(sum));
    },

    calcAfterPrice(item) {
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
        var finalPrice = this.calcPriceInCart(
          salePage,
          item.TOD_FID_Goods,
          item.TOD_FID_SelectedOptions,
          item.TOD_FCount,
          1,
          item.TOD_FDesignStatus,
          item.TOD_FReviewNeed
        );
      }
      var x = Math.round(finalPrice - item.TOD_FDiscount);
      return this.numberSeparate(x * 10);
    },
    totalCalcAfter() {
      var sum = 0;
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        this.cartData.currentCartItems.forEach(item => {
          var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
          var finalPrice = this.calcPriceInCart(
            salePage,
            item.TOD_FID_Goods,
            item.TOD_FID_SelectedOptions,
            item.TOD_FCount,
            1,
            item.TOD_FDesignStatus,
            item.TOD_FReviewNeed
          );
          var p = finalPrice - item.TOD_FDiscount;
          sum += p;
        });
      }
      return this.numberSeparate(Math.round(sum));
    },
    calcUnitPrice(item) {
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
        var finalPrice = this.calcPriceInCart(
          salePage,
          item.TOD_FID_Goods,
          item.TOD_FID_SelectedOptions,
          item.TOD_FCount,
          1,
          item.TOD_FDesignStatus,
          item.TOD_FReviewNeed
        );
      }
      var x = Math.round(finalPrice / item.TOD_FCount);
      return this.numberSeparate(x * 10);
    },
    // getLegalInfo() {
    //   const legal = this.$store.getters["cart/getLegalInfo"];
    //   console.log("legal", legal);
    //   this.legal = legal[0];
    // },
    async getTaxRate() {
      try {
        const result = await this.$authAxios.$get(
          `/defaults/get/20301?mode=tablechildren`
        );
        if (result) {
          if (result.data.table[0].TD_FValue1 == 1) {
            this.taxRate = result.data.table[0].TD_FValue2;
          } else {
            this.taxRate = 0;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    taxCalc(item) {
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
        var finalPrice = this.calcPriceInCart(
          salePage,
          item.TOD_FID_Goods,
          item.TOD_FID_SelectedOptions,
          item.TOD_FCount,
          1,
          item.TOD_FDesignStatus,
          item.TOD_FReviewNeed
        );
      }
      var x = Math.round(finalPrice * this.taxRate);
      return this.numberSeparate(x * 10);
    },
    finalCalc(item) {
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
        var finalPrice = this.calcPriceInCart(
          salePage,
          item.TOD_FID_Goods,
          item.TOD_FID_SelectedOptions,
          item.TOD_FCount,
          1,
          item.TOD_FDesignStatus,
          item.TOD_FReviewNeed
        );
      }
      var x = Math.round(finalPrice * this.taxRate + finalPrice);
      return (x * 10);
    },
    totalTax() {
      var sum = 0;
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        this.cartData.currentCartItems.forEach(item => {
          var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
          var finalPrice = this.calcPriceInCart(
            salePage,
            item.TOD_FID_Goods,
            item.TOD_FID_SelectedOptions,
            item.TOD_FCount,
            1,
            item.TOD_FDesignStatus,
            item.TOD_FReviewNeed
          );
          var p = finalPrice - item.TOD_FDiscount;
          sum += p;
        });
      }
      return this.numberSeparate(Math.round(sum * this.taxRate));
    },
    totaFinalCalc() {
      var sum = 0;
      if (
        this.cartData.currentCartItems &&
        this.cartData.currentCartItems.length > 0
      ) {
        this.cartData.currentCartItems.forEach(item => {
          var salePage = this.getSalePage(this.cartData, item.TOD_FID_SalePage);
          var finalPrice = this.calcPriceInCart(
            salePage,
            item.TOD_FID_Goods,
            item.TOD_FID_SelectedOptions,
            item.TOD_FCount,
            1,
            item.TOD_FDesignStatus,
            item.TOD_FReviewNeed
          );
          var p = finalPrice * this.taxRate + finalPrice;
          sum += p;
        });
        return this.numberSeparate(Math.round(sum) * 10);
      }
    }
  },
  watch: {
    legal(newValue) {
      this.getAddress(this.legal);
    }
  }
};
</script>

<style lang="scss">
.factor-header {
  color: black;
  border: 1px solid black;
  background: lightgray;

  label {
    font-weight: bold;
  }
}

.factor-table {

  td,
  th {
    border: 1px solid black;
    border-radius: 0px;
  }

  td {
    padding-right: 20px;
  }
}
</style>
<style lang="css">
@media print {
  @page {
    size: landscape;
  }
}

@media print {
  .chapex-factor {
    page-break-before: always !important;
    width: 100%;
    height: 100%;
    margin-top: 1ch;
  }
}
</style>
