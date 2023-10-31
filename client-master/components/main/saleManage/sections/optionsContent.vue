<template>
  <v-expansion-panel>
    <accordian-title
      title="خصوصیات"
      :unsaved="sections_changed()"
      :readonly="readonly"
    />

    <v-expansion-panel-content v-if="data.options">
      <v-row>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row> 
        <SalePageAddOption
          :OptionType="OptionType"
          @cancel="showAddDialog = false"
          @submit="showAddDialog = false"
          v-if="showAddDialog"
          :defaults="defaults"
          :salePage="data"
          status="insert"
        />

        <v-col cols="4">
          <span v-if="this.data.options && this.data.options.length == 0"
            >خصوصیتی تعریف نشده</span
          >
        </v-col>
        
      </v-row>

      <v-row v-if="this.data.options.length > 0" class="mt-3">
        <v-col cols="12">
          <OptionsContentTable
            :salePage="this.data"
            :defaults="defaults"
            :readonly="readonly"
          >
          </OptionsContentTable>
        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
// import OptionsTable from './optionsSection/optionsTable.vue';

export default {
  props: [
    "data",
    "defaults",
    "readonly",
    "wizardView",
    "lastsaved_data",
    "status"
  ],
  data() {
    return {
      options: [],
      addDependencyDialog: false,
      addDependencyImg: false,
      showAddDialog: false,
      OptionType: 21703,
    };
  },
  methods: {

    sections_changed() {
      var local_data = JSON.parse(JSON.stringify(this.data));
      var obj1 = {
        TPS_FUserViewType: local_data.TPS_FUserViewType,
        options: local_data.options
      };

      var local_lastsaved_data = JSON.parse(
        JSON.stringify(this.lastsaved_data)
      );
      var obj2 = {
        TPS_FUserViewType: local_lastsaved_data.TPS_FUserViewType,
        options: local_lastsaved_data.options
      };

      return !(JSON.stringify(obj1) === JSON.stringify(obj2));
    }
  }
  // components: { OptionsTable }
};
</script>
