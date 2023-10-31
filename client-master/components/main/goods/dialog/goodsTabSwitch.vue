<template>
  <div class="text-center">
    <v-dialog persistent v-model="showTabSwitch" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
          <div class="goods_dialog_title">
            انجام عملیات جابجایی
          </div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <v-row>
              <v-col cols="12">
                  <p>شما درحال انجام عملیات ویرایش یا افزودن هستید. آیا میخواهید عملیات را لغو کنید؟</p>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
              <v-btn
            text
            @click="cancelTabSwitch"
            class="goods_dialog_btn mt-4"
          >
            بله
          </v-btn>
          <v-btn
            text
            @click="hiddenDialog"
            class="goods_dialog_btn mt-4"
          >
            خیر
          </v-btn>
         
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import '../../../../assets/style/goods/goodsDialogs.scss';

export default {
  props: ["data" , "showTabSwitch"],

  data() {
    return {
      // stock_dialog: false
    };
  } , 
  methods : {
    hiddenDialog(){
      this.$emit("hiddenDialog")
    } , 
    cancelTabSwitch(){
      this.$emit("cancelTabSwitch");
    }
  }
};
</script>
