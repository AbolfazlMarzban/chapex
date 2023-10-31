<template>
    <div class="components-input" :id="element.TFF_FID">
        <label>{{element.TFF_FLable}} 
            <reqcyrcel :element="element"></reqcyrcel>
             </label>
        <ui-input class="form_control_textInput inner-components-input" 
            :class="{ notempty : element.TFF_FDefault !=''&& element.TFF_FDefault != null }"
            :placeholder="element.TFF_FPlaceHolder"
            :readonly="element.TFF_FActive == 0"
            :required="element.TFF_FRequired"
            v-model="element.TFF_FDefault" 
            :append-icon="element.TFF_FIcon" 
            :hint="element.TFF_FToolTip" 
            @change="doit"
             :deleteForm="deleteForm"
             />
    </div>
</template>

<script>
import reqcyrcel from './extras/reqcyrcel.vue'
export default {
  components: { reqcyrcel },
    props: ["element", "readonly","uservalue", "deleteForm"],
    data(){
        return{
            notempty: true,
            data : ''
        }
    },
    
    mounted() {
        if(this.element){
            // console.log("log input", this.element,this.value);
        }
    },
    methods:{
        doit(){
             this.$emit('toformField',this.element,this.data)
        }
    }
    
}
</script>
 <style lang="scss">
 .notempty{
            input{
            background: rgba(1, 102, 112, 0.1)!important;
            color: #016670;
            font-weight: 600;
            }
            fieldset{
                background: rgba(1, 102, 112, 0.1)!important;
            color: #016670;
            font-weight: 600;
            }
        } 
.components-input:has(input:focus){
    label{
        color: #016670;
        font-weight: 600;
    }
}
.components-input{
    label{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #000000;
    }
    .form_control_textInput{
        input:focus{
            background: rgba(1, 102, 112, 0.1)!important;
            border: 2px solid rgba(1, 102, 112, 0.5)!important;
            box-shadow: 0px 4px 4px rgba(1, 102, 112, 0.2)!important;
            border-radius: 20px;
            font-weight: 600;
            color: #016670;
        }
    }
}
 </style>