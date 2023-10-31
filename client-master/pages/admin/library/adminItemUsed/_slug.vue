<template>
    <div>
      
    </div>
  </template>
  
  <script>
  export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "manage",
    async mounted(){
        var status = this.$route.params.slug.split(':')[0]
        var parentId = this.$route.params.slug.split(':')[1]
        let link;
        if(status == 2400101 || status == 2400102 || status == 2400103 || status == 2400104){
            this.$router.push(`/admin/salePageManage/contentManage/${parentId}`)
        } else if(status == 2400201 || status == 2400202 || status == 2400203){
            link = await this.getLink(status, parentId)
            if(link){
              this.$router.push(`/admin/formBuilder/manage/${link}`)
            }
        }
    },
    methods:{
      async getLink(status, parentId){
        try{
          const result = await this.$authAxios.$get(`/gallery/getLink/${status}:${parentId}:admin`)
          if(result){
            return result
          }
        }catch(error){
          console.log(error)
        }
      } 
    }
  }
  </script>
  
  <style>
  
  </style>