<template>
  <v-container :fluid="true" class="pt-0">
    <v-container :fluid="false" class="pt-0">
      <v-row>
        <v-col cols="4" class="d-none d-sm-none d-md-block d-lg-block d-xl-block"></v-col>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-0 px-5">
          <div class="first-box">
            <v-row>
              <v-col cols="6" class="py-0">
                <!-- <NuxtLink to="/auth/inputKey"> -->
                <ui-icon
                  icon="arrow-right"
                  class="arrow_right_icon_auth"
                  style="line-height: 45px; cursor:pointer;"
                  @click.native="goToPrevious"
                />
                <!-- </NuxtLink> -->
              </v-col>
              <v-col cols="6" class="py-0">
                <v-img src="/logo.png" class="img-fluid" alt="logo" title="logo" />
              </v-col>
            </v-row>
            <hr />
            <h1 class="my-6">کد تایید را وارد نمایید.</h1>
            <label>
              کد تایید برای شماره موبایل {{ user.username }} ارسال
              گردید.
            </label>
            <br />
            <br />
            <v-form @submit.prevent="submit">
              <div>
                <ui-input
                  type="Number"
                  class="form_control_textInput mt-0"
                  required
                  v-model="enteredCode"
                />
                <div class="d-flex">
                  <label class="text-dark d-block mb-3">ارسال کد تا {{ showTimer }} دقیقه دیگر</label>
                  <label
                    class="resendCode d-block mb-3 text-dark mr-auto"
                    @click="createNewCode"
                    v-if="time === -1"
                  >
                    <ui-icon
                      icon="redo-alt"
                      style="line-height: 45px; cursor: pointer"
                    ></ui-icon>
                    ارسال مجدد کد
                  </label>
                </div>
              </div>
              <!-- <NuxtLink to="/auth/changeKey"> -->
              <button class="btn-green" @click.prevent="sendUserPassword">ادامه</button>
            </v-form>
            <!-- </NuxtLink> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import TimerMixin from "../../../plugins/mixins/UI-mixins/timer";

export default {
  mixins: [TimerMixin],
  props: ["user", "Submit", "changeTokenValue", "goToPrevious"],

  data() {
    return {
      time: 180,
      showTimer: null,
      enteredCode: "",
    };
  },
  mounted() {
    this.Timer();
  },
  methods: {
    async sendUserPassword() {
      const result = await this.Submit().checkForgetPasswordCode(
        this.enteredCode,
        this.user.id,
        this.user.resetToken
      );
      if (result && result.valid) {
        this.$emit("done", result.user);
      }
    },
    async createNewCode() {
      this.time = 180;
      const result = await this.Submit().resetCodeToken(
        this.user.id,
        "ConfirmForgetPassword"
      );

      if (result) {
        this.changeTokenValue("resetToken", result.tokenCode);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>