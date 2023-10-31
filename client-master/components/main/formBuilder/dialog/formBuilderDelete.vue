<template>
  <div class="text-center">
    <v-dialog v-model="showDeleteDialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <!-- <v-card-title> </v-card-title> -->

        <v-card-text class="pt-5">
          <div class="goods_dialog_title">
            درخواست حذف
          </div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <div>
              <v-col cols="12" v-for="item in this.selected" :key="item.TF_FID">
                <span
                  ><label> شما متقاضی حذف کالا / خدمات </label>
                  <pre class="goods_dialog_text-data"></pre
                ></span>
                <p class="text-center">
                  کد
                  <span class="red-text">{{ item.TF_FID }}</span> به نام
                  <span class="red-text">{{ item.TF_FName }}</span>
                  هستید
                </p>
              </v-col>
            </div>
          </div>
          <v-divider></v-divider>

          <p class="text-center mt-4 mb-0 pb-0 red-text">
            آیا از حذف کالا / خدمات بالا اطمینان دارید؟
          </p>
          <!-- {{data[dialogData].TGO_FName}} -->

        
          <v-btn
            text
            @click="deleteItemFromTable"
            class="goods_dialog_btn mt-4"
          >
            تایید
          </v-btn>
          <v-btn text @click="hiddenDialog" class="goods_dialog_btn mt-4">
            انصراف
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
import "../../../../assets/style/goods/goodsDialogs.scss";
export default {
  props: ["showDeleteDialog", "selected"],

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
