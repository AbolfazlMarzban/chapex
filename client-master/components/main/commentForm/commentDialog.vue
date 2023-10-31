<template lang="">
<v-dialog  persistent v-model="dialog" width="500">

    <v-card class="submitComment">

        <v-card-title class="headline grey lighten-2 ">

            <div style="min-width:100%;">
                <v-row>
                    <v-col cols="6">
                        <div class="user-opinion"> 
                            نظرات
                        </div>
                    </v-col>
                    <v-col cols="6" class="text-left">            
                        <div class="user-opinion float-left">
                            <div class="btn-close" text
                                @click="closeDialog "> 
                                <v-icon>mdi-close-thick</v-icon>
                            </div>
                        </div>
                    </v-col>
                </v-row>

            </div>




        </v-card-title>

        <v-card-text><br />

            <div class="user-opinion">
                <span class="sp-title fns-14">تاریخ ثبت : </span>
                <span class="sp-text ublack fns-14">12:30 1396/12/26</span>
                <br />
                <span class="sp-title fns-14">کاربر ثبت : </span>
                <span class="sp-title ublack fns-14"> {{dataDialog.TGC_FUserReg}}</span>
                <br />
                <span class="sp-title fns-14">صفحه محصول : </span>
                <span class="sp-title ublack fns-14"> صفحه فروش ساک دستی
                    (لینک
                    صفحه)</span>


                <br /><br />
                <hr />
                <v-row class="mt-2">
        <v-col class="col-sm-12 col-md-12 col-lg-3 col-xl-3 col-12">
          <label class="fns-14">کیفیت محصول</label>
        </v-col>  
        <v-col class="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-12">
          <v-rating v-model="rating1" class="submitComment_rating"   length="3" readonly
>
            <template v-slot:item="props">
              <div
                :class="
                  props.isFilled
                    ? 'submitComment_rating_shape submitComment_rating_active submitComment_rating_dialog'
                    : 'submitComment_rating_shape submitComment_rating_inactive submitComment_rating_dialog'
                "
                large
                @click="props.click"
              ></div>
            </template>
          </v-rating>
        </v-col>
        <v-col class="col-sm-12 col-md-12 col-lg-2 col-xl-2 col-12">
          <label class="fns-14">خوب</label>
        </v-col>
      </v-row>
       <v-row class="mt-2">
        <v-col class="col-sm-12 col-md-12 col-lg-3 col-xl-3 col-12">
          <label class="fns-14">ارزش خرید </label>
        </v-col>
        <v-col class="col-sm-12 col-md-12 col-lg-7 col-xl-7 col-12">
          <v-rating v-model="rating2" class="submitComment_rating"   length="3" readonly
>
            <template v-slot:item="props">
  <div
    :class="
      props.isFilled
        ? 'submitComment_rating_shape submitComment_rating_active submitComment_rating_dialog'
        : 'submitComment_rating_shape submitComment_rating_inactive submitComment_rating_dialog'
    "
    large
    @click="props.click"
  ></div>
</template>
          </v-rating>
        </v-col>
        <v-col class="col-sm-12 col-md-12 col-lg-2 col-xl-2 col-12">
          <label class="fns-14">ضعیف</label>
        </v-col>
      </v-row>
      <br />
      <v-row>
        <v-col cols="12">
          <span class="fns-14">پیشنهاد خرید : </span>
          <span class="ublack fns-14">{{dataDialog.TGC_FSuggested}}</span>
        </v-col>
      </v-row>
<hr />
      <span class="sp-title ublack fns-14 ">متن نظر شماره {{dataDialog.TGC_FROWNUM}} </span>
      <p class="ublack fns-14">{{dataDialog.TGC_FComment}}   </p>

 <div class="submitComment_icon_plus_dialog">
      <v-icon>mdi-plus-circle</v-icon>
      <span class="fns-14">نقاط قوت</span>
      <br/>
        {{dataDialog.TGC_FAdvantages}}
      <!-- <span class="ublack fns-14">صحافی خوب</span>
            <br/>

      <span class="ublack fns-14">تحویل به موقع</span> -->
</div>
      <div class="submitComment_icon_minus_dialog">
      <v-icon>mdi-minus-circle</v-icon>
      <span class="fns-14">نقاط ضعف</span>
            <br/>
          {{dataDialog.TGC_FDisadvantages}}
      <!-- <span class="ublack fns-14">تحویل به موقع</span>
            <br/>

      <span class="ublack fns-14">تحویل به موقع</span>
            <br/>

            <span class="ublack fns-14">صحافی خوب</span> -->

      
      </div>

                <br /> <br />

                <v-row>
                    <v-col cols="6" v-if="dataDialog.TGC_FID_Status != 26002">
                        <div class="btn-order" @click="doChangeState(26002)">تایید نشر</div>
                    </v-col>
                    <v-col cols="3" v-if="dataDialog.TGC_FID_Status != 26003" >
                        <div class="btn-order"  @click="doChangeState(26003)">بایگانی</div>
                    </v-col>
                     <v-col cols="3" v-if="dataDialog.TGC_FID_Status == 26002" >
                        <div class="btn-order p-2" @click="doChangeState(26001)">لغو انتشار</div>
                    </v-col>
                     <v-col cols="3" v-if="dataDialog.TGC_FID_Status == 26003" >
                        <div @click="doChangeState(26001)" class="btn-order p-2">لغو بایگانی</div>
                    </v-col>
                    

                    <v-col cols="3" >
                        <div class="btn-common" @click="doChangeState(26004)">حذف</div>
                    </v-col>  
                </v-row>



            </div>


        </v-card-text>


        <v-card-actions class="d-none">
            <v-spacer></v-spacer>
            <div class="user-opinion">
                <div class="btn-close" text @click="closeDialog">
                    <v-icon>mdi-close-thick</v-icon>
                </div>
            </div>
        </v-card-actions>
    </v-card>
 </v-dialog>
</template>
<script>
import "../../../assets/style/dialog/dialog.scss";
import commentMixins from './_mixins/commentMixins';

export default {
    props :  ["dataDialog"],
      mixins : [commentMixins] , 
    data() {
        return {
            dialog : true,
            rating1:2,
            rating2:3
        }
    },

    methods: {
      closeDialog(){
          this.$emit("closeDialog")
      } , 
      async doChangeState(id){
          // this.changeState(26001 , 26002 , 26003);
           this.dataDialog.TGC_FID_Status = id
           const result = await this.submitChangeState(
              this.dataDialog
          )
          if (result) {
              console.log("ghabl")
            this.$emit("updateTable");
                          console.log("bad")

          }
          this.closeDialog()
      } , 
      
    },
};
</script>

<style lang="css">
/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 15px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #656565;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #656565;
}
</style>
<style lang="scss" src="../../../assets/style/commentForm/CommentForm.scss">
