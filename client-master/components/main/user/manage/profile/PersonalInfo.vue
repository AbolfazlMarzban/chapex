<template>
    <v-expansion-panel class="togglebox">
        <accordian-title title="اطلاعات شخصی" :unsaved="false" :readonly="readonly" />

        <v-expansion-panel-content>
            <v-card class="">
                <v-card-text>
                    <v-row class="manage_user_row">

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="کد کاربر" :readonly="true"
                                v-model="data.TU_FID" />
                        </v-col>

                        <v-col cols="4">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'نوع حساب کاربری',
                                count: 10,
                            }" :items="defaults[117]" />
                            <span>(غیر فعال)</span>

                        </v-col>

                        <v-col cols="4">
                            <v-btn>
                                <span>تغییر نوع حساب</span>
                                <span>(غیر فعال)</span>
                            </v-btn>
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="نام و نام خانوادگی"
                                placeholder="نام" :readonly="readonly" v-model="data.TU_FName" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="نام تجاری / نام فروشگاه"
                                placeholder="نام خانوادگی / نام تجاری" :readonly="readonly" v-model="data.TU_FFamil" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="کد ملی" placeholder="کدملی"
                                :readonly="readonly" v-model="data.TU_FCodeMeli" />
                        </v-col>

                        <v-col cols="4">
                            <ui-select :readonly="readonly" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'جنسیت',
                                count: 10,
                            }" v-model="data.TU_FID_Sex" :items="defaults[122]" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="تاریخ تولد" placeholder="1380/01/01"
                                :readonly="readonly" v-model="data.TU_FDateBirth" />
                        </v-col>

                        <v-col cols="4">
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="شماره حساب مرجوعی وجه"
                                placeholder="" :readonly="readonly" v-model="data.TU_FAccount" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="شماره شبا مرجوعی وجه"
                                placeholder="IR____________________________" :readonly="readonly"
                                v-model="data.TU_FAccountCard" />
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>

export default {
    props: ["data", "defaults", "readonly"],

    methods: {

    }
}
</script>