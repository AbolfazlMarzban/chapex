<template>
  <div>
    <ui-header-manager
      :title="headerManagerProduct.title"
      :Buttons="headerManagerProduct.buttons"
      :status="headerManagerProduct.status"
      @insert="insert"
      @cancel="cancel"
      @submit="submit"
      @delete="deleted"
      @edit="update"
    />

    <v-col cols="12">
      <ui-table
        v-if="productTable.show"
        class="pt-5 list_manage_customer_table"
        :dataSchema="productTable.schema"
        :tableBtn="productTable.tableBtn"
        :checkboxDisabled="productTable.checkboxEnabled"
        :clearRows="productTable.unSelect"
        idField="TPG_FID"
        :data="productTable.data"
        @show="show"
        @selectedRowChanged="selectedRowChanged"
      />
    </v-col>
    <v-card color="basil" flat v-if="form.show">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <ui-select
                :readonly="form.readonly"
                :options="{
                  fields: {
                    id: 'TGO_FID',
                    name: 'TGO_FName',
                    search: 'TGO_FName',
                  },
                  label: '  محصول ',
                  count: 10,
                }"
                v-model="form.data.TPG_FID_Goods"
                :items="defaultProduct.goodsList"
              />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="تاریخ ثبت   "
                placeholder=" "
                :readonly="true"
                v-model="form.data.TPG_FDateReg"
              />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label=" کاربر ثبت  "
                placeholder=" "
                :readonly="true"
                v-model="form.data.TPG_FUserReg"
              />
            </v-col>
            <v-col cols="12" md="2" sm="12">
              <v-checkbox
                v-model="form.data.TPG_FActive"
                label="   فعال   "
                :value="1"
                :disabled="form.readonly"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="2" sm="12">
              <v-checkbox
                v-model="form.data.TPG_FDefault"
                label="   پیش فرض   "
                :value="1"
                :disabled="form.readonly"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import table from "../../../../plugins/mixins/table/table";
import variables from "../_mixins/variablesSaleManage";
import saleMixins from "../_mixins/saleManageMixin";

export default {
  props: ["readonly", "productId"],
  mixins: [table, variables, saleMixins],
  mounted() {
    this.headerManagerProduct.status = "start";
    this.updateTable();
  },
  methods: {
    async insert() {
      this.headerManagerProduct.status = "insert";
      const result = await this.getInitProduct();
      this.form.data = result.data.form;
      this.defaultProduct = result.data.defaults;
      this.form.show = true;
      this.form.readonly = false;
      this.productTable.show = false;
    },
    cancel() {
      this.form.show = false;
      this.productTable.show = true;
      this.form.readonly = false;
      this.headerManagerProduct.status = "start";
      this.updateTable();
    },
    async submit() {
      this.form.data.TPG_FID_PageSale = this.productId;
      const result = await this.SubmitProduct(
        this.headerManagerProduct.status,
        this.form.data
      );
      if (result) {
        this.productTable.show = true;
        this.form.show = false;
        this.headerManagerProduct.status = "start";
        this.form.readonly = false;
        await this.updateTable();
      }
    },
    async updateTable() {
      this.$store.dispatch("tableRefresh/refreshStart");
      const result = await this.getTableProduct(this.productId);
      this.productTable.data = result.data.table;
      this.$store.dispatch("tableRefresh/refreshStop");
    },
    update() {
      this.headerManagerProduct.status = "edit";
      this.form.readonly = false;
    },
    async show(row) {
      this.headerManagerProduct.status = "show";
      this.form.readonly = true;
      const result = await this.getShowGoods(row.TPG_FID);
      this.form.data = result.form;
      this.defaultProduct = result.defaults;
      this.form.show = true;
      this.productTable.show = false;
    },
    selectedRowChanged(selectedItem) {
      this.productTable.selectedItems = selectedItem;
      if (selectedItem.length == 0) {
        this.headerManagerProduct.status = "not-selected";
      } else if (selectedItem.length == 1) {
        this.headerManagerProduct.status = "selecting";
      } else if (selectedItem.length > 1) {
        this.headerManagerProduct.status = "multi-selecting";
      }
    },
    async deleted() {
      const result = await this.SubmitProduct(
        "delete",
        this.productTable.selectedItems[0]
      );
      if (result) {
        this.productTable.unSelect = !this.productTable.unSelect;
        this.updateTable();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
