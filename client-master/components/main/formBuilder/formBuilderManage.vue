<template>
  <div>
    <ui-header-manager :title="headerManager.title" :Buttons="headerManager.buttons" :status="headerManager.status"
      @insert="insert" @delete="deleted" @submit="submit" @cancel="cancel" @edit="update" @json="json" />

    <FormBuilder v-if="form.show" :data="form.data" :fields="fieldsForm" :status="headerManager.status"
      :readonly="form.readonly" />
    <ui-abol-table v-if="abolData" :tableData="abolData" :title="headerManager.title"></ui-abol-table>

    <!-- <template>                         

      <v-data-table v-if="table.show" class="formbuilderHeaders" :headers="headers" :items="table.data"
        v-model="selected" item-key="TF_FID" show-select>
        <template v-slot:item.TF_FName="{ item }">
          <td style="cursor: pointer">
            <NuxtLink class="black--text" :to="`/admin/formBuilder/manage/${item.TF_FID}`">
              {{ ' '+item.TF_FName+' ' }}
            </NuxtLink>
          </td>
        </template>

        <template v-slot:item.formButtons="{ item }">
          <td class="text-center">

            <v-container>
              <v-row>

                <v-col cols="4">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <nuxt-link to="#">
                        <v-icon v-bind="attrs" v-on="on" small color="#016670" class=""
                          @click="showPreviewForm(item.TF_FID)">mdi-eye
                        </v-icon>
                      </nuxt-link>
                    </template>
                    <span>پیش نمایش</span>
                  </v-tooltip>
                </v-col>

                <v-col cols="4">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <nuxt-link class="blue--text" :to="`/forms/${item.TF_FID}`" target="_blank">
                        <v-icon v-bind="attrs" v-on="on" small color="#016670">
                          mdi-arrow-top-right-bold-box-outline
                        </v-icon>
                      </nuxt-link>
                    </template>
                    <span>لینک اختصاصی</span>
                  </v-tooltip>
                </v-col>

                <v-col cols="4">                           
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <nuxt-link to="#">
                        <v-icon color="amber accent-4" v-bind="attrs" v-on="on" small @click="duplicateDialog(item)">
                          mdi-content-copy</v-icon>
                      </nuxt-link>
                    </template>
                    <span>تکثیر</span>
                  </v-tooltip>
                </v-col>

              </v-row>
            </v-container>
          </td>
        </template>

      </v-data-table>

    </template> -->

    <FormBuilderCancel @cancelProcessDialog="cancelProcessDialog" @hiddenDialog="doHiddenDialog"
      :showDialog="showDialog" />

    <FormBuilderDuplicate @duplicated="duplicated" @hiddenDialog="doHiddenDialog"
      :showDuplicateDialog="showDuplicateDialog" :selected="duplicateItem" />

    <FormBuilderDelete @deleteItemFromTable="deleteItemFromTable" @hiddenDialog="doHiddenDialog"
      :showDeleteDialog="showDeleteDialog" :selected="selected" />

    <FormMakerInFormBuilder :showFormMaker="showFormMaker" @hidePreview="showFormMaker = false"
      :formBuilderData="designFormData" :readonly="form.readonly" />
  </div>
</template>

