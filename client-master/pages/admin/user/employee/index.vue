<template>
  <div>
    <LazyManageUser state="employee"/>
  </div>
</template>

<script>
export default {
  middleware: ["init-auth", "is-auth", "is-user"],
  layout: "manage",
};
</script>

<style lang="scss" scoped>
</style>