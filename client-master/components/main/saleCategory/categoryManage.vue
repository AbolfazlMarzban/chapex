<template>
    <div>
      <ui-header-manager
        :title="headerManager.title"
        :Buttons="headerManager.buttons"
        :status="headerManager.status"
      />               
  
      <v-card color="basil" class="product_form_container">
        <v-row>
          <v-col cols="12" class="pr-10 py-5 d-flex justify-center">
          </v-col>
          <v-spacer />
        </v-row>
      </v-card>
      <!-- <ui-abol-table :tableData="abolData" :pattern="'/orders/'" :title="headerManager.title" @select="select"></ui-abol-table> -->
      <v-data-table :items="abolData" :headers="headers">
        <template v-slot:item.TD_FName="{item}">
          <NuxtLink style="cursor: pointer; color: #016670"
        class="pa-1 px-2 font-weight-black"
        :to="`/admin/salePageCategory/${item.TD_FID}`">
            {{ item.TD_FName }}
          </NuxtLink>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script>
  export default {
      mounted() {
        this.headerManager.status = "start";
       this.updateTable();
      },
      data(){
          return{
          abolData: [],
          selected: [],
  
          headerManager: {
          show: true,
          status: "start",
          title: {
            fa: "مدیریت محتوای صفحات دسته بندی",
            en: "manage salePage categories",
            icon: "mdi-close"
          },
          buttons: {
  
          }
        },
        headers:[
          {
            text: 'اسم صفحه',
            value: 'TD_FName',
            align: 'center',
            sortable: true
          },
          {
            text: 'لینک',
            value: 'TD_FCaption',
            align: 'center',
            sortable: true
          },
          {
            text: 'کد صفحه',
            value: 'TD_FID',
            align: 'center',
            sortable: true
          }, 
          {
            text: 'تاریخ',
            value: 'TD_FDateReg',
            align: 'center',
            sortable: true
          }
        ]
          }
      },
      methods:{
      async  updateTable(){
          try{
            const result = await this.$authAxios.$get(`/defaults/getmenu/`)
            // console.log('result', result)
            // this.abolData = result
            if(result){
              result.forEach(item => {
                for(var i=0; i < item[0].children.length; i++){
                  this.abolData.push(item[0].children[i])
                }
              })
            }
            console.log('abol', this.abolData)
          }catch(error){
            console.log(error)
          }
        },
        select(value){
          this.selected = value
          // console.log("selected", this.selected)
        },
      }
  }
  </script>
  
  <style lang="scss" src="../../../assets/style/formsStyle/form.scss">
  .export-list {
    .v-list-item {
      height: 35px !important;
      min-height: 35px !important;
    }
  }
  .export-list-item {
    cursor: pointer;
  }
  .export-list-item:hover {
    background: lightgray;
  }
  .goodsTableHeader {
    .table {
      border-radius: 0px !important;
    }
  
    table {
      thead {
        tr {
          th:nth-child(1) {
            width: 60px;
          }
  
          th:nth-child(2) {
            width: 60px;
          }
  
          th:nth-child(3) {
            width: 150px;
          }
  
          th:nth-child(4) {
            width: 160px;
          }
  
          th:nth-child(5) {
            width: 400px;
          }
  
          th:nth-child(6) {
            width: 60px;
          }
  
          th:nth-child(7) {
            width: 120px;
          }
  
          th:nth-child(8) {
            width: 150px;
          }
  
          th:nth-child(9) {
            width: 50px;
          }
  
          th:nth-child(10) {
            width: 25px;
          }
        }
      }
    }
  }
  </style>
  <style lang="scss" src="../../../assets/style/goods/goods.scss"></style>