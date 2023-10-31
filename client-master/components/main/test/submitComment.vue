<template>
  <v-row>
    <v-col cols="4">
      <v-dialog v-model="dialogConpopup1" width="830" content-class="">
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on" class="">ثبت نظر جدید</span>
        </template>

        <v-card class="submitComment_dialog">
          <v-card-title>
            <div style="min-width: 100%">
              <v-row class="submitComment_title">
                <v-col cols="6">
                  <div class="popup-title">ثبت نظر</div>
                </v-col>
                <v-col cols="6" class="text-left">
                  <div class="user-opinion float-left">
                    <div class="" text @click="dialogConpopup1 = false">
                      <v-icon>mdi-close-thick</v-icon>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card-title>

          <v-card-text>
            <v-row class=" mt-2">
              <v-col cols="2">
                <label>کیفیت محصول</label>
              </v-col>
              <v-col cols="7">
                <v-rating v-model="rating" class="submitComment_rating">
                  <template v-slot:item="props">
                    <div
                      :class="
                        props.isFilled
                          ? 'submitComment_rating_shape submitComment_rating_active'
                          : 'submitComment_rating_shape submitComment_rating_inactive'
                      "
                      large
                      @click="props.click"
                    ></div>
                  </template>
                </v-rating>
              </v-col>
              <v-col cols="3">
                <label>از 62 نظر ثبت شده</label>
              </v-col>
            </v-row>
            <v-row class="mt-2">
              <v-col cols="2">
                <label> ارزش خرید</label>
              </v-col>
              <v-col cols="7">
                <v-rating v-model="rating2" class="submitComment_rating">
                  <template v-slot:item="props">
                    <div
                      :class="
                        props.isFilled
                          ? 'submitComment_rating_shape submitComment_rating_active'
                          : 'submitComment_rating_shape submitComment_rating_inactive'
                      "
                      large
                      @click="props.click"
                    ></div>
                  </template>
                </v-rating>
              </v-col>
              <v-col cols="3">
                <label>از 62 نظر ثبت شده</label>
              </v-col>
            </v-row>
            <hr />
            <v-row>
              <v-col cols="8" class="">
                <label> آیا این محصول را به دوستان خود پیشنهاد می دهید؟</label>
              </v-col>
              <v-col cols="4">
                <v-radio-group v-model="row" row>
                  <v-radio label="بله" class="submitComment_radio_button" active-class="submitComment_radio_active">
                  </v-radio>
                  <v-radio label="خیر" class="submitComment_radio_button" active-class="submitComment_radio_active">
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <hr class="mt-2" />

            <v-row>
              <v-col cols="12" class="mt-4">
                <ui-textarea lable="متن نظر" row="5" :readonly="readonly" />
              </v-col>
            </v-row>
            <div class="submitComment_text mt-5">
              <v-row class="submitComment_icon_plus">
                <v-col cols="12">
                  <v-icon>mdi-plus-circle </v-icon>
                  <label>نقاط قوت</label>
                  <ui-input
                    type="text"
                    class="form_control_textInput"
                    label=""
                    placeholder=" "
                    :readonly="readonly"
                    v-model="plus"
                   @keyup="plusArray"
                  />
                    <ul v-if="plusComment.length > 0">
                        <li v-for="item in plusComment" :key="item">{{ item }}</li>
                    </ul>               
                  </v-col>
              </v-row>
              <v-row class="submitComment_icon_minus">
                <v-col cols="12">
                  <v-icon>mdi-minus-circle</v-icon>
                  <label>نقاط ضعف</label>
                  <ui-input
                    type="text"
                    class="form_control_textInput"
                    label=""
                    placeholder=" "
                    :readonly="readonly"
                    v-model="negative"
                    @keyup="negativeArray"
                  />
                  <ul v-if="negativeComment.length > 0">
                    <li v-for="item in negativeComment" :key="item">{{ item }}</li>
                  </ul> 
                </v-col>
              </v-row>
            </div>
            <div class="submitComment_btn mt-5">
              <v-row>
                  <v-col cols="6">
                    <v-checkbox
                      label="ارسال نظر به صورت ناشناس"
                      :value="1"
                      :disabled="readonly"
                    ></v-checkbox>
                  </v-col>
                    <v-spacer />
        <v-col cols="6">
          <ui-button
            class="product_form_final-btn btn-order"
            label="ثبت نظر "
          />
        </v-col>
              </v-row>
            </div>
           </v-card-text>

          <v-card-actions class="d-none">
            <div class="user-opinion">
              <div class="btn-close" text @click="dialogConpopup1 = false">
                <v-icon>mdi-close-thick</v-icon>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      rating: 2,
      rating2: 2,
      dialogConpopup1: false,
      readonly: false,
      plusComment:[],
      negativeComment:[],
      plus:"",
      negative:""
    };
  },
  methods: {
    
    plusArray(e){
      this.plusComment.push(this.plus)
      this.plus="";
    },
    negativeArray(e){
      this.negativeComment.push(this.negative)
      this.negative="";
    }
  }
};
</script>

<style lang="scss" src="../../../assets/style/commentForm/CommentForm.scss">
