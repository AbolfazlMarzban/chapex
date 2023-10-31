<template>
    <div style="min-height:500px">
      <v-row>
  
        <!-- <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="alt تصویر"
            v-model="imgAlt"
          />
        </v-col> -->
  
        <v-col cols="12" class="py-1 px-3">
          <!-- <ui-uploader :deleteForm="clearPic" :route="24014" @input="setImage"></ui-uploader> -->
          <library-dialog  @export="value => getImages(value)" :multiple="true" :selected="data.items"/>
        </v-col>
        <!-- <v-col cols="12" v-if="img">
          <v-btn dark rounded depressed @click="saveImage" color="#016670">ذخیره تصویر و افزودن به اسلایدر</v-btn>
        </v-col> -->
        <!-- <v-col cols="12" class="py-1 px-3" v-if="data.items.length > 0">
            <v-row>
                <template v-for="item,i in data.items">
                    <v-col cols="4" v-if="item.TFF_FDelete == 0" class="text-left" :key="i">
                    <v-icon @click="removeImg(i)">mdi-close-circle</v-icon>
                    <img :src="item.img.TPIC_FAddress" alt="" style="width: 100%">
                    </v-col>
                </template>
               
            </v-row>
        </v-col> -->
        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="border Radius (px)"
            type="number"
            v-model="data.TFF_FPlaceHolder"
          />
        </v-col>
        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="(px) ارتفاع اسلایدر"
            type="number"
            v-model="data.TFF_FToolTip"
          />
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
  
        <!-- <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="توضیحات"
            v-model="data.TFF_FToolTip"
          />
        </v-col> -->
  
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
      data(){
          return{
              img:null,
              imgAlt: null,
              clearPic: false,
          }
      },
    props: ["data", "form"],
    computed: {
      title() {
        let type = this.data.type;
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
        } else if (type == "link") {
          title = "دانلود";
        } else if (type == "file") {
          title = "آپلود";
        }
        return title;
      }
    },
    methods: {
      getImages(value){
        console.log('images', value)
        this.data.items = value.map(image =>{
          return{
            img: image,
            imgAlt: image.TPIC_FComment,
            TFF_FDelete: 0,
            isnew: true
          }
        })
      },
      submit() {
        this.$emit("submit", this.data);
      },
      setImage(pic){
        this.img = pic
      },
     async saveImage(){
        console.log("element", this.data)
        this.img.parentID = this.form.TF_FID
        this.img.state = "formBuilder"
        try{
            this.data.items.push({img: this.img, imgAlt: this.imgAlt, TFF_FDelete: 0, isnew: true,})
            this.img = null
            this.imgAlt = null
            this.clearPic = ! this.clearPic
        } catch(error){
          console.log(error)
        }
      },
      removeImg(i){
        this.data.items[i].TFF_FDelete = 1
      }
    }
  };
  </script>
  
  <style lang="scss"></style>
  