<template>
  <v-container>
    <v-row>
      <AddImage v-if="showUploadDialog" :readonly="false" @cancel="showUploadDialog = false" @submit="addImage"
        :state="state">
      </AddImage>
      <v-col>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <!-- <v-col cols="2" class="text-right my-3">
                <v-btn v-if="!readonly" @click="showUploadDialog = true" dark color="teal">
                    <v-icon>mdi-upload</v-icon>
                    <span>آپلود</span>
                </v-btn>
            </v-col> -->
      <library-dialog 
        @export="value => setImages(value)"
        :multiple="true"
        :selected="selected"
        :isAdmin="true"
      />

      <v-col cols="4" class="text-right my-3" v-if="pictures.length == 0">
        <span v-if="state == 'pageSale'">تصاویر صفحه فروش محصول را آپلود نمایید</span>
        <span v-if="state == 'optionImage'">تصاویر خصوصیت صفحه فروش را آپلود نمایید</span>
        <span v-if="state == 'product'">تصاویر محصول را آپلود نمایید</span>
        <span v-if="state == 'salePageCategory'">تصاویر صفحه ی دسته بندی را آپلود کنید</span>
      </v-col>
    </v-row>

    <v-row v-if="pictures.length > 0" class="">
      <DeleteImage v-if="showDeleteDialog" :item="itemForDelete" @hiddenDialog="showDeleteDialog = false"
        @deleteItemFromTable="del">
      </DeleteImage>

      <!-- <AddImage
        v-if="showEditDialog"
        :readonly="true"
        :value="itemForEdit"
        @cancel="showEditDialog = false"
        @submit="showEditDialog = false"
        :state="state"
      >
      </AddImage> -->

      <draggable class="dragArea list-group" ghost-class="ghost" group="pictures" :list="pictures" @change="orderChanged">
        <v-col v-for="(image, i) in pictures" cols="2" class=" list-group-item" :key="i">
          <v-badge bordered color="green" icon="mdi-star" overlap :value="image.TPIC_FID == indexImage">
            <v-card class="preview pa-5" @mouseenter="showHover = image.path" @mouseleave="showHover = null">
              <Transition name="slide-fade">
                <div v-if="image.TPIC_FDelete == 1" class="deletedHover">
                  <v-row style="padding-top:40%">
                    <v-col cols="12" class="text-center">
                      <DeleteImageButton :item="image" @doDelete="doDelete" @doRecover="recover">
                      </DeleteImageButton>
                    </v-col>
                  </v-row>
                </div>

                <div v-else-if="showHover == image.path && !readonly" class="hoverMenu">
                  <v-row>
                    <v-col cols="4" class="text-center">
                      <DeleteImageButton :item="image" @doDelete="doDelete" @doRecover="recover">
                      </DeleteImageButton>
                    </v-col>

                    <!-- <v-col cols="4" class="text-center">
                      <v-btn icon large class="ma-2" @click="doEdit(image)">
                        <v-icon color="blue">mdi-pencil</v-icon>
                      </v-btn>
                    </v-col> -->

                    <v-col cols="4" class="text-center">
                      <v-btn icon v-if="image.TPIC_FID == indexImage" large class="ma-2">
                        <v-icon color="green">mdi-star</v-icon>
                      </v-btn>

                      <v-btn icon v-else large class="ma-2" :disabled="image.isNew"
                        @click="$emit('setIndexImage', image.TPIC_FID)">
                        <v-icon color="green">mdi-star-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </Transition>

              <v-img v-if="image.fileType == 'image'" :lazy-src="setImageUrl(image.thumbnail_path)"
                :src="setImageUrl(image.path)" max-height="160" max-width="160">

              </v-img>

              <div v-else> {{ image.fileType }}</div>
            </v-card>
          </v-badge>
        </v-col>
      </draggable>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import AddImage from "./Gallery/AddImage.vue";
import DeleteImage from "./Gallery/DeleteImage.vue";
import DeleteImageButton from "./Gallery/DeleteImageButton.vue";

