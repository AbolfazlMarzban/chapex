<template>
  <v-col cols="12" style="max-height: 6vh;">
    <v-row>
      <v-col cols="3" xl="1" lg="1" md="1" sm="1" class="d-flex align-center justify-end">
        <v-btn icon color="#016670" depressed class="d-xl-none d-lg-none d-md-none d-sm-none d-block"
          @click="showMobileMenu = !showMobileMenu">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-navigation-drawer absolute temporary right v-model="showMobileMenu">
          <ul v-if="showMobileMenu" class="burger-menu" style="width: 100%;top: 10px;">
            <li v-for="(item, index) in menu" :key="index">
              <span class="pl-2">{{ item[0].TD_FName }}</span>
              <v-icon>mdi-chevron-down</v-icon>

              <ul class="burger-drop-down">
                <li v-for="child in item[0].children" :key="child.TD_FID" class="text-center">

                  <router-link :to="`/category/${child.TD_FCaption}`">{{ child.TD_FName }}</router-link>

                </li>
              </ul>
              <hr class="py-0 my-1">

            </li>
          </ul>
        </v-navigation-drawer>

        <router-link to="/">
          <v-icon style="color: #016670">mdi-home</v-icon>
        </router-link>
      </v-col>
      <v-col xl="2" lg="3" md="4" sm="4" cols="3" class="d-flex align-center mr-0 pr-0">
        <img src="../../../../assets/img/Chapex.png" alt="" class="headerlogo" />
      </v-col>
      <v-col xl="6" lg="4" md="2" sm="2" cols="1" class="d-flex justify-center align-center">
        <v-btn icon color="#016670" depressed class="d-xl-none d-lg-none d-md-block d-sm-block d-none"
          @click="showMenu = !showMenu">
          <v-icon>mdi-microsoft-xbox-controller-menu</v-icon>
        </v-btn>
        <ul v-if="showMenu" class="burger-menu">
          <li v-for="(item, index) in menu" :key="index">
            <span class="pl-2">{{ item[0].TD_FName }}</span>
            <v-icon>mdi-chevron-down</v-icon>
            <ul class="burger-drop-down">
              <li v-for="child in item[0].children" :key="child.TD_FID" class="text-center">
                <router-link :to="`/category/${child.TD_FCaption}`">{{ child.TD_FName }}</router-link>

              </li>
            </ul>
          </li>
        </ul>
        <ul class="header-menu text-center d-xl-block d-lg-block d-none" v-if="this.menu.length > 0">
          <li v-for="(item, index) in menu" :key="index">
            {{ item[0].TD_FName }} <v-icon>mdi-chevron-down</v-icon>
            <ul class="drop-down">
              <li v-for="child in item[0].children" :key="child.TD_FID">
                <router-link :to="`/category/${child.TD_FCaption}`">{{ child.TD_FName }}</router-link>

              </li>
            </ul>
          </li>
        </ul>
      </v-col>
      <v-col xl="3" lg="4" md="5" sm="5" cols="5">
        <ul class="navmenus">
          <li v-if="$nuxt.$route.params.slug && CheckUserAccess([11002])">
            <router-link v-if="salePageEdit()" :to="`/admin/salePageManage/contentManage/${salePageId}`">
              <span class="nav-text">ویرایش صفحه فروش</span>
            </router-link>
          </li>

          <li v-if="CheckUserAccess([11002])">
            <router-link :to="'/admin/'">
              <span class="nav-text">پنل مدیریت</span>
            </router-link>
          </li>

          <li>
            <router-link to="/profile">
              <v-progress-circular v-if="isAuthenticated && profilePercent < 100" :rotate="-90" :size="28" :width="3"
                :value="profilePercent" :color="profileProgressColor">
                <v-icon style="color: #c8c5c5; font-size: 23px !important">
                  mdi-account
                </v-icon>
              </v-progress-circular>
              <v-icon v-else-if="isAuthenticated" style="color: #c8c5c5; font-size: 23px !important">
                mdi-account
              </v-icon>
              <v-icon v-else style="color: #c8c5c5; font-size: 23px !important">
                mdi-account-plus
              </v-icon>

              <span v-if="isAuthenticated" class="nav-text">{{
                User.TU_FNameFamil
              }}</span>
              <span v-else class="nav-text">ورود/عضویت</span>
            </router-link>
          </li>

          <li>
            <router-link to="/cart">
              <v-badge color="green" :content="cartItemsCount" :value="cartItemsCount" bottom>
                <v-icon style="color: #c8c5c5; font-size: 23px !important">
                  mdi-cart
                </v-icon>
              </v-badge>
              <span class="nav-text">سبد خرید</span>
            </router-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import mainNav from "../../../../plugins/mixins/navbar/mainNav";
