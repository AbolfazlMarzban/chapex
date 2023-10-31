<template>
    <v-expansion-panel>
        <v-expansion-panel-header>مشخصات سفارش</v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row style="font-size: 14px;" v-for="(item, i) in data" :key="i">
                <v-col cols="12" class="py-2">
                    <span>{{ item.TOP_FID_OptionName }} :</span>
                    <span style="color: #016670; font-weight: bold;">{{ item.TOP_FID_OptionValueName }}</span>
                </v-col>
                <!-- <v-col cols="1"></v-col>
                <v-col cols="5" class="text-right">
                    <span >
                        {{ item.TOP_FID_OptionName }}
                    </span>
                </v-col>
                <v-col cols="6" class="text-right">
                    <span class="">
                        {{ item.TOP_FID_OptionValueName }}
                    </span>
                </v-col> -->
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>


export default {
    props: ["data"],
}
</script>