<template>
  <div>
    <v-row v-for="option in options" :key="option.TD_FOrder">
      <v-col cols="12">
        {{ option.TD_FName }}

        <v-radio-group row class="option_list_group">
          <v-radio
            v-for="children in option.children"
            :key="children.TD_FOrder"
            :label="children.TD_FName"
            :id="children.TD_FID.toString()"
            :disabled="children.disabled"
            @click="findProduct(children)"
            class="option_list_item ma-1"
            active-class="option_list_item_active"
          >
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["options"],
  methods: {
    findProduct(value) {
      this.$emit("findProduct", value);
    }
  }
};
</script>

<style lang="scss" src="../../../assets/style/Ul/OptionList.scss"></style>
