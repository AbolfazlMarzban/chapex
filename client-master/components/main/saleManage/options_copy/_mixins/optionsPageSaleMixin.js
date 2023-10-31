export default {
  methods: {
    // async getInit() {
    //   try {
    //     const response = await this.$authAxios.get(
    //       "/optionsPageSale/get/0?mode=init"
    //     );
    //     return response.data;
    //   } catch (error) { 
    //     console.log(error);
    //     return null;
    //   }
    // },
    async getInit(parentID = 220) {
      try {
        const response = await this.$authAxios.$get(
          `productOptions/get/${parentID}?mode=init`
        );
        return response;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getShow(id) {
      try {
        const response = await this.$authAxios.$get(
          `/productOptions/get/${id}?mode=show`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    // async getTable(productID) {
    //   try {
    //     const url = `/optionsPageSale/get/${productID}?mode=table`;
    //     const response = await this.$authAxios.get(url);
    //     return response.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getOptionsTable(id = 0) {    
      try {
        const response = await this.$authAxios.$get(
          "/productOptions/get/" + id + "?mode=all"
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    // async getShow(optionID) { 
    //   try {
    //     const url = `/optionsPageSale/get/${optionID}?mode=show`;
    //     const response = await this.$authAxios.get(url);
    //     return response.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getOptions(id) {
      try {
        const url = `/optionsPageSale/get/${id}?mode=optionsList`;
        const response = await this.$authAxios.get(url);
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async submitOptionValue(data) {
      try {
        const result = await this.$authAxios.$post(
          `/optionsPageSale/optionValue`,
          { data: data }
        ); 
        if (result) {
          this.showResponseSuccessMessages(result);
          return result;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async Submit(status = "insert", data) {
      try {
        let url, result;
        if (status == "insert") {
          url = "/optionsPageSale";
          result = await this.$authAxios.$post(url, { data: data });
        } else if (status == "delete") {
          url = "/optionsPageSale/" + data;
          result = await this.$authAxios.$delete(url);
        } else if (status == "update") {
          result = await this.$authAxios.$patch("/optionsPageSale", {
            data: data
          });
        }
        if (result) {
          this.showResponseSuccessMessages(result);
          return result;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async addProduct() {
      try {
        const response = await this.$authAxios.$get(
          "/products/get/0?mode=init"
        );
        return response;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async productSubmit(status, data) {
      try {
        let response;
        if (status == "insert") {
           response = await this.$authAxios.$post("/products", {
            data:data
          });
         
        } else if (status == "edit") {
           response = await this.$authAxios.$patch("/products", {
            data:data
          });
        } else if (status == "delete") {
           response = await this.$authAxios.$delete(
            "/products/" + data
          );
        }

        if (response) {

          this.showResponseSuccessMessages(response);
          return response;
        }
      } catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
    },
    async getProductTable() {
      try {
        const response = await this.$authAxios.$get(
          "/products/get/0?mode=table"
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async submitOptions(status,data){
      try {
        let result;
        if (status == "insert") {
          result = await this.$authAxios.$post("/productOptions", {
            data
          });
        } else if (status == "edit") {
          result = await this.$authAxios.$patch("/productOptions", {
            data
          });
        } else if (status == "delete") {
          result = await this.$authAxios.$delete("/productOptions/" + data);
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
