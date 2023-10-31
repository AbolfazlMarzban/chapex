<template>
   <div class="right-content mb-3">
            <v-container class="my-final-price">
                <v-row>
                    <v-col cols="12" class="py-0">
                        <span style="color: red;" v-if="coupon.length > 0">کد تخفیف معتبر نیست!</span>
                    </v-col>
                    <v-col cols="10">
                        <ui-input placeholder="کد تخفیف را وارد کرده و تایید کنید" class="offcodeinput" v-model="coupon"></ui-input>
                    </v-col>
                    <v-col cols="2" class="pr-0">
                        <v-btn rounded color="#016670" depressed dark small>
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<script>
export default {
data(){
    return{
        coupon: ''
    }
}
}
</script>

<style lang="scss">
.offcodeinput{
    input::placeholder{
        font-weight: normal;
    }
}
</style>