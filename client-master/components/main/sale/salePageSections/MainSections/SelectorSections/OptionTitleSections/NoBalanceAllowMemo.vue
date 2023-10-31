<template>
    <Transition name="slide-fade">
        <span class="option-title-lock-warn pr-xl-3 pr-lg-3 pr-md-3 pr-sm-3" v-if="noBalance()">
            <v-icon>mdi-face-agent</v-icon>
            <span>موجودی کافی نیست. همکاران ما در مورد زمان تکمیل موجودی با شما تماس خواهند گرفت</span>
        </span>
    </Transition>
</template>                        
  
<script>

export default {
    methods: {
        noBalance() {
            return false
        },
    },
}
</script>
  
<style scoped>
.optionName {
    font-family: boldbakhtiari !important;
}
</style>