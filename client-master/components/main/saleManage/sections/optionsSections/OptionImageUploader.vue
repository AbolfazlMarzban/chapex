<template>
    <div v-if="item.TD_FDelete == 0" class="uploader" @mouseenter="showHover = true" @mouseleave="showHover = null">

        <SalePageGalleryAddImage v-if="showUploadDialog" :readonly="false" :value="item.picture"
            @cancel="showUploadDialog = false" @submit="addImage" state="optionImage">
        </SalePageGalleryAddImage>

        <SalePageGalleryDelete v-if="showDeleteDialog" :item="item.picture" @hiddenDialog="showDeleteDialog = false"
            @deleteItemFromTable="del">
        </SalePageGalleryDelete>

        <template v-if="item.picture">
            <div>
                <v-img :lazy-src="setImageUrl(item.picture.thumbnail_path)" :src="setImageUrl(item.picture.path)"
                    max-height="120" max-width="120">
                </v-img>
            </div>

            <Transition name="slide-fade">
                <div v-if="item.picture.TPIC_FDelete == 1" class="deletedHover">
                    <v-row style="padding-top:40%">
                        <v-col cols="12" class="text-center">
                            <span class="font-italic">حذف شده</span>
                            <!-- <v-btn @click="recover" icon color="indigo accent-3">
                                <v-icon>mdi-arrow-u-left-top-bold</v-icon>
                            </v-btn> -->
                        </v-col>
                    </v-row>
                </div>

                <div v-else-if="showHover && !readonly" class="hoverMenu">
                    <v-row>
                        <v-col cols="6" class="text-left">
                            <v-btn icon class="" @click="showUploadDialog = true">
                                <v-icon color="blue">mdi-pencil</v-icon>
                            </v-btn>
                        </v-col>

                        <v-col cols="6" class="text-right">
                            <v-btn icon class="" @click="showDeleteDialog = true">
                                <v-icon color="pink">mdi-delete-forever</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </Transition>
        </template>

        <v-btn v-else-if="!readonly" icon color="brown darken-4" @click="showUploadDialog = true">
            <v-icon size="36">mdi-camera</v-icon>
        </v-btn>

        <v-icon v-else size="36">mdi-image-off-outline</v-icon>

    </div>
</template>

<script>
import SalePageGalleryAddImage from '../../dialog/SalePageGalleryAddImage.vue';
import SalePageGalleryDelete from '../../dialog/SalePageGalleryDelete.vue';


export default {
    props: ["salePage", "item", "readonly"],
    data() {
        return {
            showUploadDialog: false,
            showDeleteDialog: false,
            showEditDialog: false,
            showHover: null,
            itemForDelete: null,
            itemForEdit: null
        }; 
    },
    mounted(){
        // console.log('item', this.item)
    },
    methods: {
        addImage(img) {
            this.item.picture = img
            this.showUploadDialog = false

            img.isNew = true
            img.TPIC_FForm = 'optionImage'
            img.TPIC_FID_Parent = this.item.TD_FID

            this.salePage.gallery.push(img)
        },

        async del() {
            this.item.picture.TPIC_FDelete = 1;
            this.showDeleteDialog = false;

            this.item.picture = null

            const picture = this.salePage.gallery.find(p => p.TPIC_FID_Parent == this.item.TD_FID && p.TPIC_FForm == 'optionImage')
            if (picture)
                picture.TPIC_FDelete = 1

        },
        recover() {
            // this.item.picture.TPIC_FDelete = 0;
        }
    },
    components: { SalePageGalleryAddImage, SalePageGalleryDelete }
}
</script>

<style scoped>
.uploader {
    border: 2px dashed #adadad;
    padding: 30px;
    border-radius: 15px;
    margin: 5px;

    /* cursor: pointer !important; */
    text-align: center;
    width: 100%;

    position: relative;
}

.hoverMenu {
    background-color: white;
    /* border: 3px solid #73AD21; */
    opacity: 0.95;
    position: absolute;
    width: 100%;
    height: 70px;
    line-height: 40px;
    top: 60px;
    left: 0;
    z-index: 9999;
}

.deletedHover {
    border-radius: 15px;

    margin: 10px;
    background-color: white;
    /* border: 3px solid #73AD21; */
    opacity: 0.9;
    position: absolute;
    width: 90%;
    height: 90%;
    line-height: 40px;
    top: 0;
    left: 0;
    z-index: 9999;
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