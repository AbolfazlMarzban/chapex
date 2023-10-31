<template>
    <div style="min-height:500px">
      <v-row>
  
<!--   
        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"  
            label="لینک ویدیو"
            type="text"
            v-model="data.TFF_FToolTip"
          />
        </v-col> -->

        <v-col cols="12" class="py-1 px-3">
          <!-- <ui-file-uploader state="videoMP4" @input="setImage"></ui-file-uploader> -->
          <library-dialog @export="value => getVideo(value)" :selected="data.items" />
        </v-col>
        <!-- <v-col cols="12" v-if="video">
          <v-btn dark rounded depressed @click="saveVid" color="#016670">ذخیره ویدئو</v-btn>
        </v-col> -->
        <v-col cols="12" class="py-1 px-3">
          <ui-input
            class="form_control_textInput"
            label="border Radius (px)"
            type="number"
            v-model="data.TFF_FPlaceHolder"
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
<!--   
        <v-col cols="12" class="py-1 px-3">
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
import libraryDialog from '../../library/dialog/libraryDialog.vue';
  export default {
  components: { libraryDialog },
      data(){
          return{
              video:null
          }
      },
    props: ["data", "form"],
    mounted(){
      console.log('data', this.data)
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
      getVideo(value){
        if(this.video){
          this.data.items.splice(0,1)
          this.data.items.push({img: value, isnew: true, TFF_FDelete: 0})
        } else {
          this.video = value
        console.log('video', value)
        this.data.items.push({img: value, isnew: true, TFF_FDelete: 0})
        }
      },
      submit() {
        this.$emit("submit", this.data);
      },
      setImage(vid){
        this.video = vid
        console.log('vid', this.video)
    },
    //  async saveVid(){
    //     console.log("element", this.data)
    //     this.video.parentID = this.form.TF_FID
    //     this.video.state = "formBuilder"
    //     try{
    //       const result = await this.$authAxios.post('/image/saveVid', this.video)
    //       if(result)
    //         this.showResponseSuccessMessages(result.data)
    //         console.log('video', this.video)
    //         this.data.TFF_FIcon = this.video.path
    //         console.log(this.data.TFF_FIcon)
    //     } catch(error){
    //       console.log(error)
    //     }
    //   }
    }
  };
  </script>
  
  <style lang="scss"></style>
  