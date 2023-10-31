<template>
    <v-col cols="12" class="SelectedRow pa-1">
        <v-row>
            <v-col cols="2">
                <v-icon>mdi-arrow-left-thick</v-icon>
            </v-col>
            <v-col cols="3">{{ tiraj }}</v-col>
            <v-col cols="3">{{ numberSeparate(fee.toFixed(0)) }}</v-col>
            <v-col cols="3">{{ numberSeparate(price.toFixed(0)) }}</v-col>
            <!-- <v-col cols="4" class="text-center">---</v-col> -->
        </v-row>
    </v-col>
</template>

<script>

export default {
    props: ["sood", "fee", "price", "tiraj", "state"]
}
</script>

<style scoped>
.SelectedRow {
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border: 1px solid #D9D9D9;
    height: 32px;
    text-align: right;
    font-size: 16px;
    font-weight: 600;
}
</style>