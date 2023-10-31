export default {
    methods: {


        async submitUserAddressInUserCustomer(data, userId) {
            try {
                let result = this.$authAxios.$post(
                    `/address/${userId}`, {
                    data
                })
                if (result) {
                    return result;
                }
            } catch (error) {
                console.log(error)
            }
        },


        async getAddressesInUserCustomer(mode, userId = 0) {
            try {
                const response = await this.$authAxios.$get(
                    `/address/get/${userId}?mode=${mode}`
                )
                return response.data
            } catch (error) {
                console.log(error)
            }
        },

        async deleteUserAddress(addressId) {
            try {
                const result = await this.$authAxios.$patch(
                    `/address/delete/${addressId}`
                );
                return result
            } catch (error) {
                console.log(error);
            }
        },


        async getAddressRowToEdit(addressRowId) {
            try {
                const response = await this.$authAxios.$get(
                    `/address/get/edit/${addressRowId}`
                )
                return response.data
            } catch (error) {
                console.log(error)
            }
        },


        async submitAddressAfterEdit(data) {
            try {
                let result = this.$authAxios.$patch("/address/edit", {
                    data
                })
                if (result) {
                    return result;
                }
            } catch (error) {
                console.log(error)
            }
        },



    },
}

