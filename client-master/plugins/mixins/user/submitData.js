export default {
  methods: {
    Submit() {
      return {
        updateProfile: this.updateProfile
      };
    },
    async updateProfile(userData) {
      try {
        const response = await this.$authAxios.$patch("/user/update-profile", {
          data: {
            user: userData
          }
        });
        this.showResponseSuccessMessages(response);
        return response.otherData

      } catch (error) {
        this.showResponseErrors(error);
        return null 
      }
    }
  }
};
