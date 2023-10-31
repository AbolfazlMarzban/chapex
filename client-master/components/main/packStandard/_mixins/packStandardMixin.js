export default {
    methods: {
      async getInit() {
        try {
          const response = await this.$authAxios.$get(
            "/standard/get/0?mode=init"
          );
          return response;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
      async getTable() {
        try {
          const response = await this.$authAxios.$get(
            "/standard/get/0?mode=table"
          );
          return response;
        } catch (error) {
          console.log(error);
        }
      },
      async getShow(id) {
        try {
          const response = await this.$authAxios.$get(
            `/standard/get/${id}?mode=show`
          );
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async Submit(status, data) {
        try {
          let response;
          if (status == "insert") {
             response = await this.$authAxios.$post("/standard", {
              data:data
            });
          } else if (status == "edit") {
             response = await this.$authAxios.$patch("/standard", {
              data
            });
          } else if (status == "delete") {
             response = await this.$authAxios.$delete(
              "/standard/" + data
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
      }
  
   
    }
  };
  