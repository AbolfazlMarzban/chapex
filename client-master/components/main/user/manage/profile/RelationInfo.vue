<template>
    <v-expansion-panel class="togglebox">
        <accordian-title title="اطلاعات ارتباطی" :unsaved="false" :readonly="readonly" />

        <v-expansion-panel-content>
            <v-card class="">
                <v-card-text>
                    <v-row class="manage_user_row">

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="شماره تلفن همراه"
                                placeholder="0912000000" :readonly="readonly" v-model="data.TU_FMobile1" />

                            <v-btn>اعتبارسنجی</v-btn>

                            <!-- <div>
                        <span>اطلاع رسانی پیامک</span>
                        <v-treeview selectable :items="defaults[800]" item-key="TD_FID" item-text="TD_FName"
                            v-model="data.TU_FIDs_SendSms">
                        </v-treeview>
                    </div> -->
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="ایمیل" placeholder="ایمیل"
                                :readonly="readonly" v-model="data.TU_FEmail" />

                            <v-btn>اعتبارسنجی</v-btn>

                            <!-- <div>
                        <span>اطلاع رسانی ایمیل</span>
                        <v-treeview selectable :items="defaults[800]" item-key="TD_FID" item-text="TD_FName"
                            v-model="data.TU_FIDs_SendEmail">
                        </v-treeview>
                    </div> -->
                        </v-col>

                        <!-- <v-col cols="4">
                </v-col> -->

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="شماره ثابت"
                                placeholder="02100000000" :readonly="readonly" v-model="data.TU_FTell1" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="آدرس وبسایت"
                                placeholder="http://namasite.com" :readonly="readonly" v-model="data.TU_FWebsite" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="آدرس اینستاگرام"
                                placeholder="@insta_account" :readonly="readonly" v-model="data.TU_FInstagram" />
                        </v-col>

                        <v-col cols="4">
                            <ui-input type="text" class="form_control_textInput" label="آیدی تلگرام"
                                placeholder="@insta_account" :readonly="readonly" v-model="data.TU_FTelegram" />
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

    data() {
        return {
            smsTreeItems: [],
            emailTreeItems: []
        }
    },

    async mounted() {
    },
    methods: {

    }
}
</script>