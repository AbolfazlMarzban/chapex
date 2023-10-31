<template>
  <v-container :fluid="true" class="pt-0">
    <v-container :fluid="false" class="pt-0">
      <v-row>
        <v-col cols="4" class="d-none d-sm-none d-md-block d-lg-block d-xl-block"></v-col>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-0 px-5">
          <div class="first-box">
            <v-row>
              <v-col cols="6" class="py-0">
                <!-- <NuxtLink to="/auth/register"> -->
                <!-- </NuxtLink> -->
              </v-col>
              <v-col cols="6" class="py-0">
                <v-img src="/logo.png" class="img-fluid" alt="logo" title="logo" />
              </v-col>
            </v-row>
            <hr />
            <h1 class="mb-2">تعیین رمز</h1>
            <label class="d-block">رمز حساب کاربری شما باید حداقل 6 کاراکتر باشد.</label>
            <br />
            <v-form @submit.prevent="submit">
            <div>
              <ui-input
                type="password"
                required
                v-model="userData.password"
                placeholder="رمزعبور..."
                label="رمزعبور* "
                class="form_control_textInput"
                :minLength="4"
              />
              <ui-input

                placeholder="تکرار رمز عبور..."
                required
                type="password"
                v-model="userData.confirmPassword"
                label="تکرار رمزعبور* "
                class="form_control_textInput mt-8"
              />
            </div>
            <button class="btn-green" @click.prevent="sendPasswordHnadler">ادامه</button>
            </v-form>
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
    async sendPasswordHnadler() {
      const user = {
        id: this.user.id,
        password: this.userData.password,
        confirmPassword: this.userData.confirmPassword,
      };
      const result = await this.Submit().sendPasswordForRegisteration(user);
      if (result) {
        this.$emit("done", result.otherData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>