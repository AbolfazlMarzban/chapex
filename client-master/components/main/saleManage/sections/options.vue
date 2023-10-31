<template>
  <v-expansion-panel>

    <accordian-title title="خصوصیات" :unsaved="sections_changed()" :readonly="readonly" />

    <v-expansion-panel-content v-if="data.options">
      <v-row>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <SalePageAddOption :OptionType="OptionType" @cancel="showAddDialog = false" @submit="showAddDialog = false"
          v-if="showAddDialog" :defaults="defaults" :salePage="data" status="insert" />

        <SalePageAddOption :OptionType="OptionType" @cancel="showEditDialog = false" @submit="optionEdited"
          v-if="showEditDialog" :defaults="defaults" :salePage="data" status="edit" :optionForEdit="optionForEdit" />

        <v-col cols="2">
          <v-btn v-if="!readonly" block elevation="2" rounded dark color="#016670" depressed
            @click="OptionType = 21703; showAddDialog = true">
            <span>افزودن خصوصیت انتخابی</span>
          </v-btn>
        </v-col>

        <v-col cols="4">
          <span v-if="this.data.options && this.data.options.length == 0">خصوصیتی تعریف نشده</span>
        </v-col>

        <v-col cols="2" class="text-left">
          <v-btn v-if="!data.options.find(o => o.TD_FType == 21704) && !readonly" block elevation="2" rounded dark
            color="pink text--black" depressed @click="OptionType = 21704; showAddDialog = true">
            <span>افزودن خصوصیت طراحی</span>
          </v-btn>
        </v-col>

        <v-col cols="2" class="text-left">
          <v-btn v-if="!data.options.find(o => o.TD_FType == 21705) && !readonly" block elevation="2" rounded dark
            color="orange" depressed @click="OptionType = 21705; showAddDialog = true">
            <span>افزودن خصوصیت نظارت</span>
          </v-btn>
        </v-col>

        <v-col cols="2" style="margin-top: -20px !important">
          <v-select label="نوع نمایش پیشفرض"  flat outlined rounded v-model.lazy="data.TPS_FUserViewType" :items="defaults[211]" item-text="TD_FName" item-value="TD_FID"
            filled dense class="comboBox" style="margin-top: -6px !important" :disabled="readonly">
          </v-select>
        </v-col>

      </v-row>

      <v-row>

      </v-row>

      <v-row v-if="this.data.options.length > 0" class="mt-3">
        <v-col cols="12">
          <OptionsTable :salePage="this.data" :defaults="defaults" @editDialog="editDialog" :readonly="readonly">
          </OptionsTable>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
// import OptionsTable from './optionsSection/optionsTable.vue';

export default {
  props: ["data", "defaults", "readonly", "wizardView", "lastsaved_data"],
  data() {
    return {
      options: [],
      addDependencyDialog: false,
      addDependencyImg: false,
      showAddDialog: false,
      showEditDialog: false,
      OptionType: 21703,
      optionForEdit: null
    };
  },
  methods: {
    editDialog(option) {
      if (!this.readonly) {
        this.optionForEdit = option
        this.showEditDialog = true
      }
    },

    optionEdited(option) {
      if (option) {
        const salePageOption = this.data.options.find(o => o.TD_FID == option.TD_FID)
        Object.assign(salePageOption, option)
        this.optionForEdit = null
      }
      this.showEditDialog = false
    },

    sections_changed() {
      var local_data = JSON.parse(JSON.stringify(this.data))
      var obj1 = {
        TPS_FUserViewType: local_data.TPS_FUserViewType,
        options: local_data.options
      }


      var local_lastsaved_data = JSON.parse(JSON.stringify(this.lastsaved_data))
      var obj2 = {
        TPS_FUserViewType: local_lastsaved_data.TPS_FUserViewType,
        options: local_lastsaved_data.options
      }

      return !(JSON.stringify(obj1) === JSON.stringify(obj2))
    },
  }
  // components: { OptionsTable }
};
</script>
