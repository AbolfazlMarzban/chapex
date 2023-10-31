<template>
  <v-col cols="12" xl="12" lg="12" md="12" class="mobile-orders py-xl-6 py-lg-6 py-md-6 py-2 d-flex flex-column align-center">

    <UserOrdersTableTop :searchObject="searchObject" :defaults="defaults" :orders="orders" :bulkActions="bulkActions"
      :salePages="salePages" @closeComponent="$router.push('/profile')" />

    <UserOrdersTable :orders="myOrders" @showOrderDialog="showOrderDialog" class="mt-xl-0 mt-lg-0 mt-md-0 mt-5"/>

    <UserOrdersTableMobile :orders="myOrders" :bulkList="bulkList" @openOrder="openOrderMobile" />

  </v-col>
</template>

<script>
import userProfileMixin from '../_mixins/userProfileMixin'
// import UserOrdersTableMobile from './userOrders/UserOrdersTableMobile.vue'
// import UserOrdersTableTop from './userOrders/UserOrdersTableTop.vue'
// import UserOrdersTable from './userOrders/UserOrdersTable.vue'

export default {
  mixins: [userProfileMixin],
  // components: { UserOrdersTableTop, UserOrdersTable, UserOrdersTableMobile },
  data() {
    return {
      searchObject: {
        textSearch: "",
        salePageId: 0,
        orderStatusId: 0,
      },
      showOrderMobile: false,
      orderData: {},
      showDetail: false,
      bulkActions: ['ارسال', 'چاپ'],
      bulkList: [],
      defaults: {},
      orders: [],
      steps: [],
      options: [],
    }
  },
  async mounted() {

    const result = await this.getUserOrders()
    if (result) {
      this.orders = result.table
      this.defaults = result.defaults
    }
  },
  computed: {
    myOrders() {
      var filteredOrders = this.orders
      if (this.searchObject.textSearch.length > 0) {
        filteredOrders = filteredOrders.filter(item => item.TOD_FID_GoodsName.includes(this.searchObject.textSearch))
      }
      if (this.searchObject.orderStatusId > 0) {
        filteredOrders = filteredOrders.filter(item => item.TOD_FID_LastStatus == this.searchObject.orderStatusId)
      }
      if (this.searchObject.salePageId > 0) {
        filteredOrders = filteredOrders.filter(item => item.TOD_FID_SalePage == this.searchObject.salePageId)
      }
      return filteredOrders.sort((b, a) => {
        if (a.TOD_FID < b.TOD_FID) return -1;
        if (a.TOD_FID > b.TOD_FID) return 1;
        return 0;
      })
    },
    salePages() {
      var names = []
      for (var i = 0; i < this.orders.length; i++) {
        const obj = { id: this.orders[i].TOD_FID_SalePage, value: this.orders[i].TOD_FID_SalePageName }
        names.push(obj)
      }
      return names
    },
  },
  methods: {
    showOrderDialog(item) {
      this.$router.push(`/profile/orders/${item.TOD_FID}`)
    },

    openOrderMobile(item) {
      this.$router.push(`/profile/orders/${item.TOD_FID}`)
    },
  },
  watch: {
    bulkList(newValue) {
      if (newValue.length > 0) {
        var images = document.getElementsByClassName('order-img')
        images.forEach(item => item.style.width = "70%")
      }
    }
  }



}
</script>

<style lang="scss">
@charset "UTF-8";

.mobile-orders {
  background: white;
  // padding: 20px;
  border-radius: 20px;
}

.text-search {
  .v-input__slot {
    min-height: 35px !important;
    padding: 0px 10px !important;
  }

  label {
    font-size: 14px !important;
    left: auto !important;
    top: auto !important;
  }

  input,
  input:focus {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  .v-input__append-inner {
    margin-top: 6px !important;
  }
}

.select-search {
  .v-select__selections {
    padding: 0px !important;
  }

  .v-input__slot {
    min-height: 35px !important;
    padding: 0px 10px !important;
  }

  label {
    left: auto !important;
    font-size: 14px !important;
    top: auto !important;
  }

  input,
  input:focus {
    background: none !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .v-input__append-inner {
    margin-top: 6px !important;
  }
}

.v-list-item__content {
  font-family: bakhtiari !important;
}

.order-item {
  border: 1px solid #f2f2f2;
  border-radius: 10px;

  .details {
    font-size: 14px !important;
    color: black;

    span {
      font-family: boldbakhtiari !important;
      color: #016670 !important;
    }
  }
}

.order-table {
  .v-data-footer {
    direction: initial;
  }

  td {
    vertical-align: middle;
  }
}

.bulk-btn {
  min-width: 35px !important;
}

.bulk-checklist {
  i {
    font-size: 18px !important;
  }

  .v-input--selection-controls__input {
    margin: 0px;
    width: 20px;
  }
}

// .order-img {
//   max-width: 100%;
//   width: 75%;
// }
</style>