<template>
<v-container :fluid="true" class="pt-0">
  <v-container :fluid="false" class="pt-0">
      <v-row>
        <v-col cols="4" class="d-none d-sm-none d-md-block d-lg-block d-xl-block"></v-col>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-0 px-5">
          <div class="first-box">
            <v-row>
              <v-col cols="6" class="py-0">
                <!-- <NuxtLink to="/auth"> -->
                <ui-icon
                  icon="arrow-right"
                  class="arrow_right_icon_auth"
                  style="line-height: 45px; cursor:pointer;"
                  @click.native="goToPrevious"
                />
                <!-- </NuxtLink> -->
              </v-col>
              <v-col cols="6" class="py-0">
                <!-- <v-img src="/logo.png" class="img-fluid" alt="logo" title="logo" /> -->
                <img src="../../../assets/img/Chapex.png" alt="" class="passwordlogo">
              </v-col>
            </v-row>
            <hr />
            <h1>رمز عبور را وارد کنید.</h1>
            <br />

            <label>رمز عبور حساب کاربری خود را وارد کنید.</label>
            <br />
            <br />
            <!-- <form> -->
            <v-form @submit.prevent="submit">
              <div>
                <ui-input
                  required
                  v-model="password"
                  :minLength="4"
                  type="password"
                  class="form_control_textInput mt-0"
                  placeholder="رمزعبور"
                />
              </div>
              <p @click="redirectToForgetPassword">رمز عبور را فراموش کرده ام</p>
              <!-- <NuxtLink to="/auth/welcome"> -->
              <button class="btn-green" @click.prevent="sendPassword">ادامه</button>
            </v-form>
            <!-- </NuxtLink> -->
            <!-- </form> -->
          </div>
        </v-col>
      </v-row>
  </v-container>
  </v-container>
</template>

<script>
export default {
  props: ["Submit", "user", "goToPrevious"],
  data() {
    return {
      password: "",
    };
  },
  methods: {
    async sendPassword() {
      const result = await this.Submit().sendPasswordForAuthenticating(
        this.user.id,
        this.password
      );
      if (result) {
        this.$emit("done", result.user);
      }
    },
    redirectToForgetPassword() {
      this.$emit("changeStatus", "ConfirmForgetPassword");
    },
  },
};
</script>

<style lang="scss" src="../../../assets/style/auth/auth.scss" scoped>
</style>
