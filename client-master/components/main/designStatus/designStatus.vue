<template>
  <v-row class="my-left-content mt-1 mb-8 px-3 py-3">
    <v-col cols="12" xl="2" lg="2" md="2" sm="12" xs="12">
      <img v-if="item.salePage" :src="setImageUrl(item.salePage.picture.path)" :alt="item.salePage.picture.alt"
        class="img-responsive" />
    </v-col>

    <v-col cols="12" xl="10" lg="10" md="10" sm="12" xs="12" class="justify-center">


      <label class="my-lbl-title-16">{{ item.salePage.TPS_FTitle }}</label>
      <span v-if="currentStatus == -1" class="my-fn-14 mr-2 pink--text">«تعیین نشده»</span>
      <span v-if="currentStatus == 0" class="my-fn-14 mr-2">«طراحی توسط تیم چاپکس»</span> 
      <span v-if="currentStatus > 0" class="my-fn-14 mr-2">«طراحی توسط خودم»</span>

      <div class="status">
        <v-row class="justify-center">

          <v-col v-if="getDesignChild(item.salePage, item.TOD_FID_SelectedOptions)" cols="6" sm="12" md="6" lg="6"
            xl="6">
            <div @click="addDesign()" class="sbox" :class="[{ activeBox: currentStatus == 0 }]">
              <span>
                <v-icon>mdi-image-edit-outline</v-icon>
              </span>
              <span style="font-weight: bold;">
                طراحی توسط تیم
                چاپکس
              </span>
            </div>
          </v-col>

          <v-col cols="6" sm="12" md="6" lg="6" xl="6">
            <div @click="removeDesign()" class="sbox"
              :class="[{ activeBox: currentStatus == 1 || currentStatus == 2 }]">
              <span>
                <v-icon>mdi-upload</v-icon>
              </span>
              <span style="font-weight: bold;">
                طراحی توسط خودم
              </span>
            </div>
          </v-col>

        </v-row>

        <v-row v-if="currentStatus > 0">

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <div @click="currentStatus = 1" class="sbox" :class="[{ activeBox: currentStatus == 1 }]">
              <span>
                <v-icon>mdi-upload</v-icon>
              </span>
              <span style="font-weight: bold;">
                آپلود فایل
              </span>
            </div>
          </v-col>

          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <div @click="currentStatus = 2" class="sbox" :class="[{ activeBox: currentStatus == 2 }]">
              <span>
                <v-icon>mdi-file-send-outline</v-icon>
              </span>
              <span class="cur-pointer" style="font-weight: bold;">
                ارسال فایل
              </span>
            </div>
          </v-col>

          <v-col v-if="getReviewChild(item.salePage, item.TOD_FID_SelectedOptions)" cols="12">
            <v-checkbox class="pa-0 ma-0 mt-2 text-right" v-model="review" :value="review" @change="changeReview"
              :label="`بررسی تخصصی فایل طراحی شما ${numberSeparate(reviewPrice)} هزار تومان`">
            </v-checkbox>
          </v-col>


        </v-row>
      </div>

      <LazyDesignStatusForm v-if="currentStatus == 0" :cartData="cartData" :item="item" />

      <!-- <LazyDesignStatusUploads :cartProductId="cartDataFromVuex.TOD_FID"
          :tabStateToKnowWhichPreviousFormDataHasToDelete="designStatusTabState" :FSlug="productFSlug"
          :FTag="productFTag" v-if="designStatusUploads" />

        <LazyDesignStatusSendMethod :telegramStateFromVuex="telegramTabState" :emailStateFromVuex="emailTabState"
          :flashOrCdStateFromVuex="flashOrCdTabState" :cartProductId="cartDataFromVuex.TOD_FID"
          :tabStateToKnowWhichPreviousFormDataHasToDelete="designStatusTabState" :FSlug="productFSlug"
          :FTag="productFTag" v-if="designStatusSendMethods" /> -->
    </v-col>
  </v-row>
</template>

<script>
import '../../../assets/style/designStatus/designStatus.scss';
import designStatusMixin from './_mixins/designStatusMixins';
import designStatusVariables from './_mixins/designStatusVariables';
import userSaleMixin from "../sale/_mixins/userSaleMixin"
import cartDetailMixins from '../cart/_mixins/cartDetailMixins';

