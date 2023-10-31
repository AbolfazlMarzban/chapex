<template>
  <v-container class="pt-0">
    <v-container class="pt-0">
      <v-row>
        <v-col cols="4" class="d-none d-sm-none d-md-block d-lg-block d-xl-block"></v-col>
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pt-0 px-5">
          <div class="welcome-box">
            <v-progress-circular v-if="profilePercent < 100" :rotate="-90" :size="100" :width="15" :value="profilePercent"
              :color="profileProgressColor">
              <span style="position: absolute; font-size: 24px;">{{ profilePercent }}%</span>
              <img :src="setImageUrl(User.TU_FPicAdd1, 'sm')" width="70" height="70" class="img-fluid rounded-circle"
                alt="user" title="user" />
            </v-progress-circular>
            <br />
            <br />

            <!-- <ui-button v-if="profilePercent < 100" label="تکمیل حساب کاربری" @click="goToProfile" class="welcomebtn" /> -->
            <hr />

            <img src="../../../assets/img/Chapex.png" alt="logo" title="logo" class="welcomlogo" />
            <hr />
            <img src="/printing.png" alt="Welcome" title="Welcome" />
            <br />
            <br />
            <h1>به CHAPEX خوش آمدید</h1>
            <p class="py-3">
              <br />از سفارش در میان 2000 تنوع اقلام چاپی لذت ببرید.
            </p>

            <br />
            <NuxtLink v-if="CheckUserAccess([11002])" to="/admin" tag="a" class="welcomebtntwo"> بخش مدیریت
            </NuxtLink>
            <br />
            <br />

            <ui-button :label="`مشاهده پروفایل کاربری ${timeOut}`" @click="goToProfile" class="welcomebtn" />
            <br />
            <br />

          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      timeOut: 6,
      intv: null
    }
  },
  mounted() {
    this.intv = setInterval(() => {
      this.timeOut--

      if (this.timeOut <= 0) {
        clearInterval(this.intv)
        this.$router.replace("/profile");
      }
    }, 1000)
  },
  methods: {
    goToProfile() {
      clearInterval(this.intv)
      this.$router.replace("/profile/profile");
    },
  },
};
</script>

<style lang="scss" src="../../../assets/style/auth/auth.scss" scoped></style>