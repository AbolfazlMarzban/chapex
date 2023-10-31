<template>
  <v-container>
    <v-row>
      <v-col
        cols="3"
        @click="$emit('editDialog', option)"
      >
        <span
          v-if="option.TD_FType == 21703"
          color="#016670"
          class="selectiveOption ml-2"
          >{{ option.TD_FName }}
        </span>

        <span
          v-else-if="option.TD_FType == 21704"
          color="pink"
          class="designOption ml-2"
          >{{ option.TD_FName }}
        </span>

        <span
          v-else-if="option.TD_FType == 21705"
          color="orange"
          class="reviewOption ml-2"
          >{{ option.TD_FName }}
        </span>
      </v-col>
      <v-col cols="9">
        <span
          v-for="(child, i) in getOptionValues(salePage, option.TD_FID)"
          :key="i"
        >
          <v-chip
            v-if="option.TD_FType == 21703"
            class="pa-1 px-2 ma-1 text-caption"
            :color="child.TD_FActive ? '#a8e3e9' : '#aaadad'"
          >
            <Transition name="bounce">
              <span v-if="child.TD_FDefault" class="ml-2">
                <v-icon dark right>mdi-crosshairs-gps</v-icon>
              </span>
            </Transition>

            <span
              class="font-weight-black text-decoration-underline"
              v-if="child.TD_FDefault"
              >{{ child.TD_FName }}</span
            >
            <span v-else>{{ child.TD_FName }}</span>
          </v-chip>

          <v-chip
            v-else-if="option.TD_FType == 21704"
            class="pa-1 px-2 ma-1 text-caption"
            color="pink lighten-3"
          >
            <span>{{ child.TD_FName }}</span>
          </v-chip>

          <v-chip
            v-else-if="option.TD_FType == 21705"
            class="pa-1 px-2 ma-1 text-caption"
            color="orange lighten-3"
          >
            <span>{{ child.TD_FName }}</span>
          </v-chip>

          <v-chip
            v-else-if="option.TD_FType == 21706"
            class="pa-1 px-2 ma-1 text-caption"
            color="blue lighten-4"
          >
            <span>{{ child.TD_FName }}</span>
          </v-chip>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import saleDataMixin from "../../../sale/_mixins/saleDataMixin";

export default {
  props: ["salePage", "option"],
  mixins: [saleDataMixin]
};
</script>

<style scoped>
.selectiveOption {
  color: #016670;
  font-weight: bold !important;
  font-family: boldbakhtiari !important;
  font-size: 30px;
}

.designOption {
  color: pink;
  font-weight: bold !important;
  font-family: boldbakhtiari !important;
  font-size: 30px;
}

.reviewOption {
  color: orange;
  font-weight: bold !important;
  font-family: boldbakhtiari !important;
  font-size: 30px;
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}

.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
