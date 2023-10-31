<template>
    <div>
        <v-row class="">
            <v-col cols="4" class="">
                <v-btn color="primary" @click="openNewTaxForm">
                    <span>افزودن پرونده مالیاتی</span>
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="option_list_group">

            <v-col cols="6" class="cont addressBorder mt-3" v-for="(taxRow, index) in data" :key="index">

                <v-card class="px-2 pb-2 pt-1">

                    <v-card-title>
                        <span>{{ taxRow.TUX_FName }}</span>
                        <span>({{ showType(taxRow.TUX_FType) }})</span>

                    </v-card-title>

                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <span>شماره ملی:</span>
                                <span>{{ taxRow.TUX_FMelli }}</span>
                            </v-col>

                            <v-col cols="6">
                                <span>ثبت / شناسنامه:</span>
                                <span>{{ taxRow.TUX_FShenas }}</span>
                            </v-col>

                            <v-col cols="6">
                                <span>کد اقتصادی:</span>
                                <span>{{ taxRow.TUX_FEcoCode }}</span>
                            </v-col>

                            <v-col cols="6">
                                <span>شماره تماس:</span>
                                <span>{{ taxRow.TUX_FTel }}</span>
                            </v-col>

                            <v-col cols="12">
                                <span>نشانی:</span>
                                <span>{{ taxRow.TUX_FAddress }}</span>
                            </v-col>
                        </v-row>

                    </v-card-text>

                    <v-card-actions>
                        <div class="d-flex align-center flex-row-reverse border-none mr-auto">
                            <v-btn icon @click="editRow(taxRow.TUX_FID)" class="float-left gr-color cursor-pointer"
                                color="primary">
                                <v-icon class="gr-color fn-bold">mdi-pencil-box</v-icon></v-btn>
                            <span>|</span>
                            <v-btn icon @click="deleteRow(taxRow.TUX_FID)" class="float-left cursor-pointer" color="red">
                                <v-icon class="fn-bold">mdi-trash-can-outline</v-icon> </v-btn>
                        </div>
                    </v-card-actions>

                </v-card>

            </v-col>

        </v-row>

        <AddTaxDialog :state="formState" :taxRowId="taxRowId" v-if="taxFormDialog" @taxSubmited="taxSubmited()"
            @closeDialog="taxFormDialog = false" />

        <DeleteAddressDialog v-if="taxDeleteDialog" @deleteItemFromTable="deleteTax()"
            @hiddenDialog="taxDeleteDialog = false" />
    </div>
</template>

<script>
import DeleteAddressDialog from "../../../../profile/sections/profile/address/DeleteAddressDialog.vue";
import AddTaxDialog from "./AddTaxDialog.vue";

export default {
    props: ["userId", "readonly"],
    components: { DeleteAddressDialog, AddTaxDialog },

    data() {
        return {
            taxFormDialog: false,
            taxDeleteDialog: false,
            taxRowId: null,
            data: null,
            formState: 'insert'
        }
    },

    async mounted() {
        await this.getTaxInfo()
    },

    methods: {
        async getTaxInfo() {
            try {
                const res = await this.$authAxios.$get('/tax/get/0?mode=table')

                if (res) {
                    this.data = res.data.table
                }
            } catch (error) {
                console.log(error)
            }
        },

        showType(item) {
            if (item == 0) {
                return 'حقیقی'
            } else {
                return 'حقوقی'
            }
        },

        openNewTaxForm() {
            this.formState = "insert";
            this.taxFormDialog = true;
        },

        editRow(taxRowId) {
            this.formState = "edit";
            this.taxRowId = taxRowId
            this.taxFormDialog = true;
        },

        async taxSubmited() {
            await this.getTaxInfo()
            this.taxFormDialog = false;
        },

        deleteRow(taxRowId) {
            this.taxRowId = taxRowId
            this.taxDeleteDialog = true;
        },

        async deleteTax() {
            try {
                const result = await this.$authAxios.$delete(`/tax/delete/${this.taxRowId}`)
                if (result) {
                    this.showResponseSuccessMessages(result)
                    this.taxDeleteDialog = false;
                    await this.getTaxInfo()
                }
            }
            catch (error) {
                console.log(error);
            }
        },
    }
}
</script>