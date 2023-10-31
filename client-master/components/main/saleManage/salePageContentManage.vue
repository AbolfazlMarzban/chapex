<template>
  <Loading v-if="loading && submitLoading" text="در حال ذخیره سازی..." />
  <Loading v-else-if="loading" text="در حال دریافت اطلاعات..." />

  <div v-else class="mb-15">
    <ui-header-manager v-if="headerManagerMain.show" :title="headerManagerMain.title" :Buttons="headerManagerMain.buttons"
      :status="headerManagerMain.status" @submit="submit" @cancel="showCancelDialog = true"
      @delete="showDeleteDialog = true" @undo="undo" @redo="redo" @json="json" @edit="editMode"
      @return="$nuxt.$options.router.push({ path: '/admin/salePageManage/' })" />

    <Navigation :Tabs="navigationTabs" :accordianValues="accordianValues" :status="headerManagerMain.status"
      @openAll="openAll" @closeAll="closeAll"></Navigation>

    <SalePageManageDelete :showDeleteDialog="showDeleteDialog" :selectedRowData="data" @deleteItemFromTable="trash"
      @hiddenDialog="showDeleteDialog = false">
    </SalePageManageDelete>

    <SalePageManageCancel :showDialog="showCancelDialog" @hiddenDialog="showCancelDialog = false"
      @cancelProcessDialog="canceled" />

    <JsonDialog v-if="jsonDialog" @hiddenDialog="jsonDialog = false" :object="data"></JsonDialog>

    <v-expansion-panels v-model="accordianValues" multiple>
      <BaseInfo :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly" :defaults="defaults"
        :wizardView="true">
      </BaseInfo>

      <OptionsContent v-if="headerManagerMain.status != 'insert'" :status="headerManagerMain.status" :data="data"
        :lastsaved_data="lastsaved_data" :readonly="readonly" :defaults="defaults" :wizardView="true">
      </OptionsContent>

      <ProductsContent v-if="headerManagerMain.status != 'insert'" :data="data" :lastsaved_data="lastsaved_data"
        :readonly="readonly" :wizardView="true" @gotoEdit="editMode()" :salePageStatus="headerManagerMain.status">
      </ProductsContent>

      <MemoInfo :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly" :defaults="defaults"
        :wizardView="true">
      </MemoInfo>

      <Gallery :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly" :defaults="defaults" :wizardView="true">
      </Gallery>
    </v-expansion-panels>
  </div>
</template>

