<template>
  <div>
    <ui-tabs v-if="TabsItem.show" :data="TabsItem.data" />
    <ui-header-manager
      :title="checkState.title"
      :Buttons="headerManager.buttons"
      :generalHeaderStatus="headerManager.generalStatus"
      :status="headerManager.status"
      @insert="insert"
      @edit="update"
      @delete="deleted"
      @submit="submit"
      @cancel="cancel"
    />

    <!-- <ui-table
      v-if="table.show"
      class="pt-5 list_manage_customer_table"
      :data="table.data"
      :dataSchema="table.schema"
      :tableBtn="table.tableBtn"
      :checkboxDisabled="table.checkboxEnabled"
      :clearRows="table.unSelect"
      :hideCheckBoxAll="true"
      idField="TU_FID"
      @show="show"
      @selectedRowChanged="selectedRowChanged"
      @refresh="updateTable"
    />
    <FormUser v-if="form.show" :readonly="form.readonly" :data="form.data" :defaults="defaults" /> -->

    <ui-abol-table
      v-if="abolData"
      :tableData="abolData"
      :title="checkState.title.fa"
    ></ui-abol-table>
  </div>
</template>

<script>
import variables from "./mixins/variablesUser";
import UserMixins from "./mixins/user";
import TableMixins from "../../../plugins/mixins/table/table";

export default {
  props: ["state"],
  mixins: [variables, UserMixins, TableMixins],

  data() {
    return {
      abolData: {}
    };
  },

  mounted() {
    this.headerManager.status = "start";
    this.updateTable();
  },

  computed: {
    checkState() {
      if (this.state == "customer") {
        return {
          title: {
            fa: "لیست مشتریان",
            en: "Customers List",
            icon: "user"
          }
        };
      } else if (this.state == "provider") {
        return {
          title: {
            fa: "لیست تامیین کنندگان",
            en: "Provider List",
            icon: "user"
          }
        };
      } else if (this.state == "employee") {
        return {
          title: {
            fa: "لیست کارمندان",
            en: "employee List",
            icon: "user"
          }
        };
      }
    }
  },

  methods: {
    async submit() {
      const result = await this.Submit(
        this.headerManager.status,
        this.form.data
      );
      if (result) {
        (this.form.show = false), (this.table.show = true);
        this.TabsItem.show = false;
        this.headerManager.status = "start";
        this.updateTable();
      }
    },
    async show(row) {
      this.headerManager.status = "show";
      const result = await this.getShow(row.TU_FID);
      this.form.readonly = true;
      this.form.data = result.form;
      this.defaults = result.defaults;
      this.table.show = false;
      this.form.show = true;
      this.TabsItem.show = true;
    },
    update() {
      this.form.readonly = false;
      this.headerManager.status = "edit";
    },
    async insert() {
      this.headerManager.status = "insert";
      const result = await this.getInit(this.state);
      this.form.data = result.form;
      this.defaults = result.defaults;
      this.table.show = false;
      this.form.show = true;
      this.TabsItem.show = true;
    },
    async deleted() {
      const result = await this.Submit("delete", this.table.selectedItems);
      if (result) {
        this.headerManager.status = "start";
        this.updateTable();
      }
    },
    cancel() {
      this.headerManager.status = "start";
      (this.form.show = false), (this.table.show = true);
      this.TabsItem.show = false;
    },
    async updateTable() {
      try {
        // this.$store.dispatch("tableRefresh/refreshStart");
        const response = await this.getTable(this.state);
        this.abolData = response;
        // this.$store.dispatch("tableRefresh/refreshStop");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" src="../../../assets/style/user/User.scss"></style>
