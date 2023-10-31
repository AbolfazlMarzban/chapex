<template>
    <div>
        <LazyCardPaymentPage :orderHeadId="$route.params.slug" />
    </div>
</template>
  
<script>
export default {
    middleware: ["init-auth", "is-auth", "init-cart"],
    layout: "mainOrg"
}
</script>
  
<style></style>