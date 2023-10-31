<template>
<div>
    <label class="mt-5"> {{label}} </label>
   <v-color-picker
   :id="[name]"
   mode="hexa"
   :dot-size= placeholder
    swatches-max-height="200"
   v-model="picker"
   >
       </v-color-picker> 
       <span>{{ errorMessages[0] }}</span>
</div>
</template>

<script>
import colorpicker from "../../../plugins/mixins/UI-mixins/colorpicker"
export default {
    props:[
        "placeholder", "deleteForm"
    ],
data(){
    return{
        picker: null,
    }
},
mixins: [colorpicker],
watch:{
    deleteForm(){
        this.picker = null
    }
}
}
</script>

<style>

</style>