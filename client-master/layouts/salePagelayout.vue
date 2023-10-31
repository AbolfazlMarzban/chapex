<template>
  <v-app id="inspire" style="direction: rtl; background: #f2f2f2 !important;">
    <NavbarMain />

    <!-- <v-app-bar app color="white" flat></v-app-bar> -->
    <v-container fluid id="app" style="background: #f2f2f2;min-height: 95vh;">
      <v-row
        class="justify-center"
        style="background: #f2f2f2 !important; padding-top: 10px"
      >
        <!-- <v-col lg="2" class="d-flex justify-center">   
          <img src="../assets/img/Chapex.png" alt="" class="logopic" />
        </v-col>  -->
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" md="12" lg="7" xl="7" class="d-flex justify-center">
          <div class="all-main">
            <div class="new-main">
              <router-view></router-view>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <FooterMain class="salePageMainFooter"/> -->
    <sale-page-footer />

  </v-app>
</template>

<script>
import "../assets/style/layout/mainOrg.scss"
export default {

};
</script>
<style lang="scss" src="../assets/style/auth/auth.scss">
</style>
