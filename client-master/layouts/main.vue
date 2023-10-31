<template>
  <v-app id="inspire" style="direction: rtl;">
    <!-- <v-app-bar app color="white" flat></v-app-bar> -->
    <v-container fluid id="app" class="pa-0 ma-0">
            <NavbarMain />
            <router-view></router-view>
            <FooterMain />
    </v-container>
      </v-app>
</template>   

<script>
import "../assets/style/layout/main.scss"
export default {

};
</script>
<style lang="scss" src="../assets/style/auth/auth.scss">
</style>
