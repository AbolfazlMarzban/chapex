<template>
<div class="components-input" :id="element.TFF_FID">
    <label>{{element.TFF_FLable}}</label> 
    <reqcyrcel :element="element"></reqcyrcel>
    <!-- <ui-input class="form_control_textInput" 
    :label="element.TFF_FLable" 
    :placeholder="element.TFF_FPlaceHolder"
    :readonly="element.TFF_FActive == 0"
            :required="element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="TFF_FToolTip" 
            :deleteForm="deleteForm"
         /> -->
    <ui-editor 
        :label="element.TFF_FLable" 
        :placeholder="element.TFF_FPlaceHolder"
        :readonly="element.TFF_FActive == 0"
        :required="element.TFF_FRequired"
        v-model="element.TFF_FDefault" 
        :append-icon="element.TFF_FIcon" 
        :hint="element.TFF_FToolTip" 
        :deleteForm="deleteForm"
        ></ui-editor>
</div>
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"]
}
</script>