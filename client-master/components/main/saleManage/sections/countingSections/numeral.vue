<template>
    <v-row>
        <v-col cols="3">
            <v-text-field v-model.number="data.TPS_FNumberMin" class="centered-input" label="حداقل تعداد"
                :disabled="readonly"></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-text-field v-model.number="data.TPS_FNumberMax" class="centered-input" label="حداکثر تعداد"
                :disabled="readonly"></v-text-field>
        </v-col>
        <v-col cols="3">
            <v-text-field v-model.number="data.TPS_FNumberDefault" class="centered-input" label="تعداد پیشفرض"
                :disabled="readonly">
            </v-text-field>
        </v-col>
        <v-col cols="3">
            <v-text-field v-model.number="data.TPS_FNumberStep" class="centered-input" label="پلکان جدول قیمت"
                :disabled="readonly">
            </v-text-field>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ["data", "readonly"],
}
</script>