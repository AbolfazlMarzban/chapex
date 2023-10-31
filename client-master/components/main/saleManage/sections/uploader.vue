<template>
  <v-expansion-panel>
    <accordian-title title="آپلودر" :readonly="readonly" />
    <v-row>
      <v-col>
        <!-- <v-divider></v-divider> -->
      </v-col>
    </v-row>
    <v-expansion-panel-content> </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["data", "defaults", "readonly", "wizardView", "lastsaved_data"],
  data() {
    return {};
  },
  methods: {},
};
</script>