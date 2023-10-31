<template>
    <v-row class="row header_manager">
       <v-col cols="12">
      <div class="title-name float-left">
        <label>{{title}}</label>
      </div>
    </v-col>
    </v-row>
</template>
<script>
export default {
    props: [
    "title"]
    
}
</script>
<style lang="scss" src="../../../assets/style/Ul/HeaderManager.scss">
</style>