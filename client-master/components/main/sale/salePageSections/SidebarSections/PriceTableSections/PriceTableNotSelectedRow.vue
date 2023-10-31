<template>
    <v-col cols="12" class="notSelectedRow pa-1 mt-1" @click="tirajChanged(priceRow.tiraj)">
        <v-row @click="moveLine($event)">
            <v-col cols="1" class="text-center">
                <v-icon color="gray" style="font-size: 14px;">mdi-circle-outline</v-icon>
            </v-col>
            <v-col cols="3">{{ priceRow.tiraj }}</v-col>
            <v-col cols="4" v-if="state == 'feeBase'">{{ numberSeparate(priceRow.fee.toFixed(0)) }}</v-col>
            <v-col cols="4" v-else-if="state == 'totalBase'">{{ numberSeparate(priceRow.price.toFixed(0))
            }}</v-col>
            <v-col cols="4" style="color: #016670 !important; font-family: boldbakhtiari !important;">{{
                numberSeparate(priceRow.sood.toFixed(0)) }}</v-col>
        </v-row>
    </v-col>
</template>

<script>

export default {
    props: ["priceRow", "state"],
    inject: ["tirajChanged"],
    methods: {
        moveLine(e) {
            // console.log('event', e.target)
        }
    }

}
</script>

<style scoped>
.notSelectedRow {
    background: lightgray;
    border-radius: 20px;
    height: 32px;
    text-align: center !important;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer !important;
    font-family: bakhtiari !important;
}

@media (max-width:600px) {
    .notSelectedRow {
        font-size: 14px !important;
        font-family: bakhtiari !important;
        color: gray;
    }
}
</style>