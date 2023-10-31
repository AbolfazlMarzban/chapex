<template>
  <div class="text-center">
    <v-dialog v-model="showDialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
         

          <div class="goods_dialog_title">
            شرح کالا / خدمات
          </div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <div class="">
              <v-col cols="12">
                <span ><label> نام کالا / خدمات : </label><pre class="goods_dialog_text-data">{{goodsInfo.TGO_FName}}</pre></span>
                <!-- {{data[dialogData].TGO_FName}} -->
              </v-col>
              <v-col cols="12">
                <span><label> کد :</label><span class="goods_dialog_text-data"> </span>{{goodsInfo.TGO_FCode}}</span>
                <!-- {{data[dialogData].TGO_FCode}} -->
              </v-col>
              <v-col cols="12">
                <span
                  ><label> شرح کالا / خدمات : </label> <span class="goods_dialog_text-data"></span>{{goodsInfo.TGO_FComment}}</span
                  
                >
                <!-- {{data[dialogData].TGO_FCaption}} -->
              </v-col>
            </div>
          </div>
          <v-divider></v-divider>

          <v-btn text @click="hiddenDialog" class="goods_dialog_btn mt-4">
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
  props: ["data" , "goodsInfo"],

  data() {
    return {
     showDialog:true ,
    };
  },

  methods : {
     hiddenDialog(){
      this.$emit("hiddenDialog")
    } ,
  },
};
</script>
