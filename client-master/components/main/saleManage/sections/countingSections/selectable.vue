<template>
    <v-row>
        <v-col cols="4">
            <PressEnter class="centered-input" :items="data.TPS_FIDs_NumberList" :readonly="readonly"></PressEnter>
        </v-col>
        <v-col cols="2">
            <v-text-field class="centered-input" prepend-inner-icon="mdi-radiobox-marked" readonly label="تعداد پییشفرض"
                v-model.number="data.TPS_FNumberDefault"></v-text-field>
        </v-col>

        <v-col cols="6"></v-col>

        <v-col cols="4">
            <PressEnterList :data="data" @defaultValueChanged="defaultValueChanged" :readonly="readonly">
            </PressEnterList>
        </v-col>

        <v-col cols="2" v-if="data.TPS_FIDs_NumberList && data.TPS_FIDs_NumberList.length > 0">
            <v-btn color="pink" class="goods_dialog_btn" @click="clearList" :disabled="readonly">
                حذف همه
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
import PressEnter from "./selectableSections/selectableSectionsPressEnter.vue";
import PressEnterList from "./selectableSections/selectableSectionsPressEnterList.vue";
export default {
    props: ["data", "readonly"],
    components: { PressEnter, PressEnterList },
    methods: {
        defaultValueChanged(value) {
            this.data.TPS_FNumberDefault = Number(value)
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