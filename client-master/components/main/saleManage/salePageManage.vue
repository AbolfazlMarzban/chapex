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
      <Counting :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly" :defaults="defaults"
        :wizardView="true">
      </Counting>

      <Options :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly" :defaults="defaults" :wizardView="true">
      </Options>

      <Products :data="data" :lastsaved_data="lastsaved_data" :readonly="readonly" :wizardView="true"
        @gotoEdit="editMode()" :salePageStatus="headerManagerMain.status">
      </Products>
    </v-expansion-panels>
  </div>
</template>

<script>
import variables from "./_mixins/variablesSaleManage";
import saleMixins from "./_mixins/saleManageMixin";
import "../../../assets/style/tableHeaders/tableHeaders.scss";
import SalePageManageDelete from "./dialog/SalePageManageDelete.vue";
import JsonDialog from "../../global/UI/jsonDialog.vue";
import SalePageManageCancel from "./dialog/SalePageManageCancel.vue";
import Gallery from "./sections/gallery.vue";
import tempJson from "./temp.json";
import Loading from "./Loading.vue"

export default {
  mixins: [saleMixins, variables],
  head() {
    return {
      title: "فرمول تولید " + (this.data.TPS_FTitle ? this.data.TPS_FTitle : "")
    };
  },
  data() {
    return {
      loading: true,
      submitLoading: false,
      readonly: true,
      data: {},
      lastsaved_data: {},
      tempData: tempJson,
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
      navigationTabs: ["تعداد", "خصوصیات", "محصولات"]
    };
  },

  props: ["FID"],

  async mounted() {
    this.headerManagerMain.status = "start";
    if (this.FID) await this.showMode();
    else
      this.$nuxt.$options.router.push({
        path: "/admin/salePageManage/insert/"
      });
  },

  methods: {
    async showMode() {
      this.readonly = true;
      const result = await this.getShow(this.FID, "manage");
      if (result.form) {
        this.data = result.form;
        this.defaults = result.defaults;

        this.lastsaved_data = JSON.parse(JSON.stringify(this.data));

        this.loading = false;
        this.headerManagerMain.status = "show";
        this.headerManagerMain.title.fa =
          "فرمول تولید «" + this.data.TPS_FTitle + "»";
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
        "ویرایش فرمول تولید «" + this.data.TPS_FTitle + "»";
      this.headerManagerMain.title.en = this.data.TPS_FLink;
      this.headerManagerMain.title.icon = "pencil-alt";
      this.readonly = false;
    },

    openAll() {
      this.accordianValues = [];
      for (var i = 0; i <= 3; i++) {
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
        "UpdateManage"
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
  },
  components: {
    SalePageManageDelete,
    JsonDialog,
    SalePageManageCancel,
    Gallery,
    Loading
  }
};
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center;
}
</style>
