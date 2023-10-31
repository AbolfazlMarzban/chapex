<template>
    <div class="d-xl-none d-lg-none d-md-none d-flex flex-column align-center" style="width: 100%;">
        <v-row class="order-item my-2" v-for="item in orders" :key="item.TOD_FID" style="width: 100%;" @click="$router.push(`/profile/orders/${item.TOD_FID}`)">
            <v-col cols="4" class="pl-0 d-flex align-center">
                <v-checkbox v-if="bulkList.length > 0" class="bulk-checklist"></v-checkbox>
                <img v-if="getOrderImage(item)" :src="setImageUrl(getOrderImage(item), 'sm')" :alt="item.TOD_FID_GoodsName"
                    class="order-img" />
            </v-col>
            <v-col cols="8" class="pr-1 d-flex flex-column justify-center cursor-pointer">
                <ul class="details pl-0">
                    <li>
                        عنوان محصول: <span>{{ item.TOD_FID_GoodsName }}</span>
                    </li>
                    <li>
                        شماره سفارش: <span>{{ item.TOD_FID }}</span>
                    </li>
                    <li>
                        وضعیت: <span>{{ item.TOD_FID_LastStatusName }}</span>
                    </li>
                    <li>
                        تاریخ سفارش: <span>{{ item.TOH_FDateReg }}</span>
                    </li>
                </ul>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import userProfileMixin from '../../_mixins/userProfileMixin'

export default {
    props: ["orders", "bulkList"],
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