<template>
    <v-btn @click="change" :color="color()" class="ma-1" small rounded>
        <span class="ml-2">{{ text }}</span>
        <v-icon v-if="exist()">mdi-arrow-up-drop-circle</v-icon>
        <v-icon v-else>mdi-arrow-down-drop-circle-outline</v-icon>
    </v-btn>
</template>

<script>
export default {
    props: ["accordianValues", "value", "text"],
    methods: {
        change() {

            var index = this.accordianValues.indexOf(Number(this.value))

            if (index > -1)
                this.accordianValues.splice(index, 1)
            else
                this.accordianValues.push(Number(this.value))

        },
        exist() {
            var index = this.accordianValues.indexOf(Number(this.value))
            if (index > -1)
                return true

            return false
        },
        color() {
            if (this.exist())
                return "success"

            return ""
        }
    }
}
</script>