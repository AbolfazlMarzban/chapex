<template>
    <div class="components-input">
        <label>{{element.TFF_FLable}}</label>
        <reqcyrcel :element="element"></reqcyrcel>

        <ui-input id="phone-number" 
        class="form_control_textInput" 
        :placeholder="element.TFF_FPlaceHolder" 
        :readonly="!element.TFF_FActive"
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