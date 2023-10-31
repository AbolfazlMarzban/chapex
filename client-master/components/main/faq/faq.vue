<template>
    <!-- start utab-Qanswer -->
    <div class="utab-opinion">
      <v-row>
        <div class="usubject-block">
          <v-row>
            <v-col cols="12" xl="9" lg="9" md="12" sm="12" xs="12">
              <v-row>
                <v-icon style="color: #016670" class="mt-3"
                  >mdi-plus-circle
                </v-icon>

                <v-dialog v-model="dialogQues" width="700">
                  <template v-slot:activator="{ on, attrs }">
                    <span 
                    @click="openDialogQuestion"
                      v-bind="attrs"
                      v-on="on"
                      class="fn-fat gr-color fns-18 mr-2 mt-4"
                      >ثبت پرسش جدید</span
                    >
                  </template>

                  <v-card>
                    <v-card-title class="bgcolor-mid-silver">
                      <div style="min-width: 100%">
                        <v-row>
                          <v-col cols="6">
                            <div class="popup-title">ثبت پرسش</div>
                          </v-col>
                          <v-col cols="6" class="text-left">
                            <div class="user-opinion float-left">
                              <div class="" text @click="dialogQues = false">
                                <v-icon>mdi-close-thick</v-icon>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-title>

                    <v-card-text
                      ><br />

                      <div class="con-telegram">
                        <div class="">
                          <v-row>
                            <v-col
                              cols="12"
                              xl="12"
                              lg="12"
                              md="12"
                              sm="12"
                              xs="12"
                            >
                              <label>
                                پرسش خود را در مورد این محصول مطرح کنید</label
                              >
                              <textarea v-model="formSchema.TGQ_FQuestion" class="form-control" cols="4" rows="4">

                              </textarea>
                            </v-col>
                          </v-row>
                        </div>

                        <v-row>
                          <v-col
                            cols="12"
                            xl="6"
                            lg="6"
                            md="12"
                            sm="12"
                            xs="12"
                          >
                          </v-col>
                          <v-col
                            cols="12"
                            xl="6"
                            lg="6"
                            md="12"
                            sm="12"
                            xs="12"
                          >
                            <div @click="registerFaq" class="btn-order">
                              <router-link

                                to=""
                                tag="span"
                                exact
                                :style="{ cursor: 'pointer' }"
                              >
                                ثبت پرسش
                              </router-link>
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-text>


                    <v-card-actions class="d-none">
                      <v-spacer></v-spacer>
                      <div class="user-opinion">
                        <div class="btn-close" text @click="dialogQues = false">
                          <v-icon>mdi-close-thick</v-icon>
                        </div>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                &nbsp;
              </v-row>
            </v-col>
            <v-col
              cols="12"
              xl="3"
              lg="3"
              md="12"
              sm="12"
              xs="12"
              class="text-left"
            >
              <v-icon>mdi-view-headline</v-icon>

              <span class="ublack">مرتب سازی دیدگاهها :</span>
              <span class="ublack mr-2"> جدیدترین نظرات</span>
              <span class="ublack mr-2">مفیدترین نظرات</span>
            </v-col>
          </v-row>
        </div>
      </v-row>

      <hr />
      <br />

      <div class="box-border">
        <v-row
          class="pt-5 border-row-btm lst-child"
          v-for="(faq, index) in questionsToShow"
          :key="index"
        >
          <v-col cols="12" xl="9" lg="9" md="12" sm="12" xs="12">
            <v-icon class="gr-color">mdi-progress-question</v-icon>
            <span class="lbl-bold mr-2">{{ faq.TGQ_FQuestion }}</span>
            <br />
            <span class="gr-color">پاسخ</span>
            <span v-for="(answer , ansIndex) in answerToShow" :key="ansIndex" class="mr-7 bl-color">
              <span v-if="answer.TGQ_FID_Question == faq.TGQ_FID && ansIndex==0">
                {{answer.TGQ_FQuestion}}
              </span>
            </span>
            <br />
            <span class="fns-14">  این پاسخ را داده است</span>
            <span class="buyer mr-3 fns-14">خریدار</span>
          </v-col>
          <v-col cols="12" xl="3" lg="3" md="12" sm="12" xs="12">
            <div class="new-answer">
              <v-icon class="gr-color">mdi-plus-circle</v-icon>

              <v-dialog :retain-focus="false" v-model="dialogAnswerrr" width="700">
                <template v-slot:activator="{ on, attrs }">
                  <span
                  @click="openDialogAnswer(faq.TGQ_FID)"
                    v-bind="attrs"
                    v-on="on"
                    class="fn-bold gr-color fns-16 mr-2 mt-4"
                    >ثبت پاسخ جدید</span
                  >
                </template>

                <v-card>
                  <v-card-title class="bgcolor-mid-silver">
                    <div style="min-width: 100%">
                      <v-row>
                        <v-col cols="6">
                          <div class="popup-title">ثبت پاسخ</div>
                        </v-col>
                        <v-col cols="6" class="text-left">
                          <div class="user-opinion float-left">
                            <div class="" text @click="dialogAnswerrr = false">
                              <v-icon>mdi-close-thick</v-icon>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-title>

                  <v-card-text
                    ><br />

                    <div class="con-telegram">
                      <div class="">
                        <v-row>
                          <v-col
                            cols="12"
                            xl="12"
                            lg="12"
                            md="12"
                            sm="12"
                            xs="12"
                          >
                            <label> به این پرسش پاسخ دهید</label>
                            <textarea v-model="formSchema.TGQ_FQuestion" class="form-control" cols="4" rows="4">
                            </textarea>
                          </v-col>
                        </v-row>
                      </div>

                      <v-row>
                        <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                        </v-col>
                        <v-col cols="12" xl="6" lg="6" md="12" sm="12" xs="12">
                          <div @click="submitNewAnswer" class="btn-order">
                            <router-link
                              to=""
                              tag="span"
                              exact
                              :style="{ cursor: 'pointer' }"
                            >
                              ثبت پاسخ
                            </router-link>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions class="d-none">
                    <v-spacer></v-spacer>
                    <div class="user-opinion">
                      <div
                        class="btn-close"
                        text
                        @click="dialogAnswerrr = false"
                      >
                        <v-icon>mdi-close-thick</v-icon>
                      </div>
                    </div>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <br />
            <div class="text-center">
              <span>آیا این پاسخ برایتان مفید بود؟ </span>


              <span>{{faq.TGQ_FSumLike}}</span>
              <v-icon v-if="!isLike" @click="like(faq)" class="mr-1">mdi-thumb-up-outline</v-icon>
              <v-icon v-if="isLike" @click="like(faq)" class="mr-1">mdi-thumb-up</v-icon>
            </div>
          </v-col>

          <v-col  cols="12" @click="faq.show = !faq.show" class="fns-16 gr-color see-more-comment">
            مشاهده پاسخ های بیشتر
            <v-icon class="fns-14 gr-color mr-2">mdi-arrow-down</v-icon>
          </v-col>

          <div v-show="faq.show" v-for="(secAnswer, secIndex) in answerToShow" :key="secIndex" class="faq_secAnswer_div">
          <v-row class="pt-3" v-if="secIndex != 0 && secAnswer.TGQ_FID_Question == faq.TGQ_FID">
            <v-col
              cols="12"
              xl="9"
              lg="9"
              md="12"
              sm="12"
              xs="12"
              class="mt-1"
            >
              <span class="gr-color">پاسخ</span>
              <span class="mr-7 bl-color">{{secAnswer.TGQ_FQuestion}}</span>
              <br />
              <span class="fns-14"> این پاسخ را داده است</span>
              <span class="buyer mr-3 fns-14">خریدار</span>
            </v-col>
            <v-col
              cols="12"
              xl="3"
              lg="3"
              md="12"
              sm="12"
              xs="12"
            >
              <div class="text-center pb-5">
                <span>آیا این پاسخ برایتان مفید بود؟ </span>
                <span>{{secAnswer.TGQ_FSumLike}}</span>
                <v-icon @click="like(secAnswer.TGQ_FID)" class="mr-1">mdi-thumb-up-outline</v-icon>
              </div>
            </v-col>
          </v-row></div>
        </v-row>
      </div>

      <br />

      <v-row>
        <div class="pagination">
          <ul>
            <li>
              <v-icon class="fns-14">mdi-arrow-left</v-icon>
            </li>
            <li>1</li>
            <li class="active">2</li>
            <li class="ml-3">3</li>
            <li>4</li>
            <li>5</li>
            <li class="fns-8">
              <v-icon class="fns-14">mdi-arrow-right</v-icon>
            </li>
          </ul>
        </div>
      </v-row>
      <br />
    </div>
    <!-- end utab-Qanswer -->
