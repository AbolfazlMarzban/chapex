<template>
    <v-dialog width="700" content-class="">
        <div id="map">
            <!-- <mapir :center="center" :apiKey="apiKey"></mapir> -->
        </div>
    </v-dialog>
</template>

<script>
// import { mapir } from "mapir-vue";

export default {
    // components: { mapir },
    data() {
        return {
            apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjkwNDg0M2YyNTM1YjVkNDJiODAzZmYyMGM3ZmJlYWQxYzY2MTk3ZDAyNzY5YTczNDgxZmMzZWFiNTE5OTRkMjE4ZDUyNWFhMjcxNWQzZTAyIn0.eyJhdWQiOiIyMTA2OCIsImp0aSI6IjkwNDg0M2YyNTM1YjVkNDJiODAzZmYyMGM3ZmJlYWQxYzY2MTk3ZDAyNzY5YTczNDgxZmMzZWFiNTE5OTRkMjE4ZDUyNWFhMjcxNWQzZTAyIiwiaWF0IjoxNjc2MjcwODEzLCJuYmYiOjE2NzYyNzA4MTMsImV4cCI6MTY3ODc3NjQxMywic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OY66hJlsnC6ZWpGGKJ7A5Z2kXxdY_GveE1hrs6T8iAaRD5vSqJ3Avu6d5L3F1yiW6LH0ajdukAt6b-ulg8KqHeZ3fAYS1F_i2k5K5lBC9q63P7lOvLeoXyoDmIThqog_O8AYpXAZiPxPEED41C2gk0Eh6K8riMpZBOTEbEGN3Ga-Gmr_9cltfYDAw4XgiBDsaeQaBWn4c1z_ENI2gkFKHTvrBea05V-ovQN-3KGWyHglT7PZRe2-oRvrkTSexSYK4fhzApomaLU5a3ctaOk20uDhqewabYDyl2Pis-BZui-EFh7c5g_WcI0VCw_E8cFRA68XsOlRe3u_a3s0yZUFGw',
            center: [51.420296, 35.732379]
        };
    },
}
</script>

<style scoped>
#map {
    width: 90vw;
    height: 90vh;
}
</style>