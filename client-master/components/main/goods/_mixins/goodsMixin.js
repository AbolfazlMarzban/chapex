export default {
  methods: {
    async getInit() {
      try {
        const response = await this.$authAxios.$get(
          "/products/goods/get/0?mode=init"
        );
        return response;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getSecondTable(groupID = 0) {
      try {
        const response = await this.$authAxios.$get(
          `/defaults/get/${groupID}?mode=table`
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getTable() {
      try {
        const response = await this.$authAxios.$get(
          "/products/goods/get/0?mode=table"
        ); 
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async getShow(id) {
      try {
        const response = await this.$authAxios.$get(
          `/products/goods/get/${id}?mode=show`
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
          result = await this.$authAxios.$post("/products/goods", {
            data
          });
        } else if (status == "copy") {

        } else if (status == "edit") {
          result = await this.$authAxios.$patch("/products/goods", {
            data
          });
        } else if (status == "delete") {
          result = await this.$authAxios.$delete("/products/goods/" + data);
        }

        if (result) {
          this.showResponseSuccessMessages(result);
          return result;
        }
      }
      catch (error) {
        console.log(error);
        this.showResponseErrors(error);
      }
    },
    async TGO_FCode2TGO_FID(TGO_FCode) {
      try {
        const response = await this.$authAxios.$get(
          `/products/TGO_FCode2TGO_FID/${TGO_FCode}`
        );

        return response;
      } catch (error) {
        console.log(error);
      }
    },

  }
};
