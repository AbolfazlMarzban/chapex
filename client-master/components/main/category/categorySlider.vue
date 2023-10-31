<template>
  <div>
    <v-carousel hide-delimiters show-arrows-on-hover cycle continuous :interval="10000">
        <v-carousel-item v-for="pic in gallery" :key="pic.TPIC_FID" class="justify-center align-center text-center category-slider">
            <img :src="setImageUrl(pic.TPIC_FAddress)" :alt="pic.TPIC_FName" style="border-radius: 20px;">
        </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
props: [ "gallery" ]
}
</script>

<style lang="scss">
.category-slider{
  .v-image{
    background-size: contain;
  }
}
</style>