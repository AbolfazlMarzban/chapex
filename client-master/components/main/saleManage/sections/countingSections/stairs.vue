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
        <v-col cols="2">
            <v-text-field v-model.number="data.TPS_FNumberStep" class="centered-input" label="پلکان افزایش تعداد"
                :disabled="readonly">
            </v-text-field>
        </v-col>
        <v-col cols="2">
            <v-btn color="teal" class="goods_dialog_btn mt-4" @click="generat" :disabled="readonly">
                ایجاد پلکان
            </v-btn>
        </v-col>
        <v-col cols="2">
            <v-text-field v-model.number="data.TPS_FNumberDefault" prepend-inner-icon="mdi-radiobox-marked" readonly
                class="centered-input" label="تعداد پییشفرض"></v-text-field>
        </v-col>
        <v-col cols="4">
            <List :data="data"></List>
        </v-col>
        <v-col cols="2" v-if="data.TPS_FIDs_NumberList && data.TPS_FIDs_NumberList.length > 0">
            <v-btn color="pink" class="goods_dialog_btn" @click="clearList" :disabled="readonly">
                حذف همه
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ["data", "readonly"],
    methods: {
        generat() {
            var min = Number(this.data.TPS_FNumberMin)
            var max = Number(this.data.TPS_FNumberMax)
            var step = Number(this.data.TPS_FNumberStep)

            if (min >= 0 && max >= min && step >= 0) {

                this.data.TPS_FIDs_NumberList.push(min)
                for (var i = min + step; i <= max; i += step) {
                    this.data.TPS_FIDs_NumberList.push(i)

                }
            }
        },
        clearList() {
            this.data.TPS_FNumberMin = null
            this.data.TPS_FNumberMax = null
            this.data.TPS_FNumberStep = null
            this.data.TPS_FNumberDefault = null
            this.data.TPS_FIDs_NumberList = []
        }
    }
}
</script>