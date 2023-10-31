<template>
  <v-col cols="12" xl="5" lg="5" md="5" sm="12" xs="12" class="pa-3">
    <v-row class="d-flex justify-center" style="position: sticky; top: 5px">
      <v-col cols="12" xl="12" lg="12" md="9" sm="7" xs="12">
        <SideGallery v-if="salePageStatus.salePage.gallery" />

        <SelectedProductDetails class="d-xl-block d-lg-block d-md-block d-none" />

      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SelectedProductDetails from './SidebarSections/SelectedProductDetails.vue'
import SideGallery from "./SidebarSections/SideGallery.vue";

export default {
  inject: ["salePageStatus"],
  components: { SelectedProductDetails, SideGallery }
};
</script>

