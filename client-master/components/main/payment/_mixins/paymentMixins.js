export default {
    methods: {

        async getPaymentGateways(id) {
            try {
                const response = await this.$authAxios.$get(
                    `/payment/get/${id}`
                )
                return response.data
            } catch (error) {
                console.log(error)
            }
        },

        async setDataBuyToHeader(paymentData) {
            try {

                let result = this.$authAxios.$post("cart/buy", { paymentData })
                if (result) {
                    return result;
                }
            } catch (error) {
                console.log(error)
            }
        },

        async getPaymentURL(data) {
            try {

                let result = await this.$authAxios.$post("/payment/getPaymentURL", {
                    data
                })
                if (result) {
                    return result.payment;
                }
            } catch (error) {
                console.log(error)
            }
        },

        async verifyPayment(authority, RefNum) {
            try {

                let result = await this.$authAxios.$post("/payment/verifyPayment", { authority, RefNum })
                if (result) {
                    return result;
                }
            } catch (error) {
                console.log(error)
            }
        },

        async submitUserAddressInDeliveryStatus(data) {
            try {
                let result = this.$authAxios.$post("/address/0", {
                    data
                })
                if (result) {
                    return result;
                }
            } catch (error) {
                console.log(error)
            }
        },


        async getAddressesInDeliveryStatus(mode, userId = 0) {
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

