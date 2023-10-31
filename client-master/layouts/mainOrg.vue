<template>
  <v-app id="inspire" style="direction: rtl; background: #f2f2f2;">
    <NavbarMain />

    <v-container fluid id="app" style="min-height: 95vh;">
      <v-row
        class="justify-center"
        style="background: #f2f2f2 !important; padding-top: 10px"
      >
        <!-- <v-col
          lg="3"
          xl="3"
          md="4"
          cols="6"
          class="d-flex justify-center align-center flex-column"
        >
          <img src="../assets/img/Chapex.png" alt="" class="logopic" />
          <h1 class="titles">چاپکس نزدیک ترین چاپخانه به شما</h1>
        </v-col> -->
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" md="12" lg="7" xl="7" class="main-box">
          <router-view></router-view>
        </v-col>
        <!-- <div class="main-box pb-4">
          <router-view></router-view>
        </div> -->
      </v-row>
      <!-- <div class="all-main">
        <div class="new-main">
          <router-view></router-view>
        </div>
      </div> -->
    </v-container>
    <FooterMain />

  </v-app>
</template>

<script>
import "../assets/style/layout/mainOrg.scss";
export default {};
</script>
<style lang="scss" src="../assets/style/auth/auth.scss"></style>
<style lang="scss">
@media (min-width: 1264px) {
  .main-box {
    min-width: 1100px !important;
  }
}
@media (max-width: 600px) {
  .logopic {
    display: none !important;
  }
}
</style>
