<template>
  <v-row>
    <v-col cols="12">
      <v-carousel hide-delimiters show-arrows-on-hover cycle continuous :interval="10000" class="home-slider">
        <v-carousel-item v-for="slide in slides" :key="slide.id">
          <v-row>
            <v-col cols="11" md="11" lg="11" class="homeSlider-txt">
              <v-row class="justify-center">
                <v-col cols="12" lg="6" md="6" class="d-flex align-center">
                  <div class="
                            d-flex
                            flex-column
                            pr-xl-15 pr-lg-15 pr-md-15 pr-sm-15
                            textbox
                            text-end
                          ">
                    <label>{{ slide.Label }}</label>
                    <span>{{ slide.Text }}</span>
                  </div>
                </v-col>
                <v-col cols="10" lg="6" md="6" sm="4">
                  <img :src="slide.Pic" :alt="slide.alt" width="100%" />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4" class="homeslider-img d-xl-block x-lg-block d-md-block d-none">
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
import slidess from "../slidess.json"
export default {
  data() {
    return {
      slides: slidess
    }
  }
}
</script>

<style lang="scss">
.textbox {
  text-align: initial !important;
}

.homeslider-img {
  margin-right: -315px;
  background: linear-gradient(-60deg,
      #f2f2f2 12.5%,
      rgba(242, 242, 242, 0) 64.6%);
  background-color: white;
  border-radius: 50px;
  margin-top: 30px;
  margin-bottom: 50px;
}

.homeSlider-txt {
  background: linear-gradient(30deg,
      #f2f2f2 12.5%,
      rgba(242, 242, 242, 0) 64.6%);
  background-color: white;
  border-radius: 50px;
  z-index: 1;
  margin-top: 70px;
  margin-right: 15px;

  .row {
    margin-top: -85px;

    img {
      animation: fade-in-left 1.5s ease-in-out both;
    }

    label {
      font-family: boldbakhtiari !important;
      color: #016670;
      font-size: 24px;
      animation: fade-in-bottom 0.8s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }

    span {
      font-family: bakhtiari !important;
      color: black;
      font-size: 14px;
      text-align: initial;
      animation: fade-in-bottom 1.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }
  }
}

@keyframes fade-in-left {
  0% {
    -webkit-transform: translateX(-50px);
    transform: translateX(-50px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 1264px) and (min-width: 960px) {
  .homeslider-img {
    margin-right: -245px !important;
  }
}

@media (max-width: 960px) and (min-width: 600px) {
  .homeslider-img {
    margin-right: -240px !important;
  }

  .comment-slider {
    max-width: 700px !important;

    .v-slide-group__content {
      .card {
        width: 180px !important;
      }
    }
  }

  .homeSlider-txt {
    .row {
      margin-top: -5px !important;
    }
  }
}

@media (max-width: 600px) {
  .homeSlider-txt {
    margin-top: 20px;
    border-radius: 25px !important;
    .row {
      margin-top: 0px !important;

      .textbox {
        padding: 10px !important;
      }
    }
  }
}
</style>