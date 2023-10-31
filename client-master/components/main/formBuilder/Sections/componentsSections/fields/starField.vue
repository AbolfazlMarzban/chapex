<template>
    <div>
        <label>{{element.TFF_FLable}}</label>
        <ui-stars
        :placeholder="element.TFF_FPlaceHolder" 
        :readonly="!element.TFF_FActive"
            :required="element.TFF_FRequired"
            :value="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
            :deleteForm="deleteForm"
         />
    </div>
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"],
    mounted(){
        // console.log("my test",this.element);
    }
}
</script>