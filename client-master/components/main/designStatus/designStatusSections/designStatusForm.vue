<template>
  <v-col cols="12">

    <v-row>
      <!-- <v-col cols="12 ">
      <div class="mt-6 my-user-attention color-green-custom  fn-bold">
        شما طراحی سفارش خود را به تیم چاپکس سپرده اید، ضمن تشکر از این انتخاب،
        لطفا بادقت فرم زیر را تکمیل بفرمایید تا تیم طراحی بر اساس این اطلاعات
        طراحی را آغاز کند
      </div>
    </v-col> -->

      <v-col cols="12">

        <!-- <div class="order-box">
        <div class="mb-3">
          <label class="fn-bold fns-14">فرم سفارش طراحی</label>
        </div>
        <div class="obox">
          <ul>
            <li class="gr-color">
              مواردی که در این صفحه از شما درخواست شده است بعنوان دستور کار
              طراحان ما لحاظ می شود
            </li>
            <br />
            <li>
              اگر اطلاعاتی که تمایل دارید بروی سفارش شما چاپ شود از موارد فرم
              پایین بیشتر است در بخش توضیحات تکمیلی استفاده کنید
            </li>
            <br />
            <li>
              هر کدام از اطلاعات را که مایلید بصورت لاتین در سفارشتان چاپ شود ،
              در بخش های پایین بصورت لاتین درج بفرمایید
            </li>
            <br />
            <li>
              پر کردن تمامی کادرها اجباری نیست و شما می‌توانید اطلاعاتی را که
              می‌خواهید در طراحی سفارشتان استفاده شود را برای طراحان ما بنویسید
            </li>
            <br />
          </ul>
        </div>
      </div> -->

        <!-- <LazyFormMaker :productIdForFIDLink="cartProductId" :formDataPropsToChangeDataFromParent="formDataFromFormMaker"  :formBuilderDataFromFirstTab="formBuilderDataFromDesignStatus" /> -->

        <!-- <v-row>
        <v-col cols="12">
          <v-row class="uploads mt-3">
            <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12">
              <div class="upl-box">
                <br /><br />
                <v-icon>mdi-cloud-upload-outline</v-icon>
                <p>
                  برای آپلود تصاویر، متون، و طرح های دلخواه خود می توانید بر روی
                  همین کادر کلیک کرده و یا فایل های مورد نظر خود را در این بخش
                  رها کنید
                </p>
              </div>
            </v-col>
            <v-col cols="12" xl="4" lg="4" md="8" sm="12" xs="12">
              <div class="upl-box">
                <br /><br />
                <v-icon>mdi-cloud-upload-outline</v-icon>
                <p>
                  در صورتی که تمایل دارید لوگوی شما در طراحی قرار گیرد فایل با
                  کیفیت آن رادر این کادر آپلود کنید
                </p>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->

        <v-row class="">

          <!-- <v-col cols="12" xl="8" lg="8" md="12" sm="12" xs="12"> -->
          <v-col cols="12">
            <div class="bx-custom-1">
              <span>قیمت محصول </span>
              <span>{{ salePage.TPS_FTitle }}</span>
              <span>{{ numberSeparate(calcPriceInCart(salePage, item.TOD_FID_Goods, item.TOD_FID_SelectedOptions,
                item.TOD_FCount, 1)) }}</span>
              <span> تومان و هزینه طراحی آن به صورت مجزا </span>
              <span>{{ numberSeparate(designPrice) }}</span>
              <span> تومان میباشد</span>
            </div>
          </v-col>

          <!-- <v-col @click="submitFormData" cols="12" xl="4" lg="4" md="12" sm="12" xs="12">
            <div class="btn-order">
              تایید طراحی توسط تیم چاپکس
            </div>
          </v-col> -->

        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import "../../../../assets/style/designStatus/designStatus.scss";
import designStatusMixin from "../_mixins/designStatusMixins";
import designStatusVariables from "../_mixins/designStatusVariables";
import saleDataMixin from "../../sale/_mixins/saleDataMixin";

export default {

  mixins: [designStatusMixin, designStatusVariables, saleDataMixin],

  props: ["cartData", "item", "salePage"],

  data() {
    return {
      designPrice: 0,
    };
  },

  mounted() {
    this.designPrice = this.calcDesignPrice(this.salePage, this.item.TOD_FID_SelectedOptions, this.item.TOD_FID_Goods)
  },
};
</script>
