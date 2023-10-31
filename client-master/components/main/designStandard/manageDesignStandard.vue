<template>
  <div>
      <ui-header-manager
      :title="headerManager.title"
      :Buttons="headerManager.buttons"
      :status="headerManager.status"
   
    />
       <!-- @insert="insert"
      @cancel="cancel"
      @submit="submit"
      @delete="deleted"
      @edit="update" -->
    <LazyFormDesignStandard
      :data="form.data"
      v-if="form.show"
      :defaults="defaults"
      :readonly="form.readonly"
    />
  </div>
</template>

<script>
import variables from "./_mixins/variablesDesignStandard";
import packStandardMixins from "./_mixins/designStandardMixin";
import table from "../../../plugins/mixins/table/table";

export default {
  mixins: [variables, packStandardMixins, table]
};
</script>

<style lang="scss" src="../../../assets/style/formsStyle/form.scss"></style>
