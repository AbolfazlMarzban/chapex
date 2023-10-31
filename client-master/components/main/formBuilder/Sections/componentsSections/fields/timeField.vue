<template>
    <div class="components-input">
        <label>{{element.TFF_FLable}}</label>
        <reqcyrcel :element="element"></reqcyrcel>
        <ui-data-picker dateType="time" 
        :readonly="!element.TFF_FActive"
            :required="element.TFF_FRequired"
            :value="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
        class="datepicker-fbuilder" />
    </div>
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"],
    watch:{
        deleteForm(){
            this.element.TFF_FDefault = ""
        }
    }
}
</script>