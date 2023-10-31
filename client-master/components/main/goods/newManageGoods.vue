<template>
  <div>
    <ui-header-manager
      :title="headerManager.title"
      :Buttons="headerManager.buttons"
      :status="headerManager.status"
      @insert="insert"
      @delete="deleted"
      @copy="copy"
    />               

    <v-card color="basil" class="product_form_container">
      <v-row>
        <v-col cols="12" class="pr-10 py-5 d-flex justify-center">
        </v-col>
        <v-spacer />
      </v-row>
    </v-card>
    <ui-abol-table :tableData="abolData" :title="headerManager.title" @select="select"></ui-abol-table>
    <goods-copy
      :selected="selected"
      :showCopyDialog="showCopyDialog"
      @hiddenDialog="doHiddenDialog"
      @copied="copied"
    ></goods-copy>
    <GoodsCancelTab
      @cancelTabDialog="cancelTabDialog"
      :data="form.data"
      @hiddenDialog="doHiddenDialog"
      :showTabDialog="showTabDialog"
    />
    <GoodsCancel
      @cancelProcessDialog="cancelProcessDialog"
      @hiddenDialog="doHiddenDialog"
      :showDialog="showDialog"
      :data="form.data"
    />
    <GoodsDelete
      @deleteItemFromTable="deleteItemFromTable"
      @hiddenDialog="doHiddenDialog"
      :data="form.data"
      :showDeleteDialog="showDeleteDialog"
      :selected="selected"
    />
    <GoodsDetail
      v-if="showCommentDialog"
      :goodsInfo="goodsCommentDialog"
      @cancelProcessDialog="cancelProcessDialog"
      @hiddenDialog="showCommentDialog = !showCommentDialog"
    />

    <GoodsPrice
      v-if="showPriceDialog"
      :goodsInfo="goodsPriceDialog"
      @cancelProcessDialog="cancelProcessDialog"
      @hiddenDialog="showPriceDialog = !showPriceDialog"
    />

    <GoodsStock
      v-if="showStockDialog"
      :goodsInfo="goodsStockDialog"
      @cancelProcessDialog="cancelProcessDialog"
      @hiddenDialog="showStockDialog = !showStockDialog"
    />
  </div>
