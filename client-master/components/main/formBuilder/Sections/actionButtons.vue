<template>
  <div class="pallete action-pallete">
    <p class=" white--text">عملیات</p>
    <v-row class="pa-2">
      <v-col cols="6" class="pa-1">
        <v-btn id="1" block @click="addField('text')" draggable="false" @dragstart="drag($event)"
          class="draggable_fields_list_item action-draggable_fields_list_item">
          <FormFieldLabel type="text"></FormFieldLabel>
        </v-btn>
      </v-col>

      <v-col cols="6" class="pa-1">
        <v-btn id="2" block @click="addField('button')" draggable="false" @dragstart="drag($event)"
          class="draggable_fields_list_item action-draggable_fields_list_item">
          <FormFieldLabel type="button"></FormFieldLabel>
        </v-btn>
      </v-col>
      




    </v-row>
  </div>
</template>
<script>
import FormFieldLabel from './componentsSections/formFieldLabel.vue';
export default {
  methods: {
    addField(state) {
      this.$emit("addField2", state);
    },
    drag(event) {
      this.$emit("drag2", event);
    }
  },
  components: { FormFieldLabel }
};
</script>
<style
  lang="scss"
  src="../../../../assets/style/formBuilder/formBuilder.scss"
>

</style>

<style scoped>
.pallete {
  align-self: flex-end;
  position: sticky;
  bottom: 1rem;
}
.action-pallete{
    bottom: 34rem!important;
}
.action-draggable_fields_list_item{
  cursor: pointer !important;
}
</style>
