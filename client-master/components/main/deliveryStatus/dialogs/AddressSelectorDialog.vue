<template>
    <v-dialog v-model="addressSelectorDialog" width="700">
        <v-card class="dialog-overflow-y-hidden submitComment_dialog">
            <v-card-title>
                <v-row>
                    <v-col cols="6">
                        <span class="popup-title fn-bold">انتخاب آدرس</span>
                    </v-col>
                    <v-col cols="6" class="user-opinion float-left text-left">
                        <span @click="$emit('closeDialog')">
                            <v-icon class="cursor-pointer">mdi-close-thick</v-icon>
                        </span>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-card-text>
                <div class="user-opinion">
                    <v-row class="option_list_group">

                        <v-radio-group class="col-12" v-model="selectedAddressTemp">
                            <v-col cols="12" class="cont addressBorder mt-3" v-for="(address, index) in addressesList"
                                :key="index">

                                <v-row>
                                    <v-col cols="8" class="d-flex flex-column">
                                        <div class="float-right mr-right-minus">
                                            <v-radio
                                                :label="address.TUA_FID_City1Name + ' - ' + address.TUA_FID_City2Name + ' - ' + address.TUA_FAddress"
                                                :value="address" @change="$emit('selectAddressToDeliver', address)">
                                            </v-radio>
                                        </div>

                                        <div class="d-flex justify-space-between mt-2">
                                            <div>
                                                <v-icon>mdi-account</v-icon>
                                                <span class="fns-16">تحویل گیرنده : {{
                                                    address.TUA_FName
                                                }}</span>

                                                <v-icon class="mr-5">mdi-phone</v-icon>
                                                <span class="fns-16">{{
                                                    address.TUA_FTell1
                                                }}</span>
                                            </div>
                                        </div>
                                    </v-col>

                                    <v-col cols="4" class="d-flex align-center flex-row-reverse">
                                        <span @click="editAnAddress(address.TUA_FID)"
                                            class="float-left gr-color cursor-pointer">
                                            | ویرایش</span>
                                        <span @click="$emit('deleteAddress', address.TUA_FID)"
                                            class="float-left gr-color cursor-pointer ml-2">
                                            حذف
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-radio-group>
                    </v-row>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-row>
                    <v-col cols="12">
                        <div class="delivery_add_address" style="cursor:pointer" @click="addAddressForm">
                            افزودن آدرس +
                        </div>
                    </v-col>

                    <AddAddressDialog v-if="addAddressDialog" @closeDialog=" addAddressDialog = false"
                        @addressSubmited="addressSubmited" :state="state" :addressRowId="addressRowId" :defaults="defaults" />
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import deliveryStatusMixin from "../_mixins/deliveryStatusMixins";
import AddAddressDialog from "./AddAddressDialog.vue";

export default {
    props: ["addressesList"],
    mixins: [deliveryStatusMixin],
    data() {
        return {
            state: "insert",
            selectedAddressTemp: {},
            addressSelectorDialog: true,
            addAddressDialog: false,
            addressRowId: 0,
            defaults: {},
        };
    },
    methods: {
        addAddressForm() {
            this.state = "insert";
            this.addAddressDialog = true;
        },

        async addressSubmited() {
            this.$emit('addressSubmited')
            this.addAddressDialog = false;
        },

        editAnAddress(addressRowId) {
            this.state = "edit";
            this.addressRowId = addressRowId
            this.addAddressDialog = true;
        },
    },
    components: { AddAddressDialog }
}
</script>