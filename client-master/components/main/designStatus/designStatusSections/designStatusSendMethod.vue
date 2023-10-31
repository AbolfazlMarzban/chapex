<template>
  <v-col cols="12 pa-5 mt-6" class="designStatusMethod">
    <v-row class="mt-7 mb-4">
      <v-col cols="12">
        <p class="title text-center" style="font-size: 17px !important;">
          اگر فایل طراحی شما آماده است، لطفا آنرا به یکی از روش های زیر برای ما
          ارسال نمایید
        </p>
      </v-col>
    </v-row>
    <div class="status">
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <div
            @click="showTelegramDialog"
            :class="[
              'sbox',
              'cursor-pointer',
              { activeBox: telegramStateFromVuex }
            ]"
          >
            <span>
              <v-icon>mdi-upload-outline</v-icon>
            </span>
            <span> آپلود فایل آماده </span>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <div
            @click="showTelegramDialog"
            :class="[
              'sbox',
              'cursor-pointer',
              { activeBox: telegramStateFromVuex }
            ]"
          >
            <span>
              <v-icon>mdi-send</v-icon>
            </span>
            <span> ارسال تلگرام </span>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <div
            @click="showEmailDialog"
            :class="[
              'sbox',
              'cursor-pointer',
              { activeBox: emailStateFromVuex }
            ]"
          >
            <span>
              <v-icon>mdi-email-outline</v-icon>
            </span>
            <span> ارسال ایمیل </span>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <div
            @click="showFlashOrCdDialog"
            :class="[
              'sbox',
              'cursor-pointer',
              { activeBox: flashOrCdStateFromVuex }
            ]"
          >
            <span>
              <v-icon>mdi-usb-flash-drive</v-icon>
            </span>
            <span class="cur-pointer"> تحویل سی دی یا فلش </span>
          </div>
        </v-col>
      </v-row>
    </div>
    <TelegramDialog v-if="telegramDialog" @close="telegramDialog = false" />
    <EmailDialog v-if="emailDialog" @close="emailDialog = false" />
    <CDDialog v-if="flashOrCdDialog" @close="flashOrCdDialog = false" />
  </v-col>
</template>
<script>
import "../../../../assets/style/cart/cart.scss";
import designStatusMixin from "../_mixins/designStatusMixins";
import designStatusVariables from "../_mixins/designStatusVariables";
import TelegramDialog from "../dialogs/TelegramDialog.vue";
import EmailDialog from "../dialogs/EmailDialog.vue";
import CDDialog from "../dialogs/CDDialog.vue";
export default {
  mixins: [designStatusMixin, designStatusVariables],
  props: [
    "cartProductId",
    "telegramStateFromVuex",
    "flashOrCdStateFromVuex",
    "emailStateFromVuex",
    "tabStateToKnowWhichPreviousFormDataHasToDelete",
    "FSlug",
    "FTag"
  ],
  components: {
    TelegramDialog,
    EmailDialog,
    CDDialog
  },
  data() {
    return {
      telegramDialog: false,
      emailDialog: false,
      flashOrCdDialog: false,
      checkFile: ""
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

    async submitSendingMethod(method) {
      if (method == "sendTelegram") {
        if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 1) {
          await this.deletePreviousTabData(this.FSlug);
        } else if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 2) {
          await this.deletePreviousTabData(this.FTag);
        }
        await this.changeTabState(4);
        console.log(this.checkFile, "in telegram");
        // await this.sendUploadersData(this.checkFile);
        this.$router.push("/cart");
        this.scrollToTop();
      } else if (method == "sendEmail") {
        if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 1) {
          await this.deletePreviousTabData(this.FSlug);
        } else if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 2) {
          await this.deletePreviousTabData(this.FTag);
        }

        await this.changeTabState(5);
        console.log(this.checkFile, "in email");
        // await this.sendUploadersData(this.checkFile);
        this.$router.push("/cart");
        this.scrollToTop();
      } else if (method == "sendFlashAndCd") {
        if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 1) {
          await this.deletePreviousTabData(this.FSlug);
        } else if (this.tabStateToKnowWhichPreviousFormDataHasToDelete == 2) {
          await this.deletePreviousTabData(this.FTag);
        }

        await this.changeTabState(6);
        console.log(this.checkFile, "in flash");
        // await this.sendUploadersData(this.checkFile);
        this.$router.push("/cart");
        this.scrollToTop();
      }
    },

    showTelegramDialog() {
      this.telegramDialog = true;
    },
    showEmailDialog() {
      this.emailDialog = true;
    },
    showFlashOrCdDialog() {
      this.flashOrCdDialog = true;
    }
  }
};
</script>
<style lang=""></style>
