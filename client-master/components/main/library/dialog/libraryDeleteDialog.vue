<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-text class="pt-5 text-center">
          <div class="goods_dialog_title text-center">
            درخواست حذف
          </div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <div>
              <v-col cols="12">
                <div v-for="(item, i) in selected" :key="i">
                  <p v-if="item.TPF_FID">
                    <span v-if="checkFolder(item, i)" class="red-text">برای پاک کردن فولدر {{ item.TPF_FName }} ابتدا باید فایل های درون آن راپاک کنید.</span>
                    <span v-else>
                      شما متقاضی حذف فولدر به نام {{ item.TPF_FName }} هستید
                    </span>
                  </p>
                  <p v-else> شما متقاضی حذف فایل به نام {{ item.TPIC_FShowName }} هستید</p>
                </div>
              </v-col>
            </div>
          </div>
          <v-divider></v-divider>

          <p class="text-center mt-4 mb-0 pb-0 red-text">
            آیا از حذف موارد بالا اطمینان دارید؟
          </p>
          <v-btn
            text
            @click="confirmDelete"
            class="goods_dialog_btn mt-4 mx-2"
          >
            تایید
          </v-btn>
          <v-btn text @click="$emit('close')" class="goods_dialog_btn mt-4 mx-2">
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
  props: ["show", "selected", "allImages", "allFolders"],

  data() {
    return {
      itemsToDelete: [],
      indexes: {}
    };
  },

  methods: {
    confirmDelete(){
      const keys = Object.keys(this.indexes)
      this.itemsToDelete = this.selected
      keys.forEach(index => this.itemsToDelete.splice(index, 1))
      // console.log('itemsTo del', this.itemsToDelete)
     this.$emit('deleteSelected', this.itemsToDelete)
    },
    checkFolder(item, i){
      var subFolders = this.allFolders.filter(folder => folder.TPF_FID_Parent == item.TPF_FID)
      var index = this.allImages.findIndex(img => {
        var x = false
        if(img.TPIC_FID_Folder){
          if(img.TPIC_FID_Folder == item.TPF_FID){
            x = true
          }
          if(subFolders.some(folder => img.TPIC_FID_Folder == folder.TPF_FID)){
            x = true
          }
        }
        return x
      })
      if(index > -1){
        this.indexes[i] = i
        return true
      }else {
        return false
      }
    }
  }
};
</script>
