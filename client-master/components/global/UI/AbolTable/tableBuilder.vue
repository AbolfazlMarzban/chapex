<template>
  <div class="text-center" v-if="showBuilder()">
    <v-dialog
      persistent
      v-model="showTableBuilder"
      width="500"          
      class="goods_dialogs_main"
    >
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>
        <v-card-text>
          <div class="goods_dialog_title">ساخت جدول</div>
          <v-divider class="mx-0" style="width: 100%"></v-divider>
          <div class="goods_dialog_text">
            <v-row>                
              <v-col cols="12" class="px-10">
                <v-combobox
                  v-model="tableColumns"
                  :items="tableFields"
                  label="ستون های انتخابی جدول"
                  multiple
                  chips
                  class="selectTableField"
                  outlined
                  dense
                  @change="showError"
                >
                  <template
                    v-slot:selection="{ attrs, item, parent, selected }"
                  >
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :color="`${item.color} lighten-3`"
                      :input-value="selected"
                      label
                      small
                      class="ma-1"
                    >
                      <span class="pr-2">
                        {{ item.text }}
                      </span>
                      <v-icon small @click="parent.selectItem(item)">
                        $delete
                      </v-icon>
                    </v-chip>
                  </template>
                </v-combobox>
                <span v-if="error" class="tableBuilder-error">
                  {{ this.error }}
                </span>
              </v-col>
            </v-row>          
          </div>
          <div>
            <span v-if="tableColumns.length > 0"
              >ترتیب ستون های جدول را بچینید:</span
            >
            <draggable
              v-model="tableColumns"
              group="tableColumns"
              @start="drag = true"
              @end="drag = false"
              class="d-flex flex-column align-center justify-center"
              style="padding: 0px 100px"
            >
              <v-chip
                v-for="column in tableColumns"
                :key="column.text"
                class="ma-2 justify-center column-chip"
                style="width: 100%"
                >{{ column.text }}
                <v-checkbox
                  label="قابل جستجو"
                  v-model="column.filterable"
                ></v-checkbox>
              </v-chip>
            </draggable>
          </div>
          <v-divider class="mx-0 my-5" style="width: 100%"></v-divider>
          <div class="d-flex flex-column justify-center">
            <span style="font-size: 16px; color: #930149"
              >جدول مورد نظر شما ساخته شود؟</span
            >
            <!-- <br> -->
            <div class="d-flex justify-center">
              <v-btn text class="goods_dialog_btn mt-1 mx-1" @click="setTable">
                بله
              </v-btn>
              <v-btn
                text
                class="goods_dialog_cancel_btn mt-1 mx-1"
                @click="$emit('closeDialog')"
              >
                خیر
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
  import draggable from "vuedraggable";              
  export default {
  props: [ "showTableBuilder", "tableFields", "customHeaders"],
  components: { draggable },
  data(){
      return{
          copyGoods: false,
          tableColumns : [],
          error: null
      }
  },
mounted(){
  if(this.customHeaders){
    this.tableColumns = this.customHeaders
    this.tableColumns.forEach(item =>{
      if(item.filterable == 1){
        item.filterable = true
      } else {
        item.filterable = false
      }
    })
  }
  // console.log('columns', this.tableColumns)
},
  methods:{
      setTable(){
          if(this.tableColumns.length > 0){
              this.$emit('newTable', this.tableColumns)
          } else {
              this.error = 'هنوز آیتم های جدول را انتخاب نکرده اید'
          }
      },
      showError(){
          if(this.tableColumns.length > 0){
              this.error = null
          }
      },
      showBuilder(){
       if(this.tableFields){
        // console.log("asdadadads", this.data[0]) 
        
        return true
       }
      }
  },
  }
  </script>
  
  <style lang="css" scoped>
.selectTableField label {
    font-family: "bakhtiari" !important;
    font-size: 16px !important;
    font-weight: normal;
    padding-left: 20px;
}
.selectTableField input{
background: none !important;
    border: none !important;
}
.tableBuilder-error {
  font-size: 16px;
  color: red;
}
/* .v-list-item {
  height: 30px !important;
  min-height: 30px !important;
} */
</style>