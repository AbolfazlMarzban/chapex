<template>
    <v-dialog v-model="addressFormDialog"  v-if="data" width="700" content-class="">
        <v-card class="submitComment_dialog">
            <v-card-title>
                <div style="min-width: 100%">
                    <v-row class="submitComment_title">
                        <v-col cols="6">
                            <div class="popup-title"> آدرس</div>
                        </v-col>
                        <v-col cols="6" class="text-left">
                            <div class="user-opinion float-left">
                                <div class="" text @click="addressFormDialog = false">
                                    <v-icon>mdi-close-thick</v-icon>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-card-title>

            <v-card-text>

                <div class="user-opinion fns-16">
                    <div class="row">
                        <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                            <ui-select v-model="data.TUA_FID_City1" :items="defaults[123]" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: '',
                                },
                                label: ' استان ',
                                count: 10,
                            }" />


                            <!-- v-model="data.TGO_FID_Type" -->
                            <!-- :items="defaults[207]" -->

                        </div>


                        <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                            <ui-select v-model="data.TUA_FID_City2" :items="defaults[124]" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: ' شهر ',
                                count: 10,
                            }" />
                            <!-- v-model="data.TGO_FID_Type" -->
                            <!-- :items="defaults[207]" -->
                        </div>
                    </div>
                    <div class="row">

                        <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                            <ui-select v-model="data.TUA_FID_Place" :items="defaults[123]" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'مکان ',
                                count: 10,
                            }" />
                            <!-- v-model="data.TGO_FID_Type" -->
                            <!-- :items="defaults[207]" -->
                        </div>
                        <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                            <ui-input v-model="data.TUA_FMapX" type="text" class="form_control_textInput"
                                label="موقعیت روی نقشه   " placeholder="" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col col-12">
                            <ui-input type="text" v-model="data.TUA_FAddress" class="form_control_textInput" label="آدرس"
                                placeholder=" " />
                        </div>
                    </div>
                    <div class="row">
                        <div xs="12" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-12">
                            <ui-input v-model="data.TUA_FPlates" type="text" class="form_control_textInput" label="پلاک"
                                placeholder=" " />
                        </div>
                        <div xs="12" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-12">
                            <ui-input v-model="data.TUA_FUnit" type="text" class="form_control_textInput" label="واحد"
                                placeholder=" " />
                        </div>
                        <div xs="12" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-12">
                            <ui-input v-model="data.TUA_FPost" type="text" class="form_control_textInput" label="کدپستی"
                                placeholder=" " />
                        </div>
                    </div>
                    <br><br>


                    <div class="row">
                        <div xs="12" class="text-right col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                            <label class="gr-color fn-bold">اطلاعات تحویل گیرنده</label>
                        </div>

                        <div xs="12" class="text-left col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                            <v-checkbox label="   استفاده از اطلاعات خودم " value="close" :disabled="readonly">
                            </v-checkbox>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col col-6">
                            <ui-input v-model="data.TUA_FName" type="text" class="form_control_textInput"
                                label="نام و نام خانوادگی" placeholder=" " />
                        </div>
                        <div class="col col-6">


                        </div>
                    </div>


                    <div class="row">
                        <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">

                            <ui-input v-model="data.TUA_FTell1" type="text" class="form_control_textInput"
                                label="شماره همراه" placeholder=" " />
                        </div>
                        <div xs="12" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">
                            <ui-input v-model="data.TUA_FCodeMeli" type="text" class="form_control_textInput" label="کد ملی"
                                placeholder=" " />
                        </div>

                    </div>

                </div>


            </v-card-text>
            <v-card-actions>
                <v-row>
                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12">

                    </div>




                    <div v-if="state == 'insert'" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 delivery_btn">

                        <div @click="submitAddress" class="btn-order">ثبت</div>
                    </div>
                    <div v-else-if="state == 'edit'" class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 delivery_btn">

                        <div @click="submitAnAddressAfterEdit" class="btn-order">ثبت</div>
                    </div>



                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["data", "defaults", "readonly"],

    data() {
        return {
            addressFormDialog: false,
            state: "insert",
        };
    },
}
</script>