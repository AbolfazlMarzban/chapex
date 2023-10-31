export default {
    methods: {
        async Submit(status, data) {
            try {
                let result;
                if (status == "insert") {
                    result = await this.$authAxios.$post("/user", {
                        data
                    });
                } else if (status == "edit") {
                    result = await this.$authAxios.$patch("/user", {
                        data
                    });
                } else if (status == "delete") {
                    result = await this.$authAxios.$delete("/user/" + data);
                }
                if (result) {
                    this.showResponseSuccessMessages(result);
                    return result;
                }
            } catch (error) {
                this.showResponseErrors(error);
            }
        },

        async getUserOrders() {
            try {
                const result = await this.$authAxios.$get(`/user/orders/get/`)
                if (result)
                    return result.data
            } catch (error) {
                console.log(error)
            }
        },

        async getUserOrder(orderId) {
            try {
                const result = await this.$authAxios.$get(`/user/orders/get/${orderId}`)
                if (result)
                    return result.data
            } catch (error) {
                console.log(error)
            }
        },

        getOrderImage(order) {
            if (order.TOD_Goods_Image)
                return order.TOD_Goods_Image;
            if (order.TOD_SalePage_Image)
                return order.TOD_SalePage_Image;
        },
    }
}