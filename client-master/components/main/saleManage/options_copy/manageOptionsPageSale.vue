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
    />

    <ui-table
      v-if="table.show"
      class="pt-5 list_manage_customer_table"
      :data="table.data"
      :dataSchema="table.schema"
      :tableBtn="table.tableBtn"
      :checkboxDisabled="table.checkboxEnabled"
      :clearRows="table.unSelect"
      :hideCheckBoxAll="true"
      idField="TPP_FID"
      @show="show"
      @selectedRowChanged="selectedRowChanged"
    />

    <FormOptionsPageSale
      v-if="form.show"
      :defaults="defaults"
      :data="form.data"
      :status="form.status"
      @tabsUpdate="tabsUpdate"
      :productID="productID"
    />
  </div>
</template>

<script>
import OptionsMixins from "./_mixins/optionsPageSaleMixin";
import variables from "./_mixins/variablesOptionsPageSale";
import TableMixins from "../../../../plugins/mixins/table/table";
export default {
  mixins: [variables, OptionsMixins, TableMixins],

  props: ["productID"],
  mounted() {
    this.headerManager.status = "start";
    this.updateTable();
  },
  methods: {
    tabsUpdate(data) {
      this.form.tabs = data;
    },
    async insert() {
      this.headerManager.status = "insert";
      this.form.show = true;
      const result = await this.getInit();
      this.form.data = result.data.form;
      this.defaults = result.data.defaults;
      this.table.show = false;
    },
    async show(row) {
      const result = await this.getShow(row.TPP_FID);
      this.defaults = result.data.defaults;
      this.form.data = result.data.form;
      this.form.show = true;
      this.table.show = false;
    },
    async submit() {
      this.form.data.TPP_FID_PageSale = this.productID;
      const result = await this.Submit("insert", this.form);
      if (result) {
        this.form.show = false;
        this.table.show = true;
        this.headerManager.status = "start";
        this.updateTable();
      }
    },
    async updateTable() {
      const result = await this.getTable(this.productID);
      this.table.data = result.data.table;
    },
    async deleted() {
      const result = await this.Submit("delete", this.table.selectedItems[0]);
      if (result) {
        this.table.unSelect = !this.table.unSelect;
        this.updateTable();
      }
    },
    cancel() {
      this.form.show = false;
      this.table.show = true;
      this.form.readonly = false;
      this.headerManager.status = "start";
    },
  },
};
</script>


