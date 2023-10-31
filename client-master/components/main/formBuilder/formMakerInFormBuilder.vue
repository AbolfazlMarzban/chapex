<template>
  <div>
    <v-dialog v-model="showFormMaker" persistent width="1200">
      <v-card v-if="formBuilderData.data">

        <v-row class="pa-5">
          <span>پیش نمایش فرم</span>
          <v-spacer></v-spacer>
          <v-icon @click="$emit('hidePreview')">mdi-close</v-icon>
        </v-row>

        <FormViewer :formBuilderData="formBuilderData"></FormViewer>

      </v-card>
    </v-dialog>
  </div>
</template>
 

<script>
// import "../../../assets/style/designStatus/designStatus.scss";
import formBuilderMixins from "./_mixins/formBuilderMixin";
import radioSetting from "./fieldsSettings/radioSetting.vue";
import FormField from "./Sections/componentsSections/formField.vue";
import FormViewer from "./formViewer.vue";

export default {
  props: ["formBuilderData", "showFormMaker", "value", "title", "readonly"],
  mixins: [formBuilderMixins],
  components: { radioSetting, FormField, FormViewer },
  data() {
    return {
      formDataArray: []
    };
  },
  methods: {},
  mounted() {
  }
};
</script>

<style
  lang="scss"
  src="../../../assets/style/formBuilder/form.scss"
>

</style>