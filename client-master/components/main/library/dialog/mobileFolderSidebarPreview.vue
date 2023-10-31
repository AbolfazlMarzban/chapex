<template>
    <div class="text-center mobile-folder-sidebar">
      <v-dialog v-model="show" width="500" class="goods_dialogs_main">
        <v-card class="goods_dialog">
          <v-card-title class="pb-0 d-flex justify-end"> 
            <v-icon color="red" @click="$emit('closeSidebar')">
               mdi-close   
              </v-icon>
          </v-card-title>
            
          <v-card-text>
            <v-row class="pa-5">
      <v-tabs fixed-tabs v-model="tab">
        <v-tab>
          <span>مشخصات</span>
        </v-tab>
        <v-tab v-if="isAdmin">
          <span>مدیریت دسترسی</span>
        </v-tab>
      </v-tabs>
      <hr style="width: 100%;" class="mt-0" />
      <v-col cols="12" class="text-center">
        <svg
          width="164"
          height="130"
          viewBox="0 0 164 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect
            width="164"
            height="130"
            fill="url(#pattern0)"
            fill-opacity="0.3"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlink:href="#image0_9_451"
                transform="matrix(0.00195312 0 0 0.00246394 0 -0.00510817)"
              />
            </pattern>
            <image
              id="image0_9_451"
              width="512"
              height="410"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAGaCAMAAABOswtwAAACbVBMVEUAAAAUFBQeHh4cHBwdHR0dHR0dHR0cHBwdHR0dHR0dHR0eHh4dHR0dHR0dHR0dHR0eHh4cHBwdHR0kJCQaGhoeHh4dHR0eHh4dHR0eHh4dHR0dHR0VFRUfHx8cHBweHh4dHR0dHR0dHR0bGxsdHR0dHR0dHR0dHR0eHh4gICAhISEdHR0dHR0cHBwkJCQcHBwdHR0cHBwfHx8dHR0dHR0rKyseHh4dHR0dHR0cHBwgICAeHh4cHBwgICAdHR0dHR0AAAAzMzMaGhodHR0dHR0fHx8dHR0dHR0aGhodHR0dHR0bGxsfHx8dHR0cHBwdHR0dHR0dHR0eHh4dHR0AAAAeHh4cHBwdHR0iIiIcHBweHh4dHR0eHh4cHBwAAAAdHR0dHR0dHR0fHx8eHh4AAAAeHh4dHR0dHR0XFxcdHR0dHR0cHBwdHR0cHBweHh4dHR0dHR0eHh4dHR0cHBwcHBwdHR0dHR0dHR0dHR0cHBwdHR0cHBwcHBweHh4dHR0cHBwdHR0cHBwdHR0dHR0eHh4gICAcHBwcHBwcHBwXFxcdHR0dHR0bGxsbGxsdHR0dHR0cHBwdHR0dHR0cHBwdHR0dHR0cHBwdHR0cHBwcHBwcHBwdHR0gICAcHBwdHR0eHh4dHR0dHR0cHBwdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cHBwdHR0dHR0dHR0dHR0eHh4dHR0eHh4fHx8bGxsaGhodHR0cHBweHh4dHR0hISEdHR0eHh4dHR0aGhocHBweHh4eHh4fHx8eHh4eHh4eHh4cHBwdHR0eHh4dHR0cHBwdHR0fHx8dHR2b4bm2AAAAznRSTlMADTNag6nDzt3q9vLnzMCeeFIsBxRUltj7xoZHDCF+z/3BaRNh/vmxVQgXi/N2Doj1kRmN9AZN4dpIILWrGE7uBAUdyMIp4t8nNe05Qvgt7/pQItsBdzZPD+CSYkxjA9lYy0sqAkOT1RZXmErxQGeCjpuotL33u7iqkIQbmb7SP+Mlv9NeKNdlogsj5jAmzbJs3JU37MR16AnFSaYQZLqBx3S8yuTJ0NHU1t7l6evw/KWAWVYyLwqUUxF6H2CKGh5cXZo6X0U7JI9vfRKnMd2sbDQAAAi3SURBVHja7d2Lf80F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"
            />
          </defs>
        </svg>
      </v-col>
      <v-col cols="12">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-col cols="12">
              <label
                class="d-flex align-center"
                style="font-weight: bold; font-size: 14px;"
                >نام فولدر
                <div
                  style="background: lightgray;width: 16px; height: 16px; text-align: center; cursor: pointer;"
                  class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                  @click="editName = false"
                >
                  <v-icon style=" font-size: 14px;">mdi-pencil</v-icon>
                </div>
              </label>
              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="12">
                  <span v-if="editName">{{ folder.TPF_FName }}</span>
                  <v-text-field
                    v-else
                    class="mt-0 pa-1"
                    v-model="folder.TPF_FName"
                    style="border: none"
                  ></v-text-field
                ></v-col>
              </v-row>
              <label
                class="d-flex align-center"
                style="font-weight: bold; font-size: 14px;"
                >نام محل ذخیره سازی
                <div
                  style="background: lightgray;width: 16px; height: 16px; text-align: center; cursor: pointer;"
                  class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                  @click="editRoot = false"
                >
                  <v-icon style=" font-size: 14px;">mdi-pencil</v-icon>
                </div>
              </label>
              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="12">
                  <span v-if="editRoot">{{ root }}</span>
                  <v-select
                    v-else
                    :items="roots.map(i => i.TD_FName)"
                    v-model="root"
                    dense
                  ></v-select>
                </v-col>
              </v-row>

              <label
                class="d-flex align-center"
                style="font-weight: bold; font-size: 14px;"
                >ظرفیت
                <div
                  style="background: lightgray;width: 16px; height: 16px; text-align: center; cursor: pointer;"
                  class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                  @click="editAlt = false"
                >
                  <v-icon style=" font-size: 14px;">mdi-pencil</v-icon>
                </div>
              </label>

              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="12">
                  <span v-if="showCapError" style="color: red; font-size: 12px;">ظرفیت درخواستی از حداکثر در دسترس شما بیشتر است. حداکثر ظرفیت این فولدر میتواند {{ maxCap/1000000 }} MB باشد</span>

                  <span v-if="!folder.TPF_Quota && editAlt" class="fn-14"
                    >بدون محدودیت حجم</span
                  >
                  <span v-else-if="editAlt" class="fn-14"
                    >{{ folder.TPF_Quota }} (MB)</span
                  >
                  <v-text-field
                    v-else-if="!editAlt"
                    class="mt-0 pa-1"
                    v-model="folder.TPF_Quota"
                    style="border: none"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>

              <label
                class="d-flex align-center"
                style="font-weight: bold; font-size: 14px;"
                >فضای اشغال شده
              </label>

              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="12">
                  <span
              style="color: red;"
              v-if="getUsedCap() > 100"
              >حجم فولدر پر شده است!</span
            >
            <span
            style="color: red;"
              v-if="getUsedCap() > 80 && getUsedCap() < 100"
            >
            بیش از 80 درصد ظرفیت در دسترس شما پر شده است
            </span>
            <v-progress-linear
              :value="getUsedCap()"
              color="#016670"
            ></v-progress-linear>
            <span
              style="direction: ltr; text-align: left; display: block; width: 100%;
            font-family: Roboto !important; color : #6C7074; font-size: 12px;
            "
              class="mt-2"
              >{{ Math.round(folder.TPF_FolderSize / 1000000) }} MB out of
              {{ folder.TPF_Quota }} MB</span
            >   
                </v-col>
              </v-row>
              <label style="font-weight: bold; font-size: 14px;"
                >ایجاد کننده
              </label>
              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="12"></v-col>
              </v-row>

              <label style="font-weight: bold; font-size: 14px;"
                >تاریخ ایجاد
              </label>
              <v-row style="width: 100%; margin-left: 0px;">
                <v-col cols="12">
                  <span>{{ folder.TPF_FDateReg }}</span>
                </v-col>
              </v-row>

              <label
                class="d-flex align-center"
                style="font-weight: bold; font-size: 14px;"
                >توضیحات
                <div
                  style="background: lightgray;width: 16px; height: 16px; text-align: center; cursor: pointer;"
                  class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                  @click="editComment = false"
                >
                  <v-icon style=" font-size: 14px;">mdi-pencil</v-icon>
                </div>
              </label>
              <v-row style="width: 100%; margin-left: 0px;" class="mb-2">
                <v-col cols="12">
                  <span style="width: 100%;" v-if="editComment">{{
                    folder.TPF_FComment
                  }}</span>
                  <v-text-field
                    v-else
                    class="mt-0 pa-1"
                    v-model="folder.TPF_FComment"
                    style="border: none"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-col>
          </v-tab-item>
          <v-tab-item>
            <v-card style="box-shadow: none !important;">
              <v-card-text class="pa-0">
                <v-col cols="12">
                  <label style="font-weight: bold; font-size: 14px;"
                    >گروه های دسترسی
                  </label>
                  <v-row
                    class="align-center my-2"
                    style="border: 1px solid lightgray; border-radius: 8px;"
                  >
                    <v-col cols="6" class="pa-1">
                      <span>
                        طراحان گرافیک
                      </span>
                    </v-col>
                    <v-col cols="6" class="d-flex pa-1">
                      <div
                        style="background: #FFEBC6;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#FFBD42"
                          >mdi-eye-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #9CDDE3;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#158C97"
                          >mdi-pencil-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #FFBFBF;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#D25353"
                          >mdi-trash-can-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #C5FCC7;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#608E62"
                          >mdi-arrow-top-left</v-icon
                        >
                      </div>
                    </v-col>
                  </v-row>
                  <v-row
                    class="align-center my-2"
                    style="border: 1px solid lightgray; border-radius: 8px;"
                  >
                    <v-col cols="6" class="pa-1">
                      <span>
                        طراحان گرافیک
                      </span>
                    </v-col>
                    <v-col cols="6" class="d-flex pa-1">
                      <div
                        style="background: #FFEBC6;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#FFBD42"
                          >mdi-eye-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #9CDDE3;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#158C97"
                          >mdi-pencil-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #FFBFBF;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#D25353"
                          >mdi-trash-can-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #C5FCC7;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#608E62"
                          >mdi-arrow-top-left</v-icon
                        >
                      </div>
                    </v-col>
                  </v-row>
                  <v-row
                    class="align-center my-2"
                    style="border: 1px solid lightgray; border-radius: 8px;"
                  >
                    <v-col cols="6" class="pa-1">
                      <span>
                        طراحان گرافیک
                      </span>
                    </v-col>
                    <v-col cols="6" class="d-flex pa-1">
                      <div
                        style="background: #FFEBC6;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#FFBD42"
                          >mdi-eye-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #9CDDE3;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#158C97"
                          >mdi-pencil-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #FFBFBF;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#D25353"
                          >mdi-trash-can-outline</v-icon
                        >
                      </div>
                      <div
                        style="background: #C5FCC7;width: 16px; height: 16px; text-align: center;"
                        class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                      >
                        <v-icon style=" font-size: 14px;" color="#608E62"
                          >mdi-arrow-top-left</v-icon
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-btn
        color="#D9D9D9"
          block
          class="rounded-lg"
          style="letter-spacing: normal;"
          @click="$emit('closeSidebar')"
          >
          <span style="font-weight: bold;">انصراف</span>
          </v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn 
          color="#016670"
          dark
          block
          class="rounded-lg"
          style="letter-spacing: normal;"
          @click="submitFolder"
          >
          <span style="font-weight: bold;">تأیید</span>
          </v-btn
        >
      </v-col>
    </v-row>
          </v-card-text>
  
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  import "../../../../assets/style/goods/goodsDialogs.scss";
  export default {
    props: ["show", "selected","folder", "roots", "maxCap", "isAdmin"],
    data() {
      return {
        editName: true,
      editAlt: true,
      root: "",
      tab: null,
      editRoot: true,
      editComment: true,
      showCapError: false
      };
    },
     mounted() {
        if (!this.folder.TPF_FID_Host) {
      this.root = "data.chapex.ir";
    } else {
      const rooot = this.roots.find(x => x.TD_FID == this.folder.TPF_FID_Host);
      if (rooot) {
        this.root = rooot.TD_FName;
      }
    }
  },
  methods: {
    getUsedCap(){
      if(this.folder.TPF_Quota){
        var total = this.folder.TPF_Quota*1000000
        var size = this.folder.TPF_FolderSize
        return Math.round((size/total)*100)
      }
    },
    submitFolder() {
      if(this.maxCap && this.maxCap != 0 && (this.maxCap/1000000) <= this.folder.TPF_Quota){
        this.showCapError = true
      } else {
        this.$emit("editFolderSubmit", this.folder);
      }
    }
  },
  watch: {
    root(newValue) {
      if (this.roots.length > 0) {
        const rooot = this.roots.find(x => x.TD_FName == newValue);
        if (rooot) {
          this.folder.TPF_FID_Host = rooot.TD_FID;
        }
      }
    }
  }
  };
  </script>

  <style lang="scss">

  </style>
  