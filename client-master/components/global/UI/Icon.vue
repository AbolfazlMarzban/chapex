<template>
  <client-only v-if="icon">
    <font-awesome-icon :icon="icon" />
  </client-only>
</template>

<script>
export default {
  props: ["icon"],
};
</script>

<style lang="scss" scoped>
</style>