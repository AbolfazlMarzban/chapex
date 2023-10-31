<template>
  <div class="pallete">
    <p class=" white--text">پالت</p>
    <v-row class="pa-2">
      <v-col cols="6" class="pa-1" v-for="item in fields" :key="item.TD_FID">
        <v-btn
          :id="item.TD_FID"
          block
          class="draggable_fields_list_item"
          @click="addField(item)"
          draggable="true"
          @dragstart="drag(item)"
        >
        <FormFieldLabel :type="item.TD_FComment"></FormFieldLabel>
      </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import FormFieldLabel from "./componentsSections/formFieldLabel.vue";
export default {
  props: [ "fields" ],
  methods: {
    addField(id) {
      this.$emit("addField", id);
    },
    drag(item) {
      this.$emit("drag", item);
    }
  },
  components: { FormFieldLabel }
};
</script>
<style
  lang="scss"
  src="../../../../assets/style/formBuilder/formBuilder.scss"
></style>

<style scoped>
.pallete {
  align-self: flex-end;
  position: sticky;
  bottom: 1rem;
}
</style>
