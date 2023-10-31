<template>
  <!-- Start Top -->
  <div class="top d-none d-sm-none d-md-block d-lg-block d-xl-block">
    <div class="first-top-row">
      <ul class="pl-0">
        <li class="sh-basket">
          سبد خرید
          <ui-icon icon="shopping-cart" />
        </li>

        <NuxtLink to="/user/customer" tag="li" class="mr-right">
          <!-- <li class="mr-right"> -->
          <ui-icon icon="user" />
          {{ User.TU_FName }}
          <!-- </li> -->
        </NuxtLink>

        <li class="mr-right">
          <input type="text" placeholder="محصول موردنظرتان را جستجو کنید..." />
        </li>

        <li class="float-left">
          <NuxtLink to="/profile">
            <img src="/logo/logo.png" class="navbar-logo" alt="logo" />
          </NuxtLink>
        </li>
      </ul>
    </div>

    <hr />

    <v-row class="py-0">
      <v-col cols="10" class="pa-0 text-right">
        <div class="second-top-row">
          <ul>
            <li><ui-icon icon="align-justify" />همه محصولات</li>
            <li>
              <span class="vl-line"></span>
            </li>
            <li><ui-icon icon="sticky-note" />محصولات چاپی</li>
            <li><ui-icon icon="gift" />هدایای تبلیغاتی</li>
            <li><ui-icon icon="box" />جعبه های رستورانی</li>

            <li><ui-icon icon="shopping-bag" />ساک دستی</li>

            <li class="design-archive">
              <ui-icon icon="paint-brush" />آرشیو طراحی
            </li>
          </ul>
        </div>
      </v-col>

      <v-col cols="2" class="text-left consulting-phone">
        <span>مشاوره رایگان</span>
        <span class="grn-number">3325</span>
      </v-col>
    </v-row>
  </div>
  <!-- End Top -->
</template>

<script>
export default {};
</script>

<style lang="scss" src="../../../assets/style/auth/auth.scss">
</style>