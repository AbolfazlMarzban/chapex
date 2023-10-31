export default {
    methods: {


        async submitUserAddressInProfile(data){
            try{
                let result = this.$authAxios.$post("/address/0" , {
                    data
                })
                if(result) {
                    return result;
                }
            }catch(error){
                console.log(error)
            }
        } , 


        async getAddressesInProfile(mode , userId=0){
            try {
                const response = await this.$authAxios.$get(
                    `/address/get/${userId}?mode=${mode}`
                )
                return response.data
            }catch(error){
                console.log(error)
            }
        } , 

           async deleteUserAddress (addressId){
            try{
                const result = await this.$authAxios.$patch(
                    `/address/delete/${addressId}`
                );
            }catch(error){
                console.log(error);
            }
        } , 


        async getAddressRowToEdit(addressRowId){
            try {
                const response = await this.$authAxios.$get(
                    `/address/get/edit/${addressRowId}`
                )
                return response.data
            }catch(error){
                console.log(error)
            }
        } , 


        async submitAddressAfterEdit(data){
            try{
                let result = this.$authAxios.$patch("/address/edit" , {
                    data
                })
                if(result) {
                    return result;
                }
            }catch(error){
                console.log(error)
            }
        } , 
        


    },  
}

