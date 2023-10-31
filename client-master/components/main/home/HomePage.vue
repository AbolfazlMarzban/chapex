<template>
  <v-container class="px-2">

    <HomeSlider />

    <ChapexProductView />

    <ChapexDelivery />

    <ChapexTrust />

    <!-- <ChapexSpecialComments /> -->

  </v-container>
</template>

<script>
import HomeSlider from "./homeSections/HomeSlider.vue";
import ChapexProductView from "./homeSections/ChapexProductView.vue";
import ChapexDelivery from "./homeSections/ChapexDelivery.vue";
import ChapexTrust from "./homeSections/ChapexTrust.vue";
import ChapexSpecialComments from "./homeSections/ChapexSpecialComments.vue";

export default {
  components: { HomeSlider, ChapexProductView, ChapexDelivery, ChapexTrust, ChapexSpecialComments },
};
</script>

<style lang="scss" src="../../../assets/style/home/pageSaleList.scss"></style>