<template>
    <v-dialog v-model="addAddressDialog" width="700" content-class="">
        <Loading v-if="loading && submitLoading" text="در حال ذخیره سازی..." />
        <Loading v-else-if="loading" text="در حال دریافت اطلاعات..." />

        <v-card v-else class="submitComment_dialog">
            <v-card-title>
                <div style="min-width: 100%">
                    <v-row class="submitComment_title">
                        <v-col cols="6">
                            <div class="popup-title">آدرس</div>
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

                    <v-row>
                        <v-col cols="12" class="text-center">
                            <v-btn @click="showOnMapDialog = true" color="success">
                                <v-icon>mdi-map-marker-radius-outline</v-icon>
                                <span>انتخاب از روی نقشه</span>
                            </v-btn>
                        </v-col>

                        <!-- <SelectAddressOnMapDialog v-if="showOnMapDialog" /> -->
                    </v-row>

                    <div v-if="data" class="row">
                        <div xs="12" class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-12">
                            <ui-select :allowNull="false" v-model="data.TUA_FID_City1" :items="defaults[123]" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: ' استان ',
                                count: 10,
                            }" />
                        </div>

                        <div xs="12" class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-12">
                            <ui-select v-if="data.TUA_FID_City1" v-model="data.TUA_FID_City2"
                                :items="defaults[124].filter(c => c.TD_FID_Group == data.TUA_FID_City1)" :options="{
                                    fields: {
                                        id: 'TD_FID',
                                        name: 'TD_FName',
                                        search: 'TD_FName',
                                    },
                                    label: ' شهر ',
                                    count: 10,
                                }" />
                        </div>
                    </div>

                    <div class="row">
                        <div xs="12" class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-12">
                            <ui-input v-model="data.TUA_FPlace" type="text" class="form_control_textInput"
                                label="نوع محل تحویل" placeholder="منزل، آپارتمان، کارخانه، فروشگاه و ..." />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-12">
                            <ui-input required type="text" v-model="data.TUA_FAddress" class="form_control_textInput"
                                label="آدرس" placeholder=" " />
                        </div>
                    </div>
                    <div class="row">
                        <div xs="12" class=" col-sm-12 col-md-4 col-lg-4 col-xl-4 col-12">
                            <ui-input required v-model="data.TUA_FPlates" type="text" class="form_control_textInput"
                                label="پلاک" placeholder=" " />
                        </div>
                        <div xs="12" class=" col-sm-12 col-md-4 col-lg-4 col-xl-4 col-12">
                            <ui-input v-model="data.TUA_FUnit" type="text" class="form_control_textInput" label="واحد"
                                placeholder=" " />
                        </div>
                        <div xs="12" class=" col-sm-12 col-md-4 col-lg-4 col-xl-4 col-12">
                            <ui-input required v-model="data.TUA_FPost" type="text" class="form_control_textInput"
                                label="کدپستی" placeholder=" " />
                        </div>
                    </div>
                    <br />
                    <div class="row">
                        <div xs="12" class=" text-right col-sm-12 col-md-6 col-lg-6 col-xl-6 col-12 pt-5">
                            <span class="gr-color fn-bold">اطلاعات تحویل گیرنده</span>
                        </div>

                        <div xs="12" v-if="User.TU_FNameFamil"
                            class=" text-left d-flex justify-lg-end justify-md-end col-sm-12 col-md-6 col-lg-6 col-xl-6 col-12">
                            <v-checkbox label="گیرنده خودم هستم" @change="useMyself">
                            </v-checkbox>
                        </div>
                    </div>
                    <hr class="mt-2" />
                    <div class="row">
                        <div class="col col-12 col-md-4 col-lg-4 cols-xl-4">
                            <ui-input required v-model="data.TUA_FName" type="text" class="form_control_textInput"
                                label="نام و نام خانوادگی" placeholder=" " />
                        </div>
                        <div xs="12" class=" col-sm-12 col-md-4 col-lg-4 col-xl-6 col-12">
                            <ui-input required v-model="data.TUA_FTell1" type="text" class="form_control_textInput"
                                label="شماره همراه" placeholder=" " />
                        </div>
                        <div xs="12" class=" col-sm-12 col-md-4 col-lg-4 col-xl-6 col-12">
                            <ui-input v-model="data.TUA_FCodeMeli" type="text" class="form_control_textInput" label="کد ملی"
                                placeholder=" " />
                        </div>
                    </div>

                    <div class="row">


                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-row class="justify-center">
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12"></div>

                    <div v-if="state == 'insert'" class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 delivery_btn">
                        <v-btn @click="submitAddress" class="btn-order">
                            ثبت
                        </v-btn>
                    </div>
                    <div v-else-if="state == 'edit'" class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 delivery_btn">
                        <v-btn @click="submitAnAddressAfterEdit" class="btn-order">
                            ثبت
                        </v-btn>
                    </div>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import deliveryStatusMixin from "../_mixins/deliveryStatusMixins";
import Loading from "../../saleManage/Loading.vue";

export default {
    props: ["state", "addressRowId"],
    mixins: [deliveryStatusMixin],

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
            await this.getInitFormAddress()
            this.loading = false
        }

        else if (this.state == 'edit') {
            await this.editAddress()
            this.loading = false
        }
    },

    methods: {
        async submitAddress() {
            this.loading = true
            this.submitLoading = true

            const result = await this.submitUserAddressInDeliveryStatus(this.data);
            if (result) {
                this.$emit("addressSubmited");
            }

            this.loading = false
            this.submitLoading = false
        },

        async submitAnAddressAfterEdit() {
            this.loading = true
            this.submitLoading = true

            const result = await this.submitAddressAfterEdit(this.data);
            if (result) {
                this.$emit("addressSubmited");
            }

            this.loading = false
            this.submitLoading = false
        },

        useMyself(value) {
            if (value) {
                this.data.TUA_FName = this.User.TU_FNameFamil
                this.data.TUA_FTell1 = this.User.TU_FUserName
                this.data.TUA_FCodeMeli = this.User.TU_FCodeMeli
            }
            else {
                this.data.TUA_FName = ''
                this.data.TUA_FTell1 = ''
                this.data.TUA_FCodeMeli = ''
            }
        },

        async getInitFormAddress() {
            try {
                const result = await this.getAddressesInDeliveryStatus("init");
                if (result) {
                    this.defaults = result.defaults;
                    this.data = result.form;
                }
            }
            catch (error) {
                console.log(error);
            }
        },

        async editAddress() {
            try {
                const result = await this.getAddressRowToEdit(this.addressRowId);
                if (result) {
                    this.data = result.addressData;
                    this.defaults = result.defaults;
                }
            }
            catch (error) {
                console.log(error);
            }
        },
    },

    components: { Loading }
}
</script>