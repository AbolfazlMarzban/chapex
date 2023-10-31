<template>
    <v-row class="align-center">

        <v-col cols="12" lg="6" md="6">
            <v-radio-group class="option_list_group" v-model="deliveryStatusData.deliveryMethod"
                @change="$emit('deliveryMethodChanged')">

                <v-radio v-for="method in methods" :key="method.TD_FID" :label="method.TD_FName"
                    class="option_list_item text-right" active-class="option_list_item_active" :value="method.TD_FID">
                </v-radio>

            </v-radio-group>
        </v-col>

        <GetInOwnPlace :deliveryStatusData="deliveryStatusData" />

    </v-row>
</template>

<script>

export default {
    props: ["deliveryStatusData", "methods"],
}
</script>