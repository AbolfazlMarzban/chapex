<template>
    <div class="components-input">
        <label>{{element.TFF_FLable}}</label>
        <reqcyrcel :element="element"></reqcyrcel>

        <ui-data-picker 
        dateType="date" 
        v-model="element.TFF_FDefault"
        :readonly="!element.TFF_FActive"
        :required="element.TFF_FRequired"
        class="datepicker-fbuilder"
        :class="{ notempty : element.TFF_FDefault !=''&& element.TFF_FDefault != null }"
        :deleteForm="deleteForm"
 />
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

<style lang="scss">
.datapicker .showInput:focus{
background: rgba(1, 102, 112, 0.1)!important;
            border: 2px solid rgba(1, 102, 112, 0.5)!important;
            box-shadow: 0px 4px 4px rgba(1, 102, 112, 0.2)!important;
            border-radius: 20px;
            font-weight: 600;
            color: #016670;
}

</style>