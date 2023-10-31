<template>
    <v-row style="width: 100%;">
        <v-col cols="12" class="pt-0 d-xl-block d-lg-block d-md-block d-none">
            <v-data-table v-model="selectedOrder" show-select item-key="orderId" :headers="orderTable" :items="orders"
                class="order-table">
                <template v-slot:item.image="{ item }">
                    <img v-if="getOrderImage(item)" :src="setImageUrl(getOrderImage(item), 'sm')"
                        :alt="item.TOD_FID_GoodsName" />
                </template>

                <template v-slot:item.TOD_FID_GoodsName="{ item }">
                    <div>{{ item.TOD_FID_GoodsName }}</div>

                    <v-chip
                        v-if="item.TOD_FID_LastStatusDetail == 2450401 || item.TOD_FID_LastStatusDetail == 2450402 || item.TOD_FID_LastStatusDetail == 2450301 || item.TOD_FID_LastStatusDetail == 2450305"
                        color="red" class="mx-2" style="max-width: fit-content; cursor: pointer;"
                        @click="$router.push(`/profile/orders/${item.TOD_FID}`)">
                        <span class="white--text">{{ item.TOD_FID_LastStatusDetailName }}</span>
                    </v-chip>
                </template>


                <template v-slot:item.orderDetail="{ item }">
                    <v-btn fab dark x-small color="rgba(1, 102, 112, 0.8)" elevation="2"
                        @click="$router.push(`/profile/orders/${item.TOD_FID}`)">
                        <v-icon dark>mdi-menu</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import userProfileMixin from '../../_mixins/userProfileMixin'

export default {
    props: ["orders"],
    mixins: [userProfileMixin],
    data() {
        return {
            selectedOrder: [],
        }
    },
    computed: {
        orderTable() {
            return [
                {
                    text: 'عکس',
                    align: 'center',
                    sortable: false,
                    value: 'image'
                },
                {
                    text: 'عنوان محصول',
                    align: 'center',
                    sortable: false,
                    value: 'TOD_FID_GoodsName'
                },
                {
                    text: 'شماره سفارش',
                    align: 'center',
                    sortable: false,
                    value: 'TOD_FID'
                },
                {
                    text: 'وضعیت',
                    align: 'center',
                    sortable: false,
                    value: 'TOD_FID_LastStatusName'
                },
                {
                    text: 'تاریخ سفارش',
                    align: 'center',
                    sortable: false,
                    value: 'TOH_FDateReg'
                },
                {
                    text: 'کاربرگ سفارش',
                    align: 'center',
                    sortable: false,
                    value: 'orderDetail'
                }
            ]
        }
    },
}
</script>