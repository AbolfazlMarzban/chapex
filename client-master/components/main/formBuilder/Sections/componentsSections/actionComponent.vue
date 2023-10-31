<template>
    <v-col @click.stop="$emit('select2',element)" class=" mb-1" :class="selectedClass()" :cols="element.TFF_FColumn">

        <span v-if="selected" class="float-left">
            <v-btn icon color="primary" @click.stop="$emit('setting', element)">
                <v-icon small>mdi-cog-outline</v-icon>
            </v-btn>

            <v-btn icon color="amber accent-4" @click.stop="$emit('copyField', element)">
                <v-icon small>mdi-content-copy</v-icon>
            </v-btn>

            <v-btn icon color="pink" @click.stop="$emit('deleteField', element)">
                <v-icon small>mdi-delete-outline</v-icon>
            </v-btn>
        </span>

        <FormField :element="element"></FormField>

    </v-col>
</template>

<script>

import FormField from "./formField.vue";

export default {

    props: ["element", "readonly", "selected"],

    components: {
        FormField,
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

            else if (
                element.type == "file"||
                element.type == "showimg"
            ) {
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
            else if (element.type == "button") {
                this.SettingComponents = "buttonSetting";
            }
        },

        selectedClass() {
            if (this.selected)
                return 'list-group-item-selected'
            else
                return 'list-group-item'
        },

        findItems(element) {
            for (var i = 0; i < element.items.length; i++) {
                this.selectItems.push(element.items[i].name);
            }
        },

        // findItems(element) {
        //     for (var i = 0; i < element.items.length; i++) {
        //         this.selectItems.push(element.items[i].name);
        //     }
        // },
    }
}
</script>