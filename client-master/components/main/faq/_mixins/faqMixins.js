export default {
    methods: {
        async getTable(statusID=26001 , id=0){
            try {
                const response = await this.$authAxios.$get(
                    `/faq/get/${id}/${statusID}?mode=table`
                )
                return response.data
            }catch(error) { 
                console.error(error);
            }
        } ,

        async getInit(){
            try {
                const response = await this.$authAxios.$get(
                    "/faq/get/0/0?mode=init"
                )
                return response.data
            }catch(error){
                console.log(error)
            }
        } , 
        async getShow(){
            try{
                const response = this.$authAxios.$get(
                    "/faq/get/:id/:statusID?mode=show"
                )
                return response
            }catch(error) {
                console.log(error);
            }
        } , 

        async submitChangeState(data){
            try{
                let result = this.$authAxios.$patch("/faq/state" , {
                    data
                })
                if(result) {
                    return result;
                }
            }catch(error){
                console.log(error)
            }
        } , 

        async doLike(data){
            try{
                let result = await this.$authAxios.$post("/like" , {
                    data : data
                })
                if (result) { 
                    console.log("aaaa")
                }
                
            }catch(error) {
                console.log(error);
            }
        } ,

        async sendRowTypeToGetLikes(data){
            try {
                await this.$authAxios.$post("/like/type" , {
                    rowType : data
                })
                
                const result = await this.$authAxios.$get("/like/type");

                return result
                
            }catch(error){
                console.log(error);
            }
        },

        async disLike (data){
            try{
                const result = await this.$authAxios.$post("/like/delete" , {
                       likedId : data     
                });
            }catch(error){
                console.log(error);
            }
        }
    },  
}

