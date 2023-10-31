<template>
    <div>
      <v-row>
        
        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="عنوان باکس"
            placeholder="عنوان باکس صفحات فروش"
            v-model="data.TFF_FPlaceHolder"
          />
        </v-col>

        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="متن توضیحات"
            v-model="data.TFF_FToolTip"
          />
        </v-col>

        <v-col cols="12" class="py-1 px-3" v-if="salePages.length > 0">
            <label for="">انتخاب صفحه فروش</label>
            <v-select
                class="mt-0 pt-0"
                :items="saleNames"
                v-model="sale"
                @change="addSale"
            ></v-select>
            
        </v-col>

        <v-col cols="12" class="py-1 px-3 pt-5 mb-5">
          <div class="d-flex flex-wrap">
            <template v-for="item, i in data.items" >
              <v-chip v-if="item.TFF_FDelete == 0" :key="i" class="ml-1 mb-1">
                <span class="">{{ item.title }}</span>
                <v-btn icon class="mr-1">
                  <v-icon @click="removeItem(item, i)">mdi-close</v-icon>
                </v-btn>
              </v-chip>
            </template>
          </div>
        </v-col>

        <v-col cols="6" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="ستون"
            v-model="data.TFF_FColumn"
          />
        </v-col>
        
        <v-col cols="6" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="ترتیب"
            v-model="data.TFF_FOrder"
          />
        </v-col>

    

        <v-col cols="6" class="py-1 px-3">
          <v-checkbox label="فعال" v-model="data.TFF_FActive"  ></v-checkbox>
        </v-col>
        <v-col cols="6" class="py-1 px-3">
          <v-checkbox label="اجباری بودن" v-model="data.TFF_FRequired"></v-checkbox>
        </v-col>

      </v-row>
    </div>
  </template>
  
  <script>
import saleManageMixin from '../../saleManage/_mixins/saleManageMixin';
  export default {
    props: ["data"],
    mixins: [ saleManageMixin ],
    data(){
        return{
            salePages: [],
            saleNames: [],
            sale:''
        }
    },
   async mounted(){
        console.log('data', this.data)
        const result = await this.getSalePageTable();
        console.log('salePages', result)
        this.salePages = result.data.table
        this.saleNames = this.salePages.map(item => item.TPS_FTitle)
    },
    computed: {
      title() {
        let type = this.data.TFF_FID_TypeFieldName;
        let title;
        if (type == "input") {
          title = "متن ساده";
        } else if (type == "textarea") {
          title = "متن چند خطی";
        } else if (type == "number") {
          title = "عدد";
        } else if (type == "money") {
          title = "پولی";
        } else if (type == "phone") {
          title = "شماره تماس";
        } else if (type == "date") {
          title = "تاریخ";
        } else if (type == "time") {
          title = "زمان";
        } else if (type == "email") {
          title = "ایمیل";
        }
        return title;
      }
    },
    methods: {
      submit() {
        this.$emit("submit", this.data);
      },
      addSale(){
        const item = this.salePages.find(item => item.TPS_FTitle == this.sale)
        this.data.items.push({title: item.TPS_FTitle, link: item.TPS_FLink,id:item.TPS_FID ,image: item.TPS_IndexImage, isnew:true, TFF_FDelete : 0})
        this.sale = ''
      },
      removeItem(item, i){
        this.data.items[i].TFF_FDelete = 1
      }
    }
  };
  </script>
  
  <style lang="scss"></style>
  