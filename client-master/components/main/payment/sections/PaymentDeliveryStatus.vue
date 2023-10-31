<template>
    <v-col class="" cols="12" xl="8" lg="8" md="8" sm="12" xs="12">

        <div class="my-cart-box pb-8">
            <label class="title fn-bold">روش تحویل سفارش</label>
            <hr />

            <DeliveryMethods :deliveryStatusData="deliveryStatusData" :methods="defaults[232]"
                @deliveryMethodChanged="storeDeliveryStatusInVuex" />

            <GetInAddress :defaults="defaults" :deliveryStatusData="deliveryStatusData"
                @dataChanged="storeDeliveryStatusInVuex" :addressesList="addressesList"
                @selectedAddressChanged="selectedAddressChanged" @addressSubmited="addressSubmited" />

        </div>
    </v-col>
</template>

<script>

export default {

}
</script>