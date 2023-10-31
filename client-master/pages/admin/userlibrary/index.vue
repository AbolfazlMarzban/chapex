<template>
    <user-library class="mt-10" :isAdmin="true" />
</template>

<script>
export default {
    middleware: ["init-auth", "is-auth", "is-user"],
  layout: "manage",

}
</script>

<style>

</style>  