<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="items-per-page"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
props:[
    "headers", "items", "items-per-page"
]
}
</script>

<style>

</style>