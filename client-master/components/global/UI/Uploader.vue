<template>
  <div :id="id">

    <label>{{ label }}</label>                              

    <div class="d-flex flex-column align-center justify-center flex-grow-1 uploader" >                 

      <label v-if="upload.loading == 0">                                                            
        <div v-if="!img.path" class="uploaderText">
          <v-icon style="font-size: 60px;">mdi-upload</v-icon>              
          <p v-if="!placeholder">فایل خود را انتخاب کنید</p>
          <p v-if="placeholder">{{ placeholder }}</p> 
        </div>

        <div v-else>
          <v-img max-height="150" max-width="150" :src="setImageUrl(img.path)"></v-img>
        </div>

        <input v-if="!uploadedFile" type="file" :accept="accept" @change="handleFileUpload($event)" multiple
          color="#f66f26" buffer-value="0" style="display: none" :disabled="readonly" />               
      </label> 

      <div class="text-center" v-else>
        <v-progress-circular :size="50" color="green" indeterminate></v-progress-circular>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios"
// import FormData from "form-data"
import path from 'path'
export default {
  props: ["label", "id", "readonly", "placeholder", "options", "accept", "value", "route", "deleteForm", "clearPic"],
  mounted() {
    // console.log("asdasdas", this.uploadedFile);
  },

  data() {
    return {
      uploadedFile: null,
      img: {
        path: null,
        thumbnail_path: null,
        uploadPath: '',
        user: '',
        password: ''
      },
      upload: { loading: 0, status: "" },
      routes: [],
      uploadOptions: {
        path: '',
        user: '',
        password: ''
      }
    };
  },

  mounted() {
    if (this.value) {
      this.img = this.value
    }
  },

  methods: {
    handleFileUpload(event) {
      this.uploadedFile = event.target.files[0];
      if(this.route){
        this.getRoutes()
      } else {
              this.submit()
      }
    },  
    async getRoutes(groupID = 240){
      try {           
        const response = await this.$authAxios.$get(
          `/defaults/get/${groupID}?mode=table`
        );
      this.routes = response.data.table        
      } catch (error) {
        console.log(error);  
      }
      var course = this.routes.find(item => item.TD_FID == this.route)
      console.log('course', course) 
      if(course.TD_FComment.includes('public,')){
        const pathArr = course.TD_FComment.split(',')
        var paath = path.join(pathArr[0], pathArr[1], pathArr[2])
        // console.log('path', paath)
        this.uploadOptions.path = paath
      } else {
        var info = course.TD_FComment.split(',')
        this.uploadOptions.user = info[0]
        this.uploadOptions.password = info[1]
      }
      // console.log('uploadOptions', this.uploadOptions)
      this.newSubmit()
    },
    async newSubmit(){
      try{
        let form = new FormData();
        form.append('image', this.uploadedFile);
        form.append('path', this.uploadOptions.path)
        form.append('user', this.uploadOptions.user)
        form.append('password', this.uploadOptions.password)

        console.log('form', ...form)

        this.upload.loading = 1;

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      const response = await this.$authAxios.$post("/image/newUpload", form, config)
      this.upload.loading = 0;
        this.upload.status = "success";
        if (response) {
          console.log('response', response);
          this.img.path = response.otherData.path  
          this.img.thumbnail_path = response.otherData.thumbnail_path
          this.img.uploadPath = this.uploadOptions.path
          this.img.user = this.uploadOptions.user
          this.img.password = this.uploadOptions.password
          this.$emit("input", this.img);
          // console.log('this.thumbnail_url', this.thumbnail_url);

          setTimeout(() => {  
            this.upload.status = "uploaded";
          }, 2000);
        }
      }       catch (error) {
        this.upload.loading = 0;
        this.upload.status = "failed";
        // this.showResponseErrors(error);
        console.log('upload error');
        console.log(error);
      }
     
    },
    async submit() {
      console.log('submit')
      try {
        let form = new FormData();

        const options = {
          state: 'pageSale'
        };
        for (const key in options) {
          form.append([key], options[key]);
        }

        form.append('image', this.uploadedFile);

        this.upload.loading = 1;
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        // console.log('form', form)

        // console.log('config', config)

        const response = await this.$authAxios.$post("/image/upload", form, config);

        this.upload.loading = 0;
        this.upload.status = "success";

        if (response) {
          console.log('response', response);
          this.img.path = response.otherData.path  
          this.img.thumbnail_path = response.otherData.thumbnail_path
         
          this.$emit("input", this.img);

          // console.log('this.thumbnail_url', this.thumbnail_url);

          setTimeout(() => {
            this.upload.status = "uploaded";
          }, 2000);
        }
      }
      catch (error) {
        this.upload.loading = 0;
        this.upload.status = "failed";
        // this.showResponseErrors(error);
        console.log('upload error');
        console.log(error);
      }


      // await axios.post()
    },
  },
  watch:{
    deleteForm(){
      this.img = {
        path: null,
        thumbnail_path: null,
        uploadPath: '',
        user: '',
        password: ''
      }
      this.uploadedFile = null
    }
  }
};
</script>

<style scoped>
.upload-block {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;
}

.uploader {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;

  /* cursor: pointer !important; */
  text-align: center;
  width: 100%;
}

.uploaderText {
  cursor: pointer !important;
  color: grey;
}

.uploaderText:hover {
  color: rgb(0, 68, 255);
}
</style>