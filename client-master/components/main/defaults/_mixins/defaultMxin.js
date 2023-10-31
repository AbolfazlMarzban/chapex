export default {
  methods: {
    async getInit(id = 0) {
      try {
        const response = await this.$authAxios.$get(
          `/defaults/get/${id}?mode=init`
        );
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getTable(groupID = 0) {
      try {
        const response = await this.$authAxios.$get(
          `/defaults/get/${groupID}?mode=table`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getShow(id) {
      try {
        const response = await this.$authAxios.$get(
          `/defaults/get/${id}?mode=show`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async Submit(status, data) {
      try {
        let result;
        if (status == "insert") {
          result = await this.$authAxios.$post("/defaults", {
            data
          });
        } else if (status == "edit") {
          result = await this.$authAxios.$patch("/defaults", {
            data
          });
        } else if (status == "delete") {
          result = await this.$authAxios.$delete("/defaults/" + data);
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
