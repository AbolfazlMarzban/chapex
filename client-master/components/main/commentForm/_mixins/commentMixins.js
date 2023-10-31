export default {
    methods: {
        async getTable(statusID=26001, id=0){
            try {
                const response = await this.$authAxios.$get(
                    `/comment/get/0/${statusID}?mode=table`
                )
                return response.data
            }catch(error) {  
                console.log(error);
            }
        } ,
        async getInit(){
            try {
                const response = await this.$authAxios.$get(
                    "/comment/get/0/0?mode=init"
                )
                return response.data
            }catch(error){
                console.log(error)
            }
        } , 


        
        async submitChangeState(data){
            try{
                let result = this.$authAxios.$patch("/comment/state" , {
                    data
                })
                if(result) {
                    return result;
                }
            }catch(error){
                console.log(error)
            }
        },
        async Submit(status, data) {
            try {
              let result;
               if (status == "delete") {
                result = await this.$authAxios.$delete("comment" + data);
              }
      
              if (result) {
                this.showResponseSuccessMessages(result);
                return result;
              }
            } catch (error) {
              console.log(error);
              this.showResponseErrors(error);
            }
          }
    
        // async getShow(){
        //     try{
        //         const response = this.$authAxios.$get(
        //             "/faq/get/:id/:statusID?mode=show"
        //         )
        //         return response
        //     }catch(error) {
        //         console.log(error);
        //     }
        // }
    },  
}