import userSalePageMixnis from "../../sale/_mixins/userSaleMixin";

export default {
  mixins: [mainNav, userSalePageMixnis],
  data() {
    return {
      salePageId: null,
      menu: [],
      showMenu: false,
      showMobileMenu: false
    }
  },
  mounted() {
    // this.getMenu(273)
    this.getMenu()
  },
  methods: {
    async salePageEdit() {
      if (this.CheckUserAccess([11002]) && this.$nuxt.$route.name.includes('salePage')) {
        var id = await this.getSalePageId(this.$nuxt.$route.params.slug)
        if (id) {
          this.salePageId = id
          return true
        }
      }
    },
    async getMenu() {
      try {
        const response = await this.$authAxios.$get(
          '/defaults/getmenu'
        )
        if (response) {
          this.menu = response
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss">
@charset "UTF-8";

.headerlogo {
  max-width: 100px;
  width: 100%;
}

.burger-menu {
  list-style: none;
  position: absolute;
  width: max-content;
  background: white;
  top: 50px;
  border-radius: 20px;
  padding: 0px !important;
  z-index: 100;

  li {
    padding: 10px;
    color: #016670;
    border-radius: 20px;
    cursor: pointer;

    i {
      float: left;
    }

    .burger-drop-down {
      display: none;
      background: white;
      top: 0px;
      right: inherit;
      padding: 0px !important;
      border-radius: 20px;

      a {
        color: #016670;
        text-decoration: none;
      }

      li:hover {
        background: rgba(1, 102, 112, 0.1) !important;
      }
    }
  }

  li:hover {
    .burger-drop-down {
      display: block;
    }
  }
}

.header-menu {
  list-style: none;
}

.header-menu li {
  position: relative;
  display: inline;
  margin: 0px 10px;
  font-family: boldbakhtiari !important;
  cursor: pointer;
  color: #8c8c8c;

  i {
    color: #016670 !important;
  }

  .drop-down {
    z-index: 1000;
    display: none;
    position: absolute;
    background: white;
    top: 20px;
    right: 0px;
    padding: 0px;
    width: max-content;
    border-radius: 10px;
    transition: 0.5s;

    li {
      margin: 0px;
      display: block !important;
      white-space: normal;
      overflow: hidden;
      padding: 10px 30px;
      text-align: center;
      border-radius: 10px;

      a {
        color: #016670;
        text-decoration: none;
      }
    }

    li:hover {
      background: rgba(1, 102, 112, 0.1) !important;
    }
  }
}

.header-menu li:hover {
  .drop-down {
    display: block !important;
  }
}

.navmenus li {
  font-family: bakhtiari !important;
  display: inline;
  margin: 0px 10px;
}

.navmenus {
  float: left;
}

.navmenus li span {
  color: #016670;
  font-size: 14px;
}

.navmenus li:hover {
  color: #016670;
  cursor: pointer;
}

@media (max-width: 600px) {
  .navmenus {
    .nav-text {
      display: none;
    }
  }

  // .navmenus li i {
  //   font-size: 18px !important;
  // }

  .navmenus {
    padding-left: 0px !important;
  }
}
</style>