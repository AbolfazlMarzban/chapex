<template>
  <div>
    <v-row class="px-0">
      <v-col cols="12" class="mytabs px-0">

        <v-tabs v-model="tabs" class="tab-title">

          <v-tab v-if="salePageStatus.finalProduct">
            <span>راهنمای طراحی و دریافت قالب</span>
          </v-tab>

          <v-tab>
            <span>معرفی محصول</span>
          </v-tab>
        </v-tabs>


        <v-tabs-items v-model="tabs">

          <DesignTemplates v-if="salePageStatus.finalProduct" />

          <ProductContent />

        </v-tabs-items>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <LazyFormViewer :FID="salePageStatus.salePage.TPS_FIDs_PageRelation" />
      </v-col>
    </v-row>

  </div>
</template>

<script>
import ProductContent from "./bottomContent/ProductContent.vue"
import DesignTemplates from "./bottomContent/DesignTempletes.vue"
export default {
  inject: ["salePageStatus"],
  data() {
    return {
      tabs: 0
    }
  },
  components: { ProductContent, DesignTemplates }
};
</script>

<style lang="scss">
.title {
  text-align: center !important;

  h2 {
    font-size: 28px;
    font-family: boldbakhtiari !important;
  }
}

.subTitle {
  text-align: center !important;

  h3 {
    font-size: 16px;
    font-family: bakhtiari !important;
  }
}

.mytabs {
  .v-item-group {
    direction: ltr;
  }

  .v-slide-group__next,
  .v-slide-group__prev {
    min-width: 20px;
  }

  .v-tab:before {
    border-radius: 12px 12px 0px 0px;
  }
}

@media (max-width:600px) {
  .templateBox {
    height: 100px;
  }
}

.tab-title {
  .v-item-group {
    direction: unset;
  }
}

.show-more {
  span {
    letter-spacing: normal !important;
    color: #016670;
    font-family: boldbakhtiari !important;
  }
}
</style>
