<template>
  <div>
   
    <ui-tab
      @clicked="changeEvent"
      :data="statusBar"
      :default="26001"   
      :record="table.data.length" 
      class="col-12 pa-0 mt-8"
    />   

    <CommentDialog v-if="showDialog" @updateTable="updateChangedTable" :dataDialog="dialogData" @closeDialog="showDialog = false" />

    <ui-table
      v-if="table.show"  
      class="pt-5 list_manage_customer_table"
      :data="table.data"
      :dataSchema="table.schema"
      :tableBtn="table.tableBtn"
      :checkboxDisabled="table.checkboxEnabled"
      :clearRows="table.unSelect"
      :hideCheckBoxAll="true"
      idField="TGC_FID"
      @show="show"
      @selectedRowChanged="selectedRowChanged"
      @selectedRowData="selectedRowToDeleteData"
    />
  </div>
</template>


<script>
import commentMixin from "./_mixins/commentMixins";
import variables from "./_mixins/variablesComment";
import TableMixins from "../../../plugins/mixins/table/table"
import "../../../assets/style/dialog/dialog.scss";

export default {
  mixins: [commentMixin, variables,TableMixins],

  data() {
    return {
      showDialog: false,
      dialogData: "",
      currentTable : ''
    };
  },
  methods: {
      selectedRowToDeleteData(row){
          this.selectedRowData = row;
        },
    doHiddenDialog() {
      this.showDialog = false;
      this.showcommentDialog = false;
      this.showPriceDialog = false;
      this.showDeleteDialog = false;
      this.tab = 1;
    },
     async deleteItemFromTable(){
        this.showDeleteDialog = false;
        this.headerManager.status = "start";
        this.tab = 0;
           const result = await this.Submit("delete", this.table.selectedItems[0]);
        if (result) {
          this.table.unSelect = !this.table.unSelect;
          this.updateTable();
        }
        
    },
     async deleted() {
        this.showDeleteDialog = true;

    },
   async submit() {
      const result = await this.Submit(
        this.headerManager.status,
        this.form.data
      );
      if (result) {
        this.form.show = false;
        this.table.show = true;
        this.form.readonly = false;
        this.headerManager.status = "start";
        await this.updateTable();
        this.customTabName = "";
        this.tab = 0;
      }
    },
    async updateChangedTable(){
      const result = await this.getTable(this.currentTable)
      this.table.data = result.table
    } , 
    async changeEvent(data) {
      const result = await this.getTable(data.TD_FID);
      this.table.data = result.table;
      this.currentTable = data.TD_FID;

    },

    async updateTable() {
      console.log("hereeeeee")
      const result = await this.getTable();
      this.table.data = result.table;
    },

    async getStatusBar() {
      const result = await this.getInit();
      console.log("this we want", result);
      this.statusBar = result.defaults[260];
      console.log("1");
      this.updateTable();
    },
    show(e) {
      // console.log(e);
      this.dialogData = e;
      this.showDialog = true;
    },
  },
  mounted() {
    this.getStatusBar();
    this.updateTable();
  },
};
</script>


<style lang="" src="../../../assets/style/Ul/Tab.scss">
</style>
