<template>
  <div>
    <v-carousel v-model="model">
      <v-carousel-item v-for="(color, i) in colors" :key="color">
        <v-sheet :color="color" height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h2">Slide {{ i + 1 }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <v-row>
      <v-col cols="2" v-for="(i, index) in colors" :key="index">
        <p @click="changeSlider(index)">
          {{ i }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 4,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
      colors1: [
        "primary1",
        "secondary1",
        "yellow darken-21",
        "red1",
        "orange1",
      ],
    };
  },
  methods: {
    changeSlider(index) {
      this.model = index;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>