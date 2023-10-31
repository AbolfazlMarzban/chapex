<template>
    <div class="text-center">
      <v-dialog v-model="showdialog" width="500" class="goods_dialogs_main">
        <v-card class="goods_dialog">
          <v-card-text class="pt-5 text-center">
            <div class="goods_dialog_title text-center">
              درخواست انتقال
            </div>
            <v-divider></v-divider>
            <div class="goods_dialog_text py-0">
              <div>
                <v-col cols="12" class="py-0">
                    <v-edit-dialog  width="250px">
                          <v-treeview
                            activatable
                            :items="destinations"
                            item-key="id"
                            @update:active="getFolder"
                            selection-type="independent"
                            class="folderTreeView"
                          >
                          </v-treeview>
                        </v-edit-dialog>
                </v-col>
              </div>
            </div>
            <v-divider></v-divider>
  
            <v-btn
              text
              class="goods_dialog_btn mt-4 mx-2"
              v-if="dest"
              @click="$emit('moveFiles', dest)"
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
    props: ["show", "selected", "allFolders", "FID"],
  
    data() {
      return {
        itemsToDelete: [],
        indexes: {},
        destinations: [],
        dest: null,
        showdialog: false
      };
    },
    methods: {
        getAllDests(parentId){
            const ret = [];
      const filtered = this.allFolders.filter(f => f.TPF_FID_Parent == parentId);
      if (filtered.length > 0) {
        filtered.forEach(f => {
          ret.push({
            id: f.TPF_FID,
            name: f.TPF_FName,
            children: this.getAllDests(f.TPF_FID)
          });
        });
      }
      this.destinations = ret
      if(this.FID){
        this.destinations.push({
          name: "خانه",
          id: null
        })
      }
    //   return ret;
        },
        getFolder(value){
          if(value[0]){
            this.dest = this.allFolders.find(item => item.TPF_FID == value[0])
          } else {
            this.dest = {
          TPF_FID: null,
          TPF_FName: "خانه"
        };
          }
        }
    },
    watch:{
        show(newValue){
            this.getAllDests()
            this.dest = null
            this.showdialog = newValue
        },
        showdialog(newValue){
          // console.log('newValue', newValue)
          if(newValue){

          } else {
            this.$emit('close')
          }
        }
    }
  };
  </script>
  