<template>
  <v-expansion-panel class="togglebox">
    <accordian-title title="توضیحات تکمیلی" :unsaved="sections_changed()" />

    <v-expansion-panel-content>
      <v-row class="form_builder_header col-12">
        <v-col cols="12">
          <template>
            <v-tabs v-model="tab">
              <v-tab>ویرایشگر</v-tab>
              <v-tab>raw html</v-tab>
            </v-tabs>
          </template>

          <v-tabs-items v-model="tab">

            <v-tab-item>
              <v-card style="min-height:500px">
                <v-card-text>
                  <ui-editor label="" :value="data.TF_FComment" v-model="data.TF_FComment" :readonly="readonly">
                  </ui-editor>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card style="min-height:500px">
                <v-card-text>
                  <v-textarea dense rows="15" :value="data.TF_FComment" v-model="data.TF_FComment" :disabled="readonly">
                  </v-textarea>
                </v-card-text>
              </v-card>
            </v-tab-item>

          </v-tabs-items>

        </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  props: ["data", "lastsaved_data", "readonly"],

  data() {
    return {
      tab: null
    }
  },

  methods: {
    sections_changed() {

      var local_data = JSON.parse(JSON.stringify(this.data))
      var obj1 = {
        TF_FComment: local_data.TF_FComment,
      }


      var local_lastsaved_data = JSON.parse(JSON.stringify(this.lastsaved_data))
      var obj2 = {
        TF_FComment: local_lastsaved_data.TF_FComment,
      }

      return !(JSON.stringify(obj1) === JSON.stringify(obj2))
    },
  }
};
</script>


<style
    lang="scss"
    src="../../../../assets/style/formBuilder/formBuilder.scss"
  >
  
  </style>

<style scoped>

</style>
  