<template>
    <div class="components-input">
        <label>{{element.TFF_FLable}}</label>
        <reqcyrcel :element="element"></reqcyrcel>

        <input class="form_control_textInput" type="number" 
        :placeholder="element.TFF_FPlaceHolder"
            :max="element.TFF_FLenMax" 
            :min="element.TFF_FLenMin"
            :readonly="!element.TFF_FActive"
            :required="!element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip"  />
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