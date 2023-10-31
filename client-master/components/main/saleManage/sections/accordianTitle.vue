<template>
  <v-expansion-panel-header :class="expanded ? 'editModeExpanded' : 'editMode'">
    <v-row>
      <v-col class="col-7 col-sm-6">
        <v-row>
          <v-col class="col-10 col-sm-4">
            <v-row v-if="readonly" class="showModeTitle">
              <span class="col-10 col-sm-8 text-right">{{ title }}
              </span>
              <span class="col-1 col-sm-4 text-left">|</span>
            </v-row>
            <v-row v-else class="editModeTitle">
              <v-icon class="col-1 col-sm-2 " color="#016670">mdi-pencil</v-icon>
              <span class="col-10 col-sm-8 text-right">{{ title }}
              </span>
              <span class="col-1 col-sm-2 text-left">|</span>
            </v-row>
          </v-col>
          <v-col class="col-2 col-sm-8"></v-col>
        </v-row>
      </v-col>
      <v-col class="col-5 col-sm-6 text-left">
        <span class="col-1 col-sm-4">
          <v-icon v-if="unsaved" color="yellow darken-3">mdi-content-save-edit-outline</v-icon>
        </span>
      </v-col>
    </v-row>
  </v-expansion-panel-header>
</template>

<script>
export default {
  props: ["title", "unsaved", "readonly", "expanded"],
};
</script>

<style scoped>
.showModeTitle {
  color: rgba(0, 0, 0, 0.87);
  font-weight: bolder;
  font-size: larger;
}

.editModeTitle {
  color: #016670;
  font-weight: bolder;
  font-size: larger;
}

.editMode {
  background-color: #FFFFFF;
}

.editModeExpanded {
  color: #e5fdff;
  background-color: #016770;

}
</style>
