<template>
    <div>
        <v-row class="">
            <v-col cols="4" class="mr-4">
                <v-btn color="primary" @click="openAddressForm">
                    <span>افزودن آدرس</span>
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="option_list_group">

            <v-col cols="4" class="cont addressBorder mt-3 mr-4" v-for="(address, index) in addressesList" :key="index">

                <v-card class="px-2 pb-2 pt-1">

                    <v-card-title>
                        <v-icon>mdi-map-marker</v-icon>
                        <span>{{ address.TUA_FAddress }}</span>

                    </v-card-title>

                    <v-card-text>
                        <v-icon>mdi-account</v-icon>
                        <span>تحویل گیرنده : {{ address.TUA_FName }}</span>

                        <v-icon class="mr-5">mdi-phone</v-icon>
                        <span>{{ address.TUA_FTell1 }}</span>
                    </v-card-text>

                    <v-card-actions>
                        <div class="d-flex align-center flex-row-reverse border-none mr-auto">
                            <v-btn icon @click="editAnAddress(address.TUA_FID)" class="float-left gr-color cursor-pointer"
                                color="primary">
                                <v-icon class="gr-color fn-bold">mdi-pencil-box</v-icon></v-btn>
                            <span>|</span>
                            <v-btn icon @click="deleteAnAddress(address.TUA_FID)" class="float-left gr-color cursor-pointer"
                                color="red">
                                <v-icon class="gr-color fn-bold">mdi-trash-can-outline</v-icon> </v-btn>
                        </div>
                    </v-card-actions>

                </v-card>

            </v-col>

        </v-row>



        <AddAddressDialog :state="state" :addressRowId="addressRowId" v-if="addressFormDialog"
            @addressSubmited="addressSubmited()" @closeDialog="addressFormDialog = false" />

        <DeleteAddressDialog v-if="addressDeleteDialog" @deleteItemFromTable="deleteAddress()"
            @hiddenDialog="addressDeleteDialog = false" />

    </div>
</template>
<script>
import userCustomerMixin from "../../../../user/addresses/_mixins/userCustomerMixins";
import userCustomerVariables from "../../../../user/addresses/_mixins/userCustomerVariables";
import AddAddressDialog from '../../../../deliveryStatus/dialogs/AddAddressDialog.vue';
import DeleteAddressDialog from "../../../../profile/sections/profile/address/DeleteAddressDialog.vue";

export default {
    mixins: [userCustomerMixin, userCustomerVariables],
    props: ["userId", "readonly"],

    data() {
        return {
            addressFormDialog: false,
            addressDeleteDialog: false,
            addressRowId: null,
        }
    },

    methods: {

        async getAddresses(userId) {
            try {
                const result = await this.getAddressesInUserCustomer("show", userId);
                if (result) {
                    this.addressesList = result.addressData;
                    // console.log(this.addressesList);
                }
            }
            catch (error) {
                console.log(error);
            }
        },

        openAddressForm() {
            this.state = "insert";
            this.addressFormDialog = true;
        },

        editAnAddress(addressRowId) {
            this.state = "edit";
            this.addressRowId = addressRowId
            this.addressFormDialog = true;
        },

        async addressSubmited() {
            await this.getAddresses(this.userId);
            this.addressFormDialog = false;
        },

        deleteAnAddress(addressRowId) {
            this.addressRowId = addressRowId
            this.addressDeleteDialog = true;
        },

        async deleteAddress() {
            try {
                const result = await this.deleteUserAddress(this.addressRowId);
                if (result) {
                    this.showResponseSuccessMessages(result)
                    this.addressDeleteDialog = false;
                    await this.getAddresses(this.userId);
                }
            }
            catch (error) {
                console.log(error);
            }
        },

    },

    mounted() {
        this.getAddresses(this.userId);
    },
    components: { AddAddressDialog, DeleteAddressDialog }
};
</script>
  