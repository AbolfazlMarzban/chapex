<template>
  <div>
    <LazyFormUser :state="$route.params.slug" />
  </div>
</template>
  
<script>

export default {
  middleware: ["init-auth", "is-auth", "is-user"],
  layout: "manage",
};
</script>
  
<style lang="scss" scoped></style>