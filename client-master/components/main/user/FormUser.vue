<template>
  <Loading v-if="loading && submitLoading" text="در حال ذخیره سازی..." />
  <Loading v-else-if="loading" text="در حال دریافت اطلاعات..." />

  <div v-else>
    <ui-header-manager title="پروفایل کاربر" :Buttons="headerManager.buttons" :status="headerManager.status"
      @edit="editMode()" @return="do_return()" @cancel="canceled()" @submit="submit" />

    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="#016670"></v-tabs-slider>

      <v-tab to="profile">پروفایل</v-tab>
      <v-tab to="account">مدیریت حساب کاربری</v-tab>
      <v-tab to="accountGroup">کاربران مرتبط</v-tab>
      <v-tab to="orders">سفارشات</v-tab>
      <v-tab to="invoices">فاکتورها</v-tab>
      <v-tab to="transactions">گردش حساب</v-tab>
      <v-tab to="fileManager">مدیریت فایل</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="profile">
        <FormUserProfile :readonly="form.readonly" :data="form.data" :defaults="defaults" />
      </v-tab-item>

      <v-tab-item value="account">
        <FormUserAccount :readonly="form.readonly" :data="form.data" :defaults="defaults" />
      </v-tab-item>

      <v-tab-item value="accountGroup">
        <FormUserAccount :readonly="form.readonly" :data="form.data" :defaults="defaults" />
      </v-tab-item>

      <v-tab-item value="orders">
        <FormUserOrders :readonly="form.readonly" :data="form.data" :defaults="defaults" />
      </v-tab-item>

      <v-tab-item value="invoices">
        <FormUserInvoices :readonly="form.readonly" :data="form.data" :defaults="defaults" />
      </v-tab-item>

      <v-tab-item value="transactions">
        <FormUserTransactions :readonly="form.readonly" :data="form.data" :defaults="defaults" />
      </v-tab-item>

      <v-tab-item value="fileManager">
        <FormUserFileManager :readonly="form.readonly" :data="form.data" :defaults="defaults" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import variables from "./mixins/variablesUser";
import UserMixins from "./mixins/user";
import FormUserProfile from "./manage/FormUserProfile.vue";
import FormUserAccount from "./manage/FormUserAccount.vue";
import FormUserOrders from "./manage/FormUserOrders.vue";
import FormUserInvoices from "./manage/FormUserInvoices.vue";
import FormUserTransactions from "./manage/FormUserTransactions.vue";
import FormUserFileManager from "./manage/FormUserFileManager.vue";
import Loading from "../saleManage/Loading.vue";

export default {
  props: ["state"],
  mixins: [variables, UserMixins],

  data() {
    return {
      loading: true,
      submitLoading: false,
      tab: this.state || "profile",
      tempData: null
    };
  },

  mounted() {
    this.showMode();
  },

  methods: {
    async showMode() {
      this.loading = true;
      if (this.$route.params.userId) {
        this.headerManager.status = "show";
        const result = await this.getShow(this.$route.params.userId);
        if (result.form) {
          this.form.readonly = true;
          this.form.data = result.form;
          this.tempData = JSON.parse(JSON.stringify(result.form));
          this.defaults = result.defaults;
          this.loading = false;
        } else this.$router.push("/admin/user/manage");
      } else this.$router.push("/admin/user/manage");
    },

    editMode() {
      this.headerManager.status = "edit";
      this.form.readonly = false;
    },

    do_return() {
      this.$router.push("/admin/user/manage");
    },

    canceled() {
      this.headerManager.status = "show";
      this.form.data = JSON.parse(JSON.stringify(this.tempData));
      this.form.readonly = true;
    },

    async submit() {
      this.submitLoading = true;
      this.loading = true;

      const result = await this.Submit(
        this.headerManager.status,
        this.form.data
      );
      if (result) {
        if (this.headerManager.status == "insert")
          this.$nuxt.$options.router.push({ path: "/admin/user/manage" });

        if (this.headerManager.status == "edit") {
          this.showMode();
        }
      }
      this.submitLoading = false;
      this.loading = false;
    }
  },

  components: {
    FormUserProfile,
    FormUserAccount,
    FormUserOrders,
    FormUserInvoices,
    FormUserTransactions,
    FormUserFileManager,
    Loading
  }
};
</script>

<style lang="scss" src="../../../assets/style/user/User.scss"></style>
