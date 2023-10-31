<template>
  <div>
     <v-radio-group v-model="radioSelect">
                    <span class="text-right">{{ label }}</span>
                    <v-radio
                      v-for="(radio, index) in items"
                      :key="index"
                      :label= radio.title
                      :value= radio.value
                      :readonly="readonly"
                    ></v-radio>
                  </v-radio-group>
  </div>
</template>

<script>
import radio from "../../../plugins/mixins/UI-mixins/radio"
import radioSetting from "../../main/formBuilder/fieldsSettings/radioSetting.vue"
export default {
  props:["title","value","items"],
  mixins:[radio],
  components:{radioSetting},
data(){
  return{
    radioSelect: ""
  }
}
}
</script>

<style>

</style>