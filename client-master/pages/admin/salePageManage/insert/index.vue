<template>
  <div>
    <LazySalePageContentManage :FID="this.$route.params.slug" />
  </div>
</template>

<script>
export default {
  middleware: ["init-auth", "is-auth", "is-user"],
  layout: "manage"
};
</script>
