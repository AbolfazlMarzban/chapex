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
                <v-img src="/logo.png" class="img-fluid" alt="logo" title="logo" />
              </v-col>
            </v-row>
            <hr />
            <h1 class="mb-2">کد تایید را وارد نمایید.</h1>
            <label>
              <span>حساب کاربری با شماره موبایل </span>
              <span class="mx-1">{{ user.username }}</span>
              <span>وجود ندارد</span>
            </label>
            <br />
            <br />
            <label>برای ساخت حساب جدید، کد تایید برای این شماره ارسال گردید.</label>
            <br />
            <br />
            <!-- <form> -->
            <v-form @submit.prevent="submit">
              <div>
                <ui-input
                  type="Number"
                  class="form_control_textInput"
                  required
                  :minLength="4"
                  v-model="code"
                />
                <div class="d-flex">
                  <label class="text-dark d-block mb-3">
                    ارسال مجدد کد تا
                    <span>{{ showTimer }}</span> دقیقه دیگر
                  </label>
                  <label
                    class="resendCode d-block mb-3 text-dark"
                    @click="createNewCode"
                    v-if="time === -1"
                  >
                    <i
                      class="fa fa-redo-alt"
                      aria-hidden="true"
                      style="line-height: 45px; cursor: pointer"
                    ></i>
                    ارسال مجدد کد
                  </label>
                </div>
              </div>
              <!-- <NuxtLink to="/auth/setPassword"> -->
              <button class="btn-green" @click.prevent="checkCode">ادامه</button>
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
import TimerMixin from "../../../plugins/mixins/UI-mixins/timer";
export default {
  mixins: [TimerMixin],
  props: ["user", "Submit", "changeTokenValue", "goToPrevious"],
  data() {
    return {
      time: 180,
      showTimer: 0,
      code: "",
    };
  },
  mounted() {
    this.Timer();
  },
  methods: {
    async checkCode() {
      const result = await this.Submit().CheckActiveCode(
        this.user.id,
        this.user.activeCodeToken,
        this.code
      );
      if (result && result.active) {
        this.$emit("done", result.user);
      }
    },
    
    async createNewCode() {
      this.time = 180;
      const result = await this.Submit().resetCodeToken(
        this.user.id,
        "ActivePhoneNumber"
      );

      if (result) {
        this.changeTokenValue("activeCodeToken", result.tokenCode);
      }
    },
  },
};
</script>

<style lang="scss" src="../../../assets/style/auth/auth.scss" scoped>
</style>