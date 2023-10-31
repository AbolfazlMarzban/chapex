<template>
<div class="component-checkbox" >
    <reqcyrcel :element="element"></reqcyrcel>

    <v-checkbox 
    :readonly="element.TFF_FActive == 0" 
     :append-icon="element.TFF_FIcon"  
     :value="element.TFF_FDefault" 
    v-model="element.TFF_FDefault" 
     class="checkboxx mt-0" 
     :id="element.TFF_FID" 
     :label="element.TFF_FLable">
    </v-checkbox>
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
.component-checkbox{
display:flex; 
align-items: center; 
// margin-top: 26px;
    label{
        color: #000 !important;
    }
    .v-input__slot{
        margin-bottom: 0px !important;
        label{
            text-align: right;
            margin-right: 10px;
        }
    }
}
.component-checkbox:has(input:checked){
    label{
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        text-align: right;
        color: #016670!important;
    }
    .mdi-checkbox-blank-outline{
        background: #D9D9D9;
        border-radius: 5px;
        width: 20px;
        height: 20px;
        left: 1px;
        top: 1px;
    }
}
.mdi-checkbox-blank-outline{
        background: #D9D9D9;
        border-radius: 5px;
        width: 20px!important;
        height: 20px;
        left: -2px;
        top: 1px;
    }
.mdi-checkbox-blank-outline::before{
            content: ""!important;
            color: #016670;
        }
.v-application .primary--text{
    color: #016670 !important;
    caret-color: #016670 !important;
}
</style>