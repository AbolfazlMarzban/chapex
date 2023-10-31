<template lang="">
<v-dialog persistent v-model="dialog" width="500">

    <v-card>

        <v-card-title class="headline grey lighten-2">

            <div style="min-width:100%;">
                <v-row>
                    <v-col cols="6">
                        <div class="user-opinion">
                            پرسش و پاسخ
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
                <span class="sp-title">تاریخ ثبت : </span>
                <span class="sp-text ublack">12:30 1396/12/26</span>
                <br />
                <span class="sp-title">کاربر ثبت : </span>
                <span class="sp-title ublack"> {{dataDialog.TGQ_FUserRegName}}</span>
                <br />
                <span class="sp-title">صفحه محصول : </span>
                <span class="sp-title ublack"> صفحه فروش ساک دستی
                    (لینک
                    صفحه)</span>


                <br /><br />
                <hr />

                <span class="sp-title ublack"> پرسش شماره 2
                </span>

                <p class="ublack">
                    {{dataDialog.TGQ_FQuestion}}
                </p>

                <br /><br />
                <hr />

                <span class="sp-title ublack"> پرسش شماره 14
                </span>

                <p class="ublack">
                 {{dataDialog.TGQ_FQuestion}}
                </p>

                <br /><br />
                <hr />

                <span>پاسخ نظر</span><br />
                <textarea cols="4" rows="5">

                </textarea>




                <br /> <br />

                <v-row>
                    <v-col cols="6" v-if="dataDialog.TGQ_FID_Status != 26002">
                        <div class="btn-order" @click="doChangeState(26002)">تایید نشر</div>
                    </v-col>
                    <v-col cols="3" v-if="dataDialog.TGQ_FID_Status != 26003" >
                        <div class="btn-order" @click="doChangeState(26003)">بایگانی</div>
                    </v-col>

                       <v-col cols="3" v-if="dataDialog.TGQ_FID_Status == 26002" >
                        <div @click="doChangeState(26001)" class="btn-order p-2">لغو انتشار</div>
                    </v-col>

                    <v-col cols="3" v-if="dataDialog.TGQ_FID_Status == 26003" >
                        <div @click="doChangeState(26001)" class="btn-order p-2">لغو بایگانی</div>
                    </v-col>


                    <v-col cols="3" >
                        <div class="btn-common">حذف</div>
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
import faqMixins from './_mixins/faqMixins';
export default {
    props :  ["dataDialog"],
    mixins : [faqMixins] , 
    data() {
        return {
            dialog : true
        }
    },
    
    methods: {
      closeDialog(){
          this.$emit("closeDialog")
      } , 
      async doChangeState(id){
        //   this.changeState(26001 , 26002 , 26003);
           this.dataDialog.TGQ_FID_Status = id
           const result = await this.submitChangeState(
              this.dataDialog
          )
          if (result) {
            //   console.log("the data.Dialog sent to backend")
            this.$emit("updateTable");
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
