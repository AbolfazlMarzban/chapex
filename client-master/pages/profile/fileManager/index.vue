<template>
  <v-row>
      <LazyAuthSideMenu class="d-xl-block d-lg-block d-md-block d-none" />
      <v-col cols="12" xl="10" lg="9" md="9">
          <!-- <component :is="component" :userData="userData" :defaults="defaults" class="d-xl-block d-lg-block d-md-block d-none" /> -->
          <library :isAdmin="false" />
          <!-- class="d-xl-block d-lg-block d-md-block d-none" -->
      </v-col>

      <!-- <LazyMobileProfile class="d-xl-none d-lg-none d-md-none d-block" :userData="userData" :defaults="defaults" /> -->
  </v-row>
</template>

<script>
// import Dashboard from '../../components/main/profile/userDashboard.vue'
// import Profile from '../../components/main/profile/Profile.vue'
// import Orders from '../../components/main/profile/sections/userOrders.vue'
// import profileForms from '../../components/main/profile/profileForms.vue'
// import MobileProfile from '../../components/main/profile/mobileProfile.vue'
// import deliveryProfile from '../../components/main/profile/deliveryProfile.vue'
// // import userLibrary from '../../components/main/library/userLibrary.vue'
// import AuthSideMenu from '../../components/main/layout/AuthSideMenu.vue'

export default {
  layout: "auth",
  middleware: ["init-auth", "is-auth"],
  // components: {
  //     Dashboard,
  //     Profile,
  //     Orders,
  //     MobileProfile,
  //     deliveryProfile,
  //     AuthSideMenu
  // },
  mounted() {
      this.switchPanel(this.componentName)
  },
  data() {
      return {
          component: null
      }
  },
  methods: {
      switchPanel(name) {
          // if (name == "dashboard") {
          //     this.component = Dashboard
          // } else if (name == "profile") {
          //     this.component = Profile
          // } else if (name == "orders") {
          //     this.component = Orders
          // } 
          // // else if (name == "fileManager") {
          // //     this.component = userLibrary
          // // }
          //  else if (name == "orderForms") {
          //     this.component = profileForms
          // } else if (name == "delivery") {
          //     this.component = deliveryProfile
          // }
          // else { this.component = Dashboard }
      }
  },
  async asyncData({ app, store, params }) {
      //
      try {
          let data = await app.$axios.$get("/user", {
              headers: {
                  Authorization: "Bearer " + store.getters["login/getUserData"]().token,
              },
          });
          return {
              componentName: params.slug,
              userData: data.user,
              defaults: data.defaults,
          };
      } catch (error) {
          console.log(error);
      }
  },
};
</script>

<style lang="scss" scoped></style>