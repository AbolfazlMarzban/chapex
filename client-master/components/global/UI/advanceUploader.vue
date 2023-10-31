<template>
  <div>
    <v-tooltip top :disabled="hint.length == 0">
      <template v-slot:activator="{ on, attrs }">
        <div class="d-flex flex-column align-center justify-center flex-grow-1 advUploader" v-on="on" v-bind="attrs">
          <input type="file" :accept="accept" @change="handleFileUpload($event)" color="#f66f26" buffer-value="0"
            :disabled="readonly" :required="required" :id="id" />
          <label v-if="upload.loading == 0">
            <div v-if="!img.path" class="uploaderText"> 
              <v-icon style="font-size: 60px;">mdi-upload</v-icon>  
              <p v-if="!placeholder">فایل خود را انتخاب کنید</p>
              <p v-if="placeholder">{{ placeholder }}</p>
            </div>

            <div v-else>
                <img :src="setImageUrl(img.path)" alt="" class="advUploadprev" :id="id">
              <img v-if="showTemp" :src="tempLink" alt="" class="tempPic">      
            </div>  
          </label>

          <div class="text-center" v-else>
            <v-progress-circular :size="50" color="green" indeterminate></v-progress-circular>
          </div>

        </div>
      </template>
      <span>{{ hint }}</span>
    </v-tooltip>
    <v-checkbox label="نمایش قالب" v-model="showTemp"></v-checkbox>
    <span class="uplError" v-if="error.size.length > 0 || error.colorMode.length > 0
      || error.width.length > 0 || error.height.length > 0 || error.res.length > 0 || error.resUnit.length > 0">
      ایرادات فایل آپلود شده :
      <br>
      <span v-if="error.size.length > 0">
        {{ error.size }}
        <br>
      </span>
      <span v-if="error.width.length > 0">
        {{ error.width }}
        <br>
      </span>
      <span v-if="error.height.length > 0">
        {{ error.height }}
        <br>
      </span>
      <span v-if="error.res.length> 0">
        {{ error.res }}
        <br>
      </span>
      <span v-if="error.resUnit.length > 0">
        {{ error.resUnit }}
      </span>
    </span>
  </div>     
</template>