</template>
  
  <script>
  import goodsMixin from "./_mixins/goodsMixin";
  import variables from "./_mixins/variablesGoods";
  import TableMixins from "../../../plugins/mixins/table/table";
  import "../../../assets/style/goods/goods.scss";
  import "../../../assets/style/tableHeaders/tableHeaders.scss";
  import GoodsTable from "./goodsections/goodsTable.vue"
  export default {
    mixins: [goodsMixin, variables, TableMixins],
    components:{ GoodsTable},
    mounted() {
      this.headerManager.status = "start";
      this.updateTable();
    },
    data() {
      return {
        tab: 0,
        showDialog: false,
        json_data: [],
        showDeleteDialog: false,
        showCommentDialog: false,
        showPriceDialog: false,
        showStockDialog: false,   
        selectedRowData: "",
        showTabDialog: false,
        goodsCommentDialog: "",
        goodsPriceDialog: "",
        goodsStockDialog: "",
        selected: [],
        min: 0,
        max: 100000000,                       
        priceRange: [0, 100000000],
        dateRange: [],
        prodTypes: [],
        prodGroups: [],
        secondTable: [],
        advDefaults:[],
        copyItem: null,
        showCopyDialog: false,
        showTableBuilder: false,
        showFilterBuilder: false,
        showSearchBox: false,
        customizedHeaders: [],
        customizedShow: false,
        customeUpdate: false,
        saveT: false,
        abolData : {}
      };
    },
    computed: {
      currentDefaultID() {
        const breadcrumbs = this.breadcrumb.values;
        if (breadcrumbs.length > 1) {
          return breadcrumbs[breadcrumbs.length - 1].TGO_FID;
        }
        return 0;
      }
    },
    methods: {
      excelJson(array){
        this.json_data = array
      },
      saveTable(){
        this.saveT = !this.saveT
      },
      newTable(value){
        // console.log("newTable", value)
        this.showTableBuilder = false
        this.customizedHeaders = value
        this.customizedShow = true
        this.table.show = false
      },
      select(value){
        this.selected = value
        // console.log("selected", this.selected)
      },
      async copied(){
        await this.updateTable();
        this.showCopyDialog = false
        this.customeUpdate= !this.customeUpdate
        this.selected = []
      },
       copy() {
        this.showCopyDialog = true
        
      },
      async deleteShit() {
        let deletShit = this.table.data[21].TGO_FID;
        console.log(deletShit);
        const result = await this.Submit("delete", deletShit);
        if (result) {
          this.updateTable();
        }
      },
      async openTab(id) {
        this.headerManager.status = "show";
        this.form.readonly = true;
        const result = await this.getShow(id);
        // console.log("mygoodresult", result);

        this.form.data = result.form;
        this.defaults = result.defaults;
        this.form.show = true;
        this.table.show = false;
      },
      async insert() {
        this.headerManager.status = "insert";
        const result = await this.getInit();
        // console.log("insert", result);
        this.form.data = result.data.form;
        this.defaults = result.data.defaults;
        this.$nuxt.$options.router.push({ path: "/admin/goods/insert" })
        this.form.show = true;
        this.customizedShow = false
        this.form.readonly = false
        this.table.show = false;
      },
    
      async show(row) {
        this.headerManager.status = "show";
        this.form.readonly = true;
        const result = await this.getShow(row.TGO_FID);
        this.form.data = result.form;
        this.defaults = result.defaults;
        this.form.show = true;
        this.table.show = false;
      },
  
      openCancelDialog() {
        if (this.headerManager.status == "edit") {
          this.showTabDialog = true;
        } else if (this.headerManager.status == "show") {
          this.showDialog = false;
          this.headerManager.status = "start";
          this.form.show = false;
          this.table.show = true;
        } else if (this.headerManager.status == "start") {
          this.showTabDialog = false;
          this.showDialog = false;
        } else {
          this.headerManager.status = "start";
          this.showDialog = false;
          this.cancelTab();
        }
      },
  
      doHiddenDialog() {
        this.showDialog = false;
        this.showCopyDialog = false;
        this.showcommentDialog = false;
        this.showPriceDialog = false;
        this.showDeleteDialog = false;
        this.showTabDialog = false;
        this.form.readonly = false;
      },
      cancelProcessDialog() {
        this.showDialog = !this.showDialog;
        this.headerManager.status = "start";
        this.table.show = true;
        this.form.show = false;
      },
      async cancelTabDialog() {
        const result = await this.Submit(
          this.headerManager.status,
          this.form.data
        );
        if (result) {
          this.showTabDialog = !this.showTabDialog;
          this.form.show = false;
          this.table.show = true;
          this.form.readonly = true;
          this.headerManager.status = "start";
        }
      },
      cancelTab() {
          this.form.show = false;
          this.table.show = true;
          this.form.readonly = false;
          this.headerManager.status = "start";
      },
      async addToBreadcrumb(row) {
        this.headerManager.status = "show";
        this.form.readonly = true;
        const result = await this.getShow(row.TGO_FID);
        this.form.data = result.form;
        this.defaults = result.defaults;
        this.form.show = true;
        this.table.show = false;
      },
  
      async deleteItemFromTable() {
        this.showDeleteDialog = false;
        this.headerManager.status = "start";
        for(var i=0; i < this.selected.length; i++){
          const result = await this.Submit("delete", this.selected[i].TGO_FID);
          if (result) {
          this.updateTable();
        }
        }
       this.selected = []
       this.customeUpdate = !this.customeUpdate
      },
  
      commentDialog(row) {
        this.goodsCommentDialog = row;
        this.showCommentDialog = !this.showCommentDialog;
      },
  
      priceDialog(row) {
        this.goodsPriceDialog = row;
        this.showPriceDialog = !this.showPriceDialog;
      },
  
      stockDialog(row) {
        this.goodsStockDialog = row;
        this.showStockDialog = !this.showStockDialog;
      },
  
      update() {
        this.headerManager.status = "edit";
        this.form.readonly = false;
        this.customeUpdate = !this.customeUpdate
      },
      async deleted() {
        this.showDeleteDialog = true;
      },
      async submit() {
        console.log("insert", this.form.data)
        const result = await this.Submit(
          this.headerManager.status,
          this.form.data
        );
        if (result) {
          this.headerManager.status = "start";
          await this.updateTable();
          this.form.show = false;
          this.table.show = true;
          this.form.readonly = true;
          this.customeUpdate = !this.customeUpdate

        }
      },
      cancel() {
        if (this.headerManager.status == "edit") {
          this.showDialog = true;
        } else if (this.headerManager.status == "show") {
          this.form.show = false;
          this.table.show = true;
          this.form.readonly = false;
          this.headerManager.status = "start";
        } else {
          this.form.show = false;
          this.table.show = true;
          this.form.readonly = false;
          this.headerManager.status = "start";
        }
      },
      async updateTable() {
        const a = this.$store.getters["login/getUserData"]();
        // console.log('user',a.TU_FID)
        const result = await this.getTable();
        console.log("result", result); 
        this.abolData = result.data
        this.advDefaults = result.data.defaults
        const groupResult = await this.getSecondTable(272);
        this.secondTable = groupResult.table;
        this.table.data = result.data.table;   
        this.prodGroups = this.secondTable.map(myFunction);
        function myFunction(item) {
          return item.TD_FName;
        }
        this.prodTypes = this.table.data.map( (item)=> {
          return item.TGO_FID_TypeName
        } )
      }
    },
  };
  </script>
  
  <style lang="scss" src="../../../assets/style/formsStyle/form.scss">
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
<style lang="scss">
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
</style>
  