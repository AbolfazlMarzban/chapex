<template>
  <div>
    <v-row>
      <v-col cols="12 pr-0">
        <div class="hooper_slider_main pl-lg-15">
          <hooper ref="currentSlide" @slide="onSilde" :itemsToShow="1" :centerMode="true" :trimWhiteSpace="true"
            class="hooper-top-slider" group="group1" :wheelControl="false" :transition="300">
            <slide class="slider d-flex justify-center" v-for="(pic, index) in salePageStatus.gallery" :key="index">
              <img @mouseenter="stopAutoPlay()" :src="setImageUrl(pic.path)" :alt="pic.alt" />
            </slide>
          </hooper>

          <hooper ref="navigation" group="group1" class="hooper-below-slider mt-lg-5 justify-center" :itemsToShow="3"
            :centerMode="true" :wheelControl="false">
            <slide class="sub_slider" v-for="(pic, index) in salePageStatus.gallery" :key="index">
              <img @click="slideTo(index)" @mouseenter="stopAutoPlay()" :src="setImageUrl(pic.thumbnail_path)"
                :alt="pic.alt" style="cursor: pointer" />
            </slide>
          </hooper>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { Hooper, Slide } from "hooper";
import "../../../../../assets/style/salePageSlider/sliderCustomizing.scss";

export default {
  inject: ["salePageStatus"],

  name: "App",
  components: {
    Hooper,
    Slide
  },
  data() {
    return {
      autoPlay: true,
      playSpeed: 4000
    };
  },

  mounted() {
    this.startAutoPlay()
  },

  methods: {
    slideTo(index) {
      this.$refs.currentSlide.slideTo(index);
    },

    stopAutoPlay() {
      this.autoPlay = false;
    },

    startAutoPlay() {
      const autoplayTimer = setInterval(() => {
        if (this.autoPlay) {
          if (this.$refs.currentSlide)
            this.$refs.currentSlide.slideNext();
        }
        else {
          // clearInterval(autoplayTimer)
        }
      }, this.playSpeed);
    },

    onSilde(value) {
      if (this.salePageStatus.gallery) {
        // console.log('currentSlide:', value.currentSlide, 'pics:', this.pics.length - 1);
        if (value.currentSlide == this.salePageStatus.gallery.length - 1) {

          this.autoPlay = false;
          setTimeout(() => {
            this.slideTo(0);
            this.autoPlay = true;
          }, this.playSpeed);
        }
      }
    }
  },

  watch: {
    "salePageStatus.gallery"(newValue) {
      var index = newValue.findIndex(p => p.optionPic)
      if (index > -1) {
        this.autoPlay = false;
        this.slideTo(0);
      }
    }
  }
};
</script>
<style lang="css">
.slider .is-active img {
  transition: 10s;
}
</style>
