<template>
    <v-dialog v-model="addAddressDialog" width="700" content-class="">
        <Loading v-if="loading && submitLoading" text="در حال ذخیره سازی..." />
        <Loading v-else-if="loading" text="در حال دریافت اطلاعات..." />

        <v-card v-else class="submitComment_dialog">
            <v-card-title>
                <div style="min-width: 100%">
                    <v-row class="submitComment_title">
                        <v-col cols="6">
                            <div class="popup-title">اطلاعات رسمی (مالیاتی)</div>
                        </v-col>
                        <v-col cols="6" class="text-left">
                            <div class="user-opinion float-left">
                                <div class="cursor-pointer" text @click="$emit('closeDialog')">
                                    <v-icon>mdi-close-thick</v-icon>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-card-title>

            <v-card-text>
                <div class="user-opinion fns-16">

                    <div v-if="data" class="row">
                        <v-col cols="6">
                            <label>شخصیت تجاری</label>
                            <v-select :items="[{ id: 0, title: 'حقیقی' }, { id: 1, title: 'حقوقی' }]" class="pt-0 mt-0"
                                v-model="data.TUX_FType" item-value="id" item-text="title"></v-select>
                        </v-col>

                        <v-col cols="6">
                            <ui-input type="text" label="نام تجاری" class="form_control_textInput pt-0 mt-7"
                                v-model="data.TUX_FName" />
                        </v-col>

                        <v-col cols="6">
                            <ui-input type="text" label="شماره شناسنامه / ثبت" class="form_control_textInput"
                                v-model="data.TUX_FShenas" />
                        </v-col>

                        <v-col cols="6">
                            <ui-input type="text" label="شماره ملی" class="form_control_textInput"
                                v-model="data.TUX_FMelli" />
                        </v-col>

                        <v-col cols="6">
                            <ui-input type="text" label="شماره اقتصادی" class="form_control_textInput"
                                v-model="data.TUX_FEcoCode" />
                        </v-col>

                        <v-col cols="6">
                            <ui-input type="text" label="شماره تماس" class="form_control_textInput"
                                v-model="data.TUX_FTel" />
                        </v-col>

                        <v-col cols="12">
                            <ui-input required type="text" v-model="data.TUX_FAddress" class="form_control_textInput"
                                label="آدرس" placeholder=" " />
                        </v-col>
                    </div>

                </div>
            </v-card-text>

            <v-card-actions>
                <v-row class="justify-center">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12"></div>

                    <div v-if="state == 'insert'" class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 delivery_btn">
                        <v-btn @click="submitTaxInfo()" class="btn-order">
                            ثبت
                        </v-btn>
                    </div>
                    <div v-else-if="state == 'edit'" class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 delivery_btn">
                        <v-btn @click="updateTaxInfo()" class="btn-order">
                            ثبت
                        </v-btn>
                    </div>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
// import deliveryStatusMixin from "../_mixins/deliveryStatusMixins";
import Loading from '../../../../saleManage/Loading.vue';

export default {
    props: ["state", "taxRowId"],
    // mixins: [deliveryStatusMixin],
    data() {
        return {
            addAddressDialog: true,
            showOnMapDialog: false,
            data: {},
            defaults: {},
            loading: true,
            submitLoading: false,
        };
    },

    async mounted() {
        if (this.state == 'insert') {
            try {
                const res = await this.$authAxios.$get('/tax/get/0?mode=init')
                // console.log('init', res);
                if (res) {
                    this.data = res.data.form
                }
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        }

        else if (this.state == 'edit') {
            try {
                const res = await this.$authAxios.$get(`/tax/get/${this.taxRowId}?mode=update`)
                if (res) {
                    this.data = res.data.form
                }
            } catch (error) {
                console.log(error)
            }
            this.loading = false
        }
    },

    methods: {
        async submitTaxInfo() {
            this.loading = true
            this.submitLoading = true

            try {
                let result = await this.$authAxios.$post("/tax/", { data: this.data })

                // console.log('result', result);
                if (result) {
                    this.showResponseSuccessMessages(result)
                    this.$emit('taxSubmited')
                }
                else {
                    this.showResponseErrors(error);
                }
            } catch (error) {
                this.showResponseErrors(error);
                console.log(error);
            }

            this.loading = false
            this.submitLoading = false
        },

        async updateTaxInfo() {
            this.loading = true
            this.submitLoading = true

            try {
                let result = await this.$authAxios.$post("/tax/update", { data: this.data })
                if (result) {
                    this.showResponseSuccessMessages(result)
                    this.$emit('taxSubmited')
                }
            } catch (error) {
                console.log(error);
                // this.showResponseErrors(error);
            }

            this.loading = false
            this.submitLoading = false
        },
    },

    components: { Loading }
}
</script>