export default {
  methods: {
    async getInit() {
      try {  
        const response = await this.$authAxios.$get(
          "/formBuilder/get/0?mode=init"  
        );    
        return response.data;
      } catch (error) { 
        console.log(error); 
      }
    },

    async getShow(id) { 
      try {
        const response = await this.$authAxios.$get(
          `/formBuilder/get/${id}?mode=show` 
        );            
        // console.log('getShow Result',response.data);   
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getTable() {
      try {
        const response = await this.$authAxios.$get(
          "/formBuilder/get/0?mode=table"
        );

        // console.log('getTable');
        // console.log(response.data);

        return response.data;
      } catch (error) {
        console.log('getTable error:', error);
      }
    },

    async SubmitFormBuilder(status, data) {
      let result;
      try {

        if (status == "insert") {
          result = await this.$authAxios.$post("/formBuilder", { data: data });
           console.log("formSubmitData", data)
        }

        else if (status == "delete") {
          result = await this.$authAxios.$delete("/formBuilder/" + data);
        }

        else if (status == "multidelete") {
          if (data && data.length > 0) {
            for (var i = 0; i <= data.length - 1; i++) {
              result = await this.$authAxios.$delete("/formBuilder/" + data[i].TF_FID);
            }
          }
        }

        else if (status == "edit") { 
          result = await this.$authAxios.$patch("/formBuilder/", {
            data: data
          });
           console.log("EditFormSubmitData", data)
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

    async getFormAndUploadersOfFormBuilder(FormId) {
      try {
        let result = await this.$authAxios.$get(
          `formBuilder/getForm/${FormId}`
        );
        if (result) {
          return result;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async insertFormData(data, mode) {
      try {
        let result = await this.$authAxios.$post(`formBuilder/insertAndUpdateData?mode=${mode}`, {
          data
        })
        if (result) {
          
          return result;
        }

      } catch (error) {
        console.log(error)
      }
    },
    async getFormAndUploadersOfFormBuilder(FormId, mode = "init", productRowId = 0) {
      try {
        let result = await this.$authAxios.$get(`formBuilder/${productRowId}/getForm/${FormId}?mode=${mode}`)
        if (result) {
          return result;
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getUserForm(FormId) {
      try {
        let result = await this.$authAxios.$get(
          `formBuilder/getUserForm/${FormId}`
        );
        if (result) {
          return result;
        }
      } catch (error) {
        console.log(error);
      }
    },

  }
};
