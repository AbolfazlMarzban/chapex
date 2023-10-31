<template>
  <v-container class="bg-white">
    <v-row>
      <v-col cols="4">
        <ui-input
          type="text"
          class="form_control_textInput"
          label="عنوان استاندارد "
          :readonly="readonly"
          v-model="data.TGB_FName"
        />
      </v-col>
      <v-col cols="4">
        <ui-select
          :readonly="readonly"
          :options="{
            fields: {
              id: 'TD_FID',
              name: 'TD_FName',
              search: 'TD_FName'
            },
            label: 'نوع بسته بندی',
            count: 10
          }"
          :items="defaults[227]"
          v-model="data.TGB_FID_Type"
        />
        <!-- v-model="data.TGP_FID_Option" -->
      </v-col>
      <v-col cols="4">
        <ui-input-money
          type="money"
          class="form_control_textInput"
          label="هزینه ارسال هر بسته  "
          :readonly="readonly"
          v-model.number="data.TGB_FPrice"
        />
      </v-col>
      <v-col cols="4">
        <ui-input
          type="Int"
          class="form_control_textInput"
          label="  عرض (CM)   "
          :readonly="readonly"
          v-model="data.TGB_FWidth"
        />
      </v-col>
      <v-col cols="4">
        <ui-input
          type="Int"
          class="form_control_textInput"
          label="  طول (CM)   "
          :readonly="readonly"
          v-model="data.TGB_FLength"
        />
      </v-col>
      <v-col cols="4">
        <ui-input
          type="Int"
          class="form_control_textInput"
          label="  ارتفاع (CM)   "
          :readonly="readonly"
          v-model="data.TGB_FHight"
        />
      </v-col>
      <v-col cols="4">
        <ui-input
          type=""
          class="form_control_textInput"
          label="  حداقل وزن (KG)   "
          :readonly="readonly"
          v-model="data.TGB_FWeightMin"
        />
      </v-col>
      <v-col cols="4">
        <ui-input
          type="text"
          class="form_control_textInput"
          label="  حداکثر وزن (KG)   "
          :readonly="readonly"
          v-model="data.TGB_FWeightMax"
        />
      </v-col>
      <v-col cols="4">
        <ui-select
            multiple="true"
          :readonly="readonly"
          :options="{
            fields: {
              id: 'TD_FID',
              name: 'TD_FName',
              search: 'TD_FName'
            },
            label: 'روش های ارسال  ',
            count: 10
          }"
          :items="defaults[226]"
          v-model="data.TGB_FSend"
        />
        <!-- v-model="data.TGP_FID_Option" -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-4 product_form_txtarea">
        <ui-textarea
          lable="توضیحات "
          row="3"
          :readonly="readonly"
          v-model="data.TGB_FComment"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["data", "defaults", "readonly"],
  data() {
    return {};
  },
  methods: {}
};
</script>
