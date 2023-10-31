<template>
  <div class="fieldSetting">
    <p class=" white--text">
      <v-btn icon small dark @click="$emit('hideSetting')">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
      <span>تنظیمات فیلد</span>
      <span>«{{element.TFF_FID_TypeFieldName}}»</span>
    </p>

    <v-card class="pa-2 ma-2">
      <v-container>
        <component :is="SettingComponents" :data="element" />
      </v-container>
    </v-card>

  </div>
</template>
<script>
import FormFieldLabel from './componentsSections/formFieldLabel.vue';
import inputSetting from "../fieldsSettings/inputSetting.vue";
import checkboxSetting from "../fieldsSettings/checkboxSetting.vue";
import colorpickerSettings from "../fieldsSettings/colorpickerSettings.vue";
import dateSetting from "../fieldsSettings/dateSetting.vue";
import downloadSetting from "../fieldsSettings/downloadSetting.vue";
import editorSetting from "../fieldsSettings/editorSetting.vue";
import fileSetting from "../fieldsSettings/fileSetting.vue";
import radioSetting from "../fieldsSettings/radioSetting.vue";
import selectSetting from "../fieldsSettings/selectSetting.vue";
import starSetting from "../fieldsSettings/starSetting.vue";
import dividerSetting from "../fieldsSettings/dividerSetting.vue";
import titleSetting from "../fieldsSettings/titleSetting.vue";
import textSetting from "../fieldsSettings/textSetting.vue";
import showimgSetting from "../fieldsSettings/showimgsetting.vue";
import buttonSetting from "../fieldsSettings/buttonSetting.vue";

export default {
  data() {
    return {
      SettingComponents: "",
    }
  },

  props: ["element", "readonly"],


  computed: {
    TFF_FOrder() {
      return this.element.TFF_FOrder;
    },
  },

  watch: {
    TFF_FOrder(newVal, oldVal) {
       //console.log('TFF_FOrder Changed!', newVal, oldVal);
      this.$emit('FOrderChanged', this.element, oldVal)
    }
  },

  mounted() {
    this.editedField(this.element)
  },

  methods: {
    addField(state) {
      this.$emit("addField", state);
    },
    drag(event) {
      this.$emit("drag", event);
    },
    editedField(element) {
      if (
        element.type == "input" ||
        element.type == "textarea" ||
        element.type == "date" ||
        element.type == "time" ||
        element.type == "money" ||
        element.type == "email" ||
        element.type == "phone" ||
        element.type == "number"
      ) {
        this.SettingComponents = "inputSetting";
      }

      else if (element.type == "checkbox") {
        this.SettingComponents = "checkboxSetting";
      }

      else if (
        element.type == "select" ||
        element.type == "selectSystem" ||
        element.type == "multiselect"
      ) {
        this.SettingComponents = "selectSetting";
      }

      else if (element.type == "file") {
        this.SettingComponents = "fileSetting";
      } else if (element.type == "color") {
        this.SettingComponents = "colorpickerSettings";
      } else if (element.type == "step") {
        this.SettingComponents = "stepSetting";
      } else if (element.type == "radio") {
        this.SettingComponents = "radioSetting";
      } else if (element.type == "editor") {
        this.SettingComponents = "editorSetting";
      } else if (element.type == "star") {
        this.SettingComponents = "starSetting";
      } else if (element.type == "link") {
        this.SettingComponents = "downloadSetting";
      }

      else if (element.type == "divider") {
        this.SettingComponents = "dividerSetting";
      }


      else if (element.type == "spacer") {
        this.SettingComponents = "dividerSetting";
      }

      else if (element.type == "title") {
        this.SettingComponents = "titleSetting";
      }

      else if (element.type == "text") {
        this.SettingComponents = "textSetting";
      }
      else if(element.type == "showimg") {
        this.SettingComponents = "showimgSetting";
      }
      else if(element.type == "button") {
        this.SettingComponents = "buttonSetting";
      }
    },
  },

  components: {
    FormFieldLabel,
    inputSetting,
    checkboxSetting,
    colorpickerSettings,
    dateSetting,
    downloadSetting,
    editorSetting,
    fileSetting,
    radioSetting,
    selectSetting,
    starSetting,
    dividerSetting,
    titleSetting,
    textSetting,
    showimgSetting,
    buttonSetting
  },
};

</script>
<style
  lang="scss"
  src="../../../../assets/style/formBuilder/formBuilder.scss"
>

</style>

<style scoped>
.fieldSetting {
  align-self: flex-end;
  position: sticky;
  bottom: 1rem;
}
</style>
