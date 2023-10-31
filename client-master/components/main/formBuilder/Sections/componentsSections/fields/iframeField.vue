<template>
  <div class="d-flex flex-column" style="width: 100%;">
    <label for="" class="mb-3" v-if="isadmin">{{ element.TFF_FLable }}</label>
    <iframe :src="element.TFF_FPlaceHolder" :title="element.TFF_FLable" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
props: [ "element", "readonly", "isadmin"]
}
</script>

<style>

</style>