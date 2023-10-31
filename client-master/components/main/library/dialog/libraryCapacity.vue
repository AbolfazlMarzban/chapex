<template>
    <div class="text-center">
      <v-dialog v-model="show" width="500" class="goods_dialogs_main">
        <v-card class="goods_dialog">
          <v-card-title class="pb-0 d-flex justify-end"> 
            <v-icon color="red" @click="$emit('close')">
               mdi-close   
              </v-icon>
          </v-card-title>
            
          <v-card-text>
            <div class="goods_dialog_title">
              امکان آپلود/انتقال وجود ندارد!
       
            </div>
            <v-divider></v-divider>
            <div class="goods_dialog_text">
              <div>
                <v-col cols="12" >
                    <p style="color: red;font-size: 18px;" >ظرفیت باقی مانده شما برای آپلود این فایل کافی نیست. نسبت به آزاد سازی ظرفیت اقدام نموده و سپس برای آپلود فایل اقدام نمایید</p>
                </v-col>
              </div>
            </div>
            <v-divider></v-divider>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import "../../../../assets/style/goods/goodsDialogs.scss";
  export default {
    props: ["show", "selected"],
    data() {
      return {};
    },
  
    methods: {
      hiddenDialog() {
        this.$emit("hiddenDialog");
      },
      deleteItemFromTable() {
        this.$emit("deleteItemFromTable");
      }
    }
  };
  </script>
  