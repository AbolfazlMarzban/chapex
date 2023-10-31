<template>
  <v-col cols="12" class="off-box my-5">
    <v-row class="justify-center">
      <v-col cols="12" xl="4" lg="4" md="4" class="pt-10 d-flex justify-center">
        <!-- <v-slider
          class="prodvalue"
          readonly
          :max="100"
          v-model="offPercent"
          thumb-label="always"
        >
          <template v-slot:thumb-label="{ value }"> {{ value }}% </template>
        </v-slider> -->
        <v-progress-circular
          :rotate="-90"
          :size="100"
          :width="15"
          :value="offPercent"
          color="#016670"
          class="d-xl-none d-lg-none d-md-none"
        >
          {{ offPercent }} %
        </v-progress-circular>
        <v-progress-circular
          :rotate="-90"
          :size="200"
          :width="15"
          :value="offPercent"
          color="#016670"
        >
          {{ offPercent }} %
        </v-progress-circular>
      </v-col>
      <v-col
        cols="12"
        xl="4"
        lg="4"
        md="4"
        class="d-xl-flex d-lg-flex d-md-flex align-center"
      >
        <div class="off-text text-center">
          مبلغ
          <p class="d-inline">256/520 <span>تومان</span></p>
          <br />
          مانده تا دریافت تخفیف 1 میلیون تومانی
          <v-divider class="d-xl-none d-lg-none d-md-none"></v-divider>
          حجم خرید در اسفند ماه
          <br />
          <p>3/500/256 <span>تومان</span></p>
        </div>
      </v-col>
    </v-row>
    <v-divider class="d-xl-block d-lg-block d-md-block d-none"></v-divider>
  </v-col>
</template>

<script>
export default {
props: [ "user", "form"],
data(){
    return{
        offPercent: 85
    }
}

}
</script>
<style lang="scss" src="~/assets/style/commentForm/CommentForm.scss"></style>
 <style lang="scss" >
@charset "UTF-8";
.off-box {
  background: white;
  border-radius: 20px;
}
.prodvalue {
  .v-slider__thumb-label {
    background: none !important;
    height: 15px;
    width: 15px;
    div {
      color: #016670;
      font-size: 14px;
    }
  }
}
.off-text {
  color: black;
  font-family: boldbakhtiari !important;
  font-size: 14px;
  p {
    color: #016670;
    font-size: 30px;
    font-family: boldbakhtiari !important;
    span {
      font-size: 10px;
      color: black;
    }
  }
}
</style>