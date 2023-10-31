<template>
  <div>
    <v-col cols="12" class="px-0 mt-4">
      <v-sheet class="mx-auto comment-slider" max-width="850px">
        <v-slide-group
          v-model="model"
          show-arrows
          active-class="active"
          style="direction: ltr"
        >
          <v-slide-item
            v-for="comment in comments"
            :key="comment.id"
            style="direction: rtl"
          >
            <v-row class="card ma-1">
              <v-col cols="5" class="pa-0">
                <v-avatar>
                  <img :src="comment.pic" alt="" />
                </v-avatar>
              </v-col>
              <v-col cols="7" class="pa-0 mt-5">
                <div class="card-txt d-flex flex-column">
                  <label>{{ comment.user }}</label>
                  <span>{{ comment.intro }}</span>
                </div>
              </v-col>
              <v-col cols="12" class="d-flex flex-column justify-end">
                <div>
                  <p>
                    {{ comment.comment }}
                  </p>
                  <v-spacer></v-spacer>
                  <v-rating
                    readonly
                    :value="comment.rate"
                    color="#03D589"
                    background-color="#8C8C8C"
                    size="20"
                  ></v-rating>
                </div>
              </v-col>
            </v-row>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-col>
  </div>
</template>

<script>
import comment from "../comments.json"
export default {
data(){
    return{
        comments: comment,
        model: null
    }
}
}
</script>

<style lang="scss">
@charset "UTF-8";
.comment-slider {
  background: none !important;
  box-shadow: none !important;
  .v-slide-group__content {
    white-space: normal;
    .card {
      background: none;
      border: 3px solid #ffffff;
      box-shadow: 5px 5px 5px rgb(1 102 112 / 5%) !important;
      border-radius: 20px;
      width: 240px;
      p {
        font-size: 14px;
        margin: 0px;
        text-align: start;
        padding: 0px 10px 10px 10px;
        font-family: bakhtiari !important;
      }
      .v-rating {
        background: white;
        border-radius: 20px;
      }
      .v-avatar {
        width: 50px !important;
        height: 50px !important;
        min-width: 50px !important;
        margin: 0px;
        margin-top: 15px;
        margin-left: 5px;
        img {
          width: 80px;
          height: 80px;
        }
      }
      .card-txt {
        text-align: initial;
        padding: 0px;
        label {
          font-family: boldbakhtiari !important;
          color: #016670;
          font-size: 16px;
        }
        span {
          color: #8c8c8c;
          font-family: boldbakhtiari !important;
          font-size: 14px;
          padding-left: 15px;
        }
      }
    }
  }
}
@media (max-width: 1264px) and (min-width: 960px) {
  .comment-slider {
    max-width: 850px !important;
  }
}
@media (max-width: 960px) and (min-width: 600px) {
  .comment-slider {
    max-width: 563px !important;
  }
}
@media (max-width: 600px) {
  .comment-slider {
    max-width: 356px !important;
  }
}
</style>