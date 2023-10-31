<template>
    <div class="pallete action-pallete">
    <p class=" white--text">ارسال ایمیل</p>
    <v-row class="pa-2">
      <v-col cols="8">
            <input @change="isEmailValid" class="centered-input" placeholder="ایمیل را وارد کنید"  v-model="email"/>
                <span  v-show="wrongEmail" style="color:red">ایمیل وارد شده نادرست است.</span>
        </v-col>
        <v-col cols="4">
            <button class="goods_dialog_btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default blue" @click="addmail">افزودن ایمیل</button>
        </v-col>
        
     <v-card v-if="listEmails.listEmailsAddress.length" >
        <v-list >
            <v-list-item-group  color="primary">
                <v-list-item v-for="(mail, i) in listEmails.listEmailsAddress" :key="i">
                    
                    <v-list-item-content v-if="editmailindex === i">
                        <input  class="centered-input" placeholder="ایمیل را وارد کنید" v-on:keyup.enter="editmailchange(i)"  v-model="listEmails.listEmailsAddress[i]"/>
                        <span  v-show="wrongEmailedit" style="color:red">ایمیل وارد شده نادرست است.</span> 
                    </v-list-item-content>
                    <v-list-item-content v-else>
                        <v-list-item-title v-text="mail"></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon @click="editEmail(i)">
                        <v-icon color="green" >mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon @click="deleteEmail(i)">
                        <v-icon color="pink" >mdi-delete-forever</v-icon>
                    </v-list-item-icon>

                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
   
  	<div class="txt-area">
        <label class="lbl">متن پیام ارسالی</label>
         <div class="form-group form__group field form_control_textInput">
            <div class="errorStyleTextarea"></div> <!---->
             <textarea rows="5" id="" maxlength="200" placeholder="" class="form-control form__field" v-model="listEmails.listEmailsMessage">
            </textarea> 
            <label for="" class="form__label"></label>
        </div>
    </div>

    <v-col cols="6">
            <button class="goods_dialog_btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default green" >ارسال</button>
        </v-col>

        <v-col cols="6">
            <button class="goods_dialog_btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default pink reset-button" >بازنشانی</button>
        </v-col>
   
    </v-row>
  </div>
</template>
<script>
import pressEnter from './componentsSections/enterPhoneNumber.vue';
import PressEnterList from './numbersList.vue';

const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
  components: { pressEnter, PressEnterList },
  props:["listEmails"],
  data() {
    return {
      
      email: '',
      editmailindex: '',
      wrongEmail: false,
      wrongEmailedit: false,
    }
  },
   methods: {
    
    addmail: function () {
        if(!this.wrongEmail){
            this.listEmails.listEmailsAddress.push(this.email);
            this.email = '';
            console.log(this.editmailindex);
        }
    },
    deleteEmail(index){
            if (index > -1) {
                this.listEmails.listEmailsAddress.splice(index,1);
                
            }
    },
    editEmail(index){
        if (index > -1) {
                // this.mails.splice(index,1);
                this.editmailindex = index;
                console.log(this.editmailindex);
            }
    },
    editmailchange(index){
        if (emailRe.test(this.listEmails.listEmailsAddress[index])) {
            this.wrongEmailedit = false;
        } else {
            this.wrongEmailedit = true;
        }
        if(!this.wrongEmailedit){
            if (index > -1) {
                this.listEmails.listEmailsAddress[index] = this.listEmails.listEmailsAddress[index];
                this.editmailindex = '';
            }
        }
    },
    isEmailValid() {
      if (emailRe.test(this.email)) {
        this.wrongEmail = false;
      } else {
        this.wrongEmail = true;
      }
    },
    isEmailValidedit(index) {
      if (emailRe.test(this.listEmails.listEmailsAddress[index])) {
        this.wrongEmailedit = false;
      } else {
        this.wrongEmailedit = true;
      }
    }
    
  }
    
}
</script>

<style scoped>
    .action-pallete , .v-sheet ,.txt-area{
        width: 100%;
    }
    .v-sheet{
        border-radius: 10px!important;
    }
    .lbl{
        color: #fff;
    }
    .reset-button{
        float: left;
    }
</style>