<template>
  <v-row>
    <v-col v-for="(button, index) of options.Buttons" :key="index">
      <v-btn
        v-if="button.show"
        :color="button.color"
        :disabled="button.readonly"
        @click="eventHandler(button.event)"
      >
        <span>{{button.title}}</span>
        <v-icon>{{button.icon}}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["options"],
  computed: {},
  methods: {
    eventHandler(event) {
      this.$emit(event);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>