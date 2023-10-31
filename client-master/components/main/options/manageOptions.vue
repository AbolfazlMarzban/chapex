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
      class="mx-0"
    />

    <ui-table
      v-if="table.show"
      class="pt-5 productOptionsTableHeaders"
      :data="table.data"
      :dataSchema="table.schema"  
      :tableBtn="table.tableBtn"
      :checkboxDisabled="table.checkboxEnabled"
      :clearRows="table.unSelect"
      :hideCheckBoxAll="true"
      idField="TGP_FID"
      @addValue="addValue"
      @show="show"
      @selectedRowChanged="selectedRowChanged"
    />

    <!-- <FormOptions
      v-if="false"
      :defaults="defaults"
      :data="form.data"
      :status="form.status"
      @tabsUpdate="tabsUpdate"
    /> -->

    <FormOptionsDialog
      v-if="form.show"
      :defaults="defaults"
      :data="form.data"
      @update="update"
      :status="headerManager.status"
      @closeDialog="form.show = false"
      @insert="submit"
    />
    <OptionValuesTable
      v-if="optionValueShow"   
      :data="optionValues"
      :defaults="defaults"
      @submit="submitOptionValue"
    />
  </div>
</template>

<script>
import OptionsMixins from "./_mixins/optionsMixin";
import variables from "./_mixins/variablesOptions";
import TableMixins from "../../../plugins/mixins/table/table";
import "../../../assets/style/tableHeaders/tableHeaders.scss"
export default {
  mixins: [variables, OptionsMixins, TableMixins],
  data() {
    return {
      optionValueShow: false, 
    }
  },
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
    },
    async show(row) {
      this.headerManager.status = "show";
      // console.log(row)
      const result = await this.getShow(row.TGP_FID);
      console.log(result);

      this.defaults = result.data.defaults;
      this.form.data = result.data.form;
      this.form.show = true;
    },
    async submit() {
      this.form.data.TGP_FID_Goods = this.productID;
      const result = await this.Submit("insert", this.form);
      this.optionValueShow = false;
      if (result) {
        this.form.show = false;
        this.table.show = true;
        this.headerManager.status = "start";
        this.updateTable();
      }
    },
    async update(ids, status) {
      let data = {
        data: this.form.data,
        changeIDs: ids,
        status: status,
      };
      this.optionValueShow = false;
      const result = await this.Update(data);
      if (result) {
        (this.form.show = false), (this.table.show = true);
        this.headerManager.status = "start";
        this.updateTable();
      }
    },
    async addValue(row) {
      const result = await this.getOptionValue(row.TGP_FID);
      this.optionValues = result.data.optionsValue;
      this.defaults = result.data.defaults;
      this.optionValueShow = true;
      console.log(this.optionValueShow);
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
    async submitOptionValue(data) {
      data.TGPD_FID_Goods = this.productID;
      data.TGPD_FID_Option = data.TGPV_FID_Option;
      data.TGPD_FID_Value = data.TGPV_FID_Value;
      data.TGPD_FID_GoodsOption = data.TGPV_FID_GoodsOption;
      const result = await this.submitOptionDependency(data);
      if (result) {
        console.log("inserted!!! ");
      }
    },
  },
};
</script>

<style lang="scss" src="../../../assets/style/formsStyle/form.scss"></style>
