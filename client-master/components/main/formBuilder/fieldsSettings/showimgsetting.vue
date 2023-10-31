<template>
  <div style="min-height:500px">
    <v-row>
<!-- 
      <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="alt تصویر"
          v-model="data.TFF_FLable"
        />
      </v-col> -->

      <v-col cols="12" class="py-1 px-3">
        <!-- <ui-uploader :route="24014" @input="setImage"></ui-uploader> -->
        <library-dialog @export="value => getImages(value)" :selected="data.items"/>
        <!-- <img v-if="img" :src="setImageUrl(img.TPIC_FAddress)" alt="" style="width: 100%;"> -->
        <!-- <img v-if="img && img?.TPIC_FAddress.includes('public')" :src="setImageUrl(img.TPIC_FAddress)" alt="" style="width: 100%;"> -->
      </v-col>
      <!-- <v-col cols="12" v-if="img">
        <v-btn dark rounded depressed @click="saveImage" color="#016670">ذخیره تصویر</v-btn>
      </v-col> -->

      <!-- <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="لینک تصویر"
          type="text"
          v-model="data.TFF_FLenMin"
        />
      </v-col> -->
      <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="لینک مقصد"
          type="text"
          v-model="data.TFF_FToolTip"
        />
      </v-col>

      <v-col cols="12" class="py-1 px-3">
        <ui-input
          class="form_control_textInput"
          label="border Radius (px)"
          type="number"
          v-model="data.TFF_FPlaceHolder"
        />
      </v-col>
      <v-col cols="12" class="py-1 px-3">
        <label for="">نحوه ی باز شدن لینک</label>
        <v-select
          :items="openWays"
          v-model="open"
          class="mt-0 pt-0"
          @change="setOpen"
        ></v-select>
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
            openWays:["همین صفحه", "در صفحه جدید"],
            open: '',
        }
    },
  props: ["data", "form"],
  mounted(){
    if(this.data.TFF_FLenMax == 0){
      this.open = "همین صفحه"
    } else if(this.data.TFF_FLenMax == 1){
      this.open = "در صفحه جدید"
    }
  },
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
        const result = await this.$authAxios.post('/image/save', this.img)
        if(result) 
          console.log('save Image', result.data)
          this.showResponseSuccessMessages(result.data)
          this.data.TFF_FIcon = result.data.address
      } catch(error){
        console.log(error)
      }
    },
    setOpen(){
      if(this.open == "همین صفحه"){
        this.data.TFF_FLenMax = 0
      } else if(this.open == "در صفحه جدید"){
        this.data.TFF_FLenMax = 1
      }
      console.log('lenmax', this.data.TFF_FLenMax)
    },
    getImages(value){
      if(this.img){ 
        this.data.items.splice(0, 1)
        this.data.items.push({img: value, isnew: true,TFF_FDelete: 0, imgAlt: value.TPIC_FComment})

      }else{
        this.img = value  
        this.data.items.push({img: value, isnew: true,TFF_FDelete: 0, imgAlt: value.TPIC_FComment})
      }
    }
  }
};
</script>

<style lang="scss"></style>
