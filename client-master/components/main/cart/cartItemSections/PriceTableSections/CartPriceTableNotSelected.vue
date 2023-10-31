<template>
    <v-col cols="12" class="notSelectedRow pa-1" @click="$emit('tirajChanged', tiraj)">
        <v-row>
            <v-col cols="4">{{ tiraj }}</v-col>
            <v-col cols="4">{{ numberSeparate(fee.toFixed(0)) }}</v-col>
            <v-col cols="4">{{ numberSeparate(price.toFixed(0)) }}</v-col>
            <!-- <v-col cols="4">{{ numberSeparate(sood.toFixed(0)) }}</v-col> -->
        </v-row>
    </v-col>
</template>

<script>

export default {
    props: ["sood", "fee", "price", "tiraj", "state"]
}
</script>

<style scoped>
.notSelectedRow {
    background: #D9D9D9;
    border-radius: 20px;
    height: 32px;
    text-align: center !important;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer !important;
}
</style>