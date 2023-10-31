<template>
  <lazy-manage-abol-table :tableId="this.$route.params.slug"/>
</template>

<script>
export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "manage",
};
</script>  
