<template>
  <div class="text-center">
    <v-dialog persistent v-model="showDialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
          <div class="goods_dialog_title">
            موجودی کالا
          </div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> نام کالا / خدمات : </label> </span>
              </v-col>
              <v-col cols="8" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">{{goodsInfo.TGO_FName}}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> کد : </label> </span>
              </v-col>
              <v-col cols="8" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">{{goodsInfo.TGO_FCode}}</span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> مدیریت موجودی : </label> </span>
              </v-col>
              <v-col cols="8" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">
                  <!-- {{goodsInfo.TGO_FID_TypeSaleName}} -->
                  0
                </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> نقطه سفارش : </label> </span>
              </v-col>
              <v-col cols="8" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">
                  {{ goodsInfo.TGO_FBuyPoint }}    {{goodsInfo.TGO_FID_UnitName}}
                </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>واحد فرعی : </label> </span>
              </v-col>
              <v-col cols="8" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">
                  {{ goodsInfo.TGO_FID_Unit2Name }}    {{goodsInfo.TGO_FCountINUnit}}    {{goodsInfo.TGO_FID_UnitName}}
                </span>
              </v-col>
            </v-row>
             <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> بسته بندی  : </label> </span>
              </v-col>
              <v-col cols="8" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">
                  {{ goodsInfo.TGO_FID_Unit2Name }}    {{goodsInfo.TGO_FCountINBox}}    {{goodsInfo.TGO_FID_UnitName}}
                </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label> حداقل تعداد فروش : </label> </span>
              </v-col>
              <v-col cols="8" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">
                  {{ goodsInfo.TGO_FSaleMin }}    {{goodsInfo.TGO_FID_UnitName}}
                </span>
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>

          <div class="goods_dialog_comment">
            <v-row>
              <v-col
                cols="6"
                class="goods_dialog_align_left "
              >
                <span><label class="goods_dialog_stock_label"> موجودی کل : </label> </span>
              </v-col>
              <v-col cols="6" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data goods_dialog_stock_label">
                  <!-- {{ goodsInfo.TGO_FSaleMin }}    {{goodsInfo.TGO_FID_UnitName}} -->
                  0 
                </span>
              </v-col>
            </v-row>

            <hr class="stock_hr" />

            <v-row>
              <v-col
                cols="6"
                class="goods_dialog_align_left"
              >
                <span><label>انبار شماره 1 : </label> </span>
              </v-col>
              <v-col cols="6" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">
                  <!-- {{ goodsInfo.TGO_FSaleMin }}    {{goodsInfo.TGO_FID_UnitName}} -->
                  0
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="6"
                class="goods_dialog_align_left"
              >
                <span><label> انبار شماره 2    : </label> </span>
              </v-col>
              <v-col cols="6" class="goods_dialog_align_right">
                <span class="goods_dialog_text-data">
                  <!-- {{ goodsInfo.TGO_FSaleMin }}    {{goodsInfo.TGO_FID_UnitName}} -->
                  0
                </span>
              </v-col>
            </v-row>

            
          </div>
          <v-divider></v-divider>

          <v-btn
            text
            @click="hiddenDialog"
            class="goods_dialog_btn mt-4"
          >
            بستن
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
  props: ["goodsInfo"],

  data() {
    return {
     showDialog :true
    };
  } , 
  methods : {
    hiddenDialog(){
      this.$emit("hiddenDialog")
    }
  }
};
</script>
