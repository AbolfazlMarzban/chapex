<template>
    <div class="components-input">
        <label>{{element.TFF_FLable}}</label>
        <reqcyrcel :element="element"></reqcyrcel>

        <ui-input-money name class="form_control_textInput" 
        :placeholder="element.TFF_FPlaceHolder" 
            :minLength="element.TFF_FLenMin" 
            :maxLength="element.TFF_FLenMax"
            :readonly="element.TFF_FActive == 0"
            :required="element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
            :deleteForm="deleteForm"
             />
    </div>
</template>

<script>
export default {
    props: ["element", "readonly", "deleteForm"]
}
</script>