export default {
  components: { AddImage, DeleteImage, DeleteImageButton, draggable },

  props: ["state", "FID_Parent", "gallery", "indexImage", "readonly"],

  data() {
    return {
      showUploadDialog: false,
      showDeleteDialog: false,
      showEditDialog: false,
      showHover: null,
      itemForDelete: null,
      itemForEdit: null,
      pictures: [],
      indexFID: this.indexImage,
      selected: []
    };
  },
  mounted() {

    this.$vuetify.rtl = true;

    this.pictures = this.gallery.filter(
      p => p.TPU_FID_State == this.state && p.TPIC_FID_Parent == this.FID_Parent
    );
    console.log('pictures', this.pictures)
    if (this.pictures.length > 0) {
      for (var i = 0; i < this.pictures.length; i++) {

        let fileType = 'image'
        if (this.pictures[i].path.toLowerCase().endsWith('.psd') || (this.pictures[i].TPU_FShowName && this.pictures[i].TPU_FShowName.toLowerCase().endsWith('.psd')))
          fileType = 'psd'

        if (this.pictures[i].path.toLowerCase().endsWith('.pdf') || (this.pictures[i].TPU_FShowName && this.pictures[i].TPU_FShowName.toLowerCase().endsWith('.pdf')))
          fileType = 'pdf'

        if (this.pictures[i].path.toLowerCase().endsWith('.zip') || (this.pictures[i].TPU_FShowName && this.pictures[i].TPU_FShowName.toLowerCase().endsWith('.zip')))
          fileType = 'zip'

        if (this.pictures[i].path.toLowerCase().endsWith('.rar') || (this.pictures[i].TPU_FShowName && this.pictures[i].TPU_FShowName.toLowerCase().endsWith('.rar')))
          fileType = 'rar'

        if (this.pictures[i].path.toLowerCase().endsWith('.cdr') || (this.pictures[i].TPU_FShowName && this.pictures[i].TPU_FShowName.toLowerCase().endsWith('.cdr')))
          fileType = 'cdr'

        if (this.pictures[i].path.toLowerCase().endsWith('.ai') || (this.pictures[i].TPU_FShowName && this.pictures[i].TPU_FShowName.toLowerCase().endsWith('.ai')))
          fileType = 'ai'

        this.pictures[i].fileType = fileType

        this.selected.push({
          img: this.pictures[i]
        });
      }
    }
    // console.log("selected", this.selected);
    // console.log('gallery', this.gallery)
  },
  // computed:{
  //     pictures(){
  //         if(this.gallery.length > 0){
  //             return this.gallery.filter(p => p.TPIC_FForm == this.state && p.TPIC_FID_Parent == this.FID_Parent)
  //         } else {
  //             return []
  //         }
  //     }
  // },
  methods: {
    setImages(images) {
      for (var i = 0; i < images.length; i++) {
        var img = {
          TPIC_FID: images[i].TPIC_FID,
          TPIC_FName: images[i].TPIC_FName,
          alt: images[i].TPIC_FCommnet,
          path: images[i].TPIC_FAddress,
          thumbnail_path: images[i].thumbnail,
          TPIC_FDelete: 0,
          TPU_FID_State: this.state,
          TPU_FID_Parent: this.FID_Parent,
          isnew: true
        };
        if (this.gallery.findIndex(item => item.TPIC_FID == images[i].TPIC_FID) == -1) {
          this.gallery.push(img);
          this.pictures.push(img);
          this.selected.push(img);
        }
      }
      // console.log('gallery', this.gallery)
    },
    addImage(img) {
      img.isNew = true;
      img.TPIC_FForm = this.state;
      img.TPIC_FID_Parent = this.FID_Parent;

      this.gallery.push(img);
      this.pictures.push(img);
      this.showUploadDialog = false;
    },
    doDelete(item) {
      this.itemForDelete = item;
      this.showDeleteDialog = true;
    },
    del() {
      this.showDeleteDialog = false;
      this.itemForDelete.TPIC_FDelete = 1;
    },
    recover(item) {
      this.itemForDelete = item;
      this.itemForDelete.TPIC_FDelete = 0;
    },
    doEdit(item) {
      this.itemForEdit = item;
      this.showEditDialog = true;
    },
    orderChanged() {
      this.set_FOrders();
    },
    set_FOrders() {
      if (this.pictures && this.pictures.length > 0) {
        for (var i = 0; i <= this.pictures.length - 1; i++) {
          this.pictures[i].TPIC_FOrder = this.pictures.length - 1 - i;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.preview {
  text-align: center;
  width: 200px;
  height: 200px;
  line-height: 40px;
  position: relative;
}

.hoverMenu {
  background-color: white;
  /* border: 3px solid #73AD21; */
  opacity: 0.9;
  position: absolute;
  width: 100%;
  height: 70px;
  line-height: 40px;
  top: 80px;
  left: 0;
  z-index: 9999;
}

.deletedHover {
  background-color: white;
  /* border: 3px solid #73AD21; */
  opacity: 0.7;
  position: absolute;
  width: 90%;
  height: 90%;
  line-height: 40px;
  top: 0;
  left: 0;
  z-index: 9999;
}

.dragArea {
  direction: ltr;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  // align-items: flex-end;
}

.ghost {
  width: 100px;
  height: 200px;
  position: relative;
  border: 2px dashed #adadad;
  border-radius: 5px;
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
