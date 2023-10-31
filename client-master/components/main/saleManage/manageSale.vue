<template>
  <Loading v-if="loading && submitLoading" text="در حال ذخیره سازی..." />
  <Loading v-else-if="loading" text="در حال دریافت اطلاعات..." />
  
  <div v-else>
    <ui-header-manager v-if="headerManagerMain.show" :title="headerManagerMain.title" :Buttons="headerManagerMain.buttons"
      :status="headerManagerMain.status" @insert="insert" />

    <SalePageAlertDialog v-if="showDuplicateDialog" title="ایجاد کپی از صفحه فروش" :comment="duplicateComment"
      @submit="duplicateSalePage" @cancel="showDuplicateDialog = false" />

    <ui-abol-table v-if="abolData" :tableData="abolData" :title="headerManagerMain.title"></ui-abol-table>

    <!-- <v-data-table v-if="pageSaleTable.show" class="salePageTableHeaders" :headers="headers" :items="pageSaleTable.data"
      show-select v-model="selected" item-key="TPS_FID" loading-text="در حال بارگذاری اطلاعات" :search="search">

      <template v-slot:top>
        <v-row class="mb-3 mt-1" style="justify-content:center;">
          <v-col cols="3" lg="3" class="searchboxx">
            <v-text-field class="mt-0" label="جستجو کنید..." v-model="search" style="direction: rtl;"></v-text-field>
          </v-col>
        </v-row>
      </template>

      <template v-slot:item.TPS_FROWNUM="{ item }">
        <td style="cursor:pointer;">
          <NuxtLink class="black--text" :to="`/admin/salePageManage/manage/${item.TPS_FID}`">
            {{ item.TPS_FROWNUM }}
          </NuxtLink>
        </td>
      </template>

      <template v-slot:item.TPS_FTitle="{ item }">
        <div>
          <NuxtLink style="cursor:pointer; color:#016670;" class="pa-1 px-2 font-weight-black"
            :to="`/admin/salePageManage/manage/${item.TPS_FID}`">
            {{ item.TPS_FTitle }}
          </NuxtLink>
        </div>
      </template>

      <template v-slot:item.TPS_FActive="{ item }">
        <td v-if="item.TPS_FActive == 1">
          <v-icon color="#016670" style="font-size: 20px" class="pa-3">mdi-check</v-icon>
        </td>
        <td v-else>
          <v-icon class="pa-3">mdi-close</v-icon>
        </td>
      </template>

      <template v-slot:item.copySalePage="{ item }">
        <div>
          <v-btn @click="duplicateDialog(item)" icon color="amber accent-4">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table> -->
  </div>
</template>

<script>
import variables from "./_mixins/variablesSaleManage";
import saleMixins from "./_mixins/saleManageMixin";
import table from "../../../plugins/mixins/table/table";
import "../../../assets/style/goods/goods.scss";
import "../../../assets/style/formsStyle/form.scss";
import "../../../assets/style/tableHeaders/tableHeaders.scss";
import Loading from "./Loading.vue"

export default {
  mixins: [variables, saleMixins, table],
  props: ["data"],
  data() {
    return {
      loading: true,
      submitLoading: false,
      selected: [],
      search: "",
      selectedRowData: "",
      showDuplicateDialog: false,
      duplicateComment: "",
      idForDuplicate: null,
      abolData: {}
    };
  },
  async mounted() {
    this.headerManagerMain.status = "none";
    await this.updateTable();
    this.headerManagerMain.status = "list";
  },
  methods: {
    async insert() {
      this.$nuxt.$options.router.push({
        path: "/admin/salePageManage/insert/"
      });
    },
    async updateTable() {
      const result = await this.getSalePageTable();
      // this.pageSaleTable.data = result.data.table;
      this.abolData = result.data;
      this.loading = false;
    },

    async duplicateDialog(salePage) {
      this.duplicateComment =
        "شما قصد کپی از صفحه فروش «" +
        salePage.TPS_FTitle +
        "» را دارید.آیا تایید میکنید؟";
      this.idForDuplicate = salePage.TPS_FID;
      this.showDuplicateDialog = true;
    },

    async duplicateSalePage() {
      this.loading = true;
      this.showDuplicateDialog = false;

      const salePageData = await this.getShow(this.idForDuplicate);
      if (salePageData.form) {
        const salePage = salePageData.form;

        salePage.TPS_FTitle = "کپی_" + salePageData.form.TPS_FTitle;
        for (var i = 0; i <= salePage.options.length - 1; i++) {
          salePage.options[i].isNew = true;
        }
        for (var i = 0; i <= salePage.optionsValues.length - 1; i++) {
          salePage.optionsValues[i].isNew = true;
        }
        for (var i = 0; i <= salePage.products.length - 1; i++) {
          salePage.products[i].isNew = true;
        }
        for (var i = 0; i <= salePage.productsOptionValue.length - 1; i++) {
          salePage.productsOptionValue[i].isNew = true;
        }
        salePage.gallery = [];

        this.submitLoading = true;
        const result = await this.Submit("insert", salePage);
        if (result) {
          this.submitLoading = false;
          await this.updateTable();
        }
      }
      this.submitLoading = false;
      this.loading = false;
    }
  },

  watch: {
    "$route.query.DuplicateID"(newId, oldId) {
      const salePage = this.abolData.table.find(sp => sp.TPS_FID == newId);

      if (salePage) this.duplicateDialog(salePage);
    }
  },

  components: { Loading }
};
</script>

<style
  lang="scss"
  src="../../../assets/style/formsStyle/salePagesForm.scss"
></style>
