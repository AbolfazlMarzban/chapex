<template>
    <v-row class="pa-1 ma-1">
        <v-col cols="12" class="pa-0">
            <p class="mb-0">شما می‌توانید  وجه مورد نظر را از طریق شماره حساب های زیر   پرداخت نمایید. خواهشمند است پس از انتقال وجه، تصویر  فیش پرداختی را در 
        بخش پروفایل آپلود نمایید.
            </p>
            <span class="fns-14" style="cursor: pointer; color: #016670;">ارسال پیامک اطلاعات حساب</span>
        </v-col>
        <v-col cols="12" xl="4" lg="4" md="4" class="text-right d-flex flex-column bankaccinfo mx-2" v-for="card,i in cardInfo" :key="i">
            <p>{{ card }}</p>
        </v-col>
    </v-row>
</template>

<script> 
import paymentMixin from "../../_mixins/paymentMixins";
import paymentVariables from "../../_mixins/paymentVariables";
export default {
    mixins: [paymentMixin, paymentVariables],
    props:["factor", "totalPrice"],
    data() {
        return {
            payGuide: false,
            pMethod: null,
            cardInfo: null
        }
    },
    mounted(){
         this.pMethod = this.$store.getters["cart/getPaymentData"];
        this.getCardInfo()
    },
    methods:{
       async getCardInfo(){
            if(this.pMethod.factorLegalOrPerson == 1 && this.pMethod.paymentMethod == 2){
            const result = await this.$authAxios.$get("/defaults/get/30202?mode=tablechildren")
            this.cardInfo = result.data.table[0].children.map(c => c.TD_FComment)
             } else if(this.pMethod.factorLegalOrPerson == 0 && this.pMethod.paymentMethod == 2){
            const result = await this.$authAxios.$get("/defaults/get/30302?mode=tablechildren")
            console.log(result)
            const cardInfoo = result.data.table[0].children
            const cards = cardInfoo.filter(item => {
                var x = false
                if(this.totalPrice >= item.TD_FValue1 && this.totalPrice <= item.TD_FValue2){
                    x = true
                }  
                return x
            })
            if(cards.length > 0){
                this.cardInfo = cards.map(item =>{
                    return item.TD_FComment
                })
                    }
             }
            this.$emit('bankAccount', this.cardInfo)
            //  console.log('card Info', this.cardInfo)
        }
    },
    watch:{
        factor(){
            this.pMethod = this.$store.getters["cart/getPaymentData"];
            this.getCardInfo()
        }   
    }
}
</script>
<style lang="scss">
.bankaccinfo{
    background: #f2f2f2;
    padding: 20px;
    border-radius: 20px;
    span{
        color: black;
    }
}
</style>