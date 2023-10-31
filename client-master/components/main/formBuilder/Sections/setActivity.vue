<template>
  <div>
    <v-row>
        <v-col cols="3">
            <label for="">امکان ارسال فرم</label>
            <v-checkbox
                label="فعال"
                v-model="activeFormSend"
                @change="$emit('setFormActivity', activeFormSend)"
            ></v-checkbox>
        </v-col>
        <v-col cols="3">
            <label for="">امکان ارسال ایمیل</label>
            <v-checkbox
                label="فعال"
                v-model="activeEmail"
                @change="$emit('setEmailActivity', activeEmail)"
            ></v-checkbox>
        </v-col>
        <v-col cols="3">
            <label for="">امکان ارسال پیامک</label>
            <v-checkbox
                label="فعال"
                v-model="activeSMS"
                @change="$emit('setSMSActivity', activeSMS)"
            ></v-checkbox>
        </v-col>
        <v-col cols="3">
            <label for="">امکان ارسال پیامک تایید</label>
            <v-checkbox
                label="فعال"
                v-model="activeConfirmSMS"
                @change="$emit('setConfirmSMSActivity', activeConfirmSMS)"
            ></v-checkbox>
        </v-col>
        <v-col cols="10" v-if="activeFormSend">
            <label for="">متن کنار دکمه ی ارسال</label>
            <ui-input
                v-model="sendFormTExt"
                @change="$emit('setFormText', sendFormTExt)"
            ></ui-input>
        </v-col>
        <v-col cols="2"  v-if="activeFormSend">
            <label for="">امضاء</label>
            <v-checkbox
                label="فعال"
                v-model="signature"
                @change="$emit('setSignature', signature)"
            ></v-checkbox>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    props: ["data"],
data(){
    return{
        activeEmail: true,
        activeSMS: true,
        activeConfirmSMS: true,
        activeFormSend: true,
        sendFormTExt: '',
        signature: false
    }
},
mounted(){
    if(this.data.TF_FActive == 0){
        this.activeFormSend = false
    } else {
        this.activeFormSend = true
    }
    if(this.data.TF_FCenter == 0){
        this.signature = false
    } else {
        this.signature = true
    }
}
}
</script>

<style>

</style>