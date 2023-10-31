<template>
  <div v-if="selected" class="text-center">
    <v-dialog v-model="showCopyDialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
          <div class="goods_dialog_title">درخواست تکثیر</div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <div>
              <v-col cols="12">
                <span
                  ><label> شما متقاضی تکثیر فرم </label>
                  <pre class="goods_dialog_text-data"></pre>
                </span>
                <p
                  class="text-center"
                  v-for="item in selected"
                  :key="item.TGO_FID"
                >
                  کد
                  <span class="red-text">{{ item.TGO_FID }}</span> به نام
                  <span class="red-text">{{ item.TGO_FName }}</span>
                  هستید
                </p>
              </v-col>
            </div>
          </div>
          <v-divider></v-divider>

          <p class="text-center mt-4 mb-0 pb-0 red-text">
            آیا از عملیات بالا اطمینان دارید؟
          </p>
          <v-btn text @click="hiddenDialog" class="goods_dialog_btn mt-4">
            انصراف
          </v-btn>
          <v-btn text @click="copy()" class="goods_dialog_btn mt-4">
            تایید
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import goodsMixin from '../_mixins/goodsMixin';
export default {
props:["selected", "showCopyDialog"],
mixins: [goodsMixin],
data(){
    return{
        data:{}
    }
},
methods: {
    hiddenDialog(){
        this.$emit("hiddenDialog");   
    },
    async copy(){
        for(var i=0; i < this.selected.length; i++){
               const result = await this.getShow(this.selected[i].TGO_FID)   
        // console.log("copyResult", result)
        if(result.form){
            this.data = result.form
            this.data.defaults = result.defaults

            this.data.TGO_FID = null
            this.data.TGO_FName = 'کپی_' + this.data.TGO_FName
            const result1 = await this.Submit("insert", this.data)
            if (result1) {
                    this.$emit("copied");
                }
        }
     
        }
    }
}
}
</script>

<style>
</style>