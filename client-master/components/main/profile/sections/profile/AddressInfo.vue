<template>
    <div class="additional-data">

        <AddAddressDialog v-if="addAddressDialog" @closeDialog=" addAddressDialog = false"
            @addressSubmited="addressSubmited" :state="state" :addressRowId="addressRowId" :defaults="defaults" />

        <DeleteAddressDialog v-if="deleteDialog" @deleteItemFromTable="deleteAddress"
            @hiddenDialog="deleteDialog = false" />

        <v-row>
            <v-col cols="12" class="d-flex">
                <h2 style="font-size: 16px">نشانی</h2>

                <span v-if="addressesList.length == 0" class="red--text mr-2 mt-1">حداقل یک آدرس پستی وارد نمایید</span>

                <v-btn @click="addAddressForm" dark color="rgba(1, 102, 112, 0.8)" elevation="2" class="mr-auto mx-1">
                    <v-icon color="white">mdi-map-marker-plus</v-icon>
                    <span class="white--text mr-2">افزودن آدرس</span>
                </v-btn>

            </v-col>
        </v-row>

        <v-row v-if="addressesList.length > 0" class="mt-5">
            <v-card elevation="2" v-for="address in addressesList" class="pa-3 ma-3">
                <AddressBox :address="address" />

                <v-card-actions>
                    <v-btn color="orange" dense x-small @click="editAnAddress(address.TUA_FID)">
                        <span class="white--text">ویرایش</span>
                    </v-btn>

                    <v-btn color="pink" dense x-small @click="showDeleteDialog(address.TUA_FID)">
                        <span class="white--text">حذف</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>

        <v-row v-else class="ma-5 d-flex">
            <span class="ma-auto">هیچ آدرسی ثبت نشده</span>
        </v-row>

    </div>
</template>

<script>
import AddAddressDialog from '../../../deliveryStatus/dialogs/AddAddressDialog.vue';
import deliveryStatusMixin from "../../../deliveryStatus/_mixins/deliveryStatusMixins";
import AddressBox from './address/AddressBox.vue';
import DeleteAddressDialog from './address/DeleteAddressDialog.vue';

export default {
    props: ["userData", "defaults", "readonly"],
    mixins: [deliveryStatusMixin],
    components: { AddAddressDialog, AddressBox, DeleteAddressDialog },
    data() {
        return {
            addAddressDialog: false,
            addressesList: [],
            state: 'insert',
            deleteDialog: false,
            addressRowId: 0,
        }
    },

    async mounted() {
        await this.getAddresses()
    },

    methods: {
        async getAddresses() {
            const result = await this.getAddressesInDeliveryStatus("show");
            if (result) {
                this.addressesList = result.addressData;
                return result;
            }
        },

        addAddressForm() {
            this.state = "insert";
            this.addAddressDialog = true;
        },

        editAnAddress(addressRowId) {
            this.state = "edit";
            this.addressRowId = addressRowId
            this.addAddressDialog = true;
        },

        async addressSubmited() {
            await this.getAddresses()
            this.addAddressDialog = false;
        },

        async showDeleteDialog(addressRowId) {
            this.addressRowId = addressRowId
            this.deleteDialog = true
        },

        async deleteAddress() {
            const result = await this.deleteUserAddress(this.addressRowId);
            await this.getAddresses()
            this.deleteDialog = false
        },
    },
}
</script>