<template>
  <div>
    <v-row class="justify-center">
      <v-col lg="12" style="text-align: center">
        <LazyHomePage style="justify-content: center" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HomePage from '../components/main/home/HomePage.vue';

export default {
  layout: "mainOrg",
  components: [HomePage],
  middleware: ["init-auth", "init-cart"],
  mounted() {
    const a = this.$store.getters["login/getUserData"]();
    // console.log("user : ", a);
  }
};
</script>

<style lang="scss">
.hometitles {
  font-size: 20px;
  margin: 20px;
  color: #016670;
  font-weight: bold;
}

.searchbox {
  padding: 10px !important;
  padding-right: 50px !important;
  background: white !important;
  border: none;
  box-shadow: 0px 0px 30px #d4d4d4;
  width: 100%;
}

.searchbtn {
  float: right;
  margin-top: -35px;
  margin-right: 10px;
}

.prodbox {
  border: 1px solid #dedede;
  border-radius: 40px;
  padding: 30px;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-items: center;
}

.prodtitle {
  background: white;
  width: 30%;
  padding: 10px;
  border-radius: 50px;
  margin-top: -70px;
}

.prodtitle h2 {
  color: #016670;
  font-size: 18px;
}

.prodtitle h3 {
  color: #930149;
  font-size: 16px;
}

@media (max-width: 600px) {
  .titles {
    display: none !important;
  }

  .prodtitle {
    width: 80%;
  }

  .prodbox {
    padding: 0px;
  }
}</style>
