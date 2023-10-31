<template>
    <div>
        <label>{{element.TFF_FLable}}</label>
        <ui-colorpicker 
        :value="element.TFF_FDefault"
        :readonly="element.TFF_FActive == 0" 
        :append-icon="element.TFF_FIcon" 
        v-model="element.TFF_FDefault" 
        :deleteForm="deleteForm"
        :placeholder="element.TFF_FPlaceHolder">
        </ui-colorpicker>
    </div>
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"],
    mounted(){
        // console.log("color",this.element);
        // console.log("color picker",this.element.TFF_FDefault)

    } 
}
</script>