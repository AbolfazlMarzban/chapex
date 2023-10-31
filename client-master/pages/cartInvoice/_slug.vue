<template>
  <div>
    <LazyChapexFactor v-if="data" :legal="data.legalInfo" :account="data.account" />
  </div>
</template>

<script>
export default {
    layout: "print",
    middleware: ["init-auth", "is-auth", "init-cart"],
    data(){
      return{
        data: null
      }
    },
    mounted(){
      let factor = localStorage.getItem('factor')
      this.data = JSON.parse(factor)
      console.log('factor', this.data)
    }
}
</script>

<style>

</style>