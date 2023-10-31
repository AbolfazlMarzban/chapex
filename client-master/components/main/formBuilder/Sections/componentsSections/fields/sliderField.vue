<template>
  <div>
    <label for="" v-if="isadmin">اسلایدر</label>
    <v-carousel hide-delimiters show-arrows-on-hover cycle continuous :interval="10000" :style="`border-radius: ${element.TFF_FPlaceHolder}px; height: ${element.TFF_FToolTip}px`">
        <template v-for="pic,i in element.items">
            <v-carousel-item  v-if="pic.TFF_FDelete == 0"  class="page-builder-slider justify-center align-center text-center category-slider" :style="`min-height: ${element.TFF_FToolTip}px !important`" :key="i">
            <img  :src="pic.img.TPIC_FAddress" :alt="pic.imgAlt" style="border-radius: 20px;">
            <!-- <img  :src="setImageUrl(pic.img.TPIC_FAddress)" :alt="pic.imgAlt" style="border-radius: 20px;"> -->

        </v-carousel-item>
        </template>
    </v-carousel>
  </div>
</template>

<script>
export default {
props:[ "element", "readonly", "isadmin" ]
}
</script>

<style lang="scss">
.page-builder-slider{
    .v-image{ 
        height: inherit !important;
        width: 100%;
    }
}
</style>