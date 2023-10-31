<template>

    <div>
        <component :is="element.type+'Field'" :readonly="readonly" :element="element" />
    </div>
</template>

<script>
import inputField from './fields/inputField.vue'
import textareaField from './fields/textareaField.vue'
import editorField from './fields/editorField.vue'
import checkboxField from './fields/checkboxField.vue'
import radioField from './fields/radioField.vue'
import selectField from './fields/selectField.vue'
import multiselectField from './fields/multiselectField.vue'
import selectSystemField from './fields/selectSystemField.vue'
import multiSelectSystemField from './fields/multiSelectSystemField.vue'
import fileField from './fields/fileField.vue'
import colorField from './fields/colorField.vue'
import linkField from './fields/linkField.vue'
import emailField from './fields/emailField.vue'
import dateField from './fields/dateField.vue'
import timeField from './fields/timeField.vue'
import numberField from './fields/numberField.vue'
import moneyField from './fields/moneyField.vue'
import phoneField from './fields/phoneField.vue'
import starField from './fields/starField.vue'
import dividerField from './fields/dividerField.vue'
import spacerField from './fields/spacerField.vue'
import titleField from './fields/titleField.vue'
import textField from './fields/textField.vue'
import showimgField from './fields/showimgField.vue'
import buttonField from './fields/buttonField.vue'

export default {
    props: ["element", "readonly"],
    components: {
        inputField,
        textareaField,
        editorField,
        colorField,
        checkboxField,
        radioField,
        phoneField,
        selectField,
        multiselectField,
        selectSystemField,
        multiSelectSystemField,
        fileField,
        linkField,
        emailField,
        dateField,
        timeField,
        numberField,
        moneyField,
        starField,
        dividerField,
        spacerField,
        titleField,
        textField,
        showimgField,
        buttonField
    }
}
</script>

<style lang="scss">

</style>