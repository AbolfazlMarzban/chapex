<template>
    <v-row class="" style="width: 100%;">

        <!-- <v-col cols="12" class="text-left d-xl-none d-lg-none d-md-none">
            <v-icon @click="$emit('closeOrder')">mdi-close-circle</v-icon>
        </v-col> -->

        <v-col cols="12">
            <v-chip class="status-chip">وضعیت فعلی سفارش: {{ data.TOD_FID_LastStatusName }}</v-chip>
        </v-col>

        <v-row class="order-item mt-2">
            <v-col cols="2" class="pl-0">
                <img v-if="getOrderImage(data)" :src="setImageUrl(getOrderImage(data), 'sm')"
                    :alt="data.TOD_FID_GoodsName" />
            </v-col>
 
            <v-col cols="10" class="pr-1 d-flex flex-column justify-center">
                <ul class="details pl-0">
                    <li>
                        عنوان محصول: <span>{{ data.TOD_FID_GoodsName }}</span>
                    </li>
                    <li>
                        تیراژ انتخابی: <span>{{ data.TOD_FCount }}</span>
                    </li>
                    <li>
                        تاریخ سفارش: <span>{{ data.TOH_FDateReg }}</span>
                    </li>
                    <li>
                        شماره سفارش: <span>{{ data.TOD_FID }}</span>
                    </li>
                    <li>
                        وضعیت: <span>{{ data.TOD_FID_LastStatusName }}</span>
                    </li>
                    
                </ul>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
import userProfileMixin from '../../../_mixins/userProfileMixin';

export default {
    props: ["data"],
    mixins: [userProfileMixin],
}
</script>