export default {
  props: ["cartData", "item"],
  mixins: [designStatusMixin, designStatusVariables, userSaleMixin, cartDetailMixins],
  data() {
    return {
      telegramTabState: false,
      emailTabState: false,
      flashOrCdTabState: false,
      currentStatus: -1,
      review: null,
      reviewPrice: 0
    };
  },
  methods: {
    async setCurrentStatus() {

      this.currentStatus = 1
      if (this.hasDesignChild(this.item.salePage, this.item.TOD_FID_SelectedOptions)) {
        this.currentStatus = 0
      }


      this.review = false
      if (this.hasReviewChild(this.item.salePage, this.item.TOD_FID_SelectedOptions)) {
        this.review = true
      }
    },
    async getChapexDesignForms(mode, productId) {
      try {
        const result = await this.getFormAndUploadersOfFormBuilder(this.productFSlug, mode, productId);
        if (result) {
          console.log("designForms", result)
          return this.designFormData = result.data;
          // console.log(this.designFormData , "design form data");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCustomerUploaders(mode, productId) {
      try {
        const result = await this.getFormAndUploadersOfFormBuilder(this.productFTag, mode, productId);
        if (result) {
          console.log("customerUploaderData", result)
          this.customerUploadersData = result.data;
          console.log(this.customerUploadersData, "uploader");
        }
      } catch (error) {
        console.log(error);
      }
    },


    async addDesign() {
      console.log('asdasdasdasd')
      if (this.currentStatus == 0) return

      this.currentStatus = 0

      const designChild = this.getDesignChild(this.item.salePage, this.item.TOD_FID_SelectedOptions)
      const reviewChild = this.getReviewChild(this.item.salePage, this.item.TOD_FID_SelectedOptions)

      console.log('designChild', designChild)
      if (reviewChild) {
        const index = this.item.TOD_FID_SelectedOptions.findIndex(c => c == reviewChild.TD_FID)
        if (index > -1) {
          this.item.TOD_FID_SelectedOptions.splice(index, 1)
          this.review = false
        }
      }

      if (designChild) {
        this.item.TOD_FID_SelectedOptions.push(designChild.TD_FID)

        const result = await this.updateCartItem(0, this.item)
      }
    },
    async removeDesign() {
      if (this.currentStatus == 1) return

      this.currentStatus = 1

      const designChild = this.item.salePage.all_children.find(c => c.TD_FType == 21704 && this.isChildDepends(this.item.salePage, this.item.TOD_FID_SelectedOptions, c.TD_FID))

      if (designChild) {
        const index = this.item.TOD_FID_SelectedOptions.findIndex(c => c == designChild.TD_FID)
        if (index > -1) {
          this.item.TOD_FID_SelectedOptions.splice(index, 1)

          const result = await this.updateCartItem(0, this.item)
        }
      }
    },


    async changeReview(value) {
      if (value)
        await this.addReview()
      else
        await this.removeReview()

    },
    async addReview() {
      const designChild = this.getDesignChild(this.item.salePage, this.item.TOD_FID_SelectedOptions)
      const reviewChild = this.getReviewChild(this.item.salePage, this.item.TOD_FID_SelectedOptions)

      if (designChild) {
        const index = this.item.TOD_FID_SelectedOptions.findIndex(c => c == designChild.TD_FID)
        if (index > -1) {
          this.item.TOD_FID_SelectedOptions.splice(index, 1)
        }
      }

      if (reviewChild) {
        this.item.TOD_FID_SelectedOptions.push(reviewChild.TD_FID)

        const result = await this.updateCartItem(0, this.item)
      }
    },
    async removeReview() {

      const reviewChild = this.getReviewChild(this.item.salePage, this.item.TOD_FID_SelectedOptions)

      if (reviewChild) {

        const index = this.item.TOD_FID_SelectedOptions.findIndex(c => c == reviewChild.TD_FID)
        if (index > -1) {
          this.item.TOD_FID_SelectedOptions.splice(index, 1)

          const result = await this.updateCartItem(0, this.item)

          this.review = false
        }
      }
    },

  },

  created() {
    // this.cartDataFromVuex = this.$store.getters["cart/getCartData"];
  },

  async mounted() {
    this.reviewPrice = this.calcReviewPrice(this.item.salePage, this.item.TOD_FID_SelectedOptions, this.item.TOD_FID_Goods)
    this.setCurrentStatus()
  },
};
</script>