<script>
import variables from "./_mixins/variablesSaleManage";
import saleMixins from "./_mixins/saleManageMixin";
import Loading from "./Loading.vue"
export default {
  props: ["FID"],
  mixins: [saleMixins, variables],
  components: { Loading },
  head() {
    return {
      title:
        "مدیریت محتوایی " + (this.data.TPS_FTitle ? this.data.TPS_FTitle : "")
    };
  },
  data() {
    return {
      loading: true,
      submitLoading: false,
      readonly: true,
      data: {},
      lastsaved_data: {},
      dataHistory: [],
      historyIndex: 0,
      historyLimit: 20,
      historyDelay: false,
      fromUndoRedo: false,
      defaults: {},
      jsonDialog: false,
      accordianValues: [],
      showDeleteDialog: false,
      showCancelDialog: false,
      navigationTabs: [
        "اطلاعات اولیه",
        "خصوصیات",
        "محصولات",
        "توضیحات",
        "گالری تصاویر"
      ]
    };
  },
  async mounted() {
    this.headerManagerMain.status = "start";
    if (this.FID) await this.showMode();
    else await this.insertMode();
  },
  methods: {
    async insertMode() {
      this.headerManagerMain.status = "insert";
      this.headerManagerMain.title.fa = "تعریف صفحه فروش جدید";
      this.headerManagerMain.title.en = "";
      this.headerManagerMain.title.icon = "plus";
      this.readonly = false;
      const result = await this.getInit();
      if (result.form) {
        this.data = result.form;
        this.defaults = result.defaults;
        this.lastsaved_data = JSON.parse(JSON.stringify(this.data));
        this.appendHistory();
        this.loading = false;
      }
    },
    async showMode() {
      this.readonly = true;
      const result = await this.getShow(this.FID, "contentManage");
      if (result.form) {
        // console.log('result', result)
        this.data = result.form;
        this.defaults = result.defaults;
        this.lastsaved_data = JSON.parse(JSON.stringify(this.data));
        this.loading = false;
        this.headerManagerMain.status = "show";
        this.headerManagerMain.title.fa =
          "مدیریت محتوایی «" + this.data.TPS_FTitle + "»";
        this.headerManagerMain.title.en = this.data.TPS_FLink;
        this.headerManagerMain.title.icon = "eye";
      } else {
        this.$nuxt.$options.router.push({
          path: "/admin/salePageManage/insert/"
        });
      }
    },
    async editMode() {
      this.headerManagerMain.status = "edit";
      this.headerManagerMain.title.fa =
        "ویرایش محتوایی «" + this.data.TPS_FTitle + "»";
      this.headerManagerMain.title.en = this.data.TPS_FLink;
      this.headerManagerMain.title.icon = "pencil-alt";
      this.readonly = false;
    },
    openAll() {
      this.accordianValues = [];
      for (var i = 0; i <= 6; i++) {
        this.accordianValues.push(i);
      }
    },
    closeAll() {
      this.accordianValues = [];
    },
    async submit() {
      this.submitLoading = true;
      this.loading = true;
      const result = await this.Submit(
        this.headerManagerMain.status,
        this.data,
        "Update"
      );
      if (result) {
        if (this.headerManagerMain.status == "insert")
          this.$nuxt.$options.router.push({ path: "/admin/salePageManage/" });
        if (this.headerManagerMain.status == "edit") {
          if (result.status == 200) {
            this.submitLoading = false;
            this.showMode();
          }
        }
      }
    },
    async canceled() {
      if (this.headerManagerMain.status == "insert")
        this.$nuxt.$options.router.push({ path: "/admin/salePageManage/" });
      if (this.headerManagerMain.status == "edit") {
        this.data = this.lastsaved_data;
        this.showCancelDialog = false;
        await this.showMode();
      }
    },
    appendHistory() {
      // console.log('appendHistory', this.data);
      this.setUndoRedo();
      if (this.fromUndoRedo) {
        this.fromUndoRedo = false;
        return;
      }
      if (this.historyDelay) return;
      this.historyDelay = true;
      if (this.historyIndex < this.dataHistory.length) {
        this.dataHistory = this.dataHistory.slice(0, this.historyIndex);
      }
      this.dataHistory.push(JSON.parse(JSON.stringify(this.data)));
      this.historyIndex++;
      if (this.dataHistory.length > this.historyLimit) {
        // console.log('before', this.dataHistory);
        this.dataHistory = this.dataHistory.slice(
          this.dataHistory.length - this.historyLimit,
          this.dataHistory.length
        );
        this.historyIndex = this.dataHistory.length;
        // console.log('after', this.dataHistory);
      }
      // console.log(this.dataHistory);
      this.historyDelay = false;
    },
    setUndoRedo() {
      if (this.dataHistory.length > 1 && this.historyIndex > 1) {
        this.headerManagerMain.buttons.undo.enable = true;
      } else this.headerManagerMain.buttons.undo.enable = false;
      if (this.historyIndex < this.dataHistory.length)
        this.headerManagerMain.buttons.redo.enable = true;
      else this.headerManagerMain.buttons.redo.enable = false;
    },
    undo() {
      if (this.dataHistory.length > 1 && this.historyIndex > 1) {
        this.fromUndoRedo = true;
        this.historyIndex--;
        this.data = JSON.parse(
          JSON.stringify(this.dataHistory[this.historyIndex - 1])
        );
      }
    },
    redo() {
      if (
        this.dataHistory.length > 1 &&
        this.historyIndex < this.dataHistory.length
      ) {
        this.fromUndoRedo = true;
        this.historyIndex++;
        this.data = JSON.parse(
          JSON.stringify(this.dataHistory[this.historyIndex - 1])
        );
      }
    },
    json() {
      this.jsonDialog = true;
      console.log("json");
      console.log(JSON.parse(JSON.stringify(this.data)));
    },
    async trash() {
      this.showDeleteDialog = false;
      // console.log('trash')
      const result = await this.Submit("delete", this.data.TPS_FID);
      if (result) {
        this.$nuxt.$options.router.push({ path: "/admin/salePageManage/" });
      }
    }
  },
  watch: {
    data: {
      handler(val, oldVal) {
        this.appendHistory();
      },
      deep: true
    }
  }
};
</script>
