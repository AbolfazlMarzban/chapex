<template>
  <div>

    <label>{{ label }}</label>

    <div class="d-flex flex-column align-center justify-center flex-grow-1 uploader">

      <label v-if="upload.loading == 0">
        <div v-if="!img.path" class="uploaderText">
          <v-icon style="font-size: 60px;">mdi-upload</v-icon>
          <p v-if="!placeholder">فایل خود را انتخاب کنید</p>       
          <p v-if="placeholder">{{ placeholder }}</p>
        </div>

        <div v-else>
          <v-img max-height="150" max-width="150" :src="setImageUrl(img.path)"></v-img>
          <!-- <p class="text-center">{{ uploadedFile.name }}</p> -->
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
import path from "path";
// import FormData from "form-data"
export default {
  props: ["label", "readonly", "placeholder", "options", "accept", "value", "state"],
  mounted() {
    // console.log("asdasdas", this.uploadedFile); 
  },

  data() {
    return {
      uploadedFile: null,
      img: {
        TPIC_FName: '',
        path: null,
        thumbnail_path: null,
      },
      upload: { loading: 0, status: "" },
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
      this.img.TPIC_FName = this.uploadedFile.name.substr(0, this.uploadedFile.name.lastIndexOf('.'))

      this.submit()
    },

    async submit() {
      try {
        let form = new FormData();

        const options = {
          state: this.state
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
          this.img.path = response.otherData.path
          this.img.thumbnail_path = response.otherData.thumbnail_path
          this.$emit("input", this.img);

          setTimeout(() => {
            this.upload.status = "uploaded";
          }, 2000);
        }
      }
      catch (error) {
        this.upload.loading = 0;
        this.upload.status = "failed";
        console.log('upload error');
        console.log(error);
      }


      // await axios.post()
    },
  },
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