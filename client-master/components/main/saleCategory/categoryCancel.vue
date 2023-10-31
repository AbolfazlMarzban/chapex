<template>
    <div class="text-center">
      <v-dialog persistent v-model="showDialog" width="500" class="goods_dialogs_main">
        <v-card class="goods_dialog">
          <v-card-title> </v-card-title>
  
          <v-card-text>
            <div class="goods_dialog_title">
              درخواست تایید
            </div>
            <v-divider></v-divider>
            <div class="goods_dialog_text">   
              <v-row>
                <v-col cols="12">   
                  <p class="mb-0">
                    شما درحال انصراف از انجام عملیات ویرایش یا افزودن کالا
                    <br>
                    با کد 
                    <span>{{data.TD_FID}}</span>
                      و نام 
                      <span>{{data.TD_FName}}</span>
                      هستید.</p>
                </v-col>
              </v-row>
            </div>
            <v-divider></v-divider>
            <span style="font-size:16px; color: #930149">آیا از انصراف اطمینان دارید؟ </span>
            <br>
                <v-btn
              text
              @click="cancelProcessDialog"
              class="goods_dialog_btn mt-4 mx-4"
            >
              بله
            </v-btn>
            <v-btn
              text
              @click="hiddenDialog"
              class="goods_dialog_btn mt-4 mx-4"
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
  import '../../../assets/style/goods/goodsDialogs.scss';
  
  export default {
    props: ["data" , "showDialog"],
  
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
  