<template>
    <div class="components-input">
        <label>{{element.TFF_FLable}}</label>
        <reqcyrcel :element="element"></reqcyrcel>

        <ui-download 
        :placeholder="element.TFF_FDefault"
        :readonly="element.TFF_FActive == 0"
        :required="element.TFF_FRequired"
        v-model="element.TFF_FDefault" 
        :append-icon="element.TFF_FIcon" 
        :hint="element.TFF_FToolTip"
        @click="test"
        :deleteForm="deleteForm"
         />
    </div>
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"],
    mounted(){
        // console.log("my test",this.element.TFF_FDefault);
    },
    watch:{
        deleteForm(){
            this.element.TFF_FDefault = ""
        }
    }
}
</script>