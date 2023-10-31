<template>
  <div class="pr-4">
    <v-row>
      <v-col cols="12" class="file_real_time_label">
        <span>{{ label }} </span>
        <v-icon v-if="type == 'image' " @click="previewDialog" class="fns-20 cursor-to-pointer">mdi-eye</v-icon>
        <v-icon v-else @click="download(value)" class="fns-20 cursor-to-pointer">mdi-download</v-icon>
        <a v-if="value" :href="setDownloadUrl(value)"
          ></a
        >
      </v-col>
      <v-col cols="12" class="previewFileImage px-0">
        <div
          class="loader loader--style1"
          :style="{ opacity: upload.loading }"
          title="0"
        >
          <svg
            class="fileRealTimeSvg"
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="40px"
            height="40px"
            viewBox="0 0 40 40"
            enable-background="new 0 0 40 40"
            xml:space="preserve"
          >
            <path
              opacity="0.2"
              fill="#000"
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
            />
            <path
              fill="#000"
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>

        <!-- <div class="ImageOverlay" v-if="!readonly && value"> -->
        <!-- <img src="/delete.png" @click="deleteHandle" /> -->
        <!-- </div> -->
        <div class="FileRealTimeImage">
          <img v-if="type == 'file'" src="~static/file-placeholder.png" />
          <img
            v-else
            :src="setImageUrl(value, smallSizeAccess ? 'sm-realtime' : null)"
          />
          <img
            src="/tick.png"
            class="FileRealTimeTick"
            v-if="upload.status == 'success'"
          />
          <img
            src="/close.png"
            class="FileRealTimeClose"
            v-if="upload.status == 'failed'"
          />
        </div>
        <div class="FileRealTimeBtnGroup">
          <!-- <div :class="[readonly ? 'real_time_disable': '','fileRealTimeTitle']" v-if="label">
            <p>{{ label }}</p>
          </div> -->
          <div class="dis-flex">
            <div class="FileRealTimebtn">
              <label
                :for="id"
                :class="[readonly ? 'File_Label_Disable' : '', 'FileLable']"
                v-if="value"
              >
                <v-icon @click="deleteHandle">mdi-delete</v-icon>
              </label>
              <label
                :for="id"
                :class="[readonly ? 'File_Label_Disable' : '', 'FileLable']"
                v-if="!value"
              >
                <v-icon>mdi-plus</v-icon>
              </label>
            </div>
            <!-- <div class="fileRealTimebtn2">
              <label class="FileLableDelete" @click="deleteHandle" v-if="!readonly && value">
                <v-icon>mdi-delete</v-icon>
              </label>
            </div> -->
          </div>
        </div>
        <!-- <img src="/tick.png" class="FileRealTimeTick" alt=""> -->
        <!-- امکان آپلود چند فایل اضافه شده -->
        <input
          @change="addImage"
          multiple
          type="file"
          ref="image"
          name="photo"
          :id="id"
          :disabled="readonly"
          class="FileInput"
        />
      </v-col>
    </v-row>



    <v-dialog
      persistent
      v-model="showPreviewDialog"
      width="1200"
      class="image_table_dialogs_main"
    >    
      <v-card class="image_table_dialog">
        <v-row class="mx-0 image_table_dialog_row">
          <span>نمایش تصویر</span>
          <v-spacer></v-spacer>

          <v-icon
            class="image_table_dialog_btn mt-4"
            @click="showPreviewDialog = false"
          >
            mdi-close
          </v-icon>
        </v-row>
        <v-card-text class="mt-5">
          <div class="image_table_dialog_text">
            <v-icon @click="download(value)" class="cursor-to-pointer" style="font-size:30px;">mdi-download</v-icon>
            <img :src="setImageUrl(value)" />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>





  </div>
</template>

<script>
import "../../../assets/style/Ul/FileRealTime.scss";
export default {
  props: {
    value: {},
    id: {},
    readonly: {},
    options: {},
    label: {},
    processSteps: {},
    type: {
      default: "image",
    },
    validation: {},
  },
  data() {
    return {
      upload: { loading: 0, status: "" },
      success: false,
      smallSizeAccess: false,
      showPreviewDialog : false , 
    };
  },
  methods: {

      previewDialog(){
        this.showPreviewDialog = true;
      },


    handleFileRemove() {
      if (!this.readonly) {
        this.$emit("delete");
        this.$emit("input", "");
      }
    },
    async addFile() {
      try {
        this.upload.status = "";
        this.upload.loading = 1;
        let formData = new FormData();
        const file = this.$refs.image.files[0];
        const options = {
          ...this.options,
          type: this.type,
          ...this.validation,
        };
        for (const key in options) {
          formData.append([key], options[key]);
        }

        formData.append("file", file);
        this.uploading = true;
        const response = await this.$authAxios.$post("/image/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.upload.loading = 0;
        this.upload.status = "success";
        console.log(response);
        if (response) {
          this.$emit("input", response.file.path);
          setTimeout(() => {
            this.upload.status = "";
          }, 3000);
        }
      } catch (error) {
        this.upload.loading = 0;
        this.upload.status = "failed";
        this.showResponseErrors(error);
        console.log(error);
      }
    },
    async addImage(event) {
      if (this.type == "file") {
        this.addFile();
        return;
      }
      try {
        this.upload.status = "";
        this.upload.loading = 1;
        const file = event.target.files[0];
        const options = {  
          ...this.options,
          type: this.type,
          ...this.validation,
        };
        let formData = this.generateFormData(options);
        this.appendImageFormDataRealTime(formData, "image", file);

        this.uploading = true;
        const response = await this.$authAxios.$post("/image/upload", formData);

        // console.log("file", file);
        this.upload.loading = 0;
        this.upload.status = "success";

        // console.log(response.data)
        // if (response) {
        //   this.showResponseSuccessMessages(response);
        // }
        // this.showResponseSuccessMessages(response, {
        //   unique: true,
        // });

        this.smallSizeAccess = response.otherData.smallSizeAccess;
        this.$emit("input", response.otherData.path);
        setTimeout(() => {
          this.upload.status = "";
        }, 3000);
      } catch (error) {
        this.upload.loading = 0;
        this.upload.status = "failed";
        this.showResponseErrors(error);
        console.log(error);
      }
    },
    async deleteHandle() {
      if (this.readonly) {
        return;
      }
      try {
        this.upload.status = "";
        this.upload.loading = 1;

        const options = { ...this.options };

        if (this.processSteps == "upload.update.remove") {
          this.uploading = true;
          const response = await this.$authAxios.$patch(
            "/image/remove",
            options
          );
          this.showResponseSuccessMessages(response);
          this.$emit("input", response.otherData.path);
          this.$refs.image.value = null;
        } else if (this.processSteps == "upload") {
          this.$emit("input", "");
          this.$refs.image.value = null;
        }
        this.upload.loading = 0;
        this.upload.status = "success";
      } catch (error) {
        this.upload.status = "failed";
        this.showResponseErrors(error);
        console.log(error);
      }
      // /image/remove/real-time
    },

    sendDataToShowInPreviewDialog(data){
      this.$emit("dataToShowPreview" , data)
    }
  },
};
</script>

