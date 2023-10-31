<template>
  <v-col cols="12" xl="2" lg="3" md="3" class="pt-0 mrg-top-10">
    <div class="right-menu">
      <div class="user">
        <v-row class="my-0 pb-2">
          <v-col cols="6" class="text-left py-0">
            <v-progress-circular :rotate="-90" :size="90" :width="10" :value="profilePercent"
              :color="profileProgressColor">
              <span  v-if="profilePercent < 100" style="position: absolute; font-size: 24px;">{{ profilePercent }}%</span>
              <img :src="setImageUrl(User.TU_FPicAdd1, 'sm')" width="70" height="70" class="img-fluid rounded-circle"
                alt="user" title="user" />
            </v-progress-circular>
          </v-col>
          <v-col cols="6" class="text-right py-0 px-0 mt-3">
            <label>{{ User.TU_FNameFamil }}</label>
            <br />
            <span>{{ User.TU_FUserName }}</span>
          </v-col>
        </v-row>

        <v-row class="mt-3" v-if="profilePercent < 100">
          <v-col cols="12" class="text-center">
            <div>جهت ثبت سفارش پروفایل خود را تکمیل نمایید</div>
            <v-btn depressed block rounded color="red" dark class="" href="/profile/profile">تکمیل پروفایل</v-btn>
          </v-col>
        </v-row>
      </div>

      <div class="list-menu">
        <hr />
        <ul>
          <li v-for="item in navbarItem" :key="item.id" @click="$emit('switchPanel', item.name)">
            <a v-if="item.show" :href="`/profile/${item.name}`">
              <div>
                <v-icon>{{ item.icon }}</v-icon>
                <span>{{ item.title }}</span>
              </div>
            </a>
          </li>
          <hr />
          <li>
            <ui-icon icon="sign-out-alt" />
            <a @click="logout">خروج</a>
          </li>
        </ul>
      </div>

      <!--Start Advertisement Banner-->
      <!-- <div class="adver-banner">محل بنر تبلیغاتی</div> -->
      <!--End Advertisement Banner-->
    </div>
  </v-col>
</template>

<script>
import AuthItem from "../../../plugins/mixins/navbar/authNav";
export default {
  mixins: [AuthItem],
  data() {
    return {
      showItem: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("login/loggout");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss">
@charset "UTF-8";

.list-menu {
  li {
    border-radius: 10px;

    span,
    a {
      color: black;
      font-size: 14px;
    }
  }

  li:hover {
    background: #d9d9d9 !important;

    span,
    a {
      font-family: boldbakhtiari !important;
    }
  }
}
</style>