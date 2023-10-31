<template>
    <div>
        <a v-if="element.TFF_FToolTip.length > 0" :href="element.TFF_FToolTip" :target="target">
            <img :src="showImage(element)" :alt="getAlt(element)" style="width: 100%;" :style="`border-radius: ${element.TFF_FPlaceHolder}px`">
        </a>
        <img v-else :src="showImage(element)" :alt="getAlt(element)" style="width: 100%;" :style="`border-radius: ${element.TFF_FPlaceHolder}px`">

    </div>
</template>

<script>
export default {
    props: ["element", "readonly"],
    data() {
        return {
            url: null,
            target: ''
        }
    },
    mounted(){
        if(this.element.TFF_FToolTip.length > 0){
            if(this.element.TFF_FLenMax == 0){
                this.target = "_self"
            } else if(this.element.TFF_FLenMax == 1){
                this.target = "_blank"
            }
        }
    },
    methods: {
        showImage(element){
            if(element.items && element.items.length > 0){
                return element.items[0].img.TPIC_FAddress
            } else {
                return  "/placeholder.png"
            }
        }, 
        getAlt(element){
            if(element.items && element.items.length > 0 ){
                return element.items[0].img.TPIC_FComment
            } else{
                return ""
            }
        }
    }

}
</script>