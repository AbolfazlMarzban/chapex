<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="500" class="goods_dialogs_main">
      <v-card class="goods_dialog">
        <v-card-title> </v-card-title>

        <v-card-text>
          <div class="goods_dialog_title">افزودن خصوصیت</div>
          <v-divider></v-divider>
          <div class="goods_dialog_text">
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>محصول : </label> </span>
              </v-col>
              <v-col cols="8">
                <!-- <ui-select
                  class="mx_margitn-top-0"
                  :readonly="form.readonly"
                  :options="{
                    fields: {
                      id: 'TGO_FID',
                      name: 'TGO_FName',
                      search: 'TGO_FName',
                    },
                    label: '',
                    count: 10,
                  }"
                  v-model="form.data.TPG_FID_Goods"
                  :items="defaults"
                /> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>تاریخ ثبت : </label> </span>
              </v-col>
              <v-col cols="8">
                <!-- <ui-input
                  type="text"
                  class="form_control_textInput mt-0"
                  label="   "
                  placeholder=" "
                  :readonly="true"
                  v-model="form.data.TPG_FDateReg"
                /> -->
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" class="goods_dialog_align_left">
                <span><label>کاربر ثبت : </label> </span>
              </v-col>
              <v-col cols="8">
                <!-- <ui-input
                  type="text"
                  class="form_control_textInput mt-0"
                  label="   "
                  placeholder=" "
                  :readonly="true"
                  v-model="form.data.TPG_FUserReg"
                /> -->
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" class="goods_dialog_align_left">
                <!-- <v-checkbox
                  class="float-left"
                  v-model="form.data.TPG_FActive"
                  label="   فعال    "
                  :value="1"
                  :disabled="form.readonly"
                ></v-checkbox> -->
              </v-col>

              <v-col cols="6" class="goods_dialog_align_left">
                <!-- <v-checkbox
                  class="float-left"
                  v-model="form.data.TPG_FDefault"
                  label="   پیش فرض   "
                  :value="1"
                  :disabled="form.readonly"
                ></v-checkbox> -->
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
          <v-btn text @click="submit" class="goods_dialog_btn mt-4">
            بله
          </v-btn>

          <v-btn text @click="$emit('cancel')" class="goods_dialog_btn mt-4">
            خیر
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import table from "../../../../plugins/mixins/table/table";
import variables from "../_mixins/variablesSaleManage";
import saleMixins from "../_mixins/saleManageMixin";

export default {
  props: ["readonly", "productId", "defaults", "id", "editMode", "data"],
  mixins: [table, variables, saleMixins],
  data() {
    return {
      dialog: true,
    };
  },
  mounted() {
    // this.headerManagerProduct.status = "start";
    if (this.editMode) {
      this.show(this.id);
    } else {
      this.getInit();
    }
  },
  methods: {
    async getInit() {
      const result = await this.getInitProduct();
      this.form.data = result.data.form;
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
      const result = await this.SubmitProduct("insert", this.form.data);
      if (result) {
        this.$emit("submitDone");
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
    async show(id) {
      // this.headerManagerProduct.status = "show";
      // this.form.readonly = true;
      const result = await this.getShowGoods(id);
      this.form.data = result.form;
      // this.defaultProduct = result.defaults;
      // this.form.show = true;
      // this.productTable.show = false;
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

<style lang="scss">
.mx_margitn-top-0 {
  .mx_Select {
    margin-top: 0 !important;
  }
}
</style>
