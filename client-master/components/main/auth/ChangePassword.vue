<template>
	<v-container :fluid="true" class="pt-0">
		<v-container :fluid="false" class="pt-0">
			<v-row>
				<v-col
					cols="4"
					class="d-none d-sm-none d-md-block d-lg-block d-xl-block"
				></v-col>
				<v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-0 px-5">
					<div class="first-box">
						<v-row>
							<v-col cols="6" class="py-0">
								<!-- <NuxtLink to="/auth/confirm"> -->
								<!-- <i
									class="fa fa-arrow-right"
									aria-hidden="true"
									style="line-height: 45px"
									@click="goToPrevious"
								></i> -->
								<!-- </NuxtLink> -->
							</v-col>
							<v-col cols="6" class="py-0">
								<v-img
									src="/logo.png"
									class="img-fluid"
									alt="logo"
									title="logo"
								/>
							</v-col>
						</v-row>
						<hr />
						<h1>تغییر رمز عبور</h1>
						<label class="d-block py-2"
							>رمز عبور شما باید حداقل 6 حرف باشد.</label
						>

							  <v-form @submit.prevent="submit">
						<div>
							<ui-input
								v-model="userData.password"
								type="password"
								:minLength="4"
								required
								placeholder="رمزعبور..."
								label="رمزعبور* "
								  class="form_control_textInput mt-6"

							/>
							<ui-input
								v-model="userData.confirmPassword"
								type="password"
								:minLength="4"
								required
								placeholder="تکرار رمز عبور..."
								label="تکرار رمزعبور* "
								  class="form_control_textInput mt-8"
							/>
						</div>
						<!-- <NuxtLink to="/auth/welcome"> -->
						<button class="btn-green" @click.prevent="changePasswordHandle">
							ادامه
						</button>
							  </v-form>
						<!-- </NuxtLink> -->
					</div>
				</v-col>
			</v-row>
		</v-container>
	</v-container>
</template>

<script>
	export default {
		props: ["user", "Submit", "goToPrevious"],

		data() {
			return {
				userData: {
					password: "",
					confirmPassword: "",
				},
			};
		},
		methods: {
			async changePasswordHandle() {
				try {
					const result = await this.Submit().changePassword(
						this.user.id,
						this.userData.password,
						this.userData.confirmPassword
					);

					this.$emit("done", result.user);
					return null;
				} catch (error) {
					return null;
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>