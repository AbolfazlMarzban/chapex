<template>
    <Loading v-if="loading && submitLoading" text="در حال ذخیره سازی..." />
    <Loading v-else-if="loading" text="در حال دریافت اطلاعات..." />

    <div v-else>
        <LazyDefaultDelete @deleteItemFromTable="do_delete" @hiddenDialog="showDeleteDialog = false"
            :showDeleteDialog="showDeleteDialog" :selectedRowData="data" />

        <ui-header-manager :title="headerManager.title" :Buttons="headerManager.buttons" :status="headerManager.status"
            @insert="insert" @edit="editMode" @delete="showDeleteDialog = true" @submit="submit" @cancel="cancel"
            @return="do_return" />

        <v-card color="basil" class="product_form_container">
            <v-card color="basil" flat>
                <v-card-text>
                    <v-container>
                        <v-row class="defaultForm">
                            <v-col cols="6" md="3">
                                <ui-input label="کد " type="int" icon="user" name="TU_FUserName"
                                    class="form_control_textInput" v-model="data.TD_FCode" required :readonly="readonly" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-input label="نام" name="TD_FName" v-model="data.TD_FName" class="form_control_textInput"
                                    required :readonly="readonly" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-input label="نوع تعریف پایه" name="TD_FCaption" v-model="data.TD_FCaption"
                                    class="form_control_textInput" :readonly="readonly" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-Input label="ترتیب" name="TD_FOrder" v-model="data.TD_FOrder"
                                    class="form_control_textInput" :readonly="readonly" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-input label="مقدار 1" name="TD_FValue1" v-model="data.TD_FValue1"
                                    class="form_control_textInput" :readonly="readonly" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-input label="مقدار 2" name="TD_FValue2" v-model="data.TD_FValue2"
                                    class="form_control_textInput" :readonly="readonly" />
                            </v-col>

                            <v-col cols="12" md="3" sm="12">
                                <ui-Input label="مقدار 3" name="TD_FValue3" v-model="data.TD_FValue3"
                                    class="form_control_textInput" :readonly="readonly" type="Int" />
                            </v-col>

                            <v-col cols="12" md="3" sm="12">
                                <ui-input label="مقدار 4" name="TD_FValue4" v-model="data.TD_FValue4"
                                    class="form_control_textInput" :readonly="readonly" />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6" class="pt-0">
                                <ui-textarea v-model="data.TD_FComment" class="form_control_textInput" lable="توضیحات"
                                    name="TD_FComment" :readonly="readonly" row="3" />
                            </v-col>

                            <v-col cols="3" class="pt-0 mt-0">
                                <v-checkbox v-model="data.TD_FActive" label="فعال" :disabled="readonly"></v-checkbox>
                            </v-col>

                            <v-col cols="3" class="pt-0 mt-0">
                                <v-checkbox v-model.number="data.TD_FSubGroup" label="زیرگروه"
                                    :disabled="readonly"></v-checkbox>
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-data-picker label="تاریخ ثبت" name="TD_FDateReg" required v-model="data.TD_FDateReg"
                                    :readonly="true" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-data-picker label="ساعت ثبت" name="TD_FTimeReg" required dateType="time"
                                    v-model="data.TD_FTimeReg" :readonly="true" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-input label="کاربر ثبت کننده" class="form_control_textInput" :readonly="true"
                                    name="TD_FUserReg" v-model="data.TD_FUserRegName" />
                            </v-col>

                            <v-col cols="6" md="3">
                                <ui-input label="سریال" class="form_control_textInput" name="TD_FID" required
                                    v-model="data.TD_FID" :readonly="true" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-card>
    </div>
</template>
  
<script>
import variables from "./_mixins/defaultVariables";
import defaultMixins from "./_mixins/defaultMxin";
import Loading from "../saleManage/Loading.vue";

export default {
    props: ["FID", "state"],
    mixins: [variables, defaultMixins],

    data() {
        return {
            loading: true,
            submitLoading: false,
            readonly: true,
            data: {},
            defaults: {},
            parentId: null,
            showDeleteDialog: false,
        }
    },

    async mounted() {
        this.headerManager.status = "start";
        if (this.state == 'show')
            await this.showMode();
        else if (this.state == 'insert')
            await this.insertMode();
    },

    methods: {
        async insertMode() {
            this.headerManager.status = "insert";
            this.headerManager.title.icon = "plus"

            this.readonly = false

            const result = await this.getInit(this.FID);

            if (result.form) {
                this.data = result.form;
                this.defaults = result.defaults;

                this.loading = false
            }
        },

        async showMode() {
            this.readonly = true
            const result = await this.getShow(this.FID);
            if (result.form) {
                this.data = result.form;
                this.parentId = result.parentId
                this.defaults = result.defaults;

                this.loading = false
                this.headerManager.status = "show";
                this.headerManager.title.icon = "eye"
            }
            else {
                this.$nuxt.$options.router.push({ path: "/admin/defaults/insert/" });
            }
        },

        async editMode() {
            this.headerManager.status = "edit";
            this.headerManager.title.icon = "pencil-alt"
            this.readonly = false
        },

        do_return() {
            if (this.FID)
                this.$router.push(`/admin/defaults/${this.parentId}`)
            else
                this.$router.push('/admin/defaults/')
        },

        async cancel() {
            if (this.state == 'insert') {
                if (this.FID)
                    this.$router.push(`/admin/defaults/${this.FID}`)
                else
                    this.$router.push('/admin/defaults/')
            }
            else if (this.state == 'show') {
                await this.showMode();
            }
        },

        async submit() {
            this.submitLoading = true
            this.loading = true

            if (this.FID)
                this.data.TD_FID_Group = this.FID

            const result = await this.Submit(this.headerManager.status, this.data);
            if (result && !result.error) {
                if (this.state == 'insert') {
                    const ReturnFID = result.otherData.output.ReturnFID
                    this.$router.push(`/admin/defaults/manage/${ReturnFID}`)
                }
                else if (this.state == 'show') {
                    await this.showMode();
                }
            }
            else {
                this.submitLoading = false
                this.loading = false
            }
        },

        async do_delete() {
            this.submitLoading = true
            this.loading = true

            const result = await this.Submit("delete", this.FID);
            if (result) {
                this.$router.push(`/admin/defaults/${this.parentId}`)
            }
        },
    },

    components: { Loading }
};
</script>
  
<style lang="scss" scoped></style>