<template>
    <div class="tbl-content">
        <div class="text-left d-xl-none d-lg-none d-md-none d-block">
            <v-icon @click="$emit('closeComponent')">mdi-close-circle</v-icon>
        </div>
        <v-row class="pt-4">
            <v-col cols="12" class="text-right pt-0 pb-2 d-flex">
                <h2 class="personal-info">اطلاعات شخصی</h2>
            </v-col>
        </v-row>

        <br />
        <v-row class="profile_form_row">

            <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label for="">نام و نام خانوادگی</label>
                <v-text-field v-model="userData.TU_FName" :disabled="readonly"
                    :rules="[rules.required]" class="mt-0 pt-0"></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label for="">نام خانوادگی</label>
                <v-text-field v-model="userData.TU_FFamil" :disabled="readonly"
                    :rules="[rules.required]" class="mt-0 pt-0"></v-text-field>
            </v-col> -->

            <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label for="">سمت شغلی</label>
                <v-text-field  :disabled="readonly"
                    :rules="[rules.required]" class="mt-0 pt-0"></v-text-field>
            </v-col>


            <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label for="">ایمیل</label>
                <v-text-field v-model="userData.TU_FEmail" :disabled="readonly" placeholder="info@example.com"
                    :rules="[rules.required, rules.email]" class="mt-0 pt-0"></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <ui-input label="سمت" class="form_control_textInput" :readonly="readonly" />
            </v-col> -->

            <v-col cols="12" md="4" sm="4" xs="12" class="py-1 pt-5">
                <label for="">جنسیت</label>
                <v-select class="pt-0 mt-0" :items="[{ text: 'مرد', id: 12201 }, { text: 'زن', id: 12202 }]"
                    :disabled="readonly" item-value="id" v-model="userData.TU_FID_Sex" :rules="[rules.required]"></v-select>
            </v-col>

            <v-col cols="12" md="4" sm="4" xs="12" class=" pt-3 pb-1">
                <label>تاریخ تولد</label>
                <date-picker :disabled="readonly" v-model="userData.TU_FDateBirth"
                    style="width: 100%; min-width: auto !important;" class="mt-2"></date-picker>
            </v-col>

            <v-col cols="12" md="4" sm="4" xs="12" class="py-1 pt-3">
                <label for="">کد ملی</label>
                <v-text-field v-model="userData.TU_FCodeMeli" :disabled="readonly"
                    :rules="[rules.required]" class="mt-0 pt-0"></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label>نوع شماره</label>
                <v-select class="pt-0 mt-0" :items="['موبایل', 'محل کار', 'منزل', 'دفتر', 'فکس']"
                    :disabled="readonly"></v-select>
            </v-col> -->

            <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label for="">شماره همراه</label>
                <v-text-field v-model="userData.TU_FTell1" placeholder="09120000000"
                    :disabled="readonly" :rules="[rules.required]" class="mt-0 pt-0"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label for="">تلفن ثابت</label>
                <v-text-field  placeholder="0210000000"
                    :disabled="readonly" :rules="[rules.required]" class="mt-0 pt-0"></v-text-field>
            </v-col>


             <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label for="">شماره داخلی</label>
                <v-text-field  placeholder="-00"
                    :disabled="readonly" :rules="[rules.required]" class="mt-0 pt-0"></v-text-field>
            </v-col>

            <!-- <v-col cols="12" md="4" sm="4" xs="12" class="py-1">
                <label>ارسال پیامک به</label>
                <v-select class="pt-0 mt-0" :disabled="readonly"></v-select>
            </v-col>

            <v-col cols="12">
                <v-data-table :headers="headers" :disabled="readonly"></v-data-table>
            </v-col> -->

        </v-row>

        <ActionBar :readonly="readonly" @edit="$emit('edit')" @cancel="$emit('cancel')" @submit="$emit('submit')" />

        <br />
    </div>
</template>

<script>
import ActionBar from './ActionBar.vue';

export default {
    props: ["userData", "defaults", "readonly"],
    data() {
        return {
            localUserData: {},
            rules: {
                required: value => !!value || 'الزامی.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'ایمیل نامعتبر است'
                },
            }
        };
    },
    mounted() {
        // this.localUserData = JSON.parse(JSON.stringify(this.userData))
    },
    methods: {
        submit() {
            const result = this.submit("edit", this.localUserData);
            if (result) {
                this.$emit("profileUpdated", this.localUserData);
            }
        },
    },
    components: { ActionBar }
}
</script>
<style lang="scss">
.tbl-content{
    .v-input__slot{

        input{
            padding-right: 10px;

        }
    }
    .v-input__slot::before{
        display: none !important;
    }

}
</style>