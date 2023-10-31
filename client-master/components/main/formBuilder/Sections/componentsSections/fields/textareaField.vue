<template>
    <div class="components-texarea">
        <label>{{element.TFF_FLable}}</label>
        <ui-textarea row="5" 
        :class="{ notempty : element.TFF_FDefault !=''&& element.TFF_FDefault != null }"
        :placeholder="element.TFF_FPlaceHolder"
            class="form_control_textInput" 
          :readonly="!element.TFF_FActive"
            :required="element.TFF_FRequired"  
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon"
            :deleteForm="deleteForm" 
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

<style lang="scss">
.notempty{
            textarea{
            background: rgba(1, 102, 112, 0.1)!important;
            color: #016670;
            font-weight: 600;
            }
        } 
.components-texarea:has(textarea:focus){
    label{
        color: #016670;
        font-weight: 600;
    }
}
.components-texarea{
    label{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #000000;
    }
    .form_control_textInput{
        textarea:focus{
            background: rgba(1, 102, 112, 0.1)!important;
            border: 2px solid rgba(1, 102, 112, 0.5)!important;
            box-shadow: 0px 4px 4px rgba(1, 102, 112, 0.2)!important;
            border-radius: 20px;
            font-weight: 600;
            color: #016670;
        }
        textarea{
                border-radius: 20px;

        }
    }
}
</style>