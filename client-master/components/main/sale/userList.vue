<template>
  <div class="container">
    <div class="ucontent">
      <div class="my-hero-lg">
        <ul>
          <li v-for="item in data.data" :key="item.TPS_FID">
            <div class="my-hero-box">
              <br />
              <v-icon>mdi-email-open</v-icon>
              <div class="clr"></div>
              <div class="txt-box">
                <label>{{ item.TPS_FTitle }}</label
                ><br />
                <span>شروع قیمت از 110 هزار تومان</span>
              </div>
              <div class="clr"></div>
              <br /><br />
              <div class="btn-ord-final">
                <NuxtLink to="/salePage">محاسبه قیمت</NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import userSaleMixins from "./_mixins/userSaleMixin";

export default {
      mixins: [userSaleMixins],
data() {
    return {
     data:[]
    };
  },
  async mounted() {
    this.data= await this.getSalePage();
    console.log(this.data);
  },
  methods: {
  }

};
</script>

<style lang="scss" src="../../../assets/main/style.scss"></style>
<style lang="css" src="../../../assets/main/style.css"></style>
