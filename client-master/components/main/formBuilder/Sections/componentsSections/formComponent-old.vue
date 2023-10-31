<template>
    <v-card class="ma-2 blue-grey lighten-2 white--text">

        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <v-row>
                        <v-col col="6">
                            <label>
                                <FormFieldLabel :type="element.type"></FormFieldLabel>
                                <span v-if="element.TFF_FLable">: {{element.TFF_FLable}}</span>
                            </label>
                        </v-col>
                        <v-col col="6">
                            <span class="float-left pl-2">
                                <v-btn icon color="amber accent-4" @click.stop="$emit('copyField', element)">
                                    <v-icon small>mdi-content-copy</v-icon>
                                </v-btn>

                                <v-btn icon color="pink" @click="$emit('deleteField', element)">
                                    <v-icon small>mdi-delete-outline</v-icon>
                                </v-btn>
                            </span>
                        </v-col>
                    </v-row>
                </v-expansion-panel-header>

                <v-expansion-panel-content>

                    <v-container>
                        <v-row>
                            <v-col :cols="12">
                                <v-card class="mb-4 pa-2">

                                    <v-card-title class="pa-0 mb-5">
                                        <label>پیش نمایش</label>
                                    </v-card-title>

                                    <div class="draggable_list_div pa-2">
                                        <FormField :element="element"></FormField>
                                    </div>

                                </v-card>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-card class="mb-4 pa-2">

                                    <v-card-title class="pa-0 mb-5">
                                        <label>تنظیمات</label>
                                    </v-card-title>

                                    <component :is="SettingComponents" :data="element" />

                                </v-card>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>
import inputSetting from "../../fieldsSettings/inputSetting.vue";
import checkboxSetting from "../../fieldsSettings/checkboxSetting.vue";
import colorpickerSettings from "../../fieldsSettings/colorpickerSettings.vue";
import dateSetting from "../../fieldsSettings/dateSetting.vue";
import downloadSetting from "../../fieldsSettings/downloadSetting.vue";
import editorSetting from "../../fieldsSettings/editorSetting.vue";
import fileSetting from "../../fieldsSettings/fileSetting.vue";
import radioSetting from "../../fieldsSettings/radioSetting.vue";
import selectSetting from "../../fieldsSettings/selectSetting.vue";
import starSetting from "../../fieldsSettings/starSetting.vue";
import dividerSetting from "../../fieldsSettings/dividerSetting.vue";
import titleSetting from "../../fieldsSettings/titleSetting.vue";
import textSetting from "../../fieldsSettings/textSetting.vue";
import FormField from "./formField.vue";

export default {

    props: ["element", "readonly"],

    components: {
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
        FormField,
        dividerSetting,
        titleSetting,
        textSetting
    },

    data() {
        return {
            SettingComponents: "",
            selectItems: [],
        }
    },

    mounted() {
        this.editedField(this.element)
    },

    methods: {
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
        },

        findItems(element) {
            for (var i = 0; i < element.items.length; i++) {
                this.selectItems.push(element.items[i].name);
            }
        },
    }
}
</script>