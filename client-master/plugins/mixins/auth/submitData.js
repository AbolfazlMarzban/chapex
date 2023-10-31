export default {
  methods: {
    
    Submit() {
      return {
        sendUserNumber: this.sendUserNumber,
        sendPasswordForAuthenticating: this.sendPasswordForAuthenticating,
        CheckActiveCode: this.CheckActiveCode,
        sendPasswordForRegisteration: this.sendPasswordForRegisteration,
        requestForgetPassword: this.requestForgetPassword,
        checkForgetPasswordCode: this.checkForgetPasswordCode,
        changePassword: this.changePassword,
        resetCodeToken: this.resetCodeToken
      }
    },
    // arg default data
    async sendUserNumber(userNumber) {
      try {
        const data = {
          userNumber
        }
        const result = await this.$axios.$post("/auth/get-user-number", {
          data
        });
        return result
      } catch (error) {
        this.showResponseErrors(error);
        return null
      }
    },

    async sendPasswordForAuthenticating(id, password) {
      try {
        let
          data = {
            user: {
              id,
              password
            }
          }

        const result = await this.$axios.$post("/auth/check-password", {
          data
        });

        return result

      } catch (error) {
        this.showResponseErrors(error);
        return null
      }
    },

    async CheckActiveCode(userId, activeCodeToken, code) {
      try {
        let
          data = {
            user: {
              userId,
              activeCodeToken,
              enteredCode: code
            }
          }

        const result = await this.$axios.$post("/auth/check-active-code", {
          data
        });

        return result

      } catch (error) {
        this.showResponseErrors(error)
        return null
      }
    },

    async sendPasswordForRegisteration(user) {
      try {
        const result = await this.$axios.$post("/auth/set-password-registeration", {
          data: {
            user
          }
        });

        this.showResponseSuccessMessages(result);

        return result

      } catch (error) {
        this.showResponseErrors(error)
        return null
      }
    },

    async requestForgetPassword(userId) {
      try {
        const result = await this.$axios.$post("/auth/forget-password", {
          data: {
            user: {
              id: userId
            }
          }
        });
        this.showResponseSuccessMessages(result);

        return result.otherData
      } catch (error) {
        return null
      }
    },

    async checkForgetPasswordCode(code, userId, resetToken) {
      try {
        let
          data = {
            user: {
              id: userId,
              resetToken,
              enteredCode: code
            }
          }

        const result = await this.$axios.$post("/auth/check-forget-password-code", {
          data
        });

        return result
      } catch (error) {
        this.showResponseErrors(error)
        return null
      }
    },

    async changePassword(id, password, confirmPassword) {
      try {
        const result = await this.$axios.$post("/auth/change-password", {
          data: {
            user: {
              id,
              password,
              confirmPassword
            }
          }
        });
        this.showResponseSuccessMessages(result);
        return result.otherData
      } catch (error) {
        this.showResponseErrors(error)
        return null
      }
    },
    // state = ActivePhoneNumber || ConfirmForgetPassword
    async resetCodeToken(id, state = "ActivePhoneNumber") {
      try {
        const result = await this.$axios.$post("/auth/reset-code-token", {
          data: {
            user: {
              id
            },
            state
          }
        });
        this.showResponseSuccessMessages(result);
        return result.otherData
      } catch (error) {
        console.log(error)
        this.showResponseErrors(error)
        return null
      }
    }
  },


}
