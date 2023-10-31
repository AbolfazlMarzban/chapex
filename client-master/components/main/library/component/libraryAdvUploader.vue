<template>
  <div :id="id">
    <div
      class="d-flex flex-column align-center justify-center flex-grow-1 advUploader"
    >
      <library-dialog @export="value => setImage(value)" />
      <img v-if="img" :src="img.TPIC_FAddress" :id="id" class="advUploadprev"/>
      <img v-if="showTemp && tempLink.length > 0" :src="tempLink" alt="" class="tempPic">      

      <v-checkbox v-if="img" label="نمایش قالب" v-model="showTemp"></v-checkbox>

    </div>

    <span class="uplError" v-if="error.size.length > 0 || error.colorMode.length > 0
      || error.width.length > 0 || error.height.length > 0 || error.res.length > 0 || error.resUnit.length > 0 || error.whole.length > 0">
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
      <span v-if="error.whole.length > 0">
        {{ error.whole }}
      </span>
    </span>
  </div>
</template>

<script>
import ExifReader from "exifreader";
import path from "path";
export default {
  props: [
    "label",
    "id",
    "readonly",
    "placeholder",
    "options",
    "accept",
    "value",
    "count",
    "hint",
    "tempLink",
    "required",
    "minSize",
    "maxSize",
    "colorFormat",
    "fileWidth",
    "fileHeight",
    "minRes",
    "maxRes",
    "resUnit",
    "route",
    "deleteForm"
  ],
  data() {
    return {
      img: null,
      showTemp: false,
      error: {
        format: "",
        size: "",
        width: "",
        height: "",
        colorMode: "",
        res: "",
        resUnit: "",
        whole: ''
      }
    };
  },
  methods: {
     setImage(value) {
      console.log('value', value)
      this.error =  {
        format: "",
        size: "",
        width: "",
        height: "",
        colorMode: "",
        res: "",
        resUnit: "",
        whole: ''
      }
      if(value.TPIC_FColorMode && value.TPIC_FHeight && value.TPIC_FWidth && value.TPIC_FFileSize && value.TPIC_FType && value.TPIC_FResolution){
        if (this.accept.length > 0) {
          const types = this.accept.split(',')
          if(!types.some(item => item.includes(value.TPIC_FType))){
            this.error.format = 'فرمت اشتباهی را انتخاب کرده اید!'
          }
      }
      if((Number(value.TPIC_FFileSize)/1000000) > this.maxSize || (Number(value.TPIC_FFileSize)/1000000) < this.minSize){
        this.error.size = `حجم عکس باید بین ${this.minSize} mb و ${this.maxSize} mb باشد!`
      }
      if(value.TPIC_FHeight > this.fileHeight + 0.5 || value.TPIC_FHeight < this.fileHeight - 0.5){
        this.error.height = `ارتفاع عکس باید ${this.fileHeight} میلیمتر باشد!`
      }
      if(value.TPIC_FWidth > this.fileWidth + 0.5 || value.TPIC_FWidth < this.fileWidth - 0.5){
        this.error.width = `عرض عکس باید ${this.fileWidth} میلیمتر باشد!`
      }
      if(value.TPIC_FResolution > this.maxRes || value.TPIC_FResolution < this.minRes){
        this.error.res = `رزولوشن عکس باید بین ${this.minRes} dpi و ${this.maxRes} dpi باشد!`
      }
      if(value.TPIC_FColorMode !== this.colorFormat){
        this.error.colorMode = `مد رنگی عکس باید ${this.colorFormat} باشد!`
      }
      } else {
        this.error.whole = 'فایل شما برای بررسی نامعتبر است. فایل دیگری را انتخاب کنید!'
      } 

      let noError = Object.values(this.error).every(val => val === '');
      if(noError){
        this.img = value
        // console.log('img', this.img)
        this.$emit('input', this.img)
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
