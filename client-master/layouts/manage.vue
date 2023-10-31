<template>
  <v-app id="inspire" style="direction: rtl">
    <!-- <v-app-bar app color="white" flat></v-app-bar> -->

    <v-main class="manage_main">
      <v-container fluid>
        <v-row class="mt-3">
          <!-- <v-col cols="12" class="profile-page-desktop">
            <Navbar class="mb-0" />
          </v-col> -->
          <v-col cols="sm-12" md="2" class="pt-0">
            <ManageSideMenu />
          </v-col>
          <v-col cols="sm-12" md="10">
            <!-- <v-row>
              <div class="user-title">
                <i class="fa fa-user d-none" aria-hidden="true"></i>
                <img src="/user.jpg" class="img-fluid" title="userimage" />
                <span class="name">محمد حسین جابری &nbsp; | &nbsp;</span>
                <span class="company">شرکت نهروان خدمات</span>
              </div>
            </v-row>-->
            <!--End User Title-->

            <!--Start Root & srch-icons -->
            <div class="root">
              <v-row>
                <v-col cols="7">
                  <div class="breadcrumb">
                    <ui-icon icon="home" class="icons" />
                    
                    <span class="root-1">پنل مدیریت > داشبورد ></span><span class="root-2"> مدیریت مشتری  </span>
                  </div>
                </v-col>

                <v-col cols="5" class="col-5 text-left">
                  <!-- <div class="srch-icons">
                    <ul>
                      <li>
                        <input type="text" class="txtSrch" placeholder="جستجو" />
                      </li>&nbsp;&nbsp;
                      <ui-icon icon="desktop" class="icons" />
                      <ui-icon icon="bell" class="icons" />
                      <li>
                        <ui-icon icon="envelope-open" class="icons" />
                      </li>
                      <li>
                        <ui-icon icon="print" class="icons" />
                      </li>
                      <li>
                        <a href="customer-management.html">
                          <ui-icon icon="arrow-left" class="icons" />
                        </a>
                      </li>
                    </ul>
                  </div> -->
                  <div class="srch-icons">
                    <ul>
                      <li class="d-none">
                        <router-link
                          to="/adminLogin"
                          tag="span"
                          exact
                          :style="{ cursor: 'pointer' }"
                        >
                          <v-icon class="icons"
                            >mdi-account-convert-outline</v-icon
                          >
                        </router-link>
                      </li>
                      <li>
                        <v-icon class="icons" v-on:click="isSearch = !isSearch">
                          mdi-cloud-search-outline
                        </v-icon>
                      </li>
                      <li>
                        <v-icon class="icons">mdi-monitor</v-icon>
                      </li>
                      <li>
                        <v-icon class="icons">mdi-bell-ring-outline</v-icon>
                      </li>
                      <li>
                        <v-icon class="icons"
                          >mdi-comment-account-outline</v-icon
                        >
                      </li>
                      <li>
                        <v-icon class="icons">mdi-printer</v-icon>
                      </li>

                      <li>
                        <router-link
                          to="/uindex"
                          tag="span"
                          exact
                          :style="{ cursor: 'pointer' }"
                        >
                          <v-icon to="/Newproduct" class="icons"
                            >mdi-earth</v-icon
                          >
                        </router-link>
                      </li>

                      <li>
                        <router-link
                          to="/"
                          tag="span"
                          exact
                          :style="{ cursor: 'pointer' }"
                        >
                          <v-icon class="icons"
                            >mdi-arrow-left-bold-outline</v-icon
                          >
                        </router-link>
                      </li>
                    </ul>
                  </div>

                  <!-- Start Search Block -->

                  <!-- End Search Block -->
                </v-col>
              </v-row>
              <v-col cols="12" class="isSearch" v-if="isSearch">
                <input type="text" class="txtSrch" placeholder="جستجو" />
              </v-col>
            </div>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      isSearch: false,
    };
  },
};
</script>
<style lang="scss" src="../assets/style/auth/auth.scss">
</style>