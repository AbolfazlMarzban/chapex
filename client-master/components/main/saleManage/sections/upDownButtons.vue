<template>
    <span>
        <v-btn @click="up(item)" :disabled="item[FieldName] == 0 || readonly" icon color="indigo">
            <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
        <v-btn @click="down(item)" :disabled="item[FieldName] == items.length - 1 || readonly" icon color="pink">
            <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
    </span>
</template>

<script>
export default {
    props: ["items", "item", "readonly", "FieldName"],
    methods: {
        up(item) {
            var beforeitem = this.items.find(i => i[this.FieldName] == item[this.FieldName] - 1)

            item[this.FieldName]--
            beforeitem[this.FieldName]++

            this.items.sort((a, b) => { return a[this.FieldName] - b[this.FieldName] })

        },
        down(item) {
            var afteritem = this.items.find(i => i[this.FieldName] == item[this.FieldName] + 1)

            item[this.FieldName]++
            afteritem[this.FieldName]--

            this.items.sort((a, b) => { return a[this.FieldName] - b[this.FieldName] })
        }
    },
    // mounted() {
    //     console.log('this.item[this.FieldName]', this.item[this.FieldName]);
    // }
}
</script>