<script>
import variable from "./_mixins/variablesFormBuilder";
import formBuilderMixins from "./_mixins/formBuilderMixin";
import TableMixins from "../../../plugins/mixins/table/table";
import "../../../assets/style/goods/goods.scss";
import "../../../assets/style/tableHeaders/tableHeaders.scss";
// import FormBuilderDuplicate from "./dialog/formBuilderDuplicate.vue";
export default {
  data() {
    return {
      getShowRowFields: [],
      tab: null,
      customTabName: "",
      showDialog: false,
      showDeleteDialog: false,
      showDuplicateDialog: false,
      duplicateItem: null,
      showCommentDialog: false,
      showPriceDialog: false,
      showStockDialog: false,
      selectedRowData: "",
      formBuilderCommentDialog: "",
      formBuilderPriceDialog: "",
      formBuilderStockDialog: "",
      showFormMaker: false,
      selected: [],
      jsonDialog: false,
      abolData: {}
    };
  },
  mixins: [variable, formBuilderMixins, TableMixins],
  async mounted() {
    await this.updateTable();
  },
  methods: {
    duplicateDialog(item) {
      this.duplicateItem = item;
      this.showDuplicateDialog = true;
    },

    async duplicated() {
      await this.updateTable();
      this.showDuplicateDialog = false
    },

    json() {
      this.jsonDialog = true;
      console.log("json");
      // console.log(JSON.parse(JSON.stringify(this.data)));
    },
    openCancelDialog() {
      if (this.headerManager.status == "edit") {
        this.tab = 1;
        this.showDialog = true;
      }
      else if (this.headerManager.status == "insert") {
        this.tab = 1;
        this.showDialog = true;
      }
      else {
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
      this.showDuplicateDialog = false;
      this.duplicateItem = null
      this.tab = 1;
    },
    cancelProcessDialog() {
      this.showDialog = !this.showDialog;
      this.fieldsForm = [];
      this.headerManager.status = "start";
      this.customTabName = "";
      this.tab = 0;
      this.cancel();
    },
    async getFormsToShowPreview(formId) {
      try {
        const result = await this.getFormAndUploadersOfFormBuilder(formId);
        if (result) {
          console.log("showFormPreview", result);
          this.designFormData = { data: result.data.form, fields: result.data.fields };
          console.log(this.designFormData, "in manage");
        }
      }
      catch (error) {
        console.log(error);
      }
    },
    async getCustomerUploaders(formId) {
      try {
        const result = await this.getFormAndUploadersOfFormBuilder();
        if (result) {
          this.customerUploadersData = result.data;
          console.log(this.customerUploadersData, "uploader");
        }
      }
      catch (error) {
        console.log(error);
      }
    },
    async deleteItemFromTable() {
      this.showDeleteDialog = false;
      this.tab = 0;
      // const result = await this.SubmitFormBuilder("delete", this.selected[0].TF_FID);
      const result = await this.SubmitFormBuilder("multidelete", this.selected);
      if (result) {
        this.selected = [];
        this.headerManager.status = "start";
        this.updateTable();
      }
    },
    async insert() {
      this.$nuxt.$options.router.push({ path: "/admin/formBuilder/insert/" });
    },
    async updateTable() {
      this.$store.dispatch("tableRefresh/refreshStart");
      const result = await this.getTable();
      if (result) {
        console.log("formbuilderdata", result);
        this.table.data = result.table;
        this.headerManager.status = "start";
        this.$store.dispatch("tableRefresh/refreshStop");
        this.abolData = result
      }
    },
    fieldsFormUpdate(data) {
      this.fieldsForm = data;
    },
    async submit() {
      this.form.data.fields = this.fieldsForm;
      // console.log(this.fieldsForm);
      const result = await this.SubmitFormBuilder(this.headerManager.status, this.form.data);
      if (result) {
        this.form.show = false;
        this.table.show = true;
        this.fieldsForm = [];
        // this.getShowRowFields = [];
        this.customTabName = "";
        this.tab = 0;
        this.updateTable();
      }
    },
    async deleted() {
      // console.log("delete this!");
      this.showDeleteDialog = true;
    },
    async show(id) {
      this.headerManager.status = "edit";
      this.form.readonly = false;
      const result = await this.getShow(id);
      // console.log("getShowResult", result);
      this.fieldsForm = result.fields;
      // console.log("editForm", this.fieldsForm);
      // console.log("getShowRowFields", this.getShowRowFields);
      this.customTabName = result.form.TF_FName;
      this.form.data = result.form;
      this.form.show = true;
      this.table.show = false;
      this.tab = 1;
    },
    update() {
      this.headerManager.status = "edit";
      this.form.readonly = false;
    },
    cancel() {
      if (this.headerManager.status == "edit") {
        this.tab = 1;
        this.showDialog = true;
      }
      else if (this.headerManager.status == "insert") {
        this.tab = 1;
        this.showDialog = true;
      }
      else {
        this.form.show = false;
        this.table.show = true;
        this.form.readonly = false;
        this.headerManager.status = "start";
        this.customTabName = "";
        this.tab = 0;
      }
    },
    async showPreviewForm(id) {
      await this.getFormsToShowPreview(id);
      console.log(this.designFormData, "after api");
      this.showFormMaker = true;
    }
  },
  watch: {
    selected(oldValue, newValue) {
      console.log(this.selected);
    },

    "$route.query.DuplicateID"(newId, oldId) {
      const page = this.abolData.table.find(sp => sp.TF_FID == newId);

      if (page) this.duplicateDialog(page);
    }
  },
  // components: { FormBuilderDuplicate }
};
</script>

<style lang="scss" src="../../../assets/style/formsStyle/form.scss"></style>
