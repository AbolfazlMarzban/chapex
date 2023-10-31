<template>
    <div>
      <v-row>
  
        <v-col cols="12" class="py-1 px-3">
          <ui-input class="form_control_textInput" label="عنوان آکاردئون" v-model="title" />
          <ui-editor class="form_controle_textInput" label="متن آکاردئون" v-model="value"></ui-editor>
          <!-- <span class="float-left">بعد از ورود Enter بزنید</span> -->
          <v-btn v-if="title.length > 0 & value.length > 0 && !editmode" depressed rounded dark color="#016670" @click="addItem" class="mt-3">افزودن آکاردئون</v-btn>
          <v-btn v-if="editmode" depressed rounded dark color="#016670" @click="edit" class="mt-3">ویرایش آکاردئون</v-btn>
        </v-col>
        
        <v-col cols="12" class="py-1 px-3 pt-5 mb-5">
          <div class="d-flex flex-wrap">
            <template v-for="item, i in data.items" >
              <v-chip v-if="item.TFF_FDelete == 0" class="ml-1 mb-1" :key="i">
                <span class="">{{ item.title }}</span>
                <v-btn icon class="mr-1">
                  <v-icon @click="editItem(item, i)">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon class="mr-1">
                  <v-icon @click="removeItem(item)">mdi-close</v-icon>
                </v-btn>
              </v-chip>
            </template>
          </div>
        </v-col>
  
        <v-col cols="12" class="py-1 px-3">
          <ui-input class="form_control_textInput" label="عنوان" v-model="data.TFF_FLable" />
        </v-col>
  
        <v-col cols="6" class="py-1 px-3">
          <ui-input class="form_control_textInput" label="ستون" v-model="data.TFF_FColumn" />
        </v-col>
  
        <v-col cols="6" class="py-1 px-3">
          <ui-input class="form_control_textInput" label="ترتیب" v-model="data.TFF_FOrder" />
        </v-col>
  
        <v-col cols="12" class="py-1 px-3">
          <ui-input class="form_control_textInput" label="ایکون" v-model="data.TFF_FIcon" />
        </v-col>
  
        <v-col cols="12" class="py-1 px-3">
          <ui-input class="form_control_textInput" label="توضیحات" v-model="data.TFF_FToolTip" />
        </v-col>
  
        <v-col cols="6" class="py-1 px-3">
          <v-checkbox label="فعال" v-model="data.TFF_FActive"></v-checkbox>
        </v-col>
  
        <v-col cols="6" class="py-1 px-3">
          <v-checkbox label="اجباری بودن" v-model="data.TFF_FRequired"></v-checkbox>
        </v-col>
  
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    props: ["data"],
    data() {
      return {
        title: "",
        value: "",
        editmode: false,
        index: null
      };
    },
    methods: {
      addItem() {
        this.data.items.push({ title: this.title, value:this.value, isnew: true, TFF_FDelete: 0 });
        this.title = "";
        this.value = "";
      },
      removeItem(item) {
        const index = this.data.items.indexOf(item);
        if (index > -1) {
          this.data.items[index].TFF_FDelete = 1;
        }
      },
      editItem(item, i){
        console.log(item)
        this.title = item.title
        this.value = item.value
        this.index = i
        this.editmode = true
      },
      submit() {
        this.$emit("submit", this.data);
      },
      edit(){
        this.data.items[this.index].title = this.title
        this.data.items[this.index].value = this.value
        this.title = ""
        this.value = ""
        this.index = null
      }
    }
  };
  </script>
  
  <style lang="scss">
  
  </style>
  