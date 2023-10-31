<template>
    <v-expansion-panel class="togglebox">
        <accordian-title title="اطلاعات تکمیلی" :unsaved="false" :readonly="readonly" />

        <v-expansion-panel-content>
            <v-card class="">
                <v-card-text>
                    <v-row class="manage_user_row">

                        <v-col cols="4">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'سمت مشتری در محل کار',
                                count: 10,
                            }" v-model="data.TU_FArchive" :items="defaults[128]" />
                        </v-col>

                        <v-col cols="4">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'صنف فعالیت',
                                count: 10,
                            }" v-model="data.TU_FID_Bussines" :items="defaults[125]" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="شرح فعالیت" placeholder=""
                                :readonly="readonly" v-model="data.TU_FWork" />
                        </v-col>

                        <v-col cols="4">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'طریقه آشنایی با ما',
                                count: 10,
                            }" v-model="data.TU_FID_Relation" :items="defaults[126]" />
                        </v-col>

                        <v-col cols="4">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'استان محل زندگی',
                                count: 10,
                            }" v-model="data.TU_FID_City1" :items="defaults[123]" />
                        </v-col>

                        <v-col cols="4">
                            <ui-select :readonly="readonly || !data.TU_FID_City1" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'شهر محل زندگی',
                                count: 10,
                            }" :rel="data.TU_FID_City1" v-model="data.TU_FID_City2" :items="defaults[124]" />
                        </v-col>

                    </v-row>

                    <v-row>
                        <v-col cols="12" class="mt-4">
                            <ui-textarea lable="توضیحات" row="5" :readonly="readonly" v-model="data.TU_FComment" />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>

export default {
    props: ["data", "defaults", "readonly"]
}
</script>