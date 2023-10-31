<template>
    <div class="text-center">
      <v-dialog v-model="show" width="500" class="goods_dialogs_main rounded-xl">
        <v-card class="goods_dialog rounded-xl">
            
          <v-card-text class="pt-5">
            <!-- <div class="goods_dialog_title">
              ذخیره با لینک خارجی
            </div>
            <v-divider></v-divider> -->
            <div class="goods_dialog_title d-flex justify-end">
            <v-icon @click="$emit('close')">mdi-close</v-icon>
          </div>
            <div class="goods_dialog_text py-0">
              <div>
                <v-col cols="12" class="d-flex flex-column">
                    <label for="" style="font-weight: bold; text-align: start;" class="d-block">لینک</label>
                     <span v-if="showError && fileLink == 0" style="color: red;">لطفاً تمام فیلد ها را پر کنید!</span>
                     <ui-input v-model="fileLink" class="mt-2 makefolder-input"></ui-input>   
                </v-col>
                <v-col cols="12">
                  <label for="" style="font-weight: bold; text-align: start;" class="d-block">متن جایگزین</label>
                  <ui-input v-model="fileAlt" type="text" class="mt-2 makefolder-input"></ui-input>
                </v-col>
                <v-col cols="12">
                  <label for="" style="font-weight: bold; text-align: start;" class="d-block">نام فایل در فایل منیجر</label>
                  <ui-input v-model="fileName" type="text" class="mt-2 makefolder-input"></ui-input>
                </v-col>
              </div>
            </div>
            <!-- <v-divider></v-divider>           -->
            <v-btn
              text
              @click="submit"
              class="goods_dialog_btn mt-4 mx-2"
            >
              ذخیره فایل
            </v-btn>
            <!-- <v-btn text @click="$emit('close')" class="goods_dialog_btn mt-4 mx-2">
              انصراف
            </v-btn> -->
          </v-card-text>
  
          <!-- <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions> -->
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import "../../../assets/style/goods/goodsDialogs.scss";
  export default {
    props: ["show"],
  
    data() {
      return {
        fileLink: '',
        showError: false,
        fileAlt: '',
        fileName: ''
      };
    },
  
    methods: {
      hiddenDialog() {
        this.$emit("hiddenDialog");
      },
      deleteItemFromTable() {
        this.$emit("deleteItemFromTable");
      },
      submit(){
        if(this.fileLink.length > 0 && this.fileName){
            this.$emit('externalSave', this.fileLink, this.fileAlt, this.fileName)
        } else {
            this.showError = true
        }
      }
    }
  };
  </script>
  