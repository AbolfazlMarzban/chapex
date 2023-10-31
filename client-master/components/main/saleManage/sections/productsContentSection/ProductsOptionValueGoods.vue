<template>
    <v-card elevation="2" class="pa-1 ma-2 mb-10">

        <v-card-text class="ma-0 pa-1">
            <v-card class="pa-1">
                <v-card-title>فرم سفارش طراحی و آپلود</v-card-title>
                <v-card-text class="ma-0 pa-0">
                    <v-row>
                        <v-col cols="6">
                            <v-row>
                                <v-col :cols="readonly ? 12 : 10">
                                    <ui-select :readonly="readonly" :options="{
                                        fields: {
                                            id: 'TF_FID',
                                            name: 'TF_FName',
                                            search: 'TF_FName',
                                        },
                                        label: '   فرم طراحی مرتبط  ',
                                        count: 10,
                                    }" v-model="productOptionValue.TGPV_FID_DesignForm"
                                        :items="formList.filter(f => f.TF_FID_FType == 11401)" />
                                </v-col>
                                <v-col cols="2" v-if="!readonly">
                                    <v-btn @click="productOptionValue.TGPV_FID_DesignForm = null" icon class="mt-4">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>

                        <v-col cols="6">
                            <v-row>
                                <v-col :cols="readonly ? 12 : 10">
                                    <ui-select :readonly="readonly" :options="{
                                        fields: {
                                            id: 'TF_FID',
                                            name: 'TF_FName',
                                            search: 'TF_FName',
                                        },
                                        label: '   فرم آپلودر مرتبط  ',
                                        count: 10,
                                    }" v-model="productOptionValue.TGPV_FID_UploadForm"
                                        :items="formList.filter(f => f.TF_FID_FType == 11402)" />
                                </v-col>
                                <v-col cols="2" v-if="!readonly">
                                    <v-btn @click="productOptionValue.TGPV_FID_UploadForm = null" icon class="mt-4">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>

            <v-divider class="my-4"></v-divider>

            <v-card class="pa-1">
                <v-card-title class="d-flex">
                    <span>قالب های طراحی</span>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <ui-gallery :state="2400301" :FID_Parent="productOptionValue.TGPV_FID" :gallery="salePage.gallery"
                        :readonly="readonly"></ui-gallery>
                </v-card-text>
            </v-card>

            <v-divider class="my-4"></v-divider>

            <v-card class="pa-1">
                <v-card-title class="d-flex">
                    <span>قالب شیت</span>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <ui-gallery :state="2400302" :FID_Parent="productOptionValue.TGPV_FID" :gallery="salePage.gallery"
                        :readonly="readonly"></ui-gallery>
                </v-card-text>
            </v-card>

        </v-card-text>
    </v-card>
</template>

<script>
import FileList from './sections/FileList.vue';

export default {
    props: ["salePage", "productOptionValue", "readonly", "formList"],
    data() {
        return {
            selectedValue: '',
            showCommentDialog: false,
            showPriceDialog: false,
            showStockDialog: false,
            selectedGoods: null,
            addFileDialog: false,
            selected: []
        };
    },
    methods: {},
    components: { FileList }
}
</script>

<style scoped>
.select_label {
    font-size: 12px;
    padding: 0;
    margin: 0;
    color: blue;
}
</style>