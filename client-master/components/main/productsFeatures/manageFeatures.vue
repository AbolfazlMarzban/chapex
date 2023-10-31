<template>
  <div>
    <ui-header-manager
      :title="headerManager.title"
      :Buttons="headerManager.buttons"
      :status="headerManager.status"
      @insert="insert"
    />
    <!-- 
      @cancel="cancel"
      @submit="submit"
      @delete="deleted"
      @edit="update" -->

    <LazyFormProductsFeatures
      :data="form.data"
      v-if="form.show"
      :defaults="defaults"
      :readonly="form.readonly"
    />
  </div>
</template>

<script>
// import productsFeaturesMixin from "./_mixins/featuresMixin";
// import variables from "./_mixins/variablesFeatures";
import TableMixins from "../../../plugins/mixins/table/table";
export default {
  // mixins: [productsFeaturesMixin, variables, TableMixins],
  mixins: [ TableMixins],
  mounted() {
    this.headerManager.status = "start";
    this.updateTable();
    // this.table.schema = this.table.schemaMain;
    // setTimeout(() => {
    //   this.changeSchema();
    // }, 500);
  },
  methods:{
    async insert() {
      this.headerManager.status = "insert";
      const result = await this.getInit();
      this.form.data = result.data.form;
      this.defaults = result.data.defaults;
      this.form.show = true;
      this.table.show = false;
    },
    async updateTable() {
      // this.$store.dispatch("tableRefresh/refreshStart");
      // const result = await this.getTable();
      // this.table.data = result.data.table;
      // this.$store.dispatch("tableRefresh/refreshStop");
    }
  }
};
</script>

<style lang="scss" src="../../../assets/style/formsStyle/form.scss"></style>
