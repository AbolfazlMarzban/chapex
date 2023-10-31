<template>
    <div>
        <LazyFormViewer v-if="path.length > 0" :path="path" :readonly="false" ></LazyFormViewer>
    </div>
  </template> 
  
  <script>
  export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "salePagelayout",
    data(){
        return{
            path: ''
        }
    },
    mounted(){
    //   console.log(this.$route)
        this.path = this.$route.path
    }
  };
  </script>
  