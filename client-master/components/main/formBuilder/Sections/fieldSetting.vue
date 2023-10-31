<template>
  <div class="fieldSetting">
    <p class=" white--text">
      <v-btn icon small dark @click="$emit('hideSetting')">
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
      <span>تنظیمات فیلد</span>
      <span>«{{element.TFF_FID_TypeFieldName}}»</span>
    </p>

    <v-card class="pa-4 ma-2">                           
      <v-container>                   
        <component :is="SettingComponents" :data="element" :form="form"/>
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
import advUploaderSetting from "../fieldsSettings/advUploaderSetting.vue"
import iframeSetting from '../fieldsSettings/iframeSetting.vue';
import videoSetting from '../fieldsSettings/videoSetting.vue';
import accardionSetting from '../fieldsSettings/accardionSetting.vue';
import sliderSetting from '../fieldsSettings/sliderSetting.vue';
import salePageSetting from '../fieldsSettings/salePageSetting.vue';
export default {
  data() {
    return {
      SettingComponents: "",
    }
  },

  props: ["element", "readonly", "form"],


  computed: {
    TFF_FOrder() {
      return this.element.TFF_FOrder;
    },
  },

  // watch: {
  //   TFF_FOrder(newVal, oldVal) {
  //      console.log('TFF_FOrder Changed!', newVal, oldVal);
  //     this.$emit('FOrderChanged', this.element, oldVal)
  //   }
  // },

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
        element.TFF_FType == "input" ||
        element.TFF_FType == "textarea" ||
        element.TFF_FType == "date" ||
        element.TFF_FType == "time" ||
        element.TFF_FType == "money" ||
        element.TFF_FType == "email" ||
        element.TFF_FType == "phone" ||
        element.TFF_FType == "number"
      ) {
        this.SettingComponents = "inputSetting";
      }

      else if (element.TFF_FType == "checkbox") {
        this.SettingComponents = "checkboxSetting";
      }

      else if (
        element.TFF_FType == "select" ||
        element.TFF_FType == "selectSystem" ||
        element.TFF_FType == "multiselect"
      ) {
        this.SettingComponents = "selectSetting";
      }

      else if (element.TFF_FType == "file") {
        this.SettingComponents = "fileSetting";
      } else if (element.TFF_FType == "color") {
        this.SettingComponents = "colorpickerSettings";
      } else if (element.TFF_FType == "step") {
        this.SettingComponents = "stepSetting";
      } else if (element.TFF_FType == "radio") {
        this.SettingComponents = "radioSetting";
      } else if (element.TFF_FType == "editor") {
        this.SettingComponents = "editorSetting";
      } else if (element.TFF_FType == "star") {
        this.SettingComponents = "starSetting";
      } else if (element.TFF_FType == "link") {
        this.SettingComponents = "downloadSetting";
      }

      else if (element.TFF_FType == "divider") {
        this.SettingComponents = "dividerSetting";
      }
      else if(element.TFF_FType == "advUploader"){
        this.SettingComponents = "advUploaderSetting"
      }


      else if (element.TFF_FType == "spacer") {
        this.SettingComponents = "dividerSetting";
      }

      else if (element.TFF_FType == "title") {
        this.SettingComponents = "titleSetting";
      }

      else if (element.TFF_FType == "text") {
        this.SettingComponents = "textSetting";
      }
      else if(element.TFF_FType == "showimg") {
        this.SettingComponents = "showimgSetting";
      }
      else if(element.TFF_FType == "button") {
        this.SettingComponents = "buttonSetting";
      }
      else if(element.TFF_FType == "iframe"){
        this.SettingComponents = "iframeSetting"
      } 
      else if(element.TFF_FType == "video"){
        this.SettingComponents = "videoSetting"
      }
      else if (element.TFF_FType == "accardion"){
        this.SettingComponents = "accardionSetting"
      }
      else if(element.TFF_FType == "slider"){
        this.SettingComponents = "sliderSetting"
      }
      else if(element.TFF_FType == "salePage"){
        this.SettingComponents = "salePageSetting"
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
    buttonSetting,
    advUploaderSetting,
    iframeSetting,
    videoSetting,
    accardionSetting,
    sliderSetting,
    salePageSetting
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
