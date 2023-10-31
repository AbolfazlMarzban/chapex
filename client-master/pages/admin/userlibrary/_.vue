<template>
    <user-library class="mt-10" :isAdmin="true" :route="this.$route.params" />
</template>

<script>
export default {
    middleware: ["init-auth", "is-auth", "is-user"],
    layout: "manage",
    // components:{ library}
}
</script>

<style>

</style>  