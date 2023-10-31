<template>
  <v-container class="pageFormMain">
    <v-row>
      <v-col cols="12">
        <p>
          <span>عنوان فرم:</span>
          <span>{{data.form.TF_FName}}</span>
        </p>
      </v-col>
      <v-col cols="12" v-for="field of this.fields" :key="field.data.TFF_FID">
        <ui-input
          v-if="field.type == 'input'"
          class="form_control_textInput"
          :label="field.data.TFF_FLable"
          v-model="value['field_'+ field.data.TFF_FID_Form +'_'+field.data.TFF_FID]"
        />
        <ui-textarea
          v-else-if="field.type == 'textarea' "
          :lable="field.data.TFF_FLable"
          row="5"
          class="form_control_textInput"
          v-model="value['field_'+ field.data.TFF_FID_Form +'_'+field.data.TFF_FID]"
        />
        <ui-select
          v-else-if="field.type == 'select'"
          :options="{
                      fields: {
                        id: 'TFF_FID',
                        name: 'TFF_FLable',
                        search: 'TFF_FLable'
                      },
                      label: field.data.TFF_FLable ,
                      count: 7
                    }"
          :items="field.data.items"
          v-model="value['field_'+ field.data.TFF_FID_Form +'_'+field.data.TFF_FID]"
        />
      </v-col>

      <v-col cols="12">
        <ui-button label="ثبت" @click="submit" class="draggable_fields_list_item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      data: {
        form: {},
        fields: [],
      },
      value: {},
    };
  },
  async mounted() {
    try {
      const id = this.$route.query.id
      const response = await this.$authAxios.$get("formBuilder/getForm/"+id);
      console.log(response);
      this.data.form = response.data.form;
      this.data.fields = response.data.fields;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    fields() {
      let fields = [];
      for (const field of this.data.fields) {
        if (field.TFF_FID_TypeField == 11100) {
          fields.push({
            type: "input",
            data: field,
          });
        } else if (field.TFF_FID_TypeField == 11105) {
          fields.push({
            type: "select",
            data: field,
          });
        } else if (field.TFF_FID_TypeField == 11101) {
          fields.push({
            type: "textarea",
            data: field,
          });
        }
      }
      return fields;
    },
  },
  methods: {
    async submit() {
      try {
        const result = await this.$authAxios.$post("/formBuilder/formData", {
          data: this.value,
        });
        if (result) {
          this.showResponseSuccessMessages(result);
          return result;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pageFormMain {
  background-color: white !important;
}
</style>