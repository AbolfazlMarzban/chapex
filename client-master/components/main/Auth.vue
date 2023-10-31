<template>
  <div>
    <component
      :is="components.current"
      @done="handleComponents"
      @changeStatus="changeStatus"
      :goToPrevious="goToPrevious"
      :changeTokenValue="changeTokenValue"
      :Submit="Submit"
      :user="user"
    />
  </div>
</template>        

<script>
import EnterPhoneNumber from "./auth/AuthEnterPhoneNumber.vue";
import ActivePhoneNumber from "./auth/ActivePhoneNumber.vue";
import EnterPassword from "./auth/AuthEnterPassword.vue";
import ConfirmForgetPassword from "./auth/ConfirmForgerPassword.vue";
import EnterRegisterPassword from "./auth/EnterRegisterPassword.vue";
import ChangePassword from "./auth/ChangePassword.vue";
import Welcome from "./auth/Welcome.vue";

import SubmitMixin from "./../../plugins/mixins/auth/submitData";    

export default {
	mixins: [SubmitMixin],
	data() {
		return {
			components: {
				current: "",
				prev: "",
			},
			user: {
				id: 0,
				username: 0,
				password: "",
				activeCodeToken: "",
				resetToken: "",
			},
		};
	},
	components: {
		EnterPhoneNumber,
		ActivePhoneNumber,
		EnterPassword,
		ConfirmForgetPassword,
		EnterRegisterPassword,
		ChangePassword,
		Welcome,
	},
	methods: {
		handleComponents(data) {
			const status = this.components.current;

			if (status == EnterPhoneNumber) {
				// set user data if registered

				if (data.registered) {
					this.user.id = data.user.TU_FID;
					this.user.username = data.user.TU_FUserName;

					this.components.current = EnterPassword;
				} else {
					this.user.id = data.user.id;
					this.user.username = data.user.username;
					this.user.activeCodeToken = data.user.activeCodeToken;

					this.components.current = ActivePhoneNumber;
				}
			}

			else if (status == EnterPassword) {
				// set user data in vuex
				this.$store.dispatch("login/login", data);

				this.components.current = Welcome;
				this.$emit("done");
			}
			//
			else if (status == ActivePhoneNumber) {
				this.components.current = EnterRegisterPassword;
			}

			else if (status == EnterRegisterPassword) {
				// set user data
				// console.log("status:", status, data)
				this.$store.dispatch("login/login", data);

				this.components.current = Welcome;
			}
			//
			else if (status == ConfirmForgetPassword) {
				this.components.current = ChangePassword;
			}

			else if (status == ChangePassword) {
				// console.log("status:", status, data)
				this.$store.dispatch("login/login", data);

				this.components.current = Welcome;
				this.$emit("done");

			}

			// console.log("logindata", data);
			this.components.prev = status;
		},

		async changeStatus(status) {
			
			if (status == "ConfirmForgetPassword") {
				// create forgetpassword token in backend
				const response = await this.Submit().requestForgetPassword(
					this.user.id
				);
				this.user.resetToken = response.resetToken;

				this.components.prev = this.components.current;
				this.components.current = ConfirmForgetPassword;
			}
		},
		// change method resetToken and activeToken with refs
		changeTokenValue(tokenName, value) {
			this.user[tokenName] = value;
			// console.log(tokenName, value, this.user[tokenName]);
		},
		// goToPrevious
		goToPrevious() {
			if (this.components.current != this.components.prev) {
				this.components.current = this.components.prev;
			} else {
				this.components.prev = this.components.current;
				this.components.current = EnterPhoneNumber;
			}
		},
	},
	mounted() {
		this.components.current = EnterPhoneNumber;
	},
};
</script>

<style lang="scss" scoped>
</style>