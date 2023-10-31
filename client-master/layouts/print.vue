<template>
    <v-app id="inspire" style="direction: rtl;">
        <v-container fluid id="app" class="pa-0 ma-0">
            <v-row class="justify-center">
                <v-col cols="12" md="12" lg="12" xl="12"  class="main-box">
                    <router-view></router-view>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
  
<script>
import "../assets/style/layout/mainOrg.scss";
export default {};
</script>
<style lang="scss" src="../assets/style/auth/auth.scss">

</style>
  