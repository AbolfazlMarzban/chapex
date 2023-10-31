<template>
  <v-expansion-panel class="togglebox">
    <accordian-title title="تعداد" :unsaved="sections_changed()" :readonly="readonly" />

    <v-expansion-panel-content>
      <v-row>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <label>نوع انتخاب تعداد</label>
          <v-select :items="qntSelect" v-model.lazy="data.TPS_FID_NumberType" :disabled="readonly"></v-select>
        </v-col>
      </v-row>
      <Numeral v-if="data.TPS_FID_NumberType == 'عددی'" :data="data" :readonly="readonly"></Numeral>
      <Stairs v-if="data.TPS_FID_NumberType == 'پلکانی'" :data="data" :readonly="readonly"></Stairs>
      <Selectable v-if="data.TPS_FID_NumberType == 'انتخابی'" :data="data" :readonly="readonly"></Selectable>

    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import Selectable from "./countingSections/selectable.vue";
export default {
  props: ["data", "defaults", "readonly", "wizardView", "lastsaved_data"],
  data() {
    return {
      qntSelect: ["عددی", "پلکانی", "انتخابی"],
    };
  },
  methods: {
    sections_changed() {
      var local_data = JSON.parse(JSON.stringify(this.data))
      var obj1 = {
        TPS_FID_NumberType: local_data.TPS_FID_NumberType,
        TPS_FIDs_NumberList: local_data.TPS_FIDs_NumberList,
        TPS_FNumberDefault: local_data.TPS_FNumberDefault,
        TPS_FNumberMin: local_data.TPS_FNumberMin,
        TPS_FNumberMax: local_data.TPS_FNumberMax,
        TPS_FNumberStep: local_data.TPS_FNumberStep,
      }


      var local_lastsaved_data = JSON.parse(JSON.stringify(this.lastsaved_data))
      var obj2 = {
        TPS_FID_NumberType: local_lastsaved_data.TPS_FID_NumberType,
        TPS_FIDs_NumberList: local_lastsaved_data.TPS_FIDs_NumberList,
        TPS_FNumberDefault: local_lastsaved_data.TPS_FNumberDefault,
        TPS_FNumberMin: local_lastsaved_data.TPS_FNumberMin,
        TPS_FNumberMax: local_lastsaved_data.TPS_FNumberMax,
        TPS_FNumberStep: local_lastsaved_data.TPS_FNumberStep,
      }

      return !(JSON.stringify(obj1) === JSON.stringify(obj2))
    },
  },
  mounted() {
    this.$vuetify.rtl = true;
  },
  components: { Selectable }
};
</script>

<style scoped>
/deep/ .centered-input input {
  text-align: center
}
</style>