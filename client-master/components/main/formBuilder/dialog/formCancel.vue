<template>
    <div class="text-center">
      <v-dialog persistent v-model="showDialog" width="500" class="goods_dialogs_main">
        <v-card class="goods_dialog">
          <!-- <v-card-title> </v-card-title> -->
  
          <v-card-text class="pt-5">
            <div class="goods_dialog_title">
              خروج از فرم
            </div>
            <v-divider></v-divider>
            <div class="goods_dialog_text">
              <v-row>
                <v-col cols="12">
                    <p>شما در حال خروج از فرم هستید، اطلاعات ورودی شما پاک خواهد شد. آیا میخواهید ادامه دهید؟</p>
                </v-col>
              </v-row>
            </div>
            <v-divider></v-divider>
            <v-btn
              text
              @click="cancelProcessDialog"
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
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import '../../../../assets/style/goods/goodsDialogs.scss';
  
  export default {
    props: ["showDialog"],
  
    data() {
      return {
        // stock_dialog: false
      };
    } , 
    methods : {
      hiddenDialog(){
        this.$emit("hiddenDialog")
      } , 
      cancelProcessDialog(){
        this.$emit("cancelProcessDialog");
      }
    }
  };
  </script>
  