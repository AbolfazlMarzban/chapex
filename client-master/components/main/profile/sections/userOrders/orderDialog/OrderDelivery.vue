<template>
    <v-expansion-panel>
        <v-expansion-panel-header> وضعیت ارسال</v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-row class="justify-center">
                <v-col cols="10" xl="8" lg="8" md="8" class="text-center d-flex flex-column px-0 order-alarm">
                    <v-icon color="red">mdi-shield-alert-outline</v-icon>
                    <span>سفارش شما هنوز وارد مرحله ارسال نشده است</span>
                </v-col>
            </v-row>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>

export default {

}
</script>