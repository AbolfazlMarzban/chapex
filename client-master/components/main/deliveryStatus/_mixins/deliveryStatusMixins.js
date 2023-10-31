export default {
    methods: {


        async submitUserAddressInDeliveryStatus(data) {
            try {
                let result = await this.$authAxios.$post("/address/0", {
                    data
                })

                if (result) {
                    return result;
                }
            } catch (error) {
                this.showResponseErrors(error);
            }
        },


        async getAddressesInDeliveryStatus(mode, userId = 0) {
            try {
                const response = await this.$authAxios.$get(
                    `/address/get/${userId}?mode=${mode}`
                )

                if (response.data) {
                    if (mode == "show")
                        this.$store.dispatch("login/setUserPercent", response.data.userPercent);

                    return response.data
                }
            } catch (error) {
                console.log(error)
            }
        },

        async deleteUserAddress(addressId) {
            try {
                const result = await this.$authAxios.$patch(
                    `/address/delete/${addressId}`
                );
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
                let response = await this.$authAxios.$patch("/address/edit", {
                    data
                })

                if (response) {
                    return response;
                }
            } catch (error) {
                this.showResponseErrors(error);
            }
        },



    },
}

