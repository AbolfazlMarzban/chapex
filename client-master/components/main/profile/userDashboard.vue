<template>
  <v-col cols="12" xl="12" lg="12">
    <v-row
      class="justify-center"
      style="max-width: fit-content; min-width: 100%;"
    >
      <v-col cols="12" class="d-flex justify-end d-xl-none d-lg-none d-md-none">
        <v-icon @click="$emit('closeComponent')">mdi-arrow-left-bold</v-icon>
      </v-col>
      <template v-for="(item, i) in navbarItem">
        <v-col
          cols="12"
          xl="2"
          lg="2"
          md="6"
          v-if="item.show && item.name != 'dashboard'"
          :key="i"
        >
          <a :href="`/profile/${item.name}`">
            <div
              class="d-flex flex-column pa-3 rounded-lg"
              style="background: white;"
            >
              <v-icon style="font-size: 40px;">
                {{ item.icon }}
              </v-icon>
              <label
                for=""
                class="text-center mt-2 fn-14 fn-bold"
                style="color: gray;"
              >
                {{ item.title }}
              </label>
            </div>
          </a>
        </v-col>
      </template>
      <v-col cols="12" xl="2" lg="2" md="6">
        <div
          class="d-flex flex-column pa-3 rounded-lg"
          @click="logout"
          style="background: white;"
        >
          <v-icon style="font-size: 40px;">
            mdi-exit-to-app
          </v-icon>
          <label for="" class="text-center mt-2 fn-14 fn-bold">
            خروج
          </label>
        </div>
      </v-col>
      <user-orders/>
    </v-row>

    <!-- <div class="text-left pl-3 d-xl-none d-lg-none d-md-none">
      <v-icon @click="$emit('closeComponent')">mdi-close-circle</v-icon>
    </div>
    <v-row class="justify-center d-xl-block d-lg-block d-md-block d-none">
      <v-col cols="12">
        <OffBox />
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" xl="4" lg="4" md="6">
        <div class="chart-label">
          <label>نمودار خرید بر اساس محصول</label>
        </div>
        <client-only>
          <PieChart :data="chartData" style="width: 100% !important" />
        </client-only>
      </v-col>
      <v-col cols="12" xl="4" lg="4" md="6">
        <div class="chart-label mt-xl-0 mt-lg-0 mt-md-0 mt-10">
          <label>نمودار خرید بر اساس محصول</label>
        </div>
        <client-only>
          <DoughnutChart :data="chartData" style="width: 100% !important" />
        </client-only>
      </v-col>
    </v-row> -->
  </v-col>
</template>

<script>
import AuthItem from "../../../plugins/mixins/navbar/authNav";

export default {
  props: ["user", "form"],
  mixins: [AuthItem],

  data() {
    return {};
  },
  computed: {
    chartData() {
      return {
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
        datasets: [
          {
            label: "",
            data: [2, 1, 16, 3, 2],
            backgroundColor: [
              "#E91E63",
              "#FFA726",
              "#FFEE58",
              "#66BB6A",
              "#2196F3"
            ],
            borderColor: "#E0E0E0",
            borderWidth: 1
          }
        ]
      };
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("login/loggout");
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss">
@charset "UTF-8";
.dashboard-diagram {
  text {
    font-size: 14px;
  }
}
.chart-label {
  text-align: center;
  label {
    color: #016670;
    font-family: boldbakhtiari !important;
    letter-spacing: normal;
  }
}
.mobile-dashboard {
  background: white;
  border-radius: 20px;
}
</style>
