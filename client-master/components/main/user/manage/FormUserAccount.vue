<template>
    <div v-if="data && defaults" class="manage-user-table">
        <v-row class="manage_user_row">
            <v-col cols="4">
                <ui-input-money class="form_control_textInput" label="کد کاربر" v-model="data.TU_FID" :readonly="true" />
            </v-col>

            <v-col cols="4">
                <ui-input-money class="form_control_textInput" label="سطح دسترسی" :readonly="true" />
                <span>(غیر فعال)</span>
            </v-col>

            <v-col cols="4">
            </v-col>

            <v-col cols="4">
                <ui-select :readonly="readonly" :options="{
                    fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName',
                    },
                    label: 'نوع کاربر',
                    count: 10,
                }" :items="defaults[12001]" v-model="data.TU_FID_CustomerType" />
            </v-col>

            <v-col cols="4">
                <ui-select :readonly="readonly" :options="{
                    fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName',
                    },
                    label: 'طبقه بندی',
                    count: 10,
                }" :items="defaults[11601]" v-model="data.TU_FID_CustomerGrade" />
            </v-col>

            <v-col cols="4">
                <ui-select :readonly="readonly" :options="{
                    fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName',
                    },
                    label: 'وضعیت کاربر',
                    count: 10,
                }" :items="defaults[12901]" v-model="data.TU_FID_CustomerStatus" />
            </v-col>
        </v-row>

        <v-row class="manage_user_row">
            <v-col cols="4">
                <ui-input-money class="form_control_textInput" label="مبلغ اعتبار" v-model="data.TU_FCredit"
                    :readonly="readonly" />
            </v-col>

            <v-col cols="4">
                <ui-input type="text" class="form_control_textInput" label="تاریخ پایان اعتبار"
                    v-model="data.TU_FCreditExpDate" :readonly="readonly" />
            </v-col>

            <v-col cols="4">
                <ui-input type="text" class="form_control_textInput" label="تاریخ شروع اعتبار"
                    v-model="data.TU_FCreditStartDate" :readonly="readonly" />
            </v-col>
        </v-row>

        <v-row class="manage_user_row">

            <v-col cols="4">
                <ui-select :readonly="readonly" :options="{
                    fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName',
                    },
                    label: 'مسئول پیگیری',
                    count: 10,
                }" v-model="data.TU_FID_TrackerUser" />
            </v-col>

            <v-col cols="4">
                <ui-select :readonly="readonly" :options="{
                    fields: {
                        id: 'TD_FID',
                        name: 'TD_FName',
                        search: 'TD_FName',
                    },
                    label: 'معرف',
                    count: 10,
                }" v-model="data.TU_FUserRecomender" />
            </v-col>
        </v-row>

        <v-row class="manage_user_row">
            <v-col cols="4">
                <ui-input type="text" class="form_control_textInput" label="زمان ثبت نام"
                    :value="data.TU_FDateReg + ' ساعت ' + data.TU_FTimeReg" :readonly="true" />
            </v-col>

            <v-col cols="4">
                <ui-input type="text" class="form_control_textInput" label="آخرین ورود"
                    :value="data.TU_FLoginLastDate + ' ساعت ' + data.TU_FLoginLastTime" :readonly="true" />
            </v-col>
        </v-row>


    </div>
</template>

<script>
export default {
    props: ["readonly", "data", "defaults"],
};
</script>

<style lang="scss" scoped></style>