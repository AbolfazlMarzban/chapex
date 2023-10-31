<template>
    <div class="legal">
        <v-row>
            <v-col cols="12" class="d-flex">
                <h2 class="legal-info">تغییر کلمه عبور</h2>
            </v-col>
        </v-row>

        <v-row class="form-row">
            <v-col xl="4" lg="4" md="4" sm="4" cols="12">
                <label for="">گذرواژه جدید</label>
                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                   class="pt-0 mt-0" hint="حداقل 6 کاراکتر" counter @click:append="show1 = !show1"></v-text-field>
            </v-col>

            <v-col xl="4" lg="4" md="4" sm="4" cols="12">
                <label for="">تکرار گذرواژه</label>
                <v-text-field v-model="passwordRet" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.match]"
                    :type="show2 ? 'text' : 'password'" name="input-10-1" class="pt-0 mt-0" counter
                    @click:append="show2 = !show2"></v-text-field>
            </v-col>

            <v-col xl="4" lg="4" md="4" sm="4" cols="12">
                <v-btn @click="changePasswordHandle" dark color="rgba(1, 102, 112, 0.8)" elevation="2"
                    class="float-left mx-1">
                    <v-icon color="white">mdi-content-save-outline</v-icon>
                    <span class="white--text mr-2">تغییر کلمه عبور</span>
                </v-btn>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import submitData from '../../../../../plugins/mixins/auth/submitData';

export default {
    props: ["userData"],
    mixins: [submitData],
    data() {
        return {
            password: '',
            passwordRet: '',
            show1: false,
            show2: false,
            rules: {
                required: value => !!value || 'الزامی',
                min: v => v.length >= 6 || 'حداقل 6 کاراکتر',
                match: () => (this.password === this.passwordRet) || 'Password must match'
            },
        }
    },
    methods: {
        async changePasswordHandle() {
            try {
                const result = await this.Submit().changePassword(
                    this.User.TU_FID,
                    this.password,
                    this.passwordRet
                );
                this.$store.dispatch("login/login", result.user);
                // this.$emit("done", result.user);
            } catch (error) {
                return null;
            }
        },
    },
}
</script>

<style lang="scss">
.legal{
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