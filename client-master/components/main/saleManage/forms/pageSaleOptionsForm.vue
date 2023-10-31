<template>
  <div>
    <ui-header-manager
      :title="headerManagerOption.title"
      :Buttons="headerManagerOption.buttons"
      :status="headerManagerOption.status"
      @insert="insert"
      @cancel="cancel"
      @submit="submit"
      @delete="deleted"
      @edit="update"
    />

    <v-col cols="12">
      <ui-table
        v-if="productOptiobsTable.show"
        class="pt-5 list_manage_customer_table"
        :dataSchema="productOptiobsTable.schema"
        :tableBtn="productOptiobsTable.tableBtn"
        :checkboxDisabled="productOptiobsTable.checkboxEnabled"
        :clearRows="productOptiobsTable.unSelect"
        idField="TPP_FID"
        :data="productOptiobsTable.data"
        @show="show"
        @selectedRowChanged="selectedRowChanged"
      />
    </v-col>

    <v-card color="basil" flat v-if="form.show">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" sm="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="نام خصوصیت   "
                placeholder=" "
                :readonly="form.readonly"
                v-model="form.data.TPP_FCaption"
              />
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <ui-select
                :multiple="true"
                :readonly="form.readonly"
                :options="{
                  fields: {
                    id: '',
                    name: '',
                    search: ''
                  },
                  label: 'روش نمایش',
                  count: 10
                }"
                v-model="form.data.TPP_FID_Type"
              />
              <!-- :items="defaults[207]" -->
            </v-col>

            <v-col cols="12" md="4" sm="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="اولویت   "
                placeholder=" "
                :readonly="form.readonly"
                v-model="form.data.TPP_FOrder"
              />
            </v-col>

            <v-col cols="12" md="4" sm="12">
              <ui-select
                :multiple="true"
                :readonly="form.readonly"
                :options="{
                  fields: {
                    id: '',
                    name: '',
                    search: ''
                  },
                  label: 'مقدارهای انتخابی',
                  count: 10
                }"
                v-model="form.data.TPP_FID_Option"
              />
              <!-- :items="defaults[207]" -->
            </v-col>
            <v-col cols="12" md="4" sm="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="مقدار پش فرض   "
                placeholder=" "
                :readonly="form.readonly"
                v-model="form.data.TPP_FID_Default"
              />
            </v-col>
            <v-col cols="12" md="4" sm="12" class="sell_page_btns">
              <v-spacer />

              <ui-button
                class="features_form_final-btn"
                label="فهرست کاربرد در صفحات فاینال"
              />
            </v-col>
            <v-col cols="12" md="2" sm="12">
              <v-checkbox
                v-model="form.data.TPP_FActive"
                label="   فعال   "
                value="close"
                :disabled="form.readonly"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" md="2" sm="12">
              <v-checkbox
                label="پیش فرض"
                value="close"
                :disabled="form.readonly"
                v-model="form.data.TPP_FID_Default"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="عنوان"
                placeholder=" "
                :readonly="form.readonly"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ui-input
                type="text"
                class="form_control_textInput"
                label="شرح"
                placeholder=" "
                :readonly="form.readonly"
                v-model="form.data.TPP_FComment"
              />
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
  props: ["productId"],
  mixins: [table, variables, saleMixins],
  mounted() {
    this.headerManagerOption.status = "start";
    this.updateTable();
  },
  methods: {
    async updateTable() {
      this.$store.dispatch("tableRefresh/refreshStart");
      const result = await this.getTableOption();
      this.productOptiobsTable.data = result.data.table;
      this.$store.dispatch("tableRefresh/refreshStop");
    },
    async show(row) {
      this.headerManagerOption.status = "show";
      this.form.readonly = true;
      const result = await this.getShowOption(row.TPP_FID);
      this.form.data = result.form;
      this.defaultOption = result.defaults;
      this.form.show = true;
      this.productOptiobsTable.show = false;
    },
    selectedRowChanged(selectedItem) {
      this.productOptiobsTable.selectedItems = selectedItem;
      if (selectedItem.length == 0) {
        this.headerManagerOption.status = "not-selected";
      } else if (selectedItem.length == 1) {
        this.headerManagerOption.status = "selecting";
      } else if (selectedItem.length > 1) {
        this.headerManagerOption.status = "multi-selecting";
      }
    },
    update() {
      this.headerManagerOption.status = "edit";
      this.form.readonly = false;
    },
    async submit() {
      this.form.data.TPP_FID_PageSale = this.productId;
      const result = await this.SubmitOption(
        this.headerManagerOption.status,
        this.form.data
      );
      if (result) {
        this.productOptiobsTable.show = true;
        this.form.show = false;
        this.headerManagerOption.status = "start";
        this.form.readonly = false;
        await this.updateTable();
      }
    },
    async insert() {
      this.headerManagerOption.status = "insert";
      const result = await this.getInitOption();
      this.form.data = result.data.form;
      this.defaultOption = result.data.defaults;
      this.form.show = true;
      this.productOptiobsTable.show = false;
    },
    cancel() {
      this.form.show = false;
      this.productOptiobsTable.show = true;
      this.form.readonly = false;
      this.headerManagerOption.status = "start";
    },
    update() {
      this.headerManagerOption.status = "edit";
      this.form.readonly = false;
    },
    async deleted() {
      const result = await this.SubmitOption(
        "delete",
        this.productOptiobsTable.selectedItems[0]
      );
      if (result) {
        this.productOptiobsTable.unSelect = !this.productOptiobsTable.unSelect;
        this.updateTable();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
