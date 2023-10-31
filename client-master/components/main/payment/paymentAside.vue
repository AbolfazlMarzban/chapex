<template>
  <v-col class="mt-5" cols="12" xl="4" lg="4" md="4" sm="12" xs="12">
    <div class="my-cart-box-slide">
      <v-row>
        <v-col cols="6" class="text-right fns-14">
          قیمت کل (2 محصول)
        </v-col>
        <v-col cols="6" class="text-left ">
          <span class="black-color">5.067.258 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="6" class="text-right fns-14">
          هزینه طراحی
        </v-col>
        <v-col cols="6" class="text-left">
          <span class="black-color">5.067.258 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="6" class="text-right fns-14">
          هزینه بررسی فایل
        </v-col>
        <v-col cols="6" class="text-left fn-bold">
          <span class="black-color">5.067.258 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="6" class="text-right fns-14">
          هزینه ارسال
        </v-col>
        <v-col cols="6" class="text-left fns-14">
          <span class="black-color">وابسته به شیوه ارسال</span>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="6" class="text-right fns-14">
          مالیات بر ارزش افزوده
        </v-col>
        <v-col cols="6" class="text-left">
          <span class="black-color">5.067.258 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>

      <hr class="mb-2" />

      <v-row class="mt-4">
        <v-col cols="7" class="text-right red-color fn-bold fns-14">
          تخفیف دریافتی این سفارش
        </v-col>
        <v-col cols="5" class="text-left fn-bold">
          <span class="red-color fn-bold">250.000.000 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="7" class="text-right red-color fn-bold fns-14">
          تخفیف بر اساس کد تخفیف
        </v-col>
        <v-col cols="5" class="text-left">
          <span class="red-color fn-bold">250.000 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="7" class="text-right red-color fn-bold fns-14">
          اعتبار استفاده شده
        </v-col>
        <v-col cols="5" class="text-left">
          <span class="red-color fn-bold">250.000 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>

      <hr class="mb-2" />

      <v-row class="mt-3">
        <v-col cols="6" class="text-right fn-bold-cart">
          <span class="black-color fn-bold-cart fns-18"> مبلغ نهایی سفارش</span>
        </v-col>
        <v-col cols="6" class="text-left">
          <span class="black-color fn-bold-cart fns-20">5.067.258 </span>
          <span class="black-color fns-12 mr-1">تومان</span>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <div @click="emitDataForVuex" class="btn-order pa-4 mb-2 fns-18" style="min-width: 100%">
          پذیرش قوانین و پرداخت
        </div>
      </v-row>
      <br />
    </div>

    <br />
    <div class="my-cart-box hidden-md-and-down">
      <v-row>
        <v-col cols="6">
          <label class="title fn-bold">لیست محصولات</label></v-col>
        <v-col cols="6" class="text-left"><span class="my-light-silver-box">3 محصول</span>
        </v-col>
      </v-row>
      <hr />

      <v-row class="mt-2" v-for="(product, index) in data.product" :key="index">
        <v-col cols="3"><img src="" alt="product" class="img-responsive" />
        </v-col>
        <v-col cols="9" class="fns-14">
          <span class="black-color">{{ product.product }}</span><br />
          <span>تیراژ : {{ product.number }}</span><br />
        </v-col>
      </v-row>
    </div>

    <v-row class="mt-1">
      <v-col cols="12" class="pa-3">
        <v-icon class="fns-14 color-green-custom">mdi-chevron-right</v-icon>
        <label class="fns-16 cursor-pointer  color-green-custom">بازگشت به وضعیت ارسال</label>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import "../../../assets/style/cart/cart.scss";

export default {
  data() {
    return {
      data: {
        product: [
          {
            product: "کیف دستی",
            number: 260,
            img: "../../assets/img/p-main.png"
          },
          {
            product: "کیف غیر دستی",
            number: 100,
            img: "../../assets/img/p-main.png"
          },
          {
            product: "کیف نیمه دستی",
            number: 300,
            img: "../assets/img/p-main.png"
          },
          {
            product: "کیف پایی",
            number: 800,
            img: "../../assets/img/p-main.png"
          }
        ]
      }
    };
  },

  methods: {
    emitDataForVuex() {
      this.$emit("paymentData");
    }
  }
};
</script>
<style lang=""></style>
