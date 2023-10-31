<template>
  <!-- start utab-Qanswer -->
  <div class="utab-opinion submitComment">
    <v-row class="commentbox">
      <v-col class="col-12 pt-0">
        <v-icon class="commentForm-plus-icon">mdi-plus </v-icon>

        <!-- body of the pop-up, must be a independent component -->

        <v-dialog v-model="dialogComment" width="500" content-class="">
          <template v-slot:activator="{ on, attrs }">
            <span
              v-bind="attrs"
              v-on="on"
              class="newcomment"
              @click="openDialogComment"
              >ثبت دیدگاه جدید</span
            >
          </template>

          <v-card class="pa-5 px-11">
            <v-card-title class="pb-0 px-0">
              <div style="min-width: 100%">
                <v-row class="submitComment_title">
                  <v-col cols="6">
                    <div class="popup-title">ثبت دیدگاه جدید</div>
                  </v-col>
                  <v-col cols="6" class="text-left">
                    <div class="user-opinion float-left">
                      <div
                        style="cursor: pointer"
                        text
                        @click="dialogComment = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="px-0">
              <v-row>
                <v-col cols="12">
                  <div class="mt-6">
                    <label class="rate-label">کیفیت محصول</label>
                  </div>
                  <v-slider
                    style="background: none; box-shadow: none"
                    class="prodvalue"
                    v-model="rating"
                    step="1"
                    :max="5"
                    ticks
                  ></v-slider>
                </v-col>
                <v-col cols="12">
                  <div>
                    <label class="rate-label">ارزش خرید نسبت یه قیمت</label>
                  </div>
                  <v-slider
                    style="background: none; box-shadow: none"
                    class="prodvalue"
                    v-model="ratingTwo"
                    step="1"
                    :max="5"
                    ticks
                  ></v-slider>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col class="col-12 mt-5">
                  <div>
                    <label class="rate-label">
                      خرید این محصول را به دیگران ...</label
                    >
                  </div>
                  <v-radio-group
                    v-model="formSchema.TGC_FSuggested"
                    class="prod-suggest"
                    style="background: none !important; box-shadow: none"
                  >
                    <div class="radiobox-green">
                      <v-icon color="#03D589">mdi-thumb-up-outline</v-icon>
                      <v-radio color="#03D589" label="پیشنهاد می کنم" value="1">
                      </v-radio>
                    </div>

                    <div class="radiobox-grey">
                      <v-icon>mdi-chat-question-outline</v-icon>
                      <v-radio label="مطمئن نیستم" value="null"></v-radio>
                    </div>

                    <div class="radiobox-red">
                      <v-icon color="#E9083E">mdi-thumb-down-outline</v-icon>
                      <v-radio label="پیشنهاد نمی کنم" value="0"></v-radio>
                    </div>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" class="mt-4">
                  <label class="rate-label"> دیدگاه خود را شرح دهید</label>
                  <v-textarea
                    v-model="formSchema.TGC_FComment"
                    placeholder="برای ما بنویسید ..."
                    class="commentbox"
                    style="background: none !important; box-shadow: none"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <label class="rate-label">نکات مثبت</label>
                  <v-text-field
                    dense
                    filled
                    rounded
                    placeholder="برای ما بنویسید ..."
                    style="background: none; box-shadow: none"
                    class="plusbox"
                    append-icon="mdi-plus"
                    @click:append="addplusComment"
                    v-model="plus"
                  ></v-text-field>
                  <ul v-if="plusComment.length > 0" class="mb-5">
                    <li
                      v-for="(item, index) in plusComment"
                      :key="item"
                      class="plus-list"
                    >
                      <v-icon @click="deletePlusComment(index)"
                        >mdi-close</v-icon
                      >
                      {{ item }}
                    </li>
                  </ul>
                </v-col>
                <v-col cols="12" class="pt-0 pb-0">
                  <label class="rate-label">نکات منفی</label>
                  <v-text-field
                    dense
                    filled
                    rounded
                    placeholder="برای ما بنویسید..."
                    style="background: none; box-shadow: none"
                    class="negativebox"
                    append-icon="mdi-plus"
                    @click:append="addNegativeComment"
                    v-model="negative"
                  ></v-text-field>
                  <ul v-if="negativeComment.length > 0" class="mb-5">
                    <li
                      v-for="(item, index) in negativeComment"
                      :key="item"
                      class="negative-list"
                    >
                      <v-icon @click="deleteNegativeComment(index)"
                        >mdi-close</v-icon
                      >
                      {{ item }}
                    </li>
                  </ul>
                </v-col>
              </v-row>
              <div class="submitComment_btn">
                <v-row>
                  <v-col class="col col-12 pt-0 pb-0">
                    <v-checkbox
                      label="ارسال دیدگاه به صورت ناشناس"
                      :value="1"
                      class="unknowncheck mt-0"
                      :disabled="readonly"
                      color="#016670"
                      style="background: none; box-shadow: none"
                      v-model="formSchema.TGC_FIsUnknown"
                    ></v-checkbox>
                  </v-col>
                  <v-col class="col col-12 pt-0">
                    <ui-button
                      @click="registerComment"
                      class="btn-register"
                      label="ثبت دیدگاه "
                    />
                    <div style="text-align: center">
                      <span class="comment-laws"
                        >ثبت دیدگاه به معنی موافقت با قوانین انتشار چاپکس
                        است.</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>

            <v-card-actions class="d-none">
              <div class="user-opinion">
                <div class="btn-close" text @click="dialogComment = false">
                  <v-icon>mdi-close-thick</v-icon>
                </div>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <!-- end of the pop-up component -->

      <v-col class="col-12">
        <v-row class="align-center">
          <v-col cols="4" class="comment-value">
            <div class="box">
              <v-row class="pa-0">
                <v-col cols="6" class="pa-0">
                  <label>کیفیت محصول</label>
                </v-col>
                <v-col cols="6" class="pa-0" style="text-align: left">
                  <v-rating
                    background-color="#8C8C8C lighten-3"
                    color="#03D589"
                    medium
                    readonly
                    size="20"
                  ></v-rating>
                </v-col>
              </v-row>
              <v-row class="pa-0">
                <v-col cols="6" class="pa-0">
                  <label>ارزش خرید نسبت به قیمت</label>
                </v-col>
                <v-col cols="6" class="pa-0" style="text-align: left">
                  <v-rating
                    background-color="#8C8C8C lighten-3"
                    color="#03D589"
                    medium
                    readonly
                    size="20"
                  ></v-rating>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="4" class="comment-percent">
            <div class="box">
              <v-row class="pa-0 align-center">
                <v-col cols="5" class="pa-0 text-center">
                  <span class="percent-number"> % {{ percent }} </span>
                </v-col>
                <v-col cols="7" class="pa-0">
                  <span class="percent-text">درصد پیشنهاد خرید مشتریان</span>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="4" class="comment-score">
            <div class="box">
              <v-row class="pa-0 align-center" style="width: 100%">
                <v-col cols="5" class="pa-0" style="text-align: center">
                  <span class="percent-number"> 4.6 </span>
                </v-col>
                <v-col cols="7" class="pa-0">
                  <v-rating
                    background-color="#8C8C8C lighten-3"
                    color="#03D589"
                    medium
                    readonly
                    size="20"
                    style="margin-bottom: -15px"
                  ></v-rating>
                  <span class="percent-text"
                    >از {{ data.length }} نظر ثبت شده</span
                  >
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="utab-opinion submitComment mt-3 px-0">
      <div class="mt-1 d-flex justify-center flex-wrap">
        <div
          class="pt-5 lst-child box-border my-2"
          v-for="comment in data"
          :key="comment.TGC_FID"
        >
          <template v-if="salePageID == comment.TGC_FID_Goods">
            <v-row class="comment-body">
              <v-col cols="8" class="comment-reg pb-0">
                <span class="ml-4">{{ comment.TGC_FDateReg }}</span>
                <span class="ml-4">{{ comment.TGC_FTimeReg }}</span>
                <span class="ml-4">{{ comment.TGC_FUserRegName }}</span>
              </v-col>
              <v-col cols="4" class="d-flex justify-end">
                <div class="comment-helpful">
                  <i
                    aria-hidden="true"
                    class="
                      v-icon
                      notranslate
                      mr-1
                      mdi mdi-thumb-up-outline
                      theme--light
                    "
                  ></i>
                  <span>آیا این پاسخ برایتان مفید بود؟ </span>
                </div>
              </v-col>
            </v-row>
            <v-row class="pb-6" style="margin-top: -25px">
              <v-col cols="6" class="pt-0">
                <p class="pb-0 mb-0">{{ comment.TGC_FComment }}</p>
                <v-divider
                  class="mt-0"
                  style="
                    border: none;
                    padding: 0.5px;
                    background-color: rgba(140, 140, 140, 0.5);
                  "
                ></v-divider>
                <div
                  class="neg-pos"
                  v-for="(item, index) in comment.plusCommentArray"
                  :key="index"
                >
                  <v-icon color="#03D589">mdi-check</v-icon>
                  <span>{{ item }}</span>
                </div>
                <div
                  class="neg-pos"
                  v-for="(item, index) in comment.negativeCommentArray"
                  :key="index"
                >
                  <v-icon color="#E9083E">mdi-minus </v-icon>
                  <span>{{ item }}</span>
                </div>
              </v-col>
              <v-col
                cols="6"
                class="d-flex justify-end pt-0"
                style="flex-wrap: wrap"
              >
                <div>
                  <span>
                    <label
                      v-if="comment.TGC_FSuggested == '1'"
                      class="comment_order_true"
                    >
                      خرید این محصول را پیشنهاد می دهم
                    </label>
                    <label
                      v-if="comment.TGC_FSuggested == '0'"
                      class="comment_order_false"
                    >
                      خرید این محصول را پیشنهاد نمی دهم
                    </label>
                  </span>
                </div>
                <div style="width: 76%">
                  <div class="comment-body-box mt-0 pt-2">
                    <v-row class="pa-0 ma-0" style="width: 100%">
                      <v-col cols="6" class="pa-0">
                        <label>کیفیت محصول</label>
                      </v-col>
                      <v-col cols="6" class="pa-0" style="text-align: left">
                        <v-rating
                          background-color="#8C8C8C lighten-3"
                          color="#03D589"
                          medium
                          readonly
                          size="20"
                        ></v-rating>
                      </v-col>
                    </v-row>
                    <v-row class="pa-0" style="width: 100%">
                      <v-col cols="6" class="pa-0 ma-0">
                        <label>ارزش خرید نسبت به قیمت</label>
                      </v-col>
                      <v-col cols="6" class="pa-0" style="text-align: left">
                        <v-rating
                          background-color="#8C8C8C lighten-3"
                          color="#03D589"
                          medium
                          readonly
                          size="20"
                        ></v-rating>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../../assets/style/faq/faqStyles.scss";
