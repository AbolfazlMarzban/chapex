<template>
    <v-row style="width: 100%;" class="pa-xl-2 pa-lg-2 pa-md-2 align-center">
        <v-col cols="12" class="text-left d-xl-none d-lg-none d-md-none pb-0" v-if="$router.history.current.path != '/profile/dashboard'">
          <v-icon @click="$emit('closeComponent')">mdi-close-circle</v-icon>
        </v-col>
        <v-col xl="4" lg="4" md="4" cols="12" :class="`py-1 ${$router.history.current.path == '/profile/dashboard' ? `mt-1` : ``}`">
            <!-- <v-text-field outlined append-icon="mdi-magnify" label="سفارش موردنظر خود را جستجو کنید" rounded
                class="text-search pa-1 pt-0" small v-model="searchObject.textSearch"></v-text-field> -->
                <div
              style="background: #F0F3F4;"
              class="rounded-lg d-flex align-center"
            >
              <input
                type="text"
                placeholder="سفارش موردنظر خود را جستجو کنید"
                style="text-align:right; border: none !important; font-size: 12px; width: 100%;"
                v-model="searchObject.textSearch"
                class="search-orders-text"
              />
              <v-icon class="pa-2">
                mdi-magnify
              </v-icon>
            </div>
        </v-col>
        <v-col xl="2" lg="2" md="2" cols="6" class="py-1">
            <!-- <v-select outlined rounded label="وضعیت سفارش" :items="defaults[245]" class="pt-0 mt-0 select-search"
                item-text="TD_FName" item-value="TD_FID" v-model="searchObject.orderStatusId"></v-select> -->
                <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center pa-1"
              >
                <label style="font-size: 12px;" for="">وضعیت سفارش</label>
                <v-select
                  v-model="searchObject.orderStatusId"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="defaults[245]"
                  item-text="TD_FName"
                  item-value="TD_FID"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
        </v-col>
        <v-col xl="2" lg="2" md="2" cols="6" class="py-1">
            <!-- <v-select outlined rounded label="محصول" class="pt-0 mt-0 select-search" :items="salePages" item-text="value"
                item-value="id" v-model="searchObject.salePageId"></v-select> -->
                <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center pa-1"
              >
                <label style="font-size: 12px;" for="">محصول</label>
                <v-select
                  v-model="searchObject.salePageId"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="salePages"
                  item-text="value"
                  item-value="id"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
        </v-col>
        <v-col xl="3" lg="3" md="3" sm="10" cols="8" class="py-1">
            <!-- <v-select label="کارهای دسته جمعی" outlined rounded :items="bulkActions" class="pt-0 mt-0 select-search"
                v-model="bulkList"></v-select> -->
                <div
                style="background: #F0F3F4;"
                class="rounded-lg d-flex align-center pa-1"
              >
                <label style="font-size: 12px;" for="">کارهای دسته جمعی</label>
                <v-select
                  v-model="bulkList"
                  dense
                  style="width: 43%;"
                  class="pt-0 mt-0 typeFilesBox"
                  :items="bulkActions"
                ></v-select>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
        </v-col>
        <v-col xl="1" lg="1" md="1" sm="2" cols="4" class="py-1">
            <v-btn rounded depressed color="#016670" dark class="bulk-btn">اجرا</v-btn>
        </v-col>
    </v-row>
</template>

<script>

export default {
    props: ["searchObject", "defaults", "salePages", "orders", "bulkActions", "bulkList"],
}
</script>

<style lang="scss">
.text-search{
    .v-text-field__details{
        display: none;
    }
}
.select-search{
    .v-text-field__details{
        display: none;
    }
}
.typeFilesBox {
    input {
      border: none;
      outline: none;
    }
    ::before {
      display: none !important;
    }
    .v-text-field__details {
      display: none;
    }
  }
</style>