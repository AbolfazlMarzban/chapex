<template>
  <v-col cols="12" xl="7" lg="7" md="7" sm="12" xs="12">
    <v-row>
      <div class="subject-block d-flex align-lg-end justify-lg-space-between align-md-end
                               justify-md-space-between justify-center align-center flex-column flex-md-row">
        <div class="align-lg-self-start align-md-self-start align-self-md-auto align-center">
          <h1 class="mr-lg-2 mr-md-2 pa-0 ma-0">
            {{ salePageStatus.salePage.TPS_FH1 }}
          </h1>
        </div>

        <div class="float-left d-flex flex-row-reverse">
          <span class="star mt-2">
            <v-rating background-color="#8C8C8C lighten-3" color="#03D589" medium readonly></v-rating>
          </span>
        </div>
      </div>

      <div cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="">
        <v-row style="width: 100%; margin: 0px">
          <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="detailbox">
            <div class="mt-3 pagedetails" v-html="salePageStatus.salePage.TPS_FDetails"></div>
          </v-col>

          <v-col cols="12" xl="12" lg="12" md="12" sm="12" xs="12" class="pt-0">
            <div v-if="salePageStatus.salePage.options">

              <UserFeatureSelector @designStatusChanged="ds => $emit('designStatusChanged', ds)"
                @reviewNeedChanged="rn => $emit('reviewNeedChanged', rn)" />

              <LazyMobilePriceTable class="d-xl-none d-lg-none d-md-none d-block" />

              <FinalPriceTiraj />

              <FinalProductMemo />
            </div>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </v-col>
</template>

<script>
import UserFeatureSelector from './MainSections/UserFeatureSelector.vue';
import FinalPriceTiraj from './MainSections/FinalPriceTiraj.vue';
import FinalProductMemo from './MainSections/FinalProductMemo.vue';

export default {
  inject: ["salePageStatus"],
  components: { UserFeatureSelector, FinalPriceTiraj, FinalProductMemo }
}
</script>