<script>
import ExifReader from 'exifreader'
import path from 'path'
export default {
  props: ["label", "id", "readonly", "placeholder", "options", "accept", "value", "count", "hint",
    "tempLink", "required", "minSize", "maxSize", "colorFormat", "fileWidth", "fileHeight", "minRes", "maxRes", "resUnit", "route", "deleteForm"],

  data() {
    return {
      img: {
        path: null,
        thumbnail_path: null,
        uploadPath: '',
        user: '',
        password: ''
      },
      upload: { loading: 0, status: "" },
      showTemp: false,
      temp: '',
      res: null,
      error: {
        size: '',
        width: '',
        height: '',
        colorMode: '',
        res: '',
        resUnit: ''
      },
      routes: [],
      uploadOptions: {
        path: '',
        user: '',
        password: ''
      },
      checkError: false
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
      // console.log(this.uploadedFile.size)
      const reader = new FileReader()
      // console.log('colorFormat', this.colorFormat)
      reader.onload = (event) => {
        // console.log('eventTArget', event.target)
        const metadata = ExifReader.load(event.target.result, { expanded: true })
         console.log('metadata', metadata)
        const { file: { 'Color Components': { value } } } = metadata
        switch (value) {
          case 3:
            if (this.colorFormat == "CMYK") {
              this.error.colorMode = `مد رنگی فایل باید ${this.colorFormat} باشد!`
            } else {
              this.error.colorMode = ''
            }
            console.log('RGB'); break
          case 4:
            if (this.colorFormat == "RGB") {
              this.error.colorMode = `مد رنگی فایل باید ${this.colorFormat} باشد!`
            } else {
              this.error.colorMode = ''
            }
            console.log('CMYK'); break
          default: console.log('Unknown')
        }
         this.res = metadata.exif.XResolution.description
        this.resUni = metadata.exif.ResolutionUnit.description
        // console.log('res', res)
        if (this.resUni == this.resUnit) {
          if (this.res > this.maxRes || this.res < this.minRes) {
            this.error.res = `رزولوشن تصویر آپلود شده باید بین ${this.minRes} dpi و ${this.maxRes} dpi باشد!`
          } else {
            this.error.res = ''
          }
          this.error.resUnit = ''
        } else {
          this.error.resUnit = `رزولوشن خروجی شما باید بر حسب px/${this.resUnit} باشد!`
        }
      }

      reader.readAsArrayBuffer(this.uploadedFile)

      const imgReader = new FileReader()
      imgReader.onload = (event) => {
        // console.log('eventTArgetImage', event.target)
      
        var image = new Image()
        image.src = event.target.result;
        // console.log('image', image)
        image.onload = () => {
          var height = (image.height*25.4)/this.res;
          var width = (image.width*25.4)/this.res;
          console.log('height', height)
          console.log('width', width)
          if (height > this.fileHeight + 0.5 || height < this.fileHeight - 0.5) {
            this.error.height = `ارتفاع فایل شما باید ${this.fileHeight} میلیمتر باشد!`
          } else {
            this.error.height = ''
          }
          if (width > this.fileWidth + 0.5 || width < this.fileWidth - 0.5) {
            this.error.width = `عرض فایل شما باید ${this.fileWidth} میلیمتر باشد!`
          } else {
            this.error.width = ''
          }

          this.checkError = true

        }

      }
      imgReader.readAsDataURL(this.uploadedFile)

      if (this.uploadedFile.size / 1024000 >= this.minSize && this.uploadedFile.size / 1024000 <= this.maxSize) {
        this.error.size = ''
        // this.submit()
      } else {
        var sizeError = `حجم فایل شما باید بین ${this.minSize} مگا بایت و ${this.maxSize} مگا بایت باشد!`
        this.error.size = sizeError
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
      // console.log('routes', this.routes)
      // console.log('route', this.route)
      var course = this.routes.find(item => item.TD_FID == this.route)
      console.log('course', course)
      if(course.TD_FComment.includes('public,')){
        const pathArr = course.TD_FComment.split(',')
        var paath = path.join(pathArr[0], pathArr[1], pathArr[2])
        // console.log('path', paath)
        this.uploadOptions.path = paath
        console.log('gooooz')
      } else {   
        var info = course.TD_FComment.split(',')
        this.uploadOptions.user = info[0]
        this.uploadOptions.password = info[1]
      }
      console.log('uploadOptions', this.uploadOptions)
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
          // console.log('response', response);
          console.log('options', this.uploadOptions)
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
      try {
        let form = new FormData();

        const options = {
          state: 'advancedUploader'
        };
        for (const key in options) {
          form.append([key], options[key]);
        }

        form.append('image', this.uploadedFile);

        this.upload.loading = 1;

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const response = await this.$authAxios.$post("/image/upload", form, config);

        this.upload.loading = 0;
        this.upload.status = "success";

        if (response) {
          // console.log('response', response);
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
    },
    checkError(){
      let noError = Object.values(this.error).every(val => val === '');
      if(noError){
        this.getRoutes()
      }
    }
  }
};   
</script>

<style lang="scss" scoped>
.advUploader {
  border: 2px dashed #adadad;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 20px;

  /* cursor: pointer !important; */
  text-align: center;
  width: 100%;
  position: relative;

  input {
    height: 100%;
    position: absolute;
    opacity: 0;
  }
}

.uploaderText {
  cursor: pointer !important;
  color: grey;
}

.uploaderText:hover {
  color: rgb(0, 68, 255);
}

.advUploadprev {
  max-width: 100%;
  max-height: auto;
  position: relative;
}

.tempPic {
  position: absolute;
  max-width: 94%;
  background-blend-mode: multiply;
  opacity: 0.7;
  top: auto;
  left: 30px;
}

.uplError {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
