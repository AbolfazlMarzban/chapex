<template lang="">
  <v-row>
    <v-col cols="12 ">
      <div class="mt-6 my-user-attention color-green-custom  fn-bold">
        شما طراحی سفارش خود را به تیم چاپکس سپرده اید، ضمن تشکر از این انتخاب،
        لطفا بادقت فرم زیر را تکمیل بفرمایید تا تیم طراحی بر اساس این اطلاعات
        طراحی را آغاز کند
      </div>
    </v-col>
    <v-col cols="12">
      <LazyFormBuilderInDesignStatus
        :designStatusUploadsData="designStatusUploadsData"
      />

      <v-row>
        <v-col cols="12">
          <v-row class="uploads">
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
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="white-box">
            <div class="text-right">
              <label class="color-green-custom fn-bold fns-16 text-right"
                >راهنمای آپلود "محصول انتخاب شده"</label
              >
            </div>
            <hr class="mt-5" />
            <p>
              اطلاعاتی که در بخش نمایش داده می شود از دیتا بیس خوانده و تغییرات
              انها بصورت داینامیک می باشد. اطلاعاتی که در بخش نمایش داده می شود
              از دیتا بیس خوانده و تغییرات انها بصورت داینامیک می باشد. اطلاعاتی
              که در بخش نمایش داده می شود از دیتا بیس خوانده و تغییرات انها
              بصورت داینامیک می باشد. اطلاعاتی که در بخش نمایش داده می شود از
              دیتا بیس خوانده و تغییرات انها بصورت داینامیک می باشد. اطلاعاتی که
              در بخش نمایش داده می شود از دیتا بیس خوانده و تغییرات انها بصورت
              داینامیک می باشد. اطلاعاتی که در بخش نمایش داده می شود از دیتا بیس
              خوانده و تغییرات انها بصورت داینامیک می باشد. اطلاعاتی که در بخش
              نمایش داده می شود از دیتا بیس خوانده و تغییرات انها بصورت داینامیک
              می باشد. اطلاعاتی که در بخش نمایش داده می شود از دیتا بیس خوانده و
              تغییرات انها بصورت داینامیک می باشد. اطلاعاتی که در بخش نمایش داده
              می شود از دیتا بیس خوانده و تغییرات انها بصورت داینامیک می باشد.
              اطلاعاتی که در بخش نمایش داده می شود از دیتا بیس خوانده و تغییرات
              انها بصورت داینامیک می باشد. اطلاعاتی که در بخش نمایش داده می شود
              از دیتا بیس خوانده و تغییرات انها بصورت داینامیک می باشد.
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row class="pa-0 ma-0 check-part mt-4">
        <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12" class="pa-0 ma-0">
          <v-checkbox
            v-model="checkFile"
            class="mr-2 text-right"
            label="بررسی تخصصی فایل طراحی شما 50.000 تومان"
            value="check"
          >
          </v-checkbox>
        </v-col>

        <v-col
          cols="12"
          xl="6"
          lg="6"
          md="6"
          sm="12"
          xs="12"
          class="text-left pa-0 ma-0 mt-4"
        >
          <div class="pa-1 ml-4">
            <v-icon class="gr-color">mdi-cloud-question</v-icon>
            <span class="gr-color">چرا به بررسی تخصصی نیاز دارید؟</span>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-3">
        <v-col cols="12" xl="8" lg="8" md="12" sm="12" xs="12">
          <div class="check-part">
            <v-checkbox
              v-model="confirmUploads"
              label="پیش نمایش فایل آپلود شده را تایید می نمایم"
              class="text-right"
            >
            </v-checkbox>
          </div>
        </v-col>

        <v-col cols="12" xl="2" lg="2" md="12" sm="12" xs="12">
          <div class="btn-return">
            <NuxtLink
              class="silver-color"
              to="/cart"
              :style="{ cursor: 'pointer' }"
              >بازگشت
            </NuxtLink>
          </div>
        </v-col>

        <v-col
          @click="submitUploadresForm"
          :style="{ cursor: 'pointer' }"
          cols="12"
          xl="2"
          lg="2"
          md="12"
          sm="12"
          xs="12"
        >
          <div :class="confirmUploads == true ? 'btn-order' : 'btn-return'">
            تکمیل سفارش
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import "../../../../assets/style/designStatus/designStatus.scss";
import designStatusMixin from "../_mixins/designStatusMixins";
import designStatusVariables from "../_mixins/designStatusVariables";
export default {
  mixins: [designStatusMixin, designStatusVariables],
  props: [
    "cartProductId",
    "tabStateToKnowWhichPreviousFormDataHasToDelete",
    "FSlug",
    "FTag"
  ],

  data() {
    return {
      confirmUploads: false,
      checkFile: "",
      uploadersDataFromFormMaker: ""
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);  
    },
    async sendUploadersData(data) {
      try {
        let result = await this.insertFormData(data);
        if (result) {
          console.log("api sent from client");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async changeTabState(tabState) {
      try {
        let result = await this.setTabState(tabState, this.cartProductId);
        if (result) {
          console.log("api sent from client for tab state");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deletePreviousTabData(FTagOrSlugToDeleteFormData) {
      try {
        let result = await this.deletePreviousTabFormData(
          FTagOrSlugToDeleteFormData,
          this.cartProductId
        );
        if (result) {
          console.log("api sent from client for tab state");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async submitUploadresForm() {
      if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 1) {
        await this.deletePreviousTabData(this.FSlug);
      } else if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 2) {
        await this.deletePreviousTabData(this.FTag);
      }
      await this.changeTabState(2);
      // await this.sendUploadersData(this.checkFile);
      this.$router.push("/cart");
      this.scrollToTop();
    },
    designStatusUploadsData() {
      console.log("in designStatusUploads", this.customerUploadersData);
    }
  }
};
</script>
<style lang="scss"></style>
