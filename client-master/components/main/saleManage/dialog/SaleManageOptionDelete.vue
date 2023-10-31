<template>
  <div class="text-center">
    <v-dialog persistent v-model="showDeleteDialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>


          <div class="goods_dialog_title">
            درخواست حذف
          </div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <div class="" v-if="selectedRowData">
              <v-col cols="12">
                <span><label> شما متقاضی حذف </label>
                  <label v-if="selectedRowData.TD_FID"> خصوصیت </label>
                  <label v-else-if="selectedRowData.TGO_FID"> محصول </label>
                  <label v-else> وابستگی </label>
                  <pre class="goods_dialog_text-data"></pre>
                </span>
                <p class="text-center">
                  <span v-if="selectedRowData.TD_FID || selectedRowData.TGO_FID">کد</span>
                  <span v-if="selectedRowData.TD_FID || selectedRowData.TGO_FID"
                    class="red-text">{{selectedRowData.TD_FID ||
                    selectedRowData.TGO_FID}}</span>
                  <span> به نام </span>
                  <span class="red-text">{{selectedRowData.TD_FName || selectedRowData.TGO_FName}}</span> هستید
                </p>
              </v-col>
            </div>
          </div>
          <v-divider></v-divider>

          <p class="text-center mt-4 mb-0 pb-0 red-text">آیا از عملیات بالا اطمینان دارید؟</p>
          <!-- {{data[dialogData].TGO_FName}} -->

          <v-btn text @click="deleteItemFromTable" class="goods_dialog_btn mt-4">
            بله
          </v-btn>
          <v-btn text @click="hiddenDialog" class="goods_dialog_btn mt-4">
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
  props: ["data", "showDeleteDialog", "selectedRowData"],

  data() {
    return {

    };
  },

  methods: {
    hiddenDialog() {
      this.$emit("hiddenDialog")
    },
    deleteItemFromTable() {
      this.$emit("deleteItemFromTable");
    }
  },
};
</script>
  