<template>
  <div class="text-center">
    <v-dialog
      persistent
      v-model="showDeleteDialog"
      width="500"
      class="goods_dialogs_main"
    >
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
          <div class="goods_dialog_title">
            درخواست حذف
          </div>
          <v-divider></v-divider>
          <div class="goods_dialog_text py-0">
            <div class="">
              <v-col cols="12" v-for="item in selected" :key="item.TGO_FID">
                <span
                  ><label> 
                    شما متقاضی حذف کالا / خدمات
                  </label>
                  <pre class="goods_dialog_text-data"></pre
                ></span>
                <p class="text-center">
                  کد <span class="red-text">{{ item.TGO_FCode }}</span> به نام
                  <span class="red-text">{{ item.TGO_FName }}</span> هستید
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
            class="goods_dialog_btn mt-4 mx-4"
          >
            بله
          </v-btn>
          <v-btn text @click="hiddenDialog" class="goods_dialog_btn mt-4 mx-4">
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
import "../../../../assets/style/goods/goodsDialogs.scss";
export default {
  props: ["data", "showDeleteDialog", "selected"],

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
