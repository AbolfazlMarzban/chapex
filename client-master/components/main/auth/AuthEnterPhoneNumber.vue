<template>
  <v-container :fluid="true" class="pt-0">
    <v-container :fluid="false" class="pt-0">
      <v-row>
        <v-col cols="4" class="d-none d-sm-none d-md-block d-lg-block d-xl-block"></v-col>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-0 px-5">
          <div class="first-box">
            <!-- <v-img src="../../../assets/img/Chapex.png" class="img-fluid" alt="logo" title="logo" /> -->
            <div style="text-align: center">
              <img src="../../../assets/img/Chapex.png" alt="" class="authlogo">
            </div>
            <hr />
            <h1>ورود / ثبت نام</h1>
            <label class="py-4 d-block">شماره موبایل خود را وارد کنید.</label>
            <!-- <form > -->
            <v-form @submit.prevent="submit">
              <div>
                <ui-input
                  class="form_control_textInput mt-0 pb-1"
                  v-model="userNumber"
                  required
                  :minLength="11"
                  :maxLength="11"
                />
              </div>
              <!-- <button type="submit" class="btn-green">ورود به CHAPEX</button> -->
              <!-- <NuxtLink to="/auth/register"> -->
              <button class="btn-green" @click.prevent="sendUserNumberHandler">ورود به CHAPEX</button>

              <!-- </NuxtLink> -->
            </v-form>
            <br />
            <p>
              با ورود و ثبت نام در CHAPEX شما
              <a href="#">شرایط و قوانین</a> استفاده از سرویس های وب سایت CHAPEX
              و
              <a href="#">قوانین حریم خصوصی</a> آن را می پذیرید.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  props: ["Submit"],
  data() {
    return {
      userNumber: "",
    };
  },
  head() {
    return {
      title: "ورود - ثبت نام",
    };
  },
  methods: {
    async sendUserNumberHandler() {
      const result = await this.Submit().sendUserNumber(this.userNumber);
      // console.log("enterPhoneNumbre" , result)
      if (result) {
        this.$emit("done", result);
      }
    },
  },
};
</script>

<style lang="scss" src="../../../assets/style/auth/auth.scss" scoped>
</style>
