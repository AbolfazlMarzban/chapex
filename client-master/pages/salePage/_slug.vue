<template>
  <div> 
    <LazyUserSalePage :salePageFLink="this.$route.params.slug" />
  </div>
</template>

<script>
export default {
  props: ["data"],
  middleware: ["init-auth", "init-cart"],
  layout: "salePagelayout",
  //middleware: ["init-auth", "is-auth"],
  async asyncData({ params }) {
    const slug = params.slug; // When calling /abc the slug will be "abc"
    return { slug };
  }
};
</script>

<style lang="scss" scoped></style>
