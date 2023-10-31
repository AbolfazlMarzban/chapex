export default {
  methods: {
    async getInit() {
      try {
        const response = await this.$authAxios.get("/options/get/0?mode=init");
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getTable(productID) {
      try {
        const url = `/options/get/${productID}?mode=table`;
        const response = await this.$authAxios.get(url);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getShow(optionID) {
      try {
        const url = `/options/get/${optionID}?mode=show`;
        const response = await this.$authAxios.get(url);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getOptions(id) {
      try {
        const url = `/options/get/${id}?mode=optionsList`;
        const response = await this.$authAxios.get(url);
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getOptionValue(id) {
      try {
        const response = await this.$authAxios.get(
          `/options/get/${id}?mode=optionsValueList`
        );
        console.log("response", response);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async Update(data) { 
      try {
        const result = await this.$authAxios.$patch("/options", {data: data})
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
          url = "/options";
          result = await this.$authAxios.$post(url, { data: data });
        } else if (status == "delete") {
          console.log(data);
          result = await this.$authAxios.$delete("/options/" + data);
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
    async submitOptionDependency(data) {
      try {
        const result = await this.$authAxios.$post(`/options/dependency`, {
          data: data
        });
        if (result) {
          this.showResponseSuccessMessages(result);
          return result;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
};
