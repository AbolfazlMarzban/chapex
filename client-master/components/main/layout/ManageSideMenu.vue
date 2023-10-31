<template>
  <div>
    <div class="right-content">
      <div class="logo">
        <v-row class="justify-center">
          <NuxtLink to="/" class="pt-2">
            <img src="/logo/logo.png" alt="logo" class="imageFluid " />
          </NuxtLink>
        </v-row>
      </div>

      <div class="user-img mt-2">
        <img :src="setImageUrl(User.TU_FPicAdd1, 'sm')" alt="user" />
        <div class="user-info">
          <label>{{ User.TU_FName }}</label>
          <br />
          <span class="user-phone-number">{{ User.TU_FMobile1 }}</span>
          <br />

          <ui-icon icon="edit" class="manage_side_menu_user_icon_edit" />

          <NuxtLink
            to="/profile"
            tag="span"
            class="user-edit"
          >
            ویرایش
            اطلاعات
          </NuxtLink>
        </div>
      </div>

      <div class="right-menu-green mt-4">
        <ul class="pl-0">
          <li v-for="(item) in navbarItem" :key="item.id">
            <div v-if="!item.children">
             <div class="item">
                <ui-icon :icon="item.icon" />
              <NuxtLink :to="item.link">{{item.title}}</NuxtLink>
             </div>
            </div>
            <div v-else>
              <div class="item">
                <ui-icon :icon="item.icon" />
              <a @click="item.show = !item.show">{{item.title}}</a>
              <ui-icon icon="caret-left" class="float-left" />
              </div>
              <v-expand-transition>
                <ul class="pr-4 pl-0 manage_side_menu_subItem" v-if="item.show">
                  <li v-for="(subItem) in item.children" :key="subItem.id">
                    <ui-icon :icon="subItem.icon" />
                    <NuxtLink :to="subItem.link"> - {{ subItem.title }}</NuxtLink>
                  </li>
                </ul>
              </v-expand-transition>
            </div>
          </li>
        </ul>

        <hr />

        <v-row class="row justify-center">
          <ui-icon icon="sign-out-alt" class="ml-1 mt-1 text-white" />
          <label class="text-white" @click="logout">خروج</label>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import manageNavItem from "../../../plugins/mixins/navbar/manageNav";
export default {
  mixins: [manageNavItem],

  methods: {
    logout() { 
      this.$store.dispatch("login/loggout");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" src="../../../assets/style/layout/manage.scss">
</style>