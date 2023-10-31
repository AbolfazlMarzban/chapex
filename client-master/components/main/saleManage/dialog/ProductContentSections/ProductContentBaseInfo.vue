<template>
  <v-expansion-panel class="togglebox">
    <accordian-title title="شرح محصول" :unsaved="false" />
    <v-expansion-panel-content>
      <v-row>
        <v-col cols="12" class="mt-4">
          <ui-textarea
            v-if="readonly"
            row="15"
            :readonly="readonly"
            v-model="product.TGO_FComment"
          />
          <ui-editor
            v-else
            row="15"
            :readonly="readonly"
            :value="product.TGO_FComment"
            v-model="product.TGO_FComment"
          />
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import goodsMixin from "../../../goods/_mixins/goodsMixin";

export default {
  props: ["salePage", "product", "defaults", "readonly"],
  mixins: [goodsMixin],

  data() {
    return {
      selectiveAmount: false,
      selectedCategoryTitle: "",
      selectedTypeTitle: "",
      FCodeErrors: []
    };
  },
  mounted() {},
  methods: {}
};
</script>
