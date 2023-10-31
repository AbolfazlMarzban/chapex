export default {
    methods: {
        async getTable(tabId) {
            try {
                const response = await this.$authAxios.$get(
                    "/comments/get/:id/:statusID?mode="
                )
                return response
            }
            catch (error) {
                console.log(error);
            }
        },

        async getInit() {
            try {
                const response = await this.$authAxios.$get(
                    "/comments/get/0/0?mode=init"
                )
                return response
            } catch (error) {
                console.log(error);
            }
        },
        async getShow() {
            try {
                const response = await this.$authAxios.$get(
                    "/comments/get/0/0?mode=show"
                )
                return response
            } catch (error) {
                console.console.log(error);
            }
        }

    }
}