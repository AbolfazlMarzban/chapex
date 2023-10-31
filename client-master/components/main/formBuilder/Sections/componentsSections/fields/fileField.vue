<template>
    <div>
        <label>{{element.TFF_FLable}}</label>
        <!-- <ui-uploader :id="element.TFF_FID" 
        :placeholder="element.TFF_FPlaceHolder"    
        :readonly="element.TFF_FActive == 0"
        :required="element.TFF_FRequired"
        v-model="element.TFF_FDefault" 
        :append-icon="element.TFF_FIcon"             
         :hint="element.TFF_FToolTip"
         :route="element.TFF_FComment"
         :deleteForm="deleteForm"
         @input="sendElement"   
        />    -->
        <ui-library-uploader :id="element.TFF_FID" @input="value => sendElement(value)"/>
    </div>
</template>     

<script>
export default {
    props: ["element", "readonly", "deleteForm"],
    methods:{
        sendElement(value){
            this.$emit('toformField', this.element, value)

        }
    }
}
</script>   