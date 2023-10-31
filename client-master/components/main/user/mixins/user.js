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
        console.log(error);
        this.showResponseErrors(error);
      }
    },

    async getTable(state) {
      try {
        let response = await this.$authAxios.$get(
          "/user/get/0?mode=table&status=" + state
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getInit(state) {
      try {
        let response = await this.$authAxios.$get(
          "/user/get/0/?mode=init&status=" + state
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getShow(id, state) {
      try {
        let response = await this.$authAxios.$get(
          `/user/get/${id}/?mode=show&status=${state}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};


