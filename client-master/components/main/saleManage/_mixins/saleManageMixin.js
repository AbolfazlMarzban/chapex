export default {
  methods: {
    async getInit() {
      try {
        const response = await this.$authAxios.$get(
          "/pageSale/get/0?mode=init"
        );
        // console.log(response)
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    async getSalePageTable() {
      try {
        const response = await this.$authAxios.$get(
          "/pageSale/get/0?mode=table"
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async getShow(id, state) {
      try {
        const response = await this.$authAxios.$get(
          `/pageSale/get/${id}?mode=${state}`
        ); 
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async Submit(status, data, state) {
      try {
        let result;
        if (status == "insert") {
          result = await this.$authAxios.$post("/pageSale", {
            data: data
          });
        } else if (status == "edit") {
          result = await this.$authAxios.$patch("/pageSale", {
            state: state,
            data: data
          });
        } else if (status == "delete") {
          result = await this.$authAxios.$delete("pageSale/" + data);
        }
        if (result) {
          this.showResponseSuccessMessages(result);
          return result;
        }
      } catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
    },
    /******************product */
    async getShowGoods(id) {
      try {
        const response = await this.$authAxios.$get(
          `/pageSale/goods/get/${id}?mode=show`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getInitProduct() {
      try {
        const response = await this.$authAxios.$get(
          "/pageSale/goods/get/0?mode=init"
        );
        return response;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    async getTableProduct(id) {
      try {
        const response = await this.$authAxios.$get(
          `/pageSale/goods/get/${id}?mode=table`
        );

        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async SubmitProduct(status, data) {
      try {
        let result;
        if (status == "insert") {
          result = await this.$authAxios.$post("/pageSale/goods", {
            data: data
          });
        } else if (status == "edit") {
          result = await this.$authAxios.$patch("/pageSale/goods", {
            data: data
          });
        } else if (status == "delete") {
          result = await this.$authAxios.$delete("pageSale/goods/" + data);
        }

        if (result) {
          this.showResponseSuccessMessages(result);
          return result;
        }
      } catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
    },

    /******************Options */
    async getShowOption(id) {
      try {
        const response = await this.$authAxios.$get(
          `/pageSale/productOptions/get/${id}?mode=show`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getInitOption() {
      try {
        const response = await this.$authAxios.$get(
          "/pageSale/productOptions/get/0?mode=init"
        );
        return response;
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    async getTableOption() {
      try {
        const response = await this.$authAxios.$get(
          "/pageSale/productOptions/get/0?mode=table"
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async SubmitOption(status, data) {
      try {
        let result;
        if (status == "insert") {
          result = await this.$authAxios.$post("/pageSale/productOptions", {
            data: data
          });
        } else if (status == "edit") {
          result = await this.$authAxios.$patch("/pageSale/productOptions", {
            data: data
          });
        } else if (status == "delete") {
          result = await this.$authAxios.$delete(
            "pageSale/productOptions/" + data
          );
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
  }
};
