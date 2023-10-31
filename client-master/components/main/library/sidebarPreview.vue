<template>
  <div style="position: sticky; top: 0;">
    <v-row>
      <v-col cols="12">
        <v-tabs fixed-tabs v-model="tab">
          <v-tab>
            <span>
              مشخصات
            </span>
          </v-tab>
          <v-tab v-if="isAdmin">
            <span>
              دسترسی ها
            </span>
          </v-tab>
          <v-tab v-if="isAdmin">
            <span>
              کاربرد
            </span>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <hr style="width: 100%;" class="mt-0">
    <v-row class="pa-5">
      <v-col cols="12" class="d-flex flex-column justify-center px-4">
        <img
          v-if="image"
          :src="setImageUrl(image.TPIC_FAddress)"
          alt=""
          style="width: 100%;"
        />
        <!-- <img v-else :src="image.TPIC_FAddress" alt="" style="width: 100%;" /> -->
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12">

            <v-tabs-items v-model="tab" class="sidebar-tabitems">
              <v-tab-item>
                <v-card style="box-shadow: none !important;">
                  <v-card-text class="pa-0">
                    <v-col cols="12">
                      <label
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >نام فایل
                        <div
                          style="background: lightgray;width: 16px; height: 16px; text-align: center; cursor: pointer;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                          @click="editName = false"
                        >
                          <v-icon style=" font-size: 14px;">mdi-pencil</v-icon>
                        </div>
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;" class="mb-2">
                        <v-col cols="11">
                          <span v-if="editName">{{ image.TPIC_FShowName }}</span>
                          <v-text-field
                            v-else
                            class="mt-0 pa-1"
                            v-model="image.TPIC_FShowName"
                            style="border: none"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >نام جایگزین
                        <div
                          style="background: lightgray;width: 16px; height: 16px; text-align: center; cursor: pointer;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                          @click="editAlt = false"
                        >
                          <v-icon style=" font-size: 14px;">mdi-pencil</v-icon>
                        </div>
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;" class="mb-2">
                        <v-col cols="12">
                          <span style="width: 100%;" v-if="editAlt">{{
                            image.TPIC_FComment
                          }}</span>
                          <v-text-field
                            v-else
                            class="mt-0 pa-1"
                            v-model="image.TPIC_FComment"
                            style="border: none"
                          ></v-text-field
                        ></v-col>
                      </v-row>
      
                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >حجم
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;">
                        <v-col cols="12">
                          <span style="width: 100%;" 
                            v-if="Math.round(image.TPIC_FFileSize / 1000) > 1000"
                            >{{ (image.TPIC_FFileSize / 1000000 ).toFixed(2)}} MB</span
                          >
                          <span style="width: 100%;"
                            v-else
                          >{{ Math.round(image.TPIC_FFileSize/1000) }} KB</span>
                        </v-col>
                      </v-row>
      
                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >نوع
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;">
                        <v-col cols="12">
                          <span style="width: 100%;">{{ image.TPIC_FType }}</span>
                        </v-col>
                      </v-row>
      
                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >ابعاد
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;">
                        <v-col cols="6" class="d-flex flex-column">
                          <span v-if="image.TPIC_FWidth && image.TPIC_FHeight">
                            {{ image.TPIC_FWidth }} mm {{ image.TPIC_FHeight }} X mm
                          </span>
                          <v-btn depressed color="lightgrey" class="rounded-md">
                            <v-icon style="font-size: 18px;">
                              mdi-pencil-outline
                            </v-icon>
                            ویرایشگر تصویر
                          </v-btn>
                        </v-col>
                      </v-row>
      
                      <label
                        for=""
                        v-if="image.TPIC_FResolution"
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >رزولوشن
                      </label>
                      <v-row
                        style="width: 100%; margin-left: 0px;"
                        v-if="image.TPIC_FResolution"
                      >
                        <v-col cols="12">
                          <span>{{ image.TPIC_FResolution }} DPI</span>
                        </v-col>
                      </v-row>
      
                      <label
                        for=""
                        v-if="image.TPIC_FColorMode"
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >مد رنگی
                      </label>
                      <v-row
                        style="width: 100%; margin-left: 0px;"
                        v-if="image.TPIC_FColorMode"
                      >
                        <v-col cols="12">
                          <span>{{ image.TPIC_FColorMode }}</span>
                        </v-col>
                      </v-row>
      
                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >ایجاد کننده
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;">
                        <v-col cols="12">
                          <span>{{ image.TPIC_FUserRegName }}</span>
                        </v-col>
                      </v-row>
      
                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >تاریخ ایجاد
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;">
                        <v-col cols="12">
                          <span>{{ image.TPIC_FDateReg }}</span>
                        </v-col>
                      </v-row>
      
                      <label
                        for=""
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
                            image.TPIC_FUserComment
                          }}</span>
                          <v-text-field
                            v-else
                            class="mt-0 pa-1"
                            v-model="image.TPIC_FUserComment"
                            style="border: none"
                          ></v-text-field
                        ></v-col>
                      </v-row>
      
                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >لینک
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;">
                        <v-col cols="12">
                          <span style="font-size: 12px; word-wrap: break-word;">
                            <!-- {{ image.TPIC_FAddress }} -->
                            <a
                              v-if="image"
                              :href="setImageUrl(image.TPIC_FAddress)"
                              :download="image.TPIC_FName"
                              style="color: black;"
                              target="_blank"
                              >{{ image.TPIC_FAddress }}</a
                            >
                            <!-- <a
                              v-else
                              :href="image.TPIC_FAddress"
                              :download="image.TPIC_FName"
                              style="color: black;"
                              target="_blank"
                              >{{ image.TPIC_FAddress }}</a
                            > -->
                          </span>
                        </v-col>
                      </v-row>

                      <label
                        for=""
                        class="d-flex align-center"
                        style="font-weight: bold; font-size: 14px;"
                        >عملیات
                      </label>
                      <v-row style="width: 100%; margin-left: 0px;">
                        <v-col cols="12">
                          <v-btn
                            x-small
                            color="#6CFF9E"
                            class="pa-0 mx-1"
                            @click="fileDownload(image)"
                          >
                            <v-icon x-small>mdi-tray-arrow-down</v-icon>
                          </v-btn>
                          <v-btn
                            x-small
                            color="#FFBDBD"
                            @click="copyLink"
                            class="pa-0"
                          >
                            <v-icon x-small>mdi-content-copy</v-icon>
                          </v-btn>
                          <v-btn
                            x-small
                            color="yellow"
                            class="pa-0"
                            @click="$emit('moveFile')"
                          >
                            <v-icon x-small>mdi-content-cut</v-icon>
                          </v-btn>
                          <v-btn
                            x-small
                            color="red"
                            class="pa-0"
                            dark
                            @click="$emit('deleteFile')"
                          >
                            <v-icon x-small>mdi-trash-can</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card style="box-shadow: none !important;">
                  <v-card-text class="pa-0">
                    <v-col cols="12">
                      <label
                        style="font-weight: bold; font-size: 14px;"
                        >گروه های دسترسی
                      </label>
                      <v-row class="align-center my-2" style="border: 1px solid lightgray; border-radius: 8px;">
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
                          <v-icon style=" font-size: 14px;"  color="#FFBD42">mdi-eye-outline</v-icon>
                        </div>    
                        <div
                          style="background: #9CDDE3;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#158C97">mdi-pencil-outline</v-icon>
                        </div>  
                        <div
                          style="background: #FFBFBF;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#D25353">mdi-trash-can-outline</v-icon>
                        </div> 
                        <div
                          style="background: #C5FCC7;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#608E62">mdi-arrow-top-left</v-icon>
                        </div>                     
                      </v-col>
                      </v-row>
                      <v-row class="align-center my-2" style="border: 1px solid lightgray; border-radius: 8px;">
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
                          <v-icon style=" font-size: 14px;"  color="#FFBD42">mdi-eye-outline</v-icon>
                        </div>    
                        <div
                          style="background: #9CDDE3;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#158C97">mdi-pencil-outline</v-icon>
                        </div>  
                        <div
                          style="background: #FFBFBF;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#D25353">mdi-trash-can-outline</v-icon>
                        </div> 
                        <div
                          style="background: #C5FCC7;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#608E62">mdi-arrow-top-left</v-icon>
                        </div>                     
                      </v-col>
                      </v-row>
                      <v-row class="align-center my-2" style="border: 1px solid lightgray; border-radius: 8px;">
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
                          <v-icon style=" font-size: 14px;"  color="#FFBD42">mdi-eye-outline</v-icon>
                        </div>    
                        <div
                          style="background: #9CDDE3;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#158C97">mdi-pencil-outline</v-icon>
                        </div>  
                        <div
                          style="background: #FFBFBF;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#D25353">mdi-trash-can-outline</v-icon>
                        </div> 
                        <div
                          style="background: #C5FCC7;width: 16px; height: 16px; text-align: center;"
                          class="rounded-lg pa-3 d-flex justify-center align-center mr-1"
                        >
                          <v-icon style=" font-size: 14px;"  color="#608E62">mdi-arrow-top-left</v-icon>
                        </div>                     
                      </v-col>
                      </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card style="box-shadow: none !important;">
                  <v-card-text class="pa-0">
                    <v-col cols="12" class="d-flex flex-column justify-center px-4">
                        <v-row style="border: 1px solid lightgray;border-radius: 12px;" class="my-1" v-for="item, i in picUsed" :key="i">
                          <v-col cols="10" class="d-flex justify-center pa-1">
                            <a :href="item.link">                            
                              <span style="color: black">{{ item.TPU_FID_StateName }}-{{ item.TPU_FID_ParentName }}</span>
                            </a>
                          </v-col>
                          <v-col cols="2" class="d-flex pa-0">
                            <a :href="`/admin/library/adminItemUsed/${item.TPU_FID_State}:${item.TPU_FID_Parent}`" target="_blank">
                              <v-icon>mdi-security</v-icon>
                            </a>
                            <a :href="`/admin/library/userItemUsed/${item.TPU_FID_State}:${item.TPU_FID_Parent}`" target="_blank">
                              <v-icon>
                                mdi-account
                              </v-icon>
                              </a>
                          </v-col>
                        </v-row>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn
          color="#D9D9D9"
          block
          style="letter-spacing: normal;"
          @click="$emit('closeSidebar')"
          class="rounded-lg"
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
          style="letter-spacing: normal;"
          @click="submitImage"
          class="rounded-lg"
          >
          <span style="font-weight: bold;">تأیید</span>
          </v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["image", "folders", "isAdmin"],
  data() {
    return {
      editName: true,
      editAlt: true,
      editComment: true,
      treeView: false,
      folder: null,
      treeViewItems: [],
      address: "",
      tab: null,
      picUsed: [], 
      imageSrc: ''
    };
  },
  async mounted() {
    try {
      this.getUsedPlaces();
      this.treeViewItems = this.getTreeFolders();
      this.treeViewItems.push({
        name: "خانه",
        id: null
      });
    } catch (error) {
      console.log;
    }
  },
  methods: {
    async getUsedPlaces(){
      try{
        const result = await this.$authAxios.$get(`/gallery/pictureUse/${this.image.TPIC_FID}`)
        if(result){
          if(result.length){
            for(var i=0; i < result.length; i++){
              if(result[i].TPU_FID_State == 2400101){
                result[i].link = `/admin/salePageManage/contentManage/${result[i].TPU_FID_Parent}`
              } else if(result[i].TPU_FID_State == 2400102){
                // console.log('result', result[i])
              }
            }
          }
          this.picUsed = result
        }
      }catch(error){
        console.log(error)
      }
    },
    async fileDownload(image) {
      const res = await this.$authAxios.$post("/gallery/filedownload", image);

      const blob = new Blob([res], { type: "image/jpeg" });

      //Check if the browser supports the `download` attribute
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        // For Internet Explorer and Microsoft Edge
        window.navigator.msSaveBlob(blob, image.TPIC_FName);
      } else {
        // For other browsers
        const url = window.URL.createObjectURL(blob);
        // Create a temporary <a> element for the download
        const link = document.createElement("a");
        link.href = url;
        link.download = image.TPIC_FName; // Set the desired file name

        // Simulate a click event on the <a> element to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL and <a> element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }
    },
    submitImage() {
      if (this.folder) {
        this.image.destination = this.folder;
      }
      this.$emit("editSubmit", this.image);
      this.editName = true
      this.editAlt = true
      this.editComment = true
    },
    getTreeFolders(parentId) {
      const ret = [];
      const filtered = this.folders.filter(f => f.TPF_FID_Parent == parentId);
      if (filtered.length > 0) {
        filtered.forEach(f => {
          ret.push({
            id: f.TPF_FID,
            name: f.TPF_FName,
            children: this.getTreeFolders(f.TPF_FID)
          });
        });
      }
      return ret;
    },
    getFolder(value) {
      if (value[0]) {
        this.folder = this.folders.find(i => i.TPF_FID == value);
        this.treeView = false;
      } else {
        this.folder = {
          TPF_FID: null,
          TPF_FName: "خانه"
        };
        this.treeView = false;
      }
    },
    async copyLink() {
      try {
        const text = this.setImageUrl(this.image.TPIC_FAddress);
        await navigator.clipboard.writeText(text);
        alert("لینک کپی شد");
      } catch (err) {
        console.log(err);
      }
    }
  },
  watch:{
    image(newValue){
      this.getUsedPlaces()
    }
  }
};
</script>

<style lang="scss">
.group-dialog {
  .v-small-dialog__activator {
    position: absolute;
    margin-top: 60px;
    z-index: 10;
    background: white;
    border-radius: 10px;
    box-shadow: 8px 5px 14px -10px #000000;
  }
}
.sidebar-tabitems{
  overflow: visible;
}
</style>
