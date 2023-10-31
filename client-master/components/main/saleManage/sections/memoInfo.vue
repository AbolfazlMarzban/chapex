<template>
  <v-expansion-panel class="togglebox">

    <accordian-title title="توضیحات" :unsaved="sections_changed()" :readonly="readonly" />

    <v-expansion-panel-content>
      <v-row>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row>

        <v-tabs v-model="tab" grow>
          <v-tab>متن بالای صفحه (زیر عنوان)</v-tab>
          <v-tab>توضیحات</v-tab>
          <v-tab>راهنمای طراحی</v-tab>
          <v-tab>معرفی محصول</v-tab>
          <v-tab>سوالات متداول</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ui-editor placeholder="متن زیر عنوان صفحه" v-model="data.TPS_FDetails"
                  value="data.TPS_FDetails"></ui-editor>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ui-editor placeholder="توضیحات" v-model="data.TPS_FComment" value="data.TPS_FComment"></ui-editor>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ui-editor placeholder="راهنمای طراحی" v-model="data.TPS_FDesign" value="data.TPS_FDesign"></ui-editor>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <ui-editor placeholder="معرفی محصول" v-model="data.TPS_FIntroduction"
                  value="data.TPS_FIntroduction"></ui-editor>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ui-editor placeholder="سوالات متداول" v-model="data.TPS_FQuestion" value="data.TPS_FQuestion">
                </ui-editor>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: ["data", "defaults", "readonly", "wizardView", "lastsaved_data"],
  data() {
    return { tab: null, };
  },
  methods: {
    sections_changed() {

      var local_data = JSON.parse(JSON.stringify(this.data))
      var obj1 = {
        TPS_FDetails: local_data.TPS_FDetails,
        TPS_FComment: local_data.TPS_FComment,
        TPS_FDesign: local_data.TPS_FDesign,
        TPS_FQuestion: local_data.TPS_FQuestion,
        TPS_FIntroduction: local_data.TPS_FIntroduction,
      }


      var local_lastsaved_data = JSON.parse(JSON.stringify(this.lastsaved_data))
      var obj2 = {
        TPS_FDetails: local_lastsaved_data.TPS_FDetails,
        TPS_FComment: local_lastsaved_data.TPS_FComment,
        TPS_FDesign: local_lastsaved_data.TPS_FDesign,
        TPS_FQuestion: local_lastsaved_data.TPS_FQuestion,
        TPS_FIntroduction: local_lastsaved_data.TPS_FIntroduction,
      }

      return !(JSON.stringify(obj1) === JSON.stringify(obj2))
    },
  },
};
</script>