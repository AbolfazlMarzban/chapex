<template>
  <div>
      <label>{{ label }}</label>
      <br>
      <v-btn :href= placeholder 
      download>
          <v-icon>mdi-download</v-icon>
      </v-btn>
      <span class="input_errorMessages">{{ errorMessages[0] }}</span>
  </div>
</template>

<script>
import download from "../../../plugins/mixins/UI-mixins/download.js"
export default {
mixins:[download],
props:["placeholder"]

}
</script>
  
<style>

</style>