import variablesComment from "./_mixins/variablesComment";
import commentMixin from "./_mixins/commentMixins";


export default {
  mixins: [variablesComment, commentMixin],
  props: ["salePageID"],

  data() {
    return {
      dialogComment: false,
      percent:0,
      rating: null,
      ratingTwo: null
      // data:[]
    };
  },
  methods: {
    deletePlusComment(item) {
      this.plusComment.splice(item, 1);
    },
    deleteNegativeComment(item) {
      this.negativeComment.splice(item, 1);
    },
    addplusComment() {
      this.plusComment.push(this.plus);
      this.formSchema.TGC_FAdvantages = this.plusComment.toString();
      this.plus = "";
      
    },
    addNegativeComment() {
      this.negativeComment.push(this.negative);
      this.formSchema.TGC_FDisadvantages = this.negativeComment.toString()
      this.negative = "";
    },
    async getFormSchema() {
      try {
        let response = await this.$authAxios.$get("/comment/getSchema");
        console.log("schema", response);
        this.formSchema = response.data.form;  
      } catch (error) {
        console.log(error);
      }
    },
    async commentRegister(data, salePageID) {
      try {
        data.TGC_FID_Status = 26001;
        data.TGC_FID_Goods = salePageID;
        const response = await this.$authAxios.$post("/comment", { data:data });
        // this.plusComment = this.comment.plusCommentArray
        // this.negativeComment = this.comment.negativeCommentArray
        console.log("response" + response)
      } catch (error) {
        console.log(error);
      }

    },
      negativeCommentSpliter() {
      this.data.forEach((item) => {
        item.negativeCommentArray = item.TGC_FDisadvantages.split(",");
        this.reRender = true;
      });
    },

    plusCommentSpliter() {
      this.data.forEach((item) => {
        item.plusCommentArray = item.TGC_FAdvantages.split(",");
        this.reRender = true;
      });
      // console.log("plus" + this.plusCommentArray)
    },
    commentEqauls(){
        // console.log("plusCommentArray" + this.plusCommentArray)
        // console.log("negativeCommentArray" + this.negativeCommentArray)   
    },
    openDialogComment() {
      this.dialogComment = true;
      this.getFormSchema();
    },

    registerComment() {
      this.commentRegister(this.formSchema, this.salePageID);
      this.dialogComment = false
    },

    async getCommentData(statusID, id) {
      const result = await this.getTable(statusID, id);   
      // console.log("comment result", result)
      this.data = result.table;
    },

    countingSuggestedItemByBuyer(){
      let result = this.data.filter(item => item.TGC_FSuggested ==1);
      this.percent=Math.round((result.length*100)/this.data.length);

    }
  },

  async mounted() {
    await this.getCommentData(26002, this.salePageID);
    await this.negativeCommentSpliter();
    await this.plusCommentSpliter();
    await this.countingSuggestedItemByBuyer();
    await this.commentEqauls();
  },
};
</script>

<style lang="scss" src="../../../assets/style/commentForm/CommentForm.scss">
