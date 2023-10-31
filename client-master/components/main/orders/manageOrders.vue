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
    <ui-abol-table :tableData="abolData" :title="headerManager.title" @select="select"></ui-abol-table>
  </div>
</template>

<script>
export default {
    props: [ "state"],
    mounted() {
      // console.log('state', this.state)
      this.headerManager.status = "start";
      if(this.state == "myOrders"){
        this.headerManager.title.fa = "سفارشات من"
        this.headerManager.title.en = "My Orders"
      } else if(this.state == "allOrders"){
        this.headerManager.title.fa = " کلیه سفارشات"
        this.headerManager.title.en = "All Orders"
      } else if(this.state == "ordersArchive"){
        this.headerManager.title.fa = " بایگانی سفارشات"
        this.headerManager.title.en = "Orders Archive"
      }
     this.updateTable(this.state);
    },
    data(){
        return{
        abolData: [],
        selected: [],

        headerManager: {
        show: true,
        status: "start",
        title: {
          fa: "سفارشات",
          en: "Orders",
          icon: "mdi-close"
        },
        buttons: {

        }
      }
        }
    },
    methods:{
    async  updateTable(state){
      // console.log('state', state)
      const a = this.$store.getters["login/getUserData"]();
        console.log('user',a.TU_FID)
        try{
          const result = await this.$authAxios.$get(`/order/${state},${a.TU_FID}`)
          console.log('result', result)
          this.abolData = result
        }catch(error){
          console.log(error)
        }
      },
      select(value){
        this.selected = value
        console.log("selected", this.selected)
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