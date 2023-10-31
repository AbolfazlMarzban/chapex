export default {
    methods: {
 

        async getFormAndUploadersOfFormBuilder(FormId , mode = "init" , productRowId = 0){
            try{
                let result = await this.$authAxios.$get(`formBuilder/${productRowId}/getForm/${FormId}?mode=${mode}`)
                if(result) {
                    return result;
                }
            }catch(error){
                console.log(error)
            }
        } , 


        async insertFormData(data , mode){ 
            try{ 
                let result = await this.$authAxios.$post(`formBuilder/insertAndUpdateData?mode=${mode}` , {
                    data
                })
                if(result) {
                    return result;
                }
               
            }catch(error){
                console.log(error)
            }
        } , 

        async setTabState(tabState , productId){
            try{
                let data = {
                    tabState ,
                    productId
                }
                let result = await this.$authAxios.$patch(`formBuilder/designstatus/tabstate` , {
                   data
                })
                if(result) {
                    return result;
                }
            }catch(error){
                console.log(error)
            }
        } , 

        async deletePreviousTabFormData(FslugOrTag , productRowId){
            try{
                let result = await this.$authAxios.$patch(`formBuilder/deleteFormData/${FslugOrTag}/${productRowId}`)
                if(result) {
                    return result;
                }
            }catch(error){
                console.log(error)
            }
        } , 


    },  
}

