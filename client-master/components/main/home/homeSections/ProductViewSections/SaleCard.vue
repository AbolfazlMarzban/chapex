<template>
  <div>
    <a :href="'/salePage/' + salePage.TPS_FLink">
      <v-card class="mx-auto prodcard" max-width="344">
        <v-list-item three-line>
          <v-list-item-avatar size="113" color="white">
            <img v-if="salePage.picture" :src="salePage.picture.thumbnail_path"
              :alt="salePage.picture.alt" />
            <img v-else :src="salePage.TPS_IndexImage" :alt="salePage.TPS_FTitle">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              <div class="d-flex flex-column" style="text-align: start; padding-right: 10px; padding-top: 10px;">
                <label style="cursor: pointer">{{ salePage.TPS_FTitle }}</label>
                <div class="prod-action">
                  <v-icon rounded class="prodbox-icon">mdi-currency-usd</v-icon>
                  <span>محاسبه قیمت</span>
                </div>
              </div>
            </v-list-item-title>
            <v-list-item-subtitle> </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </a>
  </div>
</template>
<script>
export default {
  props: ["salePage"],
};
</script>
<style lang="scss" src="../../../../../assets/style/saleCard/saleCard.scss" scoped>
.prodpic {
  width: 100%;
}

#label {
  font-weight: bold;
  color: #016670;
}

.prodpic :hover {
  cursor: pointer;
}

label {
  font-weight: bold !important;
  font-size: 20px !important;
  color: #016670 !important;
}
</style>