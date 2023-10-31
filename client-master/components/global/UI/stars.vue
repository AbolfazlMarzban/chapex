<template>
  <div>
      <label>{{ label }}</label>
      <v-rating
       hover
       length= "5"
       size= "25"
       color= "orange"
       background-color= "orange"
       value= "3"
       v-model="rating"  
      >
         <!-- length= maxLength
       size= minLength
       color= icon
       background-color= tooltip
       value= 3 -->
      </v-rating>
             <span>{{ errorMessages[0] }}</span>
  </div>
</template>

<script>
import stars from "../../../plugins/mixins/UI-mixins/stars.js"
export default {
    props: [ "deleteForm" ],
    mixins:[ stars ],
    data(){
        return {
            rating: ""
        }
    },
    watch:{
        deleteForm(){
            this.rating = ""
        }
    }
    // props:[
    //     "maxLength", "minLength", "tooltip"
    // ]
}
</script>

<style>

</style>