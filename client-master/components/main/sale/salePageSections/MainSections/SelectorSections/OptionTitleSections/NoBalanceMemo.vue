<template>
    <Transition name="slide-fade">
        <span class="option-title-lock-warn pr-xl-3 pr-lg-3 pr-md-3 pr-sm-3" v-if="noBalance()">
            <v-icon>mdi-emoticon-sad-outline</v-icon>
            <span>موجودی کافی نیست. لطفا انتخاب خود را تغییر دهید</span>
        </span>
    </Transition>
</template>                        
  
<script>
import userSaleMixin from '../../../../_mixins/userSaleMixin';

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