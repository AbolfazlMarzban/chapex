<template>
  <div>
    <ui-header-manager
      :title="headerManager.title"
      :Buttons="headerManager.buttons"
      :status="headerManager.status"
      @insert="insert"
      @cancel="cancel"
      @submit="submit"
      @delete="deleted"
      @edit="update"
    />

    <ui-table
      v-if="table.show"
      class="pt-5 packStandardTableHeaders"
      :dataSchema="table.schema"
      :tableBtn="table.tableBtn"
      :checkboxDisabled="table.checkboxEnabled"
      :clearRows="table.unSelect"
      :hideCheckBoxAll="true"
      idField="TGB_FID"
      :moneyFields="table.moneyFields"
      :data="table.data"
      @selectedRowChanged="selectedRowChanged"
      @selectedRowData="selectedRowToDeleteData"
      @show="show"
    />

    <LazyFormPackStandard
      :data="form.data"
      v-if="form.show"
      :defaults="defaults"
      :readonly="form.readonly"
    />


    <PackStandardCancel @cancelProcessDialog="cancelProcessDialog"  @hiddenDialog="doHiddenDialog" :showDialog="showDialog"  />
    <PackStandardDelete v-if="showDeleteDialog" @deleteItemFromTable="deleteItemFromTable"  @hiddenDialog="doHiddenDialog" :showDeleteDialog="showDeleteDialog" :selectedRowData="selectedRowData" />
  </div>
</template>

<script>
import variables from "./_mixins/variablesPackStandard";
import packStandardMixins from "./_mixins/packStandardMixin";
import table from "../../../plugins/mixins/table/table";
import "../../../assets/style/tableHeaders/tableHeaders.scss"

export default {

  data() {
    return {
        showDialog: false,
        showDeleteDialog : false ,
    }
  },

  mixins: [variables, packStandardMixins, table],
  mounted() {
    this.headerManager.status = "start";
    this.updateTable();
  },
  methods: {

    openCancelDialog() {
      if (this.headerManager.status == "edit") {
        this.tab = 1;
        this.showDialog = true;
      } else if (this.headerManager.status == "insert") {
        this.tab = 1;
        this.showDialog = true;
      } else {
        this.tab = 0;
        this.showDialog = false;
        this.cancel();
      }
    },

      doHiddenDialog() {
      this.showDialog = false;
      this.showcommentDialog = false;
      this.showPriceDialog = false;
      this.showDeleteDialog = false;
      this.tab = 1;
    },

     cancelProcessDialog() {
      this.showDialog = false;
      this.headerManager.status = "start";
      this.cancel();
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

      selectedRowToDeleteData(row){
          this.selectedRowData = row;
          console.log(this.selectedRowData);

        },

        async deleted() {
        this.showDeleteDialog = true;

    },


    async insert() {
      this.headerManager.status = "insert";
      const result = await this.getInit();
      this.form.data = result.data.form;
      this.defaults = result.data.defaults;
      this.form.show = true;
      this.table.show = false;
    },
    async show(row) {
      this.headerManager.status = "show";
      this.form.readonly = true;
      const result = await this.getShow(row.TGB_FID);
      console.log("rrrrrr", result);
      this.form.data = result.form;
      this.defaults = result.defaults;
      this.form.show = true;
      this.table.show = false;
    },
    update() {
      this.headerManager.status = "edit";
      this.form.readonly = false;
    },
    cancel() {
      if (this.headerManager.status == "edit") {
        this.showDialog = true;
      } else if (this.headerManager.status == "insert") {
        this.showDialog = true;
      } else {
        this.form.show = false;
        this.table.show = true;
        this.form.readonly = false;
        this.headerManager.status = "start";
      }
    },
    async submit() {
      const result = await this.Submit(
        this.headerManager.status,
        this.form.data
      );
      if (result) {
        this.form.show = false;
        this.table.show = true;
        this.headerManager.status = "start";
        this.form.readonly = false;
        await this.updateTable();
      }
    },

    async updateTable() {
      this.$store.dispatch("tableRefresh/refreshStart");

      const result = await this.getTable();
      console.log("gettable", result.data);
      this.table.data = result.data.table;
      this.$store.dispatch("tableRefresh/refreshStop");
    }
  }
};
</script>
<style lang="scss" src="../../../assets/style/formsStyle/form.scss"></style>

