<template>
    <v-col cols="12" xl="12" lg="12" md="12" class="mobile-orders">
      <v-row v-if="!showOrder">
        <v-col cols="12" class="text-left d-xl-none d-lg-none d-md-none">
          <v-icon @click="$emit('closeComponent')">mdi-close-circle</v-icon>
        </v-col>
        <v-col
          cols="12"
          xl="4"
          lg="4"
          md="4" 
          class="pt-xl-6 pt-lg-6 pt-md-6 pb-0 px-xl-1 px-lg-1 px-md-1"
        >
          <v-text-field
            outlined
            append-icon="mdi-magnify"
            label="سفارش موردنظر خود را جستجو کنید"
            rounded
            class="text-search pa-1 pt-0"
            small
            v-model="textSearch"
          ></v-text-field>
        </v-col>
        <v-col
          cols="2"
          class="
            pt-6
            pb-0
            d-xl-block d-lg-block d-md-block d-none
            px-xl-1 px-lg-1 px-md-1
          "
        >
          <v-select
            outlined
            rounded
            label="وضعیت سفارش"
            :items="orderStatus"
            class="pt-0 mt-0 select-search"
            v-model="status"
          ></v-select>
        </v-col>
        <v-col
          cols="2"
          class="
            pt-6
            pb-0
            d-xl-block d-lg-block d-md-block d-none
            px-xl-1 px-lg-1 px-md-1
          "
        >
          <v-select
            outlined
            rounded
            label="محصول"
            class="pt-0 mt-0 select-search"
            :items="orderNames"
            v-model="name"
          ></v-select>
        </v-col>
        <v-col
          cols="3"
          class="
            pt-6
            pb-0
            d-xl-block d-lg-block d-md-block d-none
            px-xl-1 px-lg-1 px-md-1
          "
        >
          <!-- <v-select
            label="کارهای دسته جمعی"
            outlined
            rounded
            :items="bulkActions"
            class="pt-0 mt-0 select-search"
            v-model="bulkList"
          ></v-select>
        </v-col>
        <v-col
          cols="1"
          class="
            pt-6
            pb-0
            d-xl-block d-lg-block d-md-block d-none
            px-xl-1 px-lg-1 px-md-1
          "
        >
          <v-btn rounded depressed color="#016670" dark class="bulk-btn"
            >اجرا</v-btn
          > -->
        </v-col>
        <v-col cols="12" class="pt-0 d-xl-block d-lg-block d-md-block d-none">
          <v-data-table
            v-model="selectedOrder"
            show-select
            item-key="orderId"
            :headers="orderTable"
            :items="myOrders"
            class="order-table"
          >
            <template v-slot:item.image="{ item }">
              <img :src="item.image" :alt="item.name" />
            </template>
            <template v-slot:item.orderDetail="{ item }">
              <v-btn
                fab
                dark
                x-small
                color="rgba(1, 102, 112, 0.8)"
                elevation="2"
                @click="showOrderForm(item)"
              >
                <v-icon dark>mdi-form-select</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row v-if="!showOrder" class="d-xl-none d-lg-none d-md-none">
        <v-col cols="6" class="py-0 pl-1">
          <v-select
            outlined
            rounded
            label="وضعیت سفارش"
            :items="orderStatus"
            class="pt-0 mt-0 select-search"
            v-model="status"
          ></v-select>
        </v-col>
        <v-col cols="6" class="py-0 pr-1">
          <v-select
            outlined
            rounded
            label="محصول"
            class="pt-0 mt-0 select-search"
            :items="orderNames"
            v-model="name"
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="!showOrder" class="d-xl-none d-lg-none d-md-none">
        <v-col cols="9" class="py-0">
          <v-select
            label="کارهای دسته جمعی"
            outlined
            rounded
            class="pt-0 mt-0 select-search"
            :items="bulkActions"
            v-model="bulkList"
          ></v-select>
        </v-col>
        <v-col cols="3" class="py-0 pr-0">
          <v-btn rounded depressed color="#016670" dark>اجرا</v-btn>
        </v-col>
      </v-row>
      <div v-if="!showOrder" class="d-xl-none d-lg-none d-md-none">
        <v-row
          class="order-item my-2"
          v-for="item in myOrders"
          :key="item.orderId"
        >
          <v-col cols="4" class="pl-0 d-flex align-center">
            <v-checkbox
              v-if="bulkList.length > 0"
              class="bulk-checklist"
            ></v-checkbox>
            <img :src="item.image" alt="" class="order-img" />
          </v-col>
          <v-col
            cols="8"
            class="pr-1 d-flex flex-column justify-center"
            @click="openOrder(item)"
          >
            <ul class="details pl-0">
              <li>
                عنوان محصول: <span>{{ item.name }}</span>
              </li>
              <li>
                شماره سفارش: <span>{{ item.orderId }}</span>
              </li>
              <li>
                وضعیت: <span>{{ item.status }}</span>
              </li>
              <li>
                تاریخ سفارش: <span>{{ item.orderDate }}</span>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
      <OrderDialog
        :show="showDetail"
        :data="orderData"
        @closeDialog="showDetail = false"
      />
      <OrderPage
        v-if="showOrder"
        :data="orderData"
        class="mobile-component animate__animated animate__fadeInUp"
        @closeOrder="closeOrder"
      />
    </v-col>
  </template>
  
  <script>
  import orders from'./orders.json'
  export default {  
  data(){
    return{
      orderStatus: ['تایید مالی', 'طراحی', 'چاپ', 'روکش', 'برش', 'دایکات', 'صحافی', 'بسته بندی', 'ارسالی'],
      textSearch: "",
      status: "",
      name: "",
      showOrder: false,
      orderData: {},
      selectedOrder: [],
      showDetail: false,
      bulkActions: ['ارسال', 'چاپ'],
      bulkList: []
    }
  },
  computed:{
    myOrders(){
      var filteredOrders = orders
      if(this.textSearch.length >0 || this.status.length > 0 || this.name.length > 0){
        filteredOrders =  orders.filter(item => item.name.includes(this.textSearch) && item.status.includes(this.status) && item.name.includes(this.name))
      } 
      // console.log(filteredOrders)
                    return filteredOrders
      },
        orderNames(){
      var names = []
      for(var i=0; i < orders.length; i++){
        names.push(orders[i].name)
      }
      return names
    },
    orderTable(){
      return[
        {
          text: 'عکس',                         
          align: 'center',
          sortable: false,
          value: 'image'
        },
        {
          text: 'عنوان محصول',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {
          text: 'شماره سفارش',
          align: 'center',
          sortable: false,
          value: 'orderId'
        },
        {
          text: 'وضعیت',
          align: 'center',
          sortable: false,
          value: 'status'
        },
        {
          text: 'تاریخ سفارش',
          align: 'center',
          sortable: false,   
          value: 'orderDate'
        },
        {
          text: 'فرم سفارش',
          align: 'center',
          sortable: false,
          value: 'orderDetail'
        }
      ]
    }
    },
    methods:{
        
    showOrderForm(item){
      this.$router.push(`/forms/${item.orderId}`)
    },
      showOrderDialog(item){
        this.showDetail = true
        this.orderData = item
      },
      openOrder(item){
        this.orderData = item
        this.showOrder = true
      },
      closeOrder(){
        console.log(  document.getElementsByClassName("mobile-orders")[0])
              
  
     document.getElementsByClassName("mobile-component")[0].classList.add("animate__fadeOutDown")
  
            setTimeout(()=>{
        this.showOrder = false
           document.getElementsByClassName("mobile-orders")[0].classList.remove("animate__fadeOutDown")
        }, 800)
      }
    },
    watch:{
      bulkList(newValue){
        if(newValue.length > 0){
         var images =  document.getElementsByClassName('order-img')
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