<template>
    <v-chip v-if="depCount() > 0" small class="mr-2" color="teal lighten-4">
        <v-icon small>mdi-link-variant</v-icon>
        <span>{{ depCount() }}</span>
    </v-chip>
</template>

<script>
export default {
    props: ["items", "item"],
    data() {
        return {
            showDeleteDialog: false,
        }
    },
    methods: {
        depCount() {
            return this.item.dependecy.length
        }
    }
}
</script>