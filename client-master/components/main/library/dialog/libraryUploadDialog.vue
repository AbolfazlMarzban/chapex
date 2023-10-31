<template>
  <div class="text-center">
    <v-dialog v-model="show" width="900" class="goods_dialogs_main rounded-xl">
      <v-card class="goods_dialog rounded-xl">
        <v-card-text class="pt-5">
          <div class="goods_dialog_title d-flex justify-end">
            <v-icon @click="$emit('close')">mdi-close</v-icon>
          </div>
          <div class="goods_dialog_text mt-3">
            <v-row>
              <v-col cols="12">
                <v-row
                  style="border: 1px dashed #016670; border-radius: 12px; position: relative;"
                  class="align-center py-10"
                >
                  <input
                    multiple
                    ref="uploader"
                    :accept="fileTypes"
                    name="files"
                    style="opacity: 0; position: absolute; height: 100%; width: 100%"
                    type="file"
                    @change="setFile"
                    buffer-value="0"
                  />
                  <v-col cols="3">
                    <v-btn
                      style="border: 1px solid #016670"
                      depressed
                      class="pa-2 rounded-lg"
                      @click="uploaderClick"
                    >
                      <span style="font-weight: bold; color: #016670;">
                        انتخاب فایل
                      </span>
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <p class="mb-0">
                      فایل خود را انتخاب یا در فضای کادر رها کنید
                    </p>
                  </v-col>
                  <v-col cols="3">
                    <svg
                      width="49"
                      height="48"
                      viewBox="0 0 49 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32.5 32L24.5 24L16.5 32"
                        stroke="#016670"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.5 24V42"
                        stroke="#016670"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M41.2799 36.78C43.2306 35.7165 44.7716 34.0337 45.6597 31.9972C46.5477 29.9607 46.7323 27.6864 46.1843 25.5334C45.6363 23.3803 44.3869 21.471 42.6333 20.1069C40.8796 18.7427 38.7216 18.0014 36.4999 18H33.9799C33.3745 15.6585 32.2462 13.4846 30.6798 11.642C29.1134 9.79927 27.1496 8.33567 24.9361 7.36118C22.7226 6.3867 20.317 5.92669 17.9002 6.01573C15.4833 6.10478 13.1181 6.74057 10.9823 7.8753C8.84649 9.01003 6.99574 10.6142 5.56916 12.5671C4.14259 14.5201 3.1773 16.771 2.74588 19.1508C2.31446 21.5305 2.42813 23.977 3.07835 26.3065C3.72856 28.636 4.8984 30.7877 6.49992 32.6"
                        stroke="#016670"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M32.5 32L24.5 24L16.5 32"
                        stroke="#016670"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row
              style="background: #F2F7F8;"
              class="mt-5 rounded-lg"
              v-if="files.length > 0"
            >
              <v-col
                cols="12"
                class="d-flex flex-column justify-start align-start"
                v-for="file,i in files" :key="i"
              >
                <label for="" style="font-weight: bold; color: #016670;"
                  >نام فایل:</label
                >
                <span>{{ file.name }}</span>
                <label for="" style="font-weight: bold; color: #016670;"
                  >حجم فایل:</label
                >
                <span style="direction: ltr;"> {{ file.size }} KB</span>
                <v-progress-linear
                  v-if="loading"
                  indeterminate
                  color="#016670"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ExifReader from "exifreader";
import "../../../../assets/style/goods/goodsDialogs.scss";
export default {
  props: ["show", "roots", "loading", "folders", "FID", "fileFormats", "isAdmin"],

  data() {
    return {
      folderName: "",
      showError: false,
      uploadDestn: "",
      root: {},
      name: [],
      size: [],
      files: [],
      fileTypes: []
    };
  },

  methods: {
    uploaderClick() {
      this.$refs.uploader.click();
    },
    async setFile(ev) {
      const folder = this.folders.find(item => item.TPF_FID == this.FID);
      // console.log('folder', folder)
      // console.log('folders', this.folders)
      // console.log('roots', this.roots)
      if(this.isAdmin){
        if (folder) {
            this.root = this.roots.find(item => item.TD_FID == folder.TPF_FID_Host);
        }
      } else {
        this.root = this.roots.find(item => item.TD_FValue1 == 1)
      }
      // console.log('root', this.root)
      var EXIF = require("exif-js");
      var files = ev.target.files;
      const reader = new FileReader();
      function readFile(index) {
        if (index >= files.length) return;
        var file = files[index];
        reader.onload = ev => {
          EXIF.getData(file, () => {
            const exifdata = EXIF.getAllTags(file);
            // console.log('exifdata', exifdata)
            if (exifdata && Object.keys(exifdata).length > 0) {
              const metadata = ExifReader.load(ev.target.result, {
                includeUnknown: true
              });
              if (metadata && metadata.XResolution) {
                file.resolution = metadata.XResolution.description;
                file.height =
                  (metadata["Image Height"].value * 25.4) / file.resolution;
                file.width =
                  (metadata["Image Width"].value * 25.4) / file.resolution;
              }
              if (metadata && metadata["Color Components"]) {
                if (metadata["Color Components"].value == 3) {
                  file.colorMode = "RGB";
                } else if (metadata["Color Components"].value == 4) {
                  file.colorMode = "CMYK";
                }
              }
            }
            readFile(index + 1);
          });
        };
        reader.readAsArrayBuffer(file);
      }
      readFile(0);
      // console.log('root', this.root)
      const data = {
        files: files,
        destination: this.root.TD_FName,
        user: JSON.parse(this.root.TD_FComment).user,
        password: JSON.parse(this.root.TD_FComment).password
      };
      if(data.files.length > 0){
        for(var i=0;i < data.files.length; i++){
          this.files.push({
            name: data.files[i].name,
            size: Math.round(data.files[i].size / 1000)
          }) 
        }
        // console.log('files', this.files)
        this.$emit("sendFile", data);
        this.root = {};
      }
    },
    hiddenDialog() {
      this.$emit("hiddenDialog");
      this.root = {};
    },
    deleteItemFromTable() {
      this.$emit("deleteItemFromTable");
    },
    submit() {
      if (this.folderName.length > 0) {
        this.$emit("insertFolder", this.folderName);
      } else {
        this.showError = true;
      }
      this.root = {};
    }
  },
  watch:{
    show(newValue){
      this.files = []
      var acc = this.fileFormats.map(item => '.'+item)
      this.fileTypes = acc.toString()
    }
  }
};
</script>
