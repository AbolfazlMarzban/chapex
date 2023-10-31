<template>
  <div>
    <v-card color="basil" flat>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <ui-select
                :readonly="readonly"
                multiple="true"
                :options="{
                  fields: {
                    id: '',
                    name: '',
                    search: ''
                  },
                  label: ' کلمات کلیدی ',
                  count: 10
                }"
                v-model="data.TPS_FSEO1"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <ui-textarea
                lable=" متای توضیحات "
                row="5"
                :readonly="readonly"
                placeholder="  "
                v-model="data.TPS_FSEO2"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <ui-textarea
                lable=" اسکیما  "
                row="5"
                :readonly="readonly"
                placeholder="  "
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="mt-4">
              <p>ویژگی های صفحه</p>
            </v-col>
            <v-col cols="12" class="mt-0" md="2" sm="12">
              <v-checkbox
                v-model="data.TPS_FSEOProp"
                label="   Add Canonical   "
                value="close"
                :disabled="readonly"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="mt-0" md="2" sm="12">
              <v-checkbox
                v-model="selected"
                label="   Add Nofollow  "
                value="close"
                :disabled="readonly"
                
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="mt-0" md="2" sm="12">
              <v-checkbox
                v-model="selected"
                label="  Add Noindex    "
                value="close"
                :disabled="readonly"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="mt-4">
              <p>اشتراک گذاری در شبکه های اجتماعی</p>
            </v-col>
            <v-col cols="12" class="mt-0" md="2" sm="12">
              <v-checkbox
                v-model="data.TPS_FSEONetwork"
                label="  ٌWhatsapp     "
                value=""
                :disabled="readonly"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="mt-0" md="2" sm="12">
              <v-checkbox
                v-model="selected"
                label="  Telegram     "
                value="close"
                :disabled="readonly"
              ></v-checkbox>
            </v-col>
            <v-col cols="12" class="mt-0" md="2" sm="12">
              <v-checkbox
                v-model="selected"
                label="  Facebook     "
                value="close"
                :disabled="readonly"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["data", "defaults", "readonly"],
  data() {
    return {
      tab: null,
      selected: []
    };
  }
};
</script>

<style lang="scss" scoped></style>
