<template>
    <v-col cols="12" class="SelectedRow pa-1 mt-0">
        <v-row>
            <v-col cols="1" class="text-center">
                <v-icon color="#016670" style="font-size: 14px;">mdi-circle</v-icon>
            </v-col>
            <v-col cols="3" class="text-center">{{ priceRow.tiraj }}</v-col>
            <v-col cols="4" class="text-center" v-if="state == 'feeBase'">{{
                numberSeparate(priceRow.fee.toFixed(0)) }}</v-col>
            <v-col cols="4" class="text-center" v-else-if="state == 'totalBase'">{{
                numberSeparate(priceRow.price.toFixed(0)) }}</v-col>
            <!-- <v-col cols="4" class="text-center">---</v-col> -->
        </v-row>
    </v-col>
</template>

<script>

export default {
    props: ["priceRow", "state"]
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
    font-family: bakhtiari !important;

}

@media (max-width:600px) {
    .SelectedRow {
        font-size: 14px !important;
        font-family: bakhtiari !important;
    }
}
</style>