<template>
    <v-row>
        <LazyAuthSideMenu class="d-xl-block d-lg-block d-md-block d-none" />
        <v-col cols="12" xl="10" lg="9" md="9">
            <UserOrder />
        </v-col>

        <!-- <LazyMobileProfile class="d-xl-none d-lg-none d-md-none d-block" :userData="userData" :defaults="defaults" /> -->
    </v-row>
</template>
  
<script>
import AuthSideMenu from '../../../../components/main/layout/AuthSideMenu.vue'
import UserOrder from '../../../../components/main/profile/sections/userOrders/UserOrder.vue';

export default {
    layout: "auth",
    middleware: ["init-auth", "is-auth"],
    components: { AuthSideMenu, UserOrder },

    async asyncData({ app, store, params }) {
        //
        try {
            let data = await app.$axios.$get("/user", {
                headers: {
                    Authorization: "Bearer " + store.getters["login/getUserData"]().token,
                },
            });

            return {
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