<template>
    <v-container>
        <v-row v-if="deliveryStatusData.deliveryMethod == 23202">
            <v-col cols="12" lg="6" md="6">
                <label class="title fn-bold">محل و زمان تحویل</label>
            </v-col>
            <v-col cols="12" lg="6" md="6">
                <span class="float-right float-lg-left float-md-left gr-color fn-bold fns-16 mb-7" style="cursor:pointer"
                    @click="addressSelectorDialog = true">
                    تغییر یا ویرایش آدرس</span>

                <AddressSelectorDialog v-if="addressSelectorDialog" @closeDialog="addressSelectorDialog = false"
                    :addressesList="addressesList" @addressSubmited="addressSubmited"
                    @selectAddressToDeliver="selectAddressToDeliver" @deleteAddress="deleteAddress" />
            </v-col>
        </v-row>

        <v-row v-if="deliveryStatusData.deliveryMethod == 23202" class="mt-5">

            <div class="mt-5">
                <AddressBox :address="deliveryStatusData.selectedAddress" />
                <br />
                <br />
            </div>

            <!-- <div class="border-solid-silver">
                <v-row>
                    <v-col cols="12">
                        <v-checkbox label="امکان دریافت سفارش در روزهای پنجشنبه را دارم" class="text-right"
                            v-model="deliveryStatusData.canThursday" @change="$emit('dataChanged')"></v-checkbox>
                        <v-checkbox v-model="deliveryStatusData.canHolidaysOrFridays" @change="$emit('dataChanged')"
                            label=" امکان دریافت سفارش در روزهای تعطیل رسمی و جمعه را دارم   "
                            class="text-right"></v-checkbox>

                        <div class="order-warn mr-lg-5 mr-md-5">
                            <span>پیش از ارسال، از طریق پیامک با شما هماهنگ خواهد شد.</span>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <ui-select v-model="deliveryStatusData.sendingMethodToDeliver" @change="$emit('dataChanged')"
                            class="mt-10" :items="defaults[226]" :options="{
                                fields: {
                                    id: 'TD_FID',
                                    name: 'TD_FName',
                                    search: 'TD_FName',
                                },
                                label: 'روش ارسال ',
                                count: 10,
                            }" />
                    </v-col>
                </v-row>
            </div> -->

        </v-row>
    </v-container>
</template>

<script>
import AddressSelectorDialog from "../dialogs/AddressSelectorDialog.vue";
import deliveryStatusMixin from "../_mixins/deliveryStatusMixins";
import AddressBox from "../../profile/sections/profile/address/AddressBox.vue";

export default {
    mixins: [deliveryStatusMixin],
    props: ["deliveryStatusData", "addressesList", "defaults"],
    data() {
        return {
            state: "insert",
            addressSelectorDialog: false,
        };
    },
    methods: {
        selectAddressToDeliver(address) {
            this.addressSelectorDialog = false
            this.$emit('selectedAddressChanged', address)
        },

        async deleteAddress(addressRowId) {
            const result = await this.deleteUserAddress(addressRowId);
            this.$emit('addressSubmited')
        },

        async addressSubmited() {
            this.$emit('addressSubmited')
        },

    },

    components: { AddressSelectorDialog, AddressBox }
}
</script>