</template>
<script>
    import "../../../assets/style/faq/faqStyles.scss";
    import faqMixin from  "./_mixins/faqMixins"
    import variables from "./_mixins/variablesFaq"
export default {
  props : ['salePageID'],
  mixins : [faqMixin , variables] ,

  data() {
    return {
      dialogQues: false ,
      dialogAnswerrr : false,
      questionIdForAnswers : '',
        formSchema : {},
        data :{},
       questionsToShow : [],
       answerToShow :[],
       allLikesData :{} , 
       userIdForLikes : '' , 
       likedId : '' , 
       isLike : ''
   
    };
  },

  methods: {

           selectQuestionToShow(){
            if (this.data.length) {
          for (const question of this.data) {
              if (question.TGQ_FID_Question == 0) {
                  this.questionsToShow.push(question);
            }else {
              this.answerToShow.push(question);
            }
          }
        }
        
        },
    
        async getFaqData(statusID , id){
          const result = await this.getTable(statusID , id);
          this.data = result.table;
          this.selectQuestionToShow();

        },

      async faqRegister(data , salePageID){
        try{
          data.TGQ_FID_Goods = salePageID;
          data.TGQ_FID_Status = 26001;
          data.TGQ_FID_Question = 0;
          let response = await this.$authAxios.$post("/faq/question" , {
            data:data
          }) 

        }catch(error){
          console.log(error)
        }
      },

          async newAnswerRegister(data , salePageID){
        try{
          data.TGQ_FID_Goods = salePageID;
          data.TGQ_FID_Status = 26001;
          let response = await this.$authAxios.$post("/faq/answer" , {
            data:data
          }) 
        }catch(error){
          console.log(error)
        }
      }, 

      async getFormSchema(status='question' , id=0){
        try{
          
          let response = await this.$authAxios.$get("/faq/getSchema") 
          this.formSchema = response.data.form;

          if (status == "answer") {
              this.formSchema.TGQ_FID_Question = id
          }

        }catch(error){
          console.log(error);
        }
      },
      openDialogQuestion(){
        this.getFormSchema()
     
      },
      openDialogAnswer(id){
        this.getFormSchema("answer" , id);
        
      },
      registerFaq(){
      this.faqRegister(this.formSchema , this.salePageID)
      } , 
      submitNewAnswer(){
        this.newAnswerRegister(this.formSchema , this.salePageID);
      },

       async like(rowID){

          if (!this.isLike) {
             this.likeData.TUL_FID_Item = rowID.TGQ_FID;
            this.likeData.TUL_FType = 3;
            await this.doLike(this.likeData);
          
              rowID.TGQ_FSumLike = rowID.TGQ_FSumLike+1
              this.isLike = true
          
              console.log(this.isLike);
          } else {
            await this.disLike(this.likedId);
              
                 rowID.TGQ_FSumLike = rowID.TGQ_FSumLike-1 
                 this.isLike = false
                console.log(this.isLike);

          }   
           
        } 
  },
  computed : {
       isLike(){
         if (this.allLikesData.length) {
             for (const item of this.allLikesData) {
              if (item.TUL_FUserReg == this.userIdForLikes) {
                  this.likedId = item.TUL_FID
                  return true
              }
          }
          return false
              
         }
      
      }
  },
   async mounted() {
    this.getFaqData(26002 ,this.salePageID);
    const result = await this.sendRowTypeToGetLikes(3);
    this.allLikesData = result.data.likesData;
    console.log(this.allLikesData , "this is in client");
    this.userIdForLikes = this.$store.getters["login/getUserData"]()['TU_FID'];
    
  },  
};
</script>
