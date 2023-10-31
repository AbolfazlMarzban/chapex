<template>
    <div class="pallete action-pallete">
    <p class=" white--text">ارسال پیامک</p>
    <v-row class="pa-2">
      <v-col cols="8">
            <input type="number" class="centered-input" placeholder="شماره را وارد کنید"  v-model="phone"/>
        </v-col>
        <v-col cols="4">
            <button class="goods_dialog_btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default blue" @click="addnum">افزودن شماره</button>
        </v-col>
      
     <v-card  v-if="listSmsNumbers.listSmsNumbersPhones.length">
        <v-list >
            <v-list-item-group  color="primary">
                <v-list-item v-for="(num, i) in listSmsNumbers.listSmsNumbersPhones" :key="i">
                    
                    <v-list-item-content v-if="editphoneindex === i">
                        <input type="number" class="centered-input" placeholder="شماره را وارد کنید" v-on:keyup.enter="editphonechange(i)"  v-model="listSmsNumbers.listSmsNumbersPhones[i]"/>
                    </v-list-item-content>
                    <v-list-item-content v-else>
                        <v-list-item-title v-text="num"></v-list-item-title>
                    </v-list-item-content>
                     <v-list-item-icon @click="editphone(i)">
                        <v-icon color="green" >mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-icon @click="deleteItem(i)">
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
             <textarea rows="5" id="" maxlength="200" placeholder="" class="form-control form__field" v-model="listSmsNumbers.listSmsNumbersMessage">
            </textarea> 
            <label for="" class="form__label"></label>
        </div>
    </div>

    <v-col cols="6">
            <button  class="goods_dialog_btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default green" >ارسال</button>
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

export default {
  components: { pressEnter, PressEnterList },
  props: ["listSmsNumbers"],
  data() {
    return {
      
      phone: '',
      editphoneindex: '',
    }
  },
   methods: {
    
    addnum: function () {

      this.listSmsNumbers.listSmsNumbersPhones.push(this.phone);
      this.phone = '';
      console.log(this.listSmsNumbers.listSmsNumbersPhones);
    },
    deleteItem(index){
            if (index > -1) {
                this.listSmsNumbers.listSmsNumbersPhones.splice(index,1);
                console.log('delete');
            }
    },
    editphone(index){
        if (index > -1) {
                // this.mails.splice(index,1);
                this.editphoneindex = index;
            }
    },
    editphonechange(index){
        if (index > -1) {
                this.listSmsNumbers.listSmsNumbersPhones[index] = this.listSmsNumbers.listSmsNumbersPhones[index];
                this.editphoneindex = '';
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