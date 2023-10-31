<template>
    <div v-if="item.TPIC_FDelete == 0">

        <v-btn icon large class="ma-2" @click="doDelete">
            <v-icon color="pink">mdi-delete-forever</v-icon>
        </v-btn>

    </div>
    <div v-else>
        <span class="font-italic">حذف شده</span>
        <v-btn @click="doRecover" icon color="indigo accent-3">
            <v-icon>mdi-arrow-u-left-top-bold</v-icon>
        </v-btn>
    </div>
</template>

<script>

export default {
    props: ["item"],
    data() {
        return {
        };
    },
    methods: {
        doDelete() {
            this.$emit('doDelete', this.item)
        },
        doRecover() {
            this.$emit('doRecover', this.item)
        }
    },